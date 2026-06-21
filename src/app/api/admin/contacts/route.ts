import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
  const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!auth || !verifyToken(auth)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  if (!id || !status) return Response.json({ error: "id and status required" }, { status: 400 });
  const { error } = await supabase.from("contacts").update({ status }).eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
