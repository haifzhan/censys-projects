# Frontend (Next.js)

Minimal UI to interact with the FastAPI KV store.

## Run

- Local (dev)
  - Start: `cd frontend && npm install && npm run dev`
  - Stop: Press Ctrl+C in the terminal
  - Visit: http://localhost:3000
  - Start backend separately: cd backend && python main.py
  - The backend base URL is read from `process.env.BACKEND_URL` (defaults to `http://localhost:8000`).

- Docker
  - Build all: `docker compose build` (or `make build`)
  - Start only frontend: `docker compose up -d frontend` (or `make up-frontend`)
  - Stop only frontend: `docker compose stop frontend` (or `make stop-frontend`)
  - Full stack: `docker compose up -d` (or `make up`) — backend on http://localhost:8000, frontend on http://localhost:3000

## API proxy
- GET /api/kv → backend GET /kv
- GET/POST/DELETE /api/kv/[key] → backend /kv/{key}
- Backend URL is hardcoded as http://localhost:8000 in app/api/kv/*.
