"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon, User, UserRound } from "lucide-react";
import { useLang } from "@/lib/language";
import { useTheme } from "@/lib/theme";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [voiceGender, setVoiceGender] = useState<"male" | "female">(() => {
    if (typeof window !== "undefined") return (localStorage.getItem("rotelu-voice") as "male" | "female") || "female";
    return "female";
  });

  const toggleVoice = () => {
    const next = voiceGender === "female" ? "male" : "female";
    setVoiceGender(next);
    localStorage.setItem("rotelu-voice", next);
  };

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
          ? "bg-[#0f0f0f]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#hero" className="flex flex-col items-center group">
            <img
              src="https://rotelu.es/wp-content/uploads/2018/11/Anagrama.png"
              alt="ROTELU"
              className="h-12 w-auto"
              style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.4)) drop-shadow(0 0 1px white)" }}
            />
            <span className="text-[9px] text-heading/70 font-light tracking-wider leading-tight -mt-0.5">
              steel &amp; engineering since 1988
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggle}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={toggleVoice}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Toggle voice gender"
            >
              {voiceGender === "female" ? <UserRound size={16} /> : <User size={16} />}
            </button>
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors px-2 py-1"
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
                    className="absolute right-0 mt-1 bg-[#0f0f0f] border border-zinc-800 rounded-sm overflow-hidden"
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
                            ? "text-orange bg-zinc-700"
                            : "text-white/70 hover:text-white hover:bg-zinc-700"
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
            className="lg:hidden bg-[#0f0f0f]/98 backdrop-blur-md border-t border-zinc-800"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
                <button
                  onClick={toggle}
                  className="text-white/70 hover:text-white transition-colors p-1"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button
                  onClick={toggleVoice}
                  className="text-white/70 hover:text-white transition-colors p-1"
                  aria-label="Toggle voice gender"
                >
                  {voiceGender === "female" ? <UserRound size={16} /> : <User size={16} />}
                </button>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-white/70 hover:text-white transition-colors uppercase text-sm tracking-wide"
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
                        : "bg-zinc-700 text-white/70"
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
