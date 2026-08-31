import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class InventoryTransaction(Base):
    __tablename__ = "inventory_transactions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    inventory_id = Column(String(36), ForeignKey("inventory.id", ondelete="CASCADE"), nullable=False, index=True)
    change_type = Column(String(50), nullable=False) # restock, sale, reservation, adjustment, release
    quantity_change = Column(Integer, nullable=False)
    reference_id = Column(String(100), nullable=True) # Order ID or note
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    inventory = relationship("Inventory", back_populates="transactions")
