import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductPurchase } from "@/components/products/ProductPurchase";
import { HelpCta } from "@/components/sections/HelpCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatLabels } from "@/data/categories";
import { formatInstallments, formatPrice, getDiscount } from "@/lib/format";
import { getAllProducts, getCategory, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { categoryPath, productImageUrl, productJsonLd, productPath } from "@/lib/seo";
import { productInquiryMessage } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.name} — ${product.brand}`;
  const image = productImageUrl(product);

  return {
    title,
    description: product.description,
    alternates: { canonical: productPath(product) },
    openGraph: {
      type: "website",
      title,
      description: product.description,
      url: productPath(product),
      images: image ? [{ url: image, width: 1000, height: 1000, alt: title }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const discount = getDiscount(product);
  const related = getRelatedProducts(product);

  const details: Array<[label: string, value: string]> = [
    ["Marca", product.brand],
    ["Categoria", category?.name ?? ""],
    ["Tipo", formatLabels[product.format]],
    ...(product.flavors?.length
      ? [["Sabores", product.flavors.join(", ")] as [string, string]]
      : []),
  ];

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <div className="shell pt-6 md:pt-8">
        <Breadcrumbs
          trail={[
            { name: "Início", path: "/" },
            ...(category ? [{ name: category.name, path: categoryPath(category) }] : []),
            { name: product.name, path: productPath(product) },
          ]}
        />

        <div className="mt-6 grid gap-8 md:mt-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <ProductGallery product={product} />

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Link
              href={`/produtos/?marca=${encodeURIComponent(product.brand)}`}
              className="eyebrow text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              {product.brand}
            </Link>
            <h1 className="font-display mt-3 text-[clamp(1.625rem,1.2rem+1.8vw,2.5rem)] text-balance">
              {product.name}
            </h1>

            <div className="mt-6 border-y border-line py-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-display text-4xl tabular-nums">
                  <span className="sr-only">Preço: </span>
                  {formatPrice(product.price)}
                </p>
                {product.oldPrice && (
                  <s className="text-muted tabular-nums">
                    <span className="sr-only">De: </span>
                    {formatPrice(product.oldPrice)}
                  </s>
                )}
                {discount && (
                  <span className="rounded-xs bg-signal px-1.5 py-1 text-xs leading-none font-bold text-white">
                    −{discount}%
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted">ou {formatInstallments(product.price)}</p>
            </div>

            <div className="mt-7">
              <ProductPurchase product={product} />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 border-t border-line pt-12 md:mt-24 md:pt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="space-y-12">
            <section aria-labelledby="descricao-titulo">
              <h2 id="descricao-titulo" className="font-display text-subtitle">
                Descrição
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-pretty">{product.description}</p>
            </section>

            {product.highlights.length > 0 && (
              <section aria-labelledby="caracteristicas-titulo">
                <h2 id="caracteristicas-titulo" className="font-display text-subtitle">
                  Características
                </h2>
                <ul className="mt-4 max-w-2xl divide-y divide-line border-y border-line">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="py-3.5">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <section aria-labelledby="informacoes-titulo">
            <h2 id="informacoes-titulo" className="font-display text-subtitle">
              Informações
            </h2>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {details.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                  <dt className="text-muted">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-muted">
              Imagens ilustrativas. Consulte o rótulo para a tabela nutricional completa e o modo de uso.
            </p>
          </section>
        </div>
      </div>

      <HelpCta message={productInquiryMessage(product)} className="mt-16 md:mt-24" />

      {related.length > 0 && (
        <section aria-labelledby="relacionados-titulo" className="section-y">
          <div className="shell">
            <SectionHeading
              id="relacionados-titulo"
              title="Combina com este"
              action={category ? { label: `Ver ${category.name.toLowerCase()}`, href: categoryPath(category) } : undefined}
            />
            <ProductGrid products={related} className="mt-9 md:mt-12" />
          </div>
        </section>
      )}

      {/* Reserva o espaço da barra de compra fixa no celular. */}
      <div aria-hidden className="h-20 lg:hidden" />
    </>
  );
}
