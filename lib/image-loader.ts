/**
 * Loader do next/image para exportação estática.
 *
 * As fotos de produto são pré-geradas em três larguras por `npm run images`
 * (public/products/{slug}-{n}-{largura}.webp). O loader só escolhe a menor
 * largura que atende ao pedido, sem depender de servidor de otimização.
 */
const GENERATED_WIDTHS = [320, 640, 1000] as const;
const LARGEST = 1000;

interface LoaderParams {
  src: string;
  width: number;
}

export default function imageLoader({ src, width }: LoaderParams): string {
  if (!src.startsWith("/products/")) return src;
  const size = GENERATED_WIDTHS.find((candidate) => candidate >= width) ?? LARGEST;
  return `${src}-${size}.webp`;
}
