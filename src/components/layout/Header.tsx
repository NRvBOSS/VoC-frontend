import Link from "next/link";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { buttonStyles } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";

export default function Header() {
  return (
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-2 px-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-8">
            <Link
                href="/"
                aria-label={`${BRAND.name} (${BRAND.nameAz}), ana səhifə`}
                className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Logo />
            </Link>
            <NavLinks />
          </div>

          <Link href="/report" className={buttonStyles("primary")}>
            Problem bildir
          </Link>
        </div>
      </header>
  );
}