import { STATUSES, STATUS_ORDER } from "@/lib/constants";

export default function MapLegend() {
    return (
        <div
            role="group"
            aria-label="Xəritədəki nişanların izahı"
            className="absolute bottom-3 left-3 z-[1000] rounded-lg border border-slate-200 bg-white p-2.5"
        >
            <p className="text-xs font-semibold text-slate-900">Status</p>
            <ul className="mt-1.5 space-y-1">
                {STATUS_ORDER.map((id) => (
                    <li
                        key={id}
                        className="flex items-center gap-2 text-xs text-slate-700"
                    >
            <span
                aria-hidden
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-white text-[11px] font-bold leading-none text-white ring-1 ring-slate-900/30"
                style={{ backgroundColor: STATUSES[id].markerColor }}
            >
              {STATUSES[id].glyph}
            </span>
                        {STATUSES[id].label}
                    </li>
                ))}
            </ul>
        </div>
    );
}