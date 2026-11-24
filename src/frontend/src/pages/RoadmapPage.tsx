import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PhaseAccent, RoadmapPhase } from "@/lib/roadmap";
import { roadmapPhases } from "@/lib/roadmap";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Compass,
  CreditCard,
  Globe2,
  Rocket,
  Sparkles,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const phaseIcons: Record<string, LucideIcon> = {
  "01": Store,
  "02": CreditCard,
  "03": TrendingUp,
  "04": Globe2,
  "05": Users,
};

const accentMeta: Record<
  PhaseAccent,
  { dot: string; ring: string; text: string; glow: string }
> = {
  emerald: {
    dot: "bg-primary",
    ring: "border-primary/50 bg-primary/10",
    text: "text-primary",
    glow: "shadow-[0_0_0_1px_oklch(var(--primary)/0.25),0_18px_44px_-22px_oklch(var(--primary)/0.55)]",
  },
  cyan: {
    dot: "bg-accent",
    ring: "border-accent/50 bg-accent/10",
    text: "text-accent",
    glow: "shadow-[0_0_0_1px_oklch(var(--accent)/0.25),0_18px_44px_-22px_oklch(var(--accent)/0.55)]",
  },
  violet: {
    dot: "bg-violet",
    ring: "border-violet/50 bg-violet/10",
    text: "text-violet",
    glow: "shadow-[0_0_0_1px_oklch(var(--violet)/0.25),0_18px_44px_-22px_oklch(var(--violet)/0.55)]",
  },
  gold: {
    dot: "bg-gold",
    ring: "border-gold/50 bg-gold/10",
    text: "text-gold",
    glow: "shadow-[0_0_0_1px_oklch(var(--gold)/0.25),0_18px_44px_-22px_oklch(var(--gold)/0.55)]",
  },
};

function PhaseCard({
  phase,
  index,
  reduceMotion,
}: {
  phase: RoadmapPhase;
  index: number;
  reduceMotion: boolean;
}) {
  const accent = accentMeta[phase.accent];
  const PhaseIcon = phaseIcons[phase.number] ?? Sparkles;
  const isCurrent = phase.status === "current";

  return (
    <motion.li
      data-ocid={`roadmap.phase.${index + 1}`}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.05 }}
      className="relative pl-12 sm:pl-16"
    >
      {/* Timeline node */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-1 flex size-9 items-center justify-center rounded-full border sm:size-11",
          accent.ring,
          isCurrent && accent.glow,
        )}
      >
        <PhaseIcon className={cn("size-4 sm:size-5", accent.text)} />
      </span>

      <div
        className={cn(
          "rounded-2xl border bg-card p-5 transition-smooth sm:p-6",
          isCurrent
            ? "border-primary/40 bg-gradient-subtle shadow-glow"
            : "border-border hover:border-border/80",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Phase {phase.number}
          </span>
          {isCurrent ? (
            <Badge
              variant="outline"
              className="gap-1.5 border-primary/40 bg-primary/10 text-primary"
            >
              <Sparkles aria-hidden="true" className="size-3.5" />
              Current phase
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="gap-1.5 border-border bg-muted/60 text-muted-foreground"
            >
              <Circle aria-hidden="true" className="size-3" />
              Planned
            </Badge>
          )}
          {phase.foundingCreditsLive && (
            <Badge
              variant="outline"
              className="gap-1.5 border-gold/50 bg-gold/10 text-gold"
            >
              <CheckCircle2 aria-hidden="true" className="size-3.5" />
              Founding Credits live
            </Badge>
          )}
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
          {phase.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {phase.summary}
        </p>

        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          {phase.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1.5 size-1.5 shrink-0 rounded-full",
                  accent.dot,
                )}
              />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export default function RoadmapPage() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div
      data-ocid="roadmap.page"
      className="mx-auto w-full max-w-3xl space-y-10 px-4 py-10 md:py-14"
    >
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Roadmap"
          title={
            <>
              Five phases to an{" "}
              <span className="text-gradient-spectrum">
                interconnected ownership economy
              </span>
            </>
          }
          description="From business DAO deployment and consumer ownership demonstrations today, to a global, interconnected ownership economy tomorrow."
        />
        <SimulatedBanner />
      </div>

      <ol
        data-ocid="roadmap.timeline"
        className="relative space-y-6 before:absolute before:bottom-2 before:left-[1.1rem] before:top-2 before:w-px before:bg-gradient-to-b before:from-primary/60 before:via-accent/40 before:to-transparent sm:before:left-[1.35rem]"
      >
        {roadmapPhases.map((phase, index) => (
          <PhaseCard
            key={phase.number}
            phase={phase}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </ol>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild className="flex-1 rounded-full">
          <Link
            to="/directory"
            search={(prev) => prev}
            data-ocid="roadmap.directory_link"
          >
            <Compass aria-hidden="true" className="size-4" />
            Explore the directory
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1 rounded-full">
          <Link to="/founding" data-ocid="roadmap.founding_link">
            <Rocket aria-hidden="true" className="size-4" />
            Join the Founding Program
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
