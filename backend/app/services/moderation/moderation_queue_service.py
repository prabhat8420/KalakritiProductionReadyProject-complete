from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.product_repository import ProductRepository
from app.models.product_moderation_log import ProductModerationLog
from app.services.certifications.certification_service import CertificationService
from app.core.exceptions import NotFoundException
from app.core.redis import cache_set

class ModerationQueueService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.product_repo = ProductRepository(db)

    async def list_pending_products(self, limit: int = 50, offset: int = 0):
        return await self.product_repo.list_products(status="pending_review", limit=limit, offset=offset)

    async def moderate_product(self, product_id: str, admin_user_id: str, action: str, notes: str = None):
        product = await self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFoundException("Product", product_id)

        if action == "approved":
            product.status = "published"
            # Generate immutable Craft DNA Provenance Certificate
            if not product.certification:
                cert = CertificationService.generate_craft_provenance(product)
                product.certificate_id = cert.certificate_id
                product.certificate_hash = cert.certificate_hash
                product.certification = cert
                self.db.add(cert)
        elif action == "rejected":
            product.status = "rejected"

        log = ProductModerationLog(
            product_id=product.id,
            reviewed_by=admin_user_id,
            action=action,
            notes=notes
        )
        self.db.add(log)
        await self.db.flush()

        # Invalidate Redis product catalog cache
        await cache_set(f"product:{product.slug}", None, ttl_seconds=1)

        return product
