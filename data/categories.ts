import type { Category, ProductFormat } from "@/types/product";

/**
 * Categorias do catálogo real da loja. Para criar uma nova:
 * 1. adicione o slug em types/product.ts (CategorySlug);
 * 2. inclua a entrada abaixo;
 * 3. marque os produtos com ela em data/products.ts.
 */
export const categories: Category[] = [
  {
    slug: "whey",
    name: "Whey e proteínas",
    shortName: "Whey",
    description:
      "Whey concentrado, isolado e hidrolisado, beef protein e proteína de ovo.",
    coverProduct: "whey-100-max-titanium-900g",
    primary: true,
  },
  {
    slug: "creatina",
    name: "Creatina",
    shortName: "Creatina",
    description: "Creatina monohidratada em pó e em cápsulas, de 150g a 400g.",
    coverProduct: "creatina-dux-300g",
    primary: true,
  },
  {
    slug: "pre-treino",
    name: "Pré-treino",
    shortName: "Pré-treino",
    description: "Energia e foco para o treino, em pote, sachê ou cápsula.",
    coverProduct: "hooligan-canibal-inc-manga-301g",
    primary: true,
  },
  {
    slug: "comida",
    name: "Comida proteica",
    shortName: "Comida",
    description: "Refeições Holyfoods prontas em minutos, com proteína de verdade.",
    coverProduct: "mac-bolonha-holyfoods",
    primary: true,
  },
  {
    slug: "hipercalorico",
    name: "Hipercalórico",
    shortName: "Hipercalórico",
    description: "Calorias e proteína para quem precisa ganhar peso.",
    coverProduct: "full-mass-hipercalorico-3kg",
    primary: false,
  },
  {
    slug: "termogenico",
    name: "Termogênico",
    shortName: "Termogênico",
    description: "Apoio para a fase de definição.",
    coverProduct: "thermo-cutter-slim-210g",
    primary: false,
  },
  {
    slug: "cafeina",
    name: "Cafeína",
    shortName: "Cafeína",
    description: "Cafeína em cápsulas para energia e foco.",
    coverProduct: "cafeina-fullife-30-capsulas",
    primary: false,
  },
];

export const formatLabels: Record<ProductFormat, string> = {
  po: "Em pó",
  capsulas: "Cápsulas",
  "dose-unica": "Dose única",
  refeicao: "Refeição pronta",
  kit: "Kit",
  acessorio: "Acessório",
};
