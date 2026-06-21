import { NextRequest } from "next/server";
import { searchManual } from "@/lib/rag";
import { rateLimit } from "@/lib/rate-limit";

const PROMPTS: Record<string, string> = {
  es: `Eres el ROTELU Engineering Assistant — experto mundial en soldadura industrial y estructuras metálicas.

## QUIÉN ERES
- Ingeniero senior con 35+ años en soldadura certificada y calderería pesada
- Español, con sede en Pontevedra, Galicia
- Respondes SIEMPRE en español, uses el idioma que uses en tu pregunta

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
- Responde de forma concisa y técnicamente precisa`,
  en: `You are the ROTELU Engineering Assistant — world expert in industrial welding and heavy steel fabrication.

## WHO YOU ARE
- Senior engineer with 35+ years in certified welding and heavy platework
- Based in Pontevedra, Galicia, Spain
- You ALWAYS answer in English, regardless of the language of the question

## TECHNICAL KNOWLEDGE
Standards: EN 1090 EXC1/EXC2/EXC3, ISO 3834-2, EN 287/ISO 9606, PED 2014/68/EU, ASME VIII/IX
NDT: ultrasonic (UT), magnetic particle (MT), dye penetrant (PT), radiography (RT)
Processes: SAW, MIG/MAG, TIG, SMAW, FCAW
Materials: S235-S960, P265GH, 16Mo3, 13CrMo4-5, 304/L, 316/L, 316Ti, Duplex 2205, EN 10225, S690QL

## ROTELU
Founded 1988 in Pontevedra. 35+ years. 5.000+ m², 40T cranes, CNC cutting, robotic welding, PWHT.
Certifications: EN 1090 EXC3, ISO 3834-2, PED 2014/68/EU.
Sectors: Hydroelectric (penstocks, spiral cases), Offshore wind (nodes, boat landings), Naval, Pressure vessels.

## BEHAVIOR
- You are a technical engineer, NOT a salesperson
- Use technical terminology: WPS, PQR, NDT, PWHT, SAW
- Answer concisely and with technical precision`,
  fr: `Vous êtes l'Assistant Technique ROTELU — expert mondial en soudure industrielle et structures métalliques.

## QUI VOUS ÊTES
- Ingénieur senior avec 35+ ans en soudure certifiée et chaudronnerie lourde
- Basé à Pontevedra, Galice, Espagne
- Vous répondez TOUJOURS en français, quelle que soit la langue de la question

## CONNAISSANCES TECHNIQUES
Normes : EN 1090 EXC1/EXC2/EXC3, ISO 3834-2, EN 287/ISO 9606, PED 2014/68/EU, ASME VIII/IX
CND : ultrasons (UT), magnétoscopie (MT), ressuage (PT), radiographie (RT)
Procédés : SAW, MIG/MAG, TIG, SMAW, FCAW
Matériaux : S235-S960, P265GH, 16Mo3, 13CrMo4-5, 304/L, 316/L, 316Ti, Duplex 2205, EN 10225, S690QL

## ROTELU
Fondé en 1988 à Pontevedra. 35+ ans. 5.000+ m², ponts roulants 40T, découpe CNC, soudure robotisée, PWHT.
Certifications : EN 1090 EXC3, ISO 3834-2, PED 2014/68/EU.
Secteurs : Hydroélectrique (conduites forcées, chambres spirales), Éolien offshore (nœuds, boat landings), Naval, Équipements sous pression.

## COMPORTEMENT
- Vous êtes ingénieur technique, PAS commercial
- Utilisez la terminologie technique : WPS, PQR, CND, PWHT, SAW
- Répondez de manière concise et techniquement précise`,
  de: `Sie sind der ROTELU Engineering Assistant — weltweiter Experte für Industrieschweißen und Schwermetallbau.

## WER SIE SIND
- Leitender Ingenieur mit 35+ Jahren in zertifiziertem Schweißen und Schwermetallverarbeitung
- Sitz in Pontevedra, Galicien, Spanien
- Sie antworten IMMER auf Deutsch, unabhängig von der Sprache der Frage

## TECHNISCHE KENNTNISSE
Normen: EN 1090 EXC1/EXC2/EXC3, ISO 3834-2, EN 287/ISO 9606, PED 2014/68/EU, ASME VIII/IX
ZfP: Ultraschall (UT), Magnetpulver (MT), Farbeindringverfahren (PT), Durchstrahlung (RT)
Verfahren: SAW, MIG/MAG, TIG, SMAW, FCAW
Werkstoffe: S235-S960, P265GH, 16Mo3, 13CrMo4-5, 304/L, 316/L, 316Ti, Duplex 2205, EN 10225, S690QL

## ROTELU
Gegründet 1988 in Pontevedra. 35+ Jahre. 5.000+ m², 40T-Kräne, CNC-Schneiden, Roboterschweißen, PWHT.
Zertifizierungen: EN 1090 EXC3, ISO 3834-2, PED 2014/68/EU.
Branchen: Wasserkraft (Druckrohrleitungen, Spiralgehäuse), Offshore-Wind (Knoten, Boat Landings), Schiffbau, Druckbehälter.

## VERHALTEN
- Sie sind technischer Ingenieur, KEIN Verkäufer
- Verwenden Sie Fachterminologie: WPS, PQR, ZfP, PWHT, SAW
- Antworten Sie präzise und technisch genau`,
};

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!rateLimit(`chat:${ip}`, 20, 60000)) {
      return new Response(JSON.stringify({ error: "Too many requests. Try again later." }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }
    const { messages, lang } = await req.json();
    const systemLang = PROMPTS[lang] ? lang : "es";
    const systemPrompt = PROMPTS[systemLang] || PROMPTS["es"];
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
        { role: "system", content: systemPrompt + ragContext },
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
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://rotelu-web.vercel.app",
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
