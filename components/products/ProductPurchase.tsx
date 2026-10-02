"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Button, buttonStyles } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { productInquiryMessage } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

/** Escolha de sabor e quantidade, com as três formas de comprar. */
export function ProductPurchase({ product }: { product: Product }) {
  const { add, open } = useCart();
  const flavors = product.flavors ?? [];
  const [flavor, setFlavor] = useState<string | null>(flavors[0] ?? null);
  const [quantity, setQuantity] = useState(1);

  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(timer);
  }, [added]);

  /** Adiciona e segue navegando: a confirmação aparece no próprio botão. */
  function addToCart() {
    add(product, { flavor, quantity });
    setAdded(true);
  }

  /** Adiciona e já abre o carrinho, a um toque de finalizar o pedido. */
  function buyNow() {
    add(product, { flavor, quantity });
    open();
  }

  const addLabel = added ? (
    <>
      <Check className="animate-confirm size-5" aria-hidden />
      Adicionado
    </>
  ) : (
    "Adicionar ao carrinho"
  );

  return (
    <div className="space-y-7">
      {flavors.length > 0 && (
        <fieldset>
          <legend className="text-sm">
            <span className="text-muted">Sabor: </span>
            <span className="font-semibold">{flavor}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {flavors.map((option) => (
              <label
                key={option}
                className={cn(
                  "flex h-11 cursor-pointer items-center rounded-xs border px-4 text-sm font-medium transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2",
                  option === flavor
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-surface hover:border-ink",
                )}
              >
                <input
                  type="radio"
                  name="sabor"
                  value={option}
                  checked={option === flavor}
                  onChange={() => setFlavor(option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            A disponibilidade de cada sabor é confirmada no atendimento.
          </p>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
        <Button size="md" className="min-w-0 flex-1 basis-48" onClick={addToCart}>
          <span aria-live="polite" className="contents">
            {addLabel}
          </span>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="outline" onClick={buyNow}>
          Comprar agora
        </Button>
        <WhatsAppLink
          message={productInquiryMessage(product, flavor)}
          className={buttonStyles({ variant: "outline" })}
        >
          <WhatsAppIcon className="size-5" />
          Comprar via WhatsApp
        </WhatsAppLink>
      </div>

      {/* Barra fixa no celular: preço e compra sempre ao alcance do polegar. */}
      <div
        data-buy-bar
        className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-line bg-surface px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      >
        <div className="min-w-0">
          <p className="truncate text-xs text-muted">{flavor ?? product.brand}</p>
          <p className="font-semibold tabular-nums">{formatPrice(product.price * quantity)}</p>
        </div>
        <Button className="ml-auto shrink-0" onClick={buyNow}>
          Comprar
        </Button>
      </div>
    </div>
  );
}
