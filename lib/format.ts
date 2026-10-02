import { storeConfig } from "@/data/store";
import type { Product } from "@/types/product";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** 229.9 -> "R$ 229,90" */
export function formatPrice(value: number): string {
  return currency.format(value);
}

/** Percentual de desconto arredondado, ou null quando não há preço anterior. */
export function getDiscount(product: Pick<Product, "price" | "oldPrice">): number | null {
  if (!product.oldPrice || product.oldPrice <= product.price) return null;
  return Math.round((1 - product.price / product.oldPrice) * 100);
}

/** "3x de R$ 76,63 sem juros" */
export function formatInstallments(price: number): string {
  const { installments } = storeConfig.payment;
  return `${installments}x de ${formatPrice(price / installments)} sem juros`;
}

export function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
