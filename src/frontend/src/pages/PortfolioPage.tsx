import type {
  BusinessPublic,
  PortfolioPosition,
  PublicPortfolio,
  PublicPortfolioPosition,
  Purchase,
} from "@/backend";
import { RequireSignIn, SignInButton } from "@/components/InternetIdentity";
import { FoundingCreditsPanel } from "@/components/credits/FoundingCreditsPanel";
import { BusinessBadge } from "@/components/shared/BusinessBadge";
import {
  CurrencyLegend,
  CurrencyValue,
} from "@/components/shared/CurrencyValue";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { QrCode } from "@/components/shared/QrCode";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ShareControl } from "@/components/shared/ShareControl";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import {
  useBusinesses,
  useMyPortfolio,
  useMyPurchaseHistory,
  useMyShareToken,
  usePublicPortfolio,
} from "@/hooks/useQueries";
import { formatBps, formatDate, formatNumber } from "@/lib/format";
import { Link, useSearch } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Coins,
  Eye,
  Layers,
  Receipt,
  Share2,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

function useBusinessMap(businesses: BusinessPublic[] | undefined) {
  return useMemo(() => {
    const map = new Map<string, BusinessPublic>();
    for (const business of businesses ?? [])
      map.set(business.id.toString(), business);
    return map;
  }, [businesses]);
}

function SignInPrompt() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SimulatedBanner className="mb-10" />
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-8 text-center shadow-elevated backdrop-blur sm:p-12">
        <div
          aria-hidden="true"
          className="ambient-orb -left-10 -top-10 size-48 bg-primary"
        />
        <div
          aria-hidden="true"
          className="ambient-orb -bottom-12 -right-8 size-52 bg-accent"
        />
        <div className="relative">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Wallet aria-hidden="true" className="size-6" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Your ownership portfolio
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            Sign in with Internet Identity to view your Founding Credits
            dashboard, save your round-up contributions, track ownership units
            across businesses, and share a public snapshot of your simulated
            portfolio.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SignInButton className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60" />
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/demo" data-ocid="portfolio.demo_link">
                Try Round Up to Own
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HoldingCard({
  position,
  business,
  index,
  reduceMotion,
}: {
  position: PortfolioPosition;
  business: BusinessPublic | undefined;
  index: number;
  reduceMotion: boolean;
}) {
  const name = business?.name ?? `Business #${position.businessId.toString()}`;
  const pct = Number(position.hypotheticalPercentageBps) / 100;
  const barWidth = Math.min(100, Math.max(2, pct));

  return (
    <motion.li
      data-ocid={`portfolio.holding.${index + 1}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:border-primary/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-display text-lg font-semibold">
              {business ? (
                <Link
                  to="/business/$slug"
                  params={{ slug: business.slug }}
                  data-ocid={`portfolio.holding_link.${index + 1}`}
                  className="transition-smooth hover:text-primary"
                >
                  {name}
                </Link>
              ) : (
                name
              )}
            </h3>
            {business && <BusinessBadge isFictional={business.isFictional} />}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatNumber(position.purchaseCount)}{" "}
            {position.purchaseCount === 1n ? "purchase" : "purchases"} · last{" "}
            {formatDate(position.lastPurchaseAt)}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-chart-3/30 bg-chart-3/10 px-2.5 py-1 font-numeric text-xs font-semibold text-chart-3">
          {formatBps(position.hypotheticalPercentageBps)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Contributed
          </p>
          <CurrencyValue
            cents={position.cumulativeContributions}
            className="text-base font-semibold"
          />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Ownership units
          </p>
          <p className="font-numeric text-base font-semibold text-foreground">
            {formatNumber(position.ownershipUnits)}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Hypothetical stake</span>
          <span className="font-numeric">
            {formatBps(position.hypotheticalPercentageBps)}
          </span>
        </div>
        <div
          className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
          aria-hidden="true"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-chart-3"
            initial={reduceMotion ? false : { width: 0 }}
            whileInView={reduceMotion ? undefined : { width: `${barWidth}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: 0.15 + index * 0.06,
            }}
            style={reduceMotion ? { width: `${barWidth}%` } : undefined}
          />
        </div>
      </div>
    </motion.li>
  );
}

function PurchaseRow({
  purchase,
  business,
  index,
}: {
  purchase: Purchase;
  business: BusinessPublic | undefined;
  index: number;
}) {
  const name = business?.name ?? `Business #${purchase.businessId.toString()}`;
  return (
    <li
      data-ocid={`portfolio.purchase.${index + 1}`}
      className="flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4 transition-smooth hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {purchase.productName}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {name} · {formatDate(purchase.createdAt)}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-muted-foreground">Revenue</span>
          <span className="font-numeric font-semibold text-foreground">
            <CurrencyValue cents={purchase.purchasePrice} kind="value" />
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-muted-foreground">Contribution</span>
          <CurrencyValue
            cents={purchase.contributionAmount}
            className="font-semibold"
          />
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-muted-foreground">Units</span>
          <span className="font-numeric font-semibold text-foreground">
            {formatNumber(purchase.ownershipUnits)}
          </span>
        </span>
      </div>
    </li>
  );
}

