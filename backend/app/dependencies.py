from typing import Optional, AsyncGenerator
from fastapi import Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import decode_token
from app.core.exceptions import UnauthorizedException

async def get_current_user_optional(
    authorization: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db)
) -> Optional[dict]:
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return None
    return payload

from app.core.exceptions import UnauthorizedException, ForbiddenException

async def get_current_user(
    user_payload: Optional[dict] = Depends(get_current_user_optional)
) -> dict:
    if not user_payload:
        raise UnauthorizedException("Authentication token required")
    return user_payload

async def require_admin(current_user: dict = Depends(get_current_user)) -> dict:
    roles = current_user.get("roles", [])
    if "admin" not in roles:
        raise ForbiddenException("Admin privilege required for this operational action")
    return current_user

async def require_artisan(current_user: dict = Depends(get_current_user)) -> dict:
    roles = current_user.get("roles", [])
    if "artisan" not in roles and "admin" not in roles:
        raise ForbiddenException("Artisan access required")
    return current_user
