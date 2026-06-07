import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "secondary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-bold tracking-wide rounded-lg transition-all duration-200 outline-none select-none disabled:opacity-50 disabled:pointer-events-none";

  let variantStyle = "bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] text-white border border-[var(--color-border)]";
  if (variant === "primary") {
    variantStyle = "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-background)]";
  } else if (variant === "outline") {
    variantStyle = "bg-transparent hover:bg-[var(--color-surface-2)] text-gray-300 border border-[var(--color-border)] hover:text-white";
  } else if (variant === "danger") {
    variantStyle = "bg-red-600 hover:bg-red-700 text-white";
  }

  let sizeStyle = "px-4 py-2 text-sm";
  if (size === "sm") {
    sizeStyle = "px-3 py-1.5 text-xs";
  } else if (size === "lg") {
    sizeStyle = "px-6 py-3 text-base";
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}
export default Button;
