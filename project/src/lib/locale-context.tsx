"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import enMessages from "@/content/messages/en.json";
import hiMessages from "@/content/messages/hi.json";
import { getStoredLocale, setLocale as persistLocale } from "@/lib/i18n";

export type Locale = "en" | "hi";

const MESSAGES: Record<Locale, typeof enMessages> = {
  en: enMessages,
  hi: hiMessages,
};

const LocaleContext = createContext<{
  t: (k: string) => string;
  locale: Locale;
  setLocale: (next: Locale) => void;
} | null>(null);

export function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const stored = getStoredLocale();
  const [locale, setLocaleState] = useState<Locale>(stored);

  const t = useCallback(
    (key: string): string => {
      const messages = MESSAGES[locale] ?? MESSAGES.en;
      const parts = key.split(".");
      let current: unknown = messages;
      for (const part of parts) {
        if (!current || typeof current !== "object") return key;
        current = (current as Record<string, unknown>)[part];
      }
      return typeof current === "string" ? current : key;
    },
    [locale]
  );

  const value = useMemo(() => ({ t, locale, setLocale: setLocaleState }), [
    t,
    locale,
  ]);

  useEffect(() => {
    document.documentElement.lang = locale === "hi" ? "hi" : "en";
    persistLocale(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useT must be used within a LocaleProvider");
  }
  return ctx;
}

declare global {
  interface Window {
    AyurDermaSetLocale?: (next: Locale) => void;
    AyurDermaBookmarksChanged?: () => void;
  }
}
