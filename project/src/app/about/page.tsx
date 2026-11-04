"use client";

import Link from "next/link";
import Shell from "@/components/shell";
import { useT } from "@/lib/locale-context";

export default function AboutPage() {
  const { t } = useT();
  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-4 py-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t("about.title")}</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">{t("about.source")}</h2>
            <p className="text-slate-700">{t("about.sourceText")}</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">{t("about.coverage")}</h2>
            <p className="text-slate-700">{t("about.coverageList")}</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">{t("about.dataSource")}</h2>
            <p className="text-slate-700">{t("about.dataText")}</p>
          </section>
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h2 className="text-lg font-bold text-amber-800 mb-2">Source PDF — Not Hosted Here</h2>
            <p className="text-sm text-amber-700 mb-2">
              {t("about.pdfNote")}
            </p>
            <p className="text-sm text-amber-700">
              Bibliographic information: Standard Treatment Guidelines on
              Management of Dermatological Disorders in Ayurveda System of
              Medicine, Ministry of AYUSH, Government of India, June 2026.
              Access the authorized source via the Ministry of AYUSH website
              (ayush.gov.in).
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Scope & Constraints</h2>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
              <li>No login, registration, user accounts, admin dashboard or backend database.</li>
              <li>No AI assistant or chatbot (planned for a future phase only).</li>
              <li>No redistribution of the source PDF without verified redistribution permission.</li>
              <li>Bookmarks are stored in your browser's localStorage only.</li>
              <li>Client-side search; content is bundled as static JSON files.</li>
            </ul>
          </section>
          <section className="bg-slate-900 text-slate-300 rounded-xl p-5 text-sm">
            <h3 className="text-white font-bold mb-2">Clinical Disclaimer</h3>
            <p>
              This website is NOT an official Ministry of AYUSH or Government of
              India website. It is an unofficial, independently compiled clinical
              reference intended for registered Ayurvedic medical practitioners
              only. All extracted records await doctor review
              (verificationStatus = "pending"). Always verify against the original
              guideline before clinical application.
            </p>
          </section>
        </div>
      </div>
    </Shell>
  );
}
