import { getDiscount } from "@/lib/format";
import { searchProducts } from "@/lib/search";
import type { CategorySlug, Product, ProductFormat } from "@/types/product";

export type SortId = "relevancia" | "menor-preco" | "maior-preco" | "maior-desconto" | "novidades";

export const sortOptions: Array<{ id: SortId; label: string }> = [
  { id: "relevancia", label: "Relevância" },
  { id: "menor-preco", label: "Menor preço" },
  { id: "maior-preco", label: "Maior preço" },
  { id: "maior-desconto", label: "Maior desconto" },
  { id: "novidades", label: "Novidades primeiro" },
];

export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const priceRanges: PriceRange[] = [
  { id: "ate-50", label: "Até R$ 50", min: 0, max: 50 },
  { id: "50-100", label: "R$ 50 a R$ 100", min: 50, max: 100 },
  { id: "100-200", label: "R$ 100 a R$ 200", min: 100, max: 200 },
  { id: "acima-200", label: "Acima de R$ 200", min: 200, max: Number.POSITIVE_INFINITY },
];

export interface CatalogFilters {
  query: string;
  categories: CategorySlug[];
  brands: string[];
  formats: ProductFormat[];
  priceRange: string | null;
  offersOnly: boolean;
  newOnly: boolean;
  sort: SortId;
}

export const emptyFilters: CatalogFilters = {
  query: "",
  categories: [],
  brands: [],
  formats: [],
  priceRange: null,
  offersOnly: false,
  newOnly: false,
  sort: "relevancia",
};

/** Nomes dos parâmetros na URL (em português, legíveis e compartilháveis). */
const PARAM = {
  query: "q",
  categories: "categoria",
  brands: "marca",
  formats: "tipo",
  priceRange: "preco",
  offersOnly: "ofertas",
  newOnly: "novidades",
  sort: "ordem",
} as const;

const list = (value: string | null): string[] => (value ? value.split(",").filter(Boolean) : []);

export function parseFilters(params: URLSearchParams): CatalogFilters {
  const sort = params.get(PARAM.sort) as SortId | null;
  return {
    query: params.get(PARAM.query) ?? "",
    categories: list(params.get(PARAM.categories)) as CategorySlug[],
    brands: list(params.get(PARAM.brands)),
    formats: list(params.get(PARAM.formats)) as ProductFormat[],
    priceRange: params.get(PARAM.priceRange),
    offersOnly: params.get(PARAM.offersOnly) === "1",
    newOnly: params.get(PARAM.newOnly) === "1",
    sort: sort && sortOptions.some((option) => option.id === sort) ? sort : "relevancia",
  };
}

export function serializeFilters(filters: CatalogFilters): string {
  const params = new URLSearchParams();
  if (filters.query) params.set(PARAM.query, filters.query);
  if (filters.categories.length) params.set(PARAM.categories, filters.categories.join(","));
  if (filters.brands.length) params.set(PARAM.brands, filters.brands.join(","));
  if (filters.formats.length) params.set(PARAM.formats, filters.formats.join(","));
  if (filters.priceRange) params.set(PARAM.priceRange, filters.priceRange);
  if (filters.offersOnly) params.set(PARAM.offersOnly, "1");
  if (filters.newOnly) params.set(PARAM.newOnly, "1");
  if (filters.sort !== "relevancia") params.set(PARAM.sort, filters.sort);
  return params.toString();
}

/** Quantos filtros estão ativos (busca e ordenação não contam). */
export function countActiveFilters(filters: CatalogFilters): number {
  return (
    filters.categories.length +
    filters.brands.length +
    filters.formats.length +
    (filters.priceRange ? 1 : 0) +
    (filters.offersOnly ? 1 : 0) +
    (filters.newOnly ? 1 : 0)
  );
}

function sortProducts(products: Product[], sort: SortId): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "menor-preco":
      return sorted.sort((a, b) => a.price - b.price);
    case "maior-preco":
      return sorted.sort((a, b) => b.price - a.price);
    case "maior-desconto":
      return sorted.sort((a, b) => (getDiscount(b) ?? 0) - (getDiscount(a) ?? 0));
    case "novidades":
      return sorted.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
    default:
      return sorted;
  }
}

export function applyFilters(products: Product[], filters: CatalogFilters): Product[] {
  const range = priceRanges.find((candidate) => candidate.id === filters.priceRange);
  const base = filters.query ? searchProducts(products, filters.query) : products;

  const filtered = base.filter(
    (product) =>
      (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
      (filters.brands.length === 0 || filters.brands.includes(product.brand)) &&
      (filters.formats.length === 0 || filters.formats.includes(product.format)) &&
      (!range || (product.price >= range.min && product.price < range.max)) &&
      (!filters.offersOnly || product.isOffer === true) &&
      (!filters.newOnly || product.isNew === true),
  );

  return sortProducts(filtered, filters.sort);
}

/** Alterna um valor dentro de uma lista de filtros. */
export function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}
