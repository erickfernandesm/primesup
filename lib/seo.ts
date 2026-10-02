import { storeConfig } from "@/data/store";
import type { Category, Product } from "@/types/product";

/** URL absoluta a partir de um caminho interno. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, storeConfig.url).toString();
}

export function productPath(product: Pick<Product, "slug">): string {
  return `/produtos/${product.slug}/`;
}

export function categoryPath(category: Pick<Category, "slug">): string {
  return `/categorias/${category.slug}/`;
}

/** Imagem de capa em tamanho grande, para Open Graph e schema.org. */
export function productImageUrl(product: Product): string | undefined {
  const cover = product.images[0];
  return cover ? absoluteUrl(`${cover}-1000.webp`) : undefined;
}

/** schema.org/Store — SEO local. */
export function storeJsonLd() {
  const { address, hours } = storeConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": absoluteUrl("/#loja"),
    name: storeConfig.name,
    description: storeConfig.description,
    url: storeConfig.url,
    image: absoluteUrl(storeConfig.ogImage),
    logo: absoluteUrl(storeConfig.logo.src),
    telephone: `+${storeConfig.whatsapp.number}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street} - ${address.district}`,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: address.city,
    sameAs: [storeConfig.instagram.url],
    ...(hours.length > 0 && {
      openingHoursSpecification: hours.map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: entry.schemaDays,
        opens: entry.opens,
        closes: entry.closes,
      })),
    }),
  };
}

/** schema.org/Product com oferta. */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: product.brand },
    image: product.images.map((image) => absoluteUrl(`${image}-1000.webp`)),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(productPath(product)),
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": absoluteUrl("/#loja") },
    },
  };
}

export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
