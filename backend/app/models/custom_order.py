import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class CustomOrder(Base):
    __tablename__ = "custom_orders"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    artisan_id = Column(String(36), ForeignKey("artisans.id", ondelete="CASCADE"), nullable=False, index=True)
    craft_tradition = Column(String(100), nullable=False)
    requirements = Column(Text, nullable=False)
    budget_estimate = Column(Float, nullable=False)
    status = Column(String(30), default="inquiry", nullable=False) # inquiry, quoted, accepted, crafting, completed
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    artisan = relationship("Artisan")
