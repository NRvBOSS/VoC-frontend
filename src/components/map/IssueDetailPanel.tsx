import StatusBadge from "../ui/StatusBadge";
import { CATEGORIES } from "../../lib/constants";
import type { Issue } from "../../types/issue";

const dateFormat = new Intl.DateTimeFormat("az", { dateStyle: "medium" });

interface IssueDetailPanelProps {
  issue: Issue;
  onClose: () => void;
}

export default function IssueDetailPanel({
  issue,
  onClose,
}: IssueDetailPanelProps) {
  const category = CATEGORIES.find((c) => c.id === issue.category);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-4">
        <h2 className="text-base font-semibold text-slate-900">
          Seçilmiş problem
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Detal panelini bağla"
          className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span aria-hidden className="text-2xl leading-none">
            ×
          </span>
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div>
          <p className="text-xs font-medium text-slate-600">
            {category?.label ?? "Kateqoriya yoxdur"}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {issue.title}
          </h3>
          <div className="mt-2">
            <StatusBadge status={issue.status} />
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-700">
          {issue.description}
        </p>

        <dl className="space-y-3 border-t border-slate-200 pt-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-600">Tarix</dt>
            <dd className="text-right text-slate-900">
              {dateFormat.format(new Date(issue.createdAt))}
            </dd>
          </div>
          {issue.address && (
            <div className="flex justify-between gap-4">
              <dt className="text-slate-600">Ünvan</dt>
              <dd className="text-right text-slate-900">{issue.address}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-slate-600">Koordinat</dt>
            <dd className="text-right text-slate-900">
              {issue.lat.toFixed(5)}, {issue.lng.toFixed(5)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
