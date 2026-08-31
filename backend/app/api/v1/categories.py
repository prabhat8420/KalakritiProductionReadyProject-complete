from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.repositories.category_repository import CategoryRepository
from app.schemas.category import CategorySchema
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get("", response_model=List[CategorySchema])
async def list_categories(db: AsyncSession = Depends(get_db)):
    repo = CategoryRepository(db)
    return await repo.list_categories()

@router.get("/{slug}", response_model=CategorySchema)
async def get_category(slug: str, db: AsyncSession = Depends(get_db)):
    repo = CategoryRepository(db)
    category = await repo.get_by_slug(slug)
    if not category:
        raise NotFoundException("Category", slug)
    return category
