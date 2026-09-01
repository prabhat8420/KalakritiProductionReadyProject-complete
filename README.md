# 🏺 Kalakriti (कलाकृति) — Production Handicraft Marketplace

India's first direct-to-artisan multi-vendor craft ecosystem with **Geographical Indication (GI) verification**, **SHA-256 cryptographic provenance certificates**, **transparent 85% artisan share**, and **circular repair care (Craft Doctor)**.

---

## 🌐 Live Production Deployments

| Component | Production URL | Platform |
| :--- | :--- | :--- |
| **Frontend Web App** | [https://kalakriti-frontend.vercel.app](https://kalakriti-frontend.vercel.app) | Vercel |
| **GI Shop Catalog** | [https://kalakriti-frontend.vercel.app/shop](https://kalakriti-frontend.vercel.app/shop) | Vercel |
| **Backend API** | [https://kalakritiproductionreadyproject-complete-production.up.railway.app](https://kalakritiproductionreadyproject-complete-production.up.railway.app) | Railway |
| **Interactive API Docs** | [https://kalakritiproductionreadyproject-complete-production.up.railway.app/docs](https://kalakritiproductionreadyproject-complete-production.up.railway.app/docs) | Railway / OpenAPI |
| **Health Probe** | [https://kalakritiproductionreadyproject-complete-production.up.railway.app/health](https://kalakritiproductionreadyproject-complete-production.up.railway.app/health) | Railway |

---

## 🎯 Single Source of Truth Repository

* **Canonical Git Repository:** [`https://github.com/prabhat8420/KalakritiProductionReadyProject-complete`](https://github.com/prabhat8420/KalakritiProductionReadyProject-complete)
* **Production Branch:** `main`

### Deployment Pipeline Connections:
1. **Vercel Project (`kalakriti-frontend`):**
   - Linked Repository: `prabhat8420/KalakritiProductionReadyProject-complete`
   - Production Branch: `main`
   - Root Directory: `frontend`
   - Framework: Next.js (App Router)
   - Environment Variable: `NEXT_PUBLIC_API_URL=https://kalakritiproductionreadyproject-complete-production.up.railway.app/api/v1`

2. **Railway Backend Service (`KalakritiProductionReadyProject-complete`):**
   - Linked Repository: `prabhat8420/KalakritiProductionReadyProject-complete`
   - Production Branch: `main`
   - Build Tool: Multi-stage Dockerfile (`/Dockerfile`)
   - Database: Managed Railway PostgreSQL with `asyncpg`

---

## 📝 Deployment Architecture & Incident Record

### Incident Summary: Repository Split Diagnosis (2026-09-01)
* **Symptom:** The live frontend at `https://kalakriti-frontend.vercel.app/shop` displayed *"No published crafts found yet"*, even though the Railway backend API returned published products with `HTTP 200 OK`.
* **Root Cause:** Vercel was originally connected to an earlier placeholder repository (`prabhat8420/kalakriti` with initial commit `5579a4c`), while all active feature development, schema migrations, and Railway deployments were occurring on `prabhat8420/KalakritiProductionReadyProject-complete`. Pushes and redeploys were triggering against the stale placeholder code.
* **Resolution (Option A Implemented):**
  1. Unlinked `prabhat8420/kalakriti` from Vercel via the Vercel REST API.
  2. Permanently connected Vercel project `kalakriti-frontend` to `prabhat8420/KalakritiProductionReadyProject-complete` on branch `main` with root directory `frontend/`.
  3. Configured `NEXT_PUBLIC_API_URL` to point to the live Railway API domain.
  4. Verified full round-trip SSR data fetching for product listings, authenticity certificates, QR codes, price breakdowns, and JWT authentication.

---

## 🛠️ Tech Stack & Key Features

* **Frontend:** Next.js 14+ (App Router, Tailwind CSS, Server-Side Rendering, Dynamic SSR).
* **Backend:** FastAPI, Python 3.11, Uvicorn ASGI, Pydantic v2.
* **Database & ORM:** PostgreSQL, SQLAlchemy 2.0 Async, `asyncpg`.
* **Security & Auth:** Argon2 password hashing, JWT Bearer tokens with Role-Based Access Control (Admin, Master Artisan, Customer Patron).
* **Provenance Engine:** SHA-256 digital certificate generation with verifiable QR codes for GI-tagged traditional crafts (Madhubani Painting, Jaipur Blue Pottery, Bastar Dhokra Bell Metal).
* **Circular Care:** Craft Doctor damage evaluation and certified heritage restoration ticketing.