"use client";

import { X } from "lucide-react";
import { categories, formatLabels } from "@/data/categories";
import { priceRanges, type CatalogFilters } from "@/lib/catalog";

interface ActiveFiltersProps {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onClear: () => void;
}

interface Chip {
  key: string;
  label: string;
  remove: () => void;
}

/** Monta um chip removível para cada filtro ativo. */
function buildChips(filters: CatalogFilters, onChange: ActiveFiltersProps["onChange"]): Chip[] {
  const without = <T,>(values: T[], value: T) => values.filter((item) => item !== value);
  const range = priceRanges.find((candidate) => candidate.id === filters.priceRange);

  return [
    ...filters.categories.map((slug) => ({
      key: `categoria-${slug}`,
      label: categories.find((category) => category.slug === slug)?.name ?? slug,
      remove: () => onChange({ categories: without(filters.categories, slug) }),
    })),
    ...(range
      ? [{ key: "preco", label: range.label, remove: () => onChange({ priceRange: null }) }]
      : []),
    ...filters.formats.map((format) => ({
      key: `tipo-${format}`,
      label: formatLabels[format] ?? format,
      remove: () => onChange({ formats: without(filters.formats, format) }),
    })),
    ...filters.brands.map((brand) => ({
      key: `marca-${brand}`,
      label: brand,
      remove: () => onChange({ brands: without(filters.brands, brand) }),
    })),
    ...(filters.offersOnly
      ? [{ key: "ofertas", label: "Ofertas", remove: () => onChange({ offersOnly: false }) }]
      : []),
    ...(filters.newOnly
      ? [{ key: "novidades", label: "Novidades", remove: () => onChange({ newOnly: false }) }]
      : []),
  ];
}

export function ActiveFilters({ filters, onChange, onClear }: ActiveFiltersProps) {
  const chips = buildChips(filters, onChange);
  if (chips.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Filtros ativos">
      {chips.map((chip) => (
        <li key={chip.key}>
          <button
            type="button"
            onClick={chip.remove}
            className="flex h-9 items-center gap-1.5 rounded-xs border border-line bg-surface pr-2 pl-3 text-sm transition-colors hover:border-ink"
          >
            {chip.label}
            <X className="size-3.5 text-muted" aria-hidden />
            <span className="sr-only">Remover filtro</span>
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={onClear}
          className="h-9 px-2 text-sm font-semibold underline underline-offset-4"
        >
          Limpar tudo
        </button>
      </li>
    </ul>
  );
}
