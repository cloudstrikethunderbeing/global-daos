import { formatCurrency, formatCurrencyCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Currency display that keeps contributed capital visually distinct from
 * estimated value. Contributed capital is rendered in cyan (real, recorded
 * input); estimated value is rendered in gold (projected, simulated).
 */
export function CurrencyValue({
  cents,
  kind = "contribution",
  compact = false,
  className,
}: {
  cents: bigint;
  kind?: "contribution" | "value";
  compact?: boolean;
  className?: string;
}) {
  const isValue = kind === "value";
  return (
    <span
      data-ocid={`currency.${kind}`}
      className={cn(
        "font-numeric tabular-nums",
        isValue ? "text-warning" : "text-accent",
        className,
      )}
      title={
        isValue
          ? "Estimated value — simulated projection"
          : "Contributed capital — recorded contribution"
      }
    >
      {compact ? formatCurrencyCompact(cents) : formatCurrency(cents)}
    </span>
  );
}

/** Small legend explaining the two currency treatments. */
export function CurrencyLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
        Contributed capital
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-warning" aria-hidden="true" />
        Estimated value (simulated)
      </span>
    </div>
  );
}
