from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_
from sqlalchemy.orm import selectinload
from app.models.product import Product
from app.models.product_image import ProductImage
from app.models.product_variant import ProductVariant
from app.models.product_moderation_log import ProductModerationLog
from app.models.product_certification import ProductCertification
from app.models.inventory import Inventory
from app.models.inventory_transaction import InventoryTransaction

class ProductRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, product_id: str) -> Optional[Product]:
        stmt = select(Product).options(
            selectinload(Product.artisan),
            selectinload(Product.category),
            selectinload(Product.tradition),
            selectinload(Product.images),
            selectinload(Product.variants),
            selectinload(Product.certification),
            selectinload(Product.moderation_logs)
        ).where(Product.id == product_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_slug(self, slug: str) -> Optional[Product]:
        stmt = select(Product).options(
            selectinload(Product.artisan),
            selectinload(Product.category),
            selectinload(Product.tradition),
            selectinload(Product.images),
            selectinload(Product.variants),
            selectinload(Product.certification)
        ).where(Product.slug == slug)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def list_products(
        self,
        status: str = "published",
        category_id: Optional[str] = None,
        tradition_id: Optional[str] = None,
        artisan_id: Optional[str] = None,
        limit: int = 50,
        offset: int = 0
    ) -> List[Product]:
        stmt = select(Product).options(
            selectinload(Product.artisan),
            selectinload(Product.category),
            selectinload(Product.tradition),
            selectinload(Product.images),
            selectinload(Product.variants),
            selectinload(Product.certification)
        )
        filters = []
        if status:
            filters.append(Product.status == status)
        if category_id:
            filters.append(Product.category_id == category_id)
        if tradition_id:
            filters.append(Product.tradition_id == tradition_id)
        if artisan_id:
            filters.append(Product.artisan_id == artisan_id)

        if filters:
            stmt = stmt.where(and_(*filters))

        stmt = stmt.order_by(Product.created_at.desc()).limit(limit).offset(offset)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def create_product(self, product_data: dict, images: List[str], variants: List[dict]) -> Product:
        product = Product(
            artisan_id=product_data["artisan_id"],
            title=product_data["title"],
            slug=product_data["slug"],
            description_en=product_data["description_en"],
            description_hi=product_data.get("description_hi"),
            category_id=product_data["category_id"],
            subcategory_id=product_data.get("subcategory_id"),
            tradition_id=product_data["tradition_id"],
            base_price=product_data["base_price"],
            artisan_share=product_data["artisan_share"],
            platform_fee=product_data["platform_fee"],
            delivery_fee=product_data["delivery_fee"],
            ai_confidence_score=product_data.get("ai_confidence_score"),
            status=product_data.get("status", "pending_review")
        )
        self.db.add(product)
        await self.db.flush()

        # Add images
        for idx, img_url in enumerate(images):
            img = ProductImage(
                product_id=product.id,
                image_url=img_url,
                display_order=idx,
                is_primary=(idx == 0)
            )
            self.db.add(img)

        # Add variants & stock inventory
        for v in variants:
            variant = ProductVariant(
                product_id=product.id,
                variant_name=v.get("variant_name", "Standard"),
                price_delta=v.get("price_delta", 0.0),
                stock_quantity=v.get("stock_quantity", 5)
            )
            self.db.add(variant)
            await self.db.flush()

            inventory = Inventory(
                product_variant_id=variant.id,
                quantity_available=variant.stock_quantity,
                quantity_reserved=0
            )
            self.db.add(inventory)

        await self.db.flush()
        return await self.get_by_id(product.id)
