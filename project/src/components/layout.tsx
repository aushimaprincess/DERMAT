"use client";

import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="relative">
        {!accepted ? (
          <DisclaimerModal onAccept={accept} />
        ) : (
          children
        )}
      </main>
      {title && <title>{title}</title>}
      <Footer />
    </div>
  );
}

function DisclaimerModal({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full text-slate-900 overflow-y-auto max-h-[85vh]">
        <h2 className="text-xl font-bold mb-2 text-amber-700">Important Clinical Disclaimer</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          This website is an unofficial, independently compiled clinical reference based on the Ministry of AYUSH publication &ldquo;Standard Treatment Guidelines on Management of Dermatological Disorders in Ayurveda System of Medicine&rdquo; (June 2026). It is NOT an official Ministry of AYUSH or Government of India website, and it is not affiliated with the Ministry of AYUSH.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          The content is intended for registered Ayurvedic medical practitioners and healthcare professionals only. It is not a substitute for professional clinical judgment, diagnosis, or treatment. Dosages, duration, anupana and treatment decisions must be individualized by the attending physician. Where the guideline does not specify a value, this site displays &ldquo;Not specified in this chapter&rdquo; &mdash; no dosages or durations have been invented.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          All extracted clinical records carry <span className="font-semibold">verificationStatus = &ldquo;pending&rdquo;</span> and await review by a qualified Ayurvedic physician. The original PDF remains the authoritative source. Every clinical recommendation on this site is traceable to the original PDF (chapter, section, printed page, PDF page index).
        </p>
        <p className="text-sm text-slate-700 leading-relaxed mb-6">
          By using this site, you agree to verify all information against the original guideline before clinical application.
        </p>
        <button
          onClick={onAccept}
          className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition"
        >
          I understand and accept the disclaimer
        </button>
      </div>
    </div>
  );
}
