from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.product_image import ProductImageSchema
from app.schemas.certification import ProductCertificationSchema

class ProductVariantCreate(BaseModel):
    variant_name: str = "Standard"
    price_delta: float = 0.0
    stock_quantity: int = Field(ge=1, default=5)

class ProductVariantSchema(BaseModel):
    id: str
    product_id: str
    variant_name: str
    price_delta: float
    stock_quantity: int

    class Config:
        from_attributes = True

class PriceBreakdownSchema(BaseModel):
    base_price: float
    artisan_share: float
    platform_fee: float
    delivery_fee: float
    total_price: float

class ProductCreateRequest(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    description_en: str = Field(min_length=10)
    description_hi: Optional[str] = None
    category_id: str
    subcategory_id: Optional[str] = None
    tradition_id: str
    base_price: float = Field(gt=0)
    image_urls: List[str] = []
    variants: List[ProductVariantCreate] = [ProductVariantCreate()]
    ai_confidence_score: Optional[float] = None

class ProductCatalogingAIRequest(BaseModel):
    image_url: str

class ProductCatalogingAIResponse(BaseModel):
    category_id: str
    category_name: str
    tradition_id: str
    tradition_name: str
    suggested_title_en: str
    suggested_title_hi: str
    description_en: str
    description_hi: str
    recommended_base_price: float
    ai_confidence_score: float

class ProductSchema(BaseModel):
    id: str
    artisan_id: str
    title: str
    slug: str
    description_en: str
    description_hi: Optional[str] = None
    category_id: str
    subcategory_id: Optional[str] = None
    tradition_id: str
    base_price: float
    artisan_share: float
    platform_fee: float
    delivery_fee: float
    total_price: float
    ai_confidence_score: Optional[float] = None
    status: str
    images: List[ProductImageSchema] = []
    variants: List[ProductVariantSchema] = []
    certification: Optional[ProductCertificationSchema] = None
    created_at: datetime

    class Config:
        from_attributes = True
