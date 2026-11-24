import { d as require_react, g as __toESM, n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { t as Building2 } from "./building-2-u1b-6pzy.js";
import { n as ChartPie, t as Gauge } from "./gauge-CkvVKm1l.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { t as Compass } from "./compass-C4geBQ-Q.js";
import { t as ShareControl } from "./ShareControl-VNpdJcG3.js";
import { t as QrCode$1 } from "./QrCode-DWA2s1CU.js";
import { t as EmptyState } from "./EmptyState-BXNCSIq9.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { n as CurrencyValue, r as Layers, t as CurrencyLegend } from "./CurrencyValue-CjlC7Mmm.js";
import { t as MapPin } from "./map-pin-K5PI9Aay.js";
import { t as Package } from "./package-u748zSGN.js";
import { t as Repeat } from "./repeat-D8shsnc0.js";
import { t as Share2 } from "./share-2-CCCON0LS.js";
import { t as ShoppingBag } from "./shopping-bag-t1gQc4pz.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Target } from "./target-BKUmH1VC.js";
import { t as Users } from "./users-VFYNqB8l.js";
import { d as useCatalogue, dt as Link, et as demoCatalogue, gt as ShieldCheck, mt as useParams, nt as getDemoBusiness, s as useBusinessBySlug, w as useMyBusinesses } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { n as formatCurrency, s as formatNumber, t as formatBps } from "./format-9V_VuN1H.js";
import { t as LoadingSkeleton } from "./LoadingSkeleton-D-diqBmI.js";
import { t as StatCard } from "./StatCard-DseHDqGa.js";
import { t as BusinessBadge } from "./BusinessBadge-gzAAfmoA.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var QrCode = createLucideIcon("qr-code", [
	["rect", {
		width: "5",
		height: "5",
		x: "3",
		y: "3",
		rx: "1",
		key: "1tu5fj"
	}],
	["rect", {
		width: "5",
		height: "5",
		x: "16",
		y: "3",
		rx: "1",
		key: "1v8r4q"
	}],
	["rect", {
		width: "5",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "1x03jg"
	}],
	["path", {
		d: "M21 16h-3a2 2 0 0 0-2 2v3",
		key: "177gqh"
	}],
	["path", {
		d: "M21 21v.01",
		key: "ents32"
	}],
	["path", {
		d: "M12 7v3a2 2 0 0 1-2 2H7",
		key: "8crl2c"
	}],
	["path", {
		d: "M3 12h.01",
		key: "nlz23k"
	}],
	["path", {
		d: "M12 3h.01",
		key: "n36tog"
	}],
	["path", {
		d: "M12 16v.01",
		key: "133mhm"
	}],
	["path", {
		d: "M16 12h1",
		key: "1slzba"
	}],
	["path", {
		d: "M21 12v.01",
		key: "1lwtk9"
	}],
	["path", {
		d: "M12 21v-1",
		key: "1880an"
	}]
]);
//#endregion
//#region src/pages/BusinessProfilePage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var accentRing = {
	emerald: "from-primary/25 via-primary/5",
	cyan: "from-accent/25 via-accent/5",
	violet: "from-violet/25 via-violet/5",
	gold: "from-gold/25 via-gold/5"
};
function buildReferralUrl(slug) {
	return `${typeof window !== "undefined" ? window.location.origin : "https://globaldaos.app"}/business/${slug}?ref=${encodeURIComponent(slug)}`;
}
function buildShopUrl(slug, itemId) {
	const base = `${typeof window !== "undefined" ? window.location.origin : "https://globaldaos.app"}/shop/${slug}`;
	return itemId === void 0 ? base : `${base}?item=${itemId.toString()}`;
}
function BusinessProfilePage() {
	const { slug } = useParams({ from: "/business/$slug" });
	const demo = getDemoBusiness(slug);
	const { data: registered, isLoading } = useBusinessBySlug(demo ? void 0 : slug);
	const { data: myBusinesses } = useMyBusinesses();
	const profile = (0, import_react.useMemo)(() => {
		if (demo) return {
			slug: demo.slug,
			name: demo.name,
			category: demo.category,
			description: demo.description,
			location: `${demo.location.city}, ${demo.location.country}`,
			isFictional: true,
			fundingGoalCents: BigInt(demo.annualRevenueCents),
			capitalRaisedCents: BigInt(Math.round(demo.annualRevenueCents * .42)),
			ownershipPoolBps: BigInt(demo.projectedOwnershipBps * 10),
			roundUpCents: BigInt(demo.roundUpCents),
			ownershipStats: [
				{
					label: "Units per $1",
					value: formatNumber(demo.unitsPerDollar),
					hint: "Ownership units granted per dollar contributed"
				},
				{
					label: "Projected ownership",
					value: formatBps(BigInt(demo.projectedOwnershipBps)),
					hint: "After one year of simulated shopping"
				},
				{
					label: "Annual revenue",
					value: formatCurrency(BigInt(demo.annualRevenueCents)),
					hint: "Simulated trailing-twelve-month revenue"
				}
			],
			rightsSummary: "Round-up contributions convert to ownership units. Voting and profit participation stay optional and off by default."
		};
		if (!registered) return null;
		const poolBps = registered.totalOwnershipSupply > 0n ? registered.consumerOwnershipPool * 10000n / registered.totalOwnershipSupply : 0n;
		return {
			slug: registered.slug,
			name: registered.name,
			category: registered.industry,
			description: registered.description,
			location: [registered.city, registered.country].filter(Boolean).join(", "),
			isFictional: registered.isFictional,
			fundingGoalCents: registered.maxFundraisingTarget,
			capitalRaisedCents: 0n,
			ownershipPoolBps: poolBps,
			roundUpCents: registered.participation.minContribution,
			ownershipStats: [
				{
					label: "Ownership supply",
					value: formatNumber(registered.totalOwnershipSupply),
					hint: "Total ownership units in circulation"
				},
				{
					label: "Consumer pool",
					value: formatNumber(registered.consumerOwnershipPool),
					hint: "Units reserved for customer ownership"
				},
				{
					label: "Min contribution",
					value: formatCurrency(registered.minContribution),
					hint: "Smallest accepted round-up contribution"
				}
			],
			rightsSummary: registered.ownershipRights.rightsSummary,
			businessId: registered.id
		};
	}, [demo, registered]);
	const isOwner = (0, import_react.useMemo)(() => {
		if (!profile?.businessId || !myBusinesses) return false;
		return myBusinesses.some((b) => b.id === profile.businessId);
	}, [profile, myBusinesses]);
	const { data: catalogue } = useCatalogue(profile?.businessId);
	const activeItems = (0, import_react.useMemo)(() => demo ? demoCatalogue(demo) : (catalogue ?? []).filter((item) => item.active), [demo, catalogue]);
	if (!demo && isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
			variant: "stat",
			rows: 4
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {
			className: "mt-6",
			rows: 2
		})]
	});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Compass,
			title: "We couldn't find that business",
			description: `No business matches “${slug}”. It may have been renamed, or the link could be mistyped.`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/directory",
					search: {
						q: "",
						category: "all",
						origin: "all",
						status: "all"
					},
					"data-ocid": "profile.not_found_link",
					children: ["Browse the directory", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						"aria-hidden": "true",
						className: "size-4"
					})]
				})
			})
		})
	});
	const referralUrl = buildReferralUrl(profile.slug);
	const accent = demo?.accent ?? "emerald";
	const progressPct = profile.fundingGoalCents > 0n ? Math.min(100, Number(profile.capitalRaisedCents * 10000n / profile.fundingGoalCents) / 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				"data-ocid": "profile.header",
				className: "relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur sm:p-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: cn("pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent", accentRing[accent])
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessBadge, { isFictional: profile.isFictional }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
										"aria-hidden": "true",
										className: "size-3"
									}), profile.category]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl font-bold tracking-tight md:text-5xl",
								children: profile.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
								children: profile.description
							}),
							profile.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"aria-hidden": "true",
									className: "size-4 text-accent"
								}), profile.location]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/shop/$slug",
									params: { slug: profile.slug },
									"data-ocid": "profile.shop_cta",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
										"aria-hidden": "true",
										className: "size-4"
									}), "Shop the storefront"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/demo",
									"data-ocid": "profile.round_up_cta",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, {
										"aria-hidden": "true",
										className: "size-4"
									}), "Round Up to Own"]
								})
							}),
							isOwner && profile.businessId !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "lg",
								className: "rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin/$businessId",
									params: { businessId: profile.businessId.toString() },
									"data-ocid": "profile.admin_link",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										"aria-hidden": "true",
										className: "size-4"
									}), "Business workspace"]
								})
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				"aria-labelledby": "profile-figures",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Ownership terms",
						title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							id: "profile-figures",
							children: "Capital and ownership"
						}),
						description: "Purchase revenue, investment contributions, dilution and projected value are tracked as separate figures."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Funding goal",
								value: formatCurrency(profile.fundingGoalCents),
								hint: "Target capital for this round",
								icon: Target,
								tone: "emerald"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Capital raised",
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyValue, { cents: profile.capitalRaisedCents }),
								hint: "Recorded contributions to date",
								icon: Coins,
								tone: "cyan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Ownership pool",
								value: formatBps(profile.ownershipPoolBps),
								hint: "Share reserved for customers",
								icon: ChartPie,
								tone: "violet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Round-up rate",
								value: formatCurrency(profile.roundUpCents),
								hint: "Contribution per simulated purchase",
								icon: Repeat,
								tone: "gold"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl border border-border bg-card/60 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-muted-foreground",
									children: "Round progress"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-numeric text-foreground",
									children: [progressPct.toFixed(1), "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-2.5 overflow-hidden rounded-full bg-muted",
								role: "progressbar",
								tabIndex: 0,
								"aria-valuenow": Math.round(progressPct),
								"aria-valuemin": 0,
								"aria-valuemax": 100,
								"aria-label": "Funding round progress",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-gradient-primary transition-smooth",
									style: { width: `${progressPct}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyLegend, { className: "mt-4" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				"aria-labelledby": "profile-stats",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "profile-stats",
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
						children: "Ownership stats"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4 md:grid-cols-3",
						children: profile.ownershipStats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-ocid": "profile.stat_card",
							className: "rounded-2xl border border-border bg-card/60 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
									children: stat.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-numeric text-2xl font-semibold tracking-tight",
									children: stat.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs text-muted-foreground",
									children: stat.hint
								})
							]
						}, stat.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 flex items-start gap-2 rounded-xl border border-border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
							"aria-hidden": "true",
							className: "mt-0.5 size-4 shrink-0 text-accent"
						}), profile.rightsSummary]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				"aria-labelledby": "profile-share",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Grow the pool",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						id: "profile-share",
						children: "Share and invite customers"
					}),
					description: "Send this profile to shoppers, or print the QR code so customers can join the round-up from the counter."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 rounded-2xl border border-border bg-card/60 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
									"aria-hidden": "true",
									className: "size-4 text-primary"
								}), "Share this business"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareControl, {
								url: referralUrl,
								label: "Copy referral link"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
										children: "Referral link"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "break-all rounded-xl border border-border bg-background/60 px-3.5 py-2.5 font-mono text-xs text-accent",
										children: referralUrl
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Customers who arrive through this link are attributed to you in the simulated round-up."
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode$1, {
						value: referralUrl,
						fileName: `${profile.slug}-onboarding-qr`,
						caption: "Scan to open this profile with your referral attached.",
						className: "justify-center"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				"aria-labelledby": "profile-shop-qr",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Scan to shop",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						id: "profile-shop-qr",
						children: "Checkout and item QR codes"
					}),
					description: "Print the checkout code for the counter, or an item code so customers land directly on that product in the simulated storefront."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-6 lg:grid-cols-[1fr_1.6fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, {
									"aria-hidden": "true",
									className: "size-4 text-primary"
								}), "Storefront checkout"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode$1, {
								value: buildShopUrl(profile.slug),
								fileName: `${profile.slug}-checkout-qr`,
								caption: "Scan to open the simulated storefront and start a checkout.",
								className: "justify-center"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "w-full rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/shop/$slug",
									params: { slug: profile.slug },
									"data-ocid": "profile.shop_qr_link",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
										"aria-hidden": "true",
										className: "size-4"
									}), "Open storefront"]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
								"aria-hidden": "true",
								className: "size-4 text-accent"
							}), "Item codes"]
						}), activeItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl border border-dashed border-border bg-card/40 px-4 py-6 text-center text-sm text-muted-foreground",
							children: "This business has not published catalogue items yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-4 sm:grid-cols-2",
							children: activeItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode$1, {
								value: buildShopUrl(profile.slug, item.id),
								fileName: `${profile.slug}-${item.id.toString()}-qr`,
								size: 132,
								caption: item.name,
								className: "h-full justify-center"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-center text-xs text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-ocid": `profile.item_qr.${index + 1}`,
									children: [
										"Opens ",
										item.name,
										" directly"
									]
								})
							})] }, item.id.toString()))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-10 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-subtle p-6 sm:p-9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
									"aria-hidden": "true",
									className: "size-3.5"
								}), "Round Up to Own"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-2xl font-bold tracking-tight md:text-3xl",
								children: [
									"Shop ",
									profile.name,
									" and turn spare change into ownership"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: [
									"Every simulated purchase rounds up by",
									" ",
									formatCurrency(profile.roundUpCents),
									" into this business's ownership pool. No sign-in needed to try it."
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "shrink-0 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/demo",
							"data-ocid": "profile.demo_cta",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
									"aria-hidden": "true",
									className: "size-4"
								}),
								"Start the demo",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									"aria-hidden": "true",
									className: "size-4"
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
					"aria-hidden": "true",
					className: "size-3.5"
				}), profile.isFictional ? "This is a fictional business created for demonstration." : "This is a registered business on the platform."]
			})
		]
	});
}
//#endregion
export { BusinessProfilePage as default };
