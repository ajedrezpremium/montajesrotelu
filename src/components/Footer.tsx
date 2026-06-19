"use client";

import { useLang } from "@/lib/language";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-orange rounded-sm flex items-center justify-center font-bold text-white text-xs">
                R
              </div>
              <span className="font-bold text-white">ROTELU</span>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs uppercase tracking-wider font-bold mb-4">
              {t("footer.solutions")}
            </h4>
            <ul className="space-y-2">
              {[
                "Hydroelectric",
                "Offshore Wind",
                "Shipbuilding",
                "Pressure Equipment",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#capabilities"
                    className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs uppercase tracking-wider font-bold mb-4">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2">
              {[
                { label: t("nav.projects"), href: "#projects" },
                { label: t("nav.certifications"), href: "#certifications" },
                { label: t("fac.tag"), href: "#facilities" },
                { label: t("nav.contact"), href: "#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs uppercase tracking-wider font-bold mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2 text-zinc-600 text-xs">
              <li>Pontevedra, Spain</li>
              <li>info@rotelu.es</li>
              <li>+34 XXX XXX XXX</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-700 text-xs">
            {t("footer.copyright").replace("{year}", String(year))}
          </p>
          <div className="flex items-center gap-4 text-zinc-700 text-xs">
            <a
              href="/info"
              className="hover:text-zinc-400 transition-colors underline underline-offset-4 decoration-zinc-800"
            >
              {t("footer.legal")}
            </a>
            <span className="w-px h-3 bg-zinc-800" />
            <span>{t("hero.cert1")}</span>
            <span className="w-px h-3 bg-zinc-800" />
            <span>{t("hero.cert2")}</span>
            <span className="w-px h-3 bg-zinc-800" />
            <span>{t("hero.cert3")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
