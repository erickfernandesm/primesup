import type { CartItem } from "@/types/cart";

export const MAX_QUANTITY = 20;

export type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; productId: string; flavor: string | null; quantity: number }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

/** Chave da linha: o mesmo produto em sabores diferentes ocupa linhas diferentes. */
export function lineKey(item: Pick<CartItem, "productId" | "flavor">): string {
  return `${item.productId}::${item.flavor ?? ""}`;
}

const clamp = (quantity: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)));

export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.items;

    case "add": {
      const key = lineKey(action);
      const existing = items.find((item) => lineKey(item) === key);
      if (!existing) {
        return [
          ...items,
          { productId: action.productId, flavor: action.flavor, quantity: clamp(action.quantity) },
        ];
      }
      return items.map((item) =>
        lineKey(item) === key ? { ...item, quantity: clamp(item.quantity + action.quantity) } : item,
      );
    }

    case "setQuantity":
      return items.map((item) =>
        lineKey(item) === action.key ? { ...item, quantity: clamp(action.quantity) } : item,
      );

    case "remove":
      return items.filter((item) => lineKey(item) !== action.key);

    case "clear":
      return [];
  }
}
