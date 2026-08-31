import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class CraftArticle(Base):
    __tablename__ = "craft_articles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    craft_id = Column(String(36), ForeignKey("crafts.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    author = Column(String(100), nullable=False)
    published_at = Column(DateTime, default=datetime.utcnow)

    craft = relationship("Craft", back_populates="articles")
