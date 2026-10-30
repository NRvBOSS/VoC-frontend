import type { ReactNode } from "react";

interface MessagePageProps {
    code?: string;
    symbol?: string;
    title: string;
    text: string;
    children?: ReactNode;
}

export default function MessagePage({
                                        code,
                                        symbol = "?",
                                        title,
                                        text,
                                        children,
                                    }: MessagePageProps) {
    return (
        <main
            id="main"
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-20"
        >
            <div
                aria-hidden
                className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
            />

            <div className="relative mx-auto max-w-md text-center">
                {/* "İtmiş pin": nöqtəli kontur */}
                <svg aria-hidden viewBox="0 0 64 64" className="mx-auto h-24 w-24">
                    <path
                        d="M32 61C32 61 9 43 9 26a23 23 0 0 1 46 0c0 17-23 35-23 35Z"
                        fill="#EFF6FF"
                        stroke="#2563EB"
                        strokeWidth={2.5}
                        strokeDasharray="5 4"
                        strokeLinecap="round"
                    />
                    <text
                        x="32"
                        y="35"
                        textAnchor="middle"
                        fontSize="24"
                        fontWeight="700"
                        fill="#2563EB"
                        style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                    >
                        {symbol}
                    </text>
                </svg>

                {code && (
                    <p className="mt-6 font-display text-sm font-bold tracking-wide text-blue-700">
                        {code}
                    </p>
                )}
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{text}</p>
                {children && (
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {children}
                    </div>
                )}
            </div>
        </main>
    );
}