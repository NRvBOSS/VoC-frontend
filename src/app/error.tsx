"use client";

import Link from "next/link";
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
            title="Nəsə səhv getdi"
            text="Səhifə yüklənərkən gözlənilməz xəta baş verdi. Yenidən cəhd edin, alınmasa ana səhifəyə qayıdın."
        >
            <Button onClick={reset}>Yenidən cəhd et</Button>
            <Link href="/" className={buttonStyles("secondary")}>
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