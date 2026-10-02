import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

interface ProductPriceProps {
  product: Pick<Product, "price" | "oldPrice">;
  tone?: "light" | "dark";
  className?: string;
}

/** Preço atual e, quando houver, o preço anterior riscado. */
export function ProductPrice({ product, tone = "light", className }: ProductPriceProps) {
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2 tabular-nums", className)}>
      <span className="font-semibold">
        <span className="sr-only">Preço: </span>
        {formatPrice(product.price)}
      </span>
      {product.oldPrice && (
        <s className={cn("text-sm", tone === "dark" ? "text-night-muted" : "text-muted")}>
          <span className="sr-only">De: </span>
          {formatPrice(product.oldPrice)}
        </s>
      )}
    </p>
  );
}
