from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field

class ArtisanDocumentSchema(BaseModel):
    id: str
    document_type: str
    file_url: str
    uploaded_at: datetime

    class Config:
        from_attributes = True

class ArtisanCreateRequest(BaseModel):
    display_name: str = Field(min_length=2, max_length=100)
    bio: str = Field(min_length=10)
    region: str
    craft_tradition: str
    years_active: int = Field(ge=0, default=1)
    workshop_address: Optional[str] = None
    state_id: Optional[str] = None
    bank_account_holder: Optional[str] = None
    bank_name: Optional[str] = None
    account_number: Optional[str] = None
    ifsc_code: Optional[str] = None

class ArtisanSchema(BaseModel):
    id: str
    user_id: str
    display_name: str
    bio: str
    region: str
    craft_tradition: str
    verification_status: str
    years_active: int
    avg_rating: float
    review_count: int
    profile_photo_url: Optional[str] = None
    state_id: Optional[str] = None
    documents: List[ArtisanDocumentSchema] = []
    created_at: datetime

    class Config:
        from_attributes = True
