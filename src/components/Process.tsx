"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Engineering Review", desc: "Detailed analysis of specifications, drawings and technical requirements." },
  { num: "02", title: "Material Selection", desc: "Certified materials with full traceability from approved mills and suppliers." },
  { num: "03", title: "Cutting & Forming", desc: "CNC plasma cutting, bending, rolling and forming of plates and profiles." },
  { num: "04", title: "Certified Welding", desc: "Qualified welders and WPS procedures under ISO 3834-2 standards." },
  { num: "05", title: "Non-Destructive Testing", desc: "UT, MT, PT, RT inspection of all critical welds by certified personnel." },
  { num: "06", title: "Surface Treatment", desc: "Shot blasting, painting, galvanizing and special coating systems." },
  { num: "07", title: "Final Inspection", desc: "Dimensional, pressure and functional testing with full documentation." },
  { num: "08", title: "Delivery", desc: "Safe transport and logistics coordination for national and international projects." },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            Manufacturing Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            How we deliver precision
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Every project follows our proven 8-step manufacturing process to ensure quality, traceability and on-time delivery.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="hidden sm:flex sm:w-1/2 items-center justify-center">
                  <div
                    className={`max-w-sm ${
                      i % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <span className="text-orange/30 text-sm font-mono">
                      {step.num}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 text-sm mt-2">{step.desc}</p>
                  </div>
                </div>

                <div className="relative flex-shrink-0 z-10">
                  <div className="w-8 h-8 rounded-full bg-steel border-2 border-zinc-700 flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange rounded-full" />
                  </div>
                </div>

                <div className="sm:hidden flex-1">
                  <span className="text-orange/30 text-xs font-mono">
                    {step.num}
                  </span>
                  <h3 className="text-base font-bold text-white">{step.title}</h3>
                  <p className="text-zinc-500 text-xs mt-1">{step.desc}</p>
                </div>

                <div className="hidden sm:flex sm:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
