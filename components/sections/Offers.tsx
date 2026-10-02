import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { buttonStyles } from "@/components/ui/Button";
import { getDiscount } from "@/lib/format";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/types/product";

/** "Ofertas Prime": seção escura, com o maior desconto real em evidência. */
export function Offers({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  // O "até X%" considera todas as ofertas do catálogo, não só as quatro da vitrine.
  const allOffers = getAllProducts().filter((product) => product.isOffer);
  const topDiscount = Math.max(0, ...allOffers.map((product) => getDiscount(product) ?? 0));

  return (
    <section aria-labelledby="ofertas-titulo" className="section-y bg-ink text-white">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-night-muted">Ofertas Prime</p>
          <h2 id="ofertas-titulo" className="font-display text-title mt-3 text-balance">
            Produtos selecionados com condições especiais.
          </h2>

          {topDiscount > 0 && (
            <p className="mt-8 flex items-baseline gap-3 lg:mt-12">
              <span className="text-sm text-night-muted">até</span>
              <span className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-none text-signal tabular-nums">
                −{topDiscount}%
              </span>
            </p>
          )}

          <Link href="/ofertas/" className={buttonStyles({ variant: "inverse", className: "mt-8 max-sm:w-full" })}>
            Ver todas as ofertas
          </Link>
        </div>

        <ul className="reveal grid grid-cols-1 gap-x-3 gap-y-9 min-[21rem]:grid-cols-2 md:gap-x-5 md:gap-y-12">
          {products.map((product) => (
            <li key={product.id} className="flex">
              <ProductCard
                product={product}
                tone="dark"
                sizes="(min-width: 64rem) 30vw, 50vw"
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
