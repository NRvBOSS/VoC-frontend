
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/constants";

const STEPS = [
  {
    title: "Problemi tapın",
    text: "Xəritədə ətrafınızdakı mövcud problemlərə baxın və təkrar bildirişin qarşısını alın.",
  },
  {
    title: "Məlumat əlavə edin",
    text: "Kateqoriyanı seçin, qısa təsvir yazın və problemin yerini göstərin.",
  },
  {
    title: "Statusu izləyin",
    text: "Problem xəritədə Açıq, İşlənilir və ya Həll olunub statusu ilə görünür.",
  },
];

type Issue = {
  id: number;
  title: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  status: string;
  created_at: string;
};

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch("http://localhost:8080/issues");

        if (!response.ok) {
          throw new Error("Problemləri əldə etmək mümkün olmadı.");
        }

        const data: Issue[] = await response.json();
        setIssues(data);
      } catch {
        setError(
            "Backend ilə əlaqə qurulmadı. Go serverinin işlədiyini yoxlayın."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchIssues();
  }, []);

  return (
      <>
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-screen-2xl items-center gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Şəhər problemlərini birlikdə həll edək
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                ŞəhərSəsi şəhərimizdəki problemləri qeyd etmək, onları xəritədə
                görmək və daha yaxşı bir şəhər üçün birlikdə addım atmaq
                platformasıdır.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/report" className={buttonStyles("primary")}>
                  Problemi bildir
                </Link>

                <Link href="/map" className={buttonStyles("secondary")}>
                  Xəritəyə bax
                </Link>
              </div>
            </div>

            <div
                aria-hidden
                className="hidden aspect-[4/3] rounded-2xl border border-blue-100 bg-blue-50 lg:block"
            >
              <div className="grid h-full place-items-center">
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-blue-600 text-4xl font-bold text-white">
                  Ş
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Backend-dən gələn məlumatlar */}
        <section className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Şəhər problemlərinin vəziyyəti
            </h2>

            {loading ? (
                <p className="mt-2 text-sm text-slate-600">
                  Məlumatlar yüklənir...
                </p>
            ) : error ? (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {error}
                </p>
            ) : (
                <p className="mt-2 text-sm text-slate-600">
                  Hazırda sistemdə{" "}
                  <span className="font-semibold text-blue-600">
                {issues.length}
              </span>{" "}
                  problem qeydə alınıb.
                </p>
            )}
          </div>
        </section>

        {/* Kateqoriyalar */}
        <section className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Hansı problemləri bildirə bilərsiniz?
          </h2>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((c) => (
                <li
                    key={c.id}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    {c.label}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {c.description}
                  </p>
                </li>
            ))}
          </ul>
        </section>

        {/* Necə işləyir */}
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Necə işləyir?
            </h2>

            <ol className="mt-6 grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-600 text-sm font-semibold text-white"
                >
                  {i + 1}
                </span>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{s.text}</p>
                    </div>
                  </li>
              ))}
            </ol>
          </div>
        </section>
      </>
  );
}
