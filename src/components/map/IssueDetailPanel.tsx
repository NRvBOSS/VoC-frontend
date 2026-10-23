import StatusBadge from "../ui/StatusBadge";

export default function IssueDetailPanel({ onClose }: { onClose: () => void }) {
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
          <span aria-hidden className="text-2xl leading-none">×</span>
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        <StatusBadge status="open" />
        <p className="text-sm text-slate-600">
          Placeholder: real problem məlumatı Mərhələ 4-dən sonra burada
          görünəcək.
        </p>
      </div>
    </div>
  );
}