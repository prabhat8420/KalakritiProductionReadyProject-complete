from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class AddressCreateRequest(BaseModel):
    label: str = "Home"
    full_name: str = Field(min_length=2)
    phone: str = Field(min_length=10)
    street_address: str = Field(min_length=5)
    city: str
    state: str
    pincode: str = Field(min_length=6, max_length=6)
    is_default: bool = False

class AddressSchema(BaseModel):
    id: str
    user_id: str
    label: str
    full_name: str
    phone: str
    street_address: str
    city: str
    state: str
    pincode: str
    is_default: bool
    created_at: datetime

    class Config:
        from_attributes = True
