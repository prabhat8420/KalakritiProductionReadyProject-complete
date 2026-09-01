from typing import Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.user_repository import UserRepository
from app.services.auth.password_service import PasswordService
from app.services.auth.token_service import TokenService
from app.core.exceptions import AppException, UnauthorizedException
from app.core.redis import cache_set

class AuthenticationService:
    def __init__(self, db: AsyncSession):
        self.user_repo = UserRepository(db)

    async def register(self, email: str, password: str, full_name: str, phone: str = None, role: str = "customer") -> Dict[str, Any]:
        existing = await self.user_repo.get_by_email(email)
        if existing:
            raise AppException(400, "A user with this email address already exists")

        pw_hash = PasswordService.hash(password)
        roles_to_assign = [role.lower()]
        user = await self.user_repo.create_user(
            email=email,
            password_hash=pw_hash,
            full_name=full_name,
            phone=phone,
            role_names=roles_to_assign
        )

        role_names = [r.name for r in user.roles]
        token_info = TokenService.generate_auth_tokens(user.id, role_names)
        
        # Cache session in Redis
        await cache_set(f"session:{user.id}", {"email": user.email, "roles": role_names}, ttl_seconds=3600*24)

        artisan_id = user.artisan_profile.id if user.artisan_profile else None

        user_data = {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "roles": role_names,
            "artisan_id": artisan_id
        }

        return {**token_info, "user": user_data}

    async def login(self, email: str, password: str) -> Dict[str, Any]:
        user = await self.user_repo.get_by_email(email)
        if not user:
            raise UnauthorizedException("Invalid email or password")

        if not PasswordService.verify(password, user.password_hash):
            raise UnauthorizedException("Invalid email or password")

        if not user.is_active:
            raise UnauthorizedException("Your account is deactivated. Please contact support.")

        role_names = [r.name for r in user.roles]
        token_info = TokenService.generate_auth_tokens(user.id, role_names)
        
        artisan_id = user.artisan_profile.id if user.artisan_profile else None
        
        await cache_set(f"session:{user.id}", {"email": user.email, "roles": role_names, "artisan_id": artisan_id}, ttl_seconds=3600*24)

        user_data = {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "roles": role_names,
            "artisan_id": artisan_id
        }

        return {**token_info, "user": user_data}
