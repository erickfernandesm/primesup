import { storeConfig } from "@/data/store";
import type { CartLine } from "@/types/cart";
import type { CheckoutProvider, Order } from "./types";
import { whatsappCheckout } from "./whatsapp";

/** Registro de provedores. Novos meios de pagamento entram aqui. */
const providers: Record<string, CheckoutProvider> = {
  whatsapp: whatsappCheckout,
};

export const checkoutProvider: CheckoutProvider =
  providers[storeConfig.checkout.provider] ?? whatsappCheckout;

export function buildOrder(lines: CartLine[]): Order {
  const orderLines = lines.map((line) => ({
    productId: line.product.id,
    name: line.product.name,
    brand: line.product.brand,
    flavor: line.flavor,
    quantity: line.quantity,
    unitPrice: line.product.price,
    lineTotal: line.lineTotal,
  }));
  const subtotal = orderLines.reduce((sum, line) => sum + line.lineTotal, 0);
  return { lines: orderLines, subtotal, total: subtotal };
}

export type { CheckoutProvider, CheckoutResult, Order, OrderLine } from "./types";
