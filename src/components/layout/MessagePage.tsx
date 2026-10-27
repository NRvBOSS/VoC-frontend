import type { ReactNode } from "react";
import { LogoMark } from "./Logo";

interface MessagePageProps {
    code?: string;
    title: string;
    text: string;
    children?: ReactNode;
}

export default function MessagePage({
                                        code,
                                        title,
                                        text,
                                        children,
                                    }: MessagePageProps) {
    return (
        <main
            id="main"
            className="flex flex-1 items-center justify-center px-4 py-16"
        >
            <div className="mx-auto max-w-md text-center">
                <LogoMark className="mx-auto h-12 w-12" />
                {code && (
                    <p className="mt-6 text-sm font-semibold text-blue-700">{code}</p>
                )}
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    {title}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
                {children && (
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {children}
                    </div>
                )}
            </div>
        </main>
    );
}