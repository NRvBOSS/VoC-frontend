"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import { getIssues } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import type { Issue } from "@/types/issue";

const COUNT = 3;
const dateFormat = new Intl.DateTimeFormat("az", { dateStyle: "medium" });

type State =
    | { status: "loading" }
    | { status: "hidden" }
    | { status: "ready"; issues: Issue[] };

function Skeleton() {
    return (
        <ul aria-hidden className="mt-6 grid gap-4 md:grid-cols-3">
            {Array.from({ length: COUNT }, (_, i) => (
                <li
                    key={i}
                    className="h-40 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
                />
            ))}
        </ul>
    );
}

export default function RecentIssues() {
    const [state, setState] = useState<State>({ status: "loading" });

    useEffect(() => {
        let cancelled = false;

        getIssues().then((result) => {
            if (cancelled) return;
            if (!result.ok || result.issues.length === 0) {
                setState({ status: "hidden" });
                return;
            }
            const latest = [...result.issues]
                .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                .slice(0, COUNT);
            setState({ status: "ready", issues: latest });
        });

        return () => {
            cancelled = true;
        };
    }, []);

    if (state.status === "hidden") return null;

    return (
        <section
            aria-labelledby="recent-heading"
            className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6"
        >
            <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 id="recent-heading" className="text-xl font-semibold text-slate-900">
                    Son bildirilən problemlər
                </h2>
                <Link
                    href="/map"
                    className="rounded-md text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Hamısını xəritədə gör
                </Link>
            </div>

            {state.status === "loading" ? (
                <Skeleton />
            ) : (
                <ul className="mt-6 grid gap-4 md:grid-cols-3">
                    {state.issues.map((issue) => {
                        const category = CATEGORIES.find((c) => c.id === issue.category);
                        return (
                            <li
                                key={issue.id}
                                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5"
                            >
                                <p className="text-xs font-medium text-slate-600">
                                    {category?.label}
                                </p>
                                <h3 className="mt-1 line-clamp-2 text-base font-semibold text-slate-900">
                                    {issue.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                                    {issue.description}
                                </p>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                                    <StatusBadge status={issue.status} />
                                    <span className="text-xs text-slate-600">
                    {dateFormat.format(new Date(issue.createdAt))}
                  </span>
                                </div>
                                <Link
                                    href={`/map?issue=${encodeURIComponent(issue.id)}`}
                                    className="mt-4 rounded-md text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Xəritədə bax
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}