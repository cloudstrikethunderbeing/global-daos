import { r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as Building2 } from "./building-2-u1b-6pzy.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { t as ShareControl } from "./ShareControl-VNpdJcG3.js";
import { t as Crown } from "./crown-xHDBqp_3.js";
import { t as QrCode } from "./QrCode-DWA2s1CU.js";
import { n as buildReferralLink, o as rewardTypeLabels, r as formatCredits, t as badgeLabels, u as Gift } from "./credits-FVSdr8gq.js";
import { t as EmptyState } from "./EmptyState-BXNCSIq9.js";
import { it as FoundingBadge$1 } from "./index-Bd2sA-Nq.js";
import { i as formatDate } from "./format-9V_VuN1H.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowUpRight = createLucideIcon("arrow-up-right", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CalendarDays = createLucideIcon("calendar-days", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}],
	["path", {
		d: "M8 14h.01",
		key: "6423bh"
	}],
	["path", {
		d: "M12 14h.01",
		key: "1etili"
	}],
	["path", {
		d: "M16 14h.01",
		key: "1gbofw"
	}],
	["path", {
		d: "M8 18h.01",
		key: "lrp35t"
	}],
	["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}],
	["path", {
		d: "M16 18h.01",
		key: "kzsmim"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Hash = createLucideIcon("hash", [
	["line", {
		x1: "4",
		x2: "20",
		y1: "9",
		y2: "9",
		key: "4lhtct"
	}],
	["line", {
		x1: "4",
		x2: "20",
		y1: "15",
		y2: "15",
		key: "vyu0kd"
	}],
	["line", {
		x1: "10",
		x2: "8",
		y1: "3",
		y2: "21",
		key: "1ggp8o"
	}],
	["line", {
		x1: "16",
		x2: "14",
		y1: "3",
		y2: "21",
		key: "weycgp"
	}]
]);
//#endregion
//#region src/components/shared/CreditHistoryList.tsx
var import_jsx_runtime = require_jsx_runtime();
var accentByType = {
	firstSimulatedPurchase: "border-primary/60",
	earlyConsumerRegistration: "border-accent/60",
	valuableFeedback: "border-chart-3/60",
	consumerReferral: "border-chart-3/60",
	businessReferral: "border-accent/60",
	businessNomination: "border-warning/60",
	foundingBusinessRegistration: "border-warning/60",
	daoDeployment: "border-primary/60"
};
/**
* Newest-first list of credit awards with reward type, amount, subject and
* date. Amounts are simulated recognition credits, not currency.
*/
function CreditHistoryList({ entries, emptyTitle = "No credits yet", emptyDescription = "Complete a simulated purchase or invite a friend to start earning Founding Credits.", className }) {
	if (entries.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Coins,
		title: emptyTitle,
		description: emptyDescription,
		className
	});
	const sorted = [...entries].sort((a, b) => a.createdAt === b.createdAt ? 0 : a.createdAt > b.createdAt ? -1 : 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-ocid": "credits.history.list",
		className: cn("space-y-2.5", className),
		children: sorted.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			"data-ocid": `credits.history.item.${index + 1}`,
			className: cn("flex items-center justify-between gap-4 rounded-xl border border-border border-l-2 bg-card/60 px-4 py-3 transition-smooth hover:bg-card", accentByType[entry.rewardType] ?? "border-l-primary/60"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium text-foreground",
					children: rewardTypeLabels[entry.rewardType]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 truncate text-xs text-muted-foreground",
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
				className: "shrink-0 font-numeric text-sm font-semibold text-primary",
				children: ["+", formatCredits(entry.amount)]
			})]
		}, entry.id.toString()))
	});
}
//#endregion
//#region src/components/shared/FoundingBadge.tsx
/**
* Recognition badge for Founding Members and Founding Businesses. Styled as a
* gold recognition marker, never as currency, equity or a token.
*/
function FoundingBadge({ kind, className, showLabel = true }) {
	const isBusiness = kind === FoundingBadge$1.business;
	const Icon = isBusiness ? Building2 : Crown;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ocid": `founding.badge.${isBusiness ? "business" : "member"}`,
		className: cn("inline-flex items-center gap-1.5 rounded-full border border-warning/50 bg-warning/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-warning", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			"aria-hidden": "true",
			className: "size-3.5"
		}), showLabel ? badgeLabels[kind] : null]
	});
}
//#endregion
//#region src/components/shared/ReferralPanel.tsx
/**
* Referral link with a copy control and a downloadable QR code. The link
* carries the caller's referral code so new supporters are attributed.
*/
function ReferralPanel({ referralCode, className }) {
	const link = buildReferralLink(referralCode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "referral.panel",
		"aria-labelledby": "referral-panel-title",
		className: cn("rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-8 items-center justify-center rounded-full bg-chart-3/15 text-chart-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
						"aria-hidden": "true",
						className: "size-4"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "referral-panel-title",
					className: "font-display text-base font-semibold",
					children: "Referral link"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: "Share your link to earn Founding Credits when friends join. Credits are simulated recognition markers, not money or equity."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareControl, {
						url: link,
						label: "Copy link"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-muted-foreground",
						children: [
							"Code:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: referralCode
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, {
					value: link,
					fileName: `global-daos-referral-${referralCode}`,
					size: 132,
					className: "mx-auto w-full max-w-[13rem] sm:mx-0"
				})]
			})
		]
	});
}
//#endregion
export { CalendarDays as a, Hash as i, FoundingBadge as n, ArrowUpRight as o, CreditHistoryList as r, ReferralPanel as t };
