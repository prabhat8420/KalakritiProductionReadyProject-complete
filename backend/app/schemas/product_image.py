from datetime import datetime
from pydantic import BaseModel

class ProductImageSchema(BaseModel):
    id: str
    product_id: str
    image_url: str
    display_order: int
    is_primary: bool

    class Config:
        from_attributes = True
