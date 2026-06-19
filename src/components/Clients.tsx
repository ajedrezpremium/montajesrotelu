"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    text: "ROTELU ha demostrado una capacidad técnica excepcional en la fabricación de nuestros componentes críticos. Su compromiso con la calidad y los plazos es incomparable.",
    author: "Director de Ingeniería",
    company: "Multinacional energética europea",
    years: "15+ años de colaboración",
  },
  {
    text: "La precisión en la soldadura de los nodos offshore ha superado nuestras expectativas. Un socio industrial de primer nivel.",
    author: "Project Manager",
    company: "Consorcio eólico offshore",
    years: "8+ años de colaboración",
  },
  {
    text: "Cuando el proyecto no admite errores, confiamos en ROTELU. Su sistema de calidad y trazabilidad es de clase mundial.",
    author: "CEO",
    company: "Ingeniería internacional",
    years: "10+ años de colaboración",
  },
];

export default function Clients() {
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
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Trusted by industry leaders
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Decades of trust built in steel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
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
                {t.text}
              </p>
              <div className="border-t border-zinc-800/50 pt-4">
                <div className="text-white font-medium text-sm">{t.author}</div>
                <div className="text-zinc-500 text-xs mt-1">{t.company}</div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="w-1.5 h-1.5 bg-orange rounded-full" />
                  <span className="text-orange text-xs">{t.years}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-40">
            {[
              "ENERGY CORP",
              "OFFSHORE WIND",
              "HYDRO POWER",
              "NAVAL GROUP",
              "STEEL INDUSTRY",
            ].map((name, i) => (
              <span
                key={i}
                className="text-zinc-600 text-lg font-bold tracking-widest"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
