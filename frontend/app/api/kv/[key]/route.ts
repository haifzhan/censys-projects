import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:8000";

export async function GET(_req: Request, { params }: { params: { key: string } }) {
  const url = `${BACKEND_URL}/kv/${encodeURIComponent(params.key)}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    const body = await res
      .json()
      .catch(() => ({ message: "Invalid JSON from backend" }));
    return NextResponse.json(body, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to reach backend", detail: String(err?.message ?? err) },
      { status: 502 }
    );
  }
}

export async function POST(req: Request, { params }: { params: { key: string } }) {
  const url = `${BACKEND_URL}/kv/${encodeURIComponent(params.key)}`;
  try {
    const payload = await req.json().catch(() => ({}));
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const body = await res
      .json()
      .catch(() => ({ message: "Invalid JSON from backend" }));
    return NextResponse.json(body, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to reach backend", detail: String(err?.message ?? err) },
      { status: 502 }
    );
  }
}

export async function DELETE(_req: Request, { params }: { params: { key: string } }) {
  const url = `${BACKEND_URL}/kv/${encodeURIComponent(params.key)}`;
  try {
    const res = await fetch(url, { method: "DELETE", cache: "no-store" });
    const body = await res
      .json()
      .catch(() => ({ message: "Invalid JSON from backend" }));
    return NextResponse.json(body, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to reach backend", detail: String(err?.message ?? err) },
      { status: 502 }
    );
  }
}
