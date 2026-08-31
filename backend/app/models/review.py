import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Review(Base):
    """
    Strictly enforced Verified Purchase Review model:
    order_item_id is a NON-NULLABLE unique foreign key.
    """
    __tablename__ = "reviews"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    product_id = Column(String(36), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    order_item_id = Column(String(36), ForeignKey("order_items.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    rating = Column(Integer, nullable=False) # 1 to 5 stars
    review_text = Column(Text, nullable=False)
    is_verified = Column(Boolean, default=True, nullable=False)
    status = Column(String(20), default="published", nullable=False, index=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    product = relationship("Product", lazy="selectin")
    user = relationship("User", lazy="selectin")
    order_item = relationship("OrderItem", back_populates="review")
    images = relationship("ReviewImage", back_populates="review", cascade="all, delete-orphan", lazy="selectin")
    moderation_logs = relationship("ReviewModerationLog", back_populates="review", cascade="all, delete-orphan")
