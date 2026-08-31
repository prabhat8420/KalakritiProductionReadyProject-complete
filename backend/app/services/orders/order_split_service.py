import uuid
from datetime import datetime, timezone, timedelta
from typing import Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.order import Order
from app.models.suborder import SubOrder
from app.models.order_item import OrderItem
from app.models.order_price_breakdown import OrderPriceBreakdown
from app.models.order_status_history import OrderStatusHistory
from app.models.product_variant import ProductVariant
from app.models.product import Product
from app.models.artisan import Artisan
from app.models.artisan_earning import ArtisanEarning
from app.repositories.cart_repository import CartRepository
from app.repositories.order_repository import OrderRepository
from app.core.exceptions import AppException

class OrderSplitService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.cart_repo = CartRepository(db)
        self.order_repo = OrderRepository(db)

    async def split_cart_and_create_order(self, user_id: str, address_id: str) -> Order:
        """
        CORE MARKETPLACE INVARIANT:
        Takes a customer's multi-vendor cart and splits it into:
        1 Master Order + N Isolated Per-Artisan SubOrders.
        Locks in snapshot price breakdown and initializes artisan escrow ledger.
        """
        cart = await self.cart_repo.get_or_create_cart(user_id=user_id)
        if not cart.items:
            raise AppException(400, "Cannot checkout with an empty cart")

        # Load detailed product & artisan metadata for all cart items
        variant_ids = [item.product_variant_id for item in cart.items]
        stmt = select(ProductVariant).options(
            selectinload(ProductVariant.product).selectinload(Product.artisan)
        ).where(ProductVariant.id.in_(variant_ids))
        result = await self.db.execute(stmt)
        variants_by_id = {v.id: v for v in result.scalars().all()}

        # Group cart items by Artisan
        artisan_item_map: Dict[str, List[dict]] = {}
        for item in cart.items:
            variant = variants_by_id.get(item.product_variant_id)
            if not variant:
                continue
            product = variant.product
            artisan = product.artisan
            
            if artisan.id not in artisan_item_map:
                artisan_item_map[artisan.id] = {
                    "artisan": artisan,
                    "items": []
                }

            unit_price = round(product.base_price + product.platform_fee + product.delivery_fee + variant.price_delta, 2)
            artisan_item_map[artisan.id]["items"].append({
                "variant": variant,
                "product": product,
                "quantity": item.quantity,
                "unit_price": unit_price,
                "base_price": product.base_price,
                "artisan_share": product.artisan_share,
                "platform_fee": product.platform_fee,
                "delivery_fee": product.delivery_fee
            })

        now = datetime.now(timezone.utc)
        order_num = f"KLK-ORD-{now.strftime('%Y%m')}-{str(uuid.uuid4())[:8].upper()}"

        # Calculate Grand Total
        grand_total = 0.0
        for art_id, group in artisan_item_map.items():
            for it in group["items"]:
                grand_total += it["unit_price"] * it["quantity"]
        grand_total = round(grand_total, 2)

        # Create Master Order
        master_order = Order(
            order_number=order_num,
            user_id=user_id,
            address_id=address_id,
            total_amount=grand_total,
            currency="INR",
            status="pending",
            razorpay_order_id=f"order_mock_{str(uuid.uuid4())[:12]}"
        )
        self.db.add(master_order)
        await self.db.flush()

        # Create Per-Artisan SubOrders
        for idx, (art_id, group) in enumerate(artisan_item_map.items()):
            sub_num = f"{order_num}-A{idx+1}"
            subtotal = 0.0
            artisan_earnings = 0.0
            platform_fee_total = 0.0
            delivery_fee_total = 0.0

            for it in group["items"]:
                qty = it["quantity"]
                subtotal += it["unit_price"] * qty
                artisan_earnings += it["artisan_share"] * qty
                platform_fee_total += it["platform_fee"] * qty
                delivery_fee_total += it["delivery_fee"] * qty

            suborder = SubOrder(
                suborder_number=sub_num,
                order_id=master_order.id,
                artisan_id=art_id,
                subtotal=round(subtotal, 2),
                artisan_earnings=round(artisan_earnings, 2),
                platform_commission=round(platform_fee_total, 2),
                delivery_fee=round(delivery_fee_total, 2),
                status="placed"
            )
            self.db.add(suborder)
            await self.db.flush()

            # Add Order Items & Snapshot Price Breakdown
            for it in group["items"]:
                line_item = OrderItem(
                    suborder_id=suborder.id,
                    product_variant_id=it["variant"].id,
                    product_title=it["product"].title,
                    variant_name=it["variant"].variant_name,
                    quantity=it["quantity"],
                    unit_price=it["unit_price"],
                    total_price=round(it["unit_price"] * it["quantity"], 2)
                )
                self.db.add(line_item)
                await self.db.flush()

                # Immutable Price Breakdown Snapshot
                breakdown = OrderPriceBreakdown(
                    order_item_id=line_item.id,
                    base_price=it["base_price"],
                    artisan_share=it["artisan_share"],
                    platform_fee=it["platform_fee"],
                    delivery_fee=it["delivery_fee"]
                )
                self.db.add(breakdown)

            # Initial Status History Entry
            hist = OrderStatusHistory(
                suborder_id=suborder.id,
                status="placed",
                notes="Suborder created upon checkout authorization."
            )
            self.db.add(hist)

            # Escrow Earning Ledger Entry (Matures 7 days post-delivery)
            earning = ArtisanEarning(
                suborder_id=suborder.id,
                artisan_id=art_id,
                amount=round(artisan_earnings, 2),
                status="pending",
                matures_at=now + timedelta(days=7)
            )
            self.db.add(earning)

        # Clear cart upon checkout creation
        await self.cart_repo.clear_cart(cart.id)
        await self.db.flush()

        return await self.order_repo.get_by_id(master_order.id)
