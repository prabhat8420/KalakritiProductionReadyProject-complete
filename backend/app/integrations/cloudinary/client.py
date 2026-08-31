import time
import hashlib
from app.config import settings

class CloudinaryService:
    @staticmethod
    def generate_signed_upload_params() -> dict:
        timestamp = int(time.time())
        params_to_sign = f"folder=kalakriti_crafts&timestamp={timestamp}"
        
        signature = hashlib.sha1(f"{params_to_sign}{settings.CLOUDINARY_API_SECRET}".encode('utf-8')).hexdigest()
        
        return {
            "cloud_name": settings.CLOUDINARY_CLOUD_NAME,
            "api_key": settings.CLOUDINARY_API_KEY,
            "timestamp": timestamp,
            "signature": signature,
            "folder": "kalakriti_crafts",
            "upload_url": f"https://api.cloudinary.com/v1_1/{settings.CLOUDINARY_CLOUD_NAME}/image/upload"
        }
