import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

/**
 * Persistent simulated-activity disclaimer. Every financial surface in the app
 * is a simulation, so this banner appears on shared shells and key panels.
 *
 * The surface is solid and theme-aware: a light warning tint with dark
 * warning-foreground text in light appearance, and a dark warning tint with
 * light text in dark appearance, so the body copy stays legible in both.
 */
export function SimulatedBanner({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      data-ocid="disclaimer.banner"
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-warning/40 bg-warning/15 text-sm text-warning-foreground",
        "dark:border-warning/35 dark:bg-warning/10 dark:text-foreground",
        compact ? "px-3 py-2" : "px-4 py-3",
        className,
      )}
    >
      <Info
        aria-hidden="true"
        className={cn(
          "mt-0.5 shrink-0 text-warning",
          compact ? "size-3.5" : "size-4",
        )}
      />
      <p className="leading-relaxed">
        <span className="font-semibold text-warning">Simulated activity.</span>{" "}
        All ownership, contributions, valuations and returns shown here are
        fictional demonstrations. No real money moves and nothing here is an
        investment, security or financial product.
      </p>
    </div>
  );
}
