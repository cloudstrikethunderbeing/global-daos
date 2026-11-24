import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Coins,
  Landmark,
  Repeat,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Tone = "emerald" | "cyan" | "violet" | "gold";

type Stage = {
  id: string;
  index: number;
  label: string;
  title: string;
  body: string;
  figure: string;
  figureLabel: string;
  icon: LucideIcon;
  tone: Tone;
};

const STAGES: Stage[] = [
  {
    id: "spend",
    index: 1,
    label: "Consumer spending",
    title: "Everyday spending becomes the input",
    body: "Consumers shop at the businesses they already love. A voluntary round-up on each purchase is pooled into a shared consumer capital reserve — no new spending required.",
    figure: "$0.42",
    figureLabel: "Average round-up per simulated purchase",
    icon: ShoppingBag,
    tone: "emerald",
  },
  {
    id: "capital",
    index: 2,
    label: "Business capital",
    title: "Pooled round-ups fund real business capital",
    body: "The reserve flows into business DAOs as growth capital. Founders raise without a bank, and every contribution is recorded transparently on the ledger.",
    figure: "$148.9M",
    figureLabel: "Simulated capital raised across the network",
    icon: Landmark,
    tone: "cyan",
  },
  {
    id: "ownership",
    index: 3,
    label: "Consumer ownership",
    title: "Contributors become owners",
    body: "Each round-up mints a proportional ownership stake. Consumers hold governance rights and a share of future profit participation in the businesses they funded.",
    figure: "1.2M",
    figureLabel: "Simulated consumer owners on the cap table",
    icon: Users,
    tone: "violet",
  },
  {
    id: "return",
    index: 4,
    label: "Back to spending",
    title: "Ownership loops back into spending",
    body: "Owners keep shopping, keep rounding up, and keep compounding their stake. The flywheel accelerates — capital, ownership and loyalty reinforce one another.",
    figure: "3.4×",
    figureLabel: "Simulated flywheel velocity vs. baseline",
    icon: Repeat,
    tone: "gold",
  },
];

const toneText: Record<Tone, string> = {
  emerald: "text-primary",
  cyan: "text-accent",
  violet: "text-violet",
  gold: "text-gold",
};

const toneRing: Record<Tone, string> = {
  emerald: "border-primary/40 bg-primary/10",
  cyan: "border-accent/40 bg-accent/10",
  violet: "border-violet/40 bg-violet/10",
  gold: "border-gold/40 bg-gold/10",
};

const toneGlow: Record<Tone, string> = {
  emerald: "bg-primary",
  cyan: "bg-accent",
  violet: "bg-violet",
  gold: "bg-gold",
};

/** Node positions on the flywheel ring, in percent of the square stage. */
const NODE_POSITIONS = [
  { top: "8%", left: "50%" },
  { top: "50%", left: "92%" },
  { top: "92%", left: "50%" },
  { top: "50%", left: "8%" },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Tracks which stage is currently in view while scrolling. */
function useActiveStage() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const nodes = refs.current.filter((node): node is HTMLLIElement => !!node);
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.stageIndex,
            );
            if (!Number.isNaN(index)) setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { active, refs };
}

