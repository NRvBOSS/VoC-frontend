import Link from "next/link";
import { Plus } from "lucide-react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { buttonStyles } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";

export default function Header() {
    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-paper">
            <div className="mx-auto flex h-16 max-w-screen-2xl items-stretch justify-between gap-2 px-3 sm:h-20 sm:px-6">
                <div className="flex items-stretch gap-2 sm:gap-8">
                    <Link
                        href="/"
                        aria-label={`${BRAND.name} (${BRAND.nameAz}), ana səhifə`}
                        className="flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <Logo />
                    </Link>
                    <NavLinks />
                </div>

                <div className="flex items-center">
                    <Link href="/report" className={buttonStyles("primary", "lg")}>
                        <Plus aria-hidden className="h-4 w-4" strokeWidth={2.5} />
                        <span className="sm:hidden">Bildir</span>
                        <span className="hidden sm:inline">Problem bildir</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}