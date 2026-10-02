import Image from "next/image";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/Button";
import { storeConfig } from "@/data/store";

/**
 * "Prime no Instagram".
 * A grade lê storeConfig.instagram.posts; basta trocar as imagens lá para
 * exibir os posts reais, sem depender da API do Instagram.
 */
export function InstagramSection() {
  const { handle, url, posts } = storeConfig.instagram;

  return (
    <section aria-labelledby="instagram-titulo" className="section-y">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <div>
            <p className="eyebrow text-muted">Prime no Instagram</p>
            <h2
              id="instagram-titulo"
              className="font-display mt-3 text-[clamp(1.5rem,6.2vw,4.5rem)] break-all"
            >
              @{handle}
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Lançamentos, reposições e ofertas da semana aparecem primeiro por lá.
            </p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ size: "lg", className: "max-sm:w-full" })}
          >
            <InstagramIcon className="size-5" />
            Seguir no Instagram
          </a>
        </div>

        <ul className="reveal mt-9 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-5">
          {posts.map((post) => (
            <li key={post.image}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${post.alt} — ver no Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-xs bg-tile"
              >
                <Image
                  src={post.image}
                  alt=""
                  width={640}
                  height={640}
                  sizes="(min-width: 48rem) 25vw, 50vw"
                  className="product-shot absolute inset-0 size-full p-[12%] transition-transform duration-500 ease-out-expo group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="absolute right-2 bottom-2 grid size-9 place-items-center rounded-xs bg-surface opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:right-3 md:bottom-3"
                >
                  <InstagramIcon className="size-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
