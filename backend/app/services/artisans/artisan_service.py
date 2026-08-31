from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.artisan_repository import ArtisanRepository
from app.repositories.user_repository import UserRepository
from app.core.exceptions import AppException, NotFoundException

class ArtisanService:
    def __init__(self, db: AsyncSession):
        self.artisan_repo = ArtisanRepository(db)
        self.user_repo = UserRepository(db)

    async def register_artisan(self, user_id: str, payload: dict) -> dict:
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise NotFoundException("User", user_id)

        existing = await self.artisan_repo.get_by_user_id(user_id)
        if existing:
            raise AppException(400, "Artisan profile already exists for this account")

        # Ensure artisan role is assigned
        artisan_role = await self.user_repo.get_or_create_role("artisan")
        if artisan_role not in user.roles:
            user.roles.append(artisan_role)

        artisan = await self.artisan_repo.create_artisan(
            user_id=user_id,
            display_name=payload.get("display_name"),
            bio=payload.get("bio"),
            region=payload.get("region"),
            craft_tradition=payload.get("craft_tradition"),
            years_active=payload.get("years_active", 1),
            state_id=payload.get("state_id"),
            workshop_address=payload.get("workshop_address")
        )

        if payload.get("bank_name") and payload.get("account_number"):
            await self.artisan_repo.add_bank_account(
                artisan_id=artisan.id,
                account_holder_name=payload.get("bank_account_holder", artisan.display_name),
                bank_name=payload.get("bank_name"),
                account_number=payload.get("account_number"),
                ifsc_code=payload.get("ifsc_code", "")
            )

        return {
            "id": artisan.id,
            "user_id": artisan.user_id,
            "display_name": artisan.display_name,
            "bio": artisan.bio,
            "region": artisan.region,
            "craft_tradition": artisan.craft_tradition,
            "verification_status": artisan.verification_status,
            "years_active": artisan.years_active,
            "avg_rating": artisan.avg_rating,
            "review_count": artisan.review_count,
            "created_at": artisan.created_at
        }
