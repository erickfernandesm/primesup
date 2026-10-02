"use client";

import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

const FEEDBACK_MS = 1400;

/** Adiciona ao carrinho direto do card, com confirmação visual. */
export function QuickAddButton({ product, className }: { product: Product; className?: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [added]);

  function handleClick() {
    add(product);
    setAdded(true);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Adicionar ${product.name} ao carrinho`}
      className={cn(
        "grid size-11 place-items-center rounded-xs bg-ink text-white transition-[background-color,transform] duration-200 hover:bg-ink-hover active:scale-95",
        className,
      )}
    >
      {added ? (
        <Check className="animate-confirm size-5" aria-hidden />
      ) : (
        <Plus className="size-5" aria-hidden />
      )}
      <span aria-live="polite" className="sr-only">
        {added ? "Adicionado ao carrinho" : ""}
      </span>
    </button>
  );
}
