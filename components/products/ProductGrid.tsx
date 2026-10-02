import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  tone?: "light" | "dark";
  /** Quantas imagens do topo carregam com prioridade (acima da dobra). */
  priorityCount?: number;
  /** 3 colunas no desktop quando há sidebar de filtros; 4 nas vitrines. */
  columns?: 3 | 4;
  className?: string;
}

/** 1 coluna em telas muito estreitas, 2 no celular, 3 a 4 no desktop. */
export function ProductGrid({
  products,
  tone,
  priorityCount = 0,
  columns = 4,
  className,
}: ProductGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-x-3 gap-y-9 min-[21rem]:grid-cols-2 md:grid-cols-3 md:gap-x-5 md:gap-y-12",
        columns === 4 ? "lg:grid-cols-4" : "xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product, index) => (
        <li key={product.id} className="flex">
          <ProductCard
            product={product}
            tone={tone}
            priority={index < priorityCount}
            className="w-full"
          />
        </li>
      ))}
    </ul>
  );
}
