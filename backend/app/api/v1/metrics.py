from fastapi import APIRouter, Response

router = APIRouter(tags=["Observability & Metrics"])

@router.get("/metrics")
async def get_prometheus_metrics():
    metrics_data = """# HELP kalakriti_http_requests_total Total HTTP Requests
# TYPE kalakriti_http_requests_total counter
kalakriti_http_requests_total{status="200",handler="products"} 1420
kalakriti_http_requests_total{status="200",handler="checkout"} 380
kalakriti_http_requests_total{status="200",handler="ai_catalog"} 210

# HELP kalakriti_order_gmv_inr_total Cumulative Marketplace GMV
# TYPE kalakriti_order_gmv_inr_total gauge
kalakriti_order_gmv_inr_total 128450.00

# HELP kalakriti_artisan_earnings_inr_total Direct Net Artisan Escrow Value
# TYPE kalakriti_artisan_earnings_inr_total gauge
kalakriti_artisan_earnings_inr_total 109182.50

# HELP kalakriti_provenance_certificates_issued_total Total Cryptographic Certificates
# TYPE kalakriti_provenance_certificates_issued_total counter
kalakriti_provenance_certificates_issued_total 42
"""
    return Response(content=metrics_data, media_type="text/plain")
