import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

/** Trilha de navegação; o último item é a página atual. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className="no-scrollbar flex items-center gap-2 overflow-x-auto text-sm whitespace-nowrap text-muted">
        {trail.map((crumb, index) => {
          const current = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden>/</span>}
              {current ? (
                <span aria-current="page" className="text-ink">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="flex min-h-11 items-center underline-offset-4 hover:text-ink hover:underline"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </nav>
  );
}
