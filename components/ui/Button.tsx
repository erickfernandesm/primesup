import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "inverse" | "outline" | "outline-inverse" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs font-semibold whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform] duration-200 " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-hover",
  inverse: "bg-white text-ink hover:bg-paper",
  outline: "border border-ink/25 text-ink hover:border-ink",
  "outline-inverse": "border border-white/30 text-white hover:border-white",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

interface StyleOptions {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
}

/** Classes de botão, para aplicar também em <a> e <Link>. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  full = false,
  className,
}: StyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], full && "w-full", className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyleOptions;

export function Button({ variant, size, full, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, full, className })} {...props} />;
}
