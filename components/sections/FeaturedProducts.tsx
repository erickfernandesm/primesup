import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/types/product";

/** "Escolhas da Prime": os destaques da loja. */
export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="escolhas-titulo" className="pb-16 md:pb-26">
      <div className="shell">
        <SectionHeading
          id="escolhas-titulo"
          eyebrow="Curadoria"
          title="Escolhas da Prime"
          description="O que a gente colocaria na sua sacola hoje."
        />
        <ProductGrid products={products} className="reveal mt-9 md:mt-12" />
      </div>
    </section>
  );
}
