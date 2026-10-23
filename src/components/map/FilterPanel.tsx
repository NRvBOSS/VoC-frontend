import { CATEGORIES, STATUSES, STATUS_ORDER } from "../../lib/constants";
import Button from "../ui/Button";

export default function FilterPanel({ onClose }: { onClose: () => void }) {
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
          <div className="mt-3 space-y-2">
            {CATEGORIES.map((c) => (
              <label
                key={c.id}
                className="flex items-center gap-3 text-sm text-slate-700"
              >
                <input type="checkbox" className="h-4 w-4 accent-blue-600" />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">
            Status
          </legend>
          <div className="mt-3 space-y-2">
            {STATUS_ORDER.map((id) => (
              <label
                key={id}
                className="flex items-center gap-3 text-sm text-slate-700"
              >
                <input type="checkbox" className="h-4 w-4 accent-blue-600" />
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 rounded-full ${STATUSES[id].dot}`}
                />
                {STATUSES[id].label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="shrink-0 border-t border-slate-200 p-4">
        <Button variant="secondary" className="w-full">
          Təmizlə
        </Button>
      </div>
    </div>
  );
}
