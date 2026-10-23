import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 h-10 text-sm font-semibold " +
  "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
};

export function buttonStyles(variant: Variant = "primary") {
  return `${base} ${variants[variant]}`;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${buttonStyles(variant)} ${className}`}
      {...props}
    />
  );
}
