/**
 * Curadoria da página inicial, por slug de produto.
 * Trocar a vitrine é só reordenar ou substituir os slugs abaixo.
 * A home nunca repete um produto entre seções (ver lib/products.pickUnique).
 */
export const homeCuration = {
  /** Produto da campanha no topo da página. */
  hero: "whey-100-canibal-inc-900g",

  /** "Escolhas da Prime" — os destaques da loja. */
  featured: [
    "beef-protein-crush-under-labz-910g",
    "dymatize-iso100-hydrolyzed-2-3kg",
    "iso-beef-protein-absolut-900g",
    "jack3d-reload-300g-galao",
  ],

  /** "Ofertas Prime" — itens da lista de promoções da loja. */
  offers: [
    "whey-100-fullife-900g",
    "creatina-profit-150g",
    "whey-mix-protein-abs-nutrition-900g",
    "creatina-power-extra-energy-300g",
  ],

  /** "Chegando na Prime" — o primeiro vira o destaque grande; os dois seguintes, cards. */
  newArrivals: [
    "hooligan-canibal-inc-manga-301g",
    "proteina-uevo-420g-refil",
    "body-breaker-bluster-150g",
  ],

  /**
   * "Mais procurados".
   * ATENÇÃO: seleção editorial inicial. Substitua pelos campeões de venda
   * reais assim que houver esse dado (ou alimente via ERP/API).
   */
  bestSellers: [
    "creatina-max-titanium-300g",
    "whey-100-max-titanium-900g",
    "creatina-dux-300g",
    "whey-100-pure-integralmedica-900g",
    "creatina-monohidratada-black-skull-300g",
    "whey-sweet-hidro-900g",
  ],
} as const;
