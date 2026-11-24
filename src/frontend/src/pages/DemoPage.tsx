import { ContributionOption } from "@/backend";
import type {
  ConsumerError,
  DemoPurchaseResult,
  RecordPurchaseInput,
} from "@/backend";
import { SignInButton } from "@/components/InternetIdentity";
import { BusinessBadge } from "@/components/shared/BusinessBadge";
import {
  CurrencyLegend,
  CurrencyValue,
} from "@/components/shared/CurrencyValue";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import {
  useMyPortfolio,
  useRecordDemoPurchase,
  useRecordPurchase,
} from "@/hooks/useQueries";
import type {
  DemoAccent,
  DemoBusiness,
  DemoProduct,
} from "@/lib/demoBusinesses";
import { demoBusinesses } from "@/lib/demoBusinesses";
import { describeBackendError, errorMessage } from "@/lib/errors";
import {
  formatBps,
  formatCurrency,
  formatCurrencyCompact,
  formatNumber,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Coins,
  Landmark,
  Layers,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";

/* ------------------------------ Accent system ----------------------------- */

const accentStyles: Record<
  DemoAccent,
  { text: string; ring: string; chip: string; glow: string; bar: string }
> = {
  emerald: {
    text: "text-primary",
    ring: "border-primary/40",
    chip: "bg-primary/10 text-primary",
    glow: "bg-primary",
    bar: "bg-primary",
  },
  cyan: {
    text: "text-accent",
    ring: "border-accent/40",
    chip: "bg-accent/10 text-accent",
    glow: "bg-accent",
    bar: "bg-accent",
  },
  violet: {
    text: "text-violet",
    ring: "border-violet/40",
    chip: "bg-violet/10 text-violet",
    glow: "bg-violet",
    bar: "bg-violet",
  },
  gold: {
    text: "text-gold",
    ring: "border-gold/40",
    chip: "bg-gold/10 text-gold",
    glow: "bg-gold",
    bar: "bg-gold",
  },
};

/* ------------------------------ Round-up math ----------------------------- */

type RoundUpChoice =
  | "nearestDollar"
  | "nearestFive"
  | "nearestTen"
  | "custom"
  | "none";

const roundUpOptions: Array<{
  value: RoundUpChoice;
  label: string;
  hint: string;
}> = [
  {
    value: "nearestDollar",
    label: "Nearest $1",
    hint: "Round to the next dollar",
  },
  { value: "nearestFive", label: "Nearest $5", hint: "Round to the next $5" },
  { value: "nearestTen", label: "Nearest $10", hint: "Round to the next $10" },
  { value: "custom", label: "Custom", hint: "Choose your own amount" },
  { value: "none", label: "No round-up", hint: "Just the purchase" },
];

const optionToEnum: Record<RoundUpChoice, ContributionOption> = {
  nearestDollar: ContributionOption.nearestDollar,
  nearestFive: ContributionOption.nearestFive,
  nearestTen: ContributionOption.nearestTen,
  custom: ContributionOption.custom,
  none: ContributionOption.none,
};

function roundUpCents(
  priceCents: number,
  choice: RoundUpChoice,
  customCents: number,
): number {
  switch (choice) {
    case "nearestDollar":
      return Math.ceil(priceCents / 100) * 100 - priceCents || 100;
    case "nearestFive":
      return Math.ceil(priceCents / 500) * 500 - priceCents || 500;
    case "nearestTen":
      return Math.ceil(priceCents / 1000) * 1000 - priceCents || 1000;
    case "custom":
      return Math.max(0, Math.round(customCents));
    case "none":
      return 0;
  }
}

function makeClientRef(): string {
  return `demo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * The consumer hooks throw the raw `ConsumerError` variant object on `#err`, so
 * it is not an `Error` instance. Detect it to surface the specific reason.
 */
function isConsumerError(error: unknown): error is ConsumerError {
  return (
    typeof error === "object" &&
    error !== null &&
    "__kind__" in error &&
    typeof (error as { __kind__: unknown }).__kind__ === "string"
  );
}

/** User-facing copy for a rejected save, falling back to the generic message. */
function saveErrorMessage(error: unknown): string {
  if (isConsumerError(error)) return describeBackendError(error);
  return errorMessage(error);
}

/**
 * Stable synthetic business id for a fictional demo business. The backend demo
 * path accepts an id with no registry record, so a deterministic per-slug id
 * keeps each fictional business's projection distinct without persisting one.
 */
function demoBusinessId(slug: string): bigint {
  let hash = 0n;
  for (const char of slug) {
    hash = (hash * 31n + BigInt(char.charCodeAt(0))) % 1_000_000_007n;
  }
  return hash + 1n;
}

/* --------------------------------- Page ---------------------------------- */

type Stage = "browse" | "checkout" | "confirmed";

export default function DemoPage() {
  const [stage, setStage] = useState<Stage>("browse");
  const [activeSlug, setActiveSlug] = useState<string>(demoBusinesses[0].slug);
  const [productId, setProductId] = useState<string>(
    demoBusinesses[0].products[0].id,
  );
  const [choice, setChoice] = useState<RoundUpChoice>("nearestDollar");
  const [customDollars, setCustomDollars] = useState("2");
  const [result, setResult] = useState<DemoPurchaseResult | null>(null);
  const [savedToPortfolio, setSavedToPortfolio] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const { identity } = useInternetIdentity();
  const signedIn = !!identity && !identity.getPrincipal().isAnonymous();

  const demoPurchase = useRecordDemoPurchase();
  const recordPurchase = useRecordPurchase();
  const portfolio = useMyPortfolio();

  const business = useMemo(
    () =>
      demoBusinesses.find((b) => b.slug === activeSlug) ?? demoBusinesses[0],
    [activeSlug],
  );
  const product = useMemo(
    () =>
      business.products.find((p) => p.id === productId) ?? business.products[0],
    [business, productId],
  );

  const customCents = Math.round((Number.parseFloat(customDollars) || 0) * 100);
  const contributionCents = roundUpCents(
    product.priceCents,
    choice,
    customCents,
  );
  const totalCents = product.priceCents + contributionCents;
  const projectedUnits = Math.round(
    (contributionCents / 100) * business.unitsPerDollar,
  );

  function selectBusiness(next: DemoBusiness) {
    setActiveSlug(next.slug);
    setProductId(next.products[0].id);
  }

  function startCheckout(nextProduct: DemoProduct) {
    setProductId(nextProduct.id);
    setStage("checkout");
  }

  function completePurchase() {
    const input: RecordPurchaseInput = {
      businessId: demoBusinessId(business.slug),
      productName: `${business.name} — ${product.name}`,
      purchasePrice: BigInt(product.priceCents),
      contributionAmount: BigInt(contributionCents),
      contributionOption: optionToEnum[choice],
      clientRef: makeClientRef(),
    };
    demoPurchase.mutate(input, {
      onSuccess: (data) => {
        setResult(data);
        setSavedToPortfolio(false);
        setSaveError(null);
        setStage("confirmed");
      },
    });
  }

  function saveToPortfolio() {
    if (!result) return;
    setSaveError(null);
    const input: RecordPurchaseInput = {
      businessId: result.businessId,
      productName: result.productName,
      purchasePrice: result.purchasePrice,
      contributionAmount: result.contributionAmount,
      contributionOption: result.contributionOption,
      clientRef: makeClientRef(),
    };
    recordPurchase.mutate(input, {
      onSuccess: () => setSavedToPortfolio(true),
      onError: (error) => setSaveError(saveErrorMessage(error)),
    });
  }

  function resetDemo() {
    setStage("browse");
    setResult(null);
    setSavedToPortfolio(false);
    setSaveError(null);
    setChoice("nearestDollar");
    setCustomDollars("2");
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div
        aria-hidden="true"
        className="ambient-orb -top-24 left-1/4 size-72 bg-primary/40"
      />
      <div
        aria-hidden="true"
        className="ambient-orb right-0 top-40 size-64 bg-violet/30"
      />

      <SimulatedBanner className="relative mb-8" />

      <SectionHeading
        eyebrow="Round up to own"
        title={
          <>
            Shop six fictional businesses and{" "}
            <span className="text-gradient-spectrum">own a slice</span>
          </>
        }
        description="Pick a product, round up your change, and watch the contribution become ownership. No sign-in needed to try it — save your portfolio with Internet Identity when you're ready."
        className="relative"
      />

      {stage === "browse" && (
        <BrowseStage
          activeSlug={activeSlug}
          onSelectBusiness={selectBusiness}
          onStartCheckout={startCheckout}
        />
      )}

      {stage === "checkout" && (
        <CheckoutStage
          business={business}
          product={product}
          choice={choice}
          onChoice={setChoice}
          customDollars={customDollars}
          onCustomDollars={setCustomDollars}
          contributionCents={contributionCents}
          totalCents={totalCents}
          projectedUnits={projectedUnits}
          isPending={demoPurchase.isPending}
          error={
            demoPurchase.isError ? saveErrorMessage(demoPurchase.error) : null
          }
          onBack={() => setStage("browse")}
          onConfirm={completePurchase}
        />
      )}

      {stage === "confirmed" && result && (
        <ConfirmedStage
          result={result}
          business={business}
          signedIn={signedIn}
          savedToPortfolio={savedToPortfolio}
          isSaving={recordPurchase.isPending}
          saveError={saveError}
          portfolioUnits={portfolio.data?.totalOwnershipUnits ?? null}
          onSave={saveToPortfolio}
          onReset={resetDemo}
        />
      )}
    </div>
  );
}

/* ------------------------------ Browse stage ------------------------------ */

function BrowseStage({
  activeSlug,
  onSelectBusiness,
  onStartCheckout,
}: {
  activeSlug: string;
  onSelectBusiness: (business: DemoBusiness) => void;
  onStartCheckout: (product: DemoProduct) => void;
}) {
  return (
    <div className="relative mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="grid gap-5 sm:grid-cols-2">
        {demoBusinesses.map((business, index) => {
          const accent = accentStyles[business.accent];
          const isActive = business.slug === activeSlug;
          return (
            <article
              key={business.slug}
              data-ocid={`demo.business.${index + 1}`}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth ease-cinematic hover:-translate-y-0.5",
                isActive ? accent.ring : "border-border hover:border-border",
              )}
            >
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 size-28 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40",
                  accent.glow,
                )}
              />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-[11px] font-semibold uppercase tracking-[0.16em]",
                      accent.text,
                    )}
                  >
                    {business.category}
                  </p>
                  <h3 className="mt-1 truncate font-display text-lg font-semibold">
                    {business.name}
                  </h3>
                </div>
                <BusinessBadge isFictional />
              </div>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {business.tagline}
              </p>

              <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border/70 bg-background/40 p-3 text-xs">
                <div>
                  <dt className="text-muted-foreground">Round-up / purchase</dt>
                  <dd className="mt-0.5 font-numeric text-sm font-semibold text-accent">
                    {formatCurrency(BigInt(business.roundUpCents))}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">1-yr ownership</dt>
                  <dd className="mt-0.5 font-numeric text-sm font-semibold text-gold">
                    {formatBps(BigInt(business.projectedOwnershipBps))}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                {business.products.slice(0, 2).map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    data-ocid={`demo.product.${index + 1}.${product.id}`}
                    onClick={() => {
                      onSelectBusiness(business);
                      onStartCheckout(product);
                    }}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium transition-smooth hover:border-primary/50 hover:text-primary"
                  >
                    <ShoppingBag aria-hidden="true" className="size-3.5" />
                    {product.name}
                    <span className="font-numeric text-muted-foreground">
                      {formatCurrency(BigInt(product.priceCents))}
                    </span>
                  </button>
                ))}
              </div>

              <Button
                type="button"
                variant="ghost"
                className="mt-3 self-start rounded-full px-0 text-sm text-primary hover:bg-transparent hover:text-primary/80"
                onClick={() => {
                  onSelectBusiness(business);
                  onStartCheckout(business.products[0]);
                }}
              >
                Shop {business.name}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </article>
          );
        })}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur">
          <h3 className="font-display text-base font-semibold">
            How round-ups become ownership
          </h3>
          <ol className="mt-4 space-y-4">
            {[
              {
                icon: ShoppingBag,
                title: "Buy something you'd buy anyway",
                body: "Every fictional product is priced like a real one.",
              },
              {
                icon: Coins,
                title: "Round up your change",
                body: "The spare cents become a voluntary contribution.",
              },
              {
                icon: Layers,
                title: "Receive ownership units",
                body: "Units accrue to your simulated portfolio.",
              },
              {
                icon: TrendingUp,
                title: "Watch it compound",
                body: "Accelerated projections show a year of shopping.",
              },
            ].map((step) => (
              <li key={step.title} className="flex gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-5 rounded-xl border border-border/70 bg-background/40 p-3">
            <p className="text-xs leading-relaxed text-muted-foreground">
              All six businesses are fictional. Prices, revenue and ownership
              are simulated for demonstration only.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ----------------------------- Checkout stage ----------------------------- */

function CheckoutStage({
  business,
  product,
  choice,
  onChoice,
  customDollars,
  onCustomDollars,
  contributionCents,
  totalCents,
  projectedUnits,
  isPending,
  error,
  onBack,
  onConfirm,
}: {
  business: DemoBusiness;
  product: DemoProduct;
  choice: RoundUpChoice;
  onChoice: (choice: RoundUpChoice) => void;
  customDollars: string;
  onCustomDollars: (value: string) => void;
  contributionCents: number;
  totalCents: number;
  projectedUnits: number;
  isPending: boolean;
  error: string | null;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const accent = accentStyles[business.accent];
  return (
    <div className="relative mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-[0.16em]",
                  accent.text,
                )}
              >
                {business.category}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.blurb}
              </p>
            </div>
            <BusinessBadge isFictional />
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t border-border/70 pt-4">
            <span className="text-sm text-muted-foreground">
              Purchase price
            </span>
            <span className="font-numeric text-lg font-semibold">
              {formatCurrency(BigInt(product.priceCents))}
            </span>
          </div>
        </div>

        <fieldset className="rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur">
          <legend className="px-1 text-sm font-semibold">
            Round up your change
          </legend>
          <p className="mt-1 text-xs text-muted-foreground">
            Choose how much spare change to contribute. You can opt out
            entirely.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {roundUpOptions.map((option) => {
              const selected = choice === option.value;
              return (
                <label
                  key={option.value}
                  data-ocid={`demo.roundup.${option.value}`}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-smooth",
                    selected
                      ? "border-primary/60 bg-primary/10"
                      : "border-border bg-background/40 hover:border-border/80",
                  )}
                >
                  <input
                    type="radio"
                    name="roundup"
                    value={option.value}
                    checked={selected}
                    onChange={() => onChoice(option.value)}
                    className="mt-0.5 size-4 accent-primary"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">
                      {option.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {option.hint}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>

          {choice === "custom" && (
            <div className="mt-4">
              <label
                htmlFor="custom-roundup"
                className="text-xs font-medium text-muted-foreground"
              >
                Custom contribution (USD)
              </label>
              <div className="mt-1.5 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Decrease custom contribution"
                  className="rounded-full"
                  onClick={() =>
                    onCustomDollars(
                      String(
                        Math.max(
                          0,
                          (Number.parseFloat(customDollars) || 0) - 1,
                        ),
                      ),
                    )
                  }
                >
                  <Minus aria-hidden="true" className="size-4" />
                </Button>
                <input
                  id="custom-roundup"
                  data-ocid="demo.custom_input"
                  type="number"
                  min={0}
                  step={1}
                  inputMode="decimal"
                  value={customDollars}
                  onChange={(event) => onCustomDollars(event.target.value)}
                  className="h-10 w-24 rounded-lg border border-input bg-background px-3 text-center font-numeric text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Increase custom contribution"
                  className="rounded-full"
                  onClick={() =>
                    onCustomDollars(
                      String((Number.parseFloat(customDollars) || 0) + 1),
                    )
                  }
                >
                  <Plus aria-hidden="true" className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </fieldset>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-elevated backdrop-blur">
          <h3 className="font-display text-base font-semibold">
            Order summary
          </h3>
          <dl className="mt-4 space-y-3 text-sm">
            <SummaryRow
              label="Purchase revenue"
              value={formatCurrency(BigInt(product.priceCents))}
              tone="text-foreground"
            />
            <SummaryRow
              label="Investment contribution"
              value={formatCurrency(BigInt(contributionCents))}
              tone="text-accent"
            />
            <div className="border-t border-border/70 pt-3">
              <SummaryRow
                label="Total payment"
                value={formatCurrency(BigInt(totalCents))}
                tone="text-foreground"
                strong
              />
            </div>
            <SummaryRow
              label="Ownership units gained"
              value={formatNumber(projectedUnits)}
              tone="text-violet"
            />
          </dl>

          {error && (
            <p
              role="alert"
              data-ocid="demo.error_state"
              className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive"
            >
              {error}
            </p>
          )}

          <Button
            type="button"
            data-ocid="demo.confirm_button"
            disabled={isPending}
            onClick={onConfirm}
            className="mt-5 h-12 w-full rounded-full bg-gradient-primary text-base font-semibold text-primary-foreground shadow-glow transition-smooth hover:opacity-95"
          >
            {isPending
              ? "Completing…"
              : `Pay ${formatCurrency(BigInt(totalCents))}`}
            {!isPending && <ArrowRight aria-hidden="true" className="size-4" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            data-ocid="demo.cancel_button"
            onClick={onBack}
            className="mt-2 w-full rounded-full text-sm text-muted-foreground"
          >
            Back to businesses
          </Button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            Simulated checkout — no payment is taken and no real money moves.
          </p>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  tone,
  strong = false,
}: {
  label: string;
  value: string;
  tone: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "font-numeric tabular-nums",
          tone,
          strong ? "text-lg font-semibold" : "font-medium",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

/* ----------------------------- Confirmed stage ---------------------------- */

function ConfirmedStage({
  result,
  business,
  signedIn,
  savedToPortfolio,
  isSaving,
  saveError,
  portfolioUnits,
  onSave,
  onReset,
}: {
  result: DemoPurchaseResult;
  business: DemoBusiness;
  signedIn: boolean;
  savedToPortfolio: boolean;
  isSaving: boolean;
  saveError: string | null;
  portfolioUnits: bigint | null;
  onSave: () => void;
  onReset: () => void;
}) {
  const projectedYearUnits = result.projectedOwnershipUnits * 12n;
  const projectedYearBps = result.projectedPercentageBps * 12n;

  return (
    <div className="relative mt-10 space-y-8">
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-primary/40 bg-primary/5 p-6 shadow-glow sm:flex-row sm:items-center">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <div className="min-w-0">
          <p
            data-ocid="demo.success_state"
            className="font-display text-xl font-semibold"
          >
            Purchase complete — you own a slice of {business.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {result.productName} · {formatCurrency(result.totalPayment)} paid ·{" "}
            {formatNumber(result.projectedOwnershipUnits)} ownership units
            gained
          </p>
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold">
            Your ownership, in four separate figures
          </h3>
          <CurrencyLegend />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Purchase revenue"
            value={formatCurrency(result.purchasePrice)}
            hint="Paid to the business for the product"
            icon={ShoppingBag}
            tone="emerald"
          />
          <StatCard
            label="Investment contribution"
            value={<CurrencyValue cents={result.contributionAmount} />}
            hint="Your voluntary round-up"
            icon={CircleDollarSign}
            tone="cyan"
          />
          <StatCard
            label="Ownership gained"
            value={`${formatNumber(result.projectedOwnershipUnits)} units`}
            hint={`${formatBps(result.projectedPercentageBps)} of the pool`}
            icon={Layers}
            tone="violet"
          />
          <StatCard
            label="Hypothetical value"
            value={
              <CurrencyValue cents={result.contributionAmount} kind="value" />
            }
            hint="Simulated, not a real valuation"
            icon={TrendingUp}
            tone="gold"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur">
          <div className="flex items-center gap-2">
            <Sparkles aria-hidden="true" className="size-4 text-gold" />
            <h3 className="font-display text-base font-semibold">
              Accelerated ownership projection
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            If you shopped here monthly for a year at this round-up level.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border/70 bg-background/40 p-3">
              <p className="text-xs text-muted-foreground">
                Units after 12 months
              </p>
              <p className="mt-1 font-numeric text-xl font-semibold text-violet">
                {formatNumber(projectedYearUnits)}
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/40 p-3">
              <p className="text-xs text-muted-foreground">
                Pool share after 12 months
              </p>
              <p className="mt-1 font-numeric text-xl font-semibold text-gold">
                {formatBps(projectedYearBps)}
              </p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-primary transition-smooth"
              style={{
                width: `${Math.min(100, Math.max(4, Number(projectedYearBps) / 100))}%`,
              }}
            />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Projection assumes identical purchases each month and no dilution
            from other participants.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur">
          <div className="flex items-center gap-2">
            <Wallet aria-hidden="true" className="size-4 text-accent" />
            <h3 className="font-display text-base font-semibold">
              Portfolio impact
            </h3>
          </div>
          {signedIn ? (
            <>
              <p className="mt-1 text-xs text-muted-foreground">
                Save this purchase to your Internet Identity portfolio so it
                counts toward your total ownership.
              </p>
              <div className="mt-4 rounded-xl border border-border/70 bg-background/40 p-3">
                <p className="text-xs text-muted-foreground">
                  Current portfolio units
                </p>
                <p className="mt-1 font-numeric text-xl font-semibold">
                  {portfolioUnits === null ? "—" : formatNumber(portfolioUnits)}
                </p>
              </div>
              {savedToPortfolio ? (
                <p
                  data-ocid="demo.saved_state"
                  className="mt-4 flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary"
                >
                  <Check aria-hidden="true" className="size-4" />
                  Saved to your portfolio — first-purchase Founding Credits
                  added
                </p>
              ) : (
                <Button
                  type="button"
                  data-ocid="demo.save_button"
                  disabled={isSaving}
                  onClick={onSave}
                  className="mt-4 h-11 w-full rounded-full bg-primary font-semibold text-primary-foreground"
                >
                  {isSaving ? "Saving…" : "Save to my portfolio"}
                </Button>
              )}
              {saveError && (
                <p
                  role="alert"
                  data-ocid="demo.save_error_state"
                  className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive"
                >
                  {saveError}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="mt-1 text-xs text-muted-foreground">
                Sign in with Internet Identity to save this purchase and track
                your ownership across every business.
              </p>
              <div className="mt-4 rounded-xl border border-border/70 bg-background/40 p-3">
                <p className="text-xs text-muted-foreground">
                  This purchase would add
                </p>
                <p className="mt-1 font-numeric text-xl font-semibold text-violet">
                  {formatNumber(result.projectedOwnershipUnits)} units
                </p>
              </div>
              <SignInButton className="mt-4 h-11 w-full rounded-full bg-primary font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 disabled:opacity-60" />
            </>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-5">
        <h3 className="font-display text-base font-semibold">Keep going</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <NextStep
            to="/launch"
            icon={Landmark}
            title="Launch your business DAO"
            body="Turn a real business into an owner-funded DAO."
            ocid="demo.cta.launch"
          />
          <NextStep
            to="/directory"
            icon={Layers}
            title="Explore the directory"
            body="Browse registered and fictional businesses."
            ocid="demo.cta.directory"
          />
          <NextStep
            to="/early-access"
            icon={Sparkles}
            title="Join consumer early access"
            body="Get notified when Round Up to Own goes live."
            ocid="demo.cta.early_access"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          data-ocid="demo.reset_button"
          onClick={onReset}
          className="mt-5 rounded-full"
        >
          Try another purchase
        </Button>
      </div>
    </div>
  );
}

function NextStep({
  to,
  icon: Icon,
  title,
  body,
  ocid,
}: {
  to: "/launch" | "/directory" | "/early-access";
  icon: typeof Landmark;
  title: string;
  body: string;
  ocid: string;
}): ReactNode {
  return (
    <Link
      to={to}
      data-ocid={ocid}
      className="group flex flex-col gap-2 rounded-xl border border-border bg-background/40 p-4 transition-smooth hover:-translate-y-0.5 hover:border-primary/50"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-xs leading-relaxed text-muted-foreground">
        {body}
      </span>
      <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary">
        Continue
        <ArrowRight
          aria-hidden="true"
          className="size-3.5 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
