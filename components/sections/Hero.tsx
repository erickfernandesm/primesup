import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { storeConfig } from "@/data/store";
import { formatInstallments, formatPrice } from "@/lib/format";
import { productPath } from "@/lib/seo";
import type { Product } from "@/types/product";

/**
 * Hero em formato de campanha.
 *
 * Desktop: o título gigante atravessa a borda do painel claro e inverte de
 * cor sobre ele (mix-blend-difference); o produto fica na camada da frente.
 * Celular: texto e painel empilhados, com o CTA na altura do polegar.
 */
export function Hero({ product }: { product: Product }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />

      <div className="shell relative flex flex-col lg:min-h-[min(44rem,calc(100dvh-4rem))] lg:justify-center">
        <div className="pt-12 pb-10 md:pt-20 md:pb-14 lg:py-20">
          <p className="eyebrow text-night-muted">
            {storeConfig.address.city}, {storeConfig.address.state}
            <span className="max-xs:hidden"> · Loja física no {storeConfig.address.district}</span>
          </p>

          <h1 className="mt-6 lg:mt-8">
            <span className="font-display text-subtitle block">Suplemento certo.</span>
            <span className="font-display relative z-10 mt-2 block text-[clamp(2.75rem,12.4vw,7rem)] leading-[1.04] uppercase mix-blend-difference lg:mt-2 lg:text-[clamp(6rem,10.2vw,9.75rem)]">
              O resto
              <br />é treino.
            </span>
          </h1>

          <p className="mt-7 max-w-md text-lg text-pretty text-night-muted lg:mt-9">
            Whey, creatina e pré-treino das marcas que você já conhece, no Centro de Juiz de Fora.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/produtos/" className={buttonStyles({ variant: "inverse", size: "lg" })}>
              Explorar produtos
            </Link>
            <WhatsAppLink className={buttonStyles({ variant: "outline-inverse", size: "lg" })}>
              <WhatsAppIcon className="size-5" />
              Falar com a Prime
            </WhatsAppLink>
          </div>
        </div>
      </div>

      {/* Painel do produto: sem z-index próprio, para o título poder se misturar a ele. */}
      <Link
        href={productPath(product)}
        className="group relative flex flex-col bg-tile text-ink lg:absolute lg:inset-y-0 lg:right-0 lg:w-[40vw]"
      >
        {/* O z-index fica na própria imagem: um wrapper com z-index isolaria o multiply. */}
        <div className="relative mx-auto aspect-square w-full max-w-md flex-1 lg:mr-[4%] lg:ml-auto lg:aspect-auto lg:w-[74%] lg:max-w-none">
          <ProductImage
            product={product}
            priority
            sizes="(min-width: 64rem) 30vw, (min-width: 28rem) 448px, 100vw"
            className="absolute inset-0 z-20 size-full p-[9%] transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] lg:p-[5%]"
          />
        </div>

        <div className="relative z-20 flex items-end justify-between gap-4 border-t border-ink/10 px-4 py-4 md:px-8 lg:mr-24 lg:ml-8 lg:px-0 lg:py-6">
          <div className="min-w-0">
            <p className="eyebrow text-muted">
              {product.isNew ? "Lançamento" : "Destaque"} · {product.brand}
            </p>
            <p className="mt-1.5 truncate font-semibold">{product.name}</p>
            <p className="text-sm text-muted">
              <span className="font-semibold text-ink tabular-nums">{formatPrice(product.price)}</span>
              {" · "}
              {formatInstallments(product.price)}
            </p>
          </div>
          <span
            aria-hidden
            className="grid size-11 shrink-0 place-items-center rounded-xs bg-ink text-white transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </Link>
    </section>
  );
}
