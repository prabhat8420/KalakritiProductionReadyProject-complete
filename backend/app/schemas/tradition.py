from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

class CraftArticleSchema(BaseModel):
    id: str
    craft_id: str
    title: str
    content: str
    author: str
    published_at: datetime

    class Config:
        from_attributes = True

class CraftSchema(BaseModel):
    id: str
    tradition_id: str
    name: str
    slug: str
    description: str
    articles: List[CraftArticleSchema] = []

    class Config:
        from_attributes = True

class TraditionSchema(BaseModel):
    id: str
    name: str
    slug: str
    description: str
    region: str
    state_id: Optional[str] = None
    heritage_origin: Optional[str] = None
    cover_image_url: Optional[str] = None
    crafts: List[CraftSchema] = []

    class Config:
        from_attributes = True

class StateSchema(BaseModel):
    id: str
    name: str
    slug: str
    code: Optional[str] = None

    class Config:
        from_attributes = True
