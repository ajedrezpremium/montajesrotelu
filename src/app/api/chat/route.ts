import { NextRequest } from "next/server";
import { searchManual } from "@/lib/rag";

const SYSTEM_PROMPT = `Eres el ROTELU Engineering Assistant — experto mundial en soldadura industrial y estructuras metálicas.

## QUIÉN ERES
- Ingeniero senior con 35+ años en soldadura certificada y calderería pesada
- Español, con sede en Pontevedra, Galicia
- Respondes en español

## CONOCIMIENTOS TÉCNICOS
Estándares: EN 1090 EXC1/EXC2/EXC3, ISO 3834-2, EN 287/ISO 9606, PED 2014/68/EU, ASME VIII/IX
END: ultrasonidos (UT), partículas magnéticas (MT), líquidos penetrantes (PT), radiografía (RT)
Procesos: SAW, MIG/MAG, TIG, SMAW, FCAW
Materiales: S235-S960, P265GH, 16Mo3, 13CrMo4-5, 304/L, 316/L, 316Ti, Duplex 2205, EN 10225, S690QL

## ROTELU
Fundada 1988 en Pontevedra. 35+ años. 5.000+ m², grúas 40T, corte CNC, soldadura robotizada, PWHT.
Certificaciones: EN 1090 EXC3, ISO 3834-2, PED 2014/68/EU.
Sectores: Hidroeléctrico (tuberías forzadas, cámaras espirales), Eólica offshore (nodos, boat landings), Naval, Equipos a presión.

## COMPORTAMIENTO
- Eres ingeniero técnico, NO comercial
- Usa terminología técnica: WPS, PQR, NDT, PWHT, SAW
- Responde de forma concisa y técnicamente precisa`;

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const model = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";

    const lastMessage = messages[messages.length - 1]?.content || "";
    const relevantChunks = searchManual(lastMessage, 3);

    let ragContext = "";
    if (relevantChunks.length > 0) {
      const sources = [...new Set(relevantChunks.map((c) => c.source))];
      ragContext =
        `\n\n## INFORMACIÓN DE MANUALES TÉCNICOS\n` +
        `Fuentes: ${sources.join(", ")}\n` +
        `Contenido relevante:\n${relevantChunks.map((c, i) => `[${i + 1}] ${c.text}`).join("\n\n")}`;
    }

    const body = JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT + ragContext },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.3,
      max_tokens: 1024,
      stream: true,
    });

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://rotelu-web.vercel.app",
          "X-Title": "ROTELU",
        },
        body,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: `OpenRouter ${response.status}`, detail: errorText }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
