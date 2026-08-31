from sqlalchemy.ext.asyncio import AsyncSession
from app.models.audit_log import AuditLog

class AuditService:
    @staticmethod
    async def log_action(db: AsyncSession, actor_id: str, action: str, target_resource: str, details: str = None, ip_address: str = "127.0.0.1"):
        log = AuditLog(
            actor_id=actor_id,
            action=action,
            target_resource=target_resource,
            details=details,
            ip_address=ip_address
        )
        db.add(log)
        await db.flush()
        return log
