export type CategorySlug =
  | "whey"
  | "creatina"
  | "pre-treino"
  | "comida"
  | "cafeina"
  | "hipercalorico"
  | "termogenico";

export type ProductFormat =
  | "po"
  | "capsulas"
  | "dose-unica"
  | "refeicao"
  | "kit"
  | "acessorio";

export interface Product {
  /** Identificador estável (hoje o SKU da loja; amanhã o id do ERP/API). */
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  format: ProductFormat;
  /** Preço atual em reais. */
  price: number;
  /** Preço "de", quando houver. */
  oldPrice?: number;
  /** Caminhos-base das imagens (sem tamanho/extensão). A primeira é a capa. */
  images: string[];
  description: string;
  /** Características objetivas exibidas na página do produto. */
  highlights: string[];
  /** Sabores ou variações selecionáveis. */
  flavors?: string[];
  /** Termos extras para a busca. */
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOffer?: boolean;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Nome curto para menus e chips. */
  shortName: string;
  description: string;
  /** Slug do produto cuja foto representa a categoria. */
  coverProduct: string;
  /** Categorias principais ganham destaque visual na home. */
  primary: boolean;
}
