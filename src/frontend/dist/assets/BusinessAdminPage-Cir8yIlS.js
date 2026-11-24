import { d as require_react, g as __toESM, n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { c as composeEventHandlers, i as useControllableState, s as createContextScope$1, t as Primitive } from "./dist-D8c95m3S.js";
import { t as ArrowDownRight } from "./arrow-down-right-DxuZqqLY.js";
import { a as CalendarDays, i as Hash, n as FoundingBadge, o as ArrowUpRight, r as CreditHistoryList, t as ReferralPanel } from "./ReferralPanel-o_Oj1ydk.js";
import { t as Award } from "./award-C5x5gwpl.js";
import { t as Building2 } from "./building-2-u1b-6pzy.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { t as Crown } from "./crown-xHDBqp_3.js";
import { c as UserPlus, i as formatMemberNumber, l as Lock, o as rewardTypeLabels, r as formatCredits } from "./credits-FVSdr8gq.js";
import { t as EmptyState } from "./EmptyState-BXNCSIq9.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as Landmark } from "./landmark-CSNsXaEc.js";
import { t as Rocket } from "./rocket-DUIwNvdb.js";
import { t as ShieldAlert } from "./shield-alert-DiHEF7Oo.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Target } from "./target-BKUmH1VC.js";
import { t as Users } from "./users-VFYNqB8l.js";
import { t as Wallet } from "./wallet-BLO_fJX1.js";
import { A as useMyReferralCode, Bt as useInternetIdentity, C as useLedger, Ct as Presence, E as useMyCreditSummary, I as useProposals, It as useDirection, Q as useVoteOnProposal, Rt as RequireSignIn, St as createRovingFocusGroupScope, T as useMyContributionHistory, Y as useRewardAmounts, Z as useStakeholders, _ as useClaimFoundingBusinessRegistration, a as useBusiness, b as useCreateProposal, bt as Item, it as FoundingBadge$1, jt as useId, lt as RewardType, m as useClaimDaoDeployment, mt as useParams, n as useAttributeBusinessReferral, o as useBusinessAdminStats, p as useClaimBusinessNomination, st as ProposalStatus, u as useCapTable, ut as VoteChoice, w as useMyBusinesses, xt as Root$1, zt as SignInButton } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { t as Input } from "./input-BOfnj1A0.js";
import { n as Primitive$1, t as Label } from "./label-BRHHlJK-.js";
import { n as errorMessage, t as describeBackendError } from "./errors-BPsygLkv.js";
import { a as formatDateTime, i as formatDate, n as formatCurrency, r as formatCurrencyCompact, s as formatNumber, t as formatBps } from "./format-9V_VuN1H.js";
import { t as LoadingSkeleton } from "./LoadingSkeleton-D-diqBmI.js";
import { t as StatCard } from "./StatCard-DseHDqGa.js";
import { t as BusinessBadge } from "./BusinessBadge-gzAAfmoA.js";
import { t as Badge } from "./badge-CBjFZzLp.js";
import { t as Textarea } from "./textarea-ChU4ZABm.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileText = createLucideIcon("file-text", [
	["path", {
		d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
		key: "1rqfz7"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Gavel = createLucideIcon("gavel", [
	["path", {
		d: "m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8",
		key: "15492f"
	}],
	["path", {
		d: "m16 16 6-6",
		key: "vzrcl6"
	}],
	["path", {
		d: "m8 8 6-6",
		key: "18bi4p"
	}],
	["path", {
		d: "m9 7 8 8",
		key: "5jnvq1"
	}],
	["path", {
		d: "m21 11-8-8",
		key: "z4y7zo"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ThumbsUp = createLucideIcon("thumbs-up", [["path", {
	d: "M7 10v12",
	key: "1qc93n"
}], ["path", {
	d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
	key: "emmmcr"
}]]);
//#endregion
//#region src/components/credits/BusinessCreditActions.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function toMessage(error) {
	if (typeof error === "object" && error !== null && "__kind__" in error) return describeBackendError(error);
	return errorMessage(error);
}
/**
* Qualifying actions a business owner can complete to earn Founding Credits.
* Claimable rewards refresh the credit figures through the shared query cache;
* the referral reward is earned by attributing the code of the business that
* referred this one.
*/
function BusinessCreditActions() {
	const claimRegistration = useClaimFoundingBusinessRegistration();
	const claimDeployment = useClaimDaoDeployment();
	const claimNomination = useClaimBusinessNomination();
	const attributeReferral = useAttributeBusinessReferral();
	const [referralCode, setReferralCode] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)(null);
	const actions = [
		{
			type: RewardType.foundingBusinessRegistration,
			label: "Claim founding registration",
			description: "Awarded once when your business joins as a founding business.",
			icon: Building2,
			mutation: claimRegistration
		},
		{
			type: RewardType.daoDeployment,
			label: "Claim completed deployment",
			description: "Awarded when your business DAO finishes deploying.",
			icon: Rocket,
			mutation: claimDeployment
		},
		{
			type: RewardType.businessNomination,
			label: "Claim business nomination",
			description: "Awarded for nominating a business to the program.",
			icon: ThumbsUp,
			mutation: claimNomination
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
	function submitReferral(event) {
		event.preventDefault();
		const code = referralCode.trim();
		if (!code) return;
		setNotice(null);
		attributeReferral.mutate(code, {
			onSuccess: () => {
				setReferralCode("");
				setNotice({
					tone: "success",
					message: "Referral attributed. The referring business has been credited."
				});
			},
			onError: (error) => setNotice({
				tone: "error",
				message: toMessage(error)
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-card/60 p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Qualifying actions",
				description: "Complete these actions to earn Founding Credits. Figures refresh after each award."
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", {
				"data-ocid": notice.tone === "error" ? "credits.claim.error_state" : "credits.claim.success_state",
				className: cn("mt-4 block rounded-xl border px-4 py-2.5 text-sm", notice.tone === "error" ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-primary/40 bg-primary/10 text-primary"),
				children: notice.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-5 grid gap-3 sm:grid-cols-2",
				children: [actions.map((action, index) => {
					const Icon = action.icon;
					const pending = action.mutation.isPending;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						"data-ocid": `credits.action.item.${index + 1}`,
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
							"data-ocid": `credits.action.claim_button.${index + 1}`,
							disabled: pending,
							onClick: () => runClaim(action.label, action.mutation),
							className: "mt-auto self-start rounded-full",
							children: pending ? "Recording…" : "Claim"
						})]
					}, action.type);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					"data-ocid": `credits.action.item.${actions.length + 1}`,
					className: "flex flex-col gap-3 rounded-xl border border-border/70 bg-background/40 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {
								"aria-hidden": "true",
								className: "size-4"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: "Business referral"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs leading-relaxed text-muted-foreground",
								children: "Enter the referral code of the business that invited you. The referring business earns the reward once."
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submitReferral,
						className: "mt-auto space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "business-referral-code",
								className: "sr-only",
								children: "Referral code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "business-referral-code",
								value: referralCode,
								onChange: (event) => setReferralCode(event.target.value),
								placeholder: "Referral code",
								autoComplete: "off",
								"data-ocid": "credits.referral.input"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "sm",
								variant: "outline",
								"data-ocid": "credits.referral.submit_button",
								disabled: attributeReferral.isPending || !referralCode.trim(),
								className: "rounded-full",
								children: attributeReferral.isPending ? "Attributing…" : "Attribute"
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/credits/BusinessCreditsPanel.tsx
var businessRewardTypes = [
	RewardType.foundingBusinessRegistration,
	RewardType.daoDeployment,
	RewardType.businessNomination,
	RewardType.businessReferral
];
function rewardAmountFor(amounts, type) {
	switch (type) {
		case RewardType.foundingBusinessRegistration: return amounts.foundingBusinessRegistration;
		case RewardType.daoDeployment: return amounts.daoDeployment;
		case RewardType.businessNomination: return amounts.businessNomination;
		case RewardType.businessReferral: return amounts.businessReferral;
		default: return 0n;
	}
}
/**
* Founding Business recognition panel for the owner workspace. Credits are a
* simulated recognition score, never money, equity, a token or an investment.
*/
function BusinessCreditsPanel() {
	const summaryQuery = useMyCreditSummary();
	const historyQuery = useMyContributionHistory();
	const referralQuery = useMyReferralCode();
	const amountsQuery = useRewardAmounts();
	const isLoading = summaryQuery.isLoading || historyQuery.isLoading || referralQuery.isLoading || amountsQuery.isLoading;
	const isError = summaryQuery.isError || historyQuery.isError || referralQuery.isError || amountsQuery.isError;
	const summary = summaryQuery.data;
	const history = historyQuery.data ?? [];
	const referralCode = referralQuery.data ?? "";
	const amounts = amountsQuery.data;
	const businessHistory = history.filter((entry) => businessRewardTypes.includes(entry.rewardType));
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		"data-ocid": "credits.panel.loading_state",
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
		title: "We could not load your Founding Credits",
		description: "Your recognition score and history could not be retrieved. Check your connection and try again.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "outline",
			"data-ocid": "credits.panel.retry_button",
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
		"data-ocid": "credits.panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "Founding Business recognition",
				className: "rounded-2xl border border-warning/30 bg-gradient-to-br from-warning/10 via-card/60 to-card/60 p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoundingBadge, { kind: summary.badge ?? FoundingBadge$1.business }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
						children: "Recognition score"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground",
					children: "Founding Credits are a simulated recognition score for early supporters. They are not money, equity, a token or an investment, and they are kept separate from your business ledger and cap table."
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
						hint: "Your founding member number",
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
							title: "Business credit activity",
							description: "Awards tied to this business, plus the current reward amounts."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [businessHistory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-xl border border-dashed border-border bg-background/40 px-4 py-6 text-center text-sm text-muted-foreground",
								children: "No business-specific awards yet. Claim your founding registration to begin."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2.5",
								"data-ocid": "credits.business.list",
								children: businessHistory.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									"data-ocid": `credits.business.item.${index + 1}`,
									className: "flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/40 px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: rewardTypeLabels[entry.rewardType]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-xs text-muted-foreground",
											children: [
												entry.subject || entry.memo || "Founding Credits",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"aria-hidden": "true",
													children: " · "
												}),
												formatDate(entry.createdAt)
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "shrink-0 font-numeric text-sm font-semibold text-warning",
										children: ["+", formatCredits(entry.amount)]
									})]
								}, entry.id.toString()))
							}), amounts && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "mt-4 grid grid-cols-2 gap-2 text-sm",
								children: businessRewardTypes.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border/60 bg-background/40 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[11px] uppercase tracking-[0.12em] text-muted-foreground",
										children: rewardTypeLabels[type]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-0.5 font-numeric font-semibold text-foreground",
										children: formatCredits(rewardAmountFor(amounts, type))
									})]
								}, type))
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferralPanel, { referralCode })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessCreditActions, {})
		]
	});
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-context@1.1.3_@types+react@19.1.17_react@19.1.5/node_modules/@radix-ui/react-context/dist/index.mjs
function createContextScope(scopeName, createContextScopeDeps = []) {
	let defaultContexts = [];
	function createContext3(rootComponentName, defaultContext) {
		const BaseContext = import_react.createContext(defaultContext);
		BaseContext.displayName = rootComponentName + "Context";
		const index = defaultContexts.length;
		defaultContexts = [...defaultContexts, defaultContext];
		const Provider = (props) => {
			const { scope, children, ...context } = props;
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const value = import_react.useMemo(() => context, Object.values(context));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
				value,
				children
			});
		};
		Provider.displayName = rootComponentName + "Provider";
		function useContext2(consumerName, scope) {
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const context = import_react.useContext(Context);
			if (context) return context;
			if (defaultContext !== void 0) return defaultContext;
			throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
		}
		return [Provider, useContext2];
	}
	const createScope = () => {
		const scopeContexts = defaultContexts.map((defaultContext) => {
			return import_react.createContext(defaultContext);
		});
		return function useScope(scope) {
			const contexts = scope?.[scopeName] || scopeContexts;
			return import_react.useMemo(() => ({ [`__scope${scopeName}`]: {
				...scope,
				[scopeName]: contexts
			} }), [scope, contexts]);
		};
	};
	createScope.scopeName = scopeName;
	return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
	const baseScope = scopes[0];
	if (scopes.length === 1) return baseScope;
	const createScope = () => {
		const scopeHooks = scopes.map((createScope2) => ({
			useScope: createScope2(),
			scopeName: createScope2.scopeName
		}));
		return function useComposedScopes(overrideScopes) {
			const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
				const currentScope = useScope(overrideScopes)[`__scope${scopeName}`];
				return {
					...nextScopes2,
					...currentScope
				};
			}, {});
			return import_react.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
		};
	};
	createScope.scopeName = baseScope.scopeName;
	return createScope;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-progress@1.1.8_@types+react-dom@19.1.11_@types+react@19.1.17__@types+re_83c1f4913f7483e9396af9c2f3833cc9/node_modules/@radix-ui/react-progress/dist/index.mjs
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext, createProgressScope] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeProgress, value: valueProp = null, max: maxProp, getValueLabel = defaultGetValueLabel, ...progressProps } = props;
	if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
	const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
	if (valueProp !== null && !isValidValueNumber(valueProp, max)) console.error(getInvalidValueError(`${valueProp}`, "Progress"));
	const value = isValidValueNumber(valueProp, max) ? valueProp : null;
	const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressProvider, {
		scope: __scopeProgress,
		value,
		max,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
			"aria-valuemax": max,
			"aria-valuemin": 0,
			"aria-valuenow": isNumber(value) ? value : void 0,
			"aria-valuetext": valueLabel,
			role: "progressbar",
			"data-state": getProgressState(value, max),
			"data-value": value ?? void 0,
			"data-max": max,
			...progressProps,
			ref: forwardedRef
		})
	});
});
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeProgress, ...indicatorProps } = props;
	const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
		"data-state": getProgressState(context.value, context.max),
		"data-value": context.value ?? void 0,
		"data-max": context.max,
		...indicatorProps,
		ref: forwardedRef
	});
});
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
	return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
	return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
	return typeof value === "number";
}
function isValidMaxNumber(max) {
	return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
	return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
	return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
	return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
//#endregion
//#region src/components/ui/progress.tsx
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "progress",
		className: cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			"data-slot": "progress-indicator",
			className: "bg-primary h-full w-full flex-1 transition-all",
			style: { transform: `translateX(-${100 - (value || 0)}%)` }
		})
	});
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-tabs@1.1.13_@types+react-dom@19.1.11_@types+react@19.1.17__@types+react_f21cc4b4766ef55b6ce735b87630a35d/node_modules/@radix-ui/react-tabs/dist/index.mjs
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope$1(TABS_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = "automatic", ...tabsProps } = props;
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		onChange: onValueChange,
		defaultProp: defaultValue ?? "",
		caller: TABS_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsProvider, {
		scope: __scopeTabs,
		baseId: useId(),
		value,
		onValueChange: setValue,
		orientation,
		dir: direction,
		activationMode,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			dir: direction,
			"data-orientation": orientation,
			...tabsProps,
			ref: forwardedRef
		})
	});
});
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, loop = true, ...listProps } = props;
	const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
		asChild: true,
		...rovingFocusGroupScope,
		orientation: context.orientation,
		dir: context.dir,
		loop,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			role: "tablist",
			"aria-orientation": context.orientation,
			...listProps,
			ref: forwardedRef
		})
	});
});
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
	const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: isSelected,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "tab",
			"aria-selected": isSelected,
			"aria-controls": contentId,
			"data-state": isSelected ? "active" : "inactive",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			id: triggerId,
			...triggerProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) context.onValueChange(value);
				else event.preventDefault();
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => {
				const isAutomaticActivation = context.activationMode !== "manual";
				if (!isSelected && !disabled && isAutomaticActivation) context.onValueChange(value);
			})
		})
	});
});
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
	const context = useTabsContext(CONTENT_NAME, __scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	const isMountAnimationPreventedRef = import_react.useRef(isSelected);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isSelected,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": isSelected ? "active" : "inactive",
			"data-orientation": context.orientation,
			role: "tabpanel",
			"aria-labelledby": triggerId,
			hidden: !present,
			id: contentId,
			tabIndex: 0,
			...contentProps,
			ref: forwardedRef,
			style: {
				...props.style,
				animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
			},
			children: present && children
		})
	});
});
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
//#endregion
//#region src/components/ui/tabs.tsx
function Tabs({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "tabs",
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		"data-slot": "tabs-list",
		className: cn("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-slot": "tabs-trigger",
		className: cn("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		"data-slot": "tabs-content",
		className: cn("flex-1 outline-none", className),
		...props
	});
}
//#endregion
//#region src/pages/BusinessAdminPage.tsx
var statusStyles = {
	[ProposalStatus.open]: "border-primary/40 bg-primary/10 text-primary",
	[ProposalStatus.passed]: "border-success/40 bg-success/10 text-success",
	[ProposalStatus.rejected]: "border-destructive/40 bg-destructive/10 text-destructive",
	[ProposalStatus.closed]: "border-border bg-muted/60 text-muted-foreground"
};
var statusLabels = {
	[ProposalStatus.open]: "Open",
	[ProposalStatus.passed]: "Passed",
	[ProposalStatus.rejected]: "Rejected",
	[ProposalStatus.closed]: "Closed"
};
function shortPrincipal(principal) {
	const text = principal.toText();
	return text.length > 12 ? `${text.slice(0, 5)}…${text.slice(-4)}` : text;
}
function BusinessAdminPage() {
	const { businessId } = useParams({ from: "/admin/$businessId" });
	const id = (0, import_react.useMemo)(() => {
		try {
			return BigInt(businessId);
		} catch {
			return;
		}
	}, [businessId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireSignIn, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "Sign in to manage this business",
				"data-ocid": "admin.signin_prompt",
				className: "flex flex-col items-center justify-center gap-5 rounded-3xl border border-border bg-card/60 px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
							"aria-hidden": "true",
							className: "size-6"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-md space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-semibold",
							children: "Sign in to open the admin workspace"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "The ledger, cap table and governance tools are private to the business owner. Sign in with Internet Identity to continue."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, { className: "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60" })
				]
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminWorkspace, {
				id,
				rawId: businessId
			})
		})]
	});
}
function AdminWorkspace({ id, rawId }) {
	const { identity } = useInternetIdentity();
	const principal = identity?.getPrincipal();
	const businessQuery = useBusiness(id);
	const statsQuery = useBusinessAdminStats(id);
	const myBusinessesQuery = useMyBusinesses();
	if (id === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: ShieldAlert,
		title: "That business link is not valid",
		description: "The business id in this address could not be read. Open the workspace from your business list instead."
	});
	if (businessQuery.isLoading || myBusinessesQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
		variant: "stat",
		rows: 4
	});
	const business = businessQuery.data;
	if (!business) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: ShieldAlert,
		title: "Business not found",
		description: `No business matches the id ${rawId}. It may have been removed.`
	});
	const stats = statsQuery.data;
	if (!(!!principal && !principal.isAnonymous() && (myBusinessesQuery.data ?? []).some((owned) => owned.id === id))) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Access denied",
		"data-ocid": "admin.access_denied",
		className: "flex flex-col items-center justify-center gap-5 rounded-3xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
				"aria-hidden": "true",
				className: "size-6"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "You do not have access"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: [
					"Only the owner of ",
					business.name,
					" can open this administration workspace. If you believe this is a mistake, sign in with the account that launched the business."
				]
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {
									"aria-hidden": "true",
									className: "size-3"
								}), "Owner workspace"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessBadge, { isFictional: business.isFictional })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-3xl font-bold tracking-tight md:text-4xl",
							children: business.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground",
							children: [
								business.industry,
								" · ",
								business.city,
								", ",
								business.country,
								" · Launched",
								" ",
								formatDate(business.createdAt)
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-label": "Business figures",
				className: "space-y-4",
				children: stats ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Funding goal",
							value: formatCurrencyCompact(stats.fundraisingTarget),
							hint: `Cap ${formatCurrencyCompact(business.maxFundraisingTarget)}`,
							icon: Target,
							tone: "gold"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Capital raised",
							value: formatCurrencyCompact(stats.capitalRaised),
							hint: `${formatBps(stats.fundraisingProgressBps)} of goal`,
							icon: Landmark,
							tone: "cyan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Ownership pool left",
							value: formatNumber(stats.ownershipPoolRemaining),
							hint: `${formatNumber(stats.ownershipAllocated)} of ${formatNumber(business.consumerOwnershipPool)} allocated`,
							icon: Coins,
							tone: "violet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Round-up rate",
							value: formatBps(business.participation.contributionOptions.roundToNearestDollar ? 100n : 0n),
							hint: "Consumer round-up default",
							icon: Wallet,
							tone: "emerald"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
								children: "Fundraising progress"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-numeric text-sm text-muted-foreground",
								children: [
									formatCurrency(stats.capitalRaised),
									" /",
									" ",
									formatCurrency(stats.fundraisingTarget)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							className: "mt-3 h-2.5",
							value: Math.min(100, Number(stats.fundraisingProgressBps) / 100),
							"aria-label": "Fundraising progress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-3 text-sm sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
									label: "Purchase revenue",
									value: formatCurrency(stats.totalSimulatedSales),
									tone: "text-accent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
									label: "Investment contributions",
									value: formatCurrency(stats.totalContributions),
									tone: "text-primary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
									label: "Participating customers",
									value: formatNumber(stats.participatingCustomers),
									tone: "text-foreground"
								})
							]
						})
					]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ocid": "admin.stats.unavailable",
					className: "rounded-2xl border border-dashed border-border bg-card/40 px-5 py-6 text-sm text-muted-foreground",
					children: "Business figures are unavailable right now. Your Founding Credits recognition below is unaffected."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "ledger",
				className: "gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-ocid": "admin.tabs",
						className: "h-auto w-full flex-wrap justify-start gap-1 bg-muted/60 p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "ledger",
								"data-ocid": "admin.tab.ledger",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									"aria-hidden": "true",
									className: "size-4"
								}), "Ledger"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "cap-table",
								"data-ocid": "admin.tab.cap_table",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, {
									"aria-hidden": "true",
									className: "size-4"
								}), "Cap table"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "stakeholders",
								"data-ocid": "admin.tab.stakeholders",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									"aria-hidden": "true",
									className: "size-4"
								}), "Stakeholders"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "proposals",
								"data-ocid": "admin.tab.proposals",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, {
									"aria-hidden": "true",
									className: "size-4"
								}), "Proposals"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "credits",
								"data-ocid": "admin.tab.credits",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
									"aria-hidden": "true",
									className: "size-4"
								}), "Founding Credits"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "ledger",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerPanel, { businessId: id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "cap-table",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapTablePanel, { businessId: id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "stakeholders",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StakeholdersPanel, { businessId: id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "proposals",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProposalsPanel, { businessId: id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "credits",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessCreditsPanel, {})
					})
				]
			})
		]
	});
}
function Figure({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border/70 bg-background/40 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-1 font-numeric text-lg font-semibold", tone),
			children: value
		})]
	});
}
function PanelShell({ title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-card/60 p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			title,
			description
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children
		})]
	});
}
function LedgerPanel({ businessId }) {
	const { data, isLoading } = useLedger(businessId);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
		variant: "list",
		rows: 4
	});
	if (!data || data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: FileText,
		title: "No ownership changes yet",
		description: "Every round-up that converts into ownership units will appear here as an immutable ledger entry."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelShell, {
		title: "Ownership ledger",
		description: "An append-only record of every ownership change, newest first.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] border-collapse text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 font-semibold",
							children: "Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 font-semibold",
							children: "Stakeholder"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 font-semibold",
							children: "Reason"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 text-right font-semibold",
							children: "Units"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 text-right font-semibold",
							children: "Contribution"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((entry, index) => {
					const positive = entry.unitsDelta >= 0n;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						"data-ocid": `admin.ledger.row.${index + 1}`,
						className: "border-b border-border/60 last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4 text-muted-foreground",
								children: formatDateTime(entry.createdAt)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4 font-mono text-xs",
								children: shortPrincipal(entry.principal)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4",
								children: entry.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("py-3 pr-4 text-right font-numeric font-semibold", positive ? "text-primary" : "text-destructive"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										positive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
											"aria-hidden": "true",
											className: "size-3.5"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
											"aria-hidden": "true",
											className: "size-3.5"
										}),
										positive ? "+" : "",
										formatNumber(entry.unitsDelta)
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right font-numeric text-accent",
								children: formatCurrency(entry.contributionAmount)
							})
						]
					}, entry.id.toString());
				}) })]
			})
		})
	});
}
function CapTablePanel({ businessId }) {
	const { data, isLoading } = useCapTable(businessId);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
		variant: "list",
		rows: 4
	});
	if (!data || data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Coins,
		title: "The cap table is empty",
		description: "As customers round up and earn ownership units, their positions will be listed here with hypothetical percentages."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelShell, {
		title: "Cap table",
		description: "Each stakeholder's ownership units and hypothetical percentage of the total supply.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] border-collapse text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 font-semibold",
							children: "Stakeholder"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 text-right font-semibold",
							children: "Units"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 text-right font-semibold",
							children: "Hypothetical %"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 text-right font-semibold",
							children: "Contributions"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					"data-ocid": `admin.cap_table.row.${index + 1}`,
					className: "border-b border-border/60 last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-3 pr-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: row.displayName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 font-mono text-xs text-muted-foreground",
								children: shortPrincipal(row.principal)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4 text-right font-numeric",
							children: formatNumber(row.ownershipUnits)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4 text-right font-numeric font-semibold text-chart-3",
							children: formatBps(row.percentageBps)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 text-right font-numeric text-accent",
							children: formatCurrency(row.cumulativeContributions)
						})
					]
				}, row.principal.toText())) })]
			})
		})
	});
}
function StakeholdersPanel({ businessId }) {
	const { data, isLoading } = useStakeholders(businessId);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
		variant: "list",
		rows: 4
	});
	if (!data || data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Users,
		title: "No stakeholders yet",
		description: "Customers who earn ownership units through round-ups will be listed here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelShell, {
		title: "Stakeholders",
		description: "Everyone who holds ownership units in this business.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: data.map((person, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				"data-ocid": `admin.stakeholder.item.${index + 1}`,
				className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/40 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-medium",
						children: person.displayName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-muted-foreground",
						children: [
							shortPrincipal(person.principal),
							" · joined",
							" ",
							formatDate(person.joinedAt)
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-5 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-numeric text-sm font-semibold",
						children: formatNumber(person.ownershipUnits)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.12em] text-muted-foreground",
						children: "Units"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-numeric text-sm font-semibold text-accent",
						children: formatCurrency(person.cumulativeContributions)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.12em] text-muted-foreground",
						children: "Contributed"
					})] })]
				})]
			}, person.id.toString()))
		})
	});
}
function ProposalsPanel({ businessId }) {
	const { data, isLoading } = useProposals(businessId);
	const createProposal = useCreateProposal();
	const vote = useVoteOnProposal();
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [closesAt, setClosesAt] = (0, import_react.useState)("");
	const [formError, setFormError] = (0, import_react.useState)(null);
	const canSubmit = title.trim().length > 0 && body.trim().length > 0 && closesAt.length > 0;
	function handleSubmit(event) {
		event.preventDefault();
		if (!canSubmit) return;
		const closing = new Date(closesAt);
		if (Number.isNaN(closing.getTime())) {
			setFormError("Choose a valid closing date and time.");
			return;
		}
		setFormError(null);
		const capturedTitle = title;
		const capturedBody = body;
		const capturedCloses = closesAt;
		setTitle("");
		setBody("");
		setClosesAt("");
		createProposal.mutate({
			businessId,
			title: capturedTitle.trim(),
			body: capturedBody.trim(),
			closesAt: BigInt(closing.getTime()) * 1000000n
		}, { onError: (error) => {
			setFormError(typeof error === "object" && error !== null && "__kind__" in error ? describeBackendError(error) : errorMessage(error));
			setTitle((current) => current === "" ? capturedTitle : current);
			setBody((current) => current === "" ? capturedBody : current);
			setClosesAt((current) => current === "" ? capturedCloses : current);
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelShell, {
			title: "Proposals",
			description: "Open governance questions for this business. Vote on any proposal that is still open.",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
				variant: "list",
				rows: 3
			}) : !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Gavel,
				title: "No proposals yet",
				description: "Create the first proposal to put a decision to your stakeholders."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: data.map((proposal, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProposalCard, {
					proposal,
					index,
					onVote: (choice) => vote.mutate({
						proposalId: proposal.id,
						choice
					}),
					voting: vote.isPending
				}, proposal.id.toString()))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "h-fit rounded-2xl border border-border bg-card/60 p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold",
					children: "New proposal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Give stakeholders a clear question and a closing time."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-5 space-y-4",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "proposal-title",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "proposal-title",
								"data-ocid": "admin.proposal.title_input",
								value: title,
								onChange: (event) => setTitle(event.target.value),
								placeholder: "Approve the Q3 round-up rate",
								maxLength: 120
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "proposal-body",
								children: "Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "proposal-body",
								"data-ocid": "admin.proposal.body_input",
								value: body,
								onChange: (event) => setBody(event.target.value),
								placeholder: "Explain the decision and what a yes vote means.",
								rows: 4
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "proposal-closes",
								children: "Closes at"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "proposal-closes",
								"data-ocid": "admin.proposal.closes_input",
								type: "datetime-local",
								value: closesAt,
								onChange: (event) => setClosesAt(event.target.value)
							})]
						}),
						formError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							"data-ocid": "admin.proposal.error_state",
							className: "text-sm text-destructive",
							children: formError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							"data-ocid": "admin.proposal.submit_button",
							disabled: !canSubmit || createProposal.isPending,
							className: "w-full rounded-full",
							children: createProposal.isPending ? "Creating…" : "Create proposal"
						})
					]
				})
			]
		})]
	});
}
function ProposalCard({ proposal, index, onVote, voting }) {
	const totalVotes = proposal.yesVotes + proposal.noVotes + proposal.abstainVotes;
	const isOpen = proposal.status === ProposalStatus.open;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-ocid": `admin.proposal.item.${index + 1}`,
		className: "rounded-xl border border-border/70 bg-background/40 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-display text-base font-semibold",
					children: proposal.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: cn("border", statusStyles[proposal.status]),
					children: statusLabels[proposal.status]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground",
				children: proposal.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: [
					"Closes ",
					formatDateTime(proposal.closesAt),
					" · ",
					formatNumber(totalVotes),
					" ",
					"votes"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-3 gap-2 text-center text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteTally, {
						label: "Yes",
						value: proposal.yesVotes,
						tone: "text-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteTally, {
						label: "No",
						value: proposal.noVotes,
						tone: "text-destructive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteTally, {
						label: "Abstain",
						value: proposal.abstainVotes,
						tone: "text-muted-foreground"
					})
				]
			}),
			isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						"data-ocid": `admin.proposal.vote_yes.${index + 1}`,
						disabled: voting,
						onClick: () => onVote(VoteChoice.yes),
						className: "rounded-full",
						children: "Vote yes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						"data-ocid": `admin.proposal.vote_no.${index + 1}`,
						disabled: voting,
						onClick: () => onVote(VoteChoice.no),
						className: "rounded-full",
						children: "Vote no"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						"data-ocid": `admin.proposal.vote_abstain.${index + 1}`,
						disabled: voting,
						onClick: () => onVote(VoteChoice.abstain),
						className: "rounded-full",
						children: "Abstain"
					})
				]
			})
		]
	});
}
function VoteTally({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border/60 bg-card/50 px-2 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("font-numeric text-sm font-semibold", tone),
			children: formatNumber(value)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-[0.12em] text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { BusinessAdminPage as default };
