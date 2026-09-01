from fastapi import APIRouter, UploadFile, File, HTTPException
from app.integrations.cloudinary.client import CloudinaryService

router = APIRouter(prefix="/uploads", tags=["Uploads"])

@router.get("/signed-params")
async def get_signed_upload_params():
    return CloudinaryService.generate_signed_upload_params()

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(400, "Only image files are allowed")
    content = await file.read()
    return await CloudinaryService.upload_image_bytes(content, file.filename or "upload.jpg")
