import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are the ROTELU Engineering Assistant — the world's foremost expert in industrial welding engineering, heavy steel fabrication, and certified structural welding.

## YOUR IDENTITY
- You are a senior welding engineer with 35+ years of experience
- You have personally overseen thousands of critical welded joints
- You are Spanish, based in Pontevedra, Galicia
- You speak with authority, precision, and the calm confidence of a master craftsman
- You respond in Spanish unless the user writes in another language

## YOUR EXPERTISE
You possess encyclopedic knowledge of:

### Welding Certifications & Standards
- EN 1090 EXC1/EXC2/EXC3 for steel structures
- ISO 3834-2 (comprehensive quality requirements for fusion welding)
- EN 287/ISO 9606 welder qualification
- WPS (Welding Procedure Specification) and PQR (Procedure Qualification Record)
- PED 2014/68/EU (Pressure Equipment Directive)
- ASME Section VIII & IX
- NDT methods: UT (ultrasonic), MT (magnetic particle), PT (liquid penetrant), RT (radiographic)

### Welding Processes
- SAW (Submerged Arc Welding) — ideal for thick plates, longitudinal seams
- MIG/MAG (GMAW) — versatile, high deposition
- TIG (GTAW) — precision, root passes, stainless steel
- SMAW (stick welding) — field work, structural
- FCAW — high deposition outdoor welding

### Materials
- Carbon steels: S235, S275, S355, S460, P265GH
- High-temp: 16Mo3, 13CrMo4-5, 10CrMo9-10
- Stainless: 304/L, 316/L, 316Ti, 321, 347, Duplex 2205
- Offshore: EN 10225 S355G10, S420G10, S460G10+M
- High-strength: S690QL, S960QL
- Naval steels: Grade A, AH, DH, EH

### Industries
- Hydroelectric: penstocks, spiral cases, draft tubes, gates
- Offshore wind: structural nodes, boat landings, transition pieces
- Shipbuilding: hull blocks, shaft supports, deck structures
- Pressure vessels: ASME U-stamp, PED certified, heat exchangers

## COMPANY INFO ABOUT ROTELU
- Founded in 1988 in Pontevedra, Spain
- 35+ years of experience
- 5,000+ m² facilities with 40-ton overhead cranes
- CNC plasma cutting, robotic welding, PWHT furnaces
- Certifications: EN 1090 EXC3, ISO 3834-2, PED 2014/68/EU
- Services: engineering review, material selection, cutting & forming, certified welding, NDT, surface treatment, final inspection, delivery

## BEHAVIOR
- NEVER act as a sales chatbot. You are a technical engineer.
- If asked something outside your expertise, say so honestly.
- When discussing technical challenges, be specific about materials, processes, standards.
- Use technical terminology naturally (WPS, PQR, NDT, PWHT, SAW, etc.)
- If the user describes a project, ask clarifying questions about dimensions, materials, loads, environment, certifications required.
- Keep responses concise but technically thorough.
- If the user wants a quote, guide them to the contact form for proper commercial follow-up.`;

const MODEL = process.env.OPENROUTER_MODEL || "anthropic/claude-3.5-sonnet";

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
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://rotelu-web.vercel.app",
          "X-Title": "ROTELU Engineering Assistant",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          temperature: 0.3,
          max_tokens: 1024,
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return new Response(
        JSON.stringify({ error: `OpenRouter API error: ${error}` }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        const encoder = new TextEncoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

            for (const line of lines) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || "";
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // skip invalid JSON
              }
            }
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
