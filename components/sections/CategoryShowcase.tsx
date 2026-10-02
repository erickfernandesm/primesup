import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pluralize } from "@/lib/format";
import { getCategories, getCategoryCount, getProductBySlug } from "@/lib/products";
import { categoryPath } from "@/lib/seo";
import type { Category } from "@/types/product";

export function CategoryShowcase() {
  const categories = getCategories();
  const primary = categories.filter((category) => category.primary);
  const secondary = categories.filter((category) => !category.primary);

  return (
    <section aria-labelledby="categorias-titulo" className="section-y">
      <div className="shell">
        <SectionHeading
          id="categorias-titulo"
          eyebrow="Categorias"
          title="Encontre seu próximo produto"
          action={{ label: "Ver catálogo completo", href: "/produtos/" }}
        />

        {/* Celular: trilho horizontal com snap. Desktop: quatro colunas, a primeira mais larga. */}
        <ul className="no-scrollbar reveal -mx-4 mt-9 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:mx-0 md:mt-12 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {primary.map((category) => (
            <li key={category.slug} className="w-[74vw] max-w-80 shrink-0 snap-start md:w-auto md:max-w-none">
              <CategoryTile category={category} />
            </li>
          ))}
        </ul>

        {secondary.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 md:mt-8">
            <p className="eyebrow text-muted">Também na Prime</p>
            <ul className="flex flex-wrap gap-2">
              {secondary.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={categoryPath(category)}
                    className="flex h-11 items-center rounded-xs border border-line bg-surface px-4 text-sm font-medium transition-colors hover:border-ink"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryTile({ category }: { category: Category }) {
  const cover = getProductBySlug(category.coverProduct);
  const count = getCategoryCount(category.slug);

  return (
    <Link
      href={categoryPath(category)}
      className="group relative flex h-88 flex-col overflow-hidden rounded-xs bg-tile p-5 md:h-104 md:p-6"
    >
      <div className="relative z-10">
        <h3 className="font-display text-subtitle text-balance">{category.name}</h3>
        <p className="mt-2 text-sm text-muted">{pluralize(count, "produto", "produtos")}</p>
      </div>

      {cover && (
        <ProductImage
          product={cover}
          alt=""
          sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 50vw, 74vw"
          className="absolute -right-[6%] -bottom-[4%] size-[78%] transition-transform duration-500 ease-out-expo group-hover:scale-[1.05]"
        />
      )}

      <span
        aria-hidden
        className="relative z-10 mt-auto grid size-11 place-items-center rounded-xs bg-surface transition-colors duration-200 group-hover:bg-ink group-hover:text-white"
      >
        <ArrowUpRight className="size-5" />
      </span>
    </Link>
  );
}
