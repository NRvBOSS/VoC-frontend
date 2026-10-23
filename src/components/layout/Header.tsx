import Link from "next/link";
import NavLinks from "./NavLinks";
import { buttonStyles } from "../../components/ui/Button";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-2 px-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md text-lg font-bold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-sm text-white"
            >
              Ş
            </span>
            <span className="hidden sm:inline">ŞəhərSəsi</span>
            <span className="sr-only sm:hidden">ŞəhərSəsi</span>
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
