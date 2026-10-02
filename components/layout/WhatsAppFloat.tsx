import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

/** Atalho discreto para o WhatsApp, presente em todas as páginas. */
export function WhatsAppFloat() {
  return (
    <WhatsAppLink
      aria-label="Falar com a Prime no WhatsApp"
      className="whatsapp-float fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 grid size-12 place-items-center rounded-full bg-ink text-white shadow-raised ring-1 ring-white/15 transition-transform duration-200 hover:scale-105 md:right-6 md:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
    </WhatsAppLink>
  );
}
