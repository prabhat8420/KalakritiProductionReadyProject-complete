from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.dependencies import get_current_user
from app.schemas.product import ProductSchema
from app.schemas.product_moderation import ModerationActionRequest
from app.services.moderation.moderation_queue_service import ModerationQueueService
from app.core.exceptions import ForbiddenException

router = APIRouter(prefix="/moderation", tags=["Admin Moderation"])

@router.get("/products", response_model=List[ProductSchema])
async def list_pending_products(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if "admin" not in current_user.get("roles", []):
        raise ForbiddenException("Admin access required")
    service = ModerationQueueService(db)
    return await service.list_pending_products()

@router.post("/products/{product_id}/action", response_model=ProductSchema)
async def moderate_product(
    product_id: str,
    req: ModerationActionRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if "admin" not in current_user.get("roles", []):
        raise ForbiddenException("Admin access required")
    service = ModerationQueueService(db)
    return await service.moderate_product(
        product_id=product_id,
        admin_user_id=current_user["sub"],
        action=req.action,
        notes=req.notes
    )
