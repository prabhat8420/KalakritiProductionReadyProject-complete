from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class ArtisanVerificationActionRequest(BaseModel):
    status: str # approved, rejected
    notes: Optional[str] = None

class ArtisanVerificationSchema(BaseModel):
    id: str
    artisan_id: str
    reviewed_by: Optional[str] = None
    status: str
    notes: Optional[str] = None
    reviewed_at: datetime

    class Config:
        from_attributes = True
