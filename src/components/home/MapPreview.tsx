import StatusBadge from "@/components/ui/StatusBadge";
import { STATUSES, STATUS_ORDER } from "@/lib/constants";
import type { StatusId } from "@/types/issue";

const GLYPHS: Record<StatusId, string> = {
    open: "!",
    in_progress: "…",
    resolved: "✓",
};

const PINS: { x: number; y: number; status: StatusId; selected?: boolean }[] = [
    { x: 110, y: 95, status: "open" },
    { x: 250, y: 140, status: "open", selected: true },
    { x: 355, y: 80, status: "resolved" },
    { x: 165, y: 230, status: "in_progress" },
    { x: 60, y: 285, status: "resolved" },
];

export default function MapPreview() {
    return (
        <figure>
            <div
                role="img"
                aria-label="Xəritədə problem nişanlarının və problem kartının nümunə görüntüsü"
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-200"
            >
                <svg
                    viewBox="0 0 480 360"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                    focusable="false"
                    className="absolute inset-0 h-full w-full"
                >
                    {/* Torpaq */}
                    <rect width="480" height="360" fill="#E2E8F0" />

                    {/* Park */}
                    <rect x="262" y="178" width="92" height="64" rx="10" fill="#DCFCE7" />

                    {/* Yollar */}
                    <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
                        <path d="M0 62H480" strokeWidth="14" />
                        <path d="M0 176H480" strokeWidth="10" />
                        <path d="M0 262H330" strokeWidth="8" />
                        <path d="M78 0V360" strokeWidth="12" />
                        <path d="M200 0V360" strokeWidth="8" />
                        <path d="M318 0V300" strokeWidth="12" />
                        <path d="M0 330L190 262" strokeWidth="6" />
                        <path d="M410 0V120" strokeWidth="6" />
                    </g>

                    {/* Dəniz */}
                    <path
                        d="M290 360C330 296 410 288 480 214V360Z"
                        fill="#BFDBFE"
                    />

                    {/* Pinlər */}
                    {PINS.map((p) => (
                        <g key={`${p.x}-${p.y}`}>
                            {p.selected && (
                                <circle cx={p.x} cy={p.y} r="22" fill="none" stroke="#0F172A" strokeWidth="3" />
                            )}
                            <circle
                                cx={p.x}
                                cy={p.y}
                                r="15"
                                fill={STATUSES[p.status].markerColor}
                                stroke="#FFFFFF"
                                strokeWidth="3"
                            />
                            <text
                                x={p.x}
                                y={p.y + 5}
                                textAnchor="middle"
                                fontSize="15"
                                fontWeight="700"
                                fill="#FFFFFF"
                                fontFamily="system-ui, sans-serif"
                            >
                                {GLYPHS[p.status]}
                            </text>
                        </g>
                    ))}
                </svg>

                <p className="absolute left-3 top-3 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800">
                    Nümunə görüntü
                </p>

                <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-slate-200 bg-white p-3 sm:right-auto sm:w-64">
                    <p className="text-xs text-slate-600">Küçə lampalarının nasazlığı</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">
                        Küçə lampası işləmir
                    </p>
                    <div className="mt-2">
                        <StatusBadge status="open" />
                    </div>
                </div>
            </div>

            <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                {STATUS_ORDER.map((id) => (
                    <span key={id} className="inline-flex items-center gap-1.5">
            <span
                aria-hidden
                className={`h-2.5 w-2.5 rounded-full ${STATUSES[id].dot}`}
            />
                        {STATUSES[id].label}
          </span>
                ))}
            </figcaption>
        </figure>
    );
}