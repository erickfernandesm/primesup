import type { Metadata } from "next";
import { CatalogPage } from "@/components/products/CatalogPage";
import { pluralize } from "@/lib/format";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Todos os produtos",
  description:
    "Catálogo completo da Prime Suplementos em Juiz de Fora: whey, creatina, pré-treino, hipercalórico, termogênico e comida proteica.",
  alternates: { canonical: "/produtos/" },
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <CatalogPage
      trail={[
        { name: "Início", path: "/" },
        { name: "Produtos", path: "/produtos/" },
      ]}
      title="Todos os produtos"
      description={`${pluralize(products.length, "produto", "produtos")} para montar a sua rotina. Filtre por categoria, marca, preço ou tipo.`}
      staticProducts={products}
    />
  );
}
