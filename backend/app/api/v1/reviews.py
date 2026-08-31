from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.dependencies import get_current_user
from app.schemas.review import ReviewCreateRequest, ReviewSchema
from app.services.reviews.review_service import ReviewService

router = APIRouter(prefix="/reviews", tags=["Verified Reviews"])

@router.post("", response_model=ReviewSchema, status_code=status.HTTP_201_CREATED)
async def submit_review(
    req: ReviewCreateRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ReviewService(db)
    return await service.submit_verified_review(
        user_id=current_user["sub"],
        order_item_id=req.order_item_id,
        rating=req.rating,
        review_text=req.review_text,
        image_urls=req.image_urls
    )

@router.get("/product/{product_id}", response_model=List[ReviewSchema])
async def list_reviews(product_id: str, db: AsyncSession = Depends(get_db)):
    service = ReviewService(db)
    return await service.list_product_reviews(product_id)
