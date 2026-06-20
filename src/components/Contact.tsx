"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { useLang } from "@/lib/language";

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    sector: "",
    description: "",
  });

  const sectorOptions = String(t("contact.form.sector.options")).split(",");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.description.length < 10) return;
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error");
      }

      setForm({ name: "", email: "", phone: "", company: "", country: "", sector: "", description: "" });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError(t("contact.form.error"));
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            {t("contact.tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mt-3">
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                  {t("contact.form.name")} *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-heading text-sm focus:border-orange/50 outline-none transition-colors"
                  placeholder={t("contact.form.name")}
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                  {t("contact.form.company")}
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-heading text-sm focus:border-orange/50 outline-none transition-colors"
                  placeholder={t("contact.form.company")}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                  {t("contact.form.email")} *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-heading text-sm focus:border-orange/50 outline-none transition-colors"
                  placeholder={t("contact.form.email")}
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                  {t("contact.form.phone")}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-heading text-sm focus:border-orange/50 outline-none transition-colors"
                  placeholder={t("contact.form.phone")}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                  {t("contact.form.country")}
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-heading text-sm focus:border-orange/50 outline-none transition-colors"
                  placeholder={t("contact.form.country")}
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                  {t("contact.form.sector")}
                </label>
                <select
                  value={form.sector}
                  onChange={(e) => setForm({ ...form, sector: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-heading text-sm focus:border-orange/50 outline-none transition-colors"
                >
                  <option value="">{t("contact.form.sector")}</option>
                  {sectorOptions.map((opt, i) => (
                    <option key={i} value={opt.trim().toLowerCase().replace(/\s+/g, "-")}>
                      {opt.trim()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                {t("contact.form.description")} *
              </label>
              <textarea
                required
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-heading text-sm focus:border-orange/50 outline-none transition-colors resize-none"
                placeholder={t("contact.form.description")}
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-900/20 border border-red-900/30 rounded-sm">
                <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 leading-relaxed">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || sent}
              className={`w-full py-3.5 px-6 rounded-sm font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                sent
                  ? "bg-green-600/80 text-white"
                  : "bg-orange text-white hover:bg-orange-hover"
              }`}
            >
              {loading ? (
                <span className="animate-pulse">{t("contact.submit")}...</span>
              ) : sent ? (
                <>
                  <Check size={16} />
                  {t("contact.success")}
                </>
              ) : (
                <>
                  <Send size={16} />
                  {t("contact.submit")}
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <div className="w-full h-[300px] border border-zinc-800/50 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.1!2d-8.6359!3d42.0931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd258512a28dc953%3A0xf811c6f37d44cc87!2sMontajes%20Rotelu!5e1!3m2!1sen!2ses!4v1"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ROTELU Location"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
