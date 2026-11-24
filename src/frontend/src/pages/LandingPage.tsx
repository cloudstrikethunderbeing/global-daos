import { BusinessBadge } from "@/components/shared/BusinessBadge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { useFounderAnalytics, useRecordVisit } from "@/hooks/useQueries";
import { demoBusinesses } from "@/lib/demoBusinesses";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Coins,
  Globe2,
  Rocket,
  ShoppingBag,
  Sparkles,
  Users,
  Vote,
} from "lucide-react";
import { useEffect, useRef } from "react";

const accentRing: Record<string, string> = {
  emerald: "border-primary/40 text-primary",
  cyan: "border-accent/40 text-accent",
  violet: "border-violet/40 text-violet",
  gold: "border-gold/40 text-gold",
};

const accentDot: Record<string, string> = {
  emerald: "bg-primary",
  cyan: "bg-accent",
  violet: "bg-violet",
  gold: "bg-gold",
};

const pillars = [
  {
    icon: Coins,
    title: "Round up, own a slice",
    body: "Every purchase rounds up by a few cents. Those cents buy governance stakes in the business you just shopped with — no lump sum, no brokerage account.",
    tone: "text-primary",
  },
  {
    icon: Vote,
    title: "Consumers become owners",
    body: "Stakeholders vote on the decisions that shape the business: new products, pricing, expansions. Ownership is earned by shopping, not by inheritance.",
    tone: "text-accent",
  },
  {
    icon: Globe2,
    title: "A self-reinforcing flywheel",
    body: "Owners spend more, businesses grow, stakes appreciate, and more consumers join. The economy compounds from the ground up.",
    tone: "text-violet",
  },
];

const flywheel = [
  { label: "Consumers shop", icon: ShoppingBag },
  { label: "Round-ups fund stakes", icon: Coins },
  { label: "Owners govern", icon: Vote },
  { label: "Businesses grow", icon: Building2 },
  { label: "Stakes compound", icon: Sparkles },
];

