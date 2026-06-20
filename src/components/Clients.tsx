"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/language";
import { getTestimonials, type Testimonial } from "@/lib/supabase";

const fallbackTestimonials = [
  { text: "clients.testimonial1", author: "clients.author1", company: "clients.company1", years: "clients.years1" },
  { text: "clients.testimonial2", author: "clients.author2", company: "clients.company2", years: "clients.years2" },
  { text: "clients.testimonial3", author: "clients.author3", company: "clients.company3", years: "clients.years3" },
];

export default function Clients() {
  const { t } = useLang();
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);

  useEffect(() => {
    getTestimonials().then((data) => {
      if (data.length > 0) setTestimonials(data);
    });
  }, []);

  return (
    <section className="relative py-24 sm:py-32 bg-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            {t("clients.tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            {t("clients.title")}
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            {t("clients.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {(testimonials ?? fallbackTestimonials).map((item: any, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-6 sm:p-8 bg-black/40 border border-zinc-800/50 rounded-sm"
            >
              <div className="text-4xl text-orange/20 leading-none mb-4">&ldquo;</div>
              <p className="text-zinc-300 leading-relaxed mb-6 text-sm">
                {testimonials ? item.text : t(item.text)}
              </p>
              <div className="border-t border-zinc-800/50 pt-4">
                <div className="text-white font-medium text-sm">
                  {testimonials ? item.name : t(item.author)}
                </div>
                <div className="text-zinc-500 text-xs mt-1">
                  {testimonials ? [item.role, item.company].filter(Boolean).join(" · ") : t(item.company)}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="w-1.5 h-1.5 bg-orange rounded-full" />
                  <span className="text-orange text-xs">
                    {testimonials ? item.years : t(item.years)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
