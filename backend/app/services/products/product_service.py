import re
import uuid
from typing import Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.product_repository import ProductRepository
from app.repositories.artisan_repository import ArtisanRepository
from app.repositories.category_repository import CategoryRepository
from app.core.exceptions import AppException, NotFoundException

class ProductService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.product_repo = ProductRepository(db)
        self.artisan_repo = ArtisanRepository(db)
        self.category_repo = CategoryRepository(db)

    @staticmethod
    def calculate_price_breakdown(base_price: float) -> dict:
        """
        Transparent Indian Artisan Marketplace Price Formula:
        - base_price: entered by artisan (e.g. ₹2,000)
        - artisan_share: 85% of base price net to artisan (e.g. ₹1,700)
        - platform_fee: 10% platform facilitation & curation fee (e.g. ₹200)
        - delivery_fee: 5% logistics & insured fragile transit (e.g. ₹100)
        - total_price: ₹2,300
        """
        artisan_share = round(base_price * 0.85, 2)
        platform_fee = round(base_price * 0.10, 2)
        delivery_fee = round(base_price * 0.05, 2)
        total_price = round(base_price + platform_fee + delivery_fee, 2)

        return {
            "base_price": base_price,
            "artisan_share": artisan_share,
            "platform_fee": platform_fee,
            "delivery_fee": delivery_fee,
            "total_price": total_price
        }

    async def create_product(self, user_id: str, payload: dict) -> dict:
        artisan = await self.artisan_repo.get_by_user_id(user_id)
        if not artisan:
            raise AppException(403, "You must have an artisan profile to list handmade products")

        base_price = float(payload.get("base_price", 1000.0))
        breakdown = self.calculate_price_breakdown(base_price)

        # Generate SEO slug
        clean_title = re.sub(r'[^a-zA-Z0-9\s-]', '', payload["title"]).strip().lower()
        slug_title = re.sub(r'\s+', '-', clean_title)
        slug = f"{slug_title}-{str(uuid.uuid4())[:6]}"

        product_data = {
            "artisan_id": artisan.id,
            "title": payload["title"],
            "slug": slug,
            "description_en": payload["description_en"],
            "description_hi": payload.get("description_hi"),
            "category_id": payload["category_id"],
            "subcategory_id": payload.get("subcategory_id"),
            "tradition_id": payload["tradition_id"],
            "base_price": breakdown["base_price"],
            "artisan_share": breakdown["artisan_share"],
            "platform_fee": breakdown["platform_fee"],
            "delivery_fee": breakdown["delivery_fee"],
            "ai_confidence_score": payload.get("ai_confidence_score"),
            "status": "pending_review"
        }

        images = payload.get("image_urls", [])
        if not images:
            images = ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80"]

        variants = payload.get("variants", [{"variant_name": "Standard", "stock_quantity": 5}])

        product = await self.product_repo.create_product(product_data, images, variants)
        return product
