"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { NavLink } from "./navigation";

/** Menu suspenso "Produtos" do header no desktop. */
export function CategoriesMenu({ categories }: { categories: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointer(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 items-center gap-1.5 rounded-xs px-3 text-sm font-medium transition-colors hover:bg-white/10"
      >
        Produtos
        <ChevronDown
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-0 mt-3 w-80 rounded-xs bg-surface p-2 text-ink shadow-raised"
      >
        <ul>
          {categories.map((category) => (
            <li key={category.href}>
              <Link
                href={category.href}
                onClick={close}
                className="flex h-11 items-center justify-between rounded-xs px-3 text-[0.9375rem] font-medium transition-colors hover:bg-paper"
              >
                {category.label}
                <span className="text-xs font-normal text-muted tabular-nums">{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/produtos/"
          onClick={close}
          className="group mt-2 flex h-12 items-center justify-between border-t border-line px-3 text-sm font-semibold"
        >
          Ver todos os produtos
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
