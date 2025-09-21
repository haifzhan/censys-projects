import os
import sys
from fastapi.testclient import TestClient

# Ensure the backend directory (one level up) is on sys.path so
# `from main import app` works whether pytest is run from repo root or backend/
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from main import app


client = TestClient(app)


def test_list_empty_then_crud_cycle():
    # Initially empty dict
    r = client.get("/kv")
    assert r.status_code == 200
    assert isinstance(r.json(), dict)

    # Getting a missing key returns 404
    r = client.get("/kv/missing")
    assert r.status_code == 404

    # Create/Update a key
    r = client.post("/kv/name", json={"value": "alice"})
    assert r.status_code == 200
    assert r.json() == {"key": "name", "value": "alice"}

    # Read back the key
    r = client.get("/kv/name")
    assert r.status_code == 200
    assert r.json()["value"] == "alice"

    # Update the same key
    r = client.post("/kv/name", json={"value": "bob"})
    assert r.status_code == 200
    assert r.json() == {"key": "name", "value": "bob"}

    # List should include the updated value
    r = client.get("/kv")
    assert r.status_code == 200
    assert r.json().get("name") == "bob"

    # Delete the key
    r = client.delete("/kv/name")
    assert r.status_code == 200
    assert r.json() == {"deleted": "name"}

    # Verify it's gone
    r = client.get("/kv/name")
    assert r.status_code == 404
