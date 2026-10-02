import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { cn } from "@/lib/cn";

interface HelpCtaProps {
  /** Mensagem pré-preenchida no WhatsApp (ex.: citando o produto da página). */
  message?: string;
  className?: string;
}

/** Chamada contextual para quem está em dúvida. */
export function HelpCta({ message, className }: HelpCtaProps) {
  return (
    <aside className={cn("border-y border-line", className)}>
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <p className="font-display text-subtitle text-balance">
          Precisa de ajuda para escolher?{" "}
          <span className="text-muted">Fale com a Prime.</span>
        </p>
        <WhatsAppLink message={message} className={buttonStyles({ size: "lg", className: "shrink-0" })}>
          <WhatsAppIcon className="size-5" />
          Chamar no WhatsApp
        </WhatsAppLink>
      </div>
    </aside>
  );
}
