"use client";

import enMessages from "@/content/messages/en.json";
import hiMessages from "@/content/messages/hi.json";

export type Locale = "en" | "hi";
export type Messages = typeof enMessages;

const MESSAGES: Record<Locale, Messages> = {
  en: enMessages,
  hi: hiMessages,
};

const STORAGE_KEY = "ayurderma-locale";

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "hi") return stored;
  return "en";
}

export function setLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.lang = locale === "hi" ? "hi" : "en";
}

export function useTranslation(locale: Locale = "en") {
  const messages = MESSAGES[locale] ?? MESSAGES.en;
  const t = (key: string): string => {
    const parts = key.split(".");
    let current: unknown = messages;
    for (const part of parts) {
      if (!current || typeof current !== "object") return key;
      current = (current as Record<string, unknown>)[part];
    }
    return typeof current === "string" ? current : key;
  };
  return { t, messages, locale };
}