export default function LandingPage() {
  const recordVisit = useRecordVisit();
  const { data: analytics } = useFounderAnalytics();
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    const returning = window.localStorage.getItem("cst.visited") === "1";
    recordVisit.mutate(returning);
    window.localStorage.setItem("cst.visited", "1");
  }, [recordVisit]);

  const counters = [
    {
      label: "Simulated visits",
      value: analytics ? formatNumber(analytics.uniqueVisitors) : "—",
      icon: Globe2,
      tone: "cyan" as const,
    },
    {
      label: "Demo purchases",
      value: analytics ? formatNumber(analytics.demoPurchasesCompleted) : "—",
      icon: ShoppingBag,
      tone: "emerald" as const,
    },
    {
      label: "Consumer sign-ups",
      value: analytics ? formatNumber(analytics.consumerRegistrations) : "—",
      icon: Users,
      tone: "violet" as const,
    },
    {
      label: "Business registrations",
      value: analytics ? formatNumber(analytics.businessRegistrations) : "—",
      icon: Building2,
      tone: "gold" as const,
    },
    {
      label: "DAOs deployed",
      value: analytics ? formatNumber(analytics.daoDeployments) : "—",
      icon: Rocket,
      tone: "emerald" as const,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="ambient-orb -left-24 top-0 size-72 bg-primary animate-drift"
        />
        <div
          aria-hidden="true"
          className="ambient-orb right-0 top-24 size-80 bg-accent animate-drift [animation-delay:1.5s]"
        />
        <div
          aria-hidden="true"
          className="ambient-orb bottom-0 left-1/3 size-64 bg-violet animate-drift [animation-delay:3s]"
        />
        <div
          className="surface-grid absolute inset-0 opacity-40"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div className="animate-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles aria-hidden="true" className="size-3.5" />
              Consumerism Staking
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Shop like always.
              <br />
              <span className="text-gradient-spectrum">Own what you love.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Round up every purchase by a few cents and earn real governance
              stakes in the businesses you already shop with. No lump sum, no
              brokerage — just everyday spending turned into ownership.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-smooth hover:-translate-y-0.5"
              >
                <Link to="/demo" data-ocid="landing.primary_button">
                  Round Up to Own
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-violet/40 bg-violet/10 text-violet transition-smooth hover:-translate-y-0.5 hover:bg-violet/20"
              >
                <Link to="/launch" data-ocid="landing.secondary_button">
                  Launch a Business DAO
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-full text-foreground transition-smooth hover:-translate-y-0.5 hover:bg-secondary/60"
              >
                <Link to="/reveal" data-ocid="landing.tertiary_button">
                  See the global economy
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Node network visual */}
          <div className="relative animate-scale-reveal [animation-delay:0.15s]">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-glow backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Ownership network
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  <span className="size-1.5 animate-node-pulse rounded-full bg-primary" />
                  Live
                </span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {demoBusinesses.slice(0, 4).map((business, index) => (
                  <li
                    key={business.slug}
                    className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 px-3 py-2.5"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <span
                      className={cn(
                        "size-2.5 shrink-0 animate-node-pulse rounded-full",
                        accentDot[business.accent],
                      )}
                      style={{ animationDelay: `${index * 400}ms` }}
                    />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                      {business.name}
                    </span>
                    <span className="font-numeric text-xs text-muted-foreground">
                      {(business.projectedOwnershipBps / 100).toFixed(2)}%
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Projected ownership after one year of simulated shopping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live counters */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {counters.map((counter) => (
              <StatCard
                key={counter.label}
                label={counter.label}
                value={counter.value}
                icon={counter.icon}
                tone={counter.tone}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionHeading
          eyebrow="How Consumerism Staking works"
          title="Three moves from shopper to stakeholder"
          description="Consumerism Staking turns the money you already spend into a small, growing ownership position in the businesses that earn it."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur transition-smooth hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-secondary/70">
                <pillar.icon
                  aria-hidden="true"
                  className={cn("size-5", pillar.tone)}
                />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Flywheel */}
      <section className="border-y border-border bg-gradient-subtle">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <SectionHeading
            eyebrow="The economic flywheel"
            title="Ownership that compounds"
            description="Each turn of the wheel deepens the relationship between the people who shop and the businesses they own."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {flywheel.map((step, index) => (
              <li
                key={step.label}
                className="relative flex items-center gap-3 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur transition-smooth hover:border-accent/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <step.icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <span className="font-numeric text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium leading-snug">
                    {step.label}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Demo businesses preview */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Fictional demo economy"
          title="Six businesses you can own today"
          description="Explore a simulated marketplace where every purchase earns you a stake. All six businesses are fictional."
          action={
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/demo" data-ocid="landing.demo_link">
                Open the demo
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          }
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demoBusinesses.map((business) => (
            <Link
              key={business.slug}
              to="/demo"
              data-ocid="landing.business_card"
              className="group flex flex-col rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-xl border bg-background/50",
                    accentRing[business.accent],
                  )}
                >
                  <Building2 aria-hidden="true" className="size-5" />
                </span>
                <BusinessBadge isFictional />
              </div>
              <h3 className="mt-4 text-base font-semibold">{business.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {business.category}
              </p>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                {business.tagline}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
                <span className="text-xs text-muted-foreground">
                  Round-up{" "}
                  <span className="font-numeric text-foreground">
                    ${(business.roundUpCents / 100).toFixed(2)}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Shop
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Founding + early access CTAs */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-card/70 p-8 shadow-elevated backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <Sparkles aria-hidden="true" className="size-3.5" />
              Free program
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Founding Business Program
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Register interest in becoming a founding business. No DAO
              deployment required — tell us about your company and we will
              reserve your place in the first cohort.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full bg-gradient-gold text-gold-foreground transition-smooth hover:-translate-y-0.5"
            >
              <Link to="/founding" data-ocid="landing.founding_button">
                Join the founding program
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/70 p-8 shadow-elevated backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Users aria-hidden="true" className="size-3.5" />
              Free early access
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Consumer early access
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Be first to turn your everyday spending into ownership. Reserve
              your spot and nominate the businesses you want to own.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-smooth hover:-translate-y-0.5"
            >
              <Link to="/early-access" data-ocid="landing.early_access_button">
                Get early access
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Simulated disclaimer */}
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SimulatedBanner />
      </section>
    </div>
  );
}
