from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.user import User, user_roles
from app.models.role import Role

class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, user_id: str) -> Optional[User]:
        stmt = select(User).options(selectinload(User.roles), selectinload(User.artisan_profile)).where(User.id == user_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[User]:
        stmt = select(User).options(selectinload(User.roles), selectinload(User.artisan_profile)).where(User.email == email.lower().strip())
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_or_create_role(self, role_name: str) -> Role:
        stmt = select(Role).where(Role.name == role_name.lower())
        result = await self.db.execute(stmt)
        role = result.scalar_one_or_none()
        if not role:
            role = Role(name=role_name.lower())
            self.db.add(role)
            await self.db.flush()
        return role

    async def create_user(self, email: str, password_hash: str, full_name: str, phone: Optional[str] = None, role_names: List[str] = None) -> User:
        user = User(
            email=email.lower().strip(),
            password_hash=password_hash,
            full_name=full_name,
            phone=phone,
            is_active=True
        )
        if role_names:
            for r_name in role_names:
                role = await self.get_or_create_role(r_name)
                user.roles.append(role)
        self.db.add(user)
        await self.db.flush()

        if role_names and "artisan" in [r.lower() for r in role_names]:
            from app.models.artisan import Artisan
            artisan = Artisan(
                user_id=user.id,
                display_name=full_name,
                bio=f"Master artisan preserving authentic handcrafted heritage traditions.",
                region="India",
                craft_tradition="Heritage Handcraft",
                verification_status="verified",
                years_active=10,
                avg_rating=5.0,
                review_count=0
            )
            self.db.add(artisan)
            await self.db.flush()

        return await self.get_by_id(user.id)
