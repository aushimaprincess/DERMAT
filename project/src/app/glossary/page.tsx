"use client";

import { useEffect, useState } from "react";
import { getGlossary } from "@/lib/content/data";
import SourceBadge from "@/components/source-badge";
import Shell from "@/components/shell";
import { useT } from "@/lib/locale-context";

export default function GlossaryPage() {
  const { t } = useT();
  const [terms, setTerms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGlossary().then((data) => {
      setTerms(data);
      setLoading(false);
    });
  }, []);

  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-4 py-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t("glossary.title")}</h1>
        <p className="text-slate-600 mb-6">{t("glossary.subtitle")}</p>
        {loading ? (
          <p className="text-slate-500">Loading…</p>
        ) : (
          <div className="space-y-3">
            {terms.map((term) => (
              <div key={term.id} className="border border-slate-200 rounded-xl p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900">{term.term}</h3>
                  {term.devanagari && (
                    <span className="text-amber-700 font-medium text-sm">{term.devanagari}</span>
                  )}
                </div>
                {term.transliteration && (
                  <p className="text-[11px] text-slate-400 italic mb-2">{term.transliteration}</p>
                )}
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-slate-700">{term.englishMeaning}</p>
                  {term.hindiMeaning && (
                    <p className="text-sm text-slate-600">{term.hindiMeaning}</p>
                  )}
                </div>
                <SourceBadge
                  source={{
                    chapter: term.associatedDisease ?? "General",
                    section: term.sourceSection,
                    printedPage: term.printedPage,
                    pdfPageIndex: term.pdfPageIndex,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
}
