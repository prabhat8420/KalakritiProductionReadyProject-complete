from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.core.logging import setup_logging
from app.core.middleware import RequestTimingMiddleware
from app.api.v1.router import api_v1_router

# Setup Structured Logging
setup_logging()

app = FastAPI(
    title="Kalakriti Marketplace API",
    description="Scalable Multi-Vendor Artisan Marketplace Backend with AI-assisted cataloging and circular repair flows.",
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware (Allows Vercel domains and configured origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom Middleware
app.add_middleware(RequestTimingMiddleware)

# Root Index & Health Endpoints
@app.get("/", tags=["Root"])
async def root():
    return {
        "status": "online",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", tags=["Root Health"])
async def root_health():
    from app.core.database import check_database_connection
    from app.core.redis import check_redis_connection
    
    db_status = await check_database_connection()
    cache_status = await check_redis_connection()
    
    return {
        "status": "healthy" if db_status.get("status") == "healthy" else "degraded",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "dependencies": {
            "database": db_status,
            "cache": cache_status
        }
    }

# Mount API Routers
app.include_router(api_v1_router, prefix="/api")
