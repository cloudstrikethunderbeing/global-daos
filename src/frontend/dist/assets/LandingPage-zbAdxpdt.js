import { d as require_react, g as __toESM, n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { t as Building2 } from "./building-2-u1b-6pzy.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { t as Earth } from "./earth-F2vMVOAU.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as Rocket } from "./rocket-DUIwNvdb.js";
import { t as ShoppingBag } from "./shopping-bag-t1gQc4pz.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Users } from "./users-VFYNqB8l.js";
import { W as useRecordVisit, dt as Link, tt as demoBusinesses, x as useFounderAnalytics } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { s as formatNumber } from "./format-9V_VuN1H.js";
import { t as StatCard } from "./StatCard-DseHDqGa.js";
import { t as BusinessBadge } from "./BusinessBadge-gzAAfmoA.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Vote = createLucideIcon("vote", [
	["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}],
	["path", {
		d: "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z",
		key: "1ezoue"
	}],
	["path", {
		d: "M22 19H2",
		key: "nuriw5"
	}]
]);
//#endregion
//#region src/pages/LandingPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var accentRing = {
	emerald: "border-primary/40 text-primary",
	cyan: "border-accent/40 text-accent",
	violet: "border-violet/40 text-violet",
	gold: "border-gold/40 text-gold"
};
var accentDot = {
	emerald: "bg-primary",
	cyan: "bg-accent",
	violet: "bg-violet",
	gold: "bg-gold"
};
var pillars = [
	{
		icon: Coins,
		title: "Round up, own a slice",
		body: "Every purchase rounds up by a few cents. Those cents buy governance stakes in the business you just shopped with — no lump sum, no brokerage account.",
		tone: "text-primary"
	},
	{
		icon: Vote,
		title: "Consumers become owners",
		body: "Stakeholders vote on the decisions that shape the business: new products, pricing, expansions. Ownership is earned by shopping, not by inheritance.",
		tone: "text-accent"
	},
	{
		icon: Earth,
		title: "A self-reinforcing flywheel",
		body: "Owners spend more, businesses grow, stakes appreciate, and more consumers join. The economy compounds from the ground up.",
		tone: "text-violet"
	}
];
var flywheel = [
	{
		label: "Consumers shop",
		icon: ShoppingBag
	},
	{
		label: "Round-ups fund stakes",
		icon: Coins
	},
	{
		label: "Owners govern",
		icon: Vote
	},
	{
		label: "Businesses grow",
		icon: Building2
	},
	{
		label: "Stakes compound",
		icon: Sparkles
	}
];
function LandingPage() {
	const recordVisit = useRecordVisit();
	const { data: analytics } = useFounderAnalytics();
	const recorded = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
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
			icon: Earth,
			tone: "cyan"
		},
		{
			label: "Demo purchases",
			value: analytics ? formatNumber(analytics.demoPurchasesCompleted) : "—",
			icon: ShoppingBag,
			tone: "emerald"
		},
		{
			label: "Consumer sign-ups",
			value: analytics ? formatNumber(analytics.consumerRegistrations) : "—",
			icon: Users,
			tone: "violet"
		},
		{
			label: "Business registrations",
			value: analytics ? formatNumber(analytics.businessRegistrations) : "—",
			icon: Building2,
			tone: "gold"
		},
		{
			label: "DAOs deployed",
			value: analytics ? formatNumber(analytics.daoDeployments) : "—",
			icon: Rocket,
			tone: "emerald"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "ambient-orb -left-24 top-0 size-72 bg-primary animate-drift"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "ambient-orb right-0 top-24 size-80 bg-accent animate-drift [animation-delay:1.5s]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "ambient-orb bottom-0 left-1/3 size-64 bg-violet animate-drift [animation-delay:3s]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "surface-grid absolute inset-0 opacity-40",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-reveal",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
										"aria-hidden": "true",
										className: "size-3.5"
									}), "Consumerism Staking"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
									children: [
										"Shop like always.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient-spectrum",
											children: "Own what you love."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg",
									children: "Round up every purchase by a few cents and earn real governance stakes in the businesses you already shop with. No lump sum, no brokerage — just everyday spending turned into ownership."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "lg",
											className: "rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-smooth hover:-translate-y-0.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/demo",
												"data-ocid": "landing.primary_button",
												children: ["Round Up to Own", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
													"aria-hidden": "true",
													className: "size-4"
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "lg",
											variant: "outline",
											className: "rounded-full border-violet/40 bg-violet/10 text-violet transition-smooth hover:-translate-y-0.5 hover:bg-violet/20",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/launch",
												"data-ocid": "landing.secondary_button",
												children: "Launch a Business DAO"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "lg",
											variant: "ghost",
											className: "rounded-full text-foreground transition-smooth hover:-translate-y-0.5 hover:bg-secondary/60",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/reveal",
												"data-ocid": "landing.tertiary_button",
												children: ["See the global economy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
													"aria-hidden": "true",
													className: "size-4"
												})]
											})
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative animate-scale-reveal [animation-delay:0.15s]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-glow backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
											children: "Ownership network"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-node-pulse rounded-full bg-primary" }), "Live"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-5 space-y-2.5",
										children: demoBusinesses.slice(0, 4).map((business, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 px-3 py-2.5",
											style: { animationDelay: `${index * 90}ms` },
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("size-2.5 shrink-0 animate-node-pulse rounded-full", accentDot[business.accent]),
													style: { animationDelay: `${index * 400}ms` }
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "min-w-0 flex-1 truncate text-sm font-medium",
													children: business.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-numeric text-xs text-muted-foreground",
													children: [(business.projectedOwnershipBps / 100).toFixed(2), "%"]
												})
											]
										}, business.slug))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-xs text-muted-foreground",
										children: "Projected ownership after one year of simulated shopping."
									})
								]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-border bg-muted/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5",
						children: counters.map((counter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: counter.label,
							value: counter.value,
							icon: counter.icon,
							tone: counter.tone
						}, counter.label))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "How Consumerism Staking works",
					title: "Three moves from shopper to stakeholder",
					description: "Consumerism Staking turns the money you already spend into a small, growing ownership position in the businesses that earn it."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-3",
					children: pillars.map((pillar) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur transition-smooth hover:-translate-y-1 hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex size-11 items-center justify-center rounded-xl bg-secondary/70",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(pillar.icon, {
									"aria-hidden": "true",
									className: cn("size-5", pillar.tone)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-lg font-semibold",
								children: pillar.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: pillar.body
							})
						]
					}, pillar.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-border bg-gradient-subtle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "The economic flywheel",
						title: "Ownership that compounds",
						description: "Each turn of the wheel deepens the relationship between the people who shop and the businesses they own."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
						children: flywheel.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "relative flex items-center gap-3 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur transition-smooth hover:border-accent/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, {
									"aria-hidden": "true",
									className: "size-5"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-numeric text-xs text-muted-foreground",
									children: String(index + 1).padStart(2, "0")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium leading-snug",
									children: step.label
								})]
							})]
						}, step.label))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Fictional demo economy",
					title: "Six businesses you can own today",
					description: "Explore a simulated marketplace where every purchase earns you a stake. All six businesses are fictional.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/demo",
							"data-ocid": "landing.demo_link",
							children: ["Open the demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								"aria-hidden": "true",
								className: "size-4"
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: demoBusinesses.map((business) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/demo",
						"data-ocid": "landing.business_card",
						className: "group flex flex-col rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:-translate-y-1 hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("inline-flex size-10 items-center justify-center rounded-xl border bg-background/50", accentRing[business.accent]),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
										"aria-hidden": "true",
										className: "size-5"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessBadge, { isFictional: true })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-base font-semibold",
								children: business.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground",
								children: business.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 line-clamp-2 text-sm text-muted-foreground",
								children: business.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center justify-between border-t border-border/70 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										"Round-up",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-numeric text-foreground",
											children: ["$", (business.roundUpCents / 100).toFixed(2)]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 text-xs font-medium text-primary",
									children: ["Shop", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										"aria-hidden": "true",
										className: "size-3.5 transition-transform group-hover:translate-x-0.5"
									})]
								})]
							})
						]
					}, business.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-muted/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-7xl gap-6 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-3xl border border-gold/30 bg-card/70 p-8 shadow-elevated backdrop-blur",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
									"aria-hidden": "true",
									className: "size-3.5"
								}), "Free program"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-2xl font-bold tracking-tight md:text-3xl",
								children: "Founding Business Program"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground md:text-base",
								children: "Register interest in becoming a founding business. No DAO deployment required — tell us about your company and we will reserve your place in the first cohort."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "mt-6 rounded-full bg-gradient-gold text-gold-foreground transition-smooth hover:-translate-y-0.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/founding",
									"data-ocid": "landing.founding_button",
									children: ["Join the founding program", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										"aria-hidden": "true",
										className: "size-4"
									})]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-3xl border border-primary/30 bg-card/70 p-8 shadow-elevated backdrop-blur",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									"aria-hidden": "true",
									className: "size-3.5"
								}), "Free early access"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-2xl font-bold tracking-tight md:text-3xl",
								children: "Consumer early access"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground md:text-base",
								children: "Be first to turn your everyday spending into ownership. Reserve your spot and nominate the businesses you want to own."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "mt-6 rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-smooth hover:-translate-y-0.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/early-access",
									"data-ocid": "landing.early_access_button",
									children: ["Get early access", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										"aria-hidden": "true",
										className: "size-4"
									})]
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, {})
			})
		]
	});
}
//#endregion
export { LandingPage as default };
