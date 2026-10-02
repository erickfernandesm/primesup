import { getCategories, getCategoryCount } from "@/lib/products";
import { categoryPath } from "@/lib/seo";

export interface NavLink {
  label: string;
  href: string;
  /** Quantidade de produtos, quando fizer sentido mostrar. */
  count?: number;
}

/** Links principais, compartilhados por header, menu mobile e footer. */
export const mainLinks: NavLink[] = [
  { label: "Todos os produtos", href: "/produtos/" },
  { label: "Ofertas", href: "/ofertas/" },
  { label: "Novidades", href: "/produtos/?novidades=1" },
  { label: "A loja", href: "/#loja" },
];

export function getCategoryLinks(): NavLink[] {
  return getCategories().map((category) => ({
    label: category.name,
    href: categoryPath(category),
    count: getCategoryCount(category.slug),
  }));
}
