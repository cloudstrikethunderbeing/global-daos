import type { RewardAmounts } from "@/backend";
import { FoundingBadge as FoundingBadgeKind, RewardType } from "@/backend";
import { CreditHistoryList } from "@/components/shared/CreditHistoryList";
import { EmptyState } from "@/components/shared/EmptyState";
import { FoundingBadge } from "@/components/shared/FoundingBadge";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ReferralPanel } from "@/components/shared/ReferralPanel";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import {
  useClaimEarlyConsumerRegistration,
  useClaimFirstSimulatedPurchase,
  useClaimValuableFeedback,
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
import { describeBackendError, errorMessage } from "@/lib/errors";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  Award,
  CalendarDays,
  Coins,
  Hash,
  Lock,
  MessageSquareHeart,
  ShoppingBag,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

const consumerRewardTypes: RewardType[] = [
  RewardType.earlyConsumerRegistration,
  RewardType.valuableFeedback,
  RewardType.firstSimulatedPurchase,
  RewardType.consumerReferral,
];

const futureBenefits = [
  {
    title: "Premium feature access",
    description: "Early unlocks for advanced portfolio and planning tools.",
  },
  {
    title: "Reduced platform fees",
    description: "Lower simulated platform fees on future round-ups.",
  },
  {
    title: "Business promotion credits",
    description: "Credits toward promoting a business you support.",
  },
  {
    title: "Marketplace benefits",
    description: "Priority access to marketplace perks as they launch.",
  },
  {
    title: "Early access to new functionality",
    description: "First look at new consumer experiences before release.",
  },
  {
    title: "Exclusive founding member recognition",
    description: "A permanent founding member marker across the app.",
  },
];

function rewardAmountFor(amounts: RewardAmounts, type: RewardType): bigint {
  switch (type) {
    case RewardType.earlyConsumerRegistration:
      return amounts.earlyConsumerRegistration;
    case RewardType.valuableFeedback:
      return amounts.valuableFeedback;
    case RewardType.firstSimulatedPurchase:
      return amounts.firstSimulatedPurchase;
    case RewardType.consumerReferral:
      return amounts.consumerReferral;
    default:
      return 0n;
  }
}

function toMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "__kind__" in error) {
    return describeBackendError(error as { __kind__: string });
  }
  return errorMessage(error);
}

/**
 * Founding Credits dashboard for the signed-in consumer portfolio. Credits are
 * a simulated recognition score, never money, equity, a token or an investment,
 * and are kept visually separate from ownership units and contributions.
 */
