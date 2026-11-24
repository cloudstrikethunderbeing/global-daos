import { d as require_react, g as __toESM, n as Button, r as cn, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { t as Building2 } from "./building-2-u1b-6pzy.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as Landmark } from "./landmark-CSNsXaEc.js";
import { t as Repeat } from "./repeat-D8shsnc0.js";
import { t as ShoppingBag } from "./shopping-bag-t1gQc4pz.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Users } from "./users-VFYNqB8l.js";
import { dt as Link } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
//#region src/pages/RevealPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var STAGES = [
	{
		id: "spend",
		index: 1,
		label: "Consumer spending",
		title: "Everyday spending becomes the input",
		body: "Consumers shop at the businesses they already love. A voluntary round-up on each purchase is pooled into a shared consumer capital reserve — no new spending required.",
		figure: "$0.42",
		figureLabel: "Average round-up per simulated purchase",
		icon: ShoppingBag,
		tone: "emerald"
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
		tone: "cyan"
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
		tone: "violet"
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
		tone: "gold"
	}
];
var toneText = {
	emerald: "text-primary",
	cyan: "text-accent",
	violet: "text-violet",
	gold: "text-gold"
};
var toneRing = {
	emerald: "border-primary/40 bg-primary/10",
	cyan: "border-accent/40 bg-accent/10",
	violet: "border-violet/40 bg-violet/10",
	gold: "border-gold/40 bg-gold/10"
};
var toneGlow = {
	emerald: "bg-primary",
	cyan: "bg-accent",
	violet: "bg-violet",
	gold: "bg-gold"
};
/** Node positions on the flywheel ring, in percent of the square stage. */
var NODE_POSITIONS = [
	{
		top: "8%",
		left: "50%"
	},
	{
		top: "50%",
		left: "92%"
	},
	{
		top: "92%",
		left: "50%"
	},
	{
		top: "50%",
		left: "8%"
	}
];
function useReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(query.matches);
		const onChange = (event) => setReduced(event.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);
	return reduced;
}
/** Tracks which stage is currently in view while scrolling. */
function useActiveStage() {
	const [active, setActive] = (0, import_react.useState)(0);
	const refs = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		const nodes = refs.current.filter((node) => !!node);
		if (nodes.length === 0) return;
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				const index = Number(entry.target.dataset.stageIndex);
				if (!Number.isNaN(index)) setActive(index);
			}
		}, {
			rootMargin: "-45% 0px -45% 0px",
			threshold: 0
		});
		for (const node of nodes) observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return {
		active,
		refs
	};
}
function Flywheel({ active, reduced }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "reveal.flywheel",
		className: "relative mx-auto aspect-square w-full max-w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "ambient-orb left-1/2 top-1/2 size-2/3 -translate-x-1/2 -translate-y-1/2 bg-primary/40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: cn("absolute inset-[12%] rounded-full border border-dashed border-border", !reduced && "animate-flywheel-spin"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full border border-primary/20" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				"aria-hidden": "true",
				viewBox: "0 0 100 100",
				className: "absolute inset-0 size-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "flywheel-arc",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "oklch(var(--primary))"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "50%",
							stopColor: "oklch(var(--accent))"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "oklch(var(--violet))"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r: "42",
					fill: "none",
					stroke: "url(#flywheel-arc)",
					strokeWidth: "0.6",
					strokeOpacity: "0.5",
					strokeDasharray: "2 3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/30 bg-card/80 text-center shadow-glow backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
					"aria-hidden": "true",
					className: "size-5 text-primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 font-numeric text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
					children: "Flywheel"
				})]
			}),
			STAGES.map((stage, i) => {
				const isActive = i === active;
				const Icon = stage.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: NODE_POSITIONS[i],
					className: "absolute -translate-x-1/2 -translate-y-1/2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex size-16 flex-col items-center justify-center rounded-2xl border backdrop-blur transition-smooth ease-cinematic sm:size-20", toneRing[stage.tone], isActive ? "scale-110 border-current shadow-glow" : "scale-100 opacity-70", toneText[stage.tone]),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							"aria-hidden": "true",
							className: "size-5 sm:size-6"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 font-numeric text-[10px] font-semibold uppercase tracking-wider",
							children: stage.index
						})]
					}), isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: cn("absolute inset-0 -z-10 rounded-2xl blur-xl", toneGlow[stage.tone], "opacity-40")
					})]
				}, stage.id);
			})
		]
	});
}
function StageCard({ stage, isActive, reduced }) {
	const Icon = stage.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden rounded-2xl border bg-card/70 p-6 shadow-elevated backdrop-blur transition-smooth ease-cinematic md:p-8", isActive ? "border-primary/40" : "border-border", !reduced && (isActive ? "opacity-100" : "opacity-60")),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex size-11 items-center justify-center rounded-xl border", toneRing[stage.tone], toneText[stage.tone]),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						"aria-hidden": "true",
						className: "size-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-numeric text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground",
					children: [
						"Stage ",
						stage.index,
						" / ",
						STAGES.length
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-sm font-semibold uppercase tracking-[0.14em]", toneText[stage.tone]),
					children: stage.label
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 text-2xl font-bold tracking-tight md:text-3xl",
				children: stage.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base leading-relaxed text-muted-foreground",
				children: stage.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-end justify-between gap-4 rounded-xl border border-border bg-background/40 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-numeric text-3xl font-semibold tracking-tight md:text-4xl",
					children: stage.figure
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: stage.figureLabel
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
					children: "Simulated"
				})]
			})
		]
	});
}
function RevealPage() {
	const reduced = useReducedMotion();
	const { active, refs } = useActiveStage();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "reveal.page",
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "ambient-orb -left-24 top-0 size-72 bg-primary/40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "ambient-orb -right-24 top-24 size-72 bg-violet/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 md:pt-24 lg:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Global economy reveal",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-spectrum",
								children: "The ownership flywheel"
							}),
							description: "Scroll to trace how everyday consumer spending compounds into business capital, then into consumer ownership — and back into spending again."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"data-ocid": "reveal.section",
				className: "relative mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 md:pb-28 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:sticky lg:top-24 lg:self-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flywheel, {
							active,
							reduced
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex items-center justify-center gap-2",
							children: STAGES.map((stage, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: cn("h-1.5 rounded-full transition-smooth ease-cinematic", i === active ? cn("w-8", toneGlow[stage.tone]) : "w-3 bg-muted")
							}, stage.id))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-6 md:space-y-8",
						children: STAGES.map((stage, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							ref: (node) => {
								refs.current[i] = node;
							},
							"data-stage-index": i,
							"data-ocid": `reveal.stage.${i + 1}`,
							className: "scroll-mt-24",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageCard, {
								stage,
								isActive: i === active,
								reduced
							})
						}, stage.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative border-t border-border bg-muted/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "ambient-orb left-1/2 top-0 size-72 -translate-x-1/2 bg-primary/30"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, {
								"aria-hidden": "true",
								className: "size-3.5"
							}), "Join the flywheel"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-6 text-3xl font-bold tracking-tight md:text-5xl",
							children: "Start owning what you already spend on"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
							children: "Round up a simulated purchase to see ownership minted in seconds, or launch a business DAO and open your cap table to consumer capital."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "w-full rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90 sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/demo",
									"data-ocid": "reveal.roundup_button",
									children: ["Round Up to Own", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										"aria-hidden": "true",
										className: "size-4"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "w-full rounded-full sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/launch",
									"data-ocid": "reveal.launch_button",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
										"aria-hidden": "true",
										className: "size-4"
									}), "Launch a Business DAO"]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs text-muted-foreground",
							children: "All figures on this page are simulated for demonstration. No real money moves and nothing here is an investment or financial product."
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { RevealPage as default };
