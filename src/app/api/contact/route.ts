import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, country, sector, description } = body;

    if (!name || !description || description.length < 10) {
      return Response.json({ error: "Name and description (min 10 chars) are required" }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Insert into Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from("contacts").insert([{
        name,
        email: email || null,
        phone: phone || null,
        company: company || null,
        country: country || null,
        sector: sector || null,
        description,
        status: "new",
      }]);

      if (error) {
        console.error("Supabase insert error:", error);
        // Don't fail the request if Supabase is down — just log
      }
    }

    // Optional: send email notification
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && email) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "ROTELU Web <noreply@rotelu.es>",
            to: "info@rotelu.es",
            replyTo: email,
            subject: `New contact: ${name} — ${sector || "General"}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nCompany: ${company || "-"}\nCountry: ${country || "-"}\nSector: ${sector || "-"}\n\nDescription:\n${description}`,
          }),
        });
      } catch {
        console.log("Resend not configured, skipping email notification");
      }
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
