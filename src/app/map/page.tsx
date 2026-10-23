import MapDashboard from "../../components/map/MapDashboard";
import { MOCK_ISSUES } from "../../lib/mock-issues";

export const metadata = { title: "Xəritə | ŞəhərSəsi" };

export default function MapPage() {
  return (
    <main id="main" className="h-[calc(100dvh-4rem)]">
      <MapDashboard issues={MOCK_ISSUES} />
    </main>
  );
}
