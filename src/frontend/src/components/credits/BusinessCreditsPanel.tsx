import type { CreditLedgerEntry, RewardAmounts } from "@/backend";
import { FoundingBadge as FoundingBadgeKind, RewardType } from "@/backend";
import { BusinessCreditActions } from "@/components/credits/BusinessCreditActions";
import { CreditHistoryList } from "@/components/shared/CreditHistoryList";
import { EmptyState } from "@/components/shared/EmptyState";
import { FoundingBadge } from "@/components/shared/FoundingBadge";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ReferralPanel } from "@/components/shared/ReferralPanel";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import {
  useMyContributionHistory,
  useMyCreditSummary,
  useMyReferralCode,
  useRewardAmounts,
} from "@/hooks/useQueries";
import {
  formatCredits,
  formatMemberNumber,
  rewardTypeLabels,
} from "@/lib/credits";
import { formatDate } from "@/lib/format";
import { Award, CalendarDays, Coins, Hash, Sparkles } from "lucide-react";

const businessRewardTypes: RewardType[] = [
  RewardType.foundingBusinessRegistration,
  RewardType.daoDeployment,
  RewardType.businessNomination,
  RewardType.businessReferral,
];

function rewardAmountFor(amounts: RewardAmounts, type: RewardType): bigint {
  switch (type) {
    case RewardType.foundingBusinessRegistration:
      return amounts.foundingBusinessRegistration;
    case RewardType.daoDeployment:
      return amounts.daoDeployment;
    case RewardType.businessNomination:
      return amounts.businessNomination;
    case RewardType.businessReferral:
      return amounts.businessReferral;
    default:
      return 0n;
  }
}

/**
 * Founding Business recognition panel for the owner workspace. Credits are a
 * simulated recognition score, never money, equity, a token or an investment.
 */
export function BusinessCreditsPanel() {
  const summaryQuery = useMyCreditSummary();
  const historyQuery = useMyContributionHistory();
  const referralQuery = useMyReferralCode();
  const amountsQuery = useRewardAmounts();

  const isLoading =
    summaryQuery.isLoading ||
    historyQuery.isLoading ||
    referralQuery.isLoading ||
    amountsQuery.isLoading;

  const isError =
    summaryQuery.isError ||
    historyQuery.isError ||
    referralQuery.isError ||
    amountsQuery.isError;

  const summary = summaryQuery.data;
  const history = historyQuery.data ?? [];
  const referralCode = referralQuery.data ?? "";
  const amounts = amountsQuery.data;

  const businessHistory = history.filter((entry) =>
    businessRewardTypes.includes(entry.rewardType),
  );

  if (isLoading) {
    return (
      <div className="space-y-6" data-ocid="credits.panel.loading_state">
        <LoadingSkeleton variant="stat" rows={4} />
        <LoadingSkeleton variant="list" rows={3} />
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <EmptyState
        icon={Award}
        title="We could not load your Founding Credits"
        description="Your recognition score and history could not be retrieved. Check your connection and try again."
        action={
          <Button
            type="button"
            variant="outline"
            data-ocid="credits.panel.retry_button"
            onClick={() => {
              void summaryQuery.refetch();
              void historyQuery.refetch();
              void referralQuery.refetch();
              void amountsQuery.refetch();
            }}
            className="rounded-full"
          >
            Try again
          </Button>
        }
      />
    );
  }

  const hasCredits = summary.lifetimeEarned > 0n || history.length > 0;

  return (
    <div className="space-y-6" data-ocid="credits.panel">
      <section
        aria-label="Founding Business recognition"
        className="rounded-2xl border border-warning/30 bg-gradient-to-br from-warning/10 via-card/60 to-card/60 p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <FoundingBadge kind={summary.badge ?? FoundingBadgeKind.business} />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Recognition score
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Founding Credits are a simulated recognition score for early
          supporters. They are not money, equity, a token or an investment, and
          they are kept separate from your business ledger and cap table.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Credit balance"
          value={formatCredits(summary.balance)}
          hint="Current recognition score"
          icon={Coins}
          tone="gold"
        />
        <StatCard
          label="Lifetime earned"
          value={formatCredits(summary.lifetimeEarned)}
          hint="Total credits awarded"
          icon={Sparkles}
          tone="emerald"
        />
        <StatCard
          label="Founding number"
          value={
            summary.memberNumber !== undefined
              ? formatMemberNumber(summary.memberNumber)
              : "—"
          }
          hint="Your founding member number"
          icon={Hash}
          tone="violet"
        />
        <StatCard
          label="Member since"
          value={
            summary.foundingDate !== undefined
              ? formatDate(summary.foundingDate)
              : "—"
          }
          hint="Founding membership date"
          icon={CalendarDays}
          tone="cyan"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-2xl border border-border bg-card/60 p-5 sm:p-6">
          <SectionHeading
            title="Contribution history"
            description="Every credit award, newest first, with the reward type, amount, related subject and date."
          />
          <div className="mt-5">
            {hasCredits ? (
              <CreditHistoryList
                entries={history}
                emptyTitle="No credits yet"
                emptyDescription="Complete a qualifying action below to start earning Founding Credits."
              />
            ) : (
              <EmptyState
                icon={Coins}
                title="No credits yet"
                description="Complete a qualifying action below to start earning Founding Credits."
              />
            )}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card/60 p-5 sm:p-6">
            <SectionHeading
              title="Business credit activity"
              description="Awards tied to this business, plus the current reward amounts."
            />
            <div className="mt-5">
              {businessHistory.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border bg-background/40 px-4 py-6 text-center text-sm text-muted-foreground">
                  No business-specific awards yet. Claim your founding
                  registration to begin.
                </p>
              ) : (
                <ul className="space-y-2.5" data-ocid="credits.business.list">
                  {businessHistory.map((entry: CreditLedgerEntry, index) => (
                    <li
                      key={entry.id.toString()}
                      data-ocid={`credits.business.item.${index + 1}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/40 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {rewardTypeLabels[entry.rewardType]}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {entry.subject || entry.memo || "Founding Credits"}
                          <span aria-hidden="true"> · </span>
                          {formatDate(entry.createdAt)}
                        </p>
                      </div>
                      <span className="shrink-0 font-numeric text-sm font-semibold text-warning">
                        +{formatCredits(entry.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {amounts && (
                <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  {businessRewardTypes.map((type) => (
                    <div
                      key={type}
                      className="rounded-lg border border-border/60 bg-background/40 px-3 py-2"
                    >
                      <dt className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        {rewardTypeLabels[type]}
                      </dt>
                      <dd className="mt-0.5 font-numeric font-semibold text-foreground">
                        {formatCredits(rewardAmountFor(amounts, type))}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </section>

          <ReferralPanel referralCode={referralCode} />
        </div>
      </div>

      <BusinessCreditActions />
    </div>
  );
}
