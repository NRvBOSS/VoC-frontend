import Link from "next/link";
import ReportForm from "@/components/report/ReportForm";

export const metadata = { title: "Problem bildir" };

const TIPS = [
    "Əvvəlcə xəritədə eyni problemin artıq bildirilib-bildirilmədiyinə baxın.",
    "Başlığı qısa və konkret yazın, məsələn: “Nizami küçəsində açıq lyuk”.",
    "Təsvirdə problemin nə vaxtdan olduğunu və nəyə görə təhlükəli olduğunu qeyd edin.",
    "Yeri xəritədə mümkün qədər dəqiq seçin.",
    "Şəxsi məlumat (telefon, ad, ev ünvanı) yazmayın.",
];

export default function ReportPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
            <Link
                href="/map"
                className="rounded-md text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                ← Xəritəyə qayıt
            </Link>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Problem bildir
            </h1>
            <p className="mt-2 text-sm text-slate-600">
                Sahələr ulduzla (*) qeyd olunub, doldurulması məcburidir.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
                    <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm leading-relaxed text-blue-900">
                        <p className="font-semibold">Yazdığınız məlumat hamıya görünür</p>
                        <p className="mt-1">
                            Başlıq, təsvir və seçdiyiniz yer xəritədə hər kəsə göstərilir.
                            Telefon nömrəsi, ad və ya ev ünvanı kimi şəxsi məlumat
                            yazmayın.
                        </p>
                    </div>
                    <ReportForm />
                </div>

                <aside
                    aria-labelledby="tips-heading"
                    className="rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-6"
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
                </aside>
            </div>
        </div>
    );
}