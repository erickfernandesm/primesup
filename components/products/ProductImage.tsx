import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

interface ProductImageProps {
  product: Pick<Product, "name" | "brand" | "images">;
  /** Índice dentro de product.images. */
  index?: number;
  /** Atributo `sizes` responsivo: informa ao navegador a largura exibida. */
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Use "" quando a imagem for decorativa (o nome já está no texto ao lado). */
  alt?: string;
}

/** Foto de produto com blend sobre o tile. O pai precisa definir o tamanho. */
export function ProductImage({
  product,
  index = 0,
  sizes,
  priority = false,
  className,
  alt,
}: ProductImageProps) {
  const src = product.images[index] ?? product.images[0];
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt ?? `${product.name} — ${product.brand}`}
      width={1000}
      height={1000}
      sizes={sizes}
      priority={priority}
      className={cn("product-shot", className)}
    />
  );
}
