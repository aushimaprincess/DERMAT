"use client";

import Link from "next/link";
import Shell from "@/components/shell";
import { useT } from "@/lib/locale-context";

export default function NotFound() {
  const { t } = useT();
  return (
    <Shell>
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Chapter not found</h1>
        <p className="text-slate-600 mb-6">The requested disease chapter does not exist.</p>
        <Link
          href="/diseases"
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition"
        >
          Browse Disease Chapters
        </Link>
      </div>
    </Shell>
  );
}
