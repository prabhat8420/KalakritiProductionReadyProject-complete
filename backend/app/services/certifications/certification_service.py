import hashlib
import io
import base64
from datetime import datetime, timezone
import qrcode
from app.config import settings
from app.models.product import Product
from app.models.product_certification import ProductCertification

class CertificationService:
    @staticmethod
    def generate_craft_provenance(product: Product) -> ProductCertification:
        state_code = product.artisan.region[:3].upper().strip()
        trad_code = product.tradition.slug[:3].upper()
        now = datetime.utcnow()
        unique_suffix = product.id[:8].upper()
        cert_id = f"KLK-CERT-{state_code}-{trad_code}-{now.strftime('%Y%m')}-{unique_suffix}"

        # Cryptographic Proof Composition
        digest_input = f"{cert_id}|{product.id}|{product.artisan_id}|{product.artisan.display_name}|{product.tradition.name}|{now.isoformat()}"
        cert_hash = hashlib.sha256(digest_input.encode('utf-8')).hexdigest()

        # Dynamic QR Code URL pointing to public live frontend
        frontend_base = settings.FRONTEND_URL.rstrip('/')
        verify_url = f"{frontend_base}/authenticity?cert_id={cert_id}&hash={cert_hash}"
        import urllib.parse
        qr_code_url = f"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={urllib.parse.quote(verify_url)}"

        return ProductCertification(
            product_id=product.id,
            certificate_id=cert_id,
            certificate_hash=cert_hash,
            qr_code_url=qr_code_url,
            craft_tradition=product.tradition.name,
            artisan_name=product.artisan.display_name,
            origin_region=product.artisan.region,
            raw_materials="Natural Earth Pigments, Organic Indigo, Quartz, Bell Metal Bronze",
            heritage_registry_badge="GI-Tagged Traditional Indian Craft",
            issued_at=now
        )
