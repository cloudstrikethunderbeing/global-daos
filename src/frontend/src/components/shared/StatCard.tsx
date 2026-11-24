import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const toneStyles = {
  emerald: "text-primary",
  cyan: "text-accent",
  gold: "text-warning",
  violet: "text-chart-3",
} as const;

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "emerald",
  trend,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: LucideIcon;
  tone?: keyof typeof toneStyles;
  trend?: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-ocid="stat.card"
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:border-primary/40",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
        {Icon && (
          <Icon
            aria-hidden="true"
            className={cn("size-4 shrink-0", toneStyles[tone])}
          />
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-numeric text-2xl font-semibold tracking-tight md:text-3xl">
          {value}
        </span>
        {trend}
      </div>
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-8 -right-6 size-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40",
          tone === "emerald" && "bg-primary",
          tone === "cyan" && "bg-accent",
          tone === "gold" && "bg-warning",
          tone === "violet" && "bg-chart-3",
        )}
      />
    </div>
  );
}
