"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/language";

const capabilities = [
  {
    key: "hydro",
    image: "https://rotelu.es/wp-content/uploads/2018/10/4_1_Banda_Superior_recor.jpg",
  },
  {
    key: "offshore",
    image: "https://rotelu.es/wp-content/uploads/2018/10/4_2_Banda_Superior_recor.jpg",
  },
  {
    key: "shipbuilding",
    image: "https://rotelu.es/wp-content/uploads/2018/11/4_3_Banda_SuperiorPortada.jpg",
  },
  {
    key: "pressure",
    image: "https://rotelu.es/wp-content/uploads/2018/10/4_4_Banda_Superior-2.png",
  },
];

export default function Capabilities() {
  const { t } = useLang();

  return (
    <section id="capabilities" className="relative py-24 sm:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            {t("caps.tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            {t("caps.title")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => {
            const items = String(t(`caps.${cap.key}.items`)).split(",");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-gradient-to-br from-zinc-900/60 to-black border border-zinc-800/50 rounded-sm hover:border-zinc-700/50 transition-all duration-500 overflow-hidden"
              >
                <img
                  src={cap.image}
                  alt={t(`caps.${cap.key}.title`)}
                  className="w-full h-44 object-cover border-b border-zinc-800/50"
                />
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <h3 className="text-xl font-bold text-white">{t(`caps.${cap.key}.title`)}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                    {t(`caps.${cap.key}.desc`)}
                  </p>
                  <ul className="space-y-2">
                    {items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-zinc-500 text-sm"
                      >
                        <span className="w-1 h-1 bg-orange/60 rounded-full" />
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
