import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogPage } from "@/components/products/CatalogPage";
import { storeConfig } from "@/data/store";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/products";
import { categoryPath } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: `${category.name} em ${storeConfig.address.city}`,
    description: `${category.description} Compre na ${storeConfig.name}, no Centro de ${storeConfig.address.city}, em até ${storeConfig.payment.installments}x sem juros.`,
    alternates: { canonical: categoryPath(category) },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <CatalogPage
      trail={[
        { name: "Início", path: "/" },
        { name: "Produtos", path: "/produtos/" },
        { name: category.name, path: categoryPath(category) },
      ]}
      title={category.name}
      description={category.description}
      staticProducts={getProductsByCategory(category.slug)}
      locked={{ category: category.slug }}
    />
  );
}
