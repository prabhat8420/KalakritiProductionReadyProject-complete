from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.core.database import get_db
from app.dependencies import get_current_user
from app.schemas.product import ProductCreateRequest, ProductSchema, ProductCatalogingAIRequest, ProductCatalogingAIResponse
from app.services.products.product_service import ProductService
from app.repositories.product_repository import ProductRepository
from app.repositories.category_repository import CategoryRepository
from app.integrations.ai_cataloging.ai_service import AICatalogingService
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/ai-catalog", response_model=ProductCatalogingAIResponse)
async def ai_catalog_product(req: ProductCatalogingAIRequest, db: AsyncSession = Depends(get_db)):
    cat_repo = CategoryRepository(db)
    categories = [{"id": c.id, "name": c.name} for c in await cat_repo.list_categories()]
    traditions = [{"id": t.id, "name": t.name} for t in await cat_repo.list_traditions()]
    
    analysis = await AICatalogingService.analyze_craft_image(req.image_url, categories, traditions)
    return analysis

@router.post("", response_model=ProductSchema, status_code=status.HTTP_201_CREATED)
async def create_product(
    req: ProductCreateRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ProductService(db)
    return await service.create_product(current_user["sub"], req.model_dump())

@router.get("", response_model=List[ProductSchema])
async def list_products(
    status: Optional[str] = "published",
    category_id: Optional[str] = None,
    tradition_id: Optional[str] = None,
    artisan_id: Optional[str] = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db)
):
    repo = ProductRepository(db)
    return await repo.list_products(
        status=status,
        category_id=category_id,
        tradition_id=tradition_id,
        artisan_id=artisan_id,
        limit=limit,
        offset=offset
    )

@router.get("/by-slug/{slug}", response_model=ProductSchema)
async def get_product_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    repo = ProductRepository(db)
    product = await repo.get_by_slug(slug)
    if not product:
        raise NotFoundException("Product", slug)
    return product

@router.get("/{product_id}", response_model=ProductSchema)
async def get_product_by_id(product_id: str, db: AsyncSession = Depends(get_db)):
    repo = ProductRepository(db)
    product = await repo.get_by_id(product_id)
    if not product:
        raise NotFoundException("Product", product_id)
    return product
