"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Button, { buttonStyles } from "@/components/ui/Button";
import IssueList from "@/components/issues/IssueList";
import { getIssues } from "@/lib/api";
import { EMPTY_FILTERS } from "@/lib/constants";
import type { Filters, Issue } from "@/types/issue";
import FilterPanel from "./FilterPanel";
import IssueDetailPanel from "./IssueDetailPanel";
import MapLegend from "./MapLegend";

// Leaflet window-dan istifadə edir, ona görə serverdə yüklənmir
const IssueMap = dynamic(() => import("./IssueMap"), {
  ssr: false,
  loading: () => (
      <div className="grid h-full place-items-center text-sm text-slate-600">
        Xəritə yüklənir…
      </div>
  ),
});

type LoadState =
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "ready"; issues: Issue[] };

const NO_ISSUES: Issue[] = [];

// Boş siyahı = həmin üzrə süzgəc yoxdur (hamısı göstərilir)
function filterIssues(issues: Issue[], filters: Filters): Issue[] {
  return issues.filter(
      (i) =>
          (filters.categories.length === 0 ||
              filters.categories.includes(i.category)) &&
          (filters.statuses.length === 0 || filters.statuses.includes(i.status))
  );
}

function MapNotice({
                     role,
                     children,
                   }: {
  role: "status" | "alert";
  children: ReactNode;
}) {
  return (
      <div
          role={role}
          className="absolute left-1/2 top-16 z-[1000] w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm"
      >
        {children}
      </div>
  );
}

export default function MapDashboard() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  useEffect(() => {
    let cancelled = false;

    getIssues().then((result) => {
      if (cancelled) return;
      setState(
          result.ok
              ? { status: "ready", issues: result.issues }
              : { status: "error", message: result.message }
      );
    });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  function retry() {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  }

  const allIssues = state.status === "ready" ? state.issues : NO_ISSUES;
  const visibleIssues = filterIssues(allIssues, filters);
  const selectedIssue = visibleIssues.find((i) => i.id === selectedId) ?? null;

  function updateFilters(next: Filters) {
    setFilters(next);
    const stillVisible = filterIssues(allIssues, next).some(
        (i) => i.id === selectedId
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
              resultCount={state.status === "ready" ? visibleIssues.length : null}
          >
            {state.status === "loading" && (
                <p className="text-sm text-slate-600">Yüklənir…</p>
            )}
            {state.status === "error" && (
                <p className="text-sm text-slate-600">Problemlər yüklənmədi.</p>
            )}
            {state.status === "ready" && allIssues.length === 0 && (
                <p className="text-sm text-slate-600">
                  Hələ heç bir problem bildirilməyib.
                </p>
            )}
            {state.status === "ready" && allIssues.length > 0 && (
                <IssueList
                    issues={visibleIssues}
                    selectedId={selectedIssue?.id ?? null}
                    onSelect={selectFromList}
                />
            )}
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

            <MapLegend />

          <div className="absolute left-3 top-3 z-[1000] xl:hidden">
            <Button variant="secondary" onClick={() => setFiltersOpen(true)}>
              Filtrlər
            </Button>
          </div>

          {state.status === "loading" && (
              <MapNotice role="status">
                <p className="text-sm font-medium text-slate-900">
                  Problemlər yüklənir…
                </p>
              </MapNotice>
          )}

          {state.status === "error" && (
              <MapNotice role="alert">
                <p className="text-sm font-medium text-slate-900">
                  {state.message}
                </p>
                <Button variant="secondary" className="mt-3" onClick={retry}>
                  Yenidən cəhd et
                </Button>
              </MapNotice>
          )}

          {state.status === "ready" && allIssues.length === 0 && (
              <MapNotice role="status">
                <p className="text-sm font-medium text-slate-900">
                  Hələ heç bir problem bildirilməyib
                </p>
                <Link
                    href="/report"
                    className={`${buttonStyles("primary")} mt-3`}
                >
                  Problem bildir
                </Link>
              </MapNotice>
          )}

          {state.status === "ready" &&
              allIssues.length > 0 &&
              visibleIssues.length === 0 && (
                  <MapNotice role="status">
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
                  </MapNotice>
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