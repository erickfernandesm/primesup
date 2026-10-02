import { storeConfig } from "@/data/store";
import { formatPrice } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import type { CheckoutProvider, Order, OrderLine } from "./types";

function describeLine(line: OrderLine): string {
  const flavor = line.flavor ? ` (${line.flavor})` : "";
  return `${line.name}${flavor} — ${line.quantity}x`;
}

/** Monta a mensagem do pedido enviada à loja. */
export function buildOrderMessage(order: Order): string {
  return [
    `Olá! Quero fazer um pedido na ${storeConfig.name}:`,
    "",
    ...order.lines.map(describeLine),
    "",
    `Total: ${formatPrice(order.total)}`,
  ].join("\n");
}

export const whatsappCheckout: CheckoutProvider = {
  id: "whatsapp",
  actionLabel: "Finalizar pedido",
  hint: "Você conclui o pedido no WhatsApp, direto com a loja.",
  async start(order) {
    if (order.lines.length === 0) {
      return { kind: "error", message: "Seu carrinho está vazio." };
    }
    return { kind: "redirect", url: whatsappUrl(buildOrderMessage(order)) };
  },
};
