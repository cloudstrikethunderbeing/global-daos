import { d as require_react, g as __toESM, n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowDownRight } from "./arrow-down-right-DxuZqqLY.js";
import { t as CircleCheck } from "./circle-check-B7_YBaMt.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { a as rewardTypeHints, c as UserPlus, l as Lock, o as rewardTypeLabels, r as formatCredits, s as rewardTypeOrder, u as Gift } from "./credits-FVSdr8gq.js";
import { t as EmptyState } from "./EmptyState-BXNCSIq9.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as Rocket } from "./rocket-DUIwNvdb.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Store } from "./store-Ct32Fft3.js";
import { t as Users } from "./users-VFYNqB8l.js";
import { Rt as RequireSignIn, S as useIsCallerAdmin, X as useSetRewardAmounts, Y as useRewardAmounts, gt as ShieldCheck, lt as RewardType, x as useFounderAnalytics, zt as SignInButton } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { t as Input } from "./input-BOfnj1A0.js";
import { t as Label } from "./label-BRHHlJK-.js";
import { n as errorMessage, t as describeBackendError } from "./errors-BPsygLkv.js";
import { s as formatNumber, t as formatBps } from "./format-9V_VuN1H.js";
import { t as LoadingSkeleton } from "./LoadingSkeleton-D-diqBmI.js";
import { t as StatCard } from "./StatCard-DseHDqGa.js";
import { t as motion } from "./proxy-3lbWeVuX.js";
import { t as useReducedMotion } from "./use-reduced-motion-DjRxHvHP.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChartColumn = createLucideIcon("chart-column", [
	["path", {
		d: "M3 3v16a2 2 0 0 0 2 2h16",
		key: "c24i48"
	}],
	["path", {
		d: "M18 17V9",
		key: "2bz60n"
	}],
	["path", {
		d: "M13 17V5",
		key: "1frdt8"
	}],
	["path", {
		d: "M8 17v-3",
		key: "17ska0"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MousePointerClick = createLucideIcon("mouse-pointer-click", [
	["path", {
		d: "M14 4.1 12 6",
		key: "ita8i4"
	}],
	["path", {
		d: "m5.1 8-2.9-.8",
		key: "1go3kf"
	}],
	["path", {
		d: "m6 12-1.9 2",
		key: "mnht97"
	}],
	["path", {
		d: "M7.2 2.2 8 5.1",
		key: "1cfko1"
	}],
	["path", {
		d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
		key: "s0h3yz"
	}]
]);
//#endregion
//#region src/pages/FounderAnalyticsPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function buildStages(a) {
	return [
		{
			key: "visits",
			label: "Visits",
			value: a.uniqueVisitors,
			icon: Users,
			fill: "bg-gradient-to-r from-primary/80 to-primary",
			tone: "text-primary"
		},
		{
			key: "demo",
			label: "Demo purchases",
			value: a.demoPurchasesCompleted,
			icon: MousePointerClick,
			fill: "bg-gradient-to-r from-accent/80 to-accent",
			tone: "text-accent"
		},
		{
			key: "consumer",
			label: "Consumer registrations",
			value: a.consumerRegistrations,
			icon: UserPlus,
			fill: "bg-gradient-to-r from-chart-3/80 to-chart-3",
			tone: "text-chart-3"
		},
		{
			key: "business",
			label: "Business registrations",
			value: a.businessRegistrations,
			icon: Store,
			fill: "bg-gradient-to-r from-warning/80 to-warning",
			tone: "text-warning"
		},
		{
			key: "dao",
			label: "DAO deployments",
			value: a.daoDeployments,
			icon: Rocket,
			fill: "bg-gradient-to-r from-primary/70 to-accent/80",
			tone: "text-primary"
		}
	];
}
/** Conversion between consecutive stages, computed from the real counts. */
function conversionBps(from, to) {
	if (from <= 0n) return 0n;
	return to * 10000n / from;
}
function FunnelChart({ stages }) {
	const reduce = useReducedMotion();
	const max = stages.reduce((m, s) => s.value > m ? s.value : m, stages[0]?.value ?? 0n);
	const maxNum = max > 0n ? Number(max) : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "analytics.funnel.chart",
		className: "space-y-1",
		children: stages.map((stage, index) => {
			const pct = Math.max(stage.value > 0n ? 4 : 0, Number(stage.value) / maxNum * 100);
			const prev = index > 0 ? stages[index - 1] : void 0;
			const stepBps = prev ? conversionBps(prev.value, stage.value) : null;
			const Icon = stage.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [prev && stepBps !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 py-1.5 pl-1 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
						"aria-hidden": "true",
						className: "size-3.5 text-muted-foreground/70"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-numeric font-semibold text-foreground",
						children: formatBps(stepBps)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"of ",
						prev.label.toLowerCase(),
						" continue to",
						" ",
						stage.label.toLowerCase()
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ocid": `analytics.funnel.stage.${index + 1}`,
				className: "rounded-xl border border-border bg-card/60 p-3.5 transition-smooth hover:border-primary/40 sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/70", stage.tone),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								"aria-hidden": "true",
								className: "size-4"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-sm font-medium",
							children: stage.label
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-numeric shrink-0 text-lg font-semibold tabular-nums",
						children: formatNumber(stage.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: cn("h-full rounded-full", stage.fill),
						initial: reduce ? false : { width: 0 },
						animate: { width: `${pct}%` },
						transition: {
							duration: .7,
							delay: reduce ? 0 : index * .08,
							ease: [
								.16,
								1,
								.3,
								1
							]
						}
					})
				})]
			})] }, stage.key);
		})
	});
}
function ConversionChart({ stages }) {
	const reduce = useReducedMotion();
	const rows = stages.slice(1).map((stage, i) => {
		const prev = stages[i];
		return {
			key: `${prev.key}-${stage.key}`,
			label: `${prev.label} → ${stage.label}`,
			bps: conversionBps(prev.value, stage.value)
		};
	});
	const maxBps = rows.reduce((m, r) => r.bps > m ? r.bps : m, 1n);
	const maxNum = Number(maxBps) || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "analytics.conversion.chart",
		className: "space-y-4",
		children: rows.map((row, index) => {
			const pct = Math.max(row.bps > 0n ? 3 : 0, Number(row.bps) / maxNum * 100);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ocid": `analytics.conversion.row.${index + 1}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate text-xs text-muted-foreground",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-numeric shrink-0 text-sm font-semibold tabular-nums",
						children: formatBps(row.bps)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 w-full overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-full rounded-full bg-gradient-to-r from-accent/70 via-chart-3/80 to-primary",
						initial: reduce ? false : { width: 0 },
						animate: { width: `${pct}%` },
						transition: {
							duration: .7,
							delay: reduce ? 0 : index * .08,
							ease: [
								.16,
								1,
								.3,
								1
							]
						}
					})
				})]
			}, row.key);
		})
	});
}
/** Bar fills cycled across the reward-type breakdown. */
var breakdownFills = [
	"bg-gradient-to-r from-primary/80 to-primary",
	"bg-gradient-to-r from-accent/80 to-accent",
	"bg-gradient-to-r from-chart-3/80 to-chart-3",
	"bg-gradient-to-r from-warning/80 to-warning"
];
function CreditsBreakdown({ analytics }) {
	const reduce = useReducedMotion();
	const byKey = new Map(analytics.creditsByRewardType);
	const rows = rewardTypeOrder.map((type) => ({
		type,
		label: rewardTypeLabels[type],
		amount: byKey.get(type) ?? 0n
	})).filter((row) => row.amount > 0n);
	const max = rows.reduce((m, r) => r.amount > m ? r.amount : m, 0n);
	const maxNum = max > 0n ? Number(max) : 1;
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "analytics.credits.empty_state",
		className: "flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-4 py-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
				"aria-hidden": "true",
				className: "size-6 text-muted-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "No credits awarded yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-xs text-muted-foreground",
				children: "Reward distributions appear here as founding members earn simulated Founding Credits."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "analytics.credits.chart",
		className: "space-y-4",
		children: rows.map((row, index) => {
			const pct = Math.max(row.amount > 0n ? 3 : 0, Number(row.amount) / maxNum * 100);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ocid": `analytics.credits.row.${index + 1}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate text-xs text-muted-foreground",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-numeric shrink-0 text-sm font-semibold tabular-nums",
						children: formatCredits(row.amount)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 w-full overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: cn("h-full rounded-full", breakdownFills[index % breakdownFills.length]),
						initial: reduce ? false : { width: 0 },
						animate: { width: `${pct}%` },
						transition: {
							duration: .7,
							delay: reduce ? 0 : index * .06,
							ease: [
								.16,
								1,
								.3,
								1
							]
						}
					})
				})]
			}, row.type);
		})
	});
}
function CreditsAndReferrals({ analytics }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Credits awarded",
					value: formatCredits(analytics.totalCreditsAwarded),
					hint: "Simulated Founding Credits, all time",
					icon: Coins,
					tone: "gold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Founding members",
					value: formatNumber(analytics.foundingMemberCount),
					hint: "Recognised supporters",
					icon: Sparkles,
					tone: "violet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Referrals attributed",
					value: formatNumber(analytics.referralsAttributed),
					hint: "Sign-ups linked to a referral code",
					icon: UserPlus,
					tone: "cyan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Referrals converted",
					value: formatNumber(analytics.referralsConverted),
					hint: `${formatCredits(analytics.creditsPaidForReferrals)} credits paid`,
					icon: CircleCheck,
					tone: "emerald"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"aria-labelledby": "credits-breakdown-heading",
			className: "rounded-2xl border border-border bg-card/50 p-5 shadow-elevated backdrop-blur sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, {
					"aria-hidden": "true",
					className: "size-4 text-warning"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "credits-breakdown-heading",
					className: "font-display text-base font-semibold",
					children: "Credits by reward type"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsBreakdown, { analytics })]
		})]
	});
}
function toDraft(amounts) {
	return {
		[RewardType.firstSimulatedPurchase]: amounts.firstSimulatedPurchase.toString(),
		[RewardType.valuableFeedback]: amounts.valuableFeedback.toString(),
		[RewardType.daoDeployment]: amounts.daoDeployment.toString(),
		[RewardType.consumerReferral]: amounts.consumerReferral.toString(),
		[RewardType.earlyConsumerRegistration]: amounts.earlyConsumerRegistration.toString(),
		[RewardType.foundingBusinessRegistration]: amounts.foundingBusinessRegistration.toString(),
		[RewardType.businessReferral]: amounts.businessReferral.toString(),
		[RewardType.businessNomination]: amounts.businessNomination.toString()
	};
}
function RewardAmountEditor() {
	const { data: amounts, isLoading } = useRewardAmounts();
	const setAmounts = useSetRewardAmounts();
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
		variant: "list",
		rows: 4
	});
	if (!amounts) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Gift,
		title: "Reward amounts are unavailable",
		description: "We could not load the current reward amounts. Refresh the page to try again."
	});
	const current = draft ?? toDraft(amounts);
	const invalid = rewardTypeOrder.some((type) => {
		const raw = current[type].trim();
		return raw === "" || !/^\d+$/.test(raw);
	});
	const update = (type, value) => {
		setDraft({
			...current,
			[type]: value
		});
		setSaved(null);
		setError(null);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (invalid) return;
		const next = {
			firstSimulatedPurchase: BigInt(current[RewardType.firstSimulatedPurchase]),
			valuableFeedback: BigInt(current[RewardType.valuableFeedback]),
			daoDeployment: BigInt(current[RewardType.daoDeployment]),
			consumerReferral: BigInt(current[RewardType.consumerReferral]),
			earlyConsumerRegistration: BigInt(current[RewardType.earlyConsumerRegistration]),
			foundingBusinessRegistration: BigInt(current[RewardType.foundingBusinessRegistration]),
			businessReferral: BigInt(current[RewardType.businessReferral]),
			businessNomination: BigInt(current[RewardType.businessNomination])
		};
		setError(null);
		setAmounts.mutate(next, {
			onSuccess: (result) => {
				setSaved(result);
				setDraft(toDraft(result));
			},
			onError: (err) => {
				setError(err && typeof err === "object" && "__kind__" in err ? describeBackendError(err) : errorMessage(err));
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		"data-ocid": "analytics.rewards.form",
		onSubmit: handleSubmit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: rewardTypeOrder.map((type) => {
					const inputId = `reward-${type}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: inputId,
								className: "text-sm font-medium",
								children: rewardTypeLabels[type]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: inputId,
								"data-ocid": `analytics.rewards.input.${type}`,
								inputMode: "numeric",
								pattern: "[0-9]*",
								value: current[type],
								onChange: (event) => update(type, event.target.value),
								"aria-describedby": `${inputId}-hint`,
								className: "font-numeric"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								id: `${inputId}-hint`,
								className: "text-xs text-muted-foreground",
								children: [
									rewardTypeHints[type],
									" · currently",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-numeric font-semibold text-foreground",
										children: formatCredits(amounts[type])
									}),
									" ",
									"credits"
								]
							})
						]
					}, type);
				})
			}),
			invalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "analytics.rewards.error_state",
				className: "text-sm text-destructive",
				children: "Enter a whole number of credits for every reward type."
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "analytics.rewards.error_state",
				className: "text-sm text-destructive",
				children: error
			}),
			saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-ocid": "analytics.rewards.success_state",
				className: "flex items-center gap-2 text-sm text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					"aria-hidden": "true",
					className: "size-4"
				}), "Reward amounts saved. New claims use these values."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					"data-ocid": "analytics.rewards.save_button",
					disabled: invalid || setAmounts.isPending,
					className: "rounded-full",
					children: setAmounts.isPending ? "Saving…" : "Save reward amounts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Changes apply to future credit claims only."
				})]
			})
		]
	});
}
function AccessDenied() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Lock,
			title: "Founder analytics are private",
			description: "This dashboard is restricted to the platform administrator. If you believe you should have access, sign in with the administrator's Internet Identity.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, { className: "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-smooth hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" })
		})
	});
}
function AnalyticsDashboard() {
	const { data, isLoading, isError } = useFounderAnalytics();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
			variant: "stat",
			rows: 4
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
			variant: "list",
			rows: 5
		})]
	});
	if (isError || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: ChartColumn,
		title: "Analytics are unavailable",
		description: "We could not load the funnel right now. Refresh the page to try again."
	});
	const stages = buildStages(data);
	const overallBps = conversionBps(data.uniqueVisitors, data.daoDeployments);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Unique visitors",
						value: formatNumber(data.uniqueVisitors),
						hint: `${formatNumber(data.returningUsers)} returning`,
						icon: Users,
						tone: "emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Consumer registrations",
						value: formatNumber(data.consumerRegistrations),
						hint: "Real early-access sign-ups",
						icon: UserPlus,
						tone: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Business registrations",
						value: formatNumber(data.businessRegistrations),
						hint: `${formatNumber(data.businessNominations)} nominations`,
						icon: Store,
						tone: "gold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Visit → DAO conversion",
						value: formatBps(overallBps),
						hint: "End-to-end funnel rate",
						icon: Rocket,
						tone: "violet"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "funnel-heading",
					className: "rounded-2xl border border-border bg-card/50 p-5 shadow-elevated backdrop-blur sm:p-6 lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {
							"aria-hidden": "true",
							className: "size-4 text-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "funnel-heading",
							className: "font-display text-base font-semibold",
							children: "Funnel stages"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelChart, { stages })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "conversion-heading",
					className: "rounded-2xl border border-border bg-card/50 p-5 shadow-elevated backdrop-blur sm:p-6 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
							"aria-hidden": "true",
							className: "size-4 text-accent"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "conversion-heading",
							className: "font-display text-base font-semibold",
							children: "Conversion between stages"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversionChart, { stages })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsAndReferrals, { analytics: data }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "reward-amounts-heading",
				className: "rounded-2xl border border-border bg-card/50 p-5 shadow-elevated backdrop-blur sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
							"aria-hidden": "true",
							className: "size-4 text-chart-3"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "reward-amounts-heading",
							className: "font-display text-base font-semibold",
							children: "Reward amounts"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-5 max-w-2xl text-sm text-muted-foreground",
						children: "Set how many simulated Founding Credits each reward type grants. Credits are recognition markers only — never money, equity, a token or an investment."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardAmountEditor, {})
				]
			})
		]
	});
}
function AdminGate() {
	const { data: isAdmin, isLoading } = useIsCallerAdmin();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
			variant: "stat",
			rows: 4
		})
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessDenied, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8 flex flex-wrap items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
						"aria-hidden": "true",
						className: "size-3.5"
					}), "Administrator"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Founder analytics",
				title: "Conversion funnel",
				description: "Real registration and engagement counts across the ownership economy, with the conversion rate between each stage.",
				className: "mb-8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsDashboard, {})
		]
	});
}
function FounderAnalyticsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireSignIn, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Lock,
				title: "Sign in to view founder analytics",
				description: "This private dashboard tracks real registrations, demo engagement and conversion rates. Sign in with the administrator's Internet Identity to continue.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, { className: "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-smooth hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" })
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminGate, {})
	});
}
//#endregion
export { FounderAnalyticsPage as default };
