import type { AnchorHTMLAttributes } from "react";
import { whatsappUrl } from "@/lib/whatsapp";

interface WhatsAppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Mensagem pré-preenchida; usa a saudação padrão da loja quando omitida. */
  message?: string;
}

/** Link para o WhatsApp da loja, sempre em nova aba. */
export function WhatsAppLink({ message, children, ...props }: WhatsAppLinkProps) {
  return (
    <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
