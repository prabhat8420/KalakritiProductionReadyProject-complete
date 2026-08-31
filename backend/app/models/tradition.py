import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Tradition(Base):
    __tablename__ = "traditions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=False)
    region = Column(String(100), nullable=False)
    state_id = Column(String(36), ForeignKey("states.id", ondelete="SET NULL"), nullable=True)
    heritage_origin = Column(String(255), nullable=True)
    cover_image_url = Column(String(512), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    state = relationship("State", back_populates="traditions")
    crafts = relationship("Craft", back_populates="tradition", cascade="all, delete-orphan", lazy="selectin")
