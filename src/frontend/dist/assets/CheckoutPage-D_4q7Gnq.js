import { d as require_react, g as __toESM, n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowLeft } from "./arrow-left-TP66jKGS.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { t as Check } from "./check-B_X7dERu.js";
import { a as CardHeader, c as CircleX, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, s as RotateCcw, t as Card } from "./card-DnbNoKMA.js";
import { t as QrCode } from "./QrCode-DWA2s1CU.js";
import { t as EmptyState } from "./EmptyState-BXNCSIq9.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as LoaderCircle } from "./loader-circle-Cq00dUZM.js";
import { n as Minus, t as Plus } from "./plus-BoK28A7u.js";
import { t as Package } from "./package-u748zSGN.js";
import { t as Receipt } from "./receipt-KeRjBnFV.js";
import { t as ShoppingBag } from "./shopping-bag-t1gQc4pz.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Store } from "./store-Ct32Fft3.js";
import { t as Wallet } from "./wallet-BLO_fJX1.js";
import { $ as demoBusinessId, F as usePaymentProviders, G as useRefundTransaction, H as useRecordDemoPurchase, M as useMyTransactions, Rt as RequireSignIn, at as ItemKind, ct as ProviderKind, d as useCatalogue, dt as Link, et as demoCatalogue, f as useCheckout, ft as useNavigate, gt as ShieldCheck, i as useBuildCart, l as useCancelTransaction, mt as useParams, nt as getDemoBusiness, ot as PaymentStatus, rt as ContributionOption, s as useBusinessBySlug, t as cacheDemoReceipt } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { n as errorMessage, t as describeBackendError } from "./errors-BPsygLkv.js";
import { a as formatDateTime, n as formatCurrency } from "./format-9V_VuN1H.js";
import { t as LoadingSkeleton } from "./LoadingSkeleton-D-diqBmI.js";
import { t as BusinessBadge } from "./BusinessBadge-gzAAfmoA.js";
import { t as Badge } from "./badge-CBjFZzLp.js";
import { t as useReducedMotion } from "./use-reduced-motion-DjRxHvHP.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ScanLine = createLucideIcon("scan-line", [
	["path", {
		d: "M3 7V5a2 2 0 0 1 2-2h2",
		key: "aa7l1z"
	}],
	["path", {
		d: "M17 3h2a2 2 0 0 1 2 2v2",
		key: "4qcy5o"
	}],
	["path", {
		d: "M21 17v2a2 2 0 0 1-2 2h-2",
		key: "6vwrx8"
	}],
	["path", {
		d: "M7 21H5a2 2 0 0 1-2-2v-2",
		key: "ioqczr"
	}],
	["path", {
		d: "M7 12h10",
		key: "b7w52i"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
		key: "4alrt4"
	}],
	["path", {
		d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
		key: "v07s0e"
	}],
	["line", {
		x1: "10",
		x2: "10",
		y1: "11",
		y2: "17",
		key: "1uufr5"
	}],
	["line", {
		x1: "14",
		x2: "14",
		y1: "11",
		y2: "17",
		key: "xtxkd"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Wrench = createLucideIcon("wrench", [["path", {
	d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
	key: "cbrjhi"
}]]);
//#endregion
//#region src/components/commerce/CartPanel.tsx
var import_jsx_runtime = require_jsx_runtime();
var ROUND_UP_OPTIONS = [
	{
		label: "Skip",
		cents: 0n
	},
	{
		label: "+$0.50",
		cents: 50n
	},
	{
		label: "+$1.00",
		cents: 100n
	},
	{
		label: "+$2.00",
		cents: 200n
	}
];
/**
* Cart with quantity changes, removal, a running subtotal, an optional
* round-up contribution and the simulated checkout action.
*/
function CartPanel({ entries, subtotal, roundUp, onRoundUpChange, onIncrement, onDecrement, onRemove, onCheckout, pending, error }) {
	const reduceMotion = useReducedMotion() ?? false;
	const itemCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);
	const total = subtotal + roundUp;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "lg:sticky lg:top-24",
		"data-ocid": "cart.panel",
		"aria-label": "Your cart",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "flex items-center gap-2 font-display text-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
					"aria-hidden": "true",
					className: "size-5 text-primary"
				}), "Your cart"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: itemCount === 0 ? "Add an item to begin." : `${itemCount} item${itemCount === 1 ? "" : "s"} selected` })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-5",
				children: [
					entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-ocid": "cart.empty_state",
						className: "rounded-xl border border-dashed border-border bg-background/40 px-4 py-6 text-center text-sm text-muted-foreground",
						children: "Your cart is empty. Add something from the catalogue to see the simulated total."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-ocid": "cart.list",
						className: "space-y-3",
						children: entries.map((entry, index) => {
							const key = entry.item.id.toString();
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-ocid": `cart.item.${index + 1}`,
								className: "rounded-xl border border-border bg-background/40 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: entry.item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-numeric text-xs text-muted-foreground",
											children: [formatCurrency(entry.item.price), " each"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "icon",
										className: "size-7 shrink-0 rounded-full text-muted-foreground hover:text-destructive",
										"aria-label": `Remove ${entry.item.name} from cart`,
										"data-ocid": `cart.remove_button.${index + 1}`,
										onClick: () => onRemove(entry.item),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											"aria-hidden": "true",
											className: "size-4"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "outline",
												size: "icon",
												className: "size-7 rounded-full",
												"aria-label": `Decrease ${entry.item.name}`,
												"data-ocid": `cart.decrement_button.${index + 1}`,
												onClick: () => onDecrement(entry.item),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
													"aria-hidden": "true",
													className: "size-3.5"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-live": "polite",
												className: "w-6 text-center text-sm font-medium tabular-nums",
												children: entry.quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "outline",
												size: "icon",
												className: "size-7 rounded-full",
												"aria-label": `Increase ${entry.item.name}`,
												"data-ocid": `cart.increment_button.${index + 1}`,
												onClick: () => onIncrement(entry.item),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
													"aria-hidden": "true",
													className: "size-3.5"
												})
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-numeric text-sm font-semibold tabular-nums",
										children: formatCurrency(entry.item.price * BigInt(entry.quantity))
									})]
								})]
							}, key);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
								children: "Voluntary round-up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-1.5",
								children: ROUND_UP_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: roundUp === option.cents ? "default" : "outline",
									size: "sm",
									className: "rounded-full px-0 text-xs",
									"aria-pressed": roundUp === option.cents,
									"data-ocid": `cart.roundup.${option.cents.toString()}`,
									onClick: () => onRoundUpChange(option.cents),
									children: option.label
								}, option.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-relaxed text-muted-foreground",
								children: "Optional and consumer-funded. Round-ups are simulated contributions toward a hypothetical ownership position."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "space-y-2 border-t border-border pt-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-numeric tabular-nums",
									children: formatCurrency(subtotal)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Round-up"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-numeric tabular-nums",
									children: formatCurrency(roundUp)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-t border-border pt-2 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-semibold",
									children: "Simulated total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-numeric font-semibold text-primary tabular-nums",
									children: formatCurrency(total)
								})]
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						"data-ocid": "cart.error_state",
						className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",
						children: error
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
				className: "flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					className: cn("w-full rounded-full"),
					"data-ocid": "cart.checkout_button",
					disabled: entries.length === 0 || pending,
					onClick: onCheckout,
					children: [pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"aria-hidden": "true",
						className: cn("size-4", !reduceMotion && "animate-spin")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						"aria-hidden": "true",
						className: "size-4"
					}), pending ? "Processing…" : "Complete simulated purchase"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
						"aria-hidden": "true",
						className: "size-3.5"
					}), "You will get a shareable digital receipt."]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/commerce/CatalogueGrid.tsx
