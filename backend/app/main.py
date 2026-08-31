import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.core.logging import setup_logging
from app.core.middleware import RequestTimingMiddleware
from app.api.v1.router import api_v1_router
from app.core.init_db import init_and_seed_db

# Setup Structured Logging
setup_logging()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-initialize and seed DB on container boot (runs asynchronously in background)
    asyncio.create_task(init_and_seed_db())
    yield

app = FastAPI(
    title="Kalakriti Marketplace API",
    description="Scalable Multi-Vendor Artisan Marketplace Backend with AI-assisted cataloging and circular repair flows.",
    version=settings.APP_VERSION,
    lifespan=lifespan,
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

# Root Index & Instant Healthcheck Endpoints for Railway / Load Balancers
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
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION
    }

# Mount API Routers
app.include_router(api_v1_router, prefix="/api")
