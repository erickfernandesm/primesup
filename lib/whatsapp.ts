import { storeConfig } from "@/data/store";
import type { Product } from "@/types/product";

/** Link wa.me com mensagem pré-preenchida. */
export function whatsappUrl(message: string = storeConfig.whatsapp.greeting): string {
  return `https://wa.me/${storeConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Mensagem para tirar dúvida ou comprar um único produto. */
export function productInquiryMessage(product: Product, flavor?: string | null): string {
  const variant = flavor ? ` (${flavor})` : "";
  return `Olá! Tenho interesse no ${product.name} — ${product.brand}${variant}. Ainda está disponível?`;
}
