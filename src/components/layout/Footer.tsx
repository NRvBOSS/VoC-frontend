import Link from "next/link";
import CurrentYear from "./CurrentYear";
import { BRAND } from "@/lib/brand";

export default function Footer() {
  return (
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © <CurrentYear /> <span lang="en">{BRAND.name}</span> ({BRAND.nameAz})
          </p>
          <nav aria-label="Footer naviqasiyası" className="flex gap-4">
            <Link href="/map" className="hover:text-slate-900">
              Xəritə
            </Link>
            <Link href="/report" className="hover:text-slate-900">
              Problem bildir
            </Link>
          </nav>
        </div>
      </footer>
  );
}