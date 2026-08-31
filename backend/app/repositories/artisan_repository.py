from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.artisan import Artisan
from app.models.artisan_document import ArtisanDocument
from app.models.artisan_verification import ArtisanVerification
from app.models.artisan_bank_account import ArtisanBankAccount

class ArtisanRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, artisan_id: str) -> Optional[Artisan]:
        stmt = select(Artisan).options(
            selectinload(Artisan.documents),
            selectinload(Artisan.verifications),
            selectinload(Artisan.bank_accounts)
        ).where(Artisan.id == artisan_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_user_id(self, user_id: str) -> Optional[Artisan]:
        stmt = select(Artisan).options(
            selectinload(Artisan.documents),
            selectinload(Artisan.verifications),
            selectinload(Artisan.bank_accounts)
        ).where(Artisan.user_id == user_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def list_artisans(self, status: Optional[str] = None, limit: int = 50, offset: int = 0) -> List[Artisan]:
        stmt = select(Artisan).options(selectinload(Artisan.documents))
        if status:
            stmt = stmt.where(Artisan.verification_status == status)
        stmt = stmt.limit(limit).offset(offset)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def create_artisan(self, user_id: str, display_name: str, bio: str, region: str, craft_tradition: str, years_active: int = 1, state_id: Optional[str] = None, workshop_address: Optional[str] = None) -> Artisan:
        artisan = Artisan(
            user_id=user_id,
            display_name=display_name,
            bio=bio,
            region=region,
            craft_tradition=craft_tradition,
            years_active=years_active,
            state_id=state_id,
            workshop_address=workshop_address,
            verification_status="pending"
        )
        self.db.add(artisan)
        await self.db.flush()
        return artisan

    async def add_bank_account(self, artisan_id: str, account_holder_name: str, bank_name: str, account_number: str, ifsc_code: str) -> ArtisanBankAccount:
        bank = ArtisanBankAccount(
            artisan_id=artisan_id,
            account_holder_name=account_holder_name,
            bank_name=bank_name,
            account_details=f"{bank_name} - {account_number[-4:]}",
            ifsc_code=ifsc_code,
            is_primary=True
        )
        self.db.add(bank)
        await self.db.flush()
        return bank

    async def update_status(self, artisan_id: str, status: str, admin_user_id: Optional[str] = None, notes: Optional[str] = None) -> Optional[Artisan]:
        artisan = await self.get_by_id(artisan_id)
        if not artisan:
            return None
        artisan.verification_status = status
        verification = ArtisanVerification(
            artisan_id=artisan_id,
            reviewed_by=admin_user_id,
            status=status,
            notes=notes
        )
        self.db.add(verification)
        await self.db.flush()
        return artisan
