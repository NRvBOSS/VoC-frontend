import StatusBadge from "@/components/ui/StatusBadge";
import { CATEGORIES } from "@/lib/constants";
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
              type="button"
              onClick={() => onSelect(issue.id)}
              aria-current={selected ? "true" : undefined}
              className={`w-full rounded-lg border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                selected
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <span className="block text-sm font-semibold text-slate-900">
                {issue.title}
              </span>
              <span className="mt-0.5 block text-xs text-slate-600">
                {category?.label}
              </span>
              <span className="mt-2 block">
                <StatusBadge status={issue.status} />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
