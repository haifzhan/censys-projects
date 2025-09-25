# Frontend (Next.js)

Minimal UI to interact with the FastAPI KV store.


API proxy
- GET /api/kv → backend GET /kv
- GET/POST/DELETE /api/kv/[key] → backend /kv/{key}
- Backend URL is hardcoded as http://localhost:8000 in app/api/kv/*.

Backend
- Start backend separately: cd backend && python main.py

Docker
- Build: `docker compose build`
- Run: `docker compose up -d` (backend on http://localhost:8000, frontend on http://localhost:3000)

Config
- The backend base URL is read from `process.env.BACKEND_URL` (defaults to `http://localhost:8000`).
