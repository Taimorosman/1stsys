"use client";

import * as React from "react";
import type { Locale } from "@/i18n/config";
import { defaultLocale, localeMeta } from "@/i18n/config";
import { getDictionary, type Dict } from "@/i18n/getDictionary";

interface LanguageContextType {
  locale: Locale;
  dict: Dict;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = React.useState<Locale>(initialLocale);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("tfs_locale") as Locale | null;
    if (saved && (saved === "en" || saved === "ur")) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = localeMeta[saved]?.dir || "ltr";
    }
  }, []);

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("tfs_locale", newLocale);
      document.cookie = `tfs_locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
      document.documentElement.lang = newLocale;
      document.documentElement.dir = localeMeta[newLocale]?.dir || "ltr";
    }
  }, []);

  const toggleLocale = React.useCallback(() => {
    const next: Locale = locale === "en" ? "ur" : "en";
    setLocale(next);
  }, [locale, setLocale]);

  const dict = React.useMemo(() => getDictionary(locale), [locale]);
  const dir = localeMeta[locale]?.dir || "ltr";

  return (
    <LanguageContext.Provider value={{ locale, dict, dir, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    const fallbackLocale = defaultLocale;
    return {
      locale: fallbackLocale,
      dict: getDictionary(fallbackLocale),
      dir: localeMeta[fallbackLocale]?.dir || "ltr",
      setLocale: () => {},
      toggleLocale: () => {},
    };
  }
  return context;
}
