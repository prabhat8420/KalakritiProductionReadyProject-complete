import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class OrderPriceBreakdown(Base):
    """
    Persists immutable snapshot of transparent price breakdown at time of checkout.
    Guarantees financial integrity even if product price changes in the future.
    """
    __tablename__ = "order_price_breakdowns"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_item_id = Column(String(36), ForeignKey("order_items.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    base_price = Column(Float, nullable=False)
    artisan_share = Column(Float, nullable=False)
    platform_fee = Column(Float, nullable=False)
    delivery_fee = Column(Float, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    order_item = relationship("OrderItem", back_populates="price_breakdown")
