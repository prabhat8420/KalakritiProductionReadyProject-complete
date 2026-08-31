import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    artisan_id = Column(String(36), ForeignKey("artisans.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(200), nullable=False, index=True)
    slug = Column(String(220), unique=True, nullable=False, index=True)
    description_en = Column(Text, nullable=False)
    description_hi = Column(Text, nullable=True)
    category_id = Column(String(36), ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False, index=True)
    subcategory_id = Column(String(36), ForeignKey("subcategories.id", ondelete="SET NULL"), nullable=True)
    tradition_id = Column(String(36), ForeignKey("traditions.id", ondelete="RESTRICT"), nullable=False, index=True)
    
    # Transparent Price Breakdown Fields (in INR)
    base_price = Column(Float, nullable=False) # Artisan manufacturing/material price
    artisan_share = Column(Float, nullable=False) # Total artisan earning from sale
    platform_fee = Column(Float, default=0.0, nullable=False) # Platform commission & maintenance
    delivery_fee = Column(Float, default=0.0, nullable=False) # Logistics
    
    ai_confidence_score = Column(Float, nullable=True) # Classification confidence score
    certificate_id = Column(String(100), unique=True, nullable=True, index=True)
    certificate_hash = Column(String(64), nullable=True) # SHA-256 immutable digest
    
    status = Column(String(30), default="draft", nullable=False, index=True) # draft, pending_review, published, rejected
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    artisan = relationship("Artisan", lazy="selectin")
    category = relationship("Category", lazy="selectin")
    subcategory = relationship("Subcategory", lazy="selectin")
    tradition = relationship("Tradition", lazy="selectin")
    images = relationship("ProductImage", back_populates="product", cascade="all, delete-orphan", lazy="selectin")
    variants = relationship("ProductVariant", back_populates="product", cascade="all, delete-orphan", lazy="selectin")
    moderation_logs = relationship("ProductModerationLog", back_populates="product", cascade="all, delete-orphan", lazy="selectin")
    certification = relationship("ProductCertification", back_populates="product", uselist=False, cascade="all, delete-orphan", lazy="selectin")

    @property
    def total_price(self) -> float:
        return round(self.base_price + self.platform_fee + self.delivery_fee, 2)
