from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class DamageDiagnosisRequest(BaseModel):
    order_item_id: str
    damage_photo_url: str

class RepairPartnerSchema(BaseModel):
    id: str
    name: str
    region: str
    specialties: str
    rating: float
    contact_info: str

    class Config:
        from_attributes = True

class RepairTicketSchema(BaseModel):
    id: str
    ticket_number: str
    order_item_id: str
    product_id: str
    damage_photo_url: str
    ai_damage_type: str
    ai_severity: str
    ai_repairability_score: float
    ai_assessment_text: str
    matched_repair_partner: Optional[RepairPartnerSchema] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
