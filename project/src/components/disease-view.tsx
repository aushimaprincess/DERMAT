"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useT } from "@/lib/locale-context";
import { getMedicines } from "@/lib/content/data";
import SourceBadge from "./source-badge";
import BookmarkButton from "./bookmark-button";
import NotSpecified from "./not-specified";

type Section = {
  id: string;
  title: string;
  content: string;
  originalText?: string;
  source?: { chapter: string; section: string; printedPage: number; pdfPageIndex: number }[];
};

type Level = {
  id: string;
  name: string;
  indications?: string;
  clinicalContext?: string;
  internalMedicines?: string[];
  externalMedicines?: string[];
  shodhana?: string[];
  shamana?: string[];
  source?: { chapter: string; section: string; printedPage: number; pdfPageIndex: number }[];
};

interface DiseaseViewProps {
  disease: any;
}

export default function DiseaseView({ disease }: DiseaseViewProps) {
  const { t } = useT();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [showOriginal, setShowOriginal] = useState<Record<string, boolean>>({});

  const medicines = (getMedicines() as any[]).filter(
    (m) => m.disease === disease.id
  );

  const toggleSection = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleOriginal = (id: string) =>
    setShowOriginal((prev) => ({ ...prev, [id]: !prev[id] }));

  const isOpen = (id: string) => openSections[id] ?? true;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 lg:px-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {disease.name}
            </h1>
            <p className="text-amber-700 font-semibold text-sm mt-1">
              {disease.ayurvedicName}
            </p>
            <p className="text-slate-600 text-sm mt-3">
              {disease.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BookmarkButton target={{ type: "disease", id: disease.id }} />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">
              ICD-10: {disease.icd10}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {disease.sections.map((section: Section) => (
          <SectionCard
            key={section.id}
            section={section}
            isOpen={isOpen(section.id)}
            onToggle={() => toggleSection(section.id)}
            showOriginal={showOriginal[section.id] ?? false}
            onToggleOriginal={() => toggleOriginal(section.id)}
          />
        ))}

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-amber-600">⚖️</span>
            {t("disease.principlesManagement")}
          </h2>
          <TreatmentLevels levels={disease.treatmentLevels} />
        </div>

        {medicines.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-amber-600">💊</span>
              Medicines — {disease.name}
            </h2>
            <MedicineTable medicines={medicines} />
          </div>
        )}
      </div>
    </div>
  );
}

function SectionCard({
  section,
  isOpen,
  onToggle,
  showOriginal,
  onToggleOriginal,
}: {
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
  showOriginal: boolean;
  onToggleOriginal: () => void;
}) {
  const { t } = useT();
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition text-left"
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0">
            {section.id.charAt(0).toUpperCase()}
          </span>
          <h3 className="font-bold text-slate-800">{section.title}</h3>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${
          isOpen ? "" : "rotate-90"
        }`} />
      </button>
      {isOpen && (
        <div className="p-5 border-t border-slate-100">
          <div className="prose prose-sm text-slate-700 max-w-none mb-4">
            {renderContent(section.content)}
          </div>
          {section.source && section.source.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {section.source.map((s, i) => (
                <SourceBadge key={i} source={s} />
              ))}
            </div>
          )}
          {section.originalText && (
            <button
              onClick={onToggleOriginal}
              className="text-xs text-amber-600 hover:text-amber-800 underline mb-2 flex items-center gap-1"
            >
              <ChevronDown className="w-3 h-3" />
              {showOriginal ? "Hide original extracted text" : "Show original extracted text"}
            </button>
          )}
          {showOriginal && section.originalText && (
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4 text-xs text-slate-700 leading-relaxed">
              <p className="font-bold text-amber-800 mb-2 text-[10px] uppercase">Original PDF extraction (for verification)</p>
              {renderContent(section.originalText)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChevronUp({ className }: { className?: string }) {
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
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function renderContent(content: string) {
  const paragraphs = content.split("\n\n").filter((p) => p.trim().length > 0);
  if (paragraphs.length > 1) {
    return paragraphs.map((p, i) => (
      <p key={i} className="mb-3 last:mb-0">{p}</p>
    ));
  }
  return <p className="mb-0">{content}</p>;
}

function TreatmentLevels({ levels }: { levels: Level[] }) {
  const { t } = useT();
  if (!levels || levels.length === 0) {
    return <NotSpecified />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {levels.map((level) => (
        <div key={level.id} className="border border-slate-200 rounded-lg p-5 bg-white">
          <h4 className="font-bold text-slate-900 mb-2">{level.name}</h4>
          {level.indications && (
            <p className="text-[12px] text-slate-500 italic mb-3">
              {level.indications}
            </p>
          )}
          {level.clinicalContext && (
            <div className="mb-3">
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">Clinical context</p>
              <p className="text-sm text-slate-700 mb-0">{level.clinicalContext}</p>
            </div>
          )}
          {level.internalMedicines && level.internalMedicines.length > 0 && (
            <div className="mb-3">
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">Internal medicines</p>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {level.internalMedicines.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {level.externalMedicines && level.externalMedicines.length > 0 && (
            <div className="mb-3">
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">External medicines</p>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {level.externalMedicines.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {level.shodhana && level.shodhana.length > 0 && (
            <div className="mb-3">
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">Shodhana</p>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {level.shodhana.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {level.shamana && level.shamana.length > 0 && (
            <div className="mb-3">
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">Shamana</p>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {level.shamana.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {level.source && (
            <div className="mt-3 pt-2 border-t border-slate-100">
              {level.source.map((s, i) => (
                <SourceBadge key={i} source={s} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MedicineTable({ medicines }: { medicines: any[] }) {
  const { t } = useT();
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-200">
            <th className="pb-2 pr-2">{t("medicines.medicine")}</th>
            <th className="pb-2 pr-2">{t("medicines.form")}</th>
            <th className="pb-2 pr-2">{t("medicines.dose")}</th>
            <th className="pb-2 pr-2">{t("medicines.frequency")}</th>
            <th className="pb-2 pr-2">{t("medicines.duration")}</th>
            <th className="pb-2 pr-2">{t("medicines.anupana")}</th>
            <th className="pb-2">{t("medicines.source")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {medicines.map((m) => (
            <tr
              key={`${m.name}-${m.source?.chapter ?? ""}-${m.source?.printedPage ?? ""}`}
            >
              <td className="py-2 pr-2 font-medium text-slate-800">{m.name}</td>
              <td className="py-2 pr-2 text-slate-600">
                {m.dosageForm || <NotSpecified />}
              </td>
              <td className="py-2 pr-2 text-slate-600">
                {m.dose || <NotSpecified />}
              </td>
              <td className="py-2 pr-2 text-slate-600">
                {m.frequency || <NotSpecified />}
              </td>
              <td className="py-2 pr-2 text-slate-600">
                {m.duration || <NotSpecified />}
              </td>
              <td className="py-2 pr-2 text-slate-600">
                {m.anupana || <NotSpecified />}
              </td>
              <td className="py-2 pr-2">
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
  );
}
