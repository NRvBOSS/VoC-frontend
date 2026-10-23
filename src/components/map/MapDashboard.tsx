"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Button from "../ui/Button";
import type { Issue } from "@/types/issue";
import FilterPanel from "./FilterPanel";
import IssueDetailPanel from "./IssueDetailPanel";

// Leaflet window-dan istifadə edir, ona görə serverdə yüklənmir
const IssueMap = dynamic(() => import("./IssueMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center text-sm text-slate-600">
      Xəritə yüklənir…
    </div>
  ),
});

export default function MapDashboard({ issues }: { issues: Issue[] }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedIssue = issues.find((i) => i.id === selectedId) ?? null;

  return (
    <div className="relative flex h-full overflow-hidden">
      {filtersOpen && (
        <button
          type="button"
          aria-label="Filtrləri bağla"
          onClick={() => setFiltersOpen(false)}
          className="absolute inset-0 z-10 bg-slate-900/30 xl:hidden"
        />
      )}

      <aside
        aria-label="Filtrlər"
        className={`absolute inset-y-0 left-0 z-20 w-72 max-w-[85%] border-r border-slate-200 bg-white transition-transform xl:static xl:z-auto xl:max-w-none xl:shrink-0 xl:visible xl:translate-x-0 ${
          filtersOpen ? "translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <FilterPanel onClose={() => setFiltersOpen(false)} />
      </aside>

      <section
        aria-label="Xəritə"
        className="relative isolate min-w-0 flex-1 bg-slate-200"
      >
        <IssueMap
          issues={issues}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <div className="absolute left-3 top-3 z-[1000] xl:hidden">
          <Button variant="secondary" onClick={() => setFiltersOpen(true)}>
            Filtrlər
          </Button>
        </div>

        <p className="absolute right-3 top-3 z-[1000] rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800">
          Nümunə məlumat
        </p>
      </section>

      {selectedIssue && (
        <aside
          aria-label="Problemin təfərrüatları"
          className="absolute inset-x-0 bottom-0 z-20 max-h-[60%] overflow-y-auto rounded-t-2xl border-t border-slate-200 bg-white md:left-auto md:top-0 md:max-h-none md:w-96 md:rounded-none md:border-l md:border-t-0 xl:static xl:w-[400px] xl:shrink-0"
        >
          <IssueDetailPanel
            issue={selectedIssue}
            onClose={() => setSelectedId(null)}
          />
        </aside>
      )}
    </div>
  );
}
