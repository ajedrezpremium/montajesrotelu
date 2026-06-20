"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/language";

const steps = [
  { num: "01", key: "step1" },
  { num: "02", key: "step2" },
  { num: "03", key: "step3" },
  { num: "04", key: "step4" },
  { num: "05", key: "step5" },
  { num: "06", key: "step6" },
  { num: "07", key: "step7" },
  { num: "08", key: "step8" },
];

export default function Process() {
  const { t } = useLang();

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
            {t("process.tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mt-3">
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            {t("process.subtitle")}
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
                    <h3 className="text-lg font-bold text-heading mt-1">
                      {t(`process.${step.key}.title`)}
                    </h3>
                    <p className="text-zinc-500 text-sm mt-2">{t(`process.${step.key}.desc`)}</p>
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
                  <h3 className="text-base font-bold text-heading">{t(`process.${step.key}.title`)}</h3>
                  <p className="text-zinc-500 text-xs mt-1">{t(`process.${step.key}.desc`)}</p>
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
