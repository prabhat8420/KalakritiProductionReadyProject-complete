import uuid
from datetime import datetime, timezone, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.shipment import Shipment
from app.models.shipment_tracking import ShipmentTracking
from app.models.suborder import SubOrder
from app.core.exceptions import AppException, NotFoundException

class ShippingService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_shipment_for_suborder(self, suborder_id: str, carrier: str = "Delhivery Heritage Express") -> Shipment:
        stmt_exist = select(Shipment).options(selectinload(Shipment.tracking_history)).where(Shipment.suborder_id == suborder_id)
        exist_res = await self.db.execute(stmt_exist)
        existing = exist_res.scalar_one_or_none()
        if existing:
            return existing

        stmt = select(SubOrder).where(SubOrder.id == suborder_id)
        result = await self.db.execute(stmt)
        suborder = result.scalar_one_or_none()
        if not suborder:
            raise NotFoundException("SubOrder", suborder_id)


        tracking_num = f"KLK-DLV-{datetime.now(timezone.utc).strftime('%Y%m')}-{str(uuid.uuid4())[:8].upper()}"
        now = datetime.now(timezone.utc)

        shipment = Shipment(
            suborder_id=suborder.id,
            tracking_number=tracking_num,
            carrier=carrier,
            status="manifested",
            estimated_delivery=now + timedelta(days=4)
        )
        self.db.add(shipment)
        await self.db.flush()

        # Add initial tracking event
        track = ShipmentTracking(
            shipment_id=shipment.id,
            status="manifested",
            location=f"Artisan Studio Hub",
            description="Heritage craft package picked up and sealed in bubble wrap casing."
        )
        self.db.add(track)

        suborder.status = "shipped"
        await self.db.flush()

        stmt = select(Shipment).options(selectinload(Shipment.tracking_history)).where(Shipment.id == shipment.id)
        res = await self.db.execute(stmt)
        return res.scalar_one()

    async def update_tracking_status(self, tracking_number: str, status: str, location: str, description: str = None) -> Shipment:
        stmt = select(Shipment).where(Shipment.tracking_number == tracking_number)
        result = await self.db.execute(stmt)
        shipment = result.scalar_one_or_none()
        if not shipment:
            raise NotFoundException("Shipment", tracking_number)

        shipment.status = status
        if status == "delivered":
            shipment.delivered_at = datetime.now(timezone.utc)
            # Update parent suborder
            sub_stmt = select(SubOrder).where(SubOrder.id == shipment.suborder_id)
            sub_res = await self.db.execute(sub_stmt)
            suborder = sub_res.scalar_one_or_none()
            if suborder:
                suborder.status = "delivered"

        track = ShipmentTracking(
            shipment_id=shipment.id,
            status=status,
            location=location,
            description=description
        )
        self.db.add(track)
        await self.db.flush()

        reload_stmt = select(Shipment).options(selectinload(Shipment.tracking_history)).where(Shipment.id == shipment.id)
        reload_res = await self.db.execute(reload_stmt)
        return reload_res.scalar_one()

