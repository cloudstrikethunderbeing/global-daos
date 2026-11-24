import { n as Button, r as cn, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { t as CircleCheck } from "./circle-check-B7_YBaMt.js";
import { t as Compass } from "./compass-C4geBQ-Q.js";
import { t as CreditCard } from "./credit-card-BNjgXvwn.js";
import { t as Earth } from "./earth-F2vMVOAU.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as Rocket } from "./rocket-DUIwNvdb.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Store } from "./store-Ct32Fft3.js";
import { t as TrendingUp } from "./trending-up-mHIadLz6.js";
import { t as Users } from "./users-VFYNqB8l.js";
import { _t as Circle, dt as Link } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { t as Badge } from "./badge-CBjFZzLp.js";
import { t as motion } from "./proxy-3lbWeVuX.js";
import { t as useReducedMotion } from "./use-reduced-motion-DjRxHvHP.js";
//#region src/lib/roadmap.ts
var roadmapPhases = [
	{
		number: "01",
		title: "Business DAO deployment & consumer ownership demonstrations",
		status: "current",
		accent: "emerald",
		summary: "Launch a business DAO in under a minute and watch simulated consumer ownership take shape across fictional businesses. Founding Credits go live here as recognition for the earliest members.",
		highlights: [
			"One-click business DAO launcher with a cinematic reveal",
			"Simulated round-up ownership across fictional businesses",
			"Founding Credits: badges, member numbers and an auditable ledger"
		],
		foundingCreditsLive: true
	},
	{
		number: "02",
		title: "QR commerce & digital payments",
		status: "planned",
		accent: "cyan",
		summary: "Simulated in-store QR checkout flows that prepare the architecture for future digital payments, with shareable digital receipts and business reconciliation views.",
		highlights: [
			"Simulated catalogue, cart and QR checkout",
			"Shareable digital receipts",
			"Business reconciliation dashboards"
		],
		foundingCreditsLive: false
	},
	{
		number: "03",
		title: "Compliant consumer ownership & round-up investing",
		status: "planned",
		accent: "violet",
		summary: "A path toward compliant consumer ownership and round-up investing, built on the simulated round-up model proven in Phase 1 and the payment rails prepared in Phase 2.",
		highlights: [
			"Compliance-first ownership framework",
			"Round-up investing built on proven flows",
			"Clear separation of revenue, contributions and ownership"
		],
		foundingCreditsLive: false
	},
	{
		number: "04",
		title: "Global product & service marketplace",
		status: "planned",
		accent: "gold",
		summary: "A global marketplace connecting consumers with the products and services of the businesses they help own, spanning categories and regions.",
		highlights: [
			"Cross-category product and service listings",
			"Global discovery across regions",
			"Ownership-linked marketplace rewards"
		],
		foundingCreditsLive: false
	},
	{
		number: "05",
		title: "Interconnected business ownership economy",
		status: "planned",
		accent: "emerald",
		summary: "An interconnected economy where consumers, businesses and ownership flow together into a single, transparent network.",
		highlights: [
			"Interconnected ownership across businesses",
			"Economy-wide transparency and analytics",
			"A living, cinematic view of the whole network"
		],
		foundingCreditsLive: false
	}
];
//#endregion
//#region src/pages/RoadmapPage.tsx
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
var phaseIcons = {
	"01": Store,
	"02": CreditCard,
	"03": TrendingUp,
	"04": Earth,
	"05": Users
};
var accentMeta = {
	emerald: {
		dot: "bg-primary",
		ring: "border-primary/50 bg-primary/10",
		text: "text-primary",
		glow: "shadow-[0_0_0_1px_oklch(var(--primary)/0.25),0_18px_44px_-22px_oklch(var(--primary)/0.55)]"
	},
	cyan: {
		dot: "bg-accent",
		ring: "border-accent/50 bg-accent/10",
		text: "text-accent",
		glow: "shadow-[0_0_0_1px_oklch(var(--accent)/0.25),0_18px_44px_-22px_oklch(var(--accent)/0.55)]"
	},
	violet: {
		dot: "bg-violet",
		ring: "border-violet/50 bg-violet/10",
		text: "text-violet",
		glow: "shadow-[0_0_0_1px_oklch(var(--violet)/0.25),0_18px_44px_-22px_oklch(var(--violet)/0.55)]"
	},
	gold: {
		dot: "bg-gold",
		ring: "border-gold/50 bg-gold/10",
		text: "text-gold",
		glow: "shadow-[0_0_0_1px_oklch(var(--gold)/0.25),0_18px_44px_-22px_oklch(var(--gold)/0.55)]"
	}
};
function PhaseCard({ phase, index, reduceMotion }) {
	const accent = accentMeta[phase.accent];
	const PhaseIcon = phaseIcons[phase.number] ?? Sparkles;
	const isCurrent = phase.status === "current";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
		"data-ocid": `roadmap.phase.${index + 1}`,
		initial: reduceMotion ? false : {
			opacity: 0,
			y: 20
		},
		whileInView: reduceMotion ? void 0 : {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-60px"
		},
		transition: {
			duration: .55,
			ease: EASE,
			delay: index * .05
		},
		className: "relative pl-12 sm:pl-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: cn("absolute left-0 top-1 flex size-9 items-center justify-center rounded-full border sm:size-11", accent.ring, isCurrent && accent.glow),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseIcon, { className: cn("size-4 sm:size-5", accent.text) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("rounded-2xl border bg-card p-5 transition-smooth sm:p-6", isCurrent ? "border-primary/40 bg-gradient-subtle shadow-glow" : "border-border hover:border-border/80"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
							children: ["Phase ", phase.number]
						}),
						isCurrent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "gap-1.5 border-primary/40 bg-primary/10 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								"aria-hidden": "true",
								className: "size-3.5"
							}), "Current phase"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "gap-1.5 border-border bg-muted/60 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
								"aria-hidden": "true",
								className: "size-3"
							}), "Planned"]
						}),
						phase.foundingCreditsLive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "gap-1.5 border-gold/50 bg-gold/10 text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"aria-hidden": "true",
								className: "size-3.5"
							}), "Founding Credits live"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-display text-lg font-semibold leading-snug text-foreground sm:text-xl",
					children: phase.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: phase.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-1.5 text-sm text-muted-foreground",
					children: phase.highlights.map((highlight) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							className: cn("mt-1.5 size-1.5 shrink-0 rounded-full", accent.dot)
						}), highlight]
					}, highlight))
				})
			]
		})]
	});
}
function RoadmapPage() {
	const reduceMotion = useReducedMotion() ?? false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "roadmap.page",
		className: "mx-auto w-full max-w-3xl space-y-10 px-4 py-10 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Roadmap",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Five phases to an",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient-spectrum",
							children: "interconnected ownership economy"
						})
					] }),
					description: "From business DAO deployment and consumer ownership demonstrations today, to a global, interconnected ownership economy tomorrow."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				"data-ocid": "roadmap.timeline",
				className: "relative space-y-6 before:absolute before:bottom-2 before:left-[1.1rem] before:top-2 before:w-px before:bg-gradient-to-b before:from-primary/60 before:via-accent/40 before:to-transparent sm:before:left-[1.35rem]",
				children: roadmapPhases.map((phase, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseCard, {
					phase,
					index,
					reduceMotion
				}, phase.number))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "flex-1 rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/directory",
						search: (prev) => prev,
						"data-ocid": "roadmap.directory_link",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
							"aria-hidden": "true",
							className: "size-4"
						}), "Explore the directory"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "flex-1 rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/founding",
						"data-ocid": "roadmap.founding_link",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, {
								"aria-hidden": "true",
								className: "size-4"
							}),
							"Join the Founding Program",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								"aria-hidden": "true",
								className: "size-4"
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { RoadmapPage as default };
