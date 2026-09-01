from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.cart import Cart
from app.models.cart_item import CartItem

class CartRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_or_create_cart(self, user_id: Optional[str] = None, cart_id: Optional[str] = None) -> Cart:
        if user_id:
            stmt = select(Cart).options(
                selectinload(Cart.items).selectinload(CartItem.variant)
            ).where(Cart.user_id == user_id)
            result = await self.db.execute(stmt)
            cart = result.scalar_one_or_none()
            if cart:
                return cart

        if cart_id:
            stmt = select(Cart).options(
                selectinload(Cart.items).selectinload(CartItem.variant)
            ).where(Cart.id == cart_id)
            result = await self.db.execute(stmt)
            cart = result.scalar_one_or_none()
            if cart:
                return cart

        # Create new cart
        cart = Cart(user_id=user_id)
        cart.items = []
        self.db.add(cart)
        await self.db.flush()
        return cart

    async def add_item(self, cart_id: str, variant_id: str, quantity: int = 1) -> CartItem:
        stmt = select(CartItem).where(CartItem.cart_id == cart_id, CartItem.product_variant_id == variant_id)
        result = await self.db.execute(stmt)
        item = result.scalar_one_or_none()
        if item:
            item.quantity += quantity
        else:
            item = CartItem(cart_id=cart_id, product_variant_id=variant_id, quantity=quantity)
            self.db.add(item)
        await self.db.flush()
        return item

    async def clear_cart(self, cart_id: str):
        stmt = select(CartItem).where(CartItem.cart_id == cart_id)
        result = await self.db.execute(stmt)
        for item in result.scalars().all():
            await self.db.delete(item)
        await self.db.flush()
