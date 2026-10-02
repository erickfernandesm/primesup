"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { Sheet } from "@/components/ui/Sheet";
import { formatPrice, pluralize } from "@/lib/format";
import { getAllProducts, getCategories } from "@/lib/products";
import { searchProducts } from "@/lib/search";
import { categoryPath, productPath } from "@/lib/seo";

const MAX_PREVIEW = 6;

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const resultsPath = (query: string) => `/busca/?q=${encodeURIComponent(query.trim())}`;

/** Busca instantânea: resultados aparecem enquanto o cliente digita. */
export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchProducts(getAllProducts(), query), [query]);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery("");
  }, [open]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!hasQuery) return;
    router.push(resultsPath(query));
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} side="top" label="Buscar produtos" className="max-md:h-dvh">
      <div className="shell flex min-h-0 flex-1 flex-col py-3 md:py-5">
        <form onSubmit={handleSubmit} role="search" className="flex shrink-0 items-center gap-2">
          <label className="relative block flex-1">
            <span className="sr-only">Buscar por produto, marca ou categoria</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar produto, marca ou categoria"
              autoComplete="off"
              enterKeyHint="search"
              className="h-14 w-full rounded-xs border border-line bg-paper pr-4 pl-12 text-base placeholder:text-muted focus:border-ink focus:outline-none md:text-lg [&::-webkit-search-cancel-button]:hidden"
            />
          </label>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar busca"
            className="grid size-12 shrink-0 place-items-center transition-colors hover:bg-paper"
          >
            <X className="size-5" aria-hidden />
          </button>
        </form>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain pb-4 md:max-h-[62dvh]">
          {!hasQuery && <Suggestions onNavigate={onClose} />}

          {hasQuery && results.length === 0 && (
            <p className="py-10 text-center text-muted">
              Nada encontrado para <span className="font-semibold text-ink">“{query}”</span>. Tente o nome
              da marca ou da categoria.
            </p>
          )}

          {hasQuery && results.length > 0 && (
            <>
              <ul className="grid gap-x-8 md:grid-cols-2">
                {results.slice(0, MAX_PREVIEW).map((product) => (
                  <li key={product.id} className="min-w-0 border-b border-line">
                    <Link
                      href={productPath(product)}
                      onClick={onClose}
                      className="group flex items-center gap-4 py-3"
                    >
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-xs bg-tile">
                        <ProductImage
                          product={product}
                          sizes="64px"
                          alt=""
                          className="absolute inset-0 size-full p-1.5"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="eyebrow block text-muted">{product.brand}</span>
                        <span className="mt-1 block truncate font-medium underline-offset-4 group-hover:underline">
                          {product.name}
                        </span>
                      </span>
                      <span className="shrink-0 font-semibold tabular-nums">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={resultsPath(query)}
                onClick={onClose}
                className="mt-5 inline-flex h-11 items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
              >
                Ver {pluralize(results.length, "resultado", "resultados")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </>
          )}
        </div>
      </div>
    </Sheet>
  );
}

function Suggestions({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="py-2">
      <p className="eyebrow text-muted">Ir direto para</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {getCategories().map((category) => (
          <li key={category.slug}>
            <Link
              href={categoryPath(category)}
              onClick={onNavigate}
              className="flex h-11 items-center rounded-xs border border-line px-4 text-sm font-medium transition-colors hover:border-ink"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
