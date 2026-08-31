from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class ModerationActionRequest(BaseModel):
    action: str # approved, rejected
    notes: Optional[str] = None

class ProductModerationLogSchema(BaseModel):
    id: str
    product_id: str
    reviewed_by: Optional[str] = None
    action: str
    notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
