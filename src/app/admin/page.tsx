"use client";

import { useState, useEffect, useCallback } from "react";

type Project = {
  id: number;
  title: string;
  client: string | null;
  sector: string | null;
  country: string | null;
  year: string | null;
  description: string | null;
  dimensions: string | null;
  weight: string | null;
  material: string | null;
  highlights: string[];
  images: string[];
  published: boolean;
  created_at: string;
};

type Contact = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  country: string | null;
  sector: string | null;
  description: string;
  status: string;
  created_at: string;
};

type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  text: string;
  years: string | null;
  published: boolean;
  created_at: string;
};

const emptyProject = {
  title: "", client: "", sector: "", country: "", year: "",
  description: "", dimensions: "", weight: "", material: "",
  highlights: [] as string[], images: [] as string[], published: true,
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"projects" | "contacts" | "testimonials" | "team">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);
  const [highlightsInput, setHighlightsInput] = useState("");
  const [imagesInput, setImagesInput] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [editingMember, setEditingMember] = useState<any>(null);

  useEffect(() => {
    const t = sessionStorage.getItem("admin_token");
    if (t) setToken(t);
  }, []);

  const api = useCallback(async (path: string, options?: RequestInit) => {
    return fetch(path, {
      ...options,
      headers: { ...options?.headers, Authorization: `Bearer ${token}` },
    });
  }, [token]);

  useEffect(() => {
    if (!token) return;
    api("/api/admin/login").then(async (r) => {
      if (!r.ok) { setToken(null); sessionStorage.removeItem("admin_token"); }
    });
  }, [token, api]);

  useEffect(() => {
    if (!token) return;
    api("/api/admin/projects").then(async (r) => {
      if (r.ok) setProjects(await r.json());
    });
  }, [token, api]);

  useEffect(() => {
    if (!token || tab !== "contacts") return;
    api("/api/admin/contacts").then(async (r) => {
      if (r.ok) setContacts(await r.json());
    });
  }, [token, tab, api]);

  useEffect(() => {
    if (!token || tab !== "testimonials") return;
    api("/api/admin/testimonials").then(async (r) => {
      if (r.ok) setTestimonials(await r.json());
    });
  }, [token, tab, api]);

  useEffect(() => {
    if (!token || tab !== "team") return;
    api("/api/admin/team").then(async (r) => {
      if (r.ok) setTeamMembers(await r.json());
    });
  }, [token, tab, api]);

  const handleLogin = async () => {
    setLoginError("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!r.ok) { setLoginError("Contraseña incorrecta"); return; }
    const { token: t } = await r.json();
    sessionStorage.setItem("admin_token", t);
    setToken(t);
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem("admin_token");
  };

  const handleSave = async () => {
    if (!editing || !editing.title) return;
    setSaving(true);
    const method = editing.id ? "PUT" : "POST";
    const r = await api("/api/admin/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setSaving(false);
    if (r.ok) {
      setEditing(null);
      api("/api/admin/projects").then(async (r2) => {
        if (r2.ok) setProjects(await r2.json());
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    await api(`/api/admin/projects?id=${id}`, { method: "DELETE" });
    api("/api/admin/projects").then(async (r) => {
      if (r.ok) setProjects(await r.json());
    });
  };

  const handleContactStatus = async (id: number, status: string) => {
    await api("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    api("/api/admin/contacts").then(async (r) => {
      if (r.ok) setContacts(await r.json());
    });
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-heading text-center mb-6">Admin ROTELU</h1>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-heading text-sm focus:outline-none focus:border-orange/50"
              autoFocus
            />
            {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-orange text-white text-sm font-medium hover:bg-orange/90 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-heading">
      <header className="border-b border-zinc-800 px-4 sm:px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Admin ROTELU</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTab("projects")}
            className={`text-sm px-3 py-1.5 transition-colors ${tab === "projects" ? "bg-orange text-white" : "text-zinc-400 hover:text-heading"}`}
          >
            Proyectos
          </button>
          <button
            onClick={() => setTab("contacts")}
            className={`text-sm px-3 py-1.5 transition-colors ${tab === "contacts" ? "bg-orange text-white" : "text-zinc-400 hover:text-heading"}`}
          >
            Contactos
          </button>
          <button
            onClick={() => setTab("testimonials")}
            className={`text-sm px-3 py-1.5 transition-colors ${tab === "testimonials" ? "bg-orange text-white" : "text-zinc-400 hover:text-heading"}`}
          >
            Testimonios
          </button>
          <button
            onClick={() => setTab("team")}
            className={`text-sm px-3 py-1.5 transition-colors ${tab === "team" ? "bg-orange text-white" : "text-zinc-400 hover:text-heading"}`}
          >
            Equipo
          </button>
          <button onClick={handleLogout} className="text-xs text-zinc-500 hover:text-heading ml-4">
            Salir
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {tab === "projects" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Proyectos</h2>
              <button
                onClick={() => {
                  setEditing({ ...emptyProject });
                  setHighlightsInput("");
                  setImagesInput("");
                }}
                className="px-4 py-2 bg-orange text-white text-sm hover:bg-orange/90 transition-colors"
              >
                + Nuevo
              </button>
            </div>

            {editing && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center p-4 overflow-y-auto"
                   onClick={() => setEditing(null)}>
                <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 mt-8"
                     onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-semibold mb-6">
                    {editing.id ? "Editar proyecto" : "Nuevo proyecto"}
                  </h3>
                  <div className="space-y-4">
                    <input placeholder="Título *" value={editing.title || ""}
                      onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="Cliente" value={editing.client || ""}
                        onChange={(e) => setEditing({ ...editing, client: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                      <input placeholder="Sector" value={editing.sector || ""}
                        onChange={(e) => setEditing({ ...editing, sector: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                      <input placeholder="País" value={editing.country || ""}
                        onChange={(e) => setEditing({ ...editing, country: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                      <input placeholder="Año" value={editing.year || ""}
                        onChange={(e) => setEditing({ ...editing, year: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                      <input placeholder="Dimensiones" value={editing.dimensions || ""}
                        onChange={(e) => setEditing({ ...editing, dimensions: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                      <input placeholder="Peso" value={editing.weight || ""}
                        onChange={(e) => setEditing({ ...editing, weight: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                      <input placeholder="Material" value={editing.material || ""}
                        onChange={(e) => setEditing({ ...editing, material: e.target.value })}
                        className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                      <label className="flex items-center gap-2 text-sm text-zinc-400">
                        <input type="checkbox" checked={editing.published ?? true}
                          onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
                        Publicado
                      </label>
                    </div>
                    <textarea placeholder="Descripción" rows={4} value={editing.description || ""}
                      onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Highlights (uno por línea)</label>
                      <textarea rows={3} value={highlightsInput}
                        onChange={(e) => {
                          setHighlightsInput(e.target.value);
                          setEditing({ ...editing, highlights: e.target.value.split("\n").filter(Boolean) });
                        }}
                        className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Imágenes (una URL por línea)</label>
                      <textarea rows={3} value={imagesInput}
                        onChange={(e) => {
                          setImagesInput(e.target.value);
                          setEditing({ ...editing, images: e.target.value.split("\n").filter(Boolean) });
                        }}
                        className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={handleSave} disabled={saving || !editing.title}
                        className="px-6 py-2 bg-orange text-white text-sm disabled:opacity-40 hover:bg-orange/90 transition-colors">
                        {saving ? "Guardando..." : "Guardar"}
                      </button>
                      <button onClick={() => setEditing(null)}
                        className="px-6 py-2 border border-zinc-700 text-zinc-400 text-sm hover:text-heading transition-colors">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800/50 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{p.title}</span>
                      {!p.published && <span className="text-[10px] text-zinc-600 border border-zinc-700 px-1.5">Borrador</span>}
                    </div>
                    <div className="text-xs text-zinc-600 mt-0.5">
                      {p.sector} · {p.year} · {p.images?.length || 0} img
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 ml-4">
                    <button onClick={() => {
                      setEditing({ ...p, highlights: p.highlights || [], images: p.images || [] });
                      setHighlightsInput((p.highlights || []).join("\n"));
                      setImagesInput((p.images || []).join("\n"));
                    }}
                      className="px-3 py-1 text-xs border border-zinc-700 text-zinc-400 hover:text-heading transition-colors">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 text-xs border border-red-900/50 text-red-400 hover:bg-red-950/30 transition-colors">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-zinc-600 text-sm text-center py-8">No hay proyectos todavía</p>
              )}
            </div>
          </>
        )}

        {tab === "contacts" && (
          <>
            <h2 className="text-xl font-semibold mb-6">Contactos recibidos</h2>
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.id} className="bg-zinc-900/50 border border-zinc-800/50 px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{c.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 ${
                          c.status === "new" ? "bg-orange/20 text-orange" :
                          c.status === "read" ? "bg-blue-900/30 text-blue-400" :
                          "bg-green-900/30 text-green-400"
                        }`}>{c.status}</span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-1 space-x-3">
                        {c.email && <span>{c.email}</span>}
                        {c.phone && <span>{c.phone}</span>}
                        {c.company && <span>{c.company}</span>}
                      </div>
                      <p className="text-xs text-zinc-400 mt-2">{c.description}</p>
                      <p className="text-[10px] text-zinc-700 mt-1">{new Date(c.created_at).toLocaleString("es-ES")}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {c.status === "new" && (
                        <button onClick={() => handleContactStatus(c.id, "read")}
                          className="px-2 py-1 text-[10px] border border-zinc-700 text-zinc-500 hover:text-heading">
                          Leído
                        </button>
                      )}
                      {c.status !== "done" && (
                        <button onClick={() => handleContactStatus(c.id, "done")}
                          className="px-2 py-1 text-[10px] border border-green-900/50 text-green-500 hover:bg-green-950/30">
                          Hecho
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {contacts.length === 0 && (
                <p className="text-zinc-600 text-sm text-center py-8">No hay contactos todavía</p>
              )}
            </div>
          </>
        )}

        {tab === "team" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Equipo</h2>
              <button onClick={() => setEditingMember({ name: "", role: "", description: "", initials: "", order: 0, published: true })}
                className="px-4 py-2 bg-orange text-white text-sm">+ Nuevo</button>
            </div>
            {editingMember && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setEditingMember(null)}>
                <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 p-6 sm:p-8 mt-8" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-semibold mb-6">{editingMember.id ? "Editar" : "Nuevo"} miembro</h3>
                  <div className="space-y-4">
                    <input placeholder="Nombre *" value={editingMember.name || ""} onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm" />
                    <input placeholder="Cargo" value={editingMember.role || ""} onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm" />
                    <input placeholder="Iniciales (ej: JP)" value={editingMember.initials || ""} onChange={(e) => setEditingMember({ ...editingMember, initials: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm" />
                    <input placeholder="Orden" type="number" value={editingMember.order ?? 0} onChange={(e) => setEditingMember({ ...editingMember, order: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm" />
                    <textarea placeholder="Descripción" rows={3} value={editingMember.description || ""} onChange={(e) => setEditingMember({ ...editingMember, description: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm" />
                    <label className="flex items-center gap-2 text-sm text-zinc-400">
                      <input type="checkbox" checked={editingMember.published ?? true} onChange={(e) => setEditingMember({ ...editingMember, published: e.target.checked })} /> Publicado
                    </label>
                    <div className="flex gap-3 pt-2">
                      <button onClick={async () => {
                        if (!editingMember.name) return; setSaving(true);
                        const method = editingMember.id ? "PUT" : "POST";
                        const r = await api("/api/admin/team", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingMember) });
                        setSaving(false); if (r.ok) { setEditingMember(null); api("/api/admin/team").then(async (r2) => { if (r2.ok) setTeamMembers(await r2.json()); }); }
                      }} disabled={saving || !editingMember.name}
                        className="px-6 py-2 bg-orange text-white text-sm disabled:opacity-40">{saving ? "Guardando..." : "Guardar"}</button>
                      <button onClick={() => setEditingMember(null)} className="px-6 py-2 border border-zinc-700 text-zinc-400 text-sm">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-2">
              {teamMembers.map((m: any) => (
                <div key={m.id} className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800/50 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-medium">{m.name}</span>
                    <span className="text-xs text-zinc-500 ml-2">{m.role}</span>
                    {!m.published && <span className="text-[10px] text-zinc-600 border border-zinc-700 px-1.5 ml-2">Borrador</span>}
                  </div>
                  <div className="flex gap-2 shrink-0 ml-4">
                    <button onClick={() => setEditingMember(m)} className="px-3 py-1 text-xs border border-zinc-700 text-zinc-400">Editar</button>
                    <button onClick={async () => { if (!confirm("¿Eliminar?")) return; await api(`/api/admin/team?id=${m.id}`, { method: "DELETE" }); api("/api/admin/team").then(async (r) => { if (r.ok) setTeamMembers(await r.json()); }); }}
                      className="px-3 py-1 text-xs border border-red-900/50 text-red-400">Eliminar</button>
                  </div>
                </div>
              ))}
              {teamMembers.length === 0 && <p className="text-zinc-600 text-sm text-center py-8">No hay miembros</p>}
            </div>
          </>
        )}

        {tab === "testimonials" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Testimonios</h2>
              <button
                onClick={() => setEditingTestimonial({ name: "", text: "", role: "", company: "", years: "", published: true })}
                className="px-4 py-2 bg-orange text-white text-sm hover:bg-orange/90 transition-colors"
              >
                + Nuevo
              </button>
            </div>

            {editingTestimonial && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center p-4 overflow-y-auto"
                   onClick={() => setEditingTestimonial(null)}>
                <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 p-6 sm:p-8 mt-8"
                     onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-semibold mb-6">
                    {editingTestimonial.id ? "Editar testimonio" : "Nuevo testimonio"}
                  </h3>
                  <div className="space-y-4">
                    <input placeholder="Nombre *" value={editingTestimonial.name || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                    <input placeholder="Cargo / Rol" value={editingTestimonial.role || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                    <input placeholder="Empresa" value={editingTestimonial.company || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                    <input placeholder="Años (ej: 10+ years)" value={editingTestimonial.years || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, years: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                    <textarea placeholder="Texto del testimonio *" rows={4} value={editingTestimonial.text || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-zinc-800 text-sm focus:outline-none focus:border-orange/50" />
                    <label className="flex items-center gap-2 text-sm text-zinc-400">
                      <input type="checkbox" checked={editingTestimonial.published ?? true}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, published: e.target.checked })} />
                      Publicado
                    </label>
                    <div className="flex gap-3 pt-2">
                      <button onClick={async () => {
                        if (!editingTestimonial.name || !editingTestimonial.text) return;
                        setSaving(true);
                        const method = editingTestimonial.id ? "PUT" : "POST";
                        const r = await api("/api/admin/testimonials", {
                          method, headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(editingTestimonial),
                        });
                        setSaving(false);
                        if (r.ok) {
                          setEditingTestimonial(null);
                          api("/api/admin/testimonials").then(async (r2) => {
                            if (r2.ok) setTestimonials(await r2.json());
                          });
                        }
                      }} disabled={saving || !editingTestimonial.name || !editingTestimonial.text}
                        className="px-6 py-2 bg-orange text-white text-sm disabled:opacity-40 hover:bg-orange/90 transition-colors">
                        {saving ? "Guardando..." : "Guardar"}
                      </button>
                      <button onClick={() => setEditingTestimonial(null)}
                        className="px-6 py-2 border border-zinc-700 text-zinc-400 text-sm hover:text-heading transition-colors">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {testimonials.map((t) => (
                <div key={t.id} className="flex items-start justify-between bg-zinc-900/50 border border-zinc-800/50 px-4 py-3 gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{t.name}</span>
                      {!t.published && <span className="text-[10px] text-zinc-600 border border-zinc-700 px-1.5">Borrador</span>}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">{t.company} · {t.role}</div>
                    <p className="text-xs text-zinc-600 mt-1 line-clamp-2">{t.text}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => setEditingTestimonial(t)}
                      className="px-3 py-1 text-xs border border-zinc-700 text-zinc-400 hover:text-heading transition-colors">
                      Editar
                    </button>
                    <button onClick={async () => {
                      if (!confirm("¿Eliminar?")) return;
                      await api(`/api/admin/testimonials?id=${t.id}`, { method: "DELETE" });
                      api("/api/admin/testimonials").then(async (r) => {
                        if (r.ok) setTestimonials(await r.json());
                      });
                    }}
                      className="px-3 py-1 text-xs border border-red-900/50 text-red-400 hover:bg-red-950/30 transition-colors">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              {testimonials.length === 0 && (
                <p className="text-zinc-600 text-sm text-center py-8">No hay testimonios todavía</p>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
