"use client";

import { useEffect, useState, useCallback } from "react";
import lunr from "lunr";
import { getAllDiseases, getMedicines } from "@/lib/content/data";
import Shell from "@/components/shell";
import { useT } from "@/lib/locale-context";

export default function SearchPage() {
  const { t } = useT();
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [indexReady, setIndexReady] = useState(false);

  useEffect(() => {
    let idx: any;
    try {
      const diseases = getAllDiseases();
      const medicines = getMedicines() as any[];

      const docs: any[] = [];
      diseases.forEach((d) => {
        d.sections.forEach((s: any) => {
          docs.push({
            id: `sec-${d.id}-${s.id}`,
            diseaseId: d.id,
            diseaseName: d.name,
            type: "section",
            title: `${d.name} — ${s.title}`,
            content: `${s.title} ${s.content} ${s.originalText || ""}`,
            url: `/disease/${d.id}#${s.id}`,
          });
        });
      });
      medicines.forEach((m: any) => {
        docs.push({
          id: `med-${m.source?.chapter ?? ""}-${m.name}`,
          diseaseId: m.disease,
          diseaseName: m.disease,
          type: "medicine",
          title: m.name,
          content: `${m.name} ${m.dosageForm || ""} ${m.dose || ""} ${m.frequency || ""} ${m.duration || ""} ${m.anupana || ""}`,
          url: `/medicines`,
        });
      });

      idx = lunr(function () {
        this.ref("id");
        this.field("title", { boost: 10 });
        this.field("content", { boost: 2 });
        this.field("diseaseName", { boost: 5 });
        docs.forEach((d) => this.add(d));
      });
    } catch (e) {
      console.error("Search index build failed", e);
    }
    setIndexReady(!!idx);
    // store in closure for search
    (window as any).__ayurderma_lunr = idx;
    setLoading(false);
  }, []);

  const handleSearch = useCallback((q: string) => {
    const idx = (window as any).__ayurderma_lunr;
    if (!q.trim() || !idx) {
      setResults([]);
      return;
    }
    const hits = idx.search(q);
    setResults(hits.map((h: any) => idx.documentStore.getDoc(h.ref)));
  }, []);

  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-4 py-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t("search.title")}</h1>
        <p className="text-slate-600 mb-6">
          Search across disease chapters, sections and medicines. Sanskrit and
          Ayurvedic terms are indexed as written in the source PDF.
        </p>
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            className="w-full px-4 py-3 pl-11 text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {!loading && indexReady && query.trim() === "" && (
          <p className="text-slate-500">Type to search diseases, medicines or Sanskrit terms.</p>
        )}

        {!loading && indexReady && query.trim() !== "" && results.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
            <p className="text-slate-500">{t("search.noResults")}</p>
          </div>
        )}

        {!loading && indexReady && results.length > 0 && (
          <>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              {t("search.results")} ({results.length})
            </h2>
            <div className="space-y-3">
              {results.map((r) => (
                <div
                  key={r.id}
                  className="border border-slate-200 rounded-xl p-4 bg-white hover:shadow-sm transition"
                >
                  <a
                    href={r.url}
                    className="font-bold text-amber-700 hover:underline text-sm mb-1 block"
                  >
                    {r.title}
                  </a>
                  <span className="text-xs text-slate-500">{r.diseaseName}</span>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                    {r.content.slice(0, 220)}{r.content.length > 220 ? "…" : ""}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}