function Flywheel({
  active,
  reduced,
}: {
  active: number;
  reduced: boolean;
}) {
  return (
    <div
      data-ocid="reveal.flywheel"
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="ambient-orb left-1/2 top-1/2 size-2/3 -translate-x-1/2 -translate-y-1/2 bg-primary/40"
      />

      {/* Rotating ring with dashed orbit */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-[12%] rounded-full border border-dashed border-border",
          !reduced && "animate-flywheel-spin",
        )}
      >
        <span className="absolute inset-0 rounded-full border border-primary/20" />
      </div>

      {/* Connecting arcs */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient id="flywheel-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(var(--primary))" />
            <stop offset="50%" stopColor="oklch(var(--accent))" />
            <stop offset="100%" stopColor="oklch(var(--violet))" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#flywheel-arc)"
          strokeWidth="0.6"
          strokeOpacity="0.5"
          strokeDasharray="2 3"
        />
      </svg>

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/30 bg-card/80 text-center shadow-glow backdrop-blur">
        <Sparkles aria-hidden="true" className="size-5 text-primary" />
        <span className="mt-1 font-numeric text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Flywheel
        </span>
      </div>

      {/* Stage nodes */}
      {STAGES.map((stage, i) => {
        const isActive = i === active;
        const Icon = stage.icon;
        return (
          <div
            key={stage.id}
            style={NODE_POSITIONS[i]}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className={cn(
                "flex size-16 flex-col items-center justify-center rounded-2xl border backdrop-blur transition-smooth ease-cinematic sm:size-20",
                toneRing[stage.tone],
                isActive
                  ? "scale-110 border-current shadow-glow"
                  : "scale-100 opacity-70",
                toneText[stage.tone],
              )}
            >
              <Icon aria-hidden="true" className="size-5 sm:size-6" />
              <span className="mt-1 font-numeric text-[10px] font-semibold uppercase tracking-wider">
                {stage.index}
              </span>
            </div>
            {isActive && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 -z-10 rounded-2xl blur-xl",
                  toneGlow[stage.tone],
                  "opacity-40",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StageCard({
  stage,
  isActive,
  reduced,
}: {
  stage: Stage;
  isActive: boolean;
  reduced: boolean;
}) {
  const Icon = stage.icon;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card/70 p-6 shadow-elevated backdrop-blur transition-smooth ease-cinematic md:p-8",
        isActive ? "border-primary/40" : "border-border",
        !reduced && (isActive ? "opacity-100" : "opacity-60"),
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-xl border",
            toneRing[stage.tone],
            toneText[stage.tone],
          )}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="font-numeric text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Stage {stage.index} / {STAGES.length}
          </p>
          <p
            className={cn(
              "text-sm font-semibold uppercase tracking-[0.14em]",
              toneText[stage.tone],
            )}
          >
            {stage.label}
          </p>
        </div>
      </div>

      <h3 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">
        {stage.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        {stage.body}
      </p>

      <div className="mt-6 flex items-end justify-between gap-4 rounded-xl border border-border bg-background/40 p-4">
        <div>
          <p className="font-numeric text-3xl font-semibold tracking-tight md:text-4xl">
            {stage.figure}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {stage.figureLabel}
          </p>
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Simulated
        </span>
      </div>
    </div>
  );
}

export default function RevealPage() {
  const reduced = useReducedMotion();
  const { active, refs } = useActiveStage();

  return (
    <div data-ocid="reveal.page" className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div
          aria-hidden="true"
          className="ambient-orb -left-24 top-0 size-72 bg-primary/40"
        />
        <div
          aria-hidden="true"
          className="ambient-orb -right-24 top-24 size-72 bg-violet/30"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 md:pt-24 lg:px-8">
          <SimulatedBanner className="mb-10" />
          <SectionHeading
            eyebrow="Global economy reveal"
            title={
              <span className="text-gradient-spectrum">
                The ownership flywheel
              </span>
            }
            description="Scroll to trace how everyday consumer spending compounds into business capital, then into consumer ownership — and back into spending again."
          />
        </div>
      </section>

      {/* Scroll-driven stages */}
      <section
        data-ocid="reveal.section"
        className="relative mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 md:pb-28 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Sticky flywheel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Flywheel active={active} reduced={reduced} />
            <div className="mt-6 flex items-center justify-center gap-2">
              {STAGES.map((stage, i) => (
                <span
                  key={stage.id}
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 rounded-full transition-smooth ease-cinematic",
                    i === active
                      ? cn("w-8", toneGlow[stage.tone])
                      : "w-3 bg-muted",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Stage cards */}
          <ol className="space-y-6 md:space-y-8">
            {STAGES.map((stage, i) => (
              <li
                key={stage.id}
                ref={(node) => {
                  refs.current[i] = node;
                }}
                data-stage-index={i}
                data-ocid={`reveal.stage.${i + 1}`}
                className="scroll-mt-24"
              >
                <StageCard
                  stage={stage}
                  isActive={i === active}
                  reduced={reduced}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative border-t border-border bg-muted/30">
        <div
          aria-hidden="true"
          className="ambient-orb left-1/2 top-0 size-72 -translate-x-1/2 bg-primary/30"
        />
        <div className="relative mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            <Coins aria-hidden="true" className="size-3.5" />
            Join the flywheel
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            Start owning what you already spend on
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Round up a simulated purchase to see ownership minted in seconds, or
            launch a business DAO and open your cap table to consumer capital.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90 sm:w-auto"
            >
              <Link to="/demo" data-ocid="reveal.roundup_button">
                Round Up to Own
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full sm:w-auto"
            >
              <Link to="/launch" data-ocid="reveal.launch_button">
                <Building2 aria-hidden="true" className="size-4" />
                Launch a Business DAO
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            All figures on this page are simulated for demonstration. No real
            money moves and nothing here is an investment or financial product.
          </p>
        </div>
      </section>
    </div>
  );
}
