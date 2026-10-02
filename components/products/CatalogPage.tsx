import { Suspense } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { Product } from "@/types/product";
import { Catalog, type CatalogProps } from "./Catalog";
import { ProductGrid } from "./ProductGrid";

interface CatalogPageProps extends CatalogProps {
  trail: Crumb[];
  title: string;
  description?: string;
  /** Produtos renderizados no HTML estático, antes de o catálogo interativo assumir. */
  staticProducts: Product[];
}

/** Estrutura comum às páginas de listagem: catálogo, categoria, ofertas e busca. */
export function CatalogPage({ trail, title, description, staticProducts, locked }: CatalogPageProps) {
  return (
    <div className="shell pt-6 pb-20 md:pt-8 md:pb-28">
      <Breadcrumbs trail={trail} />

      <header className="mt-6 mb-8 max-w-3xl md:mt-8 md:mb-12">
        <h1 className="font-display text-title text-balance">{title}</h1>
        {description && <p className="mt-4 max-w-xl text-pretty text-muted">{description}</p>}
      </header>

      {/*
        O catálogo lê os filtros da URL, o que só existe no navegador.
        O fallback garante a lista completa no HTML estático (SEO e carregamento).
      */}
      <Suspense fallback={<ProductGrid products={staticProducts} priorityCount={4} />}>
        <Catalog locked={locked} />
      </Suspense>
    </div>
  );
}
