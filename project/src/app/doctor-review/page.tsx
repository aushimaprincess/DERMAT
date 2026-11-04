"use client";

import { useEffect, useState } from "react";
import { getAllDiseases, getMedicines, getGlossary } from "@/lib/content/data";
import Shell from "@/components/shell";
import SourceBadge from "@/components/source-badge";
import { useT } from "@/lib/locale-context";

export default function DoctorReviewPage() {
  const { t } = useT();
  const [glossary, setGlossary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGlossary().then((g) => {
      setGlossary(g);
      setLoading(false);
    });
  }, []);

  const diseases = getAllDiseases();
  const medicines = getMedicines() as any[];

  const pendingCount = diseases.reduce(
    (acc, d) =>
      acc +
      d.sections.filter((s: any) => s.verificationStatus === "pending").length +
      d.treatmentLevels.filter((l: any) => l.verificationStatus === "pending")
        .length,
    0
  );

  return (
    <Shell>
      <div className="max-w-5xl mx-auto px-4 py-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{t("doctorReview.title")}</h1>
          <p className="text-slate-600">{t("doctorReview.subtitle")}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-800 mb-2">
            {t("doctorReview.intro")}
          </p>
          <p className="text-sm text-amber-700">
            Records awaiting review: <span className="font-bold">{pendingCount}</span> — all extracted records are initially marked verificationStatus = "pending".
          </p>
        </div>

        <div className="mb-8">
          <a
            href="/api/doc-review"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition"
          >
            <Download className="w-4 h-4 mr-1" />
            {t("doctorReview.download")}
          </a>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-amber-600">📋</span>
              Content Inventory by Disease Chapter
            </h2>
            <div className="space-y-4">
              {diseases.map((d) => (
                <div key={d.id} className="border border-slate-200 rounded-xl p-4 bg-white">
                  <h3 className="font-bold text-slate-900 mb-2">
                    {d.name} <span className="text-[10px] text-slate-400 font-normal ml-2 uppercase">{d.ayurvedicName}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    Sections: {d.sections.length} &middot; Treatment levels: {d.treatmentLevels.length} &middot; Verification status: all pending
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {d.sections.map((s: any) => (
                      <div key={s.id} className="bg-slate-50 p-2 rounded border border-slate-100">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-slate-700">{s.title}</span>
                          <span className="text-amber-600 font-bold">pending</span>
                        </div>
                        <SourceBadge
                          source={{
                            chapter: d.name,
                            section: s.source?.[0]?.section ?? s.id,
                            printedPage: s.source?.[0]?.printedPage ?? 0,
                            pdfPageIndex: s.source?.[0]?.pdfPageIndex ?? 0,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-amber-600">💊</span>
              Medicines List (~{medicines.length} entries)
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              All medicines across the five disease chapters with dose, frequency,
              duration, anupana and source traceability — verificationStatus = "pending".
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-200">
                    <th className="pb-3 pr-2">Medicine</th>
                    <th className="pb-3 pr-2">Chapter</th>
                    <th className="pb-3 pr-2">Form</th>
                    <th className="pb-3 pr-2">Dose</th>
                    <th className="pb-3 pr-2">Frequency</th>
                    <th className="pb-3 pr-2">Duration</th>
                    <th className="pb-3">Anupana</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicines.slice(0, 60).map((m) => (
                    <tr key={`${m.name}-${m.source?.printedPage ?? ""}`}>
                      <td className="py-2 pr-2 font-medium text-slate-800">{m.name}</td>
                      <td className="py-2 pr-2 text-slate-600">{m.disease}</td>
                      <td className="py-2 pr-2 text-slate-600">{m.dosageForm || "—"}</td>
                      <td className="py-2 pr-2 text-slate-600">{m.dose || "Not specified"}</td>
                      <td className="py-2 pr-2 text-slate-600">{m.frequency || "Not specified"}</td>
                      <td className="py-2 pr-2 text-slate-600">{m.duration || "Not specified"}</td>
                      <td className="py-2 pr-2 text-slate-600">{m.anupana || "Not specified"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {medicines.length > 60 && (
                <p className="text-xs text-slate-500 mt-3">Showing first 60 of {medicines.length} medicines.</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-amber-600">⚠️</span>
              {t("doctorReview.uncertainties")}
            </h2>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
              <li>
                <strong>Devanagari encoding:</strong> Sanskrit/Ayurvedic terms in
                Devanagari script show encoding issues in the extracted text across
                all chapters. The original PDF remains authoritative; terms must be
                visually verified against the PDF before publication.
              </li>
              <li>
                <strong>Dermatophytosis algorithm (PDF page index 75):</strong>
                extracted as mirrored/garbled text; treatment flow diagram must be
                manually reconstructed and verified against the PDF.
              </li>
              <li>
                <strong>Printed page numbers:</strong> Roman numeral front matter
                pages could not be mapped to printed numbers; continuous Arabic
                pagination used from chapter start pages onward.
              </li>
              <li>
                <strong>Dosages not specified:</strong> where the guideline does not
                state a dose, frequency, duration or anupana, the site displays
                "Not specified in this chapter" — no values have been invented.
              </li>
              <li>
                <strong>Verification:</strong> every extracted record carries
                verificationStatus = "pending" and must be reviewed by a qualified
                Ayurvedic physician before clinical use.
              </li>
            </ul>
          </section>

          <section className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 mb-2">
              {t("doctorReview.sanskritNote")}
            </h3>
            <p className="text-sm text-slate-600">
              {t("doctorReview.pageNote")}
            </p>
            <p className="text-sm text-amber-600 mt-2">
              {t("doctorReview.disclaimer")}
            </p>
          </section>
        </div>
      </div>
    </Shell>
  );
}

function Download({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
