import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { storeConfig } from "@/data/store";
import { Logo } from "./Logo";
import { getCategoryLinks, mainLinks, type NavLink } from "./navigation";

export function Footer() {
  const categories = getCategoryLinks();
  const { address, instagram, whatsapp } = storeConfig;

  return (
    <footer className="bg-ink text-white">
      <div className="shell pt-14 pb-8 md:pt-20">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo className="h-9" />
            <p className="mt-6 text-night-muted">{storeConfig.description}</p>
          </div>

          <FooterGroup title="Loja">
            <LinkList links={mainLinks} />
          </FooterGroup>

          <FooterGroup title="Categorias">
            <LinkList links={categories} />
          </FooterGroup>

          <div className="max-lg:border-t max-lg:border-night-line max-lg:pt-8">
            <h2 className="eyebrow text-night-muted">Atendimento</h2>
            <address className="mt-4 space-y-4 not-italic">
              <p>
                {address.line1}
                <br />
                <span className="text-night-muted">{address.line2}</span>
              </p>
              <div className="flex flex-col items-start">
                <WhatsAppLink className="flex min-h-11 items-center gap-2.5 underline-offset-4 hover:underline">
                  <WhatsAppIcon className="size-5" />
                  {whatsapp.display}
                </WhatsAppLink>
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2.5 underline-offset-4 hover:underline"
                >
                  <InstagramIcon className="size-5" />@{instagram.handle}
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-night-line pt-6 text-sm text-night-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {storeConfig.name} · CNPJ {storeConfig.cnpj}
          </p>
          <p>Preços e disponibilidade sujeitos a alteração sem aviso.</p>
        </div>
      </div>
    </footer>
  );
}

/** Acordeão no celular (<details>), lista sempre aberta no desktop. Sem JavaScript. */
function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <details className="group border-t border-night-line lg:hidden">
        <summary className="flex h-14 list-none items-center justify-between font-semibold">
          {title}
          <ChevronDown className="size-4 transition-transform duration-200 group-open:rotate-180" aria-hidden />
        </summary>
        <div className="pb-5">{children}</div>
      </details>
      <div className="hidden lg:block">
        <h2 className="eyebrow mb-4 text-night-muted">{title}</h2>
        {children}
      </div>
    </>
  );
}

function LinkList({ links }: { links: NavLink[] }) {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="flex min-h-11 items-center text-[0.9375rem] underline-offset-4 hover:underline lg:min-h-9"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
