import MapDashboard from "@/components/map/MapDashboard";

export const metadata = { title: "Xəritə" };

export default function MapPage() {
    return (
        <main id="main" className="h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)]">
            <MapDashboard />
        </main>
    );
}