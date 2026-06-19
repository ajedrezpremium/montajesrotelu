"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { submitContact } from "@/lib/supabase";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    country: "",
    sector: "",
    description: "",
  });

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
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Let&apos;s build your next industrial challenge
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Tell us about your project requirements and our engineering team will
            get back to you with a tailored solution.
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
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm focus:border-orange/50 outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm focus:border-orange/50 outline-none transition-colors"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm focus:border-orange/50 outline-none transition-colors"
                  placeholder="Country"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                  Sector
                </label>
                <select
                  value={form.sector}
                  onChange={(e) => setForm({ ...form, sector: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm focus:border-orange/50 outline-none transition-colors"
                >
                  <option value="">Select sector</option>
                  <option value="hydroelectric">Hydroelectric</option>
                  <option value="offshore">Offshore Wind</option>
                  <option value="shipbuilding">Shipbuilding & Naval</option>
                  <option value="pressure">Pressure Equipment</option>
                  <option value="industrial">Industrial / Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                Project Description *
              </label>
              <textarea
                required
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm focus:border-orange/50 outline-none transition-colors resize-none"
                placeholder="Describe your project: dimensions, materials, specifications, deadlines..."
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
                <span className="animate-pulse">Sending...</span>
              ) : sent ? (
                <>
                  <Check size={16} />
                  Message sent successfully
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send inquiry to engineering team
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
