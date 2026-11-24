import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatDollars, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarClock,
  Coins,
  Gauge,
  PieChart,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

type Scenario = {
  id: string;
  name: string;
  blurb: string;
  icon: typeof Store;
  customers: number;
  avgSpend: number;
  roundUpRate: number;
  growthRate: number;
  goal: number;
};

const SCENARIOS: Scenario[] = [
  {
    id: "cafe",
    name: "Neighbourhood cafe",
    blurb: "Steady foot traffic, loyal regulars, gentle growth.",
    icon: Store,
    customers: 420,
    avgSpend: 14,
    roundUpRate: 55,
    growthRate: 3,
    goal: 25_000,
  },
  {
    id: "retailer",
    name: "Local retailer",
    blurb: "Higher basket sizes, moderate round-up participation.",
    icon: Wallet,
    customers: 1_150,
    avgSpend: 48,
    roundUpRate: 40,
    growthRate: 5,
    goal: 75_000,
  },
  {
    id: "online",
    name: "Growing online brand",
    blurb: "Large audience, fast compounding, ambitious target.",
    icon: TrendingUp,
    customers: 8_400,
    avgSpend: 32,
    roundUpRate: 62,
    growthRate: 12,
    goal: 250_000,
  },
];

const OWNERSHIP_POOL_BPS = 1_800; // 18% of the business offered to round-up owners
const VALUATION_MULTIPLE = 4; // hypothetical value = annual revenue × multiple

type Controls = {
  customers: number;
  avgSpend: number;
  roundUpRate: number;
  growthRate: number;
  goal: number;
};

const DEFAULT_CONTROLS: Controls = {
  customers: SCENARIOS[0].customers,
  avgSpend: SCENARIOS[0].avgSpend,
  roundUpRate: SCENARIOS[0].roundUpRate,
  growthRate: SCENARIOS[0].growthRate,
  goal: SCENARIOS[0].goal,
};

function projectCapital(controls: Controls, months: number): number {
  // Monthly round-up contribution = customers × avg spend × round-up rate ×
  // average round-up fraction (~0.5 of a dollar unit), compounded by growth.
  const monthlyBase =
    controls.customers * controls.avgSpend * (controls.roundUpRate / 100) * 0.5;
  const monthlyGrowth = controls.growthRate / 100;
  let total = 0;
  for (let m = 0; m < months; m += 1) {
    total += monthlyBase * (1 + monthlyGrowth) ** m;
  }
  return total;
}

function monthsToGoal(controls: Controls): number | null {
  const monthlyBase =
    controls.customers * controls.avgSpend * (controls.roundUpRate / 100) * 0.5;
  if (monthlyBase <= 0) return null;
  const monthlyGrowth = controls.growthRate / 100;
  let total = 0;
  for (let m = 1; m <= 240; m += 1) {
    total += monthlyBase * (1 + monthlyGrowth) ** (m - 1);
    if (total >= controls.goal) return m;
  }
  return null;
}

