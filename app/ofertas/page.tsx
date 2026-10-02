import type { Metadata } from "next";
import { CatalogPage } from "@/components/products/CatalogPage";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ofertas",
  description:
    "Ofertas da Prime Suplementos: whey, creatina e pré-treino com preço especial, em até 3x sem juros.",
  alternates: { canonical: "/ofertas/" },
};

export default function OffersPage() {
  const offers = getAllProducts().filter((product) => product.isOffer);

  return (
    <CatalogPage
      trail={[
        { name: "Início", path: "/" },
        { name: "Ofertas", path: "/ofertas/" },
      ]}
      title="Ofertas Prime"
      description="Produtos selecionados com condições especiais."
      staticProducts={offers}
      locked={{ offersOnly: true }}
    />
  );
}
