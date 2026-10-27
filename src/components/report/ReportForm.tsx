"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { createIssue } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import type { CategoryId } from "@/types/issue";
import type { LatLng } from "./LocationPicker";

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
    "mt-1 block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

function inputClass(hasError: boolean) {
  return `${inputBase} ${hasError ? "border-red-600" : "border-slate-300"}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
      <p id={id} role="alert" className="mt-1 text-sm text-red-700">
        {message}
      </p>
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

  const submitting = status === "submitting";

  function clearError(key: FieldKey) {
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status === "success" || status === "error") {
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
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {status === "success" && (
            <div
                role="status"
                className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"
            >
              Bildirişiniz qəbul edildi. Təşəkkür edirik!{" "}
              <Link href="/map" className="font-medium underline">
                Xəritəyə qayıt
              </Link>
            </div>
        )}

        {status === "error" && serverError && (
            <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
            >
              {serverError}
            </p>
        )}

        <div>
          <label
              htmlFor="report-category"
              className="text-sm font-semibold text-slate-900"
          >
            Kateqoriya <span aria-hidden>*</span>
          </label>
          <select
              id="report-category"
              value={category}
              onChange={(e) => {
                const match = CATEGORIES.find((c) => c.id === e.target.value);
                setCategory(match ? match.id : "");
                clearError("category");
              }}
              aria-required="true"
              aria-invalid={errors.category ? true : undefined}
              aria-describedby={
                errors.category ? "report-category-error" : undefined
              }
              className={inputClass(!!errors.category)}
          >
            <option value="">Kateqoriya seçin</option>
            {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
            ))}
          </select>
          <FieldError id="report-category-error" message={errors.category} />
        </div>

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
              placeholder="Problemin qısa təsviri"
              aria-required="true"
              aria-invalid={errors.title ? true : undefined}
              aria-describedby={errors.title ? "report-title-error" : undefined}
              className={inputClass(!!errors.title)}
          />
          <FieldError id="report-title-error" message={errors.title} />
        </div>

        <div>
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
              placeholder="Ətraflı məlumat yazın"
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
            <p className="ml-auto mt-1 text-xs text-slate-600">
              {description.length}/{DESC_MAX}
            </p>
          </div>
        </div>

        <div role="group" aria-labelledby="report-location-label">
          <p
              id="report-location-label"
              className="text-sm font-semibold text-slate-900"
          >
            Problemin yeri <span aria-hidden>*</span>
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Xəritədə problemin olduğu nöqtəyə klikləyin. Klaviatura ilə xəritəni
            ox düymələri ilə sürüşdürüb &quot;Xəritənin mərkəzini seç&quot;
            düyməsini istifadə edə bilərsiniz.
          </p>

          <div
              id="report-location"
              tabIndex={-1}
              className="relative isolate mt-2 h-72 overflow-hidden rounded-lg border border-slate-300 bg-slate-200"
          >
            <LocationPicker
                value={location}
                onPick={(p) => {
                  setLocation(p);
                  clearError("location");
                }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 text-sm">
            <p className="text-slate-700">
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
          <FieldError id="report-location-error" message={errors.location} />
        </div>

        <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={submitting}
            aria-busy={submitting}
        >
          {submitting ? "Göndərilir…" : "Göndər"}
        </Button>
      </form>
  );
}