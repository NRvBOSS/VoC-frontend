import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "ŞəhərSəsi",
  description: "Şəhərdəki problemləri xəritədə görün və bildirin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className={`${inter.className} flex min-h-dvh flex-col`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-blue-700"
        >
          Əsas məzmuna keç
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
