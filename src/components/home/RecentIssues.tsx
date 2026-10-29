"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategoryIcon from "@/components/ui/CategoryIcon";
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
        <ul aria-hidden className="mt-8 grid gap-5 md:grid-cols-3">
            {Array.from({ length: COUNT }, (_, i) => (
                <li
                    key={i}
                    className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
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
            className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:py-24"
        >
            <div className="flex flex-wrap items-end justify-between gap-3">
                <h2
                    id="recent-heading"
                    className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                >
                    Son bildirilən problemlər
                </h2>
                <Link
                    href="/map"
                    className="inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Hamısını xəritədə gör
                    <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
            </div>

            {state.status === "loading" ? (
                <Skeleton />
            ) : (
                <ul className="mt-8 grid gap-5 md:grid-cols-3">
                    {state.issues.map((issue) => {
                        const category = CATEGORIES.find((c) => c.id === issue.category);
                        return (
                            <li
                                key={issue.id}
                                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-slate-300"
                            >
                                <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
                                    <CategoryIcon id={issue.category} className="h-4 w-4" />
                                    {category?.label}
                                </p>
                                <h3 className="mt-3 line-clamp-2 font-display text-xl font-semibold leading-snug text-slate-900">
                                    {issue.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                                    {issue.description}
                                </p>
                                <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                                    <StatusBadge status={issue.status} />
                                    <span className="text-xs text-slate-600">
                    {dateFormat.format(new Date(issue.createdAt))}
                  </span>
                                </div>
                                <Link
                                    href={`/map?issue=${encodeURIComponent(issue.id)}`}
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Xəritədə bax
                                    <ArrowRight
                                        aria-hidden
                                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}