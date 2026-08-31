import logging
import json
from typing import Optional, Any
import redis.asyncio as aioredis
from app.config import settings

logger = logging.getLogger("kalakriti.redis")

class RedisClientManager:
    _instance: Optional[aioredis.Redis] = None

    @classmethod
    async def get_client(cls) -> Optional[aioredis.Redis]:
        if cls._instance is None:
            try:
                cls._instance = aioredis.from_url(
                    settings.REDIS_URL,
                    encoding="utf-8",
                    decode_responses=True,
                    socket_connect_timeout=2
                )
            except Exception as e:
                logger.warning(f"Failed to initialize Redis client: {e}")
                cls._instance = None
        return cls._instance

    @classmethod
    async def close(cls):
        if cls._instance:
            await cls._instance.close()
            cls._instance = None

# In-memory fast fallback store when Redis is offline in standalone dev
_in_memory_cache: dict = {}

async def cache_get(key: str) -> Optional[Any]:
    try:
        client = await RedisClientManager.get_client()
        if client:
            val = await client.get(key)
            return json.loads(val) if val else None
    except Exception as e:
        logger.debug(f"Redis get error ({e}), reading from in-memory cache")
    return _in_memory_cache.get(key)

async def cache_set(key: str, value: Any, ttl_seconds: int = 3600) -> bool:
    try:
        client = await RedisClientManager.get_client()
        if client:
            await client.set(key, json.dumps(value), ex=ttl_seconds)
            return True
    except Exception as e:
        logger.debug(f"Redis set error ({e}), writing to in-memory cache")
    _in_memory_cache[key] = value
    return True

async def check_redis_connection() -> dict:
    try:
        client = await RedisClientManager.get_client()
        if client:
            pong = await client.ping()
            if pong:
                return {"status": "healthy", "redis": "connected"}
    except Exception as e:
        logger.warning(f"Redis ping failed: {e}")
    return {"status": "fallback", "redis": "in-memory-fallback"}
