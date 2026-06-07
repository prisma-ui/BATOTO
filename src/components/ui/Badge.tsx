import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  className?: string;
}

export function Badge({ children, variant = "secondary", className = "" }: BadgeProps) {
  const baseStyle = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider select-none";
  let variantStyle = "bg-[var(--color-surface-3)] text-gray-200";

  if (variant === "primary") {
    variantStyle = "bg-[var(--color-primary)] text-[var(--color-background)]";
  } else if (variant === "accent") {
    variantStyle = "bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30";
  } else if (variant === "outline") {
    variantStyle = "border border-[var(--color-border)] text-gray-300";
  } else if (variant === "ghost") {
    variantStyle = "bg-transparent text-gray-400";
  }

  return (
    <span className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </span>
  );
}
