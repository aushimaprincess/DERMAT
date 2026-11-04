"use client";

import { getMedicines, getAllDiseases } from "@/lib/content/data";
import SourceBadge from "@/components/source-badge";
import NotSpecified from "@/components/not-specified";
import Shell from "@/components/shell";
import { useT } from "@/lib/locale-context";

export default function MedicinesPage() {
  const { t } = useT();
  const medicines = getMedicines() as any[];
  const diseases = getAllDiseases();

  const byDisease = new Map(
    diseases.map((d) => [d.id, [] as any[]])
  );
  medicines.forEach((m) => {
    const arr = byDisease.get(m.disease);
    if (arr) arr.push(m);
  });

  return (
    <Shell>
      <div className="max-w-6xl mx-auto px-4 py-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t("medicines.title")}</h1>
        <p className="text-slate-600 mb-6">{t("medicines.subtitle")}</p>
        <div className="space-y-6">
          {diseases.map((d) => {
            const meds = byDisease.get(d.id) || [];
            if (meds.length === 0) return null;
            return (
              <section key={d.id} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-amber-50 px-5 py-3 border-b border-slate-200">
                  <h2 className="font-bold text-slate-900 flex items-center gap-2">
                    {d.name} <span className="text-[10px] text-slate-400 font-normal ml-auto uppercase">{(meds as any[]).length} medicines</span>
                  </h2>
                  <p className="text-xs text-slate-500">{d.ayurvedicName}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="text-left text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-200 bg-slate-50">
                        <th className="py-3 pr-2">{t("medicines.medicine")}</th>
                        <th className="py-3 pr-2">{t("medicines.form")}</th>
                        <th className="py-3 pr-2">{t("medicines.dose")}</th>
                        <th className="py-3 pr-2">{t("medicines.frequency")}</th>
                        <th className="py-3 pr-2">{t("medicines.duration")}</th>
                        <th className="py-3 pr-2">{t("medicines.anupana")}</th>
                        <th className="py-3">{t("medicines.source")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {meds.map((m) => (
                        <tr key={`${m.name}-${m.source?.printedPage ?? ""}`}>
                          <td className="py-3 pr-2 font-medium text-slate-800">{m.name}</td>
                          <td className="py-3 pr-2 text-slate-600">{m.dosageForm || <NotSpecified />}</td>
                          <td className="py-3 pr-2 text-slate-600">{m.dose || <NotSpecified />}</td>
                          <td className="py-3 pr-2 text-slate-600">{m.frequency || <NotSpecified />}</td>
                          <td className="py-3 pr-2 text-slate-600">{m.duration || <NotSpecified />}</td>
                          <td className="py-3 pr-2 text-slate-600">{m.anupana || <NotSpecified />}</td>
                          <td className="py-3 pr-2">
                            {m.source ? (
                              <SourceBadge source={m.source} />
                            ) : (
                              <NotSpecified />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
