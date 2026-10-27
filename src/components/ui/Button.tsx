import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold " +
    "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 " +
    "disabled:cursor-not-allowed disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
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