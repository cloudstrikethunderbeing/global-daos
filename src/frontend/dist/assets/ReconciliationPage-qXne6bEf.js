import { d as require_react, g as __toESM, n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowLeft } from "./arrow-left-TP66jKGS.js";
import { a as CardHeader, c as CircleX, n as CardContent, o as CardTitle, r as CardDescription, s as RotateCcw, t as Card } from "./card-DnbNoKMA.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { t as CreditCard } from "./credit-card-BNjgXvwn.js";
import { t as EmptyState } from "./EmptyState-BXNCSIq9.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as Landmark } from "./landmark-CSNsXaEc.js";
import { t as Receipt } from "./receipt-KeRjBnFV.js";
import { t as ShieldAlert } from "./shield-alert-DiHEF7Oo.js";
import { t as Wallet } from "./wallet-BLO_fJX1.js";
import { F as usePaymentProviders, G as useRefundTransaction, R as useReconciliation, Rt as RequireSignIn, a as useBusiness, ct as ProviderKind, dt as Link, l as useCancelTransaction, mt as useParams, o as useBusinessAdminStats, ot as PaymentStatus } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { n as errorMessage, t as describeBackendError } from "./errors-BPsygLkv.js";
import { a as formatDateTime, n as formatCurrency } from "./format-9V_VuN1H.js";
import { t as LoadingSkeleton } from "./LoadingSkeleton-D-diqBmI.js";
import { t as StatCard } from "./StatCard-DseHDqGa.js";
import { t as Badge } from "./badge-CBjFZzLp.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Scale = createLucideIcon("scale", [
	["path", {
		d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
		key: "7g6ntu"
	}],
	["path", {
		d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
		key: "ijws7r"
	}],
	["path", {
		d: "M7 21h10",
		key: "1b0cd5"
	}],
	["path", {
		d: "M12 3v18",
		key: "108xh3"
	}],
	["path", {
		d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",
		key: "3gwbw2"
	}]
]);
//#endregion
//#region src/components/commerce/ReconciliationTable.tsx
var import_jsx_runtime = require_jsx_runtime();
var statusStyles = {
	[PaymentStatus.paid]: "border-success/40 bg-success/10 text-success",
	[PaymentStatus.pending]: "border-warning/40 bg-warning/10 text-warning",
	[PaymentStatus.refunded]: "border-accent/40 bg-accent/10 text-accent",
	[PaymentStatus.cancelled]: "border-border bg-muted/60 text-muted-foreground"
};
var statusLabels = {
	[PaymentStatus.paid]: "Paid",
	[PaymentStatus.pending]: "Pending",
	[PaymentStatus.refunded]: "Refunded",
	[PaymentStatus.cancelled]: "Cancelled"
};
function ReconciliationTable({ rows, pendingId, onRefund, onCancel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			"data-ocid": "reconciliation.table",
			className: "w-full min-w-[52rem] border-collapse text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "py-2.5 pr-3 font-semibold",
						children: "Date"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "py-2.5 pr-3 font-semibold",
						children: "Transaction"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "py-2.5 pr-3 font-semibold",
						children: "Status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "py-2.5 pr-3 text-right font-semibold",
						children: "Revenue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "py-2.5 pr-3 text-right font-semibold",
						children: "Contribution"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "py-2.5 pr-3 text-right font-semibold",
						children: "Platform fee"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "py-2.5 pr-3 text-right font-semibold",
						children: "Total"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "py-2.5 text-right font-semibold",
						children: "Actions"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, index) => {
				const isPaid = row.status === PaymentStatus.paid;
				const isPending = pendingId === row.transactionId;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					"data-ocid": `reconciliation.row.${index + 1}`,
					className: "border-b border-border/60 transition-colors last:border-0 hover:bg-muted/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap py-3 pr-3 text-muted-foreground",
							children: formatDateTime(row.timestamp)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "whitespace-nowrap py-3 pr-3 font-mono text-xs font-medium tabular-nums",
							children: ["#", row.transactionId.toString()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: cn("rounded-full", statusStyles[row.status]),
								children: statusLabels[row.status]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap py-3 pr-3 text-right font-numeric tabular-nums",
							children: formatCurrency(row.revenue)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap py-3 pr-3 text-right font-numeric tabular-nums text-muted-foreground",
							children: formatCurrency(row.contribution)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap py-3 pr-3 text-right font-numeric tabular-nums text-muted-foreground",
							children: formatCurrency(row.platformFee)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap py-3 pr-3 text-right font-numeric font-semibold tabular-nums",
							children: formatCurrency(row.total)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-end gap-1.5",
								children: isPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									className: "rounded-full",
									disabled: isPending,
									onClick: () => onRefund(row.transactionId),
									"data-ocid": `reconciliation.refund_button.${index + 1}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										"aria-hidden": "true",
										className: "size-3.5"
									}), "Refund"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									className: "rounded-full text-muted-foreground hover:text-destructive",
									disabled: isPending,
									onClick: () => onCancel(row.transactionId),
									"data-ocid": `reconciliation.cancel_button.${index + 1}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
										"aria-hidden": "true",
										className: "size-3.5"
									}), "Cancel"]
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "No actions"
								})
							})
						})
					]
				}, row.transactionId.toString());
			}) })]
		})
	});
}
//#endregion
//#region src/pages/ReconciliationPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var providerKindLabels = {
	[ProviderKind.simulated]: "Simulated provider",
	[ProviderKind.conventional]: "Conventional provider",
	[ProviderKind.blockchain]: "Blockchain provider"
};
function ProviderPanel() {
	const { data: providers, isLoading } = usePaymentProviders();
	const active = (providers ?? []).find((provider) => provider.active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-primary/25 bg-primary/5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "flex-row items-start gap-3 space-y-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
					"aria-hidden": "true",
					className: "size-5"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display text-base",
					children: "Active payment provider"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: isLoading ? "Checking the configured provider…" : active ? `${active.displayName} · ${providerKindLabels[active.kind]}` : "No provider is configured for this deployment." })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed text-muted-foreground",
			children: "Every transaction in this workspace is simulated. No real payment is taken, no card is charged and no funds move — the provider only labels how a simulated checkout would be routed."
		}) })]
	});
}
function ReconciliationContent({ businessId }) {
	const businessQuery = useBusiness(businessId);
	const statsQuery = useBusinessAdminStats(businessId);
	const reconciliationQuery = useReconciliation(businessId);
	const refund = useRefundTransaction();
	const cancel = useCancelTransaction();
	const [pendingId, setPendingId] = (0, import_react.useState)(null);
	const [actionError, setActionError] = (0, import_react.useState)(null);
	const rows = reconciliationQuery.data ?? [];
	const totals = (0, import_react.useMemo)(() => rows.reduce((acc, row) => ({
		total: acc.total + row.total,
		revenue: acc.revenue + row.revenue,
		platformFee: acc.platformFee + row.platformFee,
		contribution: acc.contribution + row.contribution
	}), {
		total: 0n,
		revenue: 0n,
		platformFee: 0n,
		contribution: 0n
	}), [rows]);
	const business = businessQuery.data;
	if (businessQuery.isLoading || statsQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
		variant: "stat",
		rows: 4
	});
	if (businessQuery.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: ShieldAlert,
		title: "We could not load this business",
		description: "The reconciliation view could not reach the backend. Check your connection and try again.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			className: "rounded-full",
			onClick: () => void businessQuery.refetch(),
			"data-ocid": "reconciliation.retry_button",
			children: "Try again"
		})
	});
	if (!business) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: ShieldAlert,
		title: "Business not found",
		description: "No business matches this link. It may have been removed.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "rounded-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/portfolio",
				children: "Go to your portfolio"
			})
		})
	});
	if (!(statsQuery.data !== null && statsQuery.data !== void 0)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Access denied",
		"data-ocid": "reconciliation.access_denied",
		className: "flex flex-col items-center justify-center gap-5 rounded-3xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
					"aria-hidden": "true",
					className: "size-6"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "This business is not yours"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: [
						"Only the owner of ",
						business.name,
						" can open its reconciliation view. Sign in with the account that launched this business to continue."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				className: "rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/portfolio",
					children: "Back to your portfolio"
				})
			})
		]
	});
	const runAction = (id, action) => {
		setActionError(null);
		setPendingId(id);
		action.mutate(id, {
			onError: (error) => {
				setActionError(typeof error === "object" && error !== null && "__kind__" in error ? describeBackendError(error) : errorMessage(error));
			},
			onSettled: () => setPendingId(null)
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/$businessId",
							params: { businessId: businessId.toString() },
							"data-ocid": "reconciliation.back_button",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								"aria-hidden": "true",
								className: "size-4"
							}), "Back to admin"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Business admin",
						title: `Reconciliation · ${business.name}`,
						description: "Every simulated transaction for this business, with revenue, platform fee and round-up contribution kept as separate figures."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Simulated total",
						value: formatCurrency(totals.total),
						icon: Wallet,
						tone: "emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Business revenue",
						value: formatCurrency(totals.revenue),
						icon: Landmark,
						tone: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Platform fee",
						value: formatCurrency(totals.platformFee),
						icon: Scale,
						tone: "violet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Round-up contributions",
						value: formatCurrency(totals.contribution),
						icon: Coins,
						tone: "gold"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "font-display text-lg",
				children: "Transactions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
				rows.length,
				" simulated transaction",
				rows.length === 1 ? "" : "s",
				" · refund or cancel a paid transaction to update its status."
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [actionError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					"data-ocid": "reconciliation.error_state",
					className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",
					children: actionError
				}), reconciliationQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
					rows: 4,
					variant: "list"
				}) : reconciliationQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: ShieldAlert,
					title: "We could not load transactions",
					description: "The transaction list could not be reached. Try again in a moment.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						className: "rounded-full",
						onClick: () => void reconciliationQuery.refetch(),
						"data-ocid": "reconciliation.retry_button",
						children: "Try again"
					})
				}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Receipt,
					title: "No transactions yet",
					description: "Simulated purchases for this business will appear here as customers check out."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReconciliationTable, {
					rows,
					pendingId,
					onRefund: (id) => runAction(id, refund),
					onCancel: (id) => runAction(id, cancel)
				})]
			})] })
		]
	});
}
function ReconciliationPage() {
	const { businessId } = useParams({ from: "/admin/$businessId/reconciliation" });
	const id = (0, import_react.useMemo)(() => {
		try {
			return BigInt(businessId);
		} catch {
			return;
		}
	}, [businessId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "reconciliation.page",
		className: "mx-auto w-full max-w-6xl px-4 py-10 md:py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireSignIn, { children: id === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Scale,
			title: "Invalid business",
			description: "This reconciliation link does not point to a valid business.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/portfolio",
					children: "Go to your portfolio"
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReconciliationContent, { businessId: id }) })
	});
}
//#endregion
export { ReconciliationPage as default };
