import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-[var(--accent)] text-[var(--accent-ink)] hover:opacity-90",
  outline: "border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--surface-raised)]",
  ghost: "text-[var(--ink)] hover:bg-[var(--surface-raised)]",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

const BASE = "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  to,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  if (to.startsWith("http")) {
    return (
      <a href={to} className={cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}>
      {children}
    </Link>
  );
}
