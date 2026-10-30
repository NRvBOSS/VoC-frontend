import { MapPin } from "lucide-react";
import CategoryIcon from "@/components/ui/CategoryIcon";
import StatusBadge from "@/components/ui/StatusBadge";
import { CATEGORIES } from "@/lib/constants";
import type { CategoryId } from "@/types/issue";

interface ReportPreviewProps {
    category: CategoryId | "";
    title: string;
    description: string;
    hasLocation: boolean;
}

export function ReportPreview({
                                  category,
                                  title,
                                  description,
                                  hasLocation,
                              }: ReportPreviewProps) {
    const cat = CATEGORIES.find((c) => c.id === category);
    const titleText = title.trim();
    const descText = description.trim();

    return (
        <section aria-hidden="true">
            <h2 className="text-sm font-semibold text-slate-900">Önizləmə</h2>
            <p className="mt-1 text-xs text-slate-600">
                Bildiriş xəritədə belə görünəcək.
            </p>

            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    {cat ? (
                        <CategoryIcon id={cat.id} className="h-4 w-4" />
                    ) : (
                        <span className="h-4 w-4 rounded-full border border-dashed border-slate-400" />
                    )}
                    {cat ? cat.label : "Kateqoriya seçilməyib"}
                </p>

                <h3
                    className={`mt-2 break-words font-display text-xl font-semibold leading-snug ${
                        titleText ? "text-slate-900" : "text-slate-500"
                    }`}
                >
                    {titleText || "Başlıq burada görünəcək"}
                </h3>

                <p
                    className={`mt-2 line-clamp-3 break-words text-sm leading-relaxed ${
                        descText ? "text-slate-700" : "text-slate-500"
                    }`}
                >
                    {descText || "Təsvir burada görünəcək."}
                </p>

                <div className="mt-4 flex items-center justify-between gap-2">
                    <StatusBadge status="open" />
                    <span className="flex items-center gap-1 text-xs text-slate-600">
            <MapPin className="h-3.5 w-3.5" />
                        {hasLocation ? "Yer seçilib" : "Yer seçilməyib"}
          </span>
                </div>
            </div>

            <p className="mt-2 text-xs text-slate-600">
                Yeni bildirişlər “Açıq” statusu ilə yaranır.
            </p>
        </section>
    );
}

const TIPS = [
    "Əvvəlcə xəritədə eyni problemin artıq bildirilib-bildirilmədiyinə baxın.",
    "Başlığı qısa və konkret yazın, məsələn: “Nizami küçəsində açıq lyuk”.",
    "Təsvirdə problemin nə vaxtdan olduğunu və nəyə görə təhlükəli olduğunu qeyd edin.",
    "Yeri xəritədə mümkün qədər dəqiq seçin.",
];

export function ReportTips() {
    return (
        <section
            aria-labelledby="tips-heading"
            className="rounded-2xl border border-slate-200 bg-white p-5"
        >
            <h2 id="tips-heading" className="text-sm font-semibold text-slate-900">
                Yaxşı bildiriş üçün
            </h2>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                {TIPS.map((tip) => (
                    <li key={tip} className="flex gap-2">
            <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
            />
                        {tip}
                    </li>
                ))}
            </ul>
        </section>
    );
}