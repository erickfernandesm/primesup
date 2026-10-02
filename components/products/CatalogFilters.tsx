"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { categories, formatLabels } from "@/data/categories";
import { priceRanges, toggleValue, type CatalogFilters as Filters } from "@/lib/catalog";
import type { Product, ProductFormat } from "@/types/product";

interface CatalogFiltersProps {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  /** Produtos considerados para montar as opções (já com os filtros fixos da página). */
  scope: Product[];
  hideCategory?: boolean;
  hideOffers?: boolean;
}

function countBy<T extends string>(products: Product[], pick: (product: Product) => T): Map<T, number> {
  const counts = new Map<T, number>();
  for (const product of products) counts.set(pick(product), (counts.get(pick(product)) ?? 0) + 1);
  return counts;
}

export function CatalogFilters({ filters, onChange, scope, hideCategory, hideOffers }: CatalogFiltersProps) {
  const categoryCounts = countBy(scope, (product) => product.category);
  const brandCounts = countBy(scope, (product) => product.brand);
  const formatCounts = countBy(scope, (product) => product.format);
  const brands = [...brandCounts.keys()].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const formats = Object.keys(formatLabels) as ProductFormat[];

  return (
    <div className="divide-y divide-line border-y border-line">
      {!hideCategory && (
        <FilterGroup title="Categoria">
          {categories
            .filter((category) => categoryCounts.has(category.slug))
            .map((category) => (
              <CheckOption
                key={category.slug}
                label={category.name}
                count={categoryCounts.get(category.slug)}
                checked={filters.categories.includes(category.slug)}
                onChange={() => onChange({ categories: toggleValue(filters.categories, category.slug) })}
              />
            ))}
        </FilterGroup>
      )}

      <FilterGroup title="Faixa de preço">
        {priceRanges.map((range) => (
          <CheckOption
            key={range.id}
            label={range.label}
            checked={filters.priceRange === range.id}
            onChange={() => onChange({ priceRange: filters.priceRange === range.id ? null : range.id })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Tipo de produto">
        {formats
          .filter((format) => formatCounts.has(format))
          .map((format) => (
            <CheckOption
              key={format}
              label={formatLabels[format]}
              count={formatCounts.get(format)}
              checked={filters.formats.includes(format)}
              onChange={() => onChange({ formats: toggleValue(filters.formats, format) })}
            />
          ))}
      </FilterGroup>

      <FilterGroup title="Marca" defaultOpen={filters.brands.length > 0}>
        {brands.map((brand) => (
          <CheckOption
            key={brand}
            label={brand}
            count={brandCounts.get(brand)}
            checked={filters.brands.includes(brand)}
            onChange={() => onChange({ brands: toggleValue(filters.brands, brand) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Mostrar apenas">
        {!hideOffers && (
          <CheckOption
            label="Ofertas"
            checked={filters.offersOnly}
            onChange={() => onChange({ offersOnly: !filters.offersOnly })}
          />
        )}
        <CheckOption
          label="Novidades"
          checked={filters.newOnly}
          onChange={() => onChange({ newOnly: !filters.newOnly })}
        />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="flex h-13 list-none items-center justify-between text-sm font-semibold">
        {title}
        <ChevronDown
          className="size-4 transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="flex flex-col pb-4">{children}</div>
    </details>
  );
}

function CheckOption({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex min-h-10 cursor-pointer items-center gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4.5 shrink-0 cursor-pointer appearance-none rounded-xs border border-ink/35 bg-surface bg-center bg-no-repeat transition-colors checked:border-ink checked:bg-ink checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222.2%22%3E%3Cpath%20d%3D%22m3.5%208.5%203%203%206-7%22%2F%3E%3C%2Fsvg%3E')]"
      />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-muted tabular-nums">{count}</span>}
    </label>
  );
}
