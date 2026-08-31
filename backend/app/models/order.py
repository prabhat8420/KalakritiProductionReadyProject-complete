import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Order(Base):
    """
    Parent Order representing one unified customer checkout.
    A single order can contain items from multiple independent artisans.
    """
    __tablename__ = "orders"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_number = Column(String(50), unique=True, nullable=False, index=True) # e.g. KLK-ORD-202608-1001
    user_id = Column(String(36), ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True)
    address_id = Column(String(36), ForeignKey("addresses.id", ondelete="SET NULL"), nullable=True)
    total_amount = Column(Float, nullable=False) # In INR
    currency = Column(String(10), default="INR", nullable=False)
    status = Column(String(30), default="pending", nullable=False, index=True) # pending, paid, processing, completed, cancelled
    razorpay_order_id = Column(String(100), unique=True, nullable=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", lazy="selectin")
    address = relationship("Address", lazy="selectin")
    suborders = relationship("SubOrder", back_populates="order", cascade="all, delete-orphan", lazy="selectin")
    payment = relationship("Payment", back_populates="order", uselist=False, cascade="all, delete-orphan", lazy="selectin")
