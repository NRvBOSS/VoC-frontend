import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
    "transition-[background-color,border-color,transform] duration-150 active:translate-y-px " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 " +
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0";

const sizes: Record<Size, string> = {
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
};

const variants: Record<Variant, string> = {
    primary:
        "bg-blue-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(15_27_45/0.25)] hover:bg-blue-700",
    secondary:
        "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50",
};

export function buttonStyles(variant: Variant = "primary", size: Size = "md") {
    return `${base} ${sizes[size]} ${variants[variant]}`;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

export default function Button({
                                   variant = "primary",
                                   size = "md",
                                   className = "",
                                   type = "button",
                                   ...props
                               }: ButtonProps) {
    return (
        <button
            type={type}
            className={`${buttonStyles(variant, size)} ${className}`}
            {...props}
        />
    );
}