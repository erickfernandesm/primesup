import Link from "next/link";
import { ProductImage } from "@/components/products/ProductImage";
import { ProductPrice } from "@/components/products/ProductPrice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productPath } from "@/lib/seo";
import type { Product } from "@/types/product";

/** "Mais procurados": lista compacta, para decidir rápido. */
export function BestSellers({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="procurados-titulo" className="section-y bg-surface">
      <div className="shell">
        <SectionHeading
          id="procurados-titulo"
          eyebrow="Na boca do povo"
          title="Mais procurados"
          description="Os básicos que nunca saem da rotina de quem treina."
        />

        <ul className="reveal mt-9 grid gap-x-10 border-t border-line md:mt-12 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <li key={product.id} className="border-b border-line">
              <Link href={productPath(product)} className="group flex items-center gap-4 py-4">
                <span className="relative size-20 shrink-0 overflow-hidden rounded-xs bg-tile md:size-24">
                  <ProductImage
                    product={product}
                    alt=""
                    sizes="96px"
                    className="absolute inset-0 size-full p-2 transition-transform duration-500 ease-out-expo group-hover:scale-[1.06]"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="eyebrow block text-muted">{product.brand}</span>
                  <span className="mt-1 block leading-snug font-medium underline-offset-4 group-hover:underline">
                    {product.name}
                  </span>
                  <ProductPrice product={product} className="mt-1.5 text-[0.9375rem]" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
