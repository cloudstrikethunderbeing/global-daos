import type { BusinessPublic, CreateBusinessInput } from "@/backend";
import { SignInButton } from "@/components/InternetIdentity";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateBusiness,
  useRecordBusinessRegistration,
  useRecordDaoDeployment,
} from "@/hooks/useQueries";
import { describeBackendError, errorMessage } from "@/lib/errors";
import { formatBps, formatCurrency, slugify } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDollarSign,
  Loader2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

const CATEGORIES = [
  "Coffee & Cafés",
  "Bakery & Food",
  "Retail & Goods",
  "Fitness & Wellness",
  "Creative Studio",
  "Home Services",
  "Hospitality",
  "Other",
];

const STEPS = [
  { id: "identity", label: "Business", icon: Sparkles },
  { id: "capital", label: "Capital", icon: CircleDollarSign },
  { id: "ownership", label: "Ownership", icon: Users },
  { id: "review", label: "Deploy", icon: Rocket },
] as const;

type StepId = (typeof STEPS)[number]["id"];

interface Draft {
  name: string;
  category: string;
  description: string;
  city: string;
  goalDollars: string;
  poolPercent: string;
  roundUpPercent: string;
  loyaltyRewards: boolean;
  matchingContributions: boolean;
  profitParticipation: boolean;
}

const INITIAL_DRAFT: Draft = {
  name: "",
  category: CATEGORIES[0],
  description: "",
  city: "",
  goalDollars: "25000",
  poolPercent: "20",
  roundUpPercent: "5",
  loyaltyRewards: false,
  matchingContributions: false,
  profitParticipation: false,
};

function toCents(dollars: string): bigint {
  const value = Number.parseFloat(dollars);
  if (!Number.isFinite(value) || value < 0) return 0n;
  return BigInt(Math.round(value * 100));
}

function toBps(percent: string): bigint {
  const value = Number.parseFloat(percent);
  if (!Number.isFinite(value) || value < 0) return 0n;
  return BigInt(Math.round(value * 100));
}

function buildInput(draft: Draft): CreateBusinessInput {
  const goal = toCents(draft.goalDollars);
  const pool = toBps(draft.poolPercent);
  const name = draft.name.trim();
  return {
    name,
    slug: slugify(name) || `dao-${Date.now().toString(36)}`,
    description: draft.description.trim(),
    industry: draft.category,
    city: draft.city.trim() || "Remote",
    country: "United States",
    isFictional: true,
    constitution:
      "Consumer-funded ownership. Round-ups are the default contribution model; business-funded incentives remain optional and off unless enabled by the founder.",
    consumerOwnershipPool: pool,
    totalOwnershipSupply: 10_000n,
    maxFundraisingTarget: goal,
    minContribution: 100n,
    maxContribution: goal,
    ownershipRights: {
      transferable: false,
      votingEnabled: true,
      profitShareEnabled: draft.profitParticipation,
      rightsSummary:
        "One member, one vote on governance proposals. Ownership units vest over time and are non-transferable.",
    },
    vesting: {
      transferRestricted: true,
      cliffMonths: 6n,
      vestingMonths: 48n,
      restrictionsSummary:
        "48-month vesting with a 6-month cliff. Units are non-transferable while vesting.",
    },
    valuation: {
      preMoneyValuation: goal,
      annualRevenue: goal / 2n,
      revenueMultiple: 2,
      notes: "Founder-provided simulated valuation assumptions.",
    },
    participation: {
      maxContribution: goal,
      minContribution: 100n,
      incentives: {
        loyaltyRewards: draft.loyaltyRewards,
        matchingContributions: draft.matchingContributions,
        businessFundedOwnership: false,
        promotionalAllocations: false,
        profitParticipation: draft.profitParticipation,
      },
      contributionOptions: {
        roundToNearestDollar: true,
        roundToNearestFive: true,
        roundToNearestTen: false,
        customAllowed: true,
        optOutAllowed: true,
      },
    },
    foundingAuthorities: [
      {
        name: "Founder",
        role: "Founder & Steward",
        contact: "founder@example.com",
      },
    ],
    logo: undefined,
  };
}

export default function LaunchPage() {
  const reduce = useReducedMotion();
  const { identity } = useInternetIdentity();
  const authenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const [step, setStep] = useState<StepId>("identity");
  const [draft, setDraft] = useState<Draft>(INITIAL_DRAFT);
  const [error, setError] = useState<string | null>(null);
  const [deployed, setDeployed] = useState<BusinessPublic | null>(null);

  const createBusiness = useCreateBusiness();
  const recordRegistration = useRecordBusinessRegistration();
  const recordDeployment = useRecordDaoDeployment();

  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const roundUpBps = toBps(draft.roundUpPercent);
  const poolBps = toBps(draft.poolPercent);
  const goalCents = toCents(draft.goalDollars);

  const canAdvance = useMemo(() => {
    if (step === "identity")
      return (
        draft.name.trim().length >= 2 && draft.description.trim().length >= 10
      );
    if (step === "capital") return goalCents > 0n;
    if (step === "ownership")
      return (
        poolBps > 0n &&
        poolBps <= 10_000n &&
        roundUpBps > 0n &&
        roundUpBps <= 10_000n
      );
    return true;
  }, [step, draft.name, draft.description, goalCents, poolBps, roundUpBps]);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  function goNext() {
    if (!canAdvance) return;
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next.id);
  }

  function goBack() {
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev.id);
  }

  function deploy() {
    setError(null);
    const input = buildInput(draft);
    createBusiness.mutate(input, {
      onSuccess: (business) => {
        setDeployed(business);
        recordRegistration.mutate();
        recordDeployment.mutate();
      },
      onError: (err) => {
        if (err && typeof err === "object" && "__kind__" in err) {
          setError(
            describeBackendError(
              err as unknown as { __kind__: string; [k: string]: unknown },
            ),
          );
        } else {
          setError(errorMessage(err));
        }
      },
    });
  }

  if (deployed) {
    return (
      <Reveal business={deployed} roundUpBps={roundUpBps} reduce={!!reduce} />
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="ambient-orb -left-24 top-0 size-72 bg-primary/40"
      />
      <div
        aria-hidden="true"
        className="ambient-orb -right-16 top-40 size-64 bg-accent/30"
      />

      <div className="relative">
        <SimulatedBanner className="mb-8" />
        <SectionHeading
          eyebrow="Business DAO launcher"
          title="Launch your business DAO"
          description="Four quick steps. Sign in only when you deploy — the wizard is yours to explore first."
        />

        <Stepper current={stepIndex} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === "identity" && (
                  <IdentityStep draft={draft} update={update} />
                )}
                {step === "capital" && (
                  <CapitalStep draft={draft} update={update} />
                )}
                {step === "ownership" && (
                  <OwnershipStep draft={draft} update={update} />
                )}
                {step === "review" && (
                  <ReviewStep
                    draft={draft}
                    authenticated={authenticated}
                    pending={createBusiness.isPending}
                    error={error}
                    onDeploy={deploy}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {step !== "review" && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  data-ocid="launch.back_button"
                  onClick={goBack}
                  disabled={stepIndex === 0}
                  className="rounded-full"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  data-ocid="launch.next_button"
                  onClick={goNext}
                  disabled={!canAdvance}
                  className="rounded-full bg-primary px-6 text-primary-foreground"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            )}
          </div>

          <PreviewCard
            draft={draft}
            goalCents={goalCents}
            poolBps={poolBps}
            roundUpBps={roundUpBps}
          />
        </div>
      </div>
    </div>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <ol
      data-ocid="launch.stepper"
      className="mt-8 flex items-center gap-2 overflow-x-auto pb-1"
    >
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const Icon = s.icon;
        return (
          <li key={s.id} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                active && "border-primary/60 bg-primary/10 text-primary",
                done && "border-primary/30 bg-primary/5 text-primary/80",
                !active && !done && "border-border text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full text-[10px]",
                  active && "bg-primary text-primary-foreground",
                  done && "bg-primary/20 text-primary",
                  !active && !done && "bg-muted text-muted-foreground",
                )}
              >
                {done ? (
                  <Check className="size-3" />
                ) : (
                  <Icon className="size-3" />
                )}
              </span>
              <span className="whitespace-nowrap">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "hidden h-px flex-1 sm:block",
                  done ? "bg-primary/40" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function IdentityStep({
  draft,
  update,
}: {
  draft: Draft;
  update: <K extends keyof Draft>(key: K, value: Draft[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <StepTitle
        title="Name your business"
        subtitle="This is what members see in the directory and on your profile."
      />
      <Field label="Business name" htmlFor="biz-name">
        <Input
          id="biz-name"
          data-ocid="launch.name_input"
          value={draft.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Fern & Forge Coffee"
          autoComplete="organization"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Category" htmlFor="biz-category">
          <select
            id="biz-category"
            data-ocid="launch.category_select"
            value={draft.category}
            onChange={(e) => update("category", e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="City"
          htmlFor="biz-city"
          hint="Optional — defaults to Remote."
        >
          <Input
            id="biz-city"
            data-ocid="launch.city_input"
            value={draft.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="Portland"
          />
        </Field>
      </div>
      <Field
        label="Description"
        htmlFor="biz-desc"
        hint="At least 10 characters. Tell members what they're backing."
      >
        <Textarea
          id="biz-desc"
          data-ocid="launch.description_textarea"
          value={draft.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="A neighborhood roastery turning daily round-ups into shared ownership."
          rows={4}
        />
      </Field>
    </div>
  );
}

function CapitalStep({
  draft,
  update,
}: {
  draft: Draft;
  update: <K extends keyof Draft>(key: K, value: Draft[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <StepTitle
        title="Set your funding goal"
        subtitle="The maximum simulated capital your DAO will raise from consumer round-ups."
      />
      <Field
        label="Funding goal (USD)"
        htmlFor="biz-goal"
        hint="Backend enforces this as the fundraising ceiling."
      >
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <Input
            id="biz-goal"
            data-ocid="launch.goal_input"
            type="number"
            min={100}
            step={500}
            value={draft.goalDollars}
            onChange={(e) => update("goalDollars", e.target.value)}
            className="pl-7 font-numeric"
          />
        </div>
      </Field>
      <div className="grid grid-cols-3 gap-2">
        {["10000", "25000", "100000"].map((preset) => (
          <Button
            key={preset}
            type="button"
            variant="outline"
            data-ocid={`launch.goal_preset.${preset}`}
            onClick={() => update("goalDollars", preset)}
            className={cn(
              "rounded-full font-numeric",
              draft.goalDollars === preset && "border-primary text-primary",
            )}
          >
            ${Number(preset).toLocaleString()}
          </Button>
        ))}
      </div>
    </div>
  );
}

function OwnershipStep({
  draft,
  update,
}: {
  draft: Draft;
  update: <K extends keyof Draft>(key: K, value: Draft[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <StepTitle
        title="Ownership & round-ups"
        subtitle="Consumer-funded round-ups are the default model. Incentives stay off unless you opt in."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Ownership pool (%)"
          htmlFor="biz-pool"
          hint="Share of the DAO reserved for consumer owners."
        >
          <Input
            id="biz-pool"
            data-ocid="launch.pool_input"
            type="number"
            min={1}
            max={100}
            step={1}
            value={draft.poolPercent}
            onChange={(e) => update("poolPercent", e.target.value)}
            className="font-numeric"
          />
        </Field>
        <Field
          label="Round-up rate (%)"
          htmlFor="biz-roundup"
          hint="Portion of each purchase rounded up into ownership."
        >
          <Input
            id="biz-roundup"
            data-ocid="launch.roundup_input"
            type="number"
            min={1}
            max={100}
            step={1}
            value={draft.roundUpPercent}
            onChange={(e) => update("roundUpPercent", e.target.value)}
            className="font-numeric"
          />
        </Field>
      </div>

      <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Optional incentives — off by default
        </p>
        <ToggleRow
          id="loyalty"
          label="Loyalty rewards"
          description="Business-funded perks for repeat owners."
          checked={draft.loyaltyRewards}
          onChange={(v) => update("loyaltyRewards", v)}
        />
        <ToggleRow
          id="matching"
          label="Matching contributions"
          description="Business matches a portion of consumer round-ups."
          checked={draft.matchingContributions}
          onChange={(v) => update("matchingContributions", v)}
        />
        <ToggleRow
          id="profit"
          label="Profit participation"
          description="Owners share in simulated profit distributions."
          checked={draft.profitParticipation}
          onChange={(v) => update("profitParticipation", v)}
        />
      </div>
    </div>
  );
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <Label htmlFor={`toggle-${id}`} className="text-sm font-medium">
          {label}
        </Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        id={`toggle-${id}`}
        data-ocid={`launch.toggle.${id}`}
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  );
}

function ReviewStep({
  draft,
  authenticated,
  pending,
  error,
  onDeploy,
}: {
  draft: Draft;
  authenticated: boolean;
  pending: boolean;
  error: string | null;
  onDeploy: () => void;
}) {
  return (
    <div className="space-y-5">
      <StepTitle
        title="Review & deploy"
        subtitle="Confirm the details, then deploy your persistent business DAO."
      />
      <dl className="divide-y divide-border rounded-xl border border-border">
        <ReviewRow label="Business" value={draft.name.trim() || "—"} />
        <ReviewRow label="Category" value={draft.category} />
        <ReviewRow
          label="Funding goal"
          value={formatCurrency(toCents(draft.goalDollars))}
        />
        <ReviewRow
          label="Ownership pool"
          value={formatBps(toBps(draft.poolPercent))}
        />
        <ReviewRow
          label="Round-up rate"
          value={formatBps(toBps(draft.roundUpPercent))}
        />
        <ReviewRow
          label="Incentives"
          value={
            [
              draft.loyaltyRewards && "Loyalty",
              draft.matchingContributions && "Matching",
              draft.profitParticipation && "Profit share",
            ]
              .filter(Boolean)
              .join(", ") || "None (default)"
          }
        />
      </dl>

      {error && (
        <div
          role="alert"
          data-ocid="launch.error_state"
          className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {authenticated ? (
        <Button
          type="button"
          data-ocid="launch.deploy_button"
          onClick={onDeploy}
          disabled={pending}
          className="w-full rounded-full bg-primary py-6 text-base font-semibold text-primary-foreground shadow-glow"
        >
          {pending ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Deploying your DAO…
            </>
          ) : (
            <>
              <Rocket className="size-5" />
              Deploy business DAO
            </>
          )}
        </Button>
      ) : (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="mb-3 text-sm text-muted-foreground">
            Sign in with Internet Identity to deploy a persistent business DAO.
          </p>
          <SignInButton className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60" />
        </div>
      )}
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5" />
        All activity is simulated. No real money moves.
      </p>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 truncate text-right text-sm font-medium">
        {value}
      </dd>
    </div>
  );
}

function StepTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function PreviewCard({
  draft,
  goalCents,
  poolBps,
  roundUpBps,
}: {
  draft: Draft;
  goalCents: bigint;
  poolBps: bigint;
  roundUpBps: bigint;
}) {
  return (
    <aside className="h-fit rounded-2xl border border-border bg-gradient-subtle p-5 lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Live preview
      </p>
      <h3 className="mt-2 truncate font-display text-lg font-semibold">
        {draft.name.trim() || "Your business DAO"}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
        {draft.description.trim() || "Your description appears here."}
      </p>
      <div className="mt-4 space-y-3">
        <PreviewStat
          label="Funding goal"
          value={formatCurrency(goalCents)}
          accent="text-accent"
        />
        <PreviewStat
          label="Ownership pool"
          value={formatBps(poolBps)}
          accent="text-violet"
        />
        <PreviewStat
          label="Round-up rate"
          value={formatBps(roundUpBps)}
          accent="text-primary"
        />
      </div>
      <div className="mt-4 rounded-lg border border-gold/30 bg-gold/10 px-3 py-2 text-xs text-foreground">
        <span className="font-semibold text-gold">
          Consumer-funded by default.
        </span>{" "}
        Incentives are optional.
      </div>
    </aside>
  );
}

function PreviewStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn("font-numeric text-sm font-semibold", accent)}>
        {value}
      </span>
    </div>
  );
}

function Reveal({
  business,
  roundUpBps,
  reduce,
}: {
  business: BusinessPublic;
  roundUpBps: bigint;
  reduce: boolean;
}) {
  const stats = [
    {
      label: "Funding goal",
      value: formatCurrency(business.maxFundraisingTarget),
      accent: "text-accent",
    },
    {
      label: "Ownership pool",
      value: formatBps(business.consumerOwnershipPool),
      accent: "text-violet",
    },
    {
      label: "Round-up rate",
      value: formatBps(roundUpBps),
      accent: "text-primary",
    },
  ];
  return (
    <div className="relative mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="ambient-orb left-1/2 top-10 size-80 -translate-x-1/2 bg-primary/40"
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl border border-primary/30 bg-card/90 p-8 text-center shadow-glow backdrop-blur sm:p-12"
        data-ocid="launch.success_state"
      >
        <motion.div
          initial={reduce ? false : { scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 200,
            damping: 14,
          }}
          className="mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground"
        >
          <Check className="size-8" />
        </motion.div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          DAO deployed
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          <span className="text-gradient-spectrum">{business.name}</span> is
          live
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Your business DAO is deployed. Members can now round up purchases into
          shared ownership. Your founding business registration and completed
          deployment Founding Credits have been added to your workspace.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className="rounded-xl border border-border bg-background/60 p-4"
            >
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p
                className={cn("mt-1 font-numeric text-lg font-bold", s.accent)}
              >
                {s.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            className="rounded-full bg-primary px-6 text-primary-foreground"
          >
            <Link
              to="/admin/$businessId"
              params={{ businessId: business.id.toString() }}
              data-ocid="launch.admin_link"
            >
              Open admin workspace
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link
              to="/business/$slug"
              params={{ slug: business.slug }}
              data-ocid="launch.profile_link"
            >
              View public profile
            </Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <Link
            to="/directory"
            search={(prev) => prev}
            data-ocid="launch.directory_link"
            className="text-primary underline-offset-4 hover:underline"
          >
            Browse the directory
          </Link>
          <Link
            to="/founding"
            data-ocid="launch.founding_link"
            className="inline-flex items-center gap-1 text-gold underline-offset-4 hover:underline"
          >
            <Sparkles className="size-3.5" />
            Join the Founding Business Program
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
