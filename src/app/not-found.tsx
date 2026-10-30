import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MessagePage from "@/components/layout/MessagePage";
import { buttonStyles } from "@/components/ui/Button";

export const metadata = { title: "Səhifə tapılmadı" };

export default function NotFound() {
    return (
        <MessagePage
            code="404"
            symbol="?"
            title="Bu yer xəritədə yoxdur"
            text="Axtardığınız səhifə mövcud deyil və ya köçürülüb. Ünvanı yoxlayın və ya ana səhifəyə qayıdın."
        >
            <Link href="/" className={buttonStyles("primary", "lg")}>
                Ana səhifə
            </Link>
            <Link href="/map" className={buttonStyles("secondary", "lg")}>
                Xəritəyə bax
                <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
        </MessagePage>
    );
}