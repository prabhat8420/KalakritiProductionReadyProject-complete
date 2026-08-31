import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class ArtisanEarning(Base):
    __tablename__ = "artisan_earnings"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    suborder_id = Column(String(36), ForeignKey("suborders.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    artisan_id = Column(String(36), ForeignKey("artisans.id", ondelete="RESTRICT"), nullable=False, index=True)
    amount = Column(Float, nullable=False)
    status = Column(String(20), default="pending", nullable=False) # pending, matured, paid
    matures_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    suborder = relationship("SubOrder", back_populates="artisan_earning")
    artisan = relationship("Artisan")