function PortfolioDashboard() {
  const reduceMotion = useReducedMotion() ?? false;
  const portfolioQuery = useMyPortfolio();
  const historyQuery = useMyPurchaseHistory();
  const tokenQuery = useMyShareToken();
  const businessesQuery = useBusinesses();
  const businessMap = useBusinessMap(businessesQuery.data);

  const portfolio = portfolioQuery.data;
  const positions = portfolio?.positions ?? [];
  const purchases = historyQuery.data ?? [];
  const shareToken = tokenQuery.data ?? "";

  const shareUrl = useMemo(() => {
    if (!shareToken || typeof window === "undefined") return "";
    return `${window.location.origin}/portfolio?share=${encodeURIComponent(shareToken)}`;
  }, [shareToken]);

  const isLoading =
    portfolioQuery.isLoading || historyQuery.isLoading || tokenQuery.isLoading;

  const sortedPositions = useMemo(
    () =>
      [...positions].sort((a, b) =>
        Number(b.cumulativeContributions - a.cumulativeContributions),
      ),
    [positions],
  );

  const sortedPurchases = useMemo(
    () => [...purchases].sort((a, b) => Number(b.createdAt - a.createdAt)),
    [purchases],
  );

  const hasHoldings = positions.length > 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <SimulatedBanner className="mb-8" />

      <SectionHeading
        eyebrow="Your ownership"
        title={
          <span className="text-gradient-spectrum">Consumer portfolio</span>
        }
        description="Track contributed capital, ownership units and hypothetical stakes across every business you have rounded up with."
        action={
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/demo" data-ocid="portfolio.demo_link">
              <Sparkles aria-hidden="true" className="size-4" />
              Round Up to Own
            </Link>
          </Button>
        }
      />

      {isLoading ? (
        <div className="mt-10 space-y-6">
          <LoadingSkeleton variant="stat" rows={4} />
          <LoadingSkeleton variant="card" rows={3} />
        </div>
      ) : portfolioQuery.isError ? (
        <EmptyState
          className="mt-10"
          icon={Wallet}
          title="We couldn't load your portfolio"
          description="Something went wrong reaching the network. Try again in a moment."
          action={
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              data-ocid="portfolio.retry_button"
              onClick={() => void portfolioQuery.refetch()}
            >
              Retry
            </Button>
          }
        />
      ) : (
        <div className="mt-10 space-y-12">
          {/* Founding Credits recognition — always shown for a signed-in member,
              so a registered visitor with no holdings still lands on a
              populated dashboard. */}
          <section aria-labelledby="founding-credits-heading">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2
                id="founding-credits-heading"
                className="font-display text-xl font-semibold tracking-tight"
              >
                Founding Credits
              </h2>
              <span className="text-xs text-muted-foreground">
                Recognition score, not money or equity
              </span>
            </div>
            <FoundingCreditsPanel />
          </section>

          {!hasHoldings ? (
            <EmptyState
              icon={Sparkles}
              title="No holdings yet"
              description="Your Founding Credits above are already saved. Round up a simulated purchase to your first business and your ownership units will appear here."
              action={
                <Button asChild className="rounded-full">
                  <Link to="/demo" data-ocid="portfolio.empty_cta">
                    Start with Round Up to Own
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              }
            />
          ) : (
            <>
              {/* Separate figures: contributions, units, hypothetical value */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                <StatCard
                  label="Total contributions"
                  value={
                    <CurrencyValue
                      cents={portfolio?.totalContributions ?? 0n}
                      className="text-2xl md:text-3xl"
                    />
                  }
                  hint="Recorded round-up capital"
                  icon={Coins}
                  tone="cyan"
                />
                <StatCard
                  label="Ownership units"
                  value={formatNumber(portfolio?.totalOwnershipUnits ?? 0n)}
                  hint="Across all businesses"
                  icon={Layers}
                  tone="emerald"
                />
                <StatCard
                  label="Businesses held"
                  value={formatNumber(BigInt(positions.length))}
                  hint="Distinct simulated stakes"
                  icon={TrendingUp}
                  tone="violet"
                />
                <StatCard
                  label="Purchases"
                  value={formatNumber(BigInt(purchases.length))}
                  hint="Simulated transactions"
                  icon={Receipt}
                  tone="gold"
                />
              </motion.div>

              <CurrencyLegend />

              {/* Holdings */}
              <section aria-labelledby="holdings-heading">
                <div className="mb-4 flex items-end justify-between gap-3">
                  <h2
                    id="holdings-heading"
                    className="font-display text-xl font-semibold tracking-tight"
                  >
                    Holdings by business
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Hypothetical stake is simulated
                  </span>
                </div>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {sortedPositions.map((position, index) => (
                    <HoldingCard
                      key={position.businessId.toString()}
                      position={position}
                      business={businessMap.get(position.businessId.toString())}
                      index={index}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </ul>
              </section>

              {/* Share */}
              <section
                aria-labelledby="share-heading"
                className="rounded-3xl border border-border bg-card/60 p-6 shadow-elevated backdrop-blur sm:p-8"
              >
                <div className="flex items-center gap-2">
                  <Share2 aria-hidden="true" className="size-4 text-primary" />
                  <h2
                    id="share-heading"
                    className="font-display text-xl font-semibold tracking-tight"
                  >
                    Share your portfolio
                  </h2>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Anyone with this link can view a read-only snapshot of your
                  simulated holdings. No personal data is exposed.
                </p>
                <div className="mt-5 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                  <div className="min-w-0">
                    {shareUrl ? (
                      <ShareControl url={shareUrl} label="Copy link" />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Preparing your share link…
                      </p>
                    )}
                  </div>
                  {shareUrl && (
                    <QrCode
                      value={shareUrl}
                      fileName="portfolio-qr"
                      caption="Scan to open this portfolio on another device."
                    />
                  )}
                </div>
              </section>

              {/* Purchase history */}
              <section aria-labelledby="history-heading">
                <div className="mb-4 flex items-end justify-between gap-3">
                  <h2
                    id="history-heading"
                    className="font-display text-xl font-semibold tracking-tight"
                  >
                    Purchase history
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Revenue and contributions shown separately
                  </span>
                </div>
                {sortedPurchases.length === 0 ? (
                  <EmptyState
                    icon={Receipt}
                    title="No purchases recorded"
                    description="Your simulated transactions will appear here once you round up."
                  />
                ) : (
                  <ul className="space-y-3">
                    {sortedPurchases.map((purchase, index) => (
                      <PurchaseRow
                        key={purchase.id.toString()}
                        purchase={purchase}
                        business={businessMap.get(
                          purchase.businessId.toString(),
                        )}
                        index={index}
                      />
                    ))}
                  </ul>
                )}
              </section>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* --------------------------- Public snapshot --------------------------- */

function PublicHoldingCard({
  position,
  index,
  reduceMotion,
}: {
  position: PublicPortfolioPosition;
  index: number;
  reduceMotion: boolean;
}) {
  const pct = Number(position.hypotheticalPercentageBps) / 100;
  const barWidth = Math.min(100, Math.max(2, pct));

  return (
    <motion.li
      data-ocid={`public_portfolio.holding.${index + 1}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:border-primary/40"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 truncate font-display text-lg font-semibold">
          {position.businessName}
        </h3>
        <span className="shrink-0 rounded-full border border-chart-3/30 bg-chart-3/10 px-2.5 py-1 font-numeric text-xs font-semibold text-chart-3">
          {formatBps(position.hypotheticalPercentageBps)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Contributed
          </p>
          <CurrencyValue
            cents={position.cumulativeContributions}
            className="text-base font-semibold"
          />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Ownership units
          </p>
          <p className="font-numeric text-base font-semibold text-foreground">
            {formatNumber(position.ownershipUnits)}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Hypothetical stake</span>
          <span className="font-numeric">
            {formatBps(position.hypotheticalPercentageBps)}
          </span>
        </div>
        <div
          className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
          aria-hidden="true"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-chart-3"
            initial={reduceMotion ? false : { width: 0 }}
            whileInView={reduceMotion ? undefined : { width: `${barWidth}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: 0.15 + index * 0.06,
            }}
            style={reduceMotion ? { width: `${barWidth}%` } : undefined}
          />
        </div>
      </div>
    </motion.li>
  );
}

function PublicPortfolioView({ snapshot }: { snapshot: PublicPortfolio }) {
  const reduceMotion = useReducedMotion() ?? false;
  const positions = snapshot.positions;

  const sortedPositions = useMemo(
    () =>
      [...positions].sort((a, b) =>
        Number(b.cumulativeContributions - a.cumulativeContributions),
      ),
    [positions],
  );

  return (
    <div
      data-ocid="public_portfolio.page"
      className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <SimulatedBanner className="mb-8" />

      <SectionHeading
        eyebrow="Shared portfolio"
        title={
          <span className="text-gradient-spectrum">
            A simulated ownership snapshot
          </span>
        }
        description="This is a read-only view of someone's round-up portfolio. Every holding, contribution and stake below is a fictional demonstration."
        action={
          <Button asChild className="rounded-full">
            <Link to="/demo" data-ocid="public_portfolio.demo_link">
              <Sparkles aria-hidden="true" className="size-4" />
              Build your own
            </Link>
          </Button>
        }
      />

      <div className="mt-10 space-y-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard
            label="Total contributions"
            value={
              <CurrencyValue
                cents={snapshot.totalContributions}
                className="text-2xl md:text-3xl"
              />
            }
            hint="Recorded round-up capital"
            icon={Coins}
            tone="cyan"
          />
          <StatCard
            label="Ownership units"
            value={formatNumber(snapshot.totalOwnershipUnits)}
            hint="Across all businesses"
            icon={Layers}
            tone="emerald"
          />
          <StatCard
            label="Businesses held"
            value={formatNumber(snapshot.businessCount)}
            hint="Distinct simulated stakes"
            icon={TrendingUp}
            tone="violet"
          />
          <StatCard
            label="Last updated"
            value={
              <span className="text-xl md:text-2xl">
                {formatDate(snapshot.updatedAt)}
              </span>
            }
            hint="Snapshot timestamp"
            icon={Eye}
            tone="gold"
          />
        </motion.div>

        <CurrencyLegend />

        <section aria-labelledby="public-holdings-heading">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2
              id="public-holdings-heading"
              className="font-display text-xl font-semibold tracking-tight"
            >
              Holdings by business
            </h2>
            <span className="text-xs text-muted-foreground">
              Hypothetical stake is simulated
            </span>
          </div>
          {sortedPositions.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="No holdings in this snapshot"
              description="This portfolio does not have any simulated holdings to show yet."
            />
          ) : (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedPositions.map((position, index) => (
                <PublicHoldingCard
                  key={position.businessId.toString()}
                  position={position}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </ul>
          )}
        </section>

        <section
          aria-labelledby="public-cta-heading"
          className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 shadow-elevated backdrop-blur sm:p-8"
        >
          <div
            aria-hidden="true"
            className="ambient-orb -right-10 -top-10 size-40 bg-primary"
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2
                id="public-cta-heading"
                className="font-display text-xl font-semibold tracking-tight"
              >
                Start your own simulated portfolio
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Round up a fictional purchase to a business you love and watch
                your ownership units grow. Sign in only when you want to save
                and share.
              </p>
            </div>
            <Button asChild className="shrink-0 rounded-full">
              <Link to="/demo" data-ocid="public_portfolio.cta_button">
                Try Round Up to Own
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function PublicPortfolioNotFound() {
  return (
    <div
      data-ocid="public_portfolio.not_found"
      className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-5 px-4 text-center"
    >
      <SimulatedBanner className="mb-6 w-full text-left" />
      <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Share2 aria-hidden="true" className="size-7" />
      </span>
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          This shared portfolio isn't available
        </h1>
        <p className="text-muted-foreground">
          The link may be incomplete, mistyped, or no longer points to a
          portfolio. You can still explore the app or start your own simulated
          portfolio.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="rounded-full">
          <Link to="/" data-ocid="public_portfolio.home_button">
            Back to home
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/demo" data-ocid="public_portfolio.not_found_demo_button">
            Try Round Up to Own
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function PublicPortfolioRoute({ token }: { token: string }) {
  const publicQuery = usePublicPortfolio(token);

  if (publicQuery.isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SimulatedBanner className="mb-8" />
        <div className="space-y-6">
          <LoadingSkeleton variant="stat" rows={4} />
          <LoadingSkeleton variant="card" rows={3} />
        </div>
      </div>
    );
  }

  if (publicQuery.isError) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SimulatedBanner className="mb-8" />
        <EmptyState
          icon={Share2}
          title="We couldn't load this shared portfolio"
          description="Something went wrong reaching the network. Try again in a moment."
          action={
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              data-ocid="public_portfolio.retry_button"
              onClick={() => void publicQuery.refetch()}
            >
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (!publicQuery.data) {
    return <PublicPortfolioNotFound />;
  }

  return <PublicPortfolioView snapshot={publicQuery.data} />;
}

export default function PortfolioPage() {
  const rawSearch = useSearch({ strict: false }) as Record<string, unknown>;
  const shareToken =
    typeof rawSearch.share === "string" ? rawSearch.share.trim() : "";

  // A shared link is public: render the read-only snapshot before the sign-in
  // gate so anyone can view it without authenticating.
  if (shareToken) {
    return <PublicPortfolioRoute token={shareToken} />;
  }

  return (
    <RequireSignIn fallback={<SignInPrompt />}>
      <PortfolioDashboard />
    </RequireSignIn>
  );
}
