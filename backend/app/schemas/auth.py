from typing import Optional, List
from pydantic import BaseModel, Field

class UserRegisterRequest(BaseModel):
    email: str
    password: str = Field(min_length=6)
    full_name: str = Field(min_length=2, max_length=100)
    phone: Optional[str] = None
    role: str = "customer" # customer, artisan, admin

class UserLoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
    user: dict
