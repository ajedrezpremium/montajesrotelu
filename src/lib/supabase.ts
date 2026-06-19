import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createSupabaseClient();

export async function submitContact(data: {
  name: string;
  company?: string;
  country?: string;
  sector?: string;
  description: string;
}) {
  if (!supabase) {
    // Fallback: log to console in dev
    if (process.env.NODE_ENV === "development") {
      console.log("Contact form submission (Supabase not configured):", data);
    }
    return { success: true };
  }

  const { error } = await supabase.from("contacts").insert([data]);
  if (error) throw error;
  return { success: true };
}
