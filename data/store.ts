import type { Differential, InstagramPost, OpeningHours } from "@/types/store";

/**
 * Fonte única das informações da loja.
 * Qualquer mudança de telefone, endereço, horário ou rede social é feita aqui.
 */

const whatsappNumber = "5532988865134"; // DDI + DDD + número, só dígitos
const instagramHandle = "primesuplementosjf";

const address = {
  street: "Rua Santa Rita, 115",
  district: "Centro",
  city: "Juiz de Fora",
  state: "MG",
  postalCode: "36010-070",
  country: "BR",
};

/**
 * Horário de funcionamento.
 * Não há horário publicado nas fontes oficiais; enquanto a lista estiver vazia
 * o site orienta o cliente a confirmar pelo WhatsApp. Exemplo de preenchimento:
 *
 *   { days: "Segunda a sexta", opens: "09:00", closes: "19:00",
 *     schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
 */
const hours: OpeningHours[] = [];

/** "Por que Prime?" — apenas fatos confirmados. Edite à vontade. */
const differentials: Differential[] = [
  {
    title: "Loja física no Centro",
    description:
      "Rua Santa Rita, 115. Veja o produto de perto, tire dúvidas no balcão e saia com ele na mão.",
  },
  {
    title: "3x sem juros",
    description: "Parcelamento em até 3 vezes sem juros em todo o catálogo.",
  },
  {
    title: "Marcas que você conhece",
    description:
      "Max Titanium, Integralmedica, Dux, Black Skull, Dymatize, Canibal Inc e outras.",
  },
  {
    title: "Pedido pelo WhatsApp",
    description:
      "Monte o carrinho aqui e finalize falando direto com a equipe da loja.",
  },
];

const instagramUrl = `https://www.instagram.com/${instagramHandle}/`;

/**
 * Composição da seção do Instagram. Troque `image` pelas fotos reais dos
 * posts (coloque os arquivos em public/instagram) e `href` pelo link do post.
 */
const instagramPosts: InstagramPost[] = [
  { image: "/products/whey-100-canibal-inc-900g-1", alt: "Whey 100% Canibal Inc", href: instagramUrl },
  { image: "/products/creatina-dux-300g-1", alt: "Creatina Dux", href: instagramUrl },
  { image: "/products/hooligan-canibal-inc-manga-301g-1", alt: "Pré-treino Hooligan", href: instagramUrl },
  { image: "/products/dymatize-iso100-hydrolyzed-2-3kg-1", alt: "Dymatize ISO100", href: instagramUrl },
];

export const storeConfig = {
  name: "Prime Suplementos",
  shortName: "Prime",
  tagline: "Suplemento certo. O resto é treino.",
  description:
    "Loja de suplementos em Juiz de Fora. Whey, creatina, pré-treino e mais, das marcas que você conhece, com loja física no Centro e pedido pelo WhatsApp.",
  /** Domínio público do site (usado em SEO, sitemap e Open Graph). */
  url: "https://www.primesuplementosjf.com.br",
  cnpj: "65.675.216/0001-00",
  locale: "pt-BR",

  logo: { src: "/brand/logo.png", width: 499, height: 152 },
  ogImage: "/brand/og.jpg",

  whatsapp: {
    number: whatsappNumber,
    display: "(32) 98886-5134",
    greeting: "Olá! Vim pelo site da Prime Suplementos e gostaria de ajuda.",
  },

  instagram: {
    handle: instagramHandle,
    url: instagramUrl,
    posts: instagramPosts,
  },

  address: {
    ...address,
    line1: `${address.street} — ${address.district}`,
    line2: `${address.city}/${address.state} · CEP ${address.postalCode}`,
    full: `${address.street} — ${address.district}, ${address.city}/${address.state}`,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Prime+Suplementos%2C+Rua+Santa+Rita+115%2C+Centro%2C+Juiz+de+Fora+MG",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Rua+Santa+Rita+115%2C+Centro%2C+Juiz+de+Fora+MG&z=17&output=embed",
  },

  hours,
  hoursFallback: "Confirme o horário de hoje pelo WhatsApp.",

  payment: {
    /** Parcelas sem juros oferecidas em todo o catálogo. */
    installments: 3,
  },

  checkout: {
    /** Provedor ativo. Ver lib/checkout para adicionar Pix, Mercado Pago etc. */
    provider: "whatsapp" as const,
  },

  differentials,
} as const;

export type StoreConfig = typeof storeConfig;
