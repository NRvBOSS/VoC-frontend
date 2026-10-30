import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, Clock, Eye, Plus } from "lucide-react";
import type { ReactNode } from "react";
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

function Row({
                 id,
                 title,
                 children,
             }: {
    id: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section
            aria-labelledby={id}
            className="grid gap-6 border-t border-slate-200 py-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10"
        >
            <h2
                id={id}
                className="font-display text-2xl font-bold tracking-tight text-slate-900"
            >
                {title}
            </h2>
            <div>{children}</div>
        </section>
    );
}

function Items({
                   items,
                   Icon,
                   iconClass,
               }: {
    items: string[];
    Icon: LucideIcon;
    iconClass: string;
}) {
    return (
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
            {items.map((item) => (
                <li key={item} className="flex gap-3">
                    <Icon
                        aria-hidden
                        className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`}
                        strokeWidth={2.25}
                    />
                    {item}
                </li>
            ))}
        </ul>
    );
}

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-20">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Haqqımızda
            </h1>
            <p className="mt-6 max-w-3xl font-display text-2xl leading-snug text-slate-800 sm:text-3xl">
                <span lang="en">{BRAND.name}</span> ({BRAND.nameAz}) şəhərdəki
                problemləri qeyd etmək və xəritədə görmək üçün qurulan vətəndaş
                platformasıdır.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                Məqsəd problemlərin harada və hansı kateqoriyada toplandığını hamı üçün
                aydın etməkdir.
            </p>

            <div className="mt-14">
                <Row id="scope" title="Platforma indi nə edir və nə etmir?">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="text-sm font-semibold text-slate-900">Edir</h3>
                            <Items items={DOES} Icon={Check} iconClass="text-green-700" />
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="text-sm font-semibold text-slate-900">
                                Hələlik etmir
                            </h3>
                            <Items
                                items={DOES_NOT}
                                Icon={Clock}
                                iconClass="text-slate-500"
                            />
                        </div>
                    </div>
                </Row>

                <Row id="data" title="Məlumatlar və məxfilik">
                    <p className="text-base leading-relaxed text-slate-700">
                        Bildiriş göndərəndə kateqoriya, başlıq, təsvir, xəritədə seçdiyiniz
                        yer və bildirişin yaranma tarixi saxlanılır. Bu məlumatlar
                        xəritədə hamıya görünür.
                    </p>
                    <div className="mt-5 flex gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-900">
                        <Eye
                            aria-hidden
                            className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
                            strokeWidth={1.75}
                        />
                        <p className="text-sm leading-relaxed">
                            Telefon nömrəsi, ad, ev ünvanı və ya digər şəxsi məlumat
                            yazmayın. Başlıq və təsvirdə yalnız problemin özünü təsvir edin.
                        </p>
                    </div>
                </Row>

                <Row id="future" title="Gələcək planlar">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-display text-xl font-semibold text-slate-900">
                                VoC.AI
                            </h3>
                            <span className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                Hələ mövcud deyil
              </span>
                        </div>
                        <p className="mt-3 text-base leading-relaxed text-slate-700">
                            Uzunmüddətli plan təkrarlanan problemləri aşkar edən və təmir
                            prioritetlərinin müəyyən edilməsinə kömək edən ayrıca xidmət
                            qurmaqdır. Saytda göstərilən bütün məlumat yalnız
                            istifadəçilərin göndərdiyi bildirişlərdir.
                        </p>
                    </div>
                </Row>

                {CONTACT_EMAIL && (
                    <Row id="contact" title="Əlaqə">
                        <p className="text-base text-slate-700">
                            Sual və təkliflər üçün:{" "}
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="font-semibold text-blue-700 underline"
                            >
                                {CONTACT_EMAIL}
                            </a>
                        </p>
                    </Row>
                )}
            </div>

            <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-10">
                <Link href="/report" className={buttonStyles("primary", "lg")}>
                    <Plus aria-hidden className="h-4 w-4" strokeWidth={2.5} />
                    Problemi bildir
                </Link>
                <Link href="/map" className={buttonStyles("secondary", "lg")}>
                    Xəritəyə bax
                    <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}