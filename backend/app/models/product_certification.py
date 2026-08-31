import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class ProductCertification(Base):
    __tablename__ = "product_certifications"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    product_id = Column(String(36), ForeignKey("products.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    certificate_id = Column(String(100), unique=True, nullable=False, index=True) # e.g. KLK-CERT-BR-MAD-202608-001
    certificate_hash = Column(String(64), nullable=False) # SHA-256 immutable digest
    qr_code_url = Column(String(512), nullable=True)
    craft_tradition = Column(String(100), nullable=False)
    artisan_name = Column(String(100), nullable=False)
    origin_region = Column(String(100), nullable=False)
    raw_materials = Column(Text, nullable=True)
    heritage_registry_badge = Column(String(100), default="GI Certified Traditional Craft", nullable=False)
    issued_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    product = relationship("Product", back_populates="certification")
