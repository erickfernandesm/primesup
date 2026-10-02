"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { cartReducer, lineKey } from "@/lib/cart/reducer";
import { loadCart, saveCart } from "@/lib/cart/storage";
import { getProductById } from "@/lib/products";
import type { CartItem, CartLine } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartContextValue {
  lines: CartLine[];
  /** Soma das quantidades. */
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product, options?: { flavor?: string | null; quantity?: number }) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Cruza os itens salvos com o catálogo; produtos removidos somem do carrinho. */
function resolveLines(items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const product = getProductById(item.productId);
    if (!product) return [];
    return [{ ...item, key: lineKey(item), product, lineTotal: product.price * item.quantity }];
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // O carrinho salvo só é lido depois da hidratação, para o HTML estático bater.
  useEffect(() => {
    dispatch({ type: "hydrate", items: loadCart() });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCart(items);
  }, [items, hydrated]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback<CartContextValue["add"]>((product, options) => {
    dispatch({
      type: "add",
      productId: product.id,
      flavor: options?.flavor ?? null,
      quantity: options?.quantity ?? 1,
    });
  }, []);

  const setQuantity = useCallback(
    (key: string, quantity: number) => dispatch({ type: "setQuantity", key, quantity }),
    [],
  );
  const remove = useCallback((key: string) => dispatch({ type: "remove", key }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = resolveLines(items);
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      isOpen,
      open,
      close,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [items, isOpen, open, close, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro de <CartProvider>.");
  return context;
}
