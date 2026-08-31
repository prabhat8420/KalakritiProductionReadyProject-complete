from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.repositories.category_repository import CategoryRepository
from app.schemas.tradition import StateSchema

router = APIRouter(prefix="/states", tags=["States"])

@router.get("", response_model=List[StateSchema])
async def list_states(db: AsyncSession = Depends(get_db)):
    repo = CategoryRepository(db)
    return await repo.list_states()
