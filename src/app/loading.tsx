import { LogoMark } from "@/components/layout/Logo";

export default function Loading() {
    return (
        <div role="status" className="grid flex-1 place-items-center p-8">
            <div className="flex flex-col items-center gap-3 text-sm text-slate-600">
                <LogoMark className="h-10 w-10 animate-pulse" />
                Yüklənir…
            </div>
        </div>
    );
}