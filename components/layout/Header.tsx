import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { storeConfig } from "@/data/store";
import { CategoriesMenu } from "./CategoriesMenu";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { getCategoryLinks, mainLinks } from "./navigation";

/** Links de texto do desktop ("Todos os produtos" vira o menu suspenso). */
const desktopLinks = mainLinks.slice(1);

export function Header() {
  const categories = getCategoryLinks();

  return (
    <header className="sticky top-0 z-40 bg-ink text-white">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-xs focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <div className="shell flex h-14 items-center gap-1 md:h-16 md:gap-3">
        <MobileMenu links={mainLinks} categories={categories} />

        <Link href="/" aria-label={`${storeConfig.name} — página inicial`} className="mr-auto flex h-11 shrink-0 items-center lg:mr-4">
          <Logo className="h-7 md:h-8" />
        </Link>

        <nav aria-label="Principal" className="mr-auto hidden items-center gap-1 lg:flex">
          <CategoriesMenu categories={categories} />
          {desktopLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-10 items-center rounded-xs px-3 text-sm font-medium transition-colors hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <SearchTrigger />

        <WhatsAppLink
          aria-label="Falar com a Prime no WhatsApp"
          className="hidden h-10 items-center gap-2 rounded-xs px-3 text-sm font-medium transition-colors hover:bg-white/10 lg:flex"
        >
          <WhatsAppIcon className="size-4.5" />
          <span className="hidden xl:inline">{storeConfig.whatsapp.display}</span>
        </WhatsAppLink>

        <CartButton />
      </div>
    </header>
  );
}
