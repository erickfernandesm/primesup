"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Sheet } from "@/components/ui/Sheet";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { storeConfig } from "@/data/store";
import type { NavLink } from "./navigation";

interface MobileMenuProps {
  links: NavLink[];
  categories: NavLink[];
}

/** Menu do celular: painel de tela cheia, pensado para o polegar. */
export function MobileMenu({ links, categories }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={open}
        className="-ml-2 grid size-11 place-items-center rounded-xs transition-colors hover:bg-white/10 lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>

      <Sheet open={open} onClose={close} side="left" tone="dark" label="Menu">
        <div className="flex h-14 shrink-0 items-center justify-between px-4">
          <span className="eyebrow text-night-muted">Menu</span>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar menu"
            className="-mr-2 grid size-11 place-items-center rounded-xs transition-colors hover:bg-white/10"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <nav aria-label="Menu principal" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
          <ul className="border-b border-night-line pt-2 pb-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="font-display flex min-h-13 items-center text-[1.75rem]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-6 text-night-muted">Categorias</p>
          <ul className="mt-2">
            {categories.map((category) => (
              <li key={category.href}>
                <Link
                  href={category.href}
                  onClick={close}
                  className="flex min-h-12 items-center justify-between text-lg font-medium"
                >
                  {category.label}
                  <span className="text-sm font-normal text-night-muted tabular-nums">
                    {category.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-night-line px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <WhatsAppLink className="flex h-13 items-center justify-center gap-2 rounded-xs bg-white font-semibold text-ink">
            <WhatsAppIcon className="size-5" />
            Falar com a Prime
          </WhatsAppLink>
          <div className="mt-4 flex items-center justify-between gap-4 text-sm text-night-muted">
            <p>{storeConfig.address.line1}</p>
            <a
              href={storeConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram @${storeConfig.instagram.handle}`}
              className="-mr-2 grid size-11 shrink-0 place-items-center text-white"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>
      </Sheet>
    </>
  );
}
