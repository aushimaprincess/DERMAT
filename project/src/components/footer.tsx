"use client";

import { useT } from "@/lib/locale-context";

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-slate-600">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <p className="font-medium text-amber-700">{t("footer.unofficial")}</p>
            <p>{t("footer.forDoctors")}</p>
            <p>{t("footer.verify")}</p>
          </div>
          <p className="text-xs text-slate-500">{t("footer.credits")}</p>
        </div>
      </div>
    </footer>
  );
}
