import { categories, formatLabels } from "@/data/categories";
import type { Product } from "@/types/product";

/** Minúsculas, sem acentos e sem pontuação: "Pré-Treino" -> "pre treino". */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const categoryNames = new Map(categories.map((category) => [category.slug, category.name]));

interface IndexedProduct {
  product: Product;
  name: string;
  brand: string;
  haystack: string;
}

function indexProduct(product: Product): IndexedProduct {
  const name = normalize(product.name);
  const brand = normalize(product.brand);
  const extras = [
    categoryNames.get(product.category) ?? "",
    formatLabels[product.format],
    ...product.tags,
    ...(product.flavors ?? []),
  ];
  return { product, name, brand, haystack: normalize([name, brand, ...extras].join(" ")) };
}

function score(entry: IndexedProduct, tokens: string[], query: string): number {
  if (!tokens.every((token) => entry.haystack.includes(token))) return 0;
  let points = 1;
  if (entry.name.startsWith(query)) points += 8;
  else if (entry.name.includes(query)) points += 5;
  if (entry.brand.includes(query)) points += 3;
  points += tokens.filter((token) => entry.name.includes(token)).length;
  return points;
}

/**
 * Busca por nome, marca, categoria, formato, sabor e tags.
 * Todos os termos precisam aparecer; o nome pesa mais na ordenação.
 */
export function searchProducts(products: Product[], rawQuery: string): Product[] {
  const query = normalize(rawQuery);
  if (!query) return [];
  const tokens = query.split(" ");

  return products
    .map((product, order) => {
      const entry = indexProduct(product);
      return { product, order, points: score(entry, tokens, query) };
    })
    .filter((result) => result.points > 0)
    .sort((a, b) => b.points - a.points || a.order - b.order)
    .map((result) => result.product);
}
