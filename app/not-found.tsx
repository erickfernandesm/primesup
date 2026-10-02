import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60dvh] flex-col items-start justify-center py-20">
      <p className="eyebrow text-muted">Erro 404</p>
      <h1 className="font-display text-title mt-3 max-w-2xl text-balance">
        Essa página saiu para treinar e não voltou.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        O endereço pode ter mudado ou o produto saiu do catálogo. O resto da loja continua aqui.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/produtos/" className={buttonStyles({ size: "lg" })}>
          Explorar produtos
        </Link>
        <Link href="/" className={buttonStyles({ variant: "outline", size: "lg" })}>
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
