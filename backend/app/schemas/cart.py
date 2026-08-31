from typing import List, Optional
from pydantic import BaseModel, Field

class AddToCartRequest(BaseModel):
    product_variant_id: str
    quantity: int = Field(ge=1, default=1)

class CartItemSchema(BaseModel):
    id: str
    product_variant_id: str
    product_id: str
    product_title: str
    product_slug: str
    variant_name: str
    image_url: Optional[str] = None
    artisan_id: str
    artisan_name: str
    unit_price: float
    artisan_share: float
    platform_fee: float
    delivery_fee: float
    quantity: int
    item_total: float

class CartArtisanGroupSchema(BaseModel):
    artisan_id: str
    artisan_name: str
    craft_tradition: str
    items: List[CartItemSchema]
    subtotal: float

class CartSchema(BaseModel):
    id: str
    groups: List[CartArtisanGroupSchema] = []
    total_items: int = 0
    grand_total: float = 0.0
    total_artisan_share: float = 0.0
