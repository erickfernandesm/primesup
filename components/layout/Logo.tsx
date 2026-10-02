import { storeConfig } from "@/data/store";
import { cn } from "@/lib/cn";

/** Wordmark oficial (branco). Use apenas sobre fundo escuro. */
export function Logo({ className }: { className?: string }) {
  const { src, width, height } = storeConfig.logo;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- PNG pequeno e estático; não precisa do loader.
    <img
      src={src}
      width={width}
      height={height}
      alt={storeConfig.name}
      className={cn("h-7 w-auto", className)}
    />
  );
}
