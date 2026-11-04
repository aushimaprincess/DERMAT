"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, BookOpen, Search, Stethoscope, FileText, Globe } from "lucide-react";
import LanguageToggle from "./language-toggle";
import { useT } from "@/lib/locale-context";

const NAV = [
  { href: "/", labelKey: "nav.home", icon: BookOpen },
  { href: "/diseases", labelKey: "nav.diseases", icon: Stethoscope },
  { href: "/medicines", labelKey: "nav.medicines", icon: FileText },
  { href: "/glossary", labelKey: "nav.glossary", icon: BookOpen },
  { href: "/about", labelKey: "nav.about", icon: FileText },
];

export default function Navbar() {
  const { t } = useT();
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-600">🌿</span>
            <Link href="/" className="font-bold text-xl tracking-tight">
              AyurDerma STG
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === item.href
                    ? "bg-amber-50 text-amber-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <a
              href="/search"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              <Search className="w-4 h-4 mr-1.5 inline" /> {t("nav.search")}
            </a>
            <LanguageToggle />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button className="text-slate-600 hover:text-amber-600" aria-label="Main menu">
              <Menu className="w-6 h-6" />
            </button>
            <LanguageToggle standalone />
          </div>
        </div>
        <div className="md:hidden border-t border-slate-200 mt-1">
          <div className="px-3 py-2 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === item.href
                    ? "bg-amber-50 text-amber-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <a
              href="/search"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition flex items-center gap-2"
            >
              <Search className="w-4 h-4" /> {t("nav.search")}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
