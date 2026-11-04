import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Search } from "lucide-react";
import DiseaseList from "@/components/disease-list";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-3 uppercase tracking-wider">
          Clinical Reference • Ministry of AYUSH STG (June 2026)
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Ayurvedic Dermatology Guidelines
        </h1>
        <p className="text-lg text-slate-600 mb-6 max-w-2xl">
          A chapter-wise clinical reference covering Dermatitis, Dermatophytosis,
          Psoriasis, Urticaria and Vitiligo — with Ayurvedic correlation, ICD
          codes, treatment levels, medicines with source traceability,
          pathya-apathya and referral criteria.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/diseases"
            className="px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
          >
            Browse Disease Chapters <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Link>
          <Link
            href="/search"
            className="px-5 py-3 border border-slate-200 hover:border-amber-300 text-slate-700 font-semibold rounded-xl transition"
          >
            Search <Search className="w-4 h-4 ml-2 inline" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <FeatureCard
          icon={BookOpen}
          title="Source Traceability"
          desc="Every clinical record traces to the original PDF: chapter, section, printed page and PDF page index."
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Three Treatment Levels"
          desc="Level 1 (clinic/PHC), Level 2 (CHC/small hospital) and Level 3 (Ayush hospital) management as per the guideline."
        />
      </div>

      <DiseaseList />
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}
