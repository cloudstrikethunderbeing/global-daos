/**
 * Single source of truth for the public roadmap. Five phases take the economy
 * from a simulated business DAO demonstration to an interconnected ownership
 * economy. Phase 1 is the current phase; everything after it is planned.
 *
 * Founding Credits are live from Phase 1 — they are recognition only and are
 * never money, equity, a token or an investment.
 */

export type PhaseStatus = "current" | "planned";

export type PhaseAccent = "emerald" | "cyan" | "violet" | "gold";

export interface RoadmapPhase {
  /** Two-digit phase number, e.g. "01". */
  number: string;
  title: string;
  status: PhaseStatus;
  accent: PhaseAccent;
  summary: string;
  highlights: string[];
  /** True when Founding Credits are live in this phase. */
  foundingCreditsLive: boolean;
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    number: "01",
    title: "Business DAO deployment & consumer ownership demonstrations",
    status: "current",
    accent: "emerald",
    summary:
      "Launch a business DAO in under a minute and watch simulated consumer ownership take shape across fictional businesses. Founding Credits go live here as recognition for the earliest members.",
    highlights: [
      "One-click business DAO launcher with a cinematic reveal",
      "Simulated round-up ownership across fictional businesses",
      "Founding Credits: badges, member numbers and an auditable ledger",
    ],
    foundingCreditsLive: true,
  },
  {
    number: "02",
    title: "QR commerce & digital payments",
    status: "planned",
    accent: "cyan",
    summary:
      "Simulated in-store QR checkout flows that prepare the architecture for future digital payments, with shareable digital receipts and business reconciliation views.",
    highlights: [
      "Simulated catalogue, cart and QR checkout",
      "Shareable digital receipts",
      "Business reconciliation dashboards",
    ],
    foundingCreditsLive: false,
  },
  {
    number: "03",
    title: "Compliant consumer ownership & round-up investing",
    status: "planned",
    accent: "violet",
    summary:
      "A path toward compliant consumer ownership and round-up investing, built on the simulated round-up model proven in Phase 1 and the payment rails prepared in Phase 2.",
    highlights: [
      "Compliance-first ownership framework",
      "Round-up investing built on proven flows",
      "Clear separation of revenue, contributions and ownership",
    ],
    foundingCreditsLive: false,
  },
  {
    number: "04",
    title: "Global product & service marketplace",
    status: "planned",
    accent: "gold",
    summary:
      "A global marketplace connecting consumers with the products and services of the businesses they help own, spanning categories and regions.",
    highlights: [
      "Cross-category product and service listings",
      "Global discovery across regions",
      "Ownership-linked marketplace rewards",
    ],
    foundingCreditsLive: false,
  },
  {
    number: "05",
    title: "Interconnected business ownership economy",
    status: "planned",
    accent: "emerald",
    summary:
      "An interconnected economy where consumers, businesses and ownership flow together into a single, transparent network.",
    highlights: [
      "Interconnected ownership across businesses",
      "Economy-wide transparency and analytics",
      "A living, cinematic view of the whole network",
    ],
    foundingCreditsLive: false,
  },
];
