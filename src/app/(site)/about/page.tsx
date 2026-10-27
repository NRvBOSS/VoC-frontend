import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { BRAND, CONTACT_EMAIL } from "@/lib/brand";

export const metadata = { title: "Haqqımızda" };

const DOES = [
    "Bildirilmiş problemləri xəritədə yerləri ilə göstərir.",
    "Problemləri kateqoriya və statusa görə süzməyə imkan verir.",
    "Problemin yerini xəritədən seçib bildiriş göndərməyə imkan verir.",
    "Hər problemin paylaşıla bilən öz linki var.",
];

const DOES_NOT = [
    "Bildirişləri rəsmi qurumlara avtomatik göndərmir.",
    "Bildirişin statusunu yeniləmə mexanizmi hələ hazır deyil: yeni bildirişlər “Açıq” statusu ilə görünür.",
    "Şəkil əlavə etmək hələ mümkün deyil.",
    "İstifadəçi hesabı yoxdur, bildiriş üçün qeydiyyat tələb olunmur.",
];

function List({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
            {items.map((item) => (
                <li key={item} className="flex gap-2">
          <span
              aria-hidden
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
          />
                    {item}
                </li>
            ))}
        </ul>
    );
}

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Haqqımızda
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
                <span lang="en">{BRAND.name}</span> ({BRAND.nameAz}) şəhərdəki
                problemləri qeyd etmək, xəritədə görmək və təhlil etmək üçün qurulan
                vətəndaş platformasıdır. Məqsəd problemlərin harada və hansı
                kateqoriyada toplandığını hamı üçün aydın etməkdir.
            </p>

            <section aria-labelledby="scope" className="mt-10">
                <h2 id="scope" className="text-xl font-semibold text-slate-900">
                    Platforma indi nə edir və nə etmir?
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">Edir</h3>
                        <List items={DOES} />
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Hələlik etmir
                        </h3>
                        <List items={DOES_NOT} />
                    </div>
                </div>
            </section>

            <section aria-labelledby="data" className="mt-10">
                <h2 id="data" className="text-xl font-semibold text-slate-900">
                    Məlumatlar və məxfilik
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    Bildiriş göndərəndə kateqoriya, başlıq, təsvir, xəritədə seçdiyiniz
                    yer və bildirişin yaranma tarixi saxlanılır. Bu məlumatlar xəritədə
                    hamıya görünür.
                </p>
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
                    Telefon nömrəsi, ad, ev ünvanı və ya digər şəxsi məlumat yazmayın.
                    Başlıq və təsvirdə yalnız problemin özünü təsvir edin.
                </div>
            </section>

            <section aria-labelledby="future" className="mt-10">
                <h2 id="future" className="text-xl font-semibold text-slate-900">
                    Gələcək planlar
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    Uzunmüddətli plan təkrarlanan problemləri aşkar edən və təmir
                    prioritetlərinin müəyyən edilməsinə kömək edən ayrıca xidmət
                    (VoC.AI) qurmaqdır.{" "}
                    <span className="font-medium text-slate-900">
            Bu xidmət hələ mövcud deyil
          </span>
                    , saytda göstərilən bütün məlumat yalnız istifadəçilərin göndərdiyi
                    bildirişlərdir.
                </p>
            </section>

            {CONTACT_EMAIL && (
                <section aria-labelledby="contact" className="mt-10">
                    <h2 id="contact" className="text-xl font-semibold text-slate-900">
                        Əlaqə
                    </h2>
                    <p className="mt-3 text-sm text-slate-700">
                        Sual və təkliflər üçün:{" "}
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="font-medium text-blue-700 underline"
                        >
                            {CONTACT_EMAIL}
                        </a>
                    </p>
                </section>
            )}

            <div className="mt-12 flex flex-wrap gap-3">
                <Link href="/report" className={buttonStyles("primary")}>
                    Problemi bildir
                </Link>
                <Link href="/map" className={buttonStyles("secondary")}>
                    Xəritəyə bax
                </Link>
            </div>
        </div>
    );
}