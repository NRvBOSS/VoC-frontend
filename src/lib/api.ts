import type { CategoryId } from "@/types/issue";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

export interface CreateIssuePayload {
    category: CategoryId;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
}

export type ApiResult = { ok: true } | { ok: false; message: string };

const GENERIC_ERROR = "Bildiriş göndərilmədi. Bir az sonra yenidən cəhd edin.";

export async function createIssue(
    payload: CreateIssuePayload
): Promise<ApiResult> {
    if (!API_BASE_URL) {
        return { ok: false, message: "Xidmət hazırda əlçatan deyil." };
    }

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
            return { ok: false, message: "Çox sayda sorğu göndərildi. Bir az gözləyin." };
        }

        return { ok: false, message: GENERIC_ERROR };
    } catch {
        return {
            ok: false,
            message: "Serverlə əlaqə qurulmadı. İnternet bağlantınızı yoxlayın.",
        };
    }
}