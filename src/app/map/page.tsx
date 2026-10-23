import MapDashboard from "../../components/map/MapDashboard";

export const metadata = { title: "Xəritə | ŞəhərSəsi" };

export default function MapPage() {
  return (
    <main id="main" className="h-[calc(100dvh-4rem)]">
      <MapDashboard />
    </main>
  );
}
