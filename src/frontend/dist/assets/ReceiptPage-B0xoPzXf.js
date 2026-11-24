import { n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as CircleCheck } from "./circle-check-B7_YBaMt.js";
import { a as CardHeader, c as CircleX, n as CardContent, o as CardTitle, r as CardDescription, s as RotateCcw, t as Card } from "./card-DnbNoKMA.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { t as ShareControl } from "./ShareControl-VNpdJcG3.js";
import { t as EmptyState } from "./EmptyState-BXNCSIq9.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as Receipt } from "./receipt-KeRjBnFV.js";
import { t as Store } from "./store-Ct32Fft3.js";
import { J as useResolvedReceipt, dt as Link, mt as useParams, ot as PaymentStatus, q as useResolvedCatalogueItem } from "./index-Bd2sA-Nq.js";
import { a as formatDateTime, n as formatCurrency } from "./format-9V_VuN1H.js";
import { t as LoadingSkeleton } from "./LoadingSkeleton-D-diqBmI.js";
import { t as Badge } from "./badge-CBjFZzLp.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Clock = createLucideIcon("clock", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["polyline", {
	points: "12 6 12 12 16 14",
	key: "68esgv"
}]]);
//#endregion
//#region src/components/commerce/ReceiptView.tsx
var import_jsx_runtime = require_jsx_runtime();
var statusMeta = {
	[PaymentStatus.paid]: {
		label: "Paid (simulated)",
		className: "border-success/40 bg-success/10 text-success",
		icon: CircleCheck
	},
	[PaymentStatus.pending]: {
		label: "Pending",
		className: "border-warning/40 bg-warning/10 text-warning",
		icon: Clock
	},
	[PaymentStatus.refunded]: {
		label: "Refunded",
		className: "border-accent/40 bg-accent/10 text-accent",
		icon: RotateCcw
	},
	[PaymentStatus.cancelled]: {
		label: "Cancelled",
		className: "border-border bg-muted/60 text-muted-foreground",
		icon: CircleX
	}
};
function ReceiptLine({ itemId, quantity }) {
	const { data: item } = useResolvedCatalogueItem(itemId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center justify-between gap-3 py-2.5 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: item?.name ?? `Item #${itemId.toString()}`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "ml-1.5 text-muted-foreground",
				children: ["× ", quantity.toString()]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 font-numeric tabular-nums text-muted-foreground",
			children: item ? formatCurrency(item.price * quantity) : "—"
		})]
	});
}
/**
* Token-readable digital receipt. Shows the business name, line items, the
* revenue / contribution / platform-fee amounts as separate figures, the
* status, the issue date and a copyable share link.
*/
function ReceiptView({ receipt, shareUrl }) {
	const meta = statusMeta[receipt.status];
	const StatusIcon = meta.icon;
	const subtotal = receipt.revenue + receipt.platformFee;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "receipt.view",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-3 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
							"aria-hidden": "true",
							className: "size-6"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold tracking-tight",
								children: "Digital receipt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center justify-center gap-1.5 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
									"aria-hidden": "true",
									className: "size-4 text-accent"
								}), receipt.businessName]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Issued ", formatDateTime(receipt.issuedAt)]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: cn("gap-1.5", meta.className),
						"data-ocid": "receipt.status",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, {
							"aria-hidden": "true",
							className: "size-3.5"
						}), meta.label]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "font-display text-base",
				children: "Line items"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: ["Transaction #", receipt.transactionId.toString()] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: receipt.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptLine, {
					itemId: line.itemId,
					quantity: line.quantity
				}, line.itemId.toString()))
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "flex items-center gap-2 font-display text-base",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, {
					"aria-hidden": "true",
					className: "size-4 text-primary"
				}), "Separated amounts"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Revenue, contribution and platform fee are tracked as distinct figures." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2.5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Business revenue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-numeric font-medium tabular-nums text-primary",
							"data-ocid": "receipt.revenue",
							children: formatCurrency(receipt.revenue)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Round-up contribution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-numeric font-medium tabular-nums text-accent",
							"data-ocid": "receipt.contribution",
							children: formatCurrency(receipt.contribution)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Platform fee"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-numeric font-medium tabular-nums text-muted-foreground",
							"data-ocid": "receipt.platform_fee",
							children: formatCurrency(receipt.platformFee)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-t border-border pt-2.5 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Simulated total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-numeric font-semibold tabular-nums",
							children: formatCurrency(subtotal + receipt.contribution)
						})]
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 rounded-2xl border border-border bg-card/60 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
					children: "Share this receipt"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareControl, {
					url: shareUrl,
					label: "Copy receipt link"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, {})
		]
	});
}
//#endregion
//#region src/pages/ReceiptPage.tsx
function receiptShareUrl(token) {
	return `${typeof window !== "undefined" ? window.location.origin : "https://globaldaos.app"}/receipt/${encodeURIComponent(token)}`;
}
function ReceiptPage() {
	const { token } = useParams({ from: "/receipt/$token" });
	const { data: receipt, isLoading } = useResolvedReceipt(token);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "receipt.page",
		className: "mx-auto w-full max-w-xl px-4 py-10 md:py-14",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, { rows: 3 }) : receipt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptView, {
			receipt,
			shareUrl: receiptShareUrl(token)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Receipt,
			title: "Receipt not found",
			description: "This receipt link is invalid or has expired.",
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
}
//#endregion
export { ReceiptPage as default };
