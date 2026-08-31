from typing import Dict, Any
from app.core.security import create_access_token, create_refresh_token, decode_token

class TokenService:
    @staticmethod
    def generate_auth_tokens(user_id: str, roles: list) -> Dict[str, Any]:
        data = {"sub": user_id, "roles": roles}
        access_token = create_access_token(data)
        refresh_token = create_refresh_token(data)
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "expires_in": 3600 * 24
        }
