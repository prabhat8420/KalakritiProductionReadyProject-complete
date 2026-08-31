from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

class SubcategorySchema(BaseModel):
    id: str
    category_id: str
    name: str
    slug: str

    class Config:
        from_attributes = True

class CategorySchema(BaseModel):
    id: str
    name: str
    slug: str
    description: Optional[str] = None
    icon_name: Optional[str] = None
    parent_category_id: Optional[str] = None
    subcategories: List[SubcategorySchema] = []

    class Config:
        from_attributes = True
