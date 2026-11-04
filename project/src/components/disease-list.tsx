import Link from "next/link";
import { BookOpen, ShieldCheck } from "lucide-react";
import { getDisease } from "@/lib/content/data";
import type { DiseaseContent } from "@/lib/content/types";

const DISEASE_ORDER = ["dermatitis", "dermatophytosis", "psoriasis", "urticaria", "vitiligo"];

export default function DiseaseList() {
  const diseases = DISEASE_ORDER.map((id) => getDisease(id)).filter(
    (d): d is DiseaseContent => !!d
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Disease Chapters</h1>
        <p className="text-slate-600">
          Select a disease chapter to view its full clinical content, including
          Ayurvedic correlation, treatment levels, medicines and source
          traceability.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {diseases.map((d) => (
          <Link
            key={d.id}
            href={`/disease/${d.id}`}
            className="group block bg-white border border-slate-200 rounded-xl p-6 hover:border-amber-300 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-100 text-amber-700 rounded-lg p-2">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="ml-auto text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                Chapter
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition">
              {d.name}
            </h3>
            <p className="text-sm text-slate-500 mb-3">{d.ayurvedicName}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-slate-300" /> ICD-10:
                {d.icd10}
              </span>
            </div>
            <p className="text-[12px] text-slate-600 leading-relaxed mb-5">
              {d.description}
            </p>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-medium text-slate-700">
                Traceable to source PDF
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
