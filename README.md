KV Store (FastAPI + Next.js)

Overview
- Simple key–value store with a FastAPI backend and a Next.js frontend.
- Frontend uses a Next.js API proxy to call the backend (avoids CORS).
- Backend URL is configurable via `BACKEND_URL` env (defaults to `http://localhost:8000`).

Prerequisites
- Python 3.11+ with pip
- Node.js with npm

Backend
- Install deps: `cd backend && pip install -r requirements.txt`
- Run server: `python main.py`
- Docs: http://localhost:8000/docs
- API endpoints (JSON):
  - `GET /kv` — list all pairs
  - `GET /kv/{key}` — get by key
  - `POST /kv/{key}` — create/update with body `{ "value": "..." }`
  - `DELETE /kv/{key}` — delete key
- Details: see `backend/README.md`

Frontend
- Install deps: `cd frontend && npm install`
- Run dev server: `npm run dev`
- App: http://localhost:3000
- UI actions on Home page: Get, List All, Create/Update, Delete
- Proxy endpoints:
  - `GET /api/kv` → backend `GET /kv`
  - `GET|POST|DELETE /api/kv/[key]` → backend `/kv/{key}`
- Details: see `frontend/README.md`

Notes
- Storage is in-memory and resets on backend restart.
- To change backend host/port, set `BACKEND_URL` for the frontend service or edit `frontend/app/api/kv/[key]/route.ts` and `frontend/app/api/kv/route.ts`.

Docker
- Build images: `make build`
- Start services: `make up` → http://localhost:3000 (frontend), http://localhost:8000/docs (backend)
- Tail logs: `make logs`
- Stop: `make down` (or `make clean` to remove volumes)

Registry notes
- Base images use AWS Public ECR mirrors (no Docker Hub login required):
  - Backend: `public.ecr.aws/docker/library/python:3.11-slim`
  - Frontend: `public.ecr.aws/docker/library/node:20-alpine`
  If you prefer Docker Hub, you can edit the `FROM` lines back to the official tags and `docker login`.
