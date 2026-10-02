import { categories } from "@/data/categories";
import { products } from "@/data/products";
import type { Category, CategorySlug, Product } from "@/types/product";

/**
 * Camada de acesso ao catálogo. Todo componente consulta produtos por aqui;
 * para ligar uma API ou ERP, basta reimplementar estas funções.
 */

const bySlug = new Map(products.map((product) => [product.slug, product]));
const byId = new Map(products.map((product) => [product.id, product]));
const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function getProductById(id: string): Product | undefined {
  return byId.get(id);
}

/** Resolve uma lista de slugs, ignorando os que não existirem mais. */
export function getProductsBySlugs(slugs: readonly string[]): Product[] {
  return slugs.flatMap((slug) => bySlug.get(slug) ?? []);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((product) => product.category === category);
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug as CategorySlug);
}

export function getCategoryCount(slug: CategorySlug): number {
  return getProductsByCategory(slug).length;
}

export function getBrands(): string[] {
  return [...new Set(products.map((product) => product.brand))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}

/** Mesma categoria primeiro; completa com a mesma marca se faltar. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter((candidate) => candidate.id !== product.id);
  const sameCategory = others.filter((candidate) => candidate.category === product.category);
  const sameBrand = others.filter(
    (candidate) => candidate.brand === product.brand && candidate.category !== product.category,
  );
  return [...sameCategory, ...sameBrand].slice(0, limit);
}

/**
 * Seleciona até `limit` produtos ainda não usados e os registra em `used`.
 * A home usa isso para nunca repetir um produto entre seções.
 */
export function pickUnique(candidates: Product[], used: Set<string>, limit: number): Product[] {
  const picked = candidates.filter((product) => !used.has(product.id)).slice(0, limit);
  picked.forEach((product) => used.add(product.id));
  return picked;
}
