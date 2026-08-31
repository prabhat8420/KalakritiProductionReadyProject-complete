from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.auth import UserRegisterRequest, UserLoginRequest, TokenResponse
from app.services.auth.authentication_service import AuthenticationService

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(req: UserRegisterRequest, db: AsyncSession = Depends(get_db)):
    service = AuthenticationService(db)
    return await service.register(
        email=req.email,
        password=req.password,
        full_name=req.full_name,
        phone=req.phone,
        role=req.role
    )

@router.post("/login", response_model=TokenResponse)
async def login(req: UserLoginRequest, db: AsyncSession = Depends(get_db)):
    service = AuthenticationService(db)
    return await service.login(email=req.email, password=req.password)
