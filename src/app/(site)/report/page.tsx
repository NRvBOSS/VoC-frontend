import ReportForm from "@/components/report/ReportForm";

export const metadata = { title: "Problem bildir | ŞəhərSəsi" };

export default function ReportPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Problem bildir</h1>
      <p className="mt-2 text-sm text-slate-600">
        Sahələr ulduzla (*) qeyd olunub, doldurulması məcburidir.
      </p>
      <div className="mt-6">
        <ReportForm />
      </div>
    </div>
  );
}
