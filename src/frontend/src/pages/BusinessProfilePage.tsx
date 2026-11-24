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
  useBusinessBySlug,
  useCatalogue,
  useMyBusinesses,
} from "@/hooks/useQueries";
import { getDemoBusiness } from "@/lib/demoBusinesses";
import { demoCatalogue } from "@/lib/demoCatalogue";
import { formatBps, formatCurrency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Coins,
  Compass,
  Gauge,
  Layers,
  MapPin,
  Package,
  PieChart,
  QrCode as QrCodeIcon,
  Repeat,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useMemo } from "react";

/** Normalized view model shared by fictional demo and registered businesses. */
interface ProfileView {
  slug: string;
  name: string;
  category: string;
  description: string;
  location: string;
  isFictional: boolean;
  fundingGoalCents: bigint;
  capitalRaisedCents: bigint;
  ownershipPoolBps: bigint;
  roundUpCents: bigint;
  ownershipStats: { label: string; value: string; hint: string }[];
  rightsSummary: string;
  businessId?: bigint;
}

const accentRing: Record<string, string> = {
  emerald: "from-primary/25 via-primary/5",
  cyan: "from-accent/25 via-accent/5",
  violet: "from-violet/25 via-violet/5",
  gold: "from-gold/25 via-gold/5",
};

function buildReferralUrl(slug: string): string {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://globaldaos.app";
  return `${origin}/business/${slug}?ref=${encodeURIComponent(slug)}`;
}

function buildShopUrl(slug: string, itemId?: bigint): string {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://globaldaos.app";
  const base = `${origin}/shop/${slug}`;
  return itemId === undefined ? base : `${base}?item=${itemId.toString()}`;
}

