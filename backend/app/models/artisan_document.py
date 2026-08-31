import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class ArtisanDocument(Base):
    __tablename__ = "artisan_documents"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    artisan_id = Column(String(36), ForeignKey("artisans.id", ondelete="CASCADE"), nullable=False, index=True)
    document_type = Column(String(50), nullable=False) # aadhaar, artisan_card, craft_certificate, bank_passbook
    file_url = Column(String(512), nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    artisan = relationship("Artisan", back_populates="documents")
