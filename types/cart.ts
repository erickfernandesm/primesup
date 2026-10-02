import type { Product } from "./product";

/** O que é persistido: só referências, nunca preço (o preço vem do catálogo). */
export interface CartItem {
  productId: string;
  flavor: string | null;
  quantity: number;
}

/** Item resolvido contra o catálogo, pronto para exibir. */
export interface CartLine extends CartItem {
  key: string;
  product: Product;
  lineTotal: number;
}
