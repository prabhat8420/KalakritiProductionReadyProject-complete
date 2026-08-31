import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Float, DateTime
from app.core.database import Base

class RepairPartner(Base):
    __tablename__ = "repair_partners"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(150), nullable=False)
    region = Column(String(100), nullable=False) # e.g. "North India / Rajasthan / NCR"
    pincode_prefix = Column(String(10), nullable=False, index=True) # e.g. "30", "11", "84"
    specialties = Column(Text, nullable=False) # JSON or comma-separated: Ceramics, Bronze, Terracotta, Textiles
    rating = Column(Float, default=4.9, nullable=False)
    active_repairs_count = Column(Float, default=0, nullable=False)
    contact_info = Column(String(255), nullable=False) # Email/Phone
    created_at = Column(DateTime, default=datetime.utcnow)
