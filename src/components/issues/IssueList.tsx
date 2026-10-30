"use client";

import { useEffect } from "react";
import CategoryIcon from "@/components/ui/CategoryIcon";
import StatusBadge from "@/components/ui/StatusBadge";
import { CATEGORIES, STATUSES } from "@/lib/constants";
import type { Issue } from "@/types/issue";

interface IssueListProps {
  issues: Issue[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function IssueList({
                                    issues,
                                    selectedId,
                                    onSelect,
                                  }: IssueListProps) {
  // Markerə klikləyəndə siyahıda həmin sətrə sürüş
  useEffect(() => {
    if (!selectedId) return;
    document
        .getElementById(`issue-row-${selectedId}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [selectedId]);

  if (issues.length === 0) {
    return (
        <p className="text-sm text-slate-600">
          Seçilmiş süzgəclərə uyğun problem tapılmadı.
        </p>
    );
  }

  return (
      <ul className="space-y-2">
        {issues.map((issue) => {
          const selected = issue.id === selectedId;
          const category = CATEGORIES.find((c) => c.id === issue.category);
          return (
              <li key={issue.id}>
                <button
                    id={`issue-row-${issue.id}`}
                    type="button"
                    onClick={() => onSelect(issue.id)}
                    aria-current={selected ? "true" : undefined}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                        selected
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                >
              <span
                  aria-hidden
                  className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${STATUSES[issue.status].badge}`}
              >
                <CategoryIcon id={issue.category} className="h-[18px] w-[18px]" />
              </span>
                  <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-900">
                  {issue.title}
                </span>
                <span className="mt-0.5 block text-xs text-slate-600">
                  {category?.label}
                </span>
                <span className="mt-2 block">
                  <StatusBadge status={issue.status} />
                </span>
              </span>
                </button>
              </li>
          );
        })}
      </ul>
  );
}