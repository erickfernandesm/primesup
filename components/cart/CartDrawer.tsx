"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { buildOrder, checkoutProvider } from "@/lib/checkout";
import { formatInstallments, formatPrice, pluralize } from "@/lib/format";
import { CartLineItem } from "./CartLineItem";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, close } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleCheckout() {
    setPending(true);
    setError(null);
    const result = await checkoutProvider.start(buildOrder(lines));
    setPending(false);

    if (result.kind === "error") {
      setError(result.message);
      return;
    }
    window.open(result.url, "_blank", "noopener,noreferrer");
  }

  return (
    <Sheet open={isOpen} onClose={close} side="cart" label="Carrinho">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
        <h2 className="font-display text-xl">
          Carrinho
          {count > 0 && (
            <span className="ml-2 align-middle text-sm font-medium tracking-normal text-muted">
              {pluralize(count, "item", "itens")}
            </span>
          )}
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Fechar carrinho"
          className="-mr-2 grid size-11 place-items-center transition-colors hover:bg-paper"
        >
          <X className="size-5" aria-hidden />
        </button>
      </header>

      {lines.length === 0 ? (
        <EmptyCart onClose={close} />
      ) : (
        <>
          <ul className="min-h-0 flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-5">
            {lines.map((line) => (
              <CartLineItem key={line.key} line={line} />
            ))}
          </ul>

          <footer className="shrink-0 border-t border-line bg-surface px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <dl className="space-y-1.5">
              <div className="flex justify-between text-sm text-muted">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display text-2xl tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <p className="mt-1 text-right text-sm text-muted">ou {formatInstallments(subtotal)}</p>

            {error && (
              <p role="alert" className="mt-3 text-sm text-signal">
                {error}
              </p>
            )}

            <Button size="lg" full className="mt-5" onClick={handleCheckout} disabled={pending}>
              <WhatsAppIcon className="size-5" />
              {checkoutProvider.actionLabel}
            </Button>
            <p className="mt-3 text-center text-xs text-muted">{checkoutProvider.hint}</p>
            <button
              type="button"
              onClick={close}
              className="mt-2 block h-11 w-full text-sm font-semibold underline-offset-4 hover:underline"
            >
              Continuar comprando
            </button>
          </footer>
        </>
      )}
    </Sheet>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-start justify-center px-5 pb-16">
      <p className="font-display text-3xl text-balance">Seu carrinho está vazio.</p>
      <p className="mt-3 max-w-xs text-muted">
        Escolha seus suplementos e finalize o pedido direto pelo WhatsApp.
      </p>
      <Link href="/produtos/" onClick={onClose} className={buttonStyles({ className: "mt-8" })}>
        Explorar produtos
      </Link>
    </div>
  );
}