export function FoundingCreditsPanel() {
  const summaryQuery = useMyCreditSummary();
  const historyQuery = useMyContributionHistory();
  const referralQuery = useMyReferralCode();
  const amountsQuery = useRewardAmounts();

  const claimRegistration = useClaimEarlyConsumerRegistration();
  const claimFeedback = useClaimValuableFeedback();
  const claimPurchase = useClaimFirstSimulatedPurchase();

  const [notice, setNotice] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);

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

  const actions = [
    {
      type: RewardType.earlyConsumerRegistration,
      label: "Claim early registration",
      description: "Awarded once for joining the early consumer program.",
      icon: Sparkles,
      mutation: claimRegistration,
    },
    {
      type: RewardType.valuableFeedback,
      label: "Claim valuable feedback",
      description: "Awarded for feedback that helps shape the product.",
      icon: MessageSquareHeart,
      mutation: claimFeedback,
    },
    {
      type: RewardType.firstSimulatedPurchase,
      label: "Claim first purchase",
      description: "Awarded once after your first simulated round-up.",
      icon: ShoppingBag,
      mutation: claimPurchase,
    },
  ];

  function runClaim(
    label: string,
    mutation: {
      mutate: (
        vars: undefined,
        opts: { onSuccess: () => void; onError: (e: unknown) => void },
      ) => void;
    },
  ) {
    setNotice(null);
    mutation.mutate(undefined, {
      onSuccess: () =>
        setNotice({
          tone: "success",
          message: `${label} recorded. Your recognition score has been updated.`,
        }),
      onError: (error) =>
        setNotice({ tone: "error", message: toMessage(error) }),
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-6" data-ocid="founding_credits.loading_state">
        <LoadingSkeleton variant="stat" rows={4} />
        <LoadingSkeleton variant="list" rows={3} />
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <EmptyState
        icon={Award}
        title="We couldn't load your Founding Credits"
        description="Your recognition score and history could not be retrieved. Check your connection and try again."
        action={
          <Button
            type="button"
            variant="outline"
            data-ocid="founding_credits.retry_button"
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
    <div className="space-y-6" data-ocid="founding_credits.panel">
      <section
        aria-label="Founding Member recognition"
        className="relative overflow-hidden rounded-3xl border border-warning/30 bg-gradient-to-br from-warning/10 via-card/60 to-card/60 p-6 shadow-elevated backdrop-blur sm:p-8"
      >
        <div
          aria-hidden="true"
          className="ambient-orb -right-10 -top-10 size-40 bg-warning"
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <FoundingBadge kind={summary.badge ?? FoundingBadgeKind.consumer} />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Recognition score
            </p>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Founding Credits are a simulated recognition score for early
            supporters. They are not money, equity, a token or an investment,
            and they are kept separate from your ownership units, contributions
            and portfolio value.
          </p>
        </div>
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
          hint="Your unique founding member number"
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
              title="What each action is worth"
              description="Current reward amounts for consumer actions."
            />
            {amounts ? (
              <dl className="mt-5 grid grid-cols-2 gap-2 text-sm">
                {consumerRewardTypes.map((type) => (
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
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">
                Reward amounts are unavailable right now.
              </p>
            )}
          </section>

          {referralCode ? (
            <ReferralPanel referralCode={referralCode} />
          ) : (
            <section className="rounded-2xl border border-border bg-card/60 p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-chart-3/15 text-chart-3">
                  <UserPlus aria-hidden="true" className="size-4" />
                </span>
                <h3 className="font-display text-base font-semibold">
                  Referral link
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Your personal referral link appears here once you earn your
                first Founding Credit.
              </p>
            </section>
          )}
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-card/60 p-5 sm:p-6">
        <SectionHeading
          title="Qualifying actions"
          description="Complete these actions to earn Founding Credits. Your balance and history refresh after each award."
        />
        {notice && (
          <output
            data-ocid={
              notice.tone === "error"
                ? "founding_credits.claim.error_state"
                : "founding_credits.claim.success_state"
            }
            className={cn(
              "mt-4 rounded-xl border px-4 py-2.5 text-sm",
              notice.tone === "error"
                ? "border-destructive/40 bg-destructive/10 text-destructive"
                : "border-primary/40 bg-primary/10 text-primary",
            )}
          >
            {notice.message}
          </output>
        )}
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const pending = action.mutation.isPending;
            return (
              <li
                key={action.type}
                data-ocid={`founding_credits.action.item.${index + 1}`}
                className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background/40 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{action.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  data-ocid={`founding_credits.action.claim_button.${index + 1}`}
                  disabled={pending}
                  onClick={() => runClaim(action.label, action.mutation)}
                  className="mt-auto self-start rounded-full"
                >
                  {pending ? "Recording…" : "Claim"}
                </Button>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="founding-benefits-heading"
        className="rounded-2xl border border-dashed border-border bg-card/40 p-5 sm:p-6"
      >
        <div className="flex items-center gap-2">
          <Lock aria-hidden="true" className="size-4 text-muted-foreground" />
          <h3
            id="founding-benefits-heading"
            className="font-display text-base font-semibold"
          >
            Future credit benefits
          </h3>
          <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Not yet active
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          These are possibilities under consideration, not current entitlements.
          Nothing here can be redeemed today, and none of it is money, equity or
          an investment.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {futureBenefits.map((benefit, index) => (
            <li
              key={benefit.title}
              data-ocid={`founding_credits.benefit.item.${index + 1}`}
              className="rounded-xl border border-border/60 bg-background/40 p-4"
            >
              <p className="text-sm font-semibold text-foreground">
                {benefit.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
