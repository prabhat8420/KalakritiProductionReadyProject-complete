from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.order import Order
from app.models.suborder import SubOrder
from app.models.order_item import OrderItem
from app.models.order_price_breakdown import OrderPriceBreakdown

class OrderRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, order_id: str) -> Optional[Order]:
        stmt = select(Order).options(
            selectinload(Order.user),
            selectinload(Order.address),
            selectinload(Order.suborders).selectinload(SubOrder.artisan),
            selectinload(Order.suborders).selectinload(SubOrder.items).selectinload(OrderItem.price_breakdown)
        ).where(Order.id == order_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_order_number(self, order_number: str) -> Optional[Order]:
        stmt = select(Order).options(
            selectinload(Order.suborders).selectinload(SubOrder.artisan),
            selectinload(Order.suborders).selectinload(SubOrder.items).selectinload(OrderItem.price_breakdown)
        ).where(Order.order_number == order_number)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def list_user_orders(self, user_id: str) -> List[Order]:
        stmt = select(Order).options(
            selectinload(Order.suborders).selectinload(SubOrder.artisan),
            selectinload(Order.suborders).selectinload(SubOrder.items).selectinload(OrderItem.price_breakdown)
        ).where(Order.user_id == user_id).order_by(Order.created_at.desc())
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def list_artisan_suborders(self, artisan_id: str) -> List[SubOrder]:
        stmt = select(SubOrder).options(
            selectinload(SubOrder.items).selectinload(OrderItem.price_breakdown),
            selectinload(SubOrder.order)
        ).where(SubOrder.artisan_id == artisan_id).order_by(SubOrder.created_at.desc())
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
