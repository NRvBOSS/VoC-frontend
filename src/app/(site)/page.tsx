import Link from "next/link";
import type { ReactNode } from "react";
import MapPreview from "@/components/home/MapPreview";
import { buttonStyles } from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/constants";

function Icon({ children }: { children: ReactNode }) {
  return (
      <span
          aria-hidden
          className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700"
      >
      <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  );
}

const BENEFITS: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Bütün problemlər bir xəritədə",
    text: "Bildirilmiş problemlər xəritədə yerləri ilə görünür. Kateqoriya və statusa görə süzgəcdən keçirə bilərsiniz.",
    icon: (
        <>
          <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
          <path d="M9 4v14M15 6v14" />
        </>
    ),
  },
  {
    title: "Təkrar bildirişin qarşısını alın",
    text: "Yazmazdan əvvəl xəritəyə baxın: eyni yerdə problem artıq bildirilibsə, təkrar yazmağa ehtiyac qalmır.",
    icon: (
        <>
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </>
    ),
  },
  {
    title: "Yeri dəqiq göstərin",
    text: "Ünvanı sözlə izah etmək əvəzinə problemin yerini xəritədə nöqtə ilə seçirsiniz.",
    icon: (
        <>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
    ),
  },
  {
    title: "Vəziyyəti izləyin",
    text: "Hər bildirişin statusu (Açıq, İşlənilir, Həll olunub) həm mətn, həm də rənglə göstərilir.",
    icon: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
    ),
  },
];

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

const AUDIENCES = [
  {
    title: "Vətəndaşlar",
    text: "Yaşadığınız və ya gəzdiyiniz yerdə gördüyünüz problemi kateqoriya, qısa təsvir və xəritədəki yer ilə bildirirsiniz.",
    tag: null,
  },
  {
    title: "Qonşular və yerli icma",
    text: "Xəritəyə baxıb ətrafda nələrin bildirildiyini görür və eyni problemin təkrar yazılmasının qarşısını alırlar.",
    tag: null,
  },
  {
    title: "Məsul qurumlar",
    text: "Platformanın məqsədi problemlərin harada və hansı kateqoriyada toplandığını aydın göstərməkdir ki, prioritetləri müəyyən etmək asan olsun.",
    tag: "Məqsəd",
  },
];

export default function Home() {
  return (
      <>
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-screen-2xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Şəhər problemlərini birlikdə həll edək
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                <span lang="en">Voice of City</span> (Şəhərin Səsi) şəhərimizdəki
                problemləri qeyd etmək, onları xəritədə görmək və daha yaxşı bir
                şəhər üçün birlikdə addım atmaq platformasıdır.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/report" className={buttonStyles("primary")}>
                  Problemi bildir
                </Link>
                <Link href="/map" className={buttonStyles("secondary")}>
                  Xəritəyə bax
                </Link>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Xəritədəki bütün bildirişləri hər kəs görə bilər.
              </p>
            </div>

            <MapPreview />
          </div>
        </section>

        {/* Nəyə kömək edir */}
        <section className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Platforma nəyə kömək edir?
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
                <li
                    key={b.title}
                    className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <Icon>{b.icon}</Icon>
                  <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {b.text}
                  </p>
                </li>
            ))}
          </ul>
        </section>

        {/* Kateqoriyalar */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Hansı problemləri bildirə bilərsiniz?
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {CATEGORIES.map((c) => (
                  <li
                      key={c.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <h3 className="text-sm font-semibold text-slate-900">
                      {c.label}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{c.description}</p>
                  </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Necə işləyir */}
        <section className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-semibold text-slate-900">Necə işləyir?</h2>
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
                    <h3 className="font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{s.text}</p>
                  </div>
                </li>
            ))}
          </ol>
        </section>

        {/* Kimlər üçündür, məlumat kimə çatır */}
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Kimlər üçündür və məlumat kimə çatır?
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {AUDIENCES.map((a) => (
                  <li
                      key={a.title}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {a.title}
                      </h3>
                      {a.tag && (
                          <span className="rounded-full border border-slate-300 bg-white px-2 py-0.5 text-xs font-medium text-slate-700">
                      {a.tag}
                    </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {a.text}
                    </p>
                  </li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-slate-600">
              Bildirişlərin rəsmi qurumlara çatdırılması mexanizmi hələ
              təsdiqlənməyib. Belə əməkdaşlıq olduqda bu səhifədə açıq yazılacaq.
            </p>

            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
              <p className="font-semibold">Yazdığınız məlumat kimə görünür?</p>
              <p className="mt-1">
                Bildirişin başlığı, təsviri və yeri xəritədə hamıya görünür.
                Telefon nömrəsi, ad və ya ev ünvanı kimi şəxsi məlumat yazmayın.
              </p>
            </div>
          </div>
        </section>

        {/* Son çağırış */}
        <section className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Ətrafınızda problem görürsünüz?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              Bir neçə dəqiqəyə bildirin ki, digər sakinlər də onu xəritədə görsün.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/report" className={buttonStyles("primary")}>
                Problemi bildir
              </Link>
              <Link href="/map" className={buttonStyles("secondary")}>
                Xəritəyə bax
              </Link>
            </div>
          </div>
        </section>
      </>
  );
}