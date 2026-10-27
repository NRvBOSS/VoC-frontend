import Link from "next/link";
import CurrentYear from "./CurrentYear";
import { LogoMark } from "./Logo";
import { BRAND } from "@/lib/brand";

const NAV = [
  { href: "/", label: "Ana səhifə" },
  { href: "/map", label: "Xəritə" },
  { href: "/report", label: "Problem bildir" },
  { href: "/about", label: "Haqqımızda" },
];

const linkClass =
    "rounded-md text-base text-slate-700 hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export default function Footer() {
  return (
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <LogoMark className="h-11 w-11 shrink-0" />
                <div className="leading-tight">
                  <p lang="en" className="text-lg font-bold text-slate-900">
                    {BRAND.name}
                  </p>
                  <p className="text-sm font-medium text-slate-600">
                    {BRAND.nameAz}
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
                Şəhərdəki problemləri xəritədə görün və bildirin.
              </p>
            </div>

            <nav aria-label="Footer naviqasiyası">
              <p className="text-sm font-semibold text-slate-900">Naviqasiya</p>
              <ul className="mt-4 space-y-3">
                {NAV.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-sm font-semibold text-slate-900">Məlumat</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
                Bildirişlərin başlığı, təsviri və yeri xəritədə hamıya görünür.
                Şəxsi məlumat (telefon, ad, ev ünvanı) yazmayın.
              </p>
              <Link href="/about" className={`${linkClass} mt-3 inline-block text-sm`}>
                Ətraflı məlumat
              </Link>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
            © <CurrentYear /> <span lang="en">{BRAND.name}</span> ({BRAND.nameAz})
          </div>
        </div>
      </footer>
  );
}