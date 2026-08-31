from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

class ShipmentTrackingEventSchema(BaseModel):
    id: str
    status: str
    location: str
    description: Optional[str] = None
    timestamp: datetime

    class Config:
        from_attributes = True

class ShipmentSchema(BaseModel):
    id: str
    suborder_id: str
    tracking_number: str
    carrier: str
    status: str
    estimated_delivery: Optional[datetime] = None
    delivered_at: Optional[datetime] = None
    tracking_history: List[ShipmentTrackingEventSchema] = []

    class Config:
        from_attributes = True

class CreateShipmentRequest(BaseModel):
    suborder_id: str
    carrier: str = "Delhivery Heritage Express"
