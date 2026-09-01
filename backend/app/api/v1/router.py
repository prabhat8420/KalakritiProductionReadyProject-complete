from fastapi import APIRouter
from app.core.database import check_database_connection
from app.core.redis import check_redis_connection
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.artisans import router as artisans_router
from app.api.v1.categories import router as categories_router
from app.api.v1.traditions import router as traditions_router
from app.api.v1.states import router as states_router
from app.api.v1.products import router as products_router
from app.api.v1.product_moderation import router as moderation_router
from app.api.v1.uploads import router as uploads_router
from app.api.v1.cart import router as cart_router
from app.api.v1.addresses import router as addresses_router
from app.api.v1.orders import router as orders_router
from app.api.v1.payments import router as payments_router
from app.api.v1.shipping import router as shipping_router
from app.api.v1.reviews import router as reviews_router
from app.api.v1.repair import router as repair_router
from app.api.v1.admin import router as admin_router
from app.api.v1.metrics import router as metrics_router
from app.api.v1.ai_assistant import router as ai_router

api_v1_router = APIRouter(prefix="/v1")

@api_v1_router.get("/health", tags=["Health"])
async def health_check():
    db_health = await check_database_connection()
    redis_health = await check_redis_connection()
    
    is_healthy = db_health.get("status") in ["healthy", "degraded"]
    
    return {
        "status": "healthy" if is_healthy else "unhealthy",
        "service": "Kalakriti API Layer",
        "version": "1.0.0",
        "environment": "active",
        "dependencies": {
            "database": db_health,
            "cache": redis_health
        }
    }

api_v1_router.include_router(auth_router)
api_v1_router.include_router(users_router)
api_v1_router.include_router(artisans_router)
api_v1_router.include_router(categories_router)
api_v1_router.include_router(traditions_router)
api_v1_router.include_router(states_router)
api_v1_router.include_router(products_router)
api_v1_router.include_router(moderation_router)
api_v1_router.include_router(uploads_router)
api_v1_router.include_router(cart_router)
api_v1_router.include_router(addresses_router)
api_v1_router.include_router(orders_router)
api_v1_router.include_router(payments_router)
api_v1_router.include_router(shipping_router)
api_v1_router.include_router(reviews_router)
api_v1_router.include_router(repair_router)
api_v1_router.include_router(admin_router)
api_v1_router.include_router(metrics_router)
api_v1_router.include_router(ai_router)

