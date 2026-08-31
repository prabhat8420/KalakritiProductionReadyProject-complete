import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Craft(Base):
    __tablename__ = "crafts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    tradition_id = Column(String(36), ForeignKey("traditions.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    slug = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    tradition = relationship("Tradition", back_populates="crafts")
    articles = relationship("CraftArticle", back_populates="craft", cascade="all, delete-orphan", lazy="selectin")
