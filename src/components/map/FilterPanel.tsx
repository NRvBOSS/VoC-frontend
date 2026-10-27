import type { ReactNode } from "react";
import { CATEGORIES, STATUSES, STATUS_ORDER } from "@/lib/constants";
import Button from "@/components/ui/Button";
import type { Filters } from "@/types/issue";

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((x) => x !== value)
    : [...list, value];
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
  onClose: () => void;
  resultCount: number | null;
  children?: ReactNode;
}

export default function FilterPanel({
  filters,
  onChange,
  onReset,
  onClose,
  resultCount,
  children,
}: FilterPanelProps) {
  const hasActiveFilters =
    filters.categories.length > 0 || filters.statuses.length > 0;

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-4">
        <h2 className="text-base font-semibold text-slate-900">Filtrlər</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Filtrləri bağla"
          className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 xl:hidden"
        >
          <span aria-hidden className="text-2xl leading-none">
            ×
          </span>
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">
            Kateqoriya
          </legend>
          <p className="mt-1 text-xs text-slate-600">
            Heç biri seçilməyibsə, hamısı göstərilir.
          </p>
          <div className="mt-2 space-y-1">
            {CATEGORIES.map((c) => (
              <label
                key={c.id}
                className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-600"
                  checked={filters.categories.includes(c.id)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      categories: toggle(filters.categories, c.id),
                    })
                  }
                />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">
            Status
          </legend>
          <div className="mt-2 space-y-1">
            {STATUS_ORDER.map((id) => (
              <label
                key={id}
                className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-600"
                  checked={filters.statuses.includes(id)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      statuses: toggle(filters.statuses, id),
                    })
                  }
                />
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 rounded-full ${STATUSES[id].dot}`}
                />
                {STATUSES[id].label}
              </label>
            ))}
          </div>
        </fieldset>

        <section
          aria-labelledby="issue-list-heading"
          className="border-t border-slate-200 pt-4"
        >
          <h3
            id="issue-list-heading"
            className="text-sm font-semibold text-slate-900"
          >
            Problemlər
          </h3>
          {resultCount !== null && (
              <p aria-live="polite" className="mb-3 mt-1 text-xs text-slate-600">
                {resultCount} problem göstərilir
              </p>
          )}
          {children}
        </section>
      </div>

      <div className="shrink-0 border-t border-slate-200 p-4">
        <Button
          variant="secondary"
          className="w-full"
          onClick={onReset}
          disabled={!hasActiveFilters}
        >
          Təmizlə
        </Button>
      </div>
    </div>
  );
}
