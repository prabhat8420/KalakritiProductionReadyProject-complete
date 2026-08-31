from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.category import Category
from app.models.subcategory import Subcategory
from app.models.tradition import Tradition
from app.models.craft import Craft
from app.models.state import State

class CategoryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_categories(self) -> List[Category]:
        stmt = select(Category).options(selectinload(Category.subcategories)).order_by(Category.name)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_by_slug(self, slug: str) -> Optional[Category]:
        stmt = select(Category).options(selectinload(Category.subcategories)).where(Category.slug == slug)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def list_traditions(self) -> List[Tradition]:
        stmt = select(Tradition).options(selectinload(Tradition.crafts)).order_by(Tradition.name)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_tradition_by_slug(self, slug: str) -> Optional[Tradition]:
        stmt = select(Tradition).options(selectinload(Tradition.crafts)).where(Tradition.slug == slug)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def list_states(self) -> List[State]:
        stmt = select(State).options(selectinload(State.districts)).order_by(State.name)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
