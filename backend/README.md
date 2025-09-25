# Key-Value Store Backend (FastAPI)

Lightweight in-memory key–value store with a FastAPI HTTP interface.

## Requirements

- Python 3.11+
- pip (or conda, if you prefer)

## Setup

Using conda:

```bash
conda create -n censys-3.11 python=3.11 -y
conda activate censys-3.11
pip install -r requirements.txt
```

## Run

- Local (dev)
  - Start: `python main.py`
  - Stop: Press Ctrl+C in the terminal

- Docker
  - Start only backend: `docker compose up -d backend` (or `make up-backend`)
  - Stop only backend: `docker compose stop backend` (or `make stop-backend`)
  - Logs: `docker compose logs -f backend` (or `make logs` and filter)
  - The server listens on `http://localhost:8000`. Interactive docs: `http://localhost:8000/docs`.

## API

All responses are JSON.

- `GET /kv` — List all key/value pairs.
- `GET /kv/{key}` — Get a value by key.
- `POST /kv/{key}` — Create or update a value by key.
  - Body: `{ "value": "<string>" }`
- `DELETE /kv/{key}` — Delete a key/value pair.

Note: Storage is in-memory only and resets on server restart.

## Examples

Create/Update a key:

```bash
curl -X POST http://localhost:8000/kv/name \
  -H "Content-Type: application/json" \
  -d '{"value":"alice"}'
```

Get a single key:

```bash
curl http://localhost:8000/kv/name
```

List all keys:

```bash
curl http://localhost:8000/kv
```

Delete a key:

```bash
curl -X DELETE http://localhost:8000/kv/name
```

## Notes

- CORS: Not required when using the Next.js API proxy. If calling the backend directly from a browser app, enable CORS in `main.py` via `fastapi.middleware.cors`.
- Production: Consider adding persistent storage (e.g., SQLite/PostgreSQL) and authentication before exposing publicly.

## Testing

Using FastAPI's TestClient with pytest:

```bash
cd backend
python -m pip install -r requirements.txt
python -m pip install -r requirements-dev.txt  # installs pytest and a compatible httpx version
python -m pytest -q
```

Troubleshooting:
- If you see `TypeError: Client.__init__() got an unexpected keyword argument 'app'`, you have an incompatible `httpx` version. Installing `requirements-dev.txt` pins a compatible version (`httpx<0.28`).