export default function BusinessProfilePage() {
  const { slug } = useParams({ from: "/business/$slug" });
  const demo = getDemoBusiness(slug);
  const { data: registered, isLoading } = useBusinessBySlug(
    demo ? undefined : slug,
  );
  const { data: myBusinesses } = useMyBusinesses();

  const profile = useMemo<ProfileView | null>(() => {
    if (demo) {
      return {
        slug: demo.slug,
        name: demo.name,
        category: demo.category,
        description: demo.description,
        location: `${demo.location.city}, ${demo.location.country}`,
        isFictional: true,
        fundingGoalCents: BigInt(demo.annualRevenueCents),
        capitalRaisedCents: BigInt(Math.round(demo.annualRevenueCents * 0.42)),
        ownershipPoolBps: BigInt(demo.projectedOwnershipBps * 10),
        roundUpCents: BigInt(demo.roundUpCents),
        ownershipStats: [
          {
            label: "Units per $1",
            value: formatNumber(demo.unitsPerDollar),
            hint: "Ownership units granted per dollar contributed",
          },
          {
            label: "Projected ownership",
            value: formatBps(BigInt(demo.projectedOwnershipBps)),
            hint: "After one year of simulated shopping",
          },
          {
            label: "Annual revenue",
            value: formatCurrency(BigInt(demo.annualRevenueCents)),
            hint: "Simulated trailing-twelve-month revenue",
          },
        ],
        rightsSummary:
          "Round-up contributions convert to ownership units. Voting and profit participation stay optional and off by default.",
      };
    }
    if (!registered) return null;
    const poolBps =
      registered.totalOwnershipSupply > 0n
        ? (registered.consumerOwnershipPool * 10_000n) /
          registered.totalOwnershipSupply
        : 0n;
    return {
      slug: registered.slug,
      name: registered.name,
      category: registered.industry,
      description: registered.description,
      location: [registered.city, registered.country]
        .filter(Boolean)
        .join(", "),
      isFictional: registered.isFictional,
      fundingGoalCents: registered.maxFundraisingTarget,
      capitalRaisedCents: 0n,
      ownershipPoolBps: poolBps,
      roundUpCents: registered.participation.minContribution,
      ownershipStats: [
        {
          label: "Ownership supply",
          value: formatNumber(registered.totalOwnershipSupply),
          hint: "Total ownership units in circulation",
        },
        {
          label: "Consumer pool",
          value: formatNumber(registered.consumerOwnershipPool),
          hint: "Units reserved for customer ownership",
        },
        {
          label: "Min contribution",
          value: formatCurrency(registered.minContribution),
          hint: "Smallest accepted round-up contribution",
        },
      ],
      rightsSummary: registered.ownershipRights.rightsSummary,
      businessId: registered.id,
    };
  }, [demo, registered]);

  const isOwner = useMemo(() => {
    if (!profile?.businessId || !myBusinesses) return false;
    return myBusinesses.some((b) => b.id === profile.businessId);
  }, [profile, myBusinesses]);

  const { data: catalogue } = useCatalogue(profile?.businessId);
  const activeItems = useMemo(
    () =>
      demo
        ? demoCatalogue(demo)
        : (catalogue ?? []).filter((item) => item.active),
    [demo, catalogue],
  );

  if (!demo && isLoading) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingSkeleton variant="stat" rows={4} />
        <LoadingSkeleton className="mt-6" rows={2} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <EmptyState
          icon={Compass}
          title="We couldn't find that business"
          description={`No business matches “${slug}”. It may have been renamed, or the link could be mistyped.`}
          action={
            <Button asChild className="rounded-full">
              <Link
                to="/directory"
                search={{
                  q: "",
                  category: "all",
                  origin: "all",
                  status: "all",
                }}
                data-ocid="profile.not_found_link"
              >
                Browse the directory
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  const referralUrl = buildReferralUrl(profile.slug);
  const accent = demo?.accent ?? "emerald";
  const progressPct =
    profile.fundingGoalCents > 0n
      ? Math.min(
          100,
          Number(
            (profile.capitalRaisedCents * 10_000n) / profile.fundingGoalCents,
          ) / 100,
        )
      : 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <SimulatedBanner className="mb-8" />

      {/* Hero */}
      <header
        data-ocid="profile.header"
        className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur sm:p-9"
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent",
            accentRing[accent],
          )}
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <BusinessBadge isFictional={profile.isFictional} />
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Layers aria-hidden="true" className="size-3" />
                {profile.category}
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              {profile.name}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {profile.description}
            </p>
            {profile.location && (
              <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin aria-hidden="true" className="size-4 text-accent" />
                {profile.location}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
            <Button asChild size="lg" className="rounded-full">
              <Link
                to="/shop/$slug"
                params={{ slug: profile.slug }}
                data-ocid="profile.shop_cta"
              >
                <ShoppingBag aria-hidden="true" className="size-4" />
                Shop the storefront
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              <Link to="/demo" data-ocid="profile.round_up_cta">
                <Repeat aria-hidden="true" className="size-4" />
                Round Up to Own
              </Link>
            </Button>
            {isOwner && profile.businessId !== undefined && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <Link
                  to="/admin/$businessId"
                  params={{ businessId: profile.businessId.toString() }}
                  data-ocid="profile.admin_link"
                >
                  <ShieldCheck aria-hidden="true" className="size-4" />
                  Business workspace
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Funding + ownership figures */}
      <section className="mt-8" aria-labelledby="profile-figures">
        <SectionHeading
          eyebrow="Ownership terms"
          title={<span id="profile-figures">Capital and ownership</span>}
          description="Purchase revenue, investment contributions, dilution and projected value are tracked as separate figures."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Funding goal"
            value={formatCurrency(profile.fundingGoalCents)}
            hint="Target capital for this round"
            icon={Target}
            tone="emerald"
          />
          <StatCard
            label="Capital raised"
            value={<CurrencyValue cents={profile.capitalRaisedCents} />}
            hint="Recorded contributions to date"
            icon={Coins}
            tone="cyan"
          />
          <StatCard
            label="Ownership pool"
            value={formatBps(profile.ownershipPoolBps)}
            hint="Share reserved for customers"
            icon={PieChart}
            tone="violet"
          />
          <StatCard
            label="Round-up rate"
            value={formatCurrency(profile.roundUpCents)}
            hint="Contribution per simulated purchase"
            icon={Repeat}
            tone="gold"
          />
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card/60 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">
              Round progress
            </span>
            <span className="font-numeric text-foreground">
              {progressPct.toFixed(1)}%
            </span>
          </div>
          <div
            className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            tabIndex={0}
            aria-valuenow={Math.round(progressPct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Funding round progress"
          >
            <div
              className="h-full rounded-full bg-gradient-primary transition-smooth"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <CurrencyLegend className="mt-4" />
        </div>
      </section>

      {/* Ownership stats */}
      <section className="mt-10" aria-labelledby="profile-stats">
        <h2
          id="profile-stats"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
        >
          Ownership stats
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {profile.ownershipStats.map((stat) => (
            <div
              key={stat.label}
              data-ocid="profile.stat_card"
              className="rounded-2xl border border-border bg-card/60 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 font-numeric text-2xl font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {stat.hint}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
          <Gauge
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-accent"
          />
          {profile.rightsSummary}
        </p>
      </section>

      {/* Share + referral + QR */}
      <section className="mt-10" aria-labelledby="profile-share">
        <SectionHeading
          eyebrow="Grow the pool"
          title={<span id="profile-share">Share and invite customers</span>}
          description="Send this profile to shoppers, or print the QR code so customers can join the round-up from the counter."
        />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 rounded-2xl border border-border bg-card/60 p-5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Share2 aria-hidden="true" className="size-4 text-primary" />
              Share this business
            </div>
            <ShareControl url={referralUrl} label="Copy referral link" />
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Referral link
              </p>
              <p className="break-all rounded-xl border border-border bg-background/60 px-3.5 py-2.5 font-mono text-xs text-accent">
                {referralUrl}
              </p>
              <p className="text-xs text-muted-foreground">
                Customers who arrive through this link are attributed to you in
                the simulated round-up.
              </p>
            </div>
          </div>
          <QrCode
            value={referralUrl}
            fileName={`${profile.slug}-onboarding-qr`}
            caption="Scan to open this profile with your referral attached."
            className="justify-center"
          />
        </div>
      </section>

      {/* Checkout + item QR codes */}
      <section className="mt-10" aria-labelledby="profile-shop-qr">
        <SectionHeading
          eyebrow="Scan to shop"
          title={<span id="profile-shop-qr">Checkout and item QR codes</span>}
          description="Print the checkout code for the counter, or an item code so customers land directly on that product in the simulated storefront."
        />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <QrCodeIcon aria-hidden="true" className="size-4 text-primary" />
              Storefront checkout
            </div>
            <QrCode
              value={buildShopUrl(profile.slug)}
              fileName={`${profile.slug}-checkout-qr`}
              caption="Scan to open the simulated storefront and start a checkout."
              className="justify-center"
            />
            <Button asChild variant="outline" className="w-full rounded-full">
              <Link
                to="/shop/$slug"
                params={{ slug: profile.slug }}
                data-ocid="profile.shop_qr_link"
              >
                <ShoppingBag aria-hidden="true" className="size-4" />
                Open storefront
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Package aria-hidden="true" className="size-4 text-accent" />
              Item codes
            </div>
            {activeItems.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border bg-card/40 px-4 py-6 text-center text-sm text-muted-foreground">
                This business has not published catalogue items yet.
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {activeItems.map((item, index) => (
                  <li key={item.id.toString()}>
                    <QrCode
                      value={buildShopUrl(profile.slug, item.id)}
                      fileName={`${profile.slug}-${item.id.toString()}-qr`}
                      size={132}
                      caption={item.name}
                      className="h-full justify-center"
                    />
                    <p className="mt-1.5 text-center text-xs text-muted-foreground">
                      <span data-ocid={`profile.item_qr.${index + 1}`}>
                        Opens {item.name} directly
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-subtle p-6 sm:p-9">
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-2">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles aria-hidden="true" className="size-3.5" />
              Round Up to Own
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Shop {profile.name} and turn spare change into ownership
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every simulated purchase rounds up by{" "}
              {formatCurrency(profile.roundUpCents)} into this business's
              ownership pool. No sign-in needed to try it.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 rounded-full">
            <Link to="/demo" data-ocid="profile.demo_cta">
              <Building2 aria-hidden="true" className="size-4" />
              Start the demo
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Users aria-hidden="true" className="size-3.5" />
        {profile.isFictional
          ? "This is a fictional business created for demonstration."
          : "This is a registered business on the platform."}
      </p>
    </div>
  );
}
