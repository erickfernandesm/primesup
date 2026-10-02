import type { Metadata } from "next";
import { CatalogPage } from "@/components/products/CatalogPage";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Busca",
  description: "Busque por produto, marca, categoria ou sabor no catálogo da Prime Suplementos.",
  alternates: { canonical: "/busca/" },
  // Páginas de resultado não devem competir com as de categoria no Google.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <CatalogPage
      trail={[
        { name: "Início", path: "/" },
        { name: "Busca", path: "/busca/" },
      ]}
      title="Resultados da busca"
      staticProducts={getAllProducts()}
    />
  );
}
