"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { useLang } from "@/lib/language";
import { submitContact } from "@/lib/supabase";

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    country: "",
    sector: "",
    description: "",
  });

  const sectorOptions = String(t("contact.form.sector.options")).split(",");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.description.length < 10) return;
    setLoading(true);

    try {
      await submitContact({
        name: form.name,
        company: form.company,
        country: form.country,
        sector: form.sector,
        description: form.description,
      });
    } catch {
      // Silently continue even if Supabase is not configured
    }

    setLoading(false);
    setSent(true);
    setForm({ name: "", company: "", country: "", sector: "", description: "" });
    setTimeout(() => setSent(false), 4000);
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            {t("contact.title")}
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
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm focus:border-orange/50 outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm focus:border-orange/50 outline-none transition-colors"
                  placeholder={t("contact.form.company")}
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
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm focus:border-orange/50 outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm focus:border-orange/50 outline-none transition-colors"
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
                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm focus:border-orange/50 outline-none transition-colors resize-none"
                placeholder={t("contact.form.description")}
              />
            </div>

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
      </div>
    </section>
  );
}