function kindMeta(kind) {
	return kind === ItemKind.service ? {
		label: "Service",
		icon: Wrench
	} : {
		label: "Product",
		icon: Package
	};
}
/**
* Digital catalogue for a simulated storefront. Each card shows the item's
* name, description, price and kind, plus a control to add it to the cart.
*/
function CatalogueGrid({ items, quantities, onAdd, highlightItemId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-ocid": "catalogue.list",
		className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
		children: items.map((item, index) => {
			const key = item.id.toString();
			const qty = quantities[key] ?? 0;
			const meta = kindMeta(item.kind);
			const KindIcon = meta.icon;
			const highlighted = highlightItemId === key;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				"data-ocid": `catalogue.item.${index + 1}`,
				className: cn("group flex flex-col rounded-2xl border bg-card/70 p-5 transition-smooth ease-cinematic hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated", qty > 0 ? "border-primary/50" : "border-border", highlighted && "ring-2 ring-accent/60"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindIcon, {
								"aria-hidden": "true",
								className: "size-5"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "shrink-0",
							children: meta.label
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 font-display text-lg font-semibold leading-snug",
						children: item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground",
						children: item.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between gap-3 border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-numeric text-lg font-semibold text-primary",
							children: formatCurrency(item.price)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: qty > 0 ? "secondary" : "default",
							className: "rounded-full",
							"data-ocid": `catalogue.add_button.${index + 1}`,
							onClick: () => onAdd(item),
							children: qty > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									"aria-hidden": "true",
									className: "size-4"
								}),
								"In cart · ",
								qty
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								"aria-hidden": "true",
								className: "size-4"
							}), "Add to cart"] })
						})]
					})
				]
			}, key);
		})
	});
}
//#endregion
//#region src/components/commerce/TransactionQr.tsx
/**
* Transaction-specific QR code shown at checkout. The code is built from the
* transaction reference returned by the checkout call so each simulated
* purchase has its own scannable payload.
*/
function TransactionQr({ transaction, onViewReceipt, className }) {
	const payload = `globaldaos://receipt/${transaction.receiptToken}?ref=${encodeURIComponent(transaction.transactionRef)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "checkout.qr_panel",
		className: cn("overflow-hidden rounded-3xl border border-primary/30 bg-gradient-subtle p-6 shadow-glow sm:p-8", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-3 text-center md:text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "gap-1.5 border-primary/40 bg-primary/10 text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
							"aria-hidden": "true",
							className: "size-3.5"
						}), "Simulated purchase complete"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold tracking-tight",
						children: "Scan to confirm your receipt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "max-w-sm text-sm leading-relaxed text-muted-foreground",
						children: [
							"This QR code is unique to transaction",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: transaction.transactionRef
							}),
							". No real payment was taken — the code opens the simulated receipt."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mx-auto grid max-w-xs grid-cols-2 gap-3 text-left md:mx-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs uppercase tracking-[0.14em] text-muted-foreground",
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-numeric text-lg font-semibold text-primary",
							children: formatCurrency(transaction.total)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs uppercase tracking-[0.14em] text-muted-foreground",
							children: "Round-up"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-numeric text-lg font-semibold text-accent",
							children: formatCurrency(transaction.roundUpContribution)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						className: "rounded-full",
						"data-ocid": "checkout.view_receipt_button",
						onClick: onViewReceipt,
						children: ["View digital receipt", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							"aria-hidden": "true",
							className: "size-4"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, {
					value: payload,
					fileName: `receipt-${transaction.transactionRef}`,
					caption: "Scan to open this transaction's receipt."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, {
						"aria-hidden": "true",
						className: "size-3.5"
					}), "Transaction-specific code"]
				})]
			})]
		})
	});
}
//#endregion
//#region src/pages/CheckoutPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var statusLabel = {
	paid: "Paid (simulated)",
	pending: "Pending",
	refunded: "Refunded",
	cancelled: "Cancelled"
};
/** Map the cart's round-up amount to the backend's contribution option. */
function contributionOptionFor(roundUp) {
	if (roundUp === 0n) return ContributionOption.none;
	if (roundUp === 50n) return ContributionOption.nearestDollar;
	if (roundUp === 100n) return ContributionOption.nearestFive;
	return ContributionOption.custom;
}
function ProviderNotice() {
	const { data: providers } = usePaymentProviders();
	const active = (providers ?? []).find((provider) => provider.active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "checkout.provider_notice",
		className: "flex items-start gap-2.5 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
			"aria-hidden": "true",
			className: "mt-0.5 size-4 shrink-0 text-accent"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "leading-relaxed text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-semibold text-foreground",
					children: ["Simulated provider: ", active?.displayName ?? "Simulated checkout"]
				}),
				" ",
				"— no real payment is taken. No card details are collected and no funds move."
			]
		})]
	});
}
function ConsumerTransactions() {
	const { data: transactions, isLoading } = useMyTransactions();
	const refund = useRefundTransaction();
	const cancel = useCancelTransaction();
	const [error, setError] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => [...transactions ?? []].sort((a, b) => a.createdAt < b.createdAt ? 1 : -1), [transactions]);
	function run(action, id) {
		setError(null);
		(action === "refund" ? refund : cancel).mutate(id, { onError: (err) => setError(errorMessage(err)) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-12",
		"aria-labelledby": "my-transactions",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "Your activity",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				id: "my-transactions",
				children: "Your simulated transactions"
			}),
			description: "Refund or cancel a simulated purchase and watch its status change."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
				variant: "list",
				rows: 3
			}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Package,
				title: "No simulated purchases yet",
				description: "Complete a simulated checkout above and it will appear here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-ocid": "transactions.list",
				className: "space-y-3",
				children: rows.map((tx, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionRow, {
					tx,
					index,
					busy: refund.isPending || cancel.isPending,
					onRefund: () => run("refund", tx.id),
					onCancel: () => run("cancel", tx.id)
				}, tx.id.toString()))
			}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				"data-ocid": "transactions.error_state",
				className: "mt-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",
				children: error
			})]
		})]
	});
}
function TransactionRow({ tx, index, busy, onRefund, onCancel }) {
	const canRefund = tx.status === "paid";
	const canCancel = tx.status === "pending";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-ocid": `transactions.item.${index + 1}`,
		className: "flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-4 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-muted-foreground",
					children: tx.transactionRef
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: cn(tx.status === "paid" && "border-success/40 bg-success/10 text-success", tx.status === "refunded" && "border-accent/40 bg-accent/10 text-accent", tx.status === "cancelled" && "border-border bg-muted/60 text-muted-foreground", tx.status === "pending" && "border-warning/40 bg-warning/10 text-warning"),
					"data-ocid": `transactions.status.${index + 1}`,
					children: statusLabel[tx.status] ?? tx.status
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					formatDateTime(tx.createdAt),
					" · ",
					tx.lines.length,
					" line",
					tx.lines.length === 1 ? "" : "s"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-numeric text-base font-semibold tabular-nums",
				children: formatCurrency(tx.total)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					canRefund && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "rounded-full",
						disabled: busy,
						"data-ocid": `transactions.refund_button.${index + 1}`,
						onClick: onRefund,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
							"aria-hidden": "true",
							className: "size-3.5"
						}), "Refund"]
					}),
					canCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "rounded-full",
						disabled: busy,
						"data-ocid": `transactions.cancel_button.${index + 1}`,
						onClick: onCancel,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
							"aria-hidden": "true",
							className: "size-3.5"
						}), "Cancel"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/receipt/$token",
							params: { token: tx.receiptToken },
							"data-ocid": `transactions.receipt_link.${index + 1}`,
							children: ["Receipt", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								"aria-hidden": "true",
								className: "size-3.5"
							})]
						})
					})
				]
			})]
		})]
	});
}
function CheckoutPage() {
	const { slug } = useParams({ from: "/shop/$slug" });
	const navigate = useNavigate();
	const demo = getDemoBusiness(slug);
	const { data: registered, isLoading: businessLoading } = useBusinessBySlug(demo ? void 0 : slug);
	const businessId = registered?.id;
	const { data: items, isLoading: itemsLoading } = useCatalogue(businessId);
	const buildCart = useBuildCart();
	const checkout = useCheckout();
	const demoPurchase = useRecordDemoPurchase();
	const [quantities, setQuantities] = (0, import_react.useState)({});
	const [roundUp, setRoundUp] = (0, import_react.useState)(0n);
	const [error, setError] = (0, import_react.useState)(null);
	const [completed, setCompleted] = (0, import_react.useState)(null);
	const [highlightItemId, setHighlightItemId] = (0, import_react.useState)();
	const catalogue = (0, import_react.useMemo)(() => {
		if (demo) return demoCatalogue(demo);
		return (items ?? []).filter((item) => item.active);
	}, [demo, items]);
	(0, import_react.useEffect)(() => {
		if (catalogue.length === 0) return;
		const itemParam = new URLSearchParams(window.location.search).get("item");
		if (!itemParam) return;
		if (!catalogue.find((item) => item.id.toString() === itemParam)) return;
		setHighlightItemId(itemParam);
		setQuantities((prev) => prev[itemParam] ? prev : {
			...prev,
			[itemParam]: 1
		});
	}, [catalogue]);
	const entries = (0, import_react.useMemo)(() => catalogue.map((item) => ({
		item,
		quantity: quantities[item.id.toString()] ?? 0
	})).filter((entry) => entry.quantity > 0), [catalogue, quantities]);
	const subtotal = (0, import_react.useMemo)(() => entries.reduce((sum, entry) => sum + entry.item.price * BigInt(entry.quantity), 0n), [entries]);
	function adjust(item, delta) {
		const key = item.id.toString();
		setQuantities((prev) => {
			const next = Math.max(0, Math.min(20, (prev[key] ?? 0) + delta));
			return {
				...prev,
				[key]: next
			};
		});
	}
	function remove(item) {
		setQuantities((prev) => ({
			...prev,
			[item.id.toString()]: 0
		}));
	}
	async function handleDemoCheckout() {
		if (!demo || entries.length === 0) return;
		setError(null);
		try {
			const productName = entries.map((entry) => `${entry.quantity}× ${entry.item.name}`).join(", ");
			const clientRef = `shop-${demo.slug}-${Date.now().toString(36)}`;
			const result = await demoPurchase.mutateAsync({
				businessId: demoBusinessId(demo.slug),
				productName,
				purchasePrice: subtotal,
				contributionAmount: roundUp,
				contributionOption: contributionOptionFor(roundUp),
				clientRef
			});
			const lines = entries.map((entry) => ({
				itemId: entry.item.id,
				quantity: BigInt(entry.quantity)
			}));
			const platformFee = result.purchasePrice * 250n / 10000n;
			const receipt = {
				status: PaymentStatus.paid,
				revenue: result.purchasePrice,
				platformFee,
				businessName: demo.name,
				receiptToken: clientRef,
				lines,
				issuedAt: result.createdAt,
				contribution: result.contributionAmount,
				transactionId: 0n
			};
			cacheDemoReceipt(receipt);
			setCompleted({
				id: 0n,
				transactionRef: clientRef,
				status: PaymentStatus.paid,
				total: result.totalPayment,
				provider: {
					active: true,
					displayName: "Simulated checkout",
					kind: ProviderKind.simulated
				},
				businessId: result.businessId,
				platformFee,
				createdAt: result.createdAt,
				receiptToken: clientRef,
				lines,
				updatedAt: result.createdAt,
				consumer: result.businessId,
				roundUpContribution: result.contributionAmount,
				subtotal: result.purchasePrice
			});
			setQuantities({});
			setRoundUp(0n);
		} catch (err) {
			setError(err && typeof err === "object" && "__kind__" in err ? describeBackendError(err) : errorMessage(err));
		}
	}
	async function handleRegisteredCheckout() {
		if (!businessId || entries.length === 0) return;
		setError(null);
		try {
			const lines = entries.map((entry) => ({
				itemId: entry.item.id,
				quantity: BigInt(entry.quantity)
			}));
			const cart = await buildCart.mutateAsync({
				businessId,
				lines
			});
			const result = await checkout.mutateAsync({
				cart,
				roundUpContribution: roundUp,
				clientRef: `shop-${businessId.toString()}-${Date.now()}`
			});
			setCompleted(result.transaction);
			setQuantities({});
			setRoundUp(0n);
		} catch (err) {
			setError(err && typeof err === "object" && "__kind__" in err ? describeBackendError(err) : errorMessage(err));
		}
	}
	function handleCheckout() {
		if (demo) return handleDemoCheckout();
		return handleRegisteredCheckout();
	}
	const pending = buildCart.isPending || checkout.isPending || demoPurchase.isPending;
	const name = demo?.name ?? registered?.name;
	const industry = demo?.category ?? registered?.industry;
	const isFictional = demo ? true : registered?.isFictional ?? false;
	if (!demo && businessLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, { rows: 4 })
	});
	if (!name) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Store,
			title: "Shop not found",
			description: "This business does not exist or is no longer taking simulated orders.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/directory",
					search: {},
					children: "Browse the directory"
				})
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "checkout.page",
		className: "mx-auto w-full max-w-6xl space-y-8 px-4 py-10 md:py-14",
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
							to: "/business/$slug",
							params: { slug },
							"data-ocid": "checkout.back_button",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
									"aria-hidden": "true",
									className: "size-4"
								}),
								"Back to ",
								name
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessBadge, { isFictional }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
							children: industry
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Simulated storefront",
						title: `Shop ${name}`,
						description: "Pick what you would buy, choose a voluntary round-up, and complete a fully simulated purchase. No real money moves."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderNotice, {})
				]
			}),
			completed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionQr, {
				transaction: completed,
				onViewReceipt: () => void navigate({
					to: "/receipt/$token",
					params: { token: completed.receiptToken }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: !demo && itemsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, { rows: 3 }) : catalogue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Package,
					title: "Nothing on the shelf yet",
					description: "This business has not published any catalogue items for the simulation."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogueGrid, {
					items: catalogue,
					quantities,
					onAdd: (item) => adjust(item, 1),
					highlightItemId
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartPanel, {
					entries,
					subtotal,
					roundUp,
					onRoundUpChange: setRoundUp,
					onIncrement: (item) => adjust(item, 1),
					onDecrement: (item) => adjust(item, -1),
					onRemove: remove,
					onCheckout: () => void handleCheckout(),
					pending,
					error
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireSignIn, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ocid": "transactions.signin_prompt",
					className: "mt-12 rounded-2xl border border-dashed border-border bg-card/40 p-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Sign in with Internet Identity to see your simulated transactions and refund or cancel them."
					})
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsumerTransactions, {})
			})
		]
	});
}
//#endregion
export { CheckoutPage as default };
