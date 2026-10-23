"use client";

import { useState } from "react";
import Button from "../ui/Button";
import FilterPanel from "./FilterPanel";
import IssueDetailPanel from "./IssueDetailPanel";

export default function MapDashboard() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="relative flex h-full overflow-hidden">
      {/* Mobil/planşet: drawer açıq olanda arxa fon */}
      {filtersOpen && (
        <button
          type="button"
          aria-label="Filtrləri bağla"
          onClick={() => setFiltersOpen(false)}
          className="absolute inset-0 z-10 bg-slate-900/30 xl:hidden"
        />
      )}

      {/* Sol: filtr paneli. <1280px drawer, ≥1280px sabit sütun */}
      <aside
        aria-label="Filtrlər"
        className={`absolute inset-y-0 left-0 z-20 w-72 max-w-[85%] border-r border-slate-200 bg-white transition-transform xl:static xl:z-auto xl:max-w-none xl:shrink-0 xl:visible xl:translate-x-0 ${
          filtersOpen ? "translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <FilterPanel onClose={() => setFiltersOpen(false)} />
      </aside>

      {/* Mərkəz: xəritə sahəsi. "isolate" Leaflet-in z-index-lərinin panellərin
          üstünə çıxmasının qarşısını alır (Mərhələ 4 üçün hazırlıq) */}
      <section
        aria-label="Xəritə"
        className="relative isolate min-w-0 flex-1 bg-slate-200"
      >
        <div className="absolute left-3 top-3 z-10 xl:hidden">
          <Button variant="secondary" onClick={() => setFiltersOpen(true)}>
            Filtrlər
          </Button>
        </div>

        <div className="grid h-full place-items-center p-6 text-center">
          <div className="space-y-3">
            <p className="text-sm text-slate-600">
              Xəritə Mərhələ 4-də burada olacaq
            </p>
            {/* Müvəqqəti test düyməsi: Mərhələ 4-də marker kliki ilə əvəz olunur */}
            <Button onClick={() => setDetailOpen((v) => !v)}>
              Test: detal panelini aç/bağla
            </Button>
          </div>
        </div>
      </section>

      {/* Sağ: detal paneli. Mobil: bottom sheet, planşet: yan panel, ≥1280px: sütun */}
      {detailOpen && (
        <aside
          aria-label="Problemin təfərrüatları"
          className="absolute inset-x-0 bottom-0 z-20 max-h-[60%] overflow-y-auto rounded-t-2xl border-t border-slate-200 bg-white md:left-auto md:top-0 md:max-h-none md:w-96 md:rounded-none md:border-l md:border-t-0 xl:static xl:w-[400px] xl:shrink-0"
        >
          <IssueDetailPanel onClose={() => setDetailOpen(false)} />
        </aside>
      )}
    </div>
  );
}