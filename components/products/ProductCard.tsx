import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { getDiscount } from "@/lib/format";
import { productPath } from "@/lib/seo";
import type { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";
import { ProductPrice } from "./ProductPrice";
import { QuickAddButton } from "./QuickAddButton";

interface ProductCardProps {
  product: Product;
  tone?: "light" | "dark";
  /** `sizes` da imagem; o padrão cobre o grid de 2 a 4 colunas. */
  sizes?: string;
  priority?: boolean;
  className?: string;
}

const DEFAULT_SIZES =
  "(min-width: 80rem) 320px, (min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw";

/** Produtos com mais de um sabor pedem a escolha na página do produto. */
const needsFlavorChoice = (product: Product) => (product.flavors?.length ?? 0) > 1;

export function ProductCard({
  product,
  tone = "light",
  sizes = DEFAULT_SIZES,
  priority,
  className,
}: ProductCardProps) {
  const discount = getDiscount(product);
  const href = productPath(product);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-4/5 overflow-hidden rounded-xs bg-tile">
        <ProductImage
          product={product}
          sizes={sizes}
          priority={priority}
          alt=""
          className="absolute inset-0 size-full p-[9%] transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]"
        />

        <div className="absolute top-2 left-2 flex gap-1 md:top-3 md:left-3">
          {product.isNew && (
            <span className="rounded-xs bg-ink px-1.5 py-1 text-[0.6875rem] leading-none font-bold text-white">
              Novo
            </span>
          )}
          {discount && (
            <span className="rounded-xs bg-surface px-1.5 py-1 text-[0.6875rem] leading-none font-bold text-signal">
              −{discount}%
            </span>
          )}
        </div>

        {/* Fica acima do link que cobre o card (z-10). */}
        <div className="absolute right-2 bottom-2 z-10 md:right-3 md:bottom-3">
          {needsFlavorChoice(product) ? (
            <Link
              href={href}
              aria-label={`Escolher sabor de ${product.name}`}
              className="grid size-11 place-items-center rounded-xs bg-surface text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
            >
              <ArrowUpRight className="size-5" aria-hidden />
            </Link>
          ) : (
            <QuickAddButton product={product} />
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-1 flex-col md:mt-4">
        <p className={cn("eyebrow", tone === "dark" ? "text-night-muted" : "text-muted")}>
          {product.brand}
        </p>
        <h3 className="mt-1.5 text-[0.9375rem] leading-snug font-medium text-pretty">
          {/* O link cobre o card inteiro; a foto e o texto viram área de clique. */}
          <Link href={href} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <ProductPrice product={product} tone={tone} className="mt-2" />
      </div>
    </article>
  );
}
