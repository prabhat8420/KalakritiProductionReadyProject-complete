from fastapi import Request, HTTPException, status
from app.core.redis import RedisClientManager

async def rate_limiter(request: Request, max_requests: int = 100, window_seconds: int = 60):
    client_ip = request.client.host if request.client else "unknown"
    key = f"rate_limit:{client_ip}:{request.url.path}"
    
    redis = await RedisClientManager.get_client()
    if not redis:
        return True # Fallback if redis not active
        
    try:
        current = await redis.incr(key)
        if current == 1:
            await redis.expire(key, window_seconds)
        if current > max_requests:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many requests. Please slow down."
            )
    except Exception:
        pass
    return True
