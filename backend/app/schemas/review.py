from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field

class ReviewCreateRequest(BaseModel):
    order_item_id: str # Strictly required for verified purchase enforcement
    rating: int = Field(ge=1, le=5)
    review_text: str = Field(min_length=5, max_length=1000)
    image_urls: List[str] = []

class ReviewSchema(BaseModel):
    id: str
    product_id: str
    user_id: str
    order_item_id: str
    rating: int
    review_text: str
    is_verified: bool
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
