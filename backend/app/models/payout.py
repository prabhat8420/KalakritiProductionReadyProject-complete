import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Payout(Base):
    __tablename__ = "payouts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    artisan_id = Column(String(36), ForeignKey("artisans.id", ondelete="CASCADE"), nullable=False, index=True)
    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="INR", nullable=False)
    status = Column(String(30), default="processed", nullable=False, index=True) # pending, processing, processed, failed
    razorpay_payout_id = Column(String(100), unique=True, nullable=True, index=True)
    beneficiary_account = Column(String(100), nullable=True)
    processed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    artisan = relationship("Artisan")
