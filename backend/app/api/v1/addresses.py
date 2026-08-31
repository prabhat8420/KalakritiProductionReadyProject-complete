from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.dependencies import get_current_user
from app.models.address import Address
from app.schemas.address import AddressCreateRequest, AddressSchema

router = APIRouter(prefix="/addresses", tags=["Addresses"])

@router.get("", response_model=List[AddressSchema])
async def list_my_addresses(current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(Address).where(Address.user_id == current_user["sub"]).order_by(Address.created_at.desc())
    result = await db.execute(stmt)
    return list(result.scalars().all())

@router.post("", response_model=AddressSchema, status_code=status.HTTP_201_CREATED)
async def create_address(
    req: AddressCreateRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    addr = Address(
        user_id=current_user["sub"],
        label=req.label,
        full_name=req.full_name,
        phone=req.phone,
        street_address=req.street_address,
        city=req.city,
        state=req.state,
        pincode=req.pincode,
        is_default=req.is_default
    )
    db.add(addr)
    await db.flush()
    return addr
