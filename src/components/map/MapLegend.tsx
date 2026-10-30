import { STATUSES, STATUS_ORDER } from "@/lib/constants";
import { ON_MARKER } from "@/lib/marker-colors";

export default function MapLegend() {
    return (
        <div
            role="group"
            aria-label="Xəritədəki nişanların izahı"
            className="map-legend absolute bottom-8 left-3 z-[1000] flex max-w-[calc(100%-5rem)] flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-card"
        >
            {STATUS_ORDER.map((id) => (
                <span
                    key={id}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-700"
                >
          <span
              aria-hidden
              className="grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold leading-none"
              style={{
                  backgroundColor: STATUSES[id].markerColor,
                  color: ON_MARKER[id],
              }}
          >
            {STATUSES[id].glyph}
          </span>
                    {STATUSES[id].label}
        </span>
            ))}
        </div>
    );
}