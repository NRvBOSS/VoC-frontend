"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import MessagePage from "@/components/layout/MessagePage";
import Button, { buttonStyles } from "@/components/ui/Button";

export default function ErrorPage({
                                      error,
                                      reset,
                                  }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <MessagePage
            code="Xəta"
            symbol="!"
            title="Nəsə səhv getdi"
            text="Səhifə yüklənərkən gözlənilməz xəta baş verdi. Yenidən cəhd edin, alınmasa ana səhifəyə qayıdın."
        >
            <Button size="lg" onClick={reset}>
                <RotateCcw aria-hidden className="h-4 w-4" />
                Yenidən cəhd et
            </Button>
            <Link href="/" className={buttonStyles("secondary", "lg")}>
                Ana səhifə
            </Link>
            {error.digest && (
                <p className="w-full text-xs text-slate-600">
                    Xəta kodu: {error.digest}
                </p>
            )}
        </MessagePage>
    );
}