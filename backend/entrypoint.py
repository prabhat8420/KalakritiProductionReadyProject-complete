import os
import sys
import uvicorn

if __name__ == "__main__":
    port_str = os.environ.get("PORT", "8080")
    try:
        port = int(port_str)
    except ValueError:
        port = 8080
    print(f"🚀 [Kalakriti Railway Boot] Starting Uvicorn server on 0.0.0.0:{port} (PORT={port_str})...", flush=True)
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        proxy_headers=True,
        forwarded_allow_ips="*"
    )
