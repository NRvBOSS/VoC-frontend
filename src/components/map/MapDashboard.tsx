"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import Button, { buttonStyles } from "@/components/ui/Button";
import IssueList from "@/components/issues/IssueList";
import { getIssues } from "@/lib/api";
import { EMPTY_FILTERS } from "@/lib/constants";
import type { Filters, Issue } from "@/types/issue";
import FilterPanel, { type FilterCounts } from "./FilterPanel";
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

function normalize(text: string): string {
    return text.trim().toLocaleLowerCase("az");
}

// Boş siyahı = həmin üzrə süzgəc yoxdur (hamısı göstərilir)
function filterIssues(
    issues: Issue[],
    filters: Filters,
    query: string
): Issue[] {
    const q = normalize(query);
    return issues.filter(
        (i) =>
            (filters.categories.length === 0 ||
                filters.categories.includes(i.category)) &&
            (filters.statuses.length === 0 || filters.statuses.includes(i.status)) &&
            (q === "" || normalize(`${i.title} ${i.description}`).includes(q))
    );
}

function countBy<K extends string>(
    issues: Issue[],
    key: (issue: Issue) => K
): Partial<Record<K, number>> {
    const result: Partial<Record<K, number>> = {};
    for (const issue of issues) {
        const k = key(issue);
        result[k] = (result[k] ?? 0) + 1;
    }
    return result;
}

