from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class ProductCertificationSchema(BaseModel):
    id: str
    certificate_id: str
    certificate_hash: str
    qr_code_url: Optional[str] = None
    craft_tradition: str
    artisan_name: str
    origin_region: str
    raw_materials: Optional[str] = None
    heritage_registry_badge: str
    issued_at: datetime

    class Config:
        from_attributes = True
