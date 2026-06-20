import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function verifyToken(token: string): boolean {
  try {
    const secret = process.env.ADMIN_PASSWORD;
    if (!secret) return false;
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const payload = JSON.parse(Buffer.from(parts[0], "base64").toString());
    const sig = crypto.createHmac("sha256", secret).update(parts[0]).digest("base64url");
    if (sig !== parts[1]) return false;
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!auth || !verifyToken(auth)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!auth || !verifyToken(auth)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabase.from("testimonials").insert([{
    name: body.name, role: body.role || null, company: body.company || null,
    text: body.text, years: body.years || null, avatar: body.avatar || null, published: body.published ?? true,
  }]).select();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data?.[0] || null, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const auth = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!auth || !verifyToken(auth)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body.id) return Response.json({ error: "id required" }, { status: 400 });
  const { data, error } = await supabase.from("testimonials").update({
    name: body.name, role: body.role || null, company: body.company || null,
    text: body.text, years: body.years || null, avatar: body.avatar || null, published: body.published ?? true,
  }).eq("id", body.id).select();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data?.[0] || null);
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!auth || !verifyToken(auth)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "id required" }, { status: 400 });
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
