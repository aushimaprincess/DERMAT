"use client";

import { useEffect, useState } from "react";
import { useT, Locale } from "@/lib/locale-context";

export default function LanguageToggle({
  standalone = false,
}: { standalone?: boolean }) {
  const { t, locale, setLocale } = useT();
  const [local, setLocal] = useState<Locale>(locale);

  useEffect(() => {
    setLocal(locale);
  }, [locale]);

  const label = local === "hi" ? "हिन्दी" : "English";

  const cls = `px-2.5 py-1.5 rounded text-xs font-medium border transition ${
    standalone
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-700"
  }`;

  return (
    <button
      onClick={() => setLocale(local === "en" ? "hi" : "en")}
      className={cls}
    >
      {label} <span className="ml-1 text-[10px] opacity-50">{local === "en" ? "EN" : "HI"}</span>
    </button>
  );
}
