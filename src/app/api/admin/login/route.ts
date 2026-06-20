import { NextRequest } from "next/server";
import crypto from "crypto";

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

function createToken(): string {
  const secret = process.env.ADMIN_PASSWORD!;
  const payload = JSON.stringify({ exp: Date.now() + 86400000 });
  const b64 = Buffer.from(payload).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(b64).digest("base64url");
  return `${b64}.${sig}`;
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (password === process.env.ADMIN_PASSWORD) {
      return Response.json({ token: createToken() });
    }
    return Response.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!auth || !verifyToken(auth)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json({ ok: true });
}
