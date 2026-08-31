from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.repositories.category_repository import CategoryRepository
from app.schemas.tradition import TraditionSchema
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/traditions", tags=["Traditions"])

@router.get("", response_model=List[TraditionSchema])
async def list_traditions(db: AsyncSession = Depends(get_db)):
    repo = CategoryRepository(db)
    return await repo.list_traditions()

@router.get("/{slug}", response_model=TraditionSchema)
async def get_tradition(slug: str, db: AsyncSession = Depends(get_db)):
    repo = CategoryRepository(db)
    tradition = await repo.get_tradition_by_slug(slug)
    if not tradition:
        raise NotFoundException("Tradition", slug)
    return tradition
