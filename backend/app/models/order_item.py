import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class OrderItem(Base):
    """
    Tied strictly to suborder_id, NOT order directly.
    """
    __tablename__ = "order_items"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    suborder_id = Column(String(36), ForeignKey("suborders.id", ondelete="CASCADE"), nullable=False, index=True)
    product_variant_id = Column(String(36), ForeignKey("product_variants.id", ondelete="RESTRICT"), nullable=False, index=True)
    product_title = Column(String(200), nullable=False)
    variant_name = Column(String(100), nullable=False)
    quantity = Column(Integer, default=1, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    suborder = relationship("SubOrder", back_populates="items")
    variant = relationship("ProductVariant", lazy="selectin")
    price_breakdown = relationship("OrderPriceBreakdown", back_populates="order_item", uselist=False, cascade="all, delete-orphan", lazy="selectin")
    review = relationship("Review", back_populates="order_item", uselist=False)
    repair_tickets = relationship("RepairTicket", back_populates="order_item")
