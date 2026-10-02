/**
 * Contrato do checkout.
 *
 * Hoje existe um único provedor (WhatsApp). Para adicionar Pix, Mercado Pago,
 * cartão ou um checkout próprio, crie um arquivo que implemente
 * `CheckoutProvider`, registre-o em lib/checkout/index.ts e troque
 * `storeConfig.checkout.provider`. A interface do carrinho não muda.
 */

export interface OrderLine {
  productId: string;
  name: string;
  brand: string;
  flavor: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  lines: OrderLine[];
  subtotal: number;
  /** Reservado para frete e descontos futuros; hoje é igual ao subtotal. */
  total: number;
}

export type CheckoutResult =
  /** Leva o cliente a uma URL externa (WhatsApp, link de pagamento…). */
  | { kind: "redirect"; url: string }
  /** Falha recuperável, com mensagem para exibir ao cliente. */
  | { kind: "error"; message: string };

export interface CheckoutProvider {
  id: string;
  /** Texto do botão principal do carrinho. */
  actionLabel: string;
  /** Frase curta explicando o que acontece ao finalizar. */
  hint: string;
  /** Pode ser assíncrono: provedores futuros chamarão uma API. */
  start(order: Order): Promise<CheckoutResult>;
}
