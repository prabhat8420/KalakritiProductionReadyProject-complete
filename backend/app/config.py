import os
from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "Kalakriti"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "production"
    DEBUG: bool = False
    API_V1_PREFIX: str = "/api/v1"
    
    # Frontend Domain
    FRONTEND_URL: str = "http://localhost:3000"
    
    # Security
    SECRET_KEY: str = "kalakriti_super_secret_jwt_key_2026_change_in_prod"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///tmp/kalakriti.db"
    DATABASE_URL_SYNC: str = "sqlite:///tmp/kalakriti.db"

    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # CORS
    CORS_ORIGINS: Union[List[str], str] = ["*"]
    
    # Integrations
    RAZORPAY_KEY_ID: str = "rzp_test_key"
    RAZORPAY_KEY_SECRET: str = "rzp_test_secret"
    RAZORPAY_WEBHOOK_SECRET: str = "rzp_test_webhook_secret"
    
    CLOUDINARY_CLOUD_NAME: str = "kalakriti-cloud"
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    
    # Google GenAI / Gemini
    GEMINI_API_KEY: str = ""
    GOOGLE_API_KEY: str = ""
    
    ANTHROPIC_API_KEY: str = ""
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="allow")

    @property
    def cors_origins_list(self) -> List[str]:
        if isinstance(self.CORS_ORIGINS, str):
            if self.CORS_ORIGINS.strip() == "*":
                return ["*"]
            origins = [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]
        else:
            origins = list(self.CORS_ORIGINS)
            
        if self.FRONTEND_URL and self.FRONTEND_URL not in origins and "*" not in origins:
            origins.append(self.FRONTEND_URL)
        return origins

settings = Settings()
