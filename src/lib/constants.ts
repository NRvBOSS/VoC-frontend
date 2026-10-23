import type { CategoryId, StatusId } from "../types/issues";

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  description: string;
}[] = [
  {
    id: "road",
    label: "Yol problemləri",
    description: "Çuxurlar, zədələnmiş yollar və s.",
  },
  {
    id: "waste",
    label: "Zibil və tullantılar",
    description: "Tullantı yığılmaları, təmizlik problemləri.",
  },
  {
    id: "streetlight",
    label: "Küçə lampalarının nasazlığı",
    description: "İşıqlandırma ilə bağlı problemlər.",
  },
  {
    id: "sidewalk",
    label: "Səkilər və təhlükəsizlik",
    description: "Səkilərin vəziyyəti, piyadalar üçün təhlükə.",
  },
  {
    id: "other",
    label: "Digər problemlər",
    description: "Digər ictimai məkan problemləri.",
  },
];

// Tailwind tam sinif adlarını görməlidir, ona görə siniflər dinamik yığılmır.
export const STATUSES: Record<
  StatusId,
  { label: string; markerColor: string; badge: string; dot: string }
> = {
  open: {
    label: "Açıq",
    markerColor: "#F59E0B",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
  },
  in_progress: {
    label: "İşlənilir",
    markerColor: "#3B82F6",
    badge: "bg-blue-50 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
  },
  resolved: {
    label: "Həll olunub",
    markerColor: "#16A34A",
    badge: "bg-green-50 text-green-800 border-green-200",
    dot: "bg-green-600",
  },
};

export const STATUS_ORDER: StatusId[] = ["open", "in_progress", "resolved"];