// Ünvan çubuğunu yeniləyir (səhifə yenilənmir, geri tarixçəsi dolmur)
function syncUrl(id: string | null) {
    const url = id
        ? `?issue=${encodeURIComponent(id)}`
        : window.location.pathname;
    window.history.replaceState(null, "", url);
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
            className="absolute left-1/2 top-16 z-[1000] w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-card xl:top-6"
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
    const [query, setQuery] = useState("");
    const [missingLink, setMissingLink] = useState(false);

    useEffect(() => {
        let cancelled = false;

        getIssues().then((result) => {
            if (cancelled) return;

            if (!result.ok) {
                setState({ status: "error", message: result.message });
                return;
            }

            setState({ status: "ready", issues: result.issues });

            // Paylaşılmış link: /map?issue=5
            const linked = new URLSearchParams(window.location.search).get("issue");
            if (linked) {
                if (result.issues.some((i) => i.id === linked)) {
                    setSelectedId(linked);
                } else {
                    setMissingLink(true);
                    syncUrl(null);
                }
            }
        });

        return () => {
            cancelled = true;
        };
    }, [attempt]);

    function retry() {
        setState({ status: "loading" });
        setAttempt((n) => n + 1);
    }

    function selectIssue(id: string | null) {
        setSelectedId(id);
        syncUrl(id);
        if (id) setMissingLink(false);
    }

    const allIssues = state.status === "ready" ? state.issues : NO_ISSUES;
    const visibleIssues = filterIssues(allIssues, filters, query);
    const selectedIssue = visibleIssues.find((i) => i.id === selectedId) ?? null;

    // Kateqoriya sayları seçilmiş statusları, status sayları isə seçilmiş
    // kateqoriyaları nəzərə alır (rəqəm "bunu seçsəm nə qədər görəcəm" deməkdir)
    const counts: FilterCounts | null =
        state.status === "ready"
            ? {
                categories: countBy(
                    filterIssues(
                        allIssues,
                        { categories: [], statuses: filters.statuses },
                        query
                    ),
                    (i) => i.category
                ),
                statuses: countBy(
                    filterIssues(
                        allIssues,
                        { categories: filters.categories, statuses: [] },
                        query
                    ),
                    (i) => i.status
                ),
            }
            : null;

    function applyFilters(nextFilters: Filters, nextQuery: string) {
        setFilters(nextFilters);
        setQuery(nextQuery);
        if (!selectedId) return;
        const stillVisible = filterIssues(allIssues, nextFilters, nextQuery).some(
            (i) => i.id === selectedId
        );
        if (!stillVisible) selectIssue(null);
    }

    function selectFromList(id: string) {
        selectIssue(id);
        setFiltersOpen(false);
    }

    const activeCount =
        filters.categories.length +
        filters.statuses.length +
        (query.trim() !== "" ? 1 : 0);

    return (
        <div className="relative flex h-full gap-3 overflow-hidden bg-paper sm:p-3 xl:p-4">
            <h1 className="sr-only">Problemlər xəritəsi</h1>

            {filtersOpen && (
                <button
                    type="button"
                    aria-label="Filtrləri bağla"
                    onClick={() => setFiltersOpen(false)}
                    className="absolute inset-0 z-20 bg-slate-900/40 xl:hidden"
                />
            )}

            <aside
                aria-label="Filtrlər və siyahı"
                className={`absolute inset-y-0 left-0 z-30 w-80 max-w-[88%] rounded-r-2xl border-r border-slate-200 bg-white shadow-card transition-transform xl:visible xl:static xl:z-auto xl:w-[22rem] xl:max-w-none xl:shrink-0 xl:translate-x-0 xl:rounded-2xl xl:border ${
                    filtersOpen ? "translate-x-0" : "invisible -translate-x-full"
                }`}
            >
                <FilterPanel
                    filters={filters}
                    query={query}
                    counts={counts}
                    onChange={(next) => applyFilters(next, query)}
                    onQueryChange={(next) => applyFilters(filters, next)}
                    onReset={() => applyFilters(EMPTY_FILTERS, "")}
                    onClose={() => setFiltersOpen(false)}
                    resultCount={state.status === "ready" ? visibleIssues.length : null}
                >
                    {state.status === "loading" && (
                        <ul aria-hidden className="space-y-2">
                            {[0, 1, 2].map((i) => (
                                <li
                                    key={i}
                                    className="h-[88px] animate-pulse rounded-xl border border-slate-200 bg-slate-100"
                                />
                            ))}
                        </ul>
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
                className={`relative isolate min-w-0 flex-1 overflow-hidden bg-slate-200 sm:rounded-2xl sm:border sm:border-slate-200 ${
                    selectedIssue ? "map-detail-open" : ""
                }`}
            >
                <IssueMap
                    issues={visibleIssues}
                    selectedId={selectedIssue?.id ?? null}
                    onSelect={selectIssue}
                />

                <MapLegend />

                <div className="absolute left-3 top-3 z-[1000] xl:hidden">
                    <Button
                        variant="secondary"
                        className="shadow-card"
                        onClick={() => setFiltersOpen(true)}
                    >
                        <SlidersHorizontal aria-hidden className="h-4 w-4" />
                        Filtrlər
                        {activeCount > 0 && (
                            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
                {activeCount}
                                <span className="sr-only"> aktiv süzgəc</span>
              </span>
                        )}
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
                                onClick={() => applyFilters(EMPTY_FILTERS, "")}
                            >
                                Süzgəcləri təmizlə
                            </Button>
                        </MapNotice>
                    )}

                {state.status === "ready" &&
                    missingLink &&
                    visibleIssues.length > 0 && (
                        <MapNotice role="status">
                            <p className="text-sm font-medium text-slate-900">
                                Linkdəki problem tapılmadı
                            </p>
                            <p className="mt-1 text-xs text-slate-600">
                                Silinmiş ola bilər və ya link yanlışdır.
                            </p>
                            <Button
                                variant="secondary"
                                className="mt-3"
                                onClick={() => setMissingLink(false)}
                            >
                                Bağla
                            </Button>
                        </MapNotice>
                    )}
            </section>

            {selectedIssue && (
                <aside
                    aria-label="Problemin təfərrüatları"
                    className="absolute inset-x-0 bottom-0 z-20 max-h-[65%] overflow-y-auto rounded-t-3xl border-t border-slate-200 bg-white shadow-card md:inset-x-auto md:bottom-6 md:right-6 md:top-6 md:max-h-none md:w-96 md:overflow-hidden md:rounded-2xl md:border xl:bottom-8 xl:right-8 xl:top-8"
                >
                    <IssueDetailPanel
                        key={selectedIssue.id}
                        issue={selectedIssue}
                        onClose={() => selectIssue(null)}
                    />
                </aside>
            )}
        </div>
    );
}