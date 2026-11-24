import { FoundingBadge as FoundingBadgeKind } from "@/backend";
import { badgeLabels } from "@/lib/credits";
import { cn } from "@/lib/utils";
import { Building2, Crown } from "lucide-react";

/**
 * Recognition badge for Founding Members and Founding Businesses. Styled as a
 * gold recognition marker, never as currency, equity or a token.
 */
export function FoundingBadge({
  kind,
  className,
  showLabel = true,
}: {
  kind: FoundingBadgeKind;
  className?: string;
  showLabel?: boolean;
}) {
  const isBusiness = kind === FoundingBadgeKind.business;
  const Icon = isBusiness ? Building2 : Crown;

  return (
    <span
      data-ocid={`founding.badge.${isBusiness ? "business" : "member"}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-warning/50 bg-warning/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-warning",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {showLabel ? badgeLabels[kind] : null}
    </span>
  );
}
