import { STATUSES } from "../../lib/constants";
import type { StatusId } from "../../types/issues";

export default function StatusBadge({ status }: { status: StatusId }) {
  const s = STATUSES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.badge}`}
    >
      <span aria-hidden className={`h-2 w-2 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
