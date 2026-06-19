"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useLang } from "@/lib/language";
import { useTheme } from "@/lib/theme";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const languages = ["ES", "EN", "FR", "DE"];

  const navLinks = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.capabilities"), href: "#capabilities" },
    { label: t("nav.process"), href: "#process" },
    { label: t("nav.library"), href: "#library" },
    { label: t("nav.certifications"), href: "#certifications" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-steel/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-orange rounded-sm flex items-center justify-center font-bold text-white text-sm">
              R
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              ROTELU
            </span>
            <span className="hidden sm:block text-[10px] text-zinc-500 font-light leading-tight">
              steel &amp; engineering<br />since 1988
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggle}
              className="text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors px-2 py-1"
              >
                {lang.toUpperCase()}
                <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden"
                  >
                    {languages.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l.toLowerCase() as any);
                          setLangOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          lang.toUpperCase() === l
                            ? "text-orange bg-zinc-800"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-steel/98 backdrop-blur-md border-t border-zinc-800"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
                <button
                  onClick={toggle}
                  className="text-zinc-400 hover:text-white transition-colors p-1"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-zinc-400 hover:text-white transition-colors uppercase text-sm tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-4 border-t border-zinc-800">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l.toLowerCase() as any)}
                    className={`px-3 py-1 text-xs rounded ${
                      lang.toUpperCase() === l
                        ? "bg-orange text-white"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
