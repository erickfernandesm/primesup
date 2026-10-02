import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "@/lib/cart/reducer";
import { cn } from "@/lib/cn";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  /** Nome do item, para leitores de tela. */
  label: string;
  size?: "sm" | "md";
}

export function QuantityStepper({ value, onChange, label, size = "md" }: QuantityStepperProps) {
  const cell = size === "sm" ? "size-9" : "size-12";

  return (
    <div
      role="group"
      aria-label={`Quantidade de ${label}`}
      className="inline-flex items-center rounded-xs border border-line bg-surface"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Diminuir quantidade"
        className={cn(cell, "grid place-items-center transition-colors hover:bg-paper disabled:opacity-30")}
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <span
        aria-live="polite"
        className={cn("min-w-8 text-center font-semibold tabular-nums", size === "sm" && "text-sm")}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY}
        aria-label="Aumentar quantidade"
        className={cn(cell, "grid place-items-center transition-colors hover:bg-paper disabled:opacity-30")}
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
