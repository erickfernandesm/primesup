import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "prime:cart:v1";

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === "string" &&
    typeof item.quantity === "number" &&
    (item.flavor === null || typeof item.flavor === "string")
  );
}

/** Lê o carrinho salvo; qualquer dado inválido é descartado em silêncio. */
export function loadCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Armazenamento indisponível (modo privado, cota): o carrinho segue em memória.
  }
}
