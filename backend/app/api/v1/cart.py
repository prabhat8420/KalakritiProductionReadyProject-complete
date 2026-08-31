from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import Optional
from app.core.database import get_db
from app.dependencies import get_current_user_optional
from app.schemas.cart import AddToCartRequest, CartSchema
from app.repositories.cart_repository import CartRepository
from app.models.product_variant import ProductVariant
from app.models.product import Product
from app.models.artisan import Artisan

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.get("", response_model=CartSchema)
async def get_cart(
    current_user: Optional[dict] = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db)
):
    repo = CartRepository(db)
    user_id = current_user["sub"] if current_user else None
    cart = await repo.get_or_create_cart(user_id=user_id)

    if not cart.items:
        return {"id": cart.id, "groups": [], "total_items": 0, "grand_total": 0.0, "total_artisan_share": 0.0}

    variant_ids = [item.product_variant_id for item in cart.items]
    stmt = select(ProductVariant).options(
        selectinload(ProductVariant.product).selectinload(Product.artisan),
        selectinload(ProductVariant.product).selectinload(Product.images)
    ).where(ProductVariant.id.in_(variant_ids))
    result = await db.execute(stmt)
    variants_by_id = {v.id: v for v in result.scalars().all()}

    groups_map = {}
    total_items = 0
    grand_total = 0.0
    total_artisan_share = 0.0

    for item in cart.items:
        variant = variants_by_id.get(item.product_variant_id)
        if not variant:
            continue
        product = variant.product
        artisan = product.artisan

        if artisan.id not in groups_map:
            groups_map[artisan.id] = {
                "artisan_id": artisan.id,
                "artisan_name": artisan.display_name,
                "craft_tradition": artisan.craft_tradition,
                "items": [],
                "subtotal": 0.0
            }

        unit_price = round(product.base_price + product.platform_fee + product.delivery_fee + variant.price_delta, 2)
        item_total = round(unit_price * item.quantity, 2)
        img_url = product.images[0].image_url if product.images else None

        groups_map[artisan.id]["items"].append({
            "id": item.id,
            "product_variant_id": variant.id,
            "product_id": product.id,
            "product_title": product.title,
            "product_slug": product.slug,
            "variant_name": variant.variant_name,
            "image_url": img_url,
            "artisan_id": artisan.id,
            "artisan_name": artisan.display_name,
            "unit_price": unit_price,
            "artisan_share": product.artisan_share,
            "platform_fee": product.platform_fee,
            "delivery_fee": product.delivery_fee,
            "quantity": item.quantity,
            "item_total": item_total
        })

        groups_map[artisan.id]["subtotal"] = round(groups_map[artisan.id]["subtotal"] + item_total, 2)
        total_items += item.quantity
        grand_total += item_total
        total_artisan_share += product.artisan_share * item.quantity

    return {
        "id": cart.id,
        "groups": list(groups_map.values()),
        "total_items": total_items,
        "grand_total": round(grand_total, 2),
        "total_artisan_share": round(total_artisan_share, 2)
    }

@router.post("/items")
async def add_to_cart(
    req: AddToCartRequest,
    current_user: Optional[dict] = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db)
):
    repo = CartRepository(db)
    user_id = current_user["sub"] if current_user else None
    cart = await repo.get_or_create_cart(user_id=user_id)
    item = await repo.add_item(cart.id, req.product_variant_id, req.quantity)
    return {"success": True, "cart_item_id": item.id}
