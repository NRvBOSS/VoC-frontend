import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReportForm from "@/components/report/ReportForm";

export const metadata = { title: "Problem bildir" };

export default function ReportPage() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
            <Link
                href="/map"
                className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                <ArrowLeft aria-hidden className="h-4 w-4" />
                Xəritəyə qayıt
            </Link>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Problem bildir
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
                Üç addım: nə baş verdiyini seçin, qısa yazın, yeri xəritədə göstərin.
                Qeydiyyat tələb olunmur.
            </p>
            <p className="mt-2 text-sm text-slate-600">
                Ulduzla (*) qeyd olunan sahələr məcburidir.
            </p>

            <div className="mt-10">
                <ReportForm />
            </div>
        </div>
    );
}