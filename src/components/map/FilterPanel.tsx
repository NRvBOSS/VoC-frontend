import type { ReactNode } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import Button from "@/components/ui/Button";
import CategoryIcon from "@/components/ui/CategoryIcon";
import { CATEGORIES, STATUSES, STATUS_ORDER } from "@/lib/constants";
import { ON_MARKER } from "@/lib/marker-colors";
import type { CategoryId, Filters, StatusId } from "@/types/issue";

export interface FilterCounts {
    categories: Partial<Record<CategoryId, number>>;
    statuses: Partial<Record<StatusId, number>>;
}

function toggle<T>(list: T[], value: T): T[] {
    return list.includes(value)
        ? list.filter((x) => x !== value)
        : [...list, value];
}

function ToggleRow({
                       checked,
                       onChange,
                       count,
                       children,
                   }: {
    checked: boolean;
    onChange: () => void;
    count: number | null;
    children: ReactNode;
}) {
    return (
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 transition-colors hover:border-slate-300 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue-600">
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={onChange}
            />
            <span
                aria-hidden
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                    checked
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white"
                }`}
            >
        {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
            {children}
            {count !== null && (
                <span className="ml-auto text-xs tabular-nums text-slate-600">
          <span aria-hidden>{count}</span>
          <span className="sr-only">, {count} problem</span>
        </span>
            )}
        </label>
    );
}

function Group({
                   title,
                   hint,
                   children,
               }: {
    title: string;
    hint?: string;
    children: ReactNode;
}) {
    return (
        <details open className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-md py-1 text-sm font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                {title}
                <ChevronDown
                    aria-hidden
                    className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180"
                />
            </summary>
            {hint && <p className="mt-1 text-xs text-slate-600">{hint}</p>}
            <div role="group" aria-label={title} className="mt-2 space-y-2">
                {children}
            </div>
        </details>
    );
}

interface FilterPanelProps {
    filters: Filters;
    query: string;
    counts: FilterCounts | null;
    onChange: (next: Filters) => void;
    onQueryChange: (next: string) => void;
    onReset: () => void;
    onClose: () => void;
    resultCount: number | null;
    children?: ReactNode;
}

export default function FilterPanel({
                                        filters,
                                        query,
                                        counts,
                                        onChange,
                                        onQueryChange,
                                        onReset,
                                        onClose,
                                        resultCount,
                                        children,
                                    }: FilterPanelProps) {
    const hasActive =
        filters.categories.length > 0 ||
        filters.statuses.length > 0 ||
        query.trim() !== "";

    return (
        <div className="flex h-full flex-col">
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 px-4 py-4">
                <div>
                    <h2 className="font-display text-xl font-bold leading-tight text-slate-900">
                        Problemlər
                    </h2>
                    {resultCount !== null && (
                        <p aria-live="polite" className="mt-0.5 text-xs text-slate-600">
                            {resultCount} problem göstərilir
                        </p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Filtrləri bağla"
                    className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 xl:hidden"
                >
                    <X aria-hidden className="h-5 w-5" />
                </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-4">
                <div className="relative">
                    <Search
                        aria-hidden
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                    />
                    <input
                        type="search"
                        value={query}
                        maxLength={100}
                        onChange={(e) => onQueryChange(e.target.value)}
                        placeholder="Başlıq və ya təsvirdə axtar"
                        aria-label="Problemlərdə axtar"
                        className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    />
                </div>

                <Group
                    title="Kateqoriya"
                    hint="Heç biri seçilməyibsə, hamısı göstərilir."
                >
                    {CATEGORIES.map((c) => (
                        <ToggleRow
                            key={c.id}
                            checked={filters.categories.includes(c.id)}
                            onChange={() =>
                                onChange({
                                    ...filters,
                                    categories: toggle(filters.categories, c.id),
                                })
                            }
                            count={counts ? (counts.categories[c.id] ?? 0) : null}
                        >
                            <CategoryIcon id={c.id} className="h-4 w-4 shrink-0 text-slate-600" />
                            {c.label}
                        </ToggleRow>
                    ))}
                </Group>

                <Group title="Status">
                    {STATUS_ORDER.map((id) => (
                        <ToggleRow
                            key={id}
                            checked={filters.statuses.includes(id)}
                            onChange={() =>
                                onChange({
                                    ...filters,
                                    statuses: toggle(filters.statuses, id),
                                })
                            }
                            count={counts ? (counts.statuses[id] ?? 0) : null}
                        >
              <span
                  aria-hidden
                  className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold leading-none"
                  style={{
                      backgroundColor: STATUSES[id].markerColor,
                      color: ON_MARKER[id],
                  }}
              >
                {STATUSES[id].glyph}
              </span>
                            {STATUSES[id].label}
                        </ToggleRow>
                    ))}
                </Group>

                <section
                    aria-label="Problemlərin siyahısı"
                    className="border-t border-slate-200 pt-5"
                >
                    {children}
                </section>
            </div>

            <div className="shrink-0 border-t border-slate-200 p-4">
                <Button
                    variant="secondary"
                    className="w-full"
                    onClick={onReset}
                    disabled={!hasActive}
                >
                    Təmizlə
                </Button>
            </div>
        </div>
    );
}