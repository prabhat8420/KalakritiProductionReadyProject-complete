import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Artisan(Base):
    __tablename__ = "artisans"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    display_name = Column(String(100), nullable=False)
    bio = Column(Text, nullable=False)
    region = Column(String(100), nullable=False)
    craft_tradition = Column(String(100), nullable=False) # e.g. Madhubani, Blue Pottery
    verification_status = Column(String(20), default="pending", nullable=False, index=True) # pending, verified, rejected
    years_active = Column(Integer, default=1, nullable=False)
    avg_rating = Column(Float, default=5.0, nullable=False)
    review_count = Column(Integer, default=0, nullable=False)
    profile_photo_url = Column(String(512), nullable=True)
    workshop_address = Column(String(255), nullable=True)
    state_id = Column(String(36), ForeignKey("states.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="artisan_profile")
    documents = relationship("ArtisanDocument", back_populates="artisan", cascade="all, delete-orphan", lazy="selectin")
    verifications = relationship("ArtisanVerification", back_populates="artisan", cascade="all, delete-orphan", lazy="selectin")
    bank_accounts = relationship("ArtisanBankAccount", back_populates="artisan", cascade="all, delete-orphan", lazy="selectin")
