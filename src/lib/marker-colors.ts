import type { StatusId } from "@/types/issue";

// Marker və legend nişanı içindəki simvolun rəngi.
// Narıncı fonda ağ simvolun kontrastı zəifdir, ona görə tünd mürəkkəb rəngi.
export const ON_MARKER: Record<StatusId, string> = {
    open: "#0F1B2D",
    in_progress: "#FFFFFF",
    resolved: "#FFFFFF",
};