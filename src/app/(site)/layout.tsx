import Footer from "../../../src/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
