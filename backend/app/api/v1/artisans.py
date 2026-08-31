from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.core.database import get_db
from app.dependencies import get_current_user
from app.schemas.artisan import ArtisanCreateRequest, ArtisanSchema
from app.services.artisans.artisan_service import ArtisanService
from app.repositories.artisan_repository import ArtisanRepository
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/artisans", tags=["Artisans"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
@router.post("/onboarding", status_code=status.HTTP_201_CREATED)
async def register_artisan(
    req: ArtisanCreateRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ArtisanService(db)
    return await service.register_artisan(current_user["sub"], req.model_dump())


@router.get("/me")
async def get_my_artisan_profile(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    repo = ArtisanRepository(db)
    artisan = await repo.get_by_user_id(current_user["sub"])
    if not artisan:
        raise NotFoundException("ArtisanProfile", current_user["sub"])
    return artisan

@router.get("", response_model=List[ArtisanSchema])
async def list_artisans(
    status: Optional[str] = "verified",
    db: AsyncSession = Depends(get_db)
):
    repo = ArtisanRepository(db)
    return await repo.list_artisans(status=status)

@router.get("/{artisan_id}", response_model=ArtisanSchema)
async def get_artisan_by_id(artisan_id: str, db: AsyncSession = Depends(get_db)):
    repo = ArtisanRepository(db)
    artisan = await repo.get_by_id(artisan_id)
    if not artisan:
        raise NotFoundException("Artisan", artisan_id)
    return artisan
