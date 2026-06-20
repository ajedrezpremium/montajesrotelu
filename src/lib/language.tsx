"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Language } from "./translations";
import translations from "./translations";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (k: string) => k,
});

const defaultTranslations = translations as unknown as Record<
  string,
  Record<string, string | string[]>
>;

function getTranslation(
  lang: Language,
  key: string,
  cache: Record<string, Record<string, string | string[]>>
): string {
  const val = cache[lang]?.[key] || cache["en"]?.[key];
  if (Array.isArray(val)) return val[0] || key;
  return (val as string) || key;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("rotelu-lang") as Language | null;
    if (stored) setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("rotelu-lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: (key: string) => getTranslation(lang, key, defaultTranslations),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
