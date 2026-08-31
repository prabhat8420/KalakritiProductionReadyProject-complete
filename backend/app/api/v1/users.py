from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.dependencies import get_current_user
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserSchema
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserSchema)
async def get_my_profile(current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    user = await repo.get_by_id(current_user["sub"])
    if not user:
        raise NotFoundException("User", current_user["sub"])
    
    return {
        "id": user.id,
        "email": user.email,
        "phone": user.phone,
        "full_name": user.full_name,
        "is_active": user.is_active,
        "is_verified": user.is_verified,
        "roles": [r.name for r in user.roles],
        "artisan_id": user.artisan_profile.id if user.artisan_profile else None,
        "created_at": user.created_at
    }
