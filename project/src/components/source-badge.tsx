export default function SourceBadge({
  source,
}: {
  source: { chapter: string; section: string; printedPage: number; pdfPageIndex: number };
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-600 leading-none">
      {source.chapter} &middot; {source.section} &middot;
      p. {source.printedPage} &middot; PDF idx {source.pdfPageIndex}
    </span>
  );
}
