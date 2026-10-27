import Link from "next/link";
import MessagePage from "@/components/layout/MessagePage";
import { buttonStyles } from "@/components/ui/Button";

export const metadata = { title: "Səhifə tapılmadı" };

export default function NotFound() {
    return (
        <MessagePage
            code="404"
            title="Səhifə tapılmadı"
            text="Axtardığınız səhifə mövcud deyil və ya köçürülüb. Ünvanı yoxlayın və ya ana səhifəyə qayıdın."
        >
            <Link href="/" className={buttonStyles("primary")}>
                Ana səhifə
            </Link>
            <Link href="/map" className={buttonStyles("secondary")}>
                Xəritəyə bax
            </Link>
        </MessagePage>
    );
}