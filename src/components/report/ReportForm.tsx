"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Info, LoaderCircle, MapPin, Send } from "lucide-react";
import Button, { buttonStyles } from "@/components/ui/Button";
import CategoryIcon from "@/components/ui/CategoryIcon";
import { createIssue } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import type { CategoryId } from "@/types/issue";
import type { LatLng } from "./LocationPicker";
import { ReportPreview, ReportTips } from "./ReportPreview";

const LocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
  loading: () => (
      <div className="grid h-full place-items-center text-sm text-slate-600">
        Xəritə yüklənir…
      </div>
  ),
});

const TITLE_MIN = 5;
const TITLE_MAX = 100;
const DESC_MIN = 10;
const DESC_MAX = 500;

type FieldKey = "category" | "title" | "description" | "location";
type Errors = Partial<Record<FieldKey, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: FieldKey[] = [
  "category",
  "title",
  "description",
  "location",
];

interface Values {
  category: CategoryId | "";
  title: string;
  description: string;
  location: LatLng | null;
}

function validate(v: Values): Errors {
  const errors: Errors = {};
  const title = v.title.trim();
  const description = v.description.trim();

  if (!CATEGORIES.some((c) => c.id === v.category)) {
    errors.category = "Kateqoriya seçin.";
  }
  if (title.length < TITLE_MIN) {
    errors.title = `Başlıq ən azı ${TITLE_MIN} simvol olmalıdır.`;
  } else if (title.length > TITLE_MAX) {
    errors.title = `Başlıq ən çox ${TITLE_MAX} simvol ola bilər.`;
  }
  if (description.length < DESC_MIN) {
    errors.description = `Təsvir ən azı ${DESC_MIN} simvol olmalıdır.`;
  } else if (description.length > DESC_MAX) {
    errors.description = `Təsvir ən çox ${DESC_MAX} simvol ola bilər.`;
  }
  if (!v.location) {
    errors.location = "Problemin yerini xəritədə seçin.";
  }
  return errors;
}

const inputBase =
    "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

function inputClass(hasError: boolean) {
  return `${inputBase} ${hasError ? "border-red-600" : "border-slate-300"}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
      <p id={id} role="alert" className="mt-2 text-sm text-red-700">
        {message}
      </p>
  );
}

function SectionCard({ children }: { children: ReactNode }) {
  return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        {children}
      </div>
  );
}

function SectionHeader({
                         n,
                         id,
                         title,
                         hint,
                       }: {
  n: number;
  id: string;
  title: string;
  hint?: string;
}) {
  return (
      <div className="mb-5">
        <p aria-hidden className="font-display text-sm font-bold text-blue-700">
          {`0${n}`}
        </p>
        <h2
            id={id}
            className="font-display text-2xl font-bold tracking-tight text-slate-900"
        >
          {title}
        </h2>
        {hint && <p className="mt-1 text-sm text-slate-600">{hint}</p>}
      </div>
  );
}

export default function ReportForm() {
  const [category, setCategory] = useState<CategoryId | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<LatLng | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const submittingRef = useRef(false);
  const successRef = useRef<HTMLHeadingElement>(null);

  const submitting = status === "submitting";

  // Uğurdan sonra fokus təsdiq başlığına keçir (ekran oxuyucu üçün)
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function clearError(key: FieldKey) {
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setServerError(null);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validate({ category, title, description, location });
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((k) => nextErrors[k]);
    if (firstInvalid) {
      setStatus("idle");
      document.getElementById(`report-${firstInvalid}`)?.focus();
      return;
    }
    if (category === "" || !location) return;

    submittingRef.current = true;
    setStatus("submitting");
    setServerError(null);

    try {
      const result = await createIssue({
        category,
        title: title.trim(),
        description: description.trim(),
        latitude: location.lat,
        longitude: location.lng,
      });

      if (result.ok) {
        setCategory("");
        setTitle("");
        setDescription("");
        setLocation(null);
        setErrors({});
        setStatus("success");
      } else {
        setServerError(result.message);
        setStatus("error");
      }
    } finally {
      submittingRef.current = false;
    }
  }

  return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        {status === "success" ? (
            <section
                aria-labelledby="success-title"
                className="rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-14"
            >
              <svg
                  aria-hidden
                  viewBox="0 0 64 64"
                  className="mx-auto h-20 w-20 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
              >
                <circle cx="32" cy="32" r="27" pathLength={1} className="draw-line" />
                <path
                    d="M20 33 l9 9 l16 -19"
                    pathLength={1}
                    className="draw-line"
                    style={{ animationDelay: "0.9s" }}
                />
              </svg>
              <h2
                  id="success-title"
                  ref={successRef}
                  tabIndex={-1}
                  className="mt-6 font-display text-3xl font-bold tracking-tight text-slate-900 focus:outline-none"
              >
                Bildirişiniz qəbul edildi
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-600">
                Təşəkkür edirik. Problem xəritədə “Açıq” statusu ilə görünəcək.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/map" className={buttonStyles("primary", "lg")}>
                  Xəritədə bax
                </Link>
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setStatus("idle")}
                >
                  Yeni problem bildir
                </Button>
              </div>
            </section>
        ) : (
            <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Problem bildirişi"
                className="space-y-6"
            >
              {status === "error" && serverError && (
                  <p
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                  >
                    {serverError}
                  </p>
              )}

              {/* 01 Kateqoriya */}
              <SectionCard>
                <fieldset
                    aria-labelledby="report-category-title"
                    aria-describedby={
                      errors.category ? "report-category-error" : undefined
                    }
                >
                  <SectionHeader
                      n={1}
                      id="report-category-title"
                      title="Nə baş verib? *"
                      hint="Ən uyğun kateqoriyanı seçin."
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {CATEGORIES.map((c, i) => {
                      const selected = category === c.id;
                      return (
                          <label
                              key={c.id}
                              className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue-600"
                          >
                            <input
                                id={i === 0 ? "report-category" : undefined}
                                type="radio"
                                name="category"
                                value={c.id}
                                checked={selected}
                                onChange={() => {
                                  setCategory(c.id);
                                  clearError("category");
                                }}
                                className="sr-only"
                            />
                            <span
                                aria-hidden
                                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${
                                    selected
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-slate-200 bg-slate-50 text-slate-700"
                                }`}
                            >
                        <CategoryIcon id={c.id} className="h-5 w-5" />
                      </span>
                            <span>
                        <span className="block text-sm font-semibold text-slate-900">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-slate-600">
                          {c.description}
                        </span>
                      </span>
                          </label>
                      );
                    })}
                  </div>
                  <FieldError
                      id="report-category-error"
                      message={errors.category}
                  />
                </fieldset>
              </SectionCard>

              {/* 02 Təsvir */}
              <SectionCard>
                <SectionHeader
                    n={2}
                    id="report-text-title"
                    title="Qısa təsvir edin"
                    hint="Başlıq qısa, təsvir isə konkret olsun."
                />

                <div>
                  <label
                      htmlFor="report-title"
                      className="text-sm font-semibold text-slate-900"
                  >
                    Başlıq <span aria-hidden>*</span>
                  </label>
                  <input
                      id="report-title"
                      type="text"
                      value={title}
                      maxLength={TITLE_MAX}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        clearError("title");
                      }}
                      placeholder="Məsələn: Nizami küçəsində açıq lyuk"
                      aria-required="true"
                      aria-invalid={errors.title ? true : undefined}
                      aria-describedby={
                        errors.title ? "report-title-error" : undefined
                      }
                      className={inputClass(!!errors.title)}
                  />
                  <div className="flex justify-between gap-4">
                    <FieldError id="report-title-error" message={errors.title} />
                    <p className="ml-auto mt-1.5 text-xs tabular-nums text-slate-600">
                      {title.length}/{TITLE_MAX}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <label
                      htmlFor="report-description"
                      className="text-sm font-semibold text-slate-900"
                  >
                    Təsvir <span aria-hidden>*</span>
                  </label>
                  <textarea
                      id="report-description"
                      rows={5}
                      value={description}
                      maxLength={DESC_MAX}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        clearError("description");
                      }}
                      placeholder="Nə vaxtdan var və niyə təhlükəlidir?"
                      aria-required="true"
                      aria-invalid={errors.description ? true : undefined}
                      aria-describedby={
                        errors.description ? "report-description-error" : undefined
                      }
                      className={inputClass(!!errors.description)}
                  />
                  <div className="flex justify-between gap-4">
                    <FieldError
                        id="report-description-error"
                        message={errors.description}
                    />
                    <p className="ml-auto mt-1.5 text-xs tabular-nums text-slate-600">
                      {description.length}/{DESC_MAX}
                    </p>
                  </div>
                </div>
              </SectionCard>

              {/* 03 Yer */}
              <SectionCard>
                <div role="group" aria-labelledby="report-location-title">
                  <SectionHeader
                      n={3}
                      id="report-location-title"
                      title="Harada? *"
                      hint="Xəritədə problemin olduğu nöqtəyə klikləyin. Klaviatura ilə xəritəni ox düymələri ilə sürüşdürüb “Xəritənin mərkəzini seç” düyməsini istifadə edə bilərsiniz."
                  />

                  <div
                      id="report-location"
                      tabIndex={-1}
                      className="relative isolate h-80 overflow-hidden rounded-2xl border border-slate-300 bg-slate-200 sm:h-[26rem]"
                  >
                    <LocationPicker
                        value={location}
                        onPick={(p) => {
                          setLocation(p);
                          clearError("location");
                        }}
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                    <p className="flex items-center gap-2 text-slate-700">
                      <MapPin
                          aria-hidden
                          className={`h-4 w-4 ${location ? "text-blue-700" : "text-slate-500"}`}
                      />
                      {location
                          ? `Seçilmiş yer: ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
                          : "Yer hələ seçilməyib."}
                    </p>
                    {location && (
                        <button
                            type="button"
                            onClick={() => setLocation(null)}
                            className="rounded-md px-2 py-1 font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          Yeri sil
                        </button>
                    )}
                  </div>
                  <FieldError
                      id="report-location-error"
                      message={errors.location}
                  />
                </div>
              </SectionCard>

              {/* Göndər */}
              <div className="flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
                <Info
                    aria-hidden
                    className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
                    strokeWidth={1.75}
                />
                <div className="text-sm leading-relaxed">
                  <p className="font-semibold">Yazdığınız məlumat hamıya görünür</p>
                  <p className="mt-1">
                    Başlıq, təsvir və seçdiyiniz yer xəritədə hər kəsə göstərilir.
                    Telefon nömrəsi, ad və ya ev ünvanı kimi şəxsi məlumat yazmayın.
                  </p>
                </div>
              </div>

              <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={submitting}
                  aria-busy={submitting}
              >
                {submitting ? (
                    <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />
                ) : (
                    <Send aria-hidden className="h-4 w-4" />
                )}
                {submitting ? "Göndərilir…" : "Bildirişi göndər"}
              </Button>
            </form>
        )}

        <aside className="space-y-6 lg:sticky lg:top-28">
          {status !== "success" && (
              <div className="hidden lg:block">
                <ReportPreview
                    category={category}
                    title={title}
                    description={description}
                    hasLocation={location !== null}
                />
              </div>
          )}
          <ReportTips />
        </aside>
      </div>
  );
}