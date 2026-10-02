import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/products";
import { absoluteUrl, categoryPath, productPath } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/produtos/"), lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/ofertas/"), lastModified, changeFrequency: "daily", priority: 0.8 },
    ...getCategories().map((category) => ({
      url: absoluteUrl(categoryPath(category)),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllProducts().map((product) => ({
      url: absoluteUrl(productPath(product)),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
