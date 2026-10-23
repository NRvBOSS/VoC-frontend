"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import IssueList from "@/components/issues/IssueList";
import { EMPTY_FILTERS } from "@/lib/constants";
import type { Filters, Issue } from "@/types/issue";
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

// Boş siyahı = həmin üzrə süzgəc yoxdur (hamısı göstərilir)
function filterIssues(issues: Issue[], filters: Filters): Issue[] {
  return issues.filter(
    (i) =>
      (filters.categories.length === 0 ||
        filters.categories.includes(i.category)) &&
      (filters.statuses.length === 0 || filters.statuses.includes(i.status)),
  );
}

export default function MapDashboard({ issues }: { issues: Issue[] }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  const visibleIssues = filterIssues(issues, filters);
  const selectedIssue = visibleIssues.find((i) => i.id === selectedId) ?? null;

  function updateFilters(next: Filters) {
    setFilters(next);
    const stillVisible = filterIssues(issues, next).some(
      (i) => i.id === selectedId,
    );
    if (!stillVisible) setSelectedId(null);
  }

  function selectFromList(id: string) {
    setSelectedId(id);
    setFiltersOpen(false);
  }

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
        aria-label="Filtrlər və siyahı"
        className={`absolute inset-y-0 left-0 z-20 w-72 max-w-[85%] border-r border-slate-200 bg-white transition-transform xl:static xl:z-auto xl:max-w-none xl:shrink-0 xl:visible xl:translate-x-0 ${
          filtersOpen ? "translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <FilterPanel
          filters={filters}
          onChange={updateFilters}
          onReset={() => updateFilters(EMPTY_FILTERS)}
          onClose={() => setFiltersOpen(false)}
          resultCount={visibleIssues.length}
        >
          <IssueList
            issues={visibleIssues}
            selectedId={selectedIssue?.id ?? null}
            onSelect={selectFromList}
          />
        </FilterPanel>
      </aside>

      <section
        aria-label="Xəritə"
        className="relative isolate min-w-0 flex-1 bg-slate-200"
      >
        <IssueMap
          issues={visibleIssues}
          selectedId={selectedIssue?.id ?? null}
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

        {visibleIssues.length === 0 && (
          <div
            role="status"
            className="absolute left-1/2 top-16 z-[1000] w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm"
          >
            <p className="text-sm font-medium text-slate-900">
              Bu süzgəclərə uyğun problem tapılmadı
            </p>
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => updateFilters(EMPTY_FILTERS)}
            >
              Süzgəcləri təmizlə
            </Button>
          </div>
        )}
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
