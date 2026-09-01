"use client";

import * as React from "react";
import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { getDictionary, type Dict } from "@/i18n/getDictionary";

interface LanguageContextType {
  locale: Locale;
  dict: Dict;
  dir: "ltr";
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale: Locale = defaultLocale;
  const dict = React.useMemo(() => getDictionary(locale), [locale]);
  const dir = "ltr" as const;

  const setLocale = React.useCallback(() => {}, []);
  const toggleLocale = React.useCallback(() => {}, []);

  return (
    <LanguageContext.Provider value={{ locale, dict, dir, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    const fallbackLocale = defaultLocale;
    return {
      locale: fallbackLocale,
      dict: getDictionary(fallbackLocale),
      dir: "ltr" as const,
      setLocale: () => {},
      toggleLocale: () => {},
    };
  }
  return context;
}
