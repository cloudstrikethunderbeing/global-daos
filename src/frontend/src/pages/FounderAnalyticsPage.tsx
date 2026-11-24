import type { FounderAnalytics, RewardAmounts } from "@/backend";
import { RewardType } from "@/backend";
import { RequireSignIn, SignInButton } from "@/components/InternetIdentity";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useFounderAnalytics,
  useIsCallerAdmin,
  useRewardAmounts,
  useSetRewardAmounts,
} from "@/hooks/useQueries";
import {
  formatCredits,
  rewardTypeHints,
  rewardTypeLabels,
  rewardTypeOrder,
} from "@/lib/credits";
import { describeBackendError, errorMessage } from "@/lib/errors";
import { formatBps, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  ArrowDownRight,
  BarChart3,
  CheckCircle2,
  Coins,
  Gift,
  Lock,
  MousePointerClick,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

type Stage = {
  key: string;
  label: string;
  value: bigint;
  icon: LucideIcon;
  /** Tailwind classes for the bar fill. */
  fill: string;
  /** Tailwind text color for the icon + value. */
  tone: string;
};

function buildStages(a: FounderAnalytics): Stage[] {
  return [
    {
      key: "visits",
      label: "Visits",
      value: a.uniqueVisitors,
      icon: Users,
      fill: "bg-gradient-to-r from-primary/80 to-primary",
      tone: "text-primary",
    },
    {
      key: "demo",
      label: "Demo purchases",
      value: a.demoPurchasesCompleted,
      icon: MousePointerClick,
      fill: "bg-gradient-to-r from-accent/80 to-accent",
      tone: "text-accent",
    },
    {
      key: "consumer",
      label: "Consumer registrations",
      value: a.consumerRegistrations,
      icon: UserPlus,
      fill: "bg-gradient-to-r from-chart-3/80 to-chart-3",
      tone: "text-chart-3",
    },
    {
      key: "business",
      label: "Business registrations",
      value: a.businessRegistrations,
      icon: Store,
      fill: "bg-gradient-to-r from-warning/80 to-warning",
      tone: "text-warning",
    },
    {
      key: "dao",
      label: "DAO deployments",
      value: a.daoDeployments,
      icon: Rocket,
      fill: "bg-gradient-to-r from-primary/70 to-accent/80",
      tone: "text-primary",
    },
  ];
}

/** Conversion between consecutive stages, computed from the real counts. */
function conversionBps(from: bigint, to: bigint): bigint {
  if (from <= 0n) return 0n;
  return (to * 10_000n) / from;
}

function FunnelChart({ stages }: { stages: Stage[] }) {
  const reduce = useReducedMotion();
  const max = stages.reduce(
    (m, s) => (s.value > m ? s.value : m),
    stages[0]?.value ?? 0n,
  );
  const maxNum = max > 0n ? Number(max) : 1;

  return (
    <div data-ocid="analytics.funnel.chart" className="space-y-1">
      {stages.map((stage, index) => {
        const pct = Math.max(
          stage.value > 0n ? 4 : 0,
          (Number(stage.value) / maxNum) * 100,
        );
        const prev = index > 0 ? stages[index - 1] : undefined;
        const stepBps = prev ? conversionBps(prev.value, stage.value) : null;
        const Icon = stage.icon;
        return (
          <div key={stage.key}>
            {prev && stepBps !== null && (
              <div className="flex items-center gap-2 py-1.5 pl-1 text-xs text-muted-foreground">
                <ArrowDownRight
                  aria-hidden="true"
                  className="size-3.5 text-muted-foreground/70"
                />
                <span className="font-numeric font-semibold text-foreground">
                  {formatBps(stepBps)}
                </span>
                <span>
                  of {prev.label.toLowerCase()} continue to{" "}
                  {stage.label.toLowerCase()}
                </span>
              </div>
            )}
            <div
              data-ocid={`analytics.funnel.stage.${index + 1}`}
              className="rounded-xl border border-border bg-card/60 p-3.5 transition-smooth hover:border-primary/40 sm:p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/70",
                      stage.tone,
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="truncate text-sm font-medium">
                    {stage.label}
                  </span>
                </div>
                <span className="font-numeric shrink-0 text-lg font-semibold tabular-nums">
                  {formatNumber(stage.value)}
                </span>
              </div>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className={cn("h-full rounded-full", stage.fill)}
                  initial={reduce ? false : { width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    duration: 0.7,
                    delay: reduce ? 0 : index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ConversionChart({ stages }: { stages: Stage[] }) {
  const reduce = useReducedMotion();
  const rows = stages.slice(1).map((stage, i) => {
    const prev = stages[i];
    return {
      key: `${prev.key}-${stage.key}`,
      label: `${prev.label} → ${stage.label}`,
      bps: conversionBps(prev.value, stage.value),
    };
  });
  const maxBps = rows.reduce((m, r) => (r.bps > m ? r.bps : m), 1n);
  const maxNum = Number(maxBps) || 1;

  return (
    <div data-ocid="analytics.conversion.chart" className="space-y-4">
      {rows.map((row, index) => {
        const pct = Math.max(
          row.bps > 0n ? 3 : 0,
          (Number(row.bps) / maxNum) * 100,
        );
        return (
          <div
            key={row.key}
            data-ocid={`analytics.conversion.row.${index + 1}`}
          >
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="min-w-0 truncate text-xs text-muted-foreground">
                {row.label}
              </span>
              <span className="font-numeric shrink-0 text-sm font-semibold tabular-nums">
                {formatBps(row.bps)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent/70 via-chart-3/80 to-primary"
                initial={reduce ? false : { width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{
                  duration: 0.7,
                  delay: reduce ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Bar fills cycled across the reward-type breakdown. */
const breakdownFills = [
  "bg-gradient-to-r from-primary/80 to-primary",
  "bg-gradient-to-r from-accent/80 to-accent",
  "bg-gradient-to-r from-chart-3/80 to-chart-3",
  "bg-gradient-to-r from-warning/80 to-warning",
];

function CreditsBreakdown({ analytics }: { analytics: FounderAnalytics }) {
  const reduce = useReducedMotion();
  const byKey = new Map(analytics.creditsByRewardType);
  const rows = rewardTypeOrder
    .map((type) => ({
      type,
      label: rewardTypeLabels[type],
      amount: byKey.get(type) ?? 0n,
    }))
    .filter((row) => row.amount > 0n);
  const max = rows.reduce((m, r) => (r.amount > m ? r.amount : m), 0n);
  const maxNum = max > 0n ? Number(max) : 1;

  if (rows.length === 0) {
    return (
      <div
        data-ocid="analytics.credits.empty_state"
        className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-4 py-10 text-center"
      >
        <Gift aria-hidden="true" className="size-6 text-muted-foreground" />
        <p className="text-sm font-medium">No credits awarded yet</p>
        <p className="max-w-sm text-xs text-muted-foreground">
          Reward distributions appear here as founding members earn simulated
          Founding Credits.
        </p>
      </div>
    );
  }

  return (
    <div data-ocid="analytics.credits.chart" className="space-y-4">
      {rows.map((row, index) => {
        const pct = Math.max(
          row.amount > 0n ? 3 : 0,
          (Number(row.amount) / maxNum) * 100,
        );
        return (
          <div key={row.type} data-ocid={`analytics.credits.row.${index + 1}`}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="min-w-0 truncate text-xs text-muted-foreground">
                {row.label}
              </span>
              <span className="font-numeric shrink-0 text-sm font-semibold tabular-nums">
                {formatCredits(row.amount)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  breakdownFills[index % breakdownFills.length],
                )}
                initial={reduce ? false : { width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{
                  duration: 0.7,
                  delay: reduce ? 0 : index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CreditsAndReferrals({ analytics }: { analytics: FounderAnalytics }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Credits awarded"
          value={formatCredits(analytics.totalCreditsAwarded)}
          hint="Simulated Founding Credits, all time"
          icon={Coins}
          tone="gold"
        />
        <StatCard
          label="Founding members"
          value={formatNumber(analytics.foundingMemberCount)}
          hint="Recognised supporters"
          icon={Sparkles}
          tone="violet"
        />
        <StatCard
          label="Referrals attributed"
          value={formatNumber(analytics.referralsAttributed)}
          hint="Sign-ups linked to a referral code"
          icon={UserPlus}
          tone="cyan"
        />
        <StatCard
          label="Referrals converted"
          value={formatNumber(analytics.referralsConverted)}
          hint={`${formatCredits(analytics.creditsPaidForReferrals)} credits paid`}
          icon={CheckCircle2}
          tone="emerald"
        />
      </div>

      <section
        aria-labelledby="credits-breakdown-heading"
        className="rounded-2xl border border-border bg-card/50 p-5 shadow-elevated backdrop-blur sm:p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <Coins aria-hidden="true" className="size-4 text-warning" />
          <h3
            id="credits-breakdown-heading"
            className="font-display text-base font-semibold"
          >
            Credits by reward type
          </h3>
        </div>
        <CreditsBreakdown analytics={analytics} />
      </section>
    </div>
  );
}

type AmountDraft = Record<RewardType, string>;

function toDraft(amounts: RewardAmounts): AmountDraft {
  return {
    [RewardType.firstSimulatedPurchase]:
      amounts.firstSimulatedPurchase.toString(),
    [RewardType.valuableFeedback]: amounts.valuableFeedback.toString(),
    [RewardType.daoDeployment]: amounts.daoDeployment.toString(),
    [RewardType.consumerReferral]: amounts.consumerReferral.toString(),
    [RewardType.earlyConsumerRegistration]:
      amounts.earlyConsumerRegistration.toString(),
    [RewardType.foundingBusinessRegistration]:
      amounts.foundingBusinessRegistration.toString(),
    [RewardType.businessReferral]: amounts.businessReferral.toString(),
    [RewardType.businessNomination]: amounts.businessNomination.toString(),
  };
}

function RewardAmountEditor() {
  const { data: amounts, isLoading } = useRewardAmounts();
  const setAmounts = useSetRewardAmounts();
  const [draft, setDraft] = useState<AmountDraft | null>(null);
  const [saved, setSaved] = useState<RewardAmounts | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return <LoadingSkeleton variant="list" rows={4} />;
  }

  if (!amounts) {
    return (
      <EmptyState
        icon={Gift}
        title="Reward amounts are unavailable"
        description="We could not load the current reward amounts. Refresh the page to try again."
      />
    );
  }

  const current = draft ?? toDraft(amounts);
  const invalid = rewardTypeOrder.some((type) => {
    const raw = current[type].trim();
    return raw === "" || !/^\d+$/.test(raw);
  });

  const update = (type: RewardType, value: string) => {
    setDraft({ ...current, [type]: value });
    setSaved(null);
    setError(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (invalid) return;
    const next: RewardAmounts = {
      firstSimulatedPurchase: BigInt(
        current[RewardType.firstSimulatedPurchase],
      ),
      valuableFeedback: BigInt(current[RewardType.valuableFeedback]),
      daoDeployment: BigInt(current[RewardType.daoDeployment]),
      consumerReferral: BigInt(current[RewardType.consumerReferral]),
      earlyConsumerRegistration: BigInt(
        current[RewardType.earlyConsumerRegistration],
      ),
      foundingBusinessRegistration: BigInt(
        current[RewardType.foundingBusinessRegistration],
      ),
      businessReferral: BigInt(current[RewardType.businessReferral]),
      businessNomination: BigInt(current[RewardType.businessNomination]),
    };
    setError(null);
    setAmounts.mutate(next, {
      onSuccess: (result) => {
        setSaved(result);
        setDraft(toDraft(result));
      },
      onError: (err) => {
        setError(
          err && typeof err === "object" && "__kind__" in err
            ? describeBackendError(err as { __kind__: string })
            : errorMessage(err),
        );
      },
    });
  };

  return (
    <form
      data-ocid="analytics.rewards.form"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {rewardTypeOrder.map((type) => {
          const inputId = `reward-${type}`;
          return (
            <div key={type} className="space-y-1.5">
              <Label htmlFor={inputId} className="text-sm font-medium">
                {rewardTypeLabels[type]}
              </Label>
              <Input
                id={inputId}
                data-ocid={`analytics.rewards.input.${type}`}
                inputMode="numeric"
                pattern="[0-9]*"
                value={current[type]}
                onChange={(event) => update(type, event.target.value)}
                aria-describedby={`${inputId}-hint`}
                className="font-numeric"
              />
              <p
                id={`${inputId}-hint`}
                className="text-xs text-muted-foreground"
              >
                {rewardTypeHints[type]} · currently{" "}
                <span className="font-numeric font-semibold text-foreground">
                  {formatCredits(amounts[type])}
                </span>{" "}
                credits
              </p>
            </div>
          );
        })}
      </div>

      {invalid && (
        <p
          data-ocid="analytics.rewards.error_state"
          className="text-sm text-destructive"
        >
          Enter a whole number of credits for every reward type.
        </p>
      )}
      {error && (
        <p
          data-ocid="analytics.rewards.error_state"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}
      {saved && (
        <p
          data-ocid="analytics.rewards.success_state"
          className="flex items-center gap-2 text-sm text-primary"
        >
          <CheckCircle2 aria-hidden="true" className="size-4" />
          Reward amounts saved. New claims use these values.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          data-ocid="analytics.rewards.save_button"
          disabled={invalid || setAmounts.isPending}
          className="rounded-full"
        >
          {setAmounts.isPending ? "Saving…" : "Save reward amounts"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Changes apply to future credit claims only.
        </p>
      </div>
    </form>
  );
}

function AccessDenied() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <EmptyState
        icon={Lock}
        title="Founder analytics are private"
        description="This dashboard is restricted to the platform administrator. If you believe you should have access, sign in with the administrator's Internet Identity."
        action={
          <SignInButton className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-smooth hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
        }
      />
    </div>
  );
}

function AnalyticsDashboard() {
  const { data, isLoading, isError } = useFounderAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="stat" rows={4} />
        <LoadingSkeleton variant="list" rows={5} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <EmptyState
        icon={BarChart3}
        title="Analytics are unavailable"
        description="We could not load the funnel right now. Refresh the page to try again."
      />
    );
  }

  const stages = buildStages(data);
  const overallBps = conversionBps(data.uniqueVisitors, data.daoDeployments);

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Unique visitors"
          value={formatNumber(data.uniqueVisitors)}
          hint={`${formatNumber(data.returningUsers)} returning`}
          icon={Users}
          tone="emerald"
        />
        <StatCard
          label="Consumer registrations"
          value={formatNumber(data.consumerRegistrations)}
          hint="Real early-access sign-ups"
          icon={UserPlus}
          tone="cyan"
        />
        <StatCard
          label="Business registrations"
          value={formatNumber(data.businessRegistrations)}
          hint={`${formatNumber(data.businessNominations)} nominations`}
          icon={Store}
          tone="gold"
        />
        <StatCard
          label="Visit → DAO conversion"
          value={formatBps(overallBps)}
          hint="End-to-end funnel rate"
          icon={Rocket}
          tone="violet"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section
          aria-labelledby="funnel-heading"
          className="rounded-2xl border border-border bg-card/50 p-5 shadow-elevated backdrop-blur sm:p-6 lg:col-span-3"
        >
          <div className="mb-5 flex items-center gap-2">
            <BarChart3 aria-hidden="true" className="size-4 text-primary" />
            <h3
              id="funnel-heading"
              className="font-display text-base font-semibold"
            >
              Funnel stages
            </h3>
          </div>
          <FunnelChart stages={stages} />
        </section>

        <section
          aria-labelledby="conversion-heading"
          className="rounded-2xl border border-border bg-card/50 p-5 shadow-elevated backdrop-blur sm:p-6 lg:col-span-2"
        >
          <div className="mb-5 flex items-center gap-2">
            <ArrowDownRight aria-hidden="true" className="size-4 text-accent" />
            <h3
              id="conversion-heading"
              className="font-display text-base font-semibold"
            >
              Conversion between stages
            </h3>
          </div>
          <ConversionChart stages={stages} />
        </section>
      </div>

      <CreditsAndReferrals analytics={data} />

      <section
        aria-labelledby="reward-amounts-heading"
        className="rounded-2xl border border-border bg-card/50 p-5 shadow-elevated backdrop-blur sm:p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <Gift aria-hidden="true" className="size-4 text-chart-3" />
          <h3
            id="reward-amounts-heading"
            className="font-display text-base font-semibold"
          >
            Reward amounts
          </h3>
        </div>
        <p className="mb-5 max-w-2xl text-sm text-muted-foreground">
          Set how many simulated Founding Credits each reward type grants.
          Credits are recognition markers only — never money, equity, a token or
          an investment.
        </p>
        <RewardAmountEditor />
      </section>
    </div>
  );
}

function AdminGate() {
  const { data: isAdmin, isLoading } = useIsCallerAdmin();

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingSkeleton variant="stat" rows={4} />
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          <ShieldCheck aria-hidden="true" className="size-3.5" />
          Administrator
        </span>
      </div>
      <SectionHeading
        eyebrow="Founder analytics"
        title="Conversion funnel"
        description="Real registration and engagement counts across the ownership economy, with the conversion rate between each stage."
        className="mb-8"
      />
      <SimulatedBanner className="mb-8" />
      <AnalyticsDashboard />
    </div>
  );
}

export default function FounderAnalyticsPage() {
  return (
    <RequireSignIn
      fallback={
        <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            icon={Lock}
            title="Sign in to view founder analytics"
            description="This private dashboard tracks real registrations, demo engagement and conversion rates. Sign in with the administrator's Internet Identity to continue."
            action={
              <SignInButton className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-smooth hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
            }
          />
        </div>
      }
    >
      <AdminGate />
    </RequireSignIn>
  );
}
