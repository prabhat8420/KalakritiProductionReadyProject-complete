from app.core.security import hash_password, verify_password

class PasswordService:
    @staticmethod
    def hash(password: str) -> str:
        return hash_password(password)

    @staticmethod
    def verify(plain: str, hashed: str) -> bool:
        return verify_password(plain, hashed)
