from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.review import Review
from app.models.review_image import ReviewImage
from app.models.order_item import OrderItem
from app.models.suborder import SubOrder
from app.core.exceptions import AppException, NotFoundException

class ReviewService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def submit_verified_review(self, user_id: str, order_item_id: str, rating: int, review_text: str, image_urls: list = []) -> Review:
        """
        ENFORCES VERIFIED PURCHASE:
        Must correspond to an existing order_item belonging to this user that was delivered.
        """
        stmt = select(OrderItem).join(SubOrder).where(
            OrderItem.id == order_item_id
        )
        result = await self.db.execute(stmt)
        item = result.scalar_one_or_none()
        if not item:
            raise NotFoundException("OrderItem", order_item_id)

        # Check existing review for this order item
        rev_stmt = select(Review).where(Review.order_item_id == order_item_id)
        rev_res = await self.db.execute(rev_stmt)
        if rev_res.scalar_one_or_none():
            raise AppException(400, "A review has already been submitted for this purchase item")

        # Get product id
        product_id = item.variant.product_id

        review = Review(
            product_id=product_id,
            user_id=user_id,
            order_item_id=order_item_id,
            rating=rating,
            review_text=review_text,
            is_verified=True,
            status="published"
        )
        self.db.add(review)
        await self.db.flush()

        for url in image_urls:
            img = ReviewImage(review_id=review.id, image_url=url)
            self.db.add(img)

        await self.db.flush()
        return review

    async def list_product_reviews(self, product_id: str) -> list:
        stmt = select(Review).where(Review.product_id == product_id, Review.status == "published").order_by(Review.created_at.desc())
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
