import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class OrderStatusHistory(Base):
    __tablename__ = "order_status_history"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    suborder_id = Column(String(36), ForeignKey("suborders.id", ondelete="CASCADE"), nullable=False, index=True)
    status = Column(String(30), nullable=False)
    notes = Column(Text, nullable=True)
    changed_by = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    changed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    suborder = relationship("SubOrder", back_populates="status_history")
    actor = relationship("User")
