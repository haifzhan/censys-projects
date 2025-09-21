KV Store (FastAPI + Next.js)

Overview
- Simple key–value store with a FastAPI backend and a Next.js frontend.
- Frontend uses a Next.js API proxy to call the backend (avoids CORS).
- Backend URL is hardcoded as `http://localhost:8000` in `frontend/app/api/kv/*`.

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
- To change backend host/port, edit `frontend/app/api/kv/[key]/route.ts` and `frontend/app/api/kv/route.ts`.
