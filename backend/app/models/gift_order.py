import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class GiftOrder(Base):
    __tablename__ = "gift_orders"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String(36), ForeignKey("orders.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    recipient_name = Column(String(100), nullable=False)
    recipient_email = Column(String(100), nullable=True)
    gift_message = Column(Text, nullable=True)
    include_handwritten_card = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    order = relationship("Order")
