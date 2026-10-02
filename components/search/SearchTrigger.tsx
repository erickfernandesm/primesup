"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { SearchDialog } from "./SearchDialog";

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/**
 * Entrada da busca no header.
 * Desktop: um campo com o atalho "/". Celular: apenas o ícone.
 */
export function SearchTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || isTyping(event.target)) return;
      event.preventDefault();
      setOpen(true);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buscar produtos"
        className="grid size-11 place-items-center rounded-xs transition-colors hover:bg-white/10 md:hidden"
      >
        <Search className="size-5" aria-hidden />
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-10 w-52 items-center gap-2.5 rounded-xs bg-white/8 px-3 text-sm text-night-muted transition-colors hover:bg-white/14 md:flex xl:w-64"
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="flex-1 text-left">Buscar produtos</span>
        <kbd
          aria-hidden
          className="rounded-xs border border-white/15 px-1.5 font-sans text-[0.6875rem] leading-5"
        >
          /
        </kbd>
      </button>

      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
