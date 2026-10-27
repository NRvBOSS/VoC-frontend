import { CATEGORIES, STATUS_ORDER } from "@/lib/constants";
import type { CategoryId, Issue, StatusId } from "@/types/issue";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

const UNAVAILABLE = "Xidmət hazırda əlçatan deyil.";
const NETWORK_ERROR =
    "Serverlə əlaqə qurulmadı. İnternet bağlantınızı yoxlayın.";

/* ---------- Problem yaratmaq ---------- */

export interface CreateIssuePayload {
    category: CategoryId;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
}

export type ApiResult = { ok: true } | { ok: false; message: string };

export async function createIssue(
    payload: CreateIssuePayload
): Promise<ApiResult> {
    if (!API_BASE_URL) return { ok: false, message: UNAVAILABLE };

    try {
        const res = await fetch(`${API_BASE_URL}/issues`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(15000),
        });

        if (res.ok) return { ok: true };

        if (res.status === 400) {
            // Go http.Error düz mətn qaytarır (validasiya mesajı)
            const text = (await res.text()).trim();
            return {
                ok: false,
                message:
                    text && text.length <= 200
                        ? text
                        : "Daxil edilən məlumatlar düzgün deyil.",
            };
        }

        if (res.status === 429) {
            return {
                ok: false,
                message: "Çox sayda sorğu göndərildi. Bir az gözləyin.",
            };
        }

        return {
            ok: false,
            message: "Bildiriş göndərilmədi. Bir az sonra yenidən cəhd edin.",
        };
    } catch {
        return { ok: false, message: NETWORK_ERROR };
    }
}

/* ---------- Problemləri oxumaq ---------- */

export type IssuesResult =
    | { ok: true; issues: Issue[] }
    | { ok: false; message: string };

function isCategoryId(value: unknown): value is CategoryId {
    return CATEGORIES.some((c) => c.id === value);
}

function isStatusId(value: unknown): value is StatusId {
    return STATUS_ORDER.some((s) => s === value);
}

function isFiniteNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
}

// Backend cavabının bir sətrini yoxlayıb frontend tipinə çevirir.
// Düzgün formada deyilsə null qaytarır (həmin sətir göstərilmir).
function toIssue(raw: unknown): Issue | null {
    if (typeof raw !== "object" || raw === null) return null;
    const r = raw as Record<string, unknown>;

    const idOk =
        isFiniteNumber(r.id) || (typeof r.id === "string" && r.id !== "");
    if (!idOk) return null;

    if (typeof r.title !== "string" || typeof r.description !== "string") {
        return null;
    }
    if (!isCategoryId(r.category) || !isStatusId(r.status)) return null;

    if (!isFiniteNumber(r.latitude) || !isFiniteNumber(r.longitude)) return null;
    if (r.latitude < -90 || r.latitude > 90) return null;
    if (r.longitude < -180 || r.longitude > 180) return null;

    if (
        typeof r.created_at !== "string" ||
        Number.isNaN(Date.parse(r.created_at))
    ) {
        return null;
    }

    return {
        id: String(r.id),
        title: r.title,
        description: r.description,
        category: r.category,
        status: r.status,
        lat: r.latitude,
        lng: r.longitude,
        createdAt: r.created_at,
    };
}

export async function getIssues(): Promise<IssuesResult> {
    if (!API_BASE_URL) return { ok: false, message: UNAVAILABLE };

    try {
        const res = await fetch(`${API_BASE_URL}/issues`, {
            cache: "no-store",
            signal: AbortSignal.timeout(15000),
        });

        if (!res.ok) {
            return {
                ok: false,
                message: "Problemlər yüklənmədi. Bir az sonra yenidən cəhd edin.",
            };
        }

        const data: unknown = await res.json();

        // Go-da boş siyahı (nil slice) null kimi gələ bilər
        if (data === null) return { ok: true, issues: [] };

        if (!Array.isArray(data)) {
            return { ok: false, message: "Serverdən gözlənilməz cavab gəldi." };
        }

        const issues = data
            .map(toIssue)
            .filter((issue): issue is Issue => issue !== null);

        return { ok: true, issues };
    } catch {
        return { ok: false, message: NETWORK_ERROR };
    }
}