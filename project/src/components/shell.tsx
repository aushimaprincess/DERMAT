"use client";

import { useEffect, useState } from "react";
import { LocaleProvider, useT } from "@/lib/locale-context";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("ayurderma-disclaimer-accepted");
    setAccepted(stored === "true");
  }, []);

  if (!mounted) return null;

  const accept = () => {
    localStorage.setItem("ayurderma-disclaimer-accepted", "true");
    setAccepted(true);
  };

  return (
    <LocaleProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="relative">
          {!accepted ? (
            <DisclaimerModal onAccept={accept} />
          ) : (
            children
          )}
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}

function DisclaimerModal({ onAccept }: { onAccept: () => void }) {
  const { t } = useT();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full text-slate-900 overflow-y-auto max-h-[85vh]">
        <h2 className="text-xl font-bold mb-2 text-amber-700">{t("disclaimer.title")}</h2>
        <div className="prose prose-sm text-slate-700 leading-relaxed max-w-none mb-6">
          {t("disclaimer.text").split("\n\n").map((p, i) => (
            <p key={i} className="mb-3 last:mb-0">{p}</p>
          ))}
        </div>
        <button
          onClick={onAccept}
          className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition"
        >
          {t("disclaimer.ack")}
        </button>
      </div>
    </div>
  );
}
