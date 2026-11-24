import { d as require_react, g as __toESM, n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { a as CalendarDays, i as Hash, n as FoundingBadge, o as ArrowUpRight, r as CreditHistoryList, t as ReferralPanel } from "./ReferralPanel-o_Oj1ydk.js";
import { t as Award } from "./award-C5x5gwpl.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { t as ShareControl } from "./ShareControl-VNpdJcG3.js";
import { t as QrCode } from "./QrCode-DWA2s1CU.js";
import { c as UserPlus, i as formatMemberNumber, l as Lock, o as rewardTypeLabels, r as formatCredits } from "./credits-FVSdr8gq.js";
import { t as EmptyState } from "./EmptyState-BXNCSIq9.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { n as CurrencyValue, r as Layers, t as CurrencyLegend } from "./CurrencyValue-CjlC7Mmm.js";
import { t as Receipt } from "./receipt-KeRjBnFV.js";
import { t as Share2 } from "./share-2-CCCON0LS.js";
import { t as ShoppingBag } from "./shopping-bag-t1gQc4pz.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as TrendingUp } from "./trending-up-mHIadLz6.js";
import { t as Wallet } from "./wallet-BLO_fJX1.js";
import { A as useMyReferralCode, E as useMyCreditSummary, L as usePublicPortfolio, O as useMyPortfolio, Rt as RequireSignIn, T as useMyContributionHistory, Y as useRewardAmounts, c as useBusinesses, dt as Link, g as useClaimFirstSimulatedPurchase, h as useClaimEarlyConsumerRegistration, it as FoundingBadge$1, j as useMyShareToken, k as useMyPurchaseHistory, lt as RewardType, pt as useSearch, v as useClaimValuableFeedback, zt as SignInButton } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { n as errorMessage, t as describeBackendError } from "./errors-BPsygLkv.js";
import { i as formatDate, s as formatNumber, t as formatBps } from "./format-9V_VuN1H.js";
import { t as LoadingSkeleton } from "./LoadingSkeleton-D-diqBmI.js";
import { t as StatCard } from "./StatCard-DseHDqGa.js";
import { t as BusinessBadge } from "./BusinessBadge-gzAAfmoA.js";
import { t as motion } from "./proxy-3lbWeVuX.js";
import { t as useReducedMotion } from "./use-reduced-motion-DjRxHvHP.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Eye = createLucideIcon("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageSquareHeart = createLucideIcon("message-square-heart", [["path", {
	d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
	key: "1lielz"
}], ["path", {
	d: "M14.8 7.5a1.84 1.84 0 0 0-2.6 0l-.2.3-.3-.3a1.84 1.84 0 1 0-2.4 2.8L12 13l2.7-2.7c.9-.9.8-2.1.1-2.8",
	key: "1blaws"
}]]);
//#endregion
//#region src/components/credits/FoundingCreditsPanel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var consumerRewardTypes = [
	RewardType.earlyConsumerRegistration,
	RewardType.valuableFeedback,
	RewardType.firstSimulatedPurchase,
	RewardType.consumerReferral
];
var futureBenefits = [
	{
		title: "Premium feature access",
		description: "Early unlocks for advanced portfolio and planning tools."
	},
	{
		title: "Reduced platform fees",
		description: "Lower simulated platform fees on future round-ups."
	},
	{
		title: "Business promotion credits",
		description: "Credits toward promoting a business you support."
	},
	{
		title: "Marketplace benefits",
		description: "Priority access to marketplace perks as they launch."
	},
	{
		title: "Early access to new functionality",
		description: "First look at new consumer experiences before release."
	},
	{
		title: "Exclusive founding member recognition",
		description: "A permanent founding member marker across the app."
	}
];
function rewardAmountFor(amounts, type) {
	switch (type) {
		case RewardType.earlyConsumerRegistration: return amounts.earlyConsumerRegistration;
		case RewardType.valuableFeedback: return amounts.valuableFeedback;
		case RewardType.firstSimulatedPurchase: return amounts.firstSimulatedPurchase;
		case RewardType.consumerReferral: return amounts.consumerReferral;
		default: return 0n;
	}
}
function toMessage(error) {
	if (typeof error === "object" && error !== null && "__kind__" in error) return describeBackendError(error);
	return errorMessage(error);
}
/**
* Founding Credits dashboard for the signed-in consumer portfolio. Credits are
* a simulated recognition score, never money, equity, a token or an investment,
* and are kept visually separate from ownership units and contributions.
*/
function FoundingCreditsPanel() {
	const summaryQuery = useMyCreditSummary();
	const historyQuery = useMyContributionHistory();
	const referralQuery = useMyReferralCode();
	const amountsQuery = useRewardAmounts();
	const claimRegistration = useClaimEarlyConsumerRegistration();
	const claimFeedback = useClaimValuableFeedback();
	const claimPurchase = useClaimFirstSimulatedPurchase();
	const [notice, setNotice] = (0, import_react.useState)(null);
	const isLoading = summaryQuery.isLoading || historyQuery.isLoading || referralQuery.isLoading || amountsQuery.isLoading;
	const isError = summaryQuery.isError || historyQuery.isError || referralQuery.isError || amountsQuery.isError;
	const summary = summaryQuery.data;
	const history = historyQuery.data ?? [];
	const referralCode = referralQuery.data ?? "";
	const amounts = amountsQuery.data;
	const actions = [
		{
			type: RewardType.earlyConsumerRegistration,
			label: "Claim early registration",
			description: "Awarded once for joining the early consumer program.",
			icon: Sparkles,
			mutation: claimRegistration
		},
		{
			type: RewardType.valuableFeedback,
			label: "Claim valuable feedback",
			description: "Awarded for feedback that helps shape the product.",
			icon: MessageSquareHeart,
			mutation: claimFeedback
		},
		{
			type: RewardType.firstSimulatedPurchase,
			label: "Claim first purchase",
			description: "Awarded once after your first simulated round-up.",
			icon: ShoppingBag,
			mutation: claimPurchase
		}
	];
	function runClaim(label, mutation) {
		setNotice(null);
		mutation.mutate(void 0, {
			onSuccess: () => setNotice({
				tone: "success",
				message: `${label} recorded. Your recognition score has been updated.`
			}),
			onError: (error) => setNotice({
				tone: "error",
				message: toMessage(error)
			})
		});
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		"data-ocid": "founding_credits.loading_state",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
			variant: "stat",
			rows: 4
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
			variant: "list",
			rows: 3
		})]
	});
	if (isError || !summary) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Award,
		title: "We couldn't load your Founding Credits",
		description: "Your recognition score and history could not be retrieved. Check your connection and try again.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "outline",
			"data-ocid": "founding_credits.retry_button",
			onClick: () => {
				summaryQuery.refetch();
				historyQuery.refetch();
				referralQuery.refetch();
				amountsQuery.refetch();
			},
			className: "rounded-full",
			children: "Try again"
		})
	});
	const hasCredits = summary.lifetimeEarned > 0n || history.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		"data-ocid": "founding_credits.panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "Founding Member recognition",
				className: "relative overflow-hidden rounded-3xl border border-warning/30 bg-gradient-to-br from-warning/10 via-card/60 to-card/60 p-6 shadow-elevated backdrop-blur sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "ambient-orb -right-10 -top-10 size-40 bg-warning"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoundingBadge, { kind: summary.badge ?? FoundingBadge$1.consumer }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
							children: "Recognition score"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground",
						children: "Founding Credits are a simulated recognition score for early supporters. They are not money, equity, a token or an investment, and they are kept separate from your ownership units, contributions and portfolio value."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Credit balance",
						value: formatCredits(summary.balance),
						hint: "Current recognition score",
						icon: Coins,
						tone: "gold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Lifetime earned",
						value: formatCredits(summary.lifetimeEarned),
						hint: "Total credits awarded",
						icon: Sparkles,
						tone: "emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Founding number",
						value: summary.memberNumber !== void 0 ? formatMemberNumber(summary.memberNumber) : "—",
						hint: "Your unique founding member number",
						icon: Hash,
						tone: "violet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Member since",
						value: summary.foundingDate !== void 0 ? formatDate(summary.foundingDate) : "—",
						hint: "Founding membership date",
						icon: CalendarDays,
						tone: "cyan"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-border bg-card/60 p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "Contribution history",
						description: "Every credit award, newest first, with the reward type, amount, related subject and date."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: hasCredits ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditHistoryList, {
							entries: history,
							emptyTitle: "No credits yet",
							emptyDescription: "Complete a qualifying action below to start earning Founding Credits."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: Coins,
							title: "No credits yet",
							description: "Complete a qualifying action below to start earning Founding Credits."
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card/60 p-5 sm:p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							title: "What each action is worth",
							description: "Current reward amounts for consumer actions."
						}), amounts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-5 grid grid-cols-2 gap-2 text-sm",
							children: consumerRewardTypes.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/60 bg-background/40 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[11px] uppercase tracking-[0.12em] text-muted-foreground",
									children: rewardTypeLabels[type]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-0.5 font-numeric font-semibold text-foreground",
									children: formatCredits(rewardAmountFor(amounts, type))
								})]
							}, type))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-sm text-muted-foreground",
							children: "Reward amounts are unavailable right now."
						})]
					}), referralCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferralPanel, { referralCode }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card/60 p-5 sm:p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-8 items-center justify-center rounded-full bg-chart-3/15 text-chart-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {
									"aria-hidden": "true",
									className: "size-4"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-semibold",
								children: "Referral link"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: "Your personal referral link appears here once you earn your first Founding Credit."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border bg-card/60 p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "Qualifying actions",
						description: "Complete these actions to earn Founding Credits. Your balance and history refresh after each award."
					}),
					notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", {
						"data-ocid": notice.tone === "error" ? "founding_credits.claim.error_state" : "founding_credits.claim.success_state",
						className: cn("mt-4 rounded-xl border px-4 py-2.5 text-sm", notice.tone === "error" ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-primary/40 bg-primary/10 text-primary"),
						children: notice.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: actions.map((action, index) => {
							const Icon = action.icon;
							const pending = action.mutation.isPending;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-ocid": `founding_credits.action.item.${index + 1}`,
								className: "flex flex-col gap-3 rounded-xl border border-border/70 bg-background/40 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											"aria-hidden": "true",
											className: "size-4"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold",
											children: action.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs leading-relaxed text-muted-foreground",
											children: action.description
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									"data-ocid": `founding_credits.action.claim_button.${index + 1}`,
									disabled: pending,
									onClick: () => runClaim(action.label, action.mutation),
									className: "mt-auto self-start rounded-full",
									children: pending ? "Recording…" : "Claim"
								})]
							}, action.type);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "founding-benefits-heading",
				className: "rounded-2xl border border-dashed border-border bg-card/40 p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								"aria-hidden": "true",
								className: "size-4 text-muted-foreground"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "founding-benefits-heading",
								className: "font-display text-base font-semibold",
								children: "Future credit benefits"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
								children: "Not yet active"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground",
						children: "These are possibilities under consideration, not current entitlements. Nothing here can be redeemed today, and none of it is money, equity or an investment."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: futureBenefits.map((benefit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							"data-ocid": `founding_credits.benefit.item.${index + 1}`,
							className: "rounded-xl border border-border/60 bg-background/40 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: benefit.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-muted-foreground",
								children: benefit.description
							})]
						}, benefit.title))
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/PortfolioPage.tsx
var EASE = [
	.16,
	1,
	.3,
	1
];
function useBusinessMap(businesses) {
	return (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const business of businesses ?? []) map.set(business.id.toString(), business);
		return map;
	}, [businesses]);
}
function SignInPrompt() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-3xl border border-border bg-card/70 p-8 text-center shadow-elevated backdrop-blur sm:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "ambient-orb -left-10 -top-10 size-48 bg-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "ambient-orb -bottom-12 -right-8 size-52 bg-accent"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
								"aria-hidden": "true",
								className: "size-6"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl",
							children: "Your ownership portfolio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground",
							children: "Sign in with Internet Identity to view your Founding Credits dashboard, save your round-up contributions, track ownership units across businesses, and share a public snapshot of your simulated portfolio."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, { className: "inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/demo",
									"data-ocid": "portfolio.demo_link",
									children: ["Try Round Up to Own", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
										"aria-hidden": "true",
										className: "size-4"
									})]
								})
							})]
						})
					]
				})
			]
		})]
	});
}
function HoldingCard({ position, business, index, reduceMotion }) {
	const name = business?.name ?? `Business #${position.businessId.toString()}`;
	const pct = Number(position.hypotheticalPercentageBps) / 100;
	const barWidth = Math.min(100, Math.max(2, pct));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
		"data-ocid": `portfolio.holding.${index + 1}`,
		initial: reduceMotion ? false : {
			opacity: 0,
			y: 16
		},
		whileInView: reduceMotion ? void 0 : {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-40px"
		},
		transition: {
			duration: .5,
			ease: EASE,
			delay: index * .06
		},
		className: "group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:border-primary/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-display text-lg font-semibold",
							children: business ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/business/$slug",
								params: { slug: business.slug },
								"data-ocid": `portfolio.holding_link.${index + 1}`,
								className: "transition-smooth hover:text-primary",
								children: name
							}) : name
						}), business && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessBadge, { isFictional: business.isFictional })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							formatNumber(position.purchaseCount),
							" ",
							position.purchaseCount === 1n ? "purchase" : "purchases",
							" · last",
							" ",
							formatDate(position.lastPurchaseAt)
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-full border border-chart-3/30 bg-chart-3/10 px-2.5 py-1 font-numeric text-xs font-semibold text-chart-3",
					children: formatBps(position.hypotheticalPercentageBps)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
					children: "Contributed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyValue, {
					cents: position.cumulativeContributions,
					className: "text-base font-semibold"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
					children: "Ownership units"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-numeric text-base font-semibold text-foreground",
					children: formatNumber(position.ownershipUnits)
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-[11px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hypothetical stake" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-numeric",
						children: formatBps(position.hypotheticalPercentageBps)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-full rounded-full bg-gradient-to-r from-primary via-accent to-chart-3",
						initial: reduceMotion ? false : { width: 0 },
						whileInView: reduceMotion ? void 0 : { width: `${barWidth}%` },
						viewport: { once: true },
						transition: {
							duration: .9,
							ease: EASE,
							delay: .15 + index * .06
						},
						style: reduceMotion ? { width: `${barWidth}%` } : void 0
					})
				})]
			})
		]
	});
}
function PurchaseRow({ purchase, business, index }) {
	const name = business?.name ?? `Business #${purchase.businessId.toString()}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-ocid": `portfolio.purchase.${index + 1}`,
		className: "flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4 transition-smooth hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-semibold text-foreground",
				children: purchase.productName
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-0.5 truncate text-xs text-muted-foreground",
				children: [
					name,
					" · ",
					formatDate(purchase.createdAt)
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-x-5 gap-y-1 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Revenue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-numeric font-semibold text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyValue, {
							cents: purchase.purchasePrice,
							kind: "value"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Contribution"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyValue, {
						cents: purchase.contributionAmount,
						className: "font-semibold"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Units"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-numeric font-semibold text-foreground",
						children: formatNumber(purchase.ownershipUnits)
					})]
				})
			]
		})]
	});
}
function PortfolioDashboard() {
	const reduceMotion = useReducedMotion() ?? false;
	const portfolioQuery = useMyPortfolio();
	const historyQuery = useMyPurchaseHistory();
	const tokenQuery = useMyShareToken();
	const businessMap = useBusinessMap(useBusinesses().data);
	const portfolio = portfolioQuery.data;
	const positions = portfolio?.positions ?? [];
	const purchases = historyQuery.data ?? [];
	const shareToken = tokenQuery.data ?? "";
	const shareUrl = (0, import_react.useMemo)(() => {
		if (!shareToken || typeof window === "undefined") return "";
		return `${window.location.origin}/portfolio?share=${encodeURIComponent(shareToken)}`;
	}, [shareToken]);
	const isLoading = portfolioQuery.isLoading || historyQuery.isLoading || tokenQuery.isLoading;
	const sortedPositions = (0, import_react.useMemo)(() => [...positions].sort((a, b) => Number(b.cumulativeContributions - a.cumulativeContributions)), [positions]);
	const sortedPurchases = (0, import_react.useMemo)(() => [...purchases].sort((a, b) => Number(b.createdAt - a.createdAt)), [purchases]);
	const hasHoldings = positions.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Your ownership",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-spectrum",
					children: "Consumer portfolio"
				}),
				description: "Track contributed capital, ownership units and hypothetical stakes across every business you have rounded up with.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/demo",
						"data-ocid": "portfolio.demo_link",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							"aria-hidden": "true",
							className: "size-4"
						}), "Round Up to Own"]
					})
				})
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
					variant: "stat",
					rows: 4
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
					variant: "card",
					rows: 3
				})]
			}) : portfolioQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				className: "mt-10",
				icon: Wallet,
				title: "We couldn't load your portfolio",
				description: "Something went wrong reaching the network. Try again in a moment.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					className: "rounded-full",
					"data-ocid": "portfolio.retry_button",
					onClick: () => void portfolioQuery.refetch(),
					children: "Retry"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "founding-credits-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "founding-credits-heading",
							className: "font-display text-xl font-semibold tracking-tight",
							children: "Founding Credits"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Recognition score, not money or equity"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoundingCreditsPanel, {})]
				}), !hasHoldings ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Sparkles,
					title: "No holdings yet",
					description: "Your Founding Credits above are already saved. Round up a simulated purchase to your first business and your ownership units will appear here.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/demo",
							"data-ocid": "portfolio.empty_cta",
							children: ["Start with Round Up to Own", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								"aria-hidden": "true",
								className: "size-4"
							})]
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: reduceMotion ? false : {
							opacity: 0,
							y: 12
						},
						animate: reduceMotion ? void 0 : {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							ease: EASE
						},
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Total contributions",
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyValue, {
									cents: portfolio?.totalContributions ?? 0n,
									className: "text-2xl md:text-3xl"
								}),
								hint: "Recorded round-up capital",
								icon: Coins,
								tone: "cyan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Ownership units",
								value: formatNumber(portfolio?.totalOwnershipUnits ?? 0n),
								hint: "Across all businesses",
								icon: Layers,
								tone: "emerald"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Businesses held",
								value: formatNumber(BigInt(positions.length)),
								hint: "Distinct simulated stakes",
								icon: TrendingUp,
								tone: "violet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Purchases",
								value: formatNumber(BigInt(purchases.length)),
								hint: "Simulated transactions",
								icon: Receipt,
								tone: "gold"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyLegend, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "holdings-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "holdings-heading",
								className: "font-display text-xl font-semibold tracking-tight",
								children: "Holdings by business"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Hypothetical stake is simulated"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
							children: sortedPositions.map((position, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldingCard, {
								position,
								business: businessMap.get(position.businessId.toString()),
								index,
								reduceMotion
							}, position.businessId.toString()))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "share-heading",
						className: "rounded-3xl border border-border bg-card/60 p-6 shadow-elevated backdrop-blur sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
									"aria-hidden": "true",
									className: "size-4 text-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "share-heading",
									className: "font-display text-xl font-semibold tracking-tight",
									children: "Share your portfolio"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground",
								children: "Anyone with this link can view a read-only snapshot of your simulated holdings. No personal data is exposed."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-6 md:grid-cols-[1fr_auto] md:items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-w-0",
									children: shareUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareControl, {
										url: shareUrl,
										label: "Copy link"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Preparing your share link…"
									})
								}), shareUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, {
									value: shareUrl,
									fileName: "portfolio-qr",
									caption: "Scan to open this portfolio on another device."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "history-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "history-heading",
								className: "font-display text-xl font-semibold tracking-tight",
								children: "Purchase history"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Revenue and contributions shown separately"
							})]
						}), sortedPurchases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: Receipt,
							title: "No purchases recorded",
							description: "Your simulated transactions will appear here once you round up."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: sortedPurchases.map((purchase, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchaseRow, {
								purchase,
								business: businessMap.get(purchase.businessId.toString()),
								index
							}, purchase.id.toString()))
						})]
					})
				] })]
			})
		]
	});
}
function PublicHoldingCard({ position, index, reduceMotion }) {
	const pct = Number(position.hypotheticalPercentageBps) / 100;
	const barWidth = Math.min(100, Math.max(2, pct));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
		"data-ocid": `public_portfolio.holding.${index + 1}`,
		initial: reduceMotion ? false : {
			opacity: 0,
			y: 16
		},
		whileInView: reduceMotion ? void 0 : {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-40px"
		},
		transition: {
			duration: .5,
			ease: EASE,
			delay: index * .06
		},
		className: "group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:border-primary/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "min-w-0 truncate font-display text-lg font-semibold",
					children: position.businessName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-full border border-chart-3/30 bg-chart-3/10 px-2.5 py-1 font-numeric text-xs font-semibold text-chart-3",
					children: formatBps(position.hypotheticalPercentageBps)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
					children: "Contributed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyValue, {
					cents: position.cumulativeContributions,
					className: "text-base font-semibold"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
					children: "Ownership units"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-numeric text-base font-semibold text-foreground",
					children: formatNumber(position.ownershipUnits)
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-[11px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hypothetical stake" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-numeric",
						children: formatBps(position.hypotheticalPercentageBps)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-full rounded-full bg-gradient-to-r from-primary via-accent to-chart-3",
						initial: reduceMotion ? false : { width: 0 },
						whileInView: reduceMotion ? void 0 : { width: `${barWidth}%` },
						viewport: { once: true },
						transition: {
							duration: .9,
							ease: EASE,
							delay: .15 + index * .06
						},
						style: reduceMotion ? { width: `${barWidth}%` } : void 0
					})
				})]
			})
		]
	});
}
function PublicPortfolioView({ snapshot }) {
	const reduceMotion = useReducedMotion() ?? false;
	const positions = snapshot.positions;
	const sortedPositions = (0, import_react.useMemo)(() => [...positions].sort((a, b) => Number(b.cumulativeContributions - a.cumulativeContributions)), [positions]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "public_portfolio.page",
		className: "mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Shared portfolio",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-spectrum",
					children: "A simulated ownership snapshot"
				}),
				description: "This is a read-only view of someone's round-up portfolio. Every holding, contribution and stake below is a fictional demonstration.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/demo",
						"data-ocid": "public_portfolio.demo_link",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							"aria-hidden": "true",
							className: "size-4"
						}), "Build your own"]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: reduceMotion ? false : {
							opacity: 0,
							y: 12
						},
						animate: reduceMotion ? void 0 : {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							ease: EASE
						},
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Total contributions",
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyValue, {
									cents: snapshot.totalContributions,
									className: "text-2xl md:text-3xl"
								}),
								hint: "Recorded round-up capital",
								icon: Coins,
								tone: "cyan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Ownership units",
								value: formatNumber(snapshot.totalOwnershipUnits),
								hint: "Across all businesses",
								icon: Layers,
								tone: "emerald"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Businesses held",
								value: formatNumber(snapshot.businessCount),
								hint: "Distinct simulated stakes",
								icon: TrendingUp,
								tone: "violet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Last updated",
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl md:text-2xl",
									children: formatDate(snapshot.updatedAt)
								}),
								hint: "Snapshot timestamp",
								icon: Eye,
								tone: "gold"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyLegend, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "public-holdings-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "public-holdings-heading",
								className: "font-display text-xl font-semibold tracking-tight",
								children: "Holdings by business"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Hypothetical stake is simulated"
							})]
						}), sortedPositions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: Sparkles,
							title: "No holdings in this snapshot",
							description: "This portfolio does not have any simulated holdings to show yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
							children: sortedPositions.map((position, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicHoldingCard, {
								position,
								index,
								reduceMotion
							}, position.businessId.toString()))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "public-cta-heading",
						className: "relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 shadow-elevated backdrop-blur sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": "true",
							className: "ambient-orb -right-10 -top-10 size-40 bg-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "public-cta-heading",
									className: "font-display text-xl font-semibold tracking-tight",
									children: "Start your own simulated portfolio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: "Round up a fictional purchase to a business you love and watch your ownership units grow. Sign in only when you want to save and share."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "shrink-0 rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/demo",
									"data-ocid": "public_portfolio.cta_button",
									children: ["Try Round Up to Own", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
										"aria-hidden": "true",
										className: "size-4"
									})]
								})
							})]
						})]
					})
				]
			})
		]
	});
}
function PublicPortfolioNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "public_portfolio.not_found",
		className: "mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-5 px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-6 w-full text-left" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
					"aria-hidden": "true",
					className: "size-7"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold tracking-tight",
					children: "This shared portfolio isn't available"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "The link may be incomplete, mistyped, or no longer points to a portfolio. You can still explore the app or start your own simulated portfolio."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"data-ocid": "public_portfolio.home_button",
						children: "Back to home"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/demo",
						"data-ocid": "public_portfolio.not_found_demo_button",
						children: ["Try Round Up to Own", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							"aria-hidden": "true",
							className: "size-4"
						})]
					})
				})]
			})
		]
	});
}
function PublicPortfolioRoute({ token }) {
	const publicQuery = usePublicPortfolio(token);
	if (publicQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
				variant: "stat",
				rows: 4
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
				variant: "card",
				rows: 3
			})]
		})]
	});
	if (publicQuery.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Share2,
			title: "We couldn't load this shared portfolio",
			description: "Something went wrong reaching the network. Try again in a moment.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				className: "rounded-full",
				"data-ocid": "public_portfolio.retry_button",
				onClick: () => void publicQuery.refetch(),
				children: "Retry"
			})
		})]
	});
	if (!publicQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicPortfolioNotFound, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicPortfolioView, { snapshot: publicQuery.data });
}
function PortfolioPage() {
	const rawSearch = useSearch({ strict: false });
	const shareToken = typeof rawSearch.share === "string" ? rawSearch.share.trim() : "";
	if (shareToken) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicPortfolioRoute, { token: shareToken });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireSignIn, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInPrompt, {}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioDashboard, {})
	});
}
//#endregion
export { PortfolioPage as default };
