import type { CreditLedgerEntry } from "@/backend";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatCredits, rewardTypeLabels } from "@/lib/credits";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

const accentByType: Record<string, string> = {
  firstSimulatedPurchase: "border-primary/60",
  earlyConsumerRegistration: "border-accent/60",
  valuableFeedback: "border-chart-3/60",
  consumerReferral: "border-chart-3/60",
  businessReferral: "border-accent/60",
  businessNomination: "border-warning/60",
  foundingBusinessRegistration: "border-warning/60",
  daoDeployment: "border-primary/60",
};

/**
 * Newest-first list of credit awards with reward type, amount, subject and
 * date. Amounts are simulated recognition credits, not currency.
 */
export function CreditHistoryList({
  entries,
  emptyTitle = "No credits yet",
  emptyDescription = "Complete a simulated purchase or invite a friend to start earning Founding Credits.",
  className,
}: {
  entries: CreditLedgerEntry[];
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}) {
  if (entries.length === 0) {
    return (
      <EmptyState
        icon={Coins}
        title={emptyTitle}
        description={emptyDescription}
        className={className}
      />
    );
  }

  const sorted = [...entries].sort((a, b) =>
    a.createdAt === b.createdAt ? 0 : a.createdAt > b.createdAt ? -1 : 1,
  );

  return (
    <ul
      data-ocid="credits.history.list"
      className={cn("space-y-2.5", className)}
    >
      {sorted.map((entry, index) => (
        <li
          key={entry.id.toString()}
          data-ocid={`credits.history.item.${index + 1}`}
          className={cn(
            "flex items-center justify-between gap-4 rounded-xl border border-border border-l-2 bg-card/60 px-4 py-3 transition-smooth hover:bg-card",
            accentByType[entry.rewardType] ?? "border-l-primary/60",
          )}
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {rewardTypeLabels[entry.rewardType]}
            </p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {entry.subject || entry.memo || "Founding Credits"}
              <span aria-hidden="true"> · </span>
              {formatDate(entry.createdAt)}
            </p>
          </div>
          <span className="shrink-0 font-numeric text-sm font-semibold text-primary">
            +{formatCredits(entry.amount)}
          </span>
        </li>
      ))}
    </ul>
  );
}
