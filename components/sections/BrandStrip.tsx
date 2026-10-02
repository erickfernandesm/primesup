import Link from "next/link";
import { getAllProducts } from "@/lib/products";

const MAX_BRANDS = 9;

/** Marcas com mais produtos no catálogo, da maior para a menor. */
function getTopBrands(): string[] {
  const counts = new Map<string, number>();
  for (const product of getAllProducts()) {
    counts.set(product.brand, (counts.get(product.brand) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_BRANDS)
    .map(([brand]) => brand);
}

/** Faixa de marcas logo abaixo do hero; cada nome filtra o catálogo. */
export function BrandStrip() {
  return (
    <section aria-label="Marcas" className="border-t border-night-line bg-ink text-white">
      <div className="shell flex items-center gap-6 max-md:pr-0">
        <p className="eyebrow shrink-0 text-night-muted max-sm:hidden">Marcas</p>
        <ul className="no-scrollbar flex flex-1 items-center gap-x-1 overflow-x-auto md:justify-between">
          {getTopBrands().map((brand) => (
            <li key={brand} className="shrink-0">
              <Link
                href={`/produtos/?marca=${encodeURIComponent(brand)}`}
                className="flex h-14 items-center px-2.5 text-sm font-semibold tracking-wide whitespace-nowrap text-night-muted uppercase transition-colors first:pl-0 hover:text-white"
              >
                {brand}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
