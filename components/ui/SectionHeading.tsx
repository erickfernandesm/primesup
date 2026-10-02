import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  tone?: "light" | "dark";
  /** id do <h2>, para aria-labelledby da seção. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = "light",
  id,
  className,
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-night-muted" : "text-muted";

  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-8 gap-y-4", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className={cn("eyebrow mb-3", muted)}>{eyebrow}</p>}
        <h2 id={id} className="font-display text-title text-balance">
          {title}
        </h2>
        {description && <p className={cn("mt-4 max-w-md text-pretty", muted)}>{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-2 py-2 text-sm font-semibold underline-offset-4 hover:underline"
        >
          {action.label}
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      )}
    </div>
  );
}
