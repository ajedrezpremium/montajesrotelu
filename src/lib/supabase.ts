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
  email?: string;
  phone?: string;
  company?: string;
  country?: string;
  sector?: string;
  description: string;
}) {
  if (!supabase) {
    if (process.env.NODE_ENV === "development") {
      console.log("Contact form submission (Supabase not configured):", data);
    }
    return { success: true };
  }

  const { error } = await supabase.from("contacts").insert([data]);
  if (error) throw error;
  return { success: true };
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  client: string | null;
  sector: string;
  country: string;
  year: string;
  description: string;
  dimensions: string;
  weight: string;
  material: string;
  highlights: string[];
  images: string[];
}

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return (data || []).map((p: any) => ({
    ...p,
    sector: p.sector ?? "",
    country: p.country ?? "",
    year: p.year ?? "",
    description: p.description ?? "",
    dimensions: p.dimensions ?? "",
    weight: p.weight ?? "",
    material: p.material ?? "",
    slug: p.slug ?? "",
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
    images: Array.isArray(p.images) ? p.images : [],
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return {
    ...data,
    sector: data.sector ?? "",
    country: data.country ?? "",
    year: data.year ?? "",
    description: data.description ?? "",
    dimensions: data.dimensions ?? "",
    weight: data.weight ?? "",
    material: data.material ?? "",
    slug: data.slug ?? "",
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    images: Array.isArray(data.images) ? data.images : [],
  };
}

export interface Testimonial {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  text: string;
  years: string | null;
  avatar: string | null;
}

export interface TeamMember {
  id: number; name: string; role: string | null; description: string | null;
  initials: string | null; avatar: string | null; order: number; published: boolean;
}
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("team_members").select("*").eq("published", true).order("order", { ascending: true });
  if (error) { console.error("Error fetching team:", error); return []; }
  return data || [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
  return data || [];
}
