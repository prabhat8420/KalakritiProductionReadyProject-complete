import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class ArtisanBankAccount(Base):
    __tablename__ = "artisan_bank_accounts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    artisan_id = Column(String(36), ForeignKey("artisans.id", ondelete="CASCADE"), nullable=False, index=True)
    account_details = Column(Text, nullable=False) # Encrypted or masked JSON string
    account_holder_name = Column(String(100), nullable=True)
    bank_name = Column(String(100), nullable=True)
    ifsc_code = Column(String(20), nullable=True)
    is_primary = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    artisan = relationship("Artisan", back_populates="bank_accounts")
