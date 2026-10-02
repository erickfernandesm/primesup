"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { emptyFilters, parseFilters, serializeFilters, type CatalogFilters } from "@/lib/catalog";

/**
 * Filtros do catálogo guardados na URL: o resultado pode ser compartilhado,
 * favoritado e sobrevive ao botão "voltar".
 */
export function useCatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFilters(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const setFilters = useCallback(
    (next: CatalogFilters) => {
      const query = serializeFilters(next);
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const update = useCallback(
    (patch: Partial<CatalogFilters>) => setFilters({ ...filters, ...patch }),
    [filters, setFilters],
  );

  /** Limpa os filtros, preservando a busca e a ordenação. */
  const clear = useCallback(
    () => setFilters({ ...emptyFilters, query: filters.query, sort: filters.sort }),
    [filters.query, filters.sort, setFilters],
  );

  /** Volta ao estado inicial, inclusive a busca. */
  const reset = useCallback(() => setFilters(emptyFilters), [setFilters]);

  return { filters, update, clear, reset };
}
