"use client";

import { ShoppingBag } from "lucide-react";
import { pluralize } from "@/lib/format";
import { useCart } from "./CartProvider";

/** Botão do carrinho no header, com contador. */
export function CartButton() {
  const { count, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={count > 0 ? `Abrir carrinho, ${pluralize(count, "item", "itens")}` : "Abrir carrinho"}
      className="relative grid size-11 place-items-center rounded-xs transition-colors hover:bg-white/10"
    >
      <ShoppingBag className="size-5" aria-hidden />
      {count > 0 && (
        <span
          // A chave reinicia a animação a cada mudança de quantidade.
          key={count}
          aria-hidden
          className="animate-confirm absolute top-1 right-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-white px-1 text-[0.6875rem] leading-none font-bold text-ink tabular-nums"
        >
          {count}
        </span>
      )}
    </button>
  );
}
