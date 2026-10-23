import StatusBadge from "../src/components/ui/StatusBadge";
import Button from "../src/components/ui/Button";
import { STATUS_ORDER } from "../src/lib/constants";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">Mərhələ 1 testi</h1>
      <div className="flex flex-wrap gap-2">
        {STATUS_ORDER.map((s) => (
          <StatusBadge key={s} status={s} />
        ))}
      </div>
      <div className="flex gap-2">
        <Button>Əsas düymə</Button>
        <Button variant="secondary">İkinci düymə</Button>
        <Button disabled>Deaktiv</Button>
      </div>
    </div>
  );
}
