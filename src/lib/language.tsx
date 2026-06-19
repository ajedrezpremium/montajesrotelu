"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Language } from "./translations";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (k: string) => k,
});

async function loadTranslations(): Promise<
  Record<string, Record<string, string | string[]>>
> {
  const mod = await import("./translations");
  return mod.default;
}

let translationsCache: Record<string, Record<string, string | string[]>> | null =
  null;

function getTranslation(lang: Language, key: string): string {
  if (!translationsCache) return key;
  const val = translationsCache[lang]?.[key] || translationsCache["en"]?.[key];
  if (Array.isArray(val)) return val[0] || key;
  return (val as string) || key;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadTranslations().then((t) => {
      translationsCache = t;
      setReady(true);
    });
    const stored = localStorage.getItem("rotelu-lang") as Language | null;
    if (stored) setLang(stored);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("rotelu-lang", lang);
  }, [lang, ready]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: (key: string) => getTranslation(lang, key),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
