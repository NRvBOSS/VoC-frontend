import { Lightbulb } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { STATUSES } from "@/lib/constants";
import type { StatusId } from "@/types/issue";

const ROADS = [
    { d: "M-10 335 C 120 305 220 205 330 165 S 500 95 570 62", w: 16 },
    { d: "M150 -10 C 165 120 148 270 192 450", w: 12 },
    { d: "M-10 118 C 120 132 260 104 570 192", w: 10 },
    { d: "M405 -10 C 398 100 425 205 478 262", w: 10 },
    { d: "M-10 402 C 120 396 240 420 360 408", w: 8 },
    { d: "M262 450 C 255 340 300 262 330 168", w: 7 },
    { d: "M40 -10 C 55 60 40 100 58 130", w: 6 },
    { d: "M470 330 C 430 350 400 380 392 450", w: 7 },
];

const BLOCKS: [number, number, number, number][] = [
    [22, 24, 84, 70],
    [188, 30, 70, 58],
    [250, 44, 60, 46],
    [330, 26, 52, 60],
    [436, 34, 80, 56],
    [36, 150, 70, 60],
    [96, 214, 48, 58],
    [206, 150, 64, 50],
    [226, 214, 60, 60],
    [360, 210, 58, 58],
    [30, 270, 70, 56],
    [210, 296, 70, 62],
    [300, 300, 60, 60],
    [60, 420, 70, 20],
];

const PINS: {
    x: number;
    y: number;
    status: StatusId;
    delay: number;
    pulse?: boolean;
}[] = [
    { x: 150, y: 196, status: "open", delay: 0.2, pulse: true },
    { x: 330, y: 160, status: "open", delay: 0.5, pulse: true },
    { x: 452, y: 246, status: "resolved", delay: 0.8 },
    { x: 214, y: 338, status: "in_progress", delay: 1.1 },
    { x: 84, y: 280, status: "resolved", delay: 1.4 },
    { x: 372, y: 336, status: "open", delay: 1.7 },
];

const PIN_PATH =
    "M0 0 C -10 -12 -14 -18 -14 -24 a14 14 0 1 1 28 0 c0 6 -4 12 -14 24 Z";

export default function HeroMap() {
    return (
        <div aria-hidden className="relative pb-8">
            <div className="relative aspect-[560/440] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-card">
                <svg
                    viewBox="0 0 560 440"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    className="absolute inset-0 h-full w-full"
                >
                    <rect width="560" height="440" fill="#EFECE4" />
                    <path
                        d="M346 52 C 380 40 420 60 424 100 C 428 140 396 150 360 144 C 330 138 322 70 346 52 Z"
                        fill="#D8E6C8"
                    />
                    {BLOCKS.map(([x, y, w, h]) => (
                        <rect
                            key={`${x}-${y}`}
                            x={x}
                            y={y}
                            width={w}
                            height={h}
                            rx={6}
                            fill="#E6E1D4"
                        />
                    ))}
                    {ROADS.map((r) => (
                        <path
                            key={`c-${r.d}`}
                            d={r.d}
                            fill="none"
                            stroke="#DAD5C7"
                            strokeWidth={r.w + 3}
                            strokeLinecap="round"
                        />
                    ))}
                    {ROADS.map((r) => (
                        <path
                            key={`f-${r.d}`}
                            d={r.d}
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth={r.w}
                            strokeLinecap="round"
                        />
                    ))}

                    {/* Su: yollardan sonra çəkilir ki, yollar sahildə bitsin */}
                    <path
                        d="M570 262 C 520 268 490 318 430 346 C 380 370 346 410 352 450 L570 450 Z"
                        fill="#C9DDF2"
                    />
                    <path
                        d="M570 262 C 520 268 490 318 430 346 C 380 370 346 410 352 450"
                        fill="none"
                        stroke="#B3CDE8"
                        strokeWidth={3}
                    />

                    {PINS.map((p) => {
                        const color = STATUSES[p.status].markerColor;
                        return (
                            <g key={`${p.x}-${p.y}`} transform={`translate(${p.x} ${p.y})`}>
                                <ellipse rx={12} ry={5} fill={color} opacity={0.28} />
                                {p.pulse && (
                                    <ellipse
                                        className="signal-ring"
                                        rx={12}
                                        ry={5}
                                        fill={color}
                                        style={{ animationDelay: `${p.delay + 0.6}s` }}
                                    />
                                )}
                                <g
                                    className="pin-drop"
                                    style={{ animationDelay: `${p.delay}s` }}
                                >
                                    <path
                                        d={PIN_PATH}
                                        fill={color}
                                        stroke="#fff"
                                        strokeWidth={2.5}
                                        strokeLinejoin="round"
                                    />
                                    <text
                                        x={0}
                                        y={-19}
                                        textAnchor="middle"
                                        fontSize={15}
                                        fontWeight={700}
                                        fill="#fff"
                                        fontFamily="system-ui, sans-serif"
                                    >
                                        {STATUSES[p.status].glyph}
                                    </text>
                                </g>
                            </g>
                        );
                    })}
                </svg>

                <p className="absolute left-3 top-3 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800">
                    Nümunə görüntü
                </p>
            </div>

            <div className="absolute bottom-0 left-3 w-64 -rotate-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:left-6 sm:w-72">
                <p className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <Lightbulb className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Küçə lampalarının nasazlığı
                </p>
                <p className="mt-1.5 font-display text-base font-semibold leading-snug text-slate-900">
                    Dayanacaq yanında lampa işləmir
                </p>
                <div className="mt-3">
                    <StatusBadge status="open" />
                </div>
            </div>

            <div className="absolute right-2 top-14 rotate-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-card sm:-right-3">
                <StatusBadge status="resolved" />
            </div>
        </div>
    );
}