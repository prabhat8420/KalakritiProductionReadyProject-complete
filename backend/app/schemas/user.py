from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, EmailStr

class RoleSchema(BaseModel):
    id: str
    name: str

class UserSchema(BaseModel):
    id: str
    email: EmailStr
    phone: Optional[str] = None
    full_name: str
    is_active: bool
    is_verified: bool
    roles: List[str]
    artisan_id: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
