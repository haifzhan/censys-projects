"use client";
import { useState } from "react";

interface ButtonProps {
  text: string;
  disabled: boolean;
  onClick: () => void;
}
function Button({ text, disabled, onClick }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="border p-2 rounded-md"
    >
      {text}
    </button>
  );
}

export default function KeyValueStore() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    setError(null);
    setResult(null);
    if (!key) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/kv/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body?.detail || body?.message || `Error ${res.status}`);
      } else {
        setResult(body);
      }
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  const onGetByKey = async () => {
    setError(null);
    setResult(null);
    if (!key) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/kv/${encodeURIComponent(key)}`);
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body?.detail || body?.message || `Error ${res.status}`);
      } else {
        setResult(body);
      }
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  const onGetAll = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/kv`);
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body?.detail || body?.message || `Error ${res.status}`);
      } else {
        setResult(body);
      }
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setError(null);
    setResult(null);
    if (!key) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/kv/${encodeURIComponent(key)}`, { method: "DELETE" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body?.detail || body?.message || `Error ${res.status}`);
      } else {
        setResult(body);
      }
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Key-Value Store</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="key"
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
        />
        <Button
          text={loading ? "Loading..." : "Get"}
          onClick={onGetByKey}
          disabled={!key || loading}
        />

        <Button
          text={loading ? "Loading..." : "List All"}
          onClick={onGetAll}
          disabled={loading}
        />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="value"
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
        />
        <Button
          text={loading ? "Saving..." : "Update/Create"}
          onClick={onCreate}
          disabled={!key || loading}
        />
        <Button
          text={loading ? "Deleting..." : "Delete"}
          onClick={onDelete}
          disabled={!key || loading}
        />
      </div>
      <div className='mt-8 rounded-md border p-8'>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {(!result && !error) && <p className="text-gray-400">Result will show here</p> }
      </div>
    </div>
  );
}
