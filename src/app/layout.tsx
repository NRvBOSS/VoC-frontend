import type { Metadata } from "next";
import { Fraunces, Onest } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { BRAND } from "@/lib/brand";

const onest = Onest({
    subsets: ["latin", "latin-ext"],
    variable: "--font-onest",
    display: "swap",
});

const fraunces = Fraunces({
    subsets: ["latin", "latin-ext"],
    variable: "--font-fraunces",
    display: "swap",
});

const DESCRIPTION = "Şəhərdəki problemləri xəritədə görün və bildirin.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${BRAND.name} (${BRAND.nameAz})`,
        template: `%s | ${BRAND.name}`,
    },
    description: DESCRIPTION,
    openGraph: {
        type: "website",
        siteName: BRAND.name,
        locale: "az_AZ",
        title: `${BRAND.name} (${BRAND.nameAz})`,
        description: DESCRIPTION,
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: `${BRAND.name} (${BRAND.nameAz}): şəhər problemlərinin xəritəsi`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${BRAND.name} (${BRAND.nameAz})`,
        description: DESCRIPTION,
        images: ["/og.png"],
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="az" className={`${onest.variable} ${fraunces.variable}`}>
        <body className="flex min-h-dvh flex-col">
        <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-blue-700"
        >
            Əsas məzmuna keç
        </a>
        <Header />
        {children}
        </body>
        </html>
    );
}