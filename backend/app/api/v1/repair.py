from typing import Optional
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.dependencies import get_current_user_optional
from app.schemas.repair import DamageDiagnosisRequest, RepairTicketSchema
from app.services.repair.craft_doctor_service import CraftDoctorService

router = APIRouter(prefix="/repair", tags=["Craft Doctor (Repair Flow)"])

@router.post("/diagnose", response_model=RepairTicketSchema, status_code=status.HTTP_201_CREATED)
async def diagnose_damage(
    req: DamageDiagnosisRequest,
    current_user: Optional[dict] = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db)
):
    service = CraftDoctorService(db)
    user_id = current_user["sub"] if current_user else "anonymous-patron"
    return await service.diagnose_damage_and_match(
        user_id=user_id,
        order_item_id=req.order_item_id,
        damage_photo_url=req.damage_photo_url
    )
