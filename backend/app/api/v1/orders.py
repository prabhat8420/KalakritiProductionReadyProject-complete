from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.dependencies import get_current_user
from app.schemas.order import OrderCheckoutRequest, OrderSchema, SubOrderSchema
from app.services.orders.order_split_service import OrderSplitService
from app.repositories.order_repository import OrderRepository
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/checkout", response_model=OrderSchema, status_code=status.HTTP_201_CREATED)
async def checkout_order(
    req: OrderCheckoutRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = OrderSplitService(db)
    order = await service.split_cart_and_create_order(current_user["sub"], req.address_id)
    return order

@router.get("", response_model=List[OrderSchema])
async def list_my_orders(current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    repo = OrderRepository(db)
    return await repo.list_user_orders(current_user["sub"])

@router.get("/{order_id}", response_model=OrderSchema)
async def get_order_by_id(
    order_id: str,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    repo = OrderRepository(db)
    order = await repo.get_by_id(order_id)
    if not order:
        raise NotFoundException("Order", order_id)
    return order

@router.get("/artisan/suborders", response_model=List[SubOrderSchema])
async def list_artisan_suborders(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    repo = OrderRepository(db)
    artisan_id = current_user.get("artisan_id")
    if not artisan_id:
        return []
    return await repo.list_artisan_suborders(artisan_id)
