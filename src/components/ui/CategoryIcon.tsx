import {
    Construction,
    Ellipsis,
    Footprints,
    Lightbulb,
    Trash2,
    type LucideIcon,
    type LucideProps,
} from "lucide-react";
import type { CategoryId } from "@/types/issue";

const ICONS = {
    road: Construction,
    waste: Trash2,
    streetlight: Lightbulb,
    sidewalk: Footprints,
    other: Ellipsis,
} satisfies Record<CategoryId, LucideIcon>;

export default function CategoryIcon({
                                         id,
                                         ...props
                                     }: { id: CategoryId } & LucideProps) {
    const Icon = ICONS[id];
    return <Icon aria-hidden strokeWidth={1.75} {...props} />;
}