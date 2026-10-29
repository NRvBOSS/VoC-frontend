import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  Copy,
  Info,
  Map as MapIcon,
  MapPin,
  Plus,
} from "lucide-react";
import HeroMap from "@/components/home/HeroMap";
import RecentIssues from "@/components/home/RecentIssues";
import CategoryIcon from "@/components/ui/CategoryIcon";
import { buttonStyles } from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/constants";

const BENEFITS = [
  {
    title: "Bütün problemlər bir xəritədə",
    text: "Bildirilmiş problemlər xəritədə yerləri ilə görünür. Kateqoriya və statusa görə süzgəcdən keçirə bilərsiniz.",
    Icon: MapIcon,
  },
  {
    title: "Təkrar bildirişin qarşısını alın",
    text: "Yazmazdan əvvəl xəritəyə baxın: eyni yerdə problem artıq bildirilibsə, təkrar yazmağa ehtiyac qalmır.",
    Icon: Copy,
  },
  {
    title: "Yeri dəqiq göstərin",
    text: "Ünvanı sözlə izah etmək əvəzinə problemin yerini xəritədə nöqtə ilə seçirsiniz.",
    Icon: MapPin,
  },
  {
    title: "Vəziyyəti izləyin",
    text: "Hər bildirişin statusu (Açıq, İşlənilir, Həll olunub) həm mətn, həm də rənglə göstərilir.",
    Icon: Clock,
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

const h2 =
    "font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl";

export default function Home() {
  return (
      <>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200">
          <div
              aria-hidden
              className="bg-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          />
          <div className="relative mx-auto grid max-w-screen-2xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-20">
            <div>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Şəhər problemlərini{" "}
                <span className="relative whitespace-nowrap">
                birlikdə
                <svg
                    aria-hidden
                    viewBox="0 0 250 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1.5 left-0 h-3 w-full text-blue-600"
                >
                  <path
                      className="draw-line"
                      pathLength={1}
                      d="M3 8 C 50 2, 100 11, 150 5 S 220 4, 247 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={4}
                      strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
                həll edək
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                <span lang="en">Voice of City</span> (Şəhərin Səsi) şəhərimizdəki
                problemləri qeyd etmək, onları xəritədə görmək və daha yaxşı bir
                şəhər üçün birlikdə addım atmaq platformasıdır.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/report" className={buttonStyles("primary", "lg")}>
                  <Plus aria-hidden className="h-4 w-4" strokeWidth={2.5} />
                  Problemi bildir
                </Link>
                <Link href="/map" className={buttonStyles("secondary", "lg")}>
                  Xəritəyə bax
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-1.5">
                  <Check
                      aria-hidden
                      className="h-4 w-4 text-green-700"
                      strokeWidth={2.5}
                  />
                  Qeydiyyat tələb olunmur
                </li>
                <li className="flex items-center gap-1.5">
                  <Check
                      aria-hidden
                      className="h-4 w-4 text-green-700"
                      strokeWidth={2.5}
                  />
                  Bildirişləri hər kəs görə bilər
                </li>
              </ul>
            </div>

            <HeroMap />
          </div>
        </section>

        <RecentIssues />

        {/* Nəyə kömək edir */}
        <section className="mx-auto max-w-screen-2xl px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
            <div className="reveal lg:sticky lg:top-28 lg:self-start">
              <h2 className={h2}>Platforma nəyə kömək edir?</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
                Problemlər bir yerdə toplanır: yeri, kateqoriyası və vəziyyəti
                ilə birlikdə.
              </p>
            </div>

            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {BENEFITS.map(({ title, text, Icon }) => (
                  <li key={title} className="reveal flex gap-5 py-7">
                    <Icon
                        aria-hidden
                        className="mt-1 h-6 w-6 shrink-0 text-blue-700"
                        strokeWidth={1.75}
                    />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-slate-900">
                        {title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-slate-600">
                        {text}
                      </p>
                    </div>
                  </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Kateqoriyalar */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className={`${h2} reveal`}>Hansı problemləri bildirə bilərsiniz?</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Yol, zibil, işıqlandırma, səki və digər ictimai məkan problemləri.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {CATEGORIES.map((c) => (
                  <li
                      key={c.id}
                      title={c.description}
                      className="reveal flex items-center gap-2.5 rounded-full border border-slate-300 bg-paper px-5 py-3 text-base font-medium text-slate-900"
                  >
                    <CategoryIcon
                        id={c.id}
                        className="h-5 w-5 text-blue-700"
                    />
                    {c.label}
                  </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Necə işləyir */}
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Necə işləyir?
            </h2>
            <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {STEPS.map((s, i) => (
                  <li key={s.title} className="reveal border-t border-white/20 pt-6">
                <span
                    aria-hidden
                    className="font-display text-5xl font-bold text-blue-400"
                >
                  {`0${i + 1}`}
                </span>
                    <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-300">
                      {s.text}
                    </p>
                  </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Kimlər üçündür, məlumat kimə çatır */}
        <section className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className={`${h2} reveal`}>
            Kimlər üçündür və məlumat kimə çatır?
          </h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-3">
            {AUDIENCES.map((a) => (
                <li key={a.title} className="reveal border-t-2 border-ink pt-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-slate-900">
                      {a.title}
                    </h3>
                    {a.tag && (
                        <span className="rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {a.tag}
                  </span>
                    )}
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {a.text}
                  </p>
                </li>
            ))}
          </ul>

          <p className="mt-6 max-w-3xl text-sm text-slate-600">
            Bildirişlərin rəsmi qurumlara çatdırılması mexanizmi hələ
            təsdiqlənməyib. Belə əməkdaşlıq olduqda bu səhifədə açıq yazılacaq.
          </p>

          <div className="mt-8 flex gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-900">
            <Info
                aria-hidden
                className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
                strokeWidth={1.75}
            />
            <div className="text-sm leading-relaxed">
              <p className="font-semibold">Yazdığınız məlumat kimə görünür?</p>
              <p className="mt-1">
                Bildirişin başlığı, təsviri və yeri xəritədə hamıya görünür.
                Telefon nömrəsi, ad və ya ev ünvanı kimi şəxsi məlumat yazmayın.
              </p>
            </div>
          </div>
        </section>

        {/* Son çağırış */}
        <section className="mx-auto max-w-screen-2xl px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <div
                aria-hidden
                className="absolute inset-0 [background-image:radial-gradient(circle,rgb(255_255_255/0.18)_1px,transparent_1.5px)] [background-size:22px_22px]"
            />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Ətrafınızda problem görürsünüz?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-blue-50">
                Bir neçə dəqiqəyə bildirin ki, digər sakinlər də onu xəritədə
                görsün.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                    href="/report"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-base font-semibold text-blue-700 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Plus aria-hidden className="h-4 w-4" strokeWidth={2.5} />
                  Problemi bildir
                </Link>
                <Link
                    href="/map"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/60 px-5 text-base font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Xəritəyə bax
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
  );
}