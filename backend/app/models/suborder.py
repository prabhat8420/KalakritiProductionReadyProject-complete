import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class SubOrder(Base):
    """
    Per-Artisan Suborder.
    Order Split Service creates exactly 1 SubOrder per artisan per checkout.
    Has independent fulfillment lifecycle, carrier tracking, and payout calculation.
    """
    __tablename__ = "suborders"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    suborder_number = Column(String(60), unique=True, nullable=False, index=True) # e.g. KLK-SUB-202608-1001-A1
    order_id = Column(String(36), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    artisan_id = Column(String(36), ForeignKey("artisans.id", ondelete="RESTRICT"), nullable=False, index=True)
    subtotal = Column(Float, nullable=False)
    artisan_earnings = Column(Float, nullable=False) # Net amount owed to this artisan
    platform_commission = Column(Float, nullable=False)
    delivery_fee = Column(Float, nullable=False)
    status = Column(String(30), default="placed", nullable=False, index=True) # placed, confirmed, in_crafting, shipped, delivered, cancelled
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    order = relationship("Order", back_populates="suborders")
    artisan = relationship("Artisan", lazy="selectin")
    items = relationship("OrderItem", back_populates="suborder", cascade="all, delete-orphan", lazy="selectin")
    status_history = relationship("OrderStatusHistory", back_populates="suborder", cascade="all, delete-orphan", lazy="selectin")
    shipment = relationship("Shipment", back_populates="suborder", uselist=False, cascade="all, delete-orphan", lazy="selectin")
    artisan_earning = relationship("ArtisanEarning", back_populates="suborder", uselist=False, cascade="all, delete-orphan", lazy="selectin")

    @property
    def artisan_name(self) -> str:
        return self.artisan.display_name if self.artisan else "Master Artisan"
