"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Ana səhifə" },
  { href: "/map", label: "Xəritə" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Əsas naviqasiya" className="flex items-center gap-1">
      {links.map(({ href, label }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-2 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-3 ${
              active ? "text-blue-700" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
