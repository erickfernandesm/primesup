"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";

/**
 * Galeria do produto.
 * Celular: carrossel por arrasto (scroll-snap nativo) com indicadores.
 * Desktop: imagem principal com miniaturas ao lado.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = product.images.length;

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  }

  function goTo(index: number) {
    setActive(index);
    const track = trackRef.current;
    track?.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-4">
      <div className="relative min-w-0 flex-1">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex aspect-square snap-x snap-mandatory overflow-x-auto rounded-xs bg-tile lg:overflow-hidden"
        >
          {product.images.map((image, index) => (
            <div key={image} className="relative size-full shrink-0 snap-center">
              <ProductImage
                product={product}
                index={index}
                priority={index === 0}
                sizes="(min-width: 64rem) 50vw, 100vw"
                alt={`${product.name} — ${product.brand}, foto ${index + 1} de ${count}`}
                className="absolute inset-0 size-full p-[8%]"
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 lg:hidden" aria-hidden>
            {product.images.map((image, index) => (
              <span
                key={image}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  index === active ? "w-5 bg-ink" : "w-1.5 bg-ink/25",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {count > 1 && (
        <ul className="hidden w-20 shrink-0 flex-col gap-3 lg:flex xl:w-24">
          {product.images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ver foto ${index + 1} de ${count}`}
                aria-current={index === active}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-xs bg-tile outline-offset-2 transition-shadow",
                  index === active ? "ring-2 ring-ink" : "hover:ring-1 hover:ring-ink/40",
                )}
              >
                <ProductImage
                  product={product}
                  index={index}
                  sizes="96px"
                  alt=""
                  className="absolute inset-0 size-full p-1.5"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
