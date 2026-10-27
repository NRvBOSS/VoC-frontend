import { BRAND } from "@/lib/brand";

export function LogoMark({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 64 64"
            aria-hidden="true"
            focusable="false"
            className={className}
        >
            <path
                d="M32 61C32 61 9 43 9 26a23 23 0 0 1 46 0c0 17-23 35-23 35Z"
                fill="#2563EB"
            />
            <rect x="21.5" y="20" width="5" height="12" rx="2.5" fill="#fff" />
            <rect x="29.5" y="14" width="5" height="24" rx="2.5" fill="#fff" />
            <rect x="37.5" y="18" width="5" height="16" rx="2.5" fill="#fff" />
        </svg>
    );
}

export default function Logo() {
    return (
        <span className="flex items-center gap-2.5">
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="hidden leading-tight sm:block">
        <span lang="en" className="block text-base font-bold text-slate-900">
          {BRAND.name}
        </span>
        <span className="block text-xs font-medium text-slate-600">
          {BRAND.nameAz}
        </span>
      </span>
    </span>
    );
}