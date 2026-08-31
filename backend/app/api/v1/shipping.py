from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.dependencies import get_current_user
from app.schemas.shipping import CreateShipmentRequest, ShipmentSchema
from app.services.shipping.shipping_service import ShippingService

router = APIRouter(prefix="/shipping", tags=["Shipping & Logistics"])

@router.post("/shipments", response_model=ShipmentSchema, status_code=status.HTTP_201_CREATED)
async def create_shipment(
    req: CreateShipmentRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ShippingService(db)
    return await service.create_shipment_for_suborder(req.suborder_id, req.carrier)

@router.post("/webhook/tracking")
async def shipping_tracking_webhook(
    tracking_number: str,
    status: str,
    location: str,
    description: str = None,
    db: AsyncSession = Depends(get_db)
):
    service = ShippingService(db)
    return await service.update_tracking_status(tracking_number, status, location, description)
