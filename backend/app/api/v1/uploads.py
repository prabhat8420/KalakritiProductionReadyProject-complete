from fastapi import APIRouter
from app.integrations.cloudinary.client import CloudinaryService

router = APIRouter(prefix="/uploads", tags=["Uploads"])

@router.get("/signed-params")
async def get_signed_upload_params():
    return CloudinaryService.generate_signed_upload_params()
