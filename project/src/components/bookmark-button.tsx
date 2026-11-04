"use client";

import { useCallback, useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

type Target = { type: "disease"; id: string } | { type: "medicine"; name: string };

function storageKey(target: Target) {
  const id = target.type === "disease" ? target.id : target.name;
  return `ayurderma-bookmark-${target.type}-${id}`;
}

export function getBookmarked(): string[] {
  if (typeof localStorage === "undefined") return [];
  return JSON.parse(localStorage.getItem("ayurderma-bookmarks") || "[]");
}

export function isBookmarked(target: Target): boolean {
  return getBookmarked().includes(storageKey(target));
}

export default function BookmarkButton({ target }: { target: Target }) {
  const key = storageKey(target);
  const [set, setSet] = useState<boolean>(false);

  useEffect(() => {
    setSet(getBookmarked().includes(key));
  }, [key]);

  const toggle = useCallback(() => {
    const next = !set;
    setSet(next);
    const stored = getBookmarked();
    if (next) {
      if (!stored.includes(key)) stored.push(key);
    } else {
      const idx = stored.indexOf(key);
      if (idx >= 0) stored.splice(idx, 1);
    }
    localStorage.setItem("ayurderma-bookmarks", JSON.stringify(stored));
  }, [key, set]);

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-md transition ${
        set
          ? "text-amber-600 bg-amber-50"
          : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
      }`}
      aria-label={set ? "Remove bookmark" : "Bookmark"}
    >
      {set ? (
        <BookmarkCheck className="w-5 h-5 fill-amber-600" />
      ) : (
        <Bookmark className="w-5 h-5" />
      )}
    </button>
  );
}
