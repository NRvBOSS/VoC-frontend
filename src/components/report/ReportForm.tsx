"use client";

import { useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/constants";
import type { CategoryId } from "@/types/issue";
import type { LatLng } from "./LocationPicker";

// Leaflet window-dan istifadə edir, ona görə serverdə yüklənmir
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
  const [checked, setChecked] = useState(false);

  function clearError(key: FieldKey) {
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setChecked(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate({ category, title, description, location });
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((k) => nextErrors[k]);
    if (firstInvalid) {
      setChecked(false);
      document.getElementById(`report-${firstInvalid}`)?.focus();
      return;
    }
    // Backend endpoint-i təsdiqlənməyib: heç nə göndərilmir (Mərhələ 7)
    setChecked(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        Diqqət: göndərmə hələ qoşulmayıb. Forma yoxlanılır, lakin heç bir
        məlumat göndərilmir və ya saxlanılmır.
      </p>
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
      {checked && (
        <p
          role="status"
          className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800"
        >
          Forma düzgün doldurulub, lakin göndərmə hələ qoşulmayıb. Heç bir
          məlumat göndərilmədi və saxlanılmadı.
        </p>
      )}
      <Button type="submit" className="w-full sm:w-auto">
        Göndər
      </Button>{" "}
    </form>
  );
}
