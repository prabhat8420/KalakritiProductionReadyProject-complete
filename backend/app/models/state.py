import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

class State(Base):
    __tablename__ = "states"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    code = Column(String(10), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    districts = relationship("District", back_populates="state", cascade="all, delete-orphan", lazy="selectin")
    traditions = relationship("Tradition", back_populates="state")
