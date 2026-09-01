from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class OrderItemBreakdownSchema(BaseModel):
    base_price: float
    artisan_share: float
    platform_fee: float
    delivery_fee: float

class OrderItemSchema(BaseModel):
    id: str
    suborder_id: str
    product_variant_id: str
    product_title: str
    variant_name: str
    quantity: int
    unit_price: float
    total_price: float
    price_breakdown: Optional[OrderItemBreakdownSchema] = None

    class Config:
        from_attributes = True

class SubOrderSchema(BaseModel):
    id: str
    suborder_number: str
    artisan_id: str
    artisan_name: str
    subtotal: float
    artisan_earnings: float
    platform_commission: float
    delivery_fee: float
    status: str
    items: List[OrderItemSchema] = []
    created_at: datetime

    class Config:
        from_attributes = True

class OrderCheckoutRequest(BaseModel):
    address_id: Optional[str] = None

class OrderSchema(BaseModel):
    id: str
    order_number: str
    user_id: str
    total_amount: float
    currency: str
    status: str
    razorpay_order_id: Optional[str] = None
    suborders: List[SubOrderSchema] = []
    created_at: datetime

    class Config:
        from_attributes = True
