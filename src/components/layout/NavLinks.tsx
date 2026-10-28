"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Ana səhifə", hideOnMobile: true },
  { href: "/map", label: "Xəritə", hideOnMobile: false },
  { href: "/about", label: "Haqqımızda", hideOnMobile: false },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
      <nav aria-label="Əsas naviqasiya" className="flex items-stretch gap-1">
        {links.map(({ href, label, hideOnMobile }) => {
          const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
              <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`items-center border-b-2 px-2 text-sm font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 sm:px-3 sm:text-base ${
                      hideOnMobile ? "hidden sm:inline-flex" : "inline-flex"
                  } ${
                      active
                          ? "border-blue-600 text-slate-900"
                          : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
              >
                {label}
              </Link>
          );
        })}
      </nav>
  );
}