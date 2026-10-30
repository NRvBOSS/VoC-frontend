"use client";

import { useEffect, useState } from "react";
import { Calendar, Check, Link2, MapPin, X } from "lucide-react";
import Button from "@/components/ui/Button";
import CategoryIcon from "@/components/ui/CategoryIcon";
import StatusBadge from "@/components/ui/StatusBadge";
import { CATEGORIES } from "@/lib/constants";
import type { Issue } from "@/types/issue";

const dateFormat = new Intl.DateTimeFormat("az", { dateStyle: "long" });

type CopyState = "idle" | "copied" | "failed";

interface IssueDetailPanelProps {
  issue: Issue;
  onClose: () => void;
}

export default function IssueDetailPanel({
                                           issue,
                                           onClose,
                                         }: IssueDetailPanelProps) {
  const category = CATEGORIES.find((c) => c.id === issue.category);
  const [copyState, setCopyState] = useState<CopyState>("idle");

  useEffect(() => {
    if (copyState === "idle") return;
    const timer = setTimeout(() => setCopyState("idle"), 3000);
    return () => clearTimeout(timer);
  }, [copyState]);

  async function copyLink() {
    const url = `${window.location.origin}/map?issue=${encodeURIComponent(issue.id)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
      <div className="flex flex-col md:h-full">
        <div className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 md:static">
          <h2 className="text-sm font-medium text-slate-600">Seçilmiş problem</h2>
          <button
              type="button"
              onClick={onClose}
              aria-label="Detal panelini bağla"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5 md:flex-1 md:overflow-y-auto">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <CategoryIcon id={issue.category} className="h-4 w-4" />
              {category?.label ?? "Kateqoriya yoxdur"}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-slate-900">
              {issue.title}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <StatusBadge status={issue.status} />
              <span className="flex items-center gap-1.5 text-sm text-slate-600">
              <Calendar aria-hidden className="h-4 w-4" />
                {dateFormat.format(new Date(issue.createdAt))}
            </span>
            </div>
          </div>

          <p className="text-base leading-relaxed text-slate-700">
            {issue.description}
          </p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <MapPin aria-hidden className="h-4 w-4 text-blue-700" />
              Yer
            </p>
            {issue.address && (
                <p className="mt-2 text-sm text-slate-700">{issue.address}</p>
            )}
            <p className="mt-1 text-sm tabular-nums text-slate-600">
              {issue.lat.toFixed(5)}, {issue.lng.toFixed(5)}
            </p>
          </div>

          <div>
            <Button variant="secondary" className="w-full" onClick={copyLink}>
              {copyState === "copied" ? (
                  <Check aria-hidden className="h-4 w-4 text-green-700" />
              ) : (
                  <Link2 aria-hidden className="h-4 w-4" />
              )}
              {copyState === "copied" ? "Link kopyalandı" : "Linki kopyala"}
            </Button>
            <p
                role="status"
                className="mt-2 min-h-5 text-center text-xs text-slate-600"
            >
              {copyState === "copied" && "Link mübadilə buferinə kopyalandı."}
              {copyState === "failed" &&
                  "Kopyalana bilmədi. Linki brauzerin ünvan çubuğundan götürün."}
            </p>
          </div>
        </div>
      </div>
  );
}