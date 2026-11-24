import { cn } from "@/lib/utils";
import { BadgeCheck, Sparkles } from "lucide-react";

/**
 * Distinguishes a fictional demo business from a registered one. Fictional
 * businesses are clearly labeled so visitors never mistake them for real
 * companies.
 */
export function BusinessBadge({
  isFictional,
  className,
}: {
  isFictional: boolean;
  className?: string;
}) {
  if (isFictional) {
    return (
      <span
        data-ocid="business.badge.fictional"
        className={cn(
          "inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
          className,
        )}
      >
        <Sparkles aria-hidden="true" className="size-3" />
        Fictional
      </span>
    );
  }
  return (
    <span
      data-ocid="business.badge.registered"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary",
        className,
      )}
    >
      <BadgeCheck aria-hidden="true" className="size-3" />
      Registered
    </span>
  );
}
