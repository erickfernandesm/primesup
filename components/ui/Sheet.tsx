"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Side = "left" | "right" | "top" | "bottom" | "cart";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  side: Side;
  /** Nome acessível do painel. */
  label: string;
  /** "dark" pinta o painel com o preto da marca. */
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}

/**
 * Painel modal sobre o <dialog> nativo: foco preso, Esc e fundo inerte vêm
 * do navegador. As animações estão em globals.css (.sheet).
 */
export function Sheet({ open, onClose, side, label, tone = "light", className, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Clique fora do conteúdo (no backdrop) fecha o painel.
  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={ref}
      data-side={side}
      data-tone={tone}
      aria-label={label}
      className={cn("sheet", className)}
      onClose={onClose}
      onClick={handleClick}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col">{children}</div>
    </dialog>
  );
}
