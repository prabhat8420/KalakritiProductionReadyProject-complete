import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class RepairTicket(Base):
    """
    Craft Doctor Circular Economy Repair Ticket.
    Diagnoses damage via Multimodal AI and matches with certified local restoration partners.
    """
    __tablename__ = "repair_tickets"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    ticket_number = Column(String(50), unique=True, nullable=False, index=True) # e.g. KLK-REP-202608-001
    order_item_id = Column(String(36), ForeignKey("order_items.id", ondelete="CASCADE"), nullable=False, index=True)
    product_id = Column(String(36), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    damage_photo_url = Column(String(512), nullable=False)
    
    # AI Diagnosis Fields
    ai_damage_type = Column(String(100), nullable=False) # e.g. "Glaze fracture & rim hairline crack", "Broken bronze base"
    ai_severity = Column(String(50), nullable=False) # Low, Medium, High
    ai_repairability_score = Column(Float, nullable=False) # 0.0 to 1.0 (e.g. 0.88 = High Repairability)
    ai_assessment_text = Column(Text, nullable=False)
    
    matched_repair_partner_id = Column(String(36), ForeignKey("repair_partners.id", ondelete="SET NULL"), nullable=True)
    status = Column(String(30), default="diagnosed", nullable=False, index=True) # diagnosed, matched, in_transit, repaired, resolved
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    order_item = relationship("OrderItem", back_populates="repair_tickets")
    product = relationship("Product", lazy="selectin")
    user = relationship("User", lazy="selectin")
    matched_repair_partner = relationship("RepairPartner", lazy="selectin")

