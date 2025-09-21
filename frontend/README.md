# Frontend (Next.js)

Minimal UI to interact with the FastAPI KV store.

Run
- cd frontend && npm install && npm run dev
- Visit http://localhost:3000

API proxy
- GET /api/kv → backend GET /kv
- GET/POST/DELETE /api/kv/[key] → backend /kv/{key}
- Backend URL is hardcoded as http://localhost:8000 in app/api/kv/*.

Backend
- Start backend separately: cd backend && python main.py
