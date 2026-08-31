import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    suborder_id = Column(String(36), ForeignKey("suborders.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    tracking_number = Column(String(100), unique=True, nullable=False, index=True)
    carrier = Column(String(100), default="Delhivery Heritage Express", nullable=False)
    status = Column(String(30), default="manifested", nullable=False, index=True) # manifested, in_transit, out_for_delivery, delivered
    estimated_delivery = Column(DateTime, nullable=True)
    delivered_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    suborder = relationship("SubOrder", back_populates="shipment")
    tracking_history = relationship("ShipmentTracking", back_populates="shipment", cascade="all, delete-orphan", lazy="selectin")
