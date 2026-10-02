"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatPrice } from "@/lib/format";
import { productPath } from "@/lib/seo";
import type { CartLine } from "@/types/cart";
import { useCart } from "./CartProvider";

export function CartLineItem({ line }: { line: CartLine }) {
  const { setQuantity, remove, close } = useCart();
  const { product } = line;

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={productPath(product)}
        onClick={close}
        className="relative size-24 shrink-0 overflow-hidden rounded-xs bg-tile"
        tabIndex={-1}
        aria-hidden
      >
        <ProductImage product={product} sizes="96px" className="absolute inset-0 size-full p-2" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow text-muted">{product.brand}</p>
            <Link
              href={productPath(product)}
              onClick={close}
              className="mt-1 block text-sm leading-snug font-semibold underline-offset-4 hover:underline"
            >
              {product.name}
            </Link>
            {line.flavor && <p className="mt-0.5 text-sm text-muted">{line.flavor}</p>}
          </div>
          <button
            type="button"
            onClick={() => remove(line.key)}
            aria-label={`Remover ${product.name} do carrinho`}
            className="-mt-2 -mr-2 grid size-10 shrink-0 place-items-center text-muted transition-colors hover:text-ink"
          >
            <Trash2 className="size-4" aria-hidden />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <QuantityStepper
            size="sm"
            value={line.quantity}
            onChange={(quantity) => setQuantity(line.key, quantity)}
            label={product.name}
          />
          <p className="font-semibold tabular-nums">{formatPrice(line.lineTotal)}</p>
        </div>
      </div>
    </li>
  );
}