function SliderRow({
  id,
  label,
  icon: Icon,
  value,
  display,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  icon: typeof Users;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  hint?: string;
}) {
  return (
    <div data-ocid={`simulator.control.${id}`} className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={`sim-${id}`}
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <Icon aria-hidden="true" className="size-4 text-primary" />
          {label}
        </label>
        <span className="font-numeric text-sm font-semibold tabular-nums text-accent">
          {display}
        </span>
      </div>
      <Slider
        id={`sim-${id}`}
        aria-label={label}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(next) => onChange(next[0] ?? value)}
        className="[&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-primary [&_[data-slot=slider-range]]:to-accent"
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function FigureCard({
  label,
  value,
  hint,
  icon: Icon,
  tone,
  ocid,
}: {
  label: string;
  value: string;
  hint: string;
  icon: typeof Coins;
  tone: "emerald" | "cyan" | "violet" | "gold";
  ocid: string;
}) {
  const toneText = {
    emerald: "text-primary",
    cyan: "text-accent",
    violet: "text-chart-3",
    gold: "text-warning",
  }[tone];
  const toneRing = {
    emerald: "border-primary/30",
    cyan: "border-accent/30",
    violet: "border-chart-3/30",
    gold: "border-warning/30",
  }[tone];
  return (
    <div
      data-ocid={ocid}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:-translate-y-0.5",
        toneRing,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
        <Icon aria-hidden="true" className={cn("size-4 shrink-0", toneText)} />
      </div>
      <p className="mt-3 font-numeric text-2xl font-semibold tracking-tight md:text-3xl">
        {value}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}

export default function SimulatorPage() {
  const [controls, setControls] = useState<Controls>(DEFAULT_CONTROLS);
  const [activeScenario, setActiveScenario] = useState<string | null>("cafe");

  const update = <K extends keyof Controls>(key: K, value: Controls[K]) => {
    setControls((prev) => ({ ...prev, [key]: value }));
    setActiveScenario(null);
  };

  const applyScenario = (scenario: Scenario) => {
    setControls({
      customers: scenario.customers,
      avgSpend: scenario.avgSpend,
      roundUpRate: scenario.roundUpRate,
      growthRate: scenario.growthRate,
      goal: scenario.goal,
    });
    setActiveScenario(scenario.id);
  };

  const projection = useMemo(() => {
    const months = monthsToGoal(controls);
    const horizon = months ?? 36;
    const capitalRaised = projectCapital(controls, horizon);
    const ownershipGranted = Math.min(
      (capitalRaised / Math.max(controls.goal, 1)) * OWNERSHIP_POOL_BPS,
      OWNERSHIP_POOL_BPS,
    );
    const dilutionPct = ownershipGranted / 100;
    const annualRevenue =
      controls.customers *
      controls.avgSpend *
      12 *
      (1 + controls.growthRate / 100);
    const portfolioValue = annualRevenue * VALUATION_MULTIPLE;
    return {
      months,
      capitalRaised,
      ownershipGranted,
      dilutionPct,
      portfolioValue,
    };
  }, [controls]);

  const goalProgress = Math.min(
    (projection.capitalRaised / Math.max(controls.goal, 1)) * 100,
    100,
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SimulatedBanner className="mb-10" />

      <SectionHeading
        eyebrow="Capital-raising simulator"
        title="Model your raise"
        description="Move the levers of a round-up ownership program and watch projected capital, ownership and value respond in real time. Every figure is a simulation."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8">
        {/* Controls */}
        <section
          data-ocid="simulator.panel.controls"
          aria-labelledby="sim-controls-title"
          className="rounded-2xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur"
        >
          <div className="mb-6 flex items-center gap-2">
            <Gauge aria-hidden="true" className="size-5 text-primary" />
            <h3 id="sim-controls-title" className="text-lg font-semibold">
              Program levers
            </h3>
          </div>

          <div className="space-y-6">
            <SliderRow
              id="customers"
              label="Customers"
              icon={Users}
              value={controls.customers}
              display={formatNumber(controls.customers)}
              min={50}
              max={20_000}
              step={50}
              onChange={(v) => update("customers", v)}
              hint="Active customers participating in round-ups each month."
            />
            <SliderRow
              id="spend"
              label="Average spend"
              icon={Coins}
              value={controls.avgSpend}
              display={formatDollars(controls.avgSpend)}
              min={5}
              max={200}
              step={1}
              onChange={(v) => update("avgSpend", v)}
              hint="Typical transaction size per customer visit."
            />
            <SliderRow
              id="roundup"
              label="Round-up rate"
              icon={PieChart}
              value={controls.roundUpRate}
              display={`${controls.roundUpRate}%`}
              min={5}
              max={100}
              step={1}
              onChange={(v) => update("roundUpRate", v)}
              hint="Share of customers who round up their purchase."
            />
            <SliderRow
              id="growth"
              label="Monthly growth"
              icon={TrendingUp}
              value={controls.growthRate}
              display={`${controls.growthRate}%`}
              min={0}
              max={25}
              step={1}
              onChange={(v) => update("growthRate", v)}
              hint="Compounding month-over-month customer growth."
            />
            <SliderRow
              id="goal"
              label="Funding goal"
              icon={Wallet}
              value={controls.goal}
              display={formatDollars(controls.goal)}
              min={10_000}
              max={500_000}
              step={5_000}
              onChange={(v) => update("goal", v)}
              hint="Target capital to raise from round-up owners."
            />
          </div>
        </section>

        {/* Projection */}
        <section
          data-ocid="simulator.panel.projection"
          aria-labelledby="sim-projection-title"
          className="space-y-6"
        >
          <div className="rounded-2xl border border-primary/25 bg-gradient-subtle p-6 shadow-glow">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles aria-hidden="true" className="size-5 text-primary" />
                <h3 id="sim-projection-title" className="text-lg font-semibold">
                  Live projection
                </h3>
              </div>
              <span className="rounded-full bg-warning/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-warning">
                Simulated
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FigureCard
                ocid="simulator.figure.capital"
                label="Projected capital raised"
                value={formatDollars(projection.capitalRaised)}
                hint="Total round-up contributions accumulated over the horizon."
                icon={Coins}
                tone="emerald"
              />
              <FigureCard
                ocid="simulator.figure.ownership"
                label="Projected ownership granted"
                value={`${projection.ownershipGranted.toFixed(1)}%`}
                hint="Share of the business issued to round-up owners."
                icon={PieChart}
                tone="cyan"
              />
              <FigureCard
                ocid="simulator.figure.dilution"
                label="Ownership dilution"
                value={`${projection.dilutionPct.toFixed(1)}%`}
                hint="Founder stake reduced by the ownership pool issued."
                icon={Gauge}
                tone="violet"
              />
              <FigureCard
                ocid="simulator.figure.value"
                label="Hypothetical portfolio value"
                value={formatDollars(projection.portfolioValue)}
                hint="Illustrative value at a 4× annual revenue multiple."
                icon={TrendingUp}
                tone="gold"
              />
            </div>

            <div className="mt-6 rounded-xl border border-border bg-background/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <CalendarClock
                    aria-hidden="true"
                    className="size-4 text-accent"
                  />
                  Months to reach goal
                </span>
                <span
                  data-ocid="simulator.figure.timeline"
                  className="font-numeric text-lg font-semibold tabular-nums text-accent"
                >
                  {projection.months
                    ? `${projection.months} mo`
                    : "Beyond 20 yr"}
                </span>
              </div>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                tabIndex={0}
                aria-valuenow={Math.round(goalProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progress toward funding goal"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-500 ease-cinematic"
                  style={{ width: `${goalProgress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {formatDollars(projection.capitalRaised)} of{" "}
                {formatDollars(controls.goal)} goal · {goalProgress.toFixed(0)}%
                reached
              </p>
            </div>
          </div>

          <p className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-xs leading-relaxed text-foreground">
            <span className="font-semibold text-warning">Not an offer.</span>{" "}
            These projections are a simulation for illustration only. They are
            not an offer of securities, an investment recommendation, or a
            promise of returns.
          </p>
        </section>
      </div>

      {/* Presets */}
      <section
        data-ocid="simulator.section.presets"
        aria-labelledby="sim-presets-title"
        className="mt-14"
      >
        <div className="mb-5 flex items-center gap-2">
          <Sparkles aria-hidden="true" className="size-5 text-warning" />
          <h3 id="sim-presets-title" className="text-lg font-semibold">
            Preset scenarios
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {SCENARIOS.map((scenario) => {
            const Icon = scenario.icon;
            const isActive = activeScenario === scenario.id;
            return (
              <button
                key={scenario.id}
                type="button"
                data-ocid={`simulator.preset.${scenario.id}`}
                onClick={() => applyScenario(scenario)}
                aria-pressed={isActive}
                className={cn(
                  "group rounded-2xl border p-5 text-left transition-smooth ease-cinematic hover:-translate-y-0.5 hover:border-primary/50",
                  isActive
                    ? "border-primary/60 bg-primary/10 shadow-glow"
                    : "border-border bg-card/70 hover:bg-card",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  {isActive && (
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                      Active
                    </span>
                  )}
                </div>
                <p className="mt-4 font-display text-base font-semibold">
                  {scenario.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {scenario.blurb}
                </p>
                <p className="mt-3 font-numeric text-xs text-accent">
                  {formatNumber(scenario.customers)} customers ·{" "}
                  {formatDollars(scenario.goal)} goal
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section
        data-ocid="simulator.section.cta"
        className="mt-14 overflow-hidden rounded-3xl border border-primary/25 bg-gradient-subtle p-8 shadow-glow md:p-12"
      >
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
              Turn the model into a real workspace
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Launch a business DAO to structure your ownership pool, or try the
              Round Up to Own demo to see how customers become owners.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              data-ocid="simulator.cta.launch_button"
              className="h-11 rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground shadow-glow transition-smooth hover:-translate-y-0.5"
            >
              <Link to="/launch">
                Launch your business DAO
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              data-ocid="simulator.cta.demo_button"
              className="h-11 rounded-full border-border px-6 font-semibold transition-smooth hover:-translate-y-0.5 hover:border-primary/50"
            >
              <Link to="/demo">Try the Round Up demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
