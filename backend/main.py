from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="KV-Store API", version="1.0.0")


class KVPair(BaseModel):
    value: str


store: dict[str, str] = {}

@app.get("/kv")
def list_all():
    return store


@app.post("/kv/{key}")
def create_or_update(key: str, pair: KVPair):
    store[key] = pair.value
    return {"key": key, "value": pair.value}


@app.get("/kv/{key}")
def read(key: str):
    if key not in store:
        raise HTTPException(404, "key not found")
    return {"key": key, "value": store[key]}


@app.delete("/kv/{key}")
def delete(key: str):
    if key not in store:
        raise HTTPException(404, "key not found")
    del store[key]
    return {"deleted": key}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
