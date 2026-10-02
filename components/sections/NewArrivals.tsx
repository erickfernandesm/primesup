import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductImage } from "@/components/products/ProductImage";
import { ProductPrice } from "@/components/products/ProductPrice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productPath } from "@/lib/seo";
import type { Product } from "@/types/product";

/** "Chegando na Prime": um lançamento em destaque e os demais ao lado. */
export function NewArrivals({ products }: { products: Product[] }) {
  const [lead, ...rest] = products;
  if (!lead) return null;

  return (
    <section aria-labelledby="novidades-titulo" className="section-y">
      <div className="shell">
        <SectionHeading
          id="novidades-titulo"
          eyebrow="Novidades"
          title="Chegando na Prime"
          action={{ label: "Ver todas as novidades", href: "/produtos/?novidades=1" }}
        />

        {/* Celular: destaque em cima, cards em duas colunas. Desktop: destaque largo + dois cards na mesma linha. */}
        <ul className="reveal mt-9 grid grid-cols-2 gap-x-3 gap-y-9 md:mt-12 md:grid-cols-4 md:gap-x-5">
          <li className="col-span-2 flex">
            <LeadArrival product={lead} />
          </li>
          {rest.map((product) => (
            <li key={product.id} className="flex">
              <ProductCard
                product={product}
                sizes="(min-width: 48rem) 25vw, 50vw"
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LeadArrival({ product }: { product: Product }) {
  return (
    <Link
      href={productPath(product)}
      className="group flex w-full flex-col overflow-hidden rounded-xs bg-tile"
    >
      <div className="relative min-h-72 flex-1">
        <ProductImage
          product={product}
          alt=""
          sizes="(min-width: 48rem) 50vw, 100vw"
          className="absolute inset-0 size-full p-[8%] transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex items-end justify-between gap-4 p-5 md:p-7">
        <div className="min-w-0">
          <p className="eyebrow text-muted">Acabou de chegar · {product.brand}</p>
          <h3 className="font-display text-subtitle mt-2 text-balance">{product.name}</h3>
          <ProductPrice product={product} className="mt-3" />
        </div>
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-xs bg-ink text-white transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Link>
  );
}
