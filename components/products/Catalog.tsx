"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { applyFilters, countActiveFilters, sortOptions, type SortId } from "@/lib/catalog";
import { pluralize } from "@/lib/format";
import { getAllProducts } from "@/lib/products";
import type { CategorySlug } from "@/types/product";
import { ActiveFilters } from "./ActiveFilters";
import { CatalogFilters } from "./CatalogFilters";
import { ProductGrid } from "./ProductGrid";
import { useCatalogFilters } from "./useCatalogFilters";

export interface CatalogProps {
  /** Filtros fixos da página (ex.: página de categoria ou de ofertas). */
  locked?: { category?: CategorySlug; offersOnly?: boolean };
}

export function Catalog({ locked }: CatalogProps) {
  const { filters, update, clear, reset } = useCatalogFilters();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queryDraft, setQueryDraft] = useState(filters.query);

  // Mantém o campo em dia quando a URL muda por fora (busca do header, "voltar").
  useEffect(() => setQueryDraft(filters.query), [filters.query]);

  const scope = useMemo(
    () =>
      getAllProducts().filter(
        (product) =>
          (!locked?.category || product.category === locked.category) &&
          (!locked?.offersOnly || product.isOffer === true),
      ),
    [locked?.category, locked?.offersOnly],
  );

  const results = useMemo(() => applyFilters(scope, filters), [scope, filters]);
  const activeCount = countActiveFilters(filters);

  function handleQuery(value: string) {
    setQueryDraft(value);
    update({ query: value });
  }

  const filterPanel = (
    <CatalogFilters
      filters={filters}
      onChange={update}
      scope={scope}
      hideCategory={Boolean(locked?.category)}
      hideOffers={Boolean(locked?.offersOnly)}
    />
  );

  return (
    <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[16.5rem_minmax(0,1fr)] xl:gap-14">
      <aside className="hidden lg:block" aria-label="Filtros">
        <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain pr-2">
          {filterPanel}
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block flex-1">
            <span className="sr-only">Buscar no catálogo</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              type="search"
              value={queryDraft}
              onChange={(event) => handleQuery(event.target.value)}
              placeholder="Buscar por produto, marca ou sabor"
              className="h-12 w-full rounded-xs border border-line bg-surface pr-4 pl-10 text-[0.9375rem] placeholder:text-muted focus:border-ink focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
          </label>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-surface lg:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              Filtros{activeCount > 0 && ` (${activeCount})`}
            </Button>

            <label className="relative flex-1 sm:flex-none">
              <span className="sr-only">Ordenar por</span>
              <select
                value={filters.sort}
                onChange={(event) => update({ sort: event.target.value as SortId })}
                className="h-12 w-full cursor-pointer appearance-none rounded-xs border border-line bg-surface pr-9 pl-4 text-[0.9375rem] font-medium focus:border-ink focus:outline-none sm:w-52"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-3.5 size-2 translate-y-[-70%] rotate-45 border-r-[1.5px] border-b-[1.5px] border-ink"
              />
            </label>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="text-sm text-muted" role="status">
            {pluralize(results.length, "produto", "produtos")}
            {filters.query && (
              <>
                {" "}
                para <span className="font-semibold text-ink">“{filters.query}”</span>
              </>
            )}
          </p>
          <ActiveFilters filters={filters} onChange={update} onClear={clear} />
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} columns={3} priorityCount={3} className="mt-8" />
        ) : (
          <EmptyResults query={filters.query} onClear={reset} />
        )}
      </div>

      <Sheet open={drawerOpen} onClose={() => setDrawerOpen(false)} side="bottom" label="Filtros">
        <header className="flex h-14 shrink-0 items-center justify-between px-4">
          <h2 className="font-display text-lg">Filtros</h2>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Fechar filtros"
            className="-mr-2 grid size-11 place-items-center"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4">{filterPanel}</div>
        <footer className="flex shrink-0 gap-3 border-t border-line px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Button variant="outline" className="flex-1" onClick={clear} disabled={activeCount === 0}>
            Limpar
          </Button>
          <Button className="flex-2" onClick={() => setDrawerOpen(false)}>
            Ver {pluralize(results.length, "produto", "produtos")}
          </Button>
        </footer>
      </Sheet>
    </div>
  );
}

function EmptyResults({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="mt-8 rounded-xs border border-line bg-surface px-6 py-14 text-center">
      <p className="font-display text-2xl text-balance">
        {query ? `Nada encontrado para “${query}”.` : "Nenhum produto com esses filtros."}
      </p>
      <p className="mx-auto mt-3 max-w-sm text-muted">
        Pode ser que a gente tenha na loja. Pergunte pelo WhatsApp que a equipe confere para você.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button variant="outline" onClick={onClear}>
          Limpar busca e filtros
        </Button>
        <WhatsAppLink
          message={query ? `Olá! Procurei por "${query}" no site e não encontrei. Vocês têm?` : undefined}
          className={buttonStyles()}
        >
          Perguntar à Prime
        </WhatsAppLink>
      </div>
    </div>
  );
}
