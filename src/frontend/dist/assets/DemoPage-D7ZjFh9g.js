import { d as require_react, g as __toESM, n as Button, r as cn, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { t as Check } from "./check-B_X7dERu.js";
import { t as CircleDollarSign } from "./circle-dollar-sign-B6pnsrqH.js";
import { t as Coins } from "./coins-D3eoLJCk.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as Landmark } from "./landmark-CSNsXaEc.js";
import { n as CurrencyValue, r as Layers, t as CurrencyLegend } from "./CurrencyValue-CjlC7Mmm.js";
import { n as Minus, t as Plus } from "./plus-BoK28A7u.js";
import { t as ShoppingBag } from "./shopping-bag-t1gQc4pz.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as TrendingUp } from "./trending-up-mHIadLz6.js";
import { t as Wallet } from "./wallet-BLO_fJX1.js";
import { Bt as useInternetIdentity, H as useRecordDemoPurchase, O as useMyPortfolio, U as useRecordPurchase, dt as Link, rt as ContributionOption, tt as demoBusinesses, zt as SignInButton } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { n as errorMessage, t as describeBackendError } from "./errors-BPsygLkv.js";
import { n as formatCurrency, s as formatNumber, t as formatBps } from "./format-9V_VuN1H.js";
import { t as StatCard } from "./StatCard-DseHDqGa.js";
import { t as BusinessBadge } from "./BusinessBadge-gzAAfmoA.js";
//#region src/pages/DemoPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var accentStyles = {
	emerald: {
		text: "text-primary",
		ring: "border-primary/40",
		chip: "bg-primary/10 text-primary",
		glow: "bg-primary",
		bar: "bg-primary"
	},
	cyan: {
		text: "text-accent",
		ring: "border-accent/40",
		chip: "bg-accent/10 text-accent",
		glow: "bg-accent",
		bar: "bg-accent"
	},
	violet: {
		text: "text-violet",
		ring: "border-violet/40",
		chip: "bg-violet/10 text-violet",
		glow: "bg-violet",
		bar: "bg-violet"
	},
	gold: {
		text: "text-gold",
		ring: "border-gold/40",
		chip: "bg-gold/10 text-gold",
		glow: "bg-gold",
		bar: "bg-gold"
	}
};
var roundUpOptions = [
	{
		value: "nearestDollar",
		label: "Nearest $1",
		hint: "Round to the next dollar"
	},
	{
		value: "nearestFive",
		label: "Nearest $5",
		hint: "Round to the next $5"
	},
	{
		value: "nearestTen",
		label: "Nearest $10",
		hint: "Round to the next $10"
	},
	{
		value: "custom",
		label: "Custom",
		hint: "Choose your own amount"
	},
	{
		value: "none",
		label: "No round-up",
		hint: "Just the purchase"
	}
];
var optionToEnum = {
	nearestDollar: ContributionOption.nearestDollar,
	nearestFive: ContributionOption.nearestFive,
	nearestTen: ContributionOption.nearestTen,
	custom: ContributionOption.custom,
	none: ContributionOption.none
};
function roundUpCents(priceCents, choice, customCents) {
	switch (choice) {
		case "nearestDollar": return Math.ceil(priceCents / 100) * 100 - priceCents || 100;
		case "nearestFive": return Math.ceil(priceCents / 500) * 500 - priceCents || 500;
		case "nearestTen": return Math.ceil(priceCents / 1e3) * 1e3 - priceCents || 1e3;
		case "custom": return Math.max(0, Math.round(customCents));
		case "none": return 0;
	}
}
function makeClientRef() {
	return `demo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
/**
* The consumer hooks throw the raw `ConsumerError` variant object on `#err`, so
* it is not an `Error` instance. Detect it to surface the specific reason.
*/
function isConsumerError(error) {
	return typeof error === "object" && error !== null && "__kind__" in error && typeof error.__kind__ === "string";
}
/** User-facing copy for a rejected save, falling back to the generic message. */
function saveErrorMessage(error) {
	if (isConsumerError(error)) return describeBackendError(error);
	return errorMessage(error);
}
/**
* Stable synthetic business id for a fictional demo business. The backend demo
* path accepts an id with no registry record, so a deterministic per-slug id
* keeps each fictional business's projection distinct without persisting one.
*/
function demoBusinessId(slug) {
	let hash = 0n;
	for (const char of slug) hash = (hash * 31n + BigInt(char.charCodeAt(0))) % 1000000007n;
	return hash + 1n;
}
function DemoPage() {
	const [stage, setStage] = (0, import_react.useState)("browse");
	const [activeSlug, setActiveSlug] = (0, import_react.useState)(demoBusinesses[0].slug);
	const [productId, setProductId] = (0, import_react.useState)(demoBusinesses[0].products[0].id);
	const [choice, setChoice] = (0, import_react.useState)("nearestDollar");
	const [customDollars, setCustomDollars] = (0, import_react.useState)("2");
	const [result, setResult] = (0, import_react.useState)(null);
	const [savedToPortfolio, setSavedToPortfolio] = (0, import_react.useState)(false);
	const [saveError, setSaveError] = (0, import_react.useState)(null);
	const { identity } = useInternetIdentity();
	const signedIn = !!identity && !identity.getPrincipal().isAnonymous();
	const demoPurchase = useRecordDemoPurchase();
	const recordPurchase = useRecordPurchase();
	const portfolio = useMyPortfolio();
	const business = (0, import_react.useMemo)(() => demoBusinesses.find((b) => b.slug === activeSlug) ?? demoBusinesses[0], [activeSlug]);
	const product = (0, import_react.useMemo)(() => business.products.find((p) => p.id === productId) ?? business.products[0], [business, productId]);
	const customCents = Math.round((Number.parseFloat(customDollars) || 0) * 100);
	const contributionCents = roundUpCents(product.priceCents, choice, customCents);
	const totalCents = product.priceCents + contributionCents;
	const projectedUnits = Math.round(contributionCents / 100 * business.unitsPerDollar);
	function selectBusiness(next) {
		setActiveSlug(next.slug);
		setProductId(next.products[0].id);
	}
	function startCheckout(nextProduct) {
		setProductId(nextProduct.id);
		setStage("checkout");
	}
	function completePurchase() {
		const input = {
			businessId: demoBusinessId(business.slug),
			productName: `${business.name} — ${product.name}`,
			purchasePrice: BigInt(product.priceCents),
			contributionAmount: BigInt(contributionCents),
			contributionOption: optionToEnum[choice],
			clientRef: makeClientRef()
		};
		demoPurchase.mutate(input, { onSuccess: (data) => {
			setResult(data);
			setSavedToPortfolio(false);
			setSaveError(null);
			setStage("confirmed");
		} });
	}
	function saveToPortfolio() {
		if (!result) return;
		setSaveError(null);
		const input = {
			businessId: result.businessId,
			productName: result.productName,
			purchasePrice: result.purchasePrice,
			contributionAmount: result.contributionAmount,
			contributionOption: result.contributionOption,
			clientRef: makeClientRef()
		};
		recordPurchase.mutate(input, {
			onSuccess: () => setSavedToPortfolio(true),
			onError: (error) => setSaveError(saveErrorMessage(error))
		});
	}
	function resetDemo() {
		setStage("browse");
		setResult(null);
		setSavedToPortfolio(false);
		setSaveError(null);
		setChoice("nearestDollar");
		setCustomDollars("2");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "ambient-orb -top-24 left-1/4 size-72 bg-primary/40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "ambient-orb right-0 top-40 size-64 bg-violet/30"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "relative mb-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Round up to own",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Shop six fictional businesses and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-spectrum",
						children: "own a slice"
					})
				] }),
				description: "Pick a product, round up your change, and watch the contribution become ownership. No sign-in needed to try it — save your portfolio with Internet Identity when you're ready.",
				className: "relative"
			}),
			stage === "browse" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowseStage, {
				activeSlug,
				onSelectBusiness: selectBusiness,
				onStartCheckout: startCheckout
			}),
			stage === "checkout" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutStage, {
				business,
				product,
				choice,
				onChoice: setChoice,
				customDollars,
				onCustomDollars: setCustomDollars,
				contributionCents,
				totalCents,
				projectedUnits,
				isPending: demoPurchase.isPending,
				error: demoPurchase.isError ? saveErrorMessage(demoPurchase.error) : null,
				onBack: () => setStage("browse"),
				onConfirm: completePurchase
			}),
			stage === "confirmed" && result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmedStage, {
				result,
				business,
				signedIn,
				savedToPortfolio,
				isSaving: recordPurchase.isPending,
				saveError,
				portfolioUnits: portfolio.data?.totalOwnershipUnits ?? null,
				onSave: saveToPortfolio,
				onReset: resetDemo
			})
		]
	});
}
function BrowseStage({ activeSlug, onSelectBusiness, onStartCheckout }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 sm:grid-cols-2",
			children: demoBusinesses.map((business, index) => {
				const accent = accentStyles[business.accent];
				const isActive = business.slug === activeSlug;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					"data-ocid": `demo.business.${index + 1}`,
					className: cn("group relative flex flex-col overflow-hidden rounded-2xl border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth ease-cinematic hover:-translate-y-0.5", isActive ? accent.ring : "border-border hover:border-border"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": "true",
							className: cn("pointer-events-none absolute -right-10 -top-10 size-28 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40", accent.glow)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("text-[11px] font-semibold uppercase tracking-[0.16em]", accent.text),
									children: business.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 truncate font-display text-lg font-semibold",
									children: business.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessBadge, { isFictional: true })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground",
							children: business.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border/70 bg-background/40 p-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Round-up / purchase"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-0.5 font-numeric text-sm font-semibold text-accent",
								children: formatCurrency(BigInt(business.roundUpCents))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "1-yr ownership"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-0.5 font-numeric text-sm font-semibold text-gold",
								children: formatBps(BigInt(business.projectedOwnershipBps))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: business.products.slice(0, 2).map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-ocid": `demo.product.${index + 1}.${product.id}`,
								onClick: () => {
									onSelectBusiness(business);
									onStartCheckout(product);
								},
								className: "inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium transition-smooth hover:border-primary/50 hover:text-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
										"aria-hidden": "true",
										className: "size-3.5"
									}),
									product.name,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-numeric text-muted-foreground",
										children: formatCurrency(BigInt(product.priceCents))
									})
								]
							}, product.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							className: "mt-3 self-start rounded-full px-0 text-sm text-primary hover:bg-transparent hover:text-primary/80",
							onClick: () => {
								onSelectBusiness(business);
								onStartCheckout(business.products[0]);
							},
							children: [
								"Shop ",
								business.name,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									"aria-hidden": "true",
									className: "size-4"
								})
							]
						})
					]
				}, business.slug);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:sticky lg:top-24 lg:self-start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold",
						children: "How round-ups become ownership"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 space-y-4",
						children: [
							{
								icon: ShoppingBag,
								title: "Buy something you'd buy anyway",
								body: "Every fictional product is priced like a real one."
							},
							{
								icon: Coins,
								title: "Round up your change",
								body: "The spare cents become a voluntary contribution."
							},
							{
								icon: Layers,
								title: "Receive ownership units",
								body: "Units accrue to your simulated portfolio."
							},
							{
								icon: TrendingUp,
								title: "Watch it compound",
								body: "Accelerated projections show a year of shopping."
							}
						].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, {
									"aria-hidden": "true",
									className: "size-4"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: step.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-relaxed text-muted-foreground",
								children: step.body
							})] })]
						}, step.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 rounded-xl border border-border/70 bg-background/40 p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: "All six businesses are fictional. Prices, revenue and ownership are simulated for demonstration only."
						})
					})
				]
			})
		})]
	});
}
function CheckoutStage({ business, product, choice, onChoice, customDollars, onCustomDollars, contributionCents, totalCents, projectedUnits, isPending, error, onBack, onConfirm }) {
	const accent = accentStyles[business.accent];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("text-[11px] font-semibold uppercase tracking-[0.16em]", accent.text),
								children: business.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-xl font-semibold",
								children: product.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: product.blurb
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessBadge, { isFictional: true })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-baseline justify-between border-t border-border/70 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: "Purchase price"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-numeric text-lg font-semibold",
						children: formatCurrency(BigInt(product.priceCents))
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "px-1 text-sm font-semibold",
						children: "Round up your change"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Choose how much spare change to contribute. You can opt out entirely."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-2 sm:grid-cols-2",
						children: roundUpOptions.map((option) => {
							const selected = choice === option.value;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								"data-ocid": `demo.roundup.${option.value}`,
								className: cn("flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-smooth", selected ? "border-primary/60 bg-primary/10" : "border-border bg-background/40 hover:border-border/80"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "roundup",
									value: option.value,
									checked: selected,
									onChange: () => onChoice(option.value),
									className: "mt-0.5 size-4 accent-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-medium",
										children: option.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: option.hint
									})]
								})]
							}, option.value);
						})
					}),
					choice === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "custom-roundup",
							className: "text-xs font-medium text-muted-foreground",
							children: "Custom contribution (USD)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "icon",
									"aria-label": "Decrease custom contribution",
									className: "rounded-full",
									onClick: () => onCustomDollars(String(Math.max(0, (Number.parseFloat(customDollars) || 0) - 1))),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
										"aria-hidden": "true",
										className: "size-4"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "custom-roundup",
									"data-ocid": "demo.custom_input",
									type: "number",
									min: 0,
									step: 1,
									inputMode: "decimal",
									value: customDollars,
									onChange: (event) => onCustomDollars(event.target.value),
									className: "h-10 w-24 rounded-lg border border-input bg-background px-3 text-center font-numeric text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "icon",
									"aria-label": "Increase custom contribution",
									className: "rounded-full",
									onClick: () => onCustomDollars(String((Number.parseFloat(customDollars) || 0) + 1)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
										"aria-hidden": "true",
										className: "size-4"
									})
								})
							]
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:sticky lg:top-24 lg:self-start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card/80 p-5 shadow-elevated backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold",
						children: "Order summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
								label: "Purchase revenue",
								value: formatCurrency(BigInt(product.priceCents)),
								tone: "text-foreground"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
								label: "Investment contribution",
								value: formatCurrency(BigInt(contributionCents)),
								tone: "text-accent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-border/70 pt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
									label: "Total payment",
									value: formatCurrency(BigInt(totalCents)),
									tone: "text-foreground",
									strong: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
								label: "Ownership units gained",
								value: formatNumber(projectedUnits),
								tone: "text-violet"
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						"data-ocid": "demo.error_state",
						className: "mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						"data-ocid": "demo.confirm_button",
						disabled: isPending,
						onClick: onConfirm,
						className: "mt-5 h-12 w-full rounded-full bg-gradient-primary text-base font-semibold text-primary-foreground shadow-glow transition-smooth hover:opacity-95",
						children: [isPending ? "Completing…" : `Pay ${formatCurrency(BigInt(totalCents))}`, !isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							"aria-hidden": "true",
							className: "size-4"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						"data-ocid": "demo.cancel_button",
						onClick: onBack,
						className: "mt-2 w-full rounded-full text-sm text-muted-foreground",
						children: "Back to businesses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-[11px] leading-relaxed text-muted-foreground",
						children: "Simulated checkout — no payment is taken and no real money moves."
					})
				]
			})
		})]
	});
}
function SummaryRow({ label, value, tone, strong = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("font-numeric tabular-nums", tone, strong ? "text-lg font-semibold" : "font-medium"),
			children: value
		})]
	});
}
function ConfirmedStage({ result, business, signedIn, savedToPortfolio, isSaving, saveError, portfolioUnits, onSave, onReset }) {
	const projectedYearUnits = result.projectedOwnershipUnits * 12n;
	const projectedYearBps = result.projectedPercentageBps * 12n;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mt-10 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start gap-4 rounded-2xl border border-primary/40 bg-primary/5 p-6 shadow-glow sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						"aria-hidden": "true",
						className: "size-6"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-ocid": "demo.success_state",
						className: "font-display text-xl font-semibold",
						children: ["Purchase complete — you own a slice of ", business.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							result.productName,
							" · ",
							formatCurrency(result.totalPayment),
							" paid ·",
							" ",
							formatNumber(result.projectedOwnershipUnits),
							" ownership units gained"
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold",
					children: "Your ownership, in four separate figures"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyLegend, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Purchase revenue",
						value: formatCurrency(result.purchasePrice),
						hint: "Paid to the business for the product",
						icon: ShoppingBag,
						tone: "emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Investment contribution",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyValue, { cents: result.contributionAmount }),
						hint: "Your voluntary round-up",
						icon: CircleDollarSign,
						tone: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Ownership gained",
						value: `${formatNumber(result.projectedOwnershipUnits)} units`,
						hint: `${formatBps(result.projectedPercentageBps)} of the pool`,
						icon: Layers,
						tone: "violet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Hypothetical value",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyValue, {
							cents: result.contributionAmount,
							kind: "value"
						}),
						hint: "Simulated, not a real valuation",
						icon: TrendingUp,
						tone: "gold"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								"aria-hidden": "true",
								className: "size-4 text-gold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-semibold",
								children: "Accelerated ownership projection"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "If you shopped here monthly for a year at this round-up level."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/70 bg-background/40 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Units after 12 months"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-numeric text-xl font-semibold text-violet",
									children: formatNumber(projectedYearUnits)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/70 bg-background/40 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Pool share after 12 months"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-numeric text-xl font-semibold text-gold",
									children: formatBps(projectedYearBps)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-2 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-gradient-primary transition-smooth",
								style: { width: `${Math.min(100, Math.max(4, Number(projectedYearBps) / 100))}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: "Projection assumes identical purchases each month and no dilution from other participants."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
							"aria-hidden": "true",
							className: "size-4 text-accent"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-semibold",
							children: "Portfolio impact"
						})]
					}), signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Save this purchase to your Internet Identity portfolio so it counts toward your total ownership."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl border border-border/70 bg-background/40 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Current portfolio units"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-numeric text-xl font-semibold",
								children: portfolioUnits === null ? "—" : formatNumber(portfolioUnits)
							})]
						}),
						savedToPortfolio ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-ocid": "demo.saved_state",
							className: "mt-4 flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								"aria-hidden": "true",
								className: "size-4"
							}), "Saved to your portfolio — first-purchase Founding Credits added"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							"data-ocid": "demo.save_button",
							disabled: isSaving,
							onClick: onSave,
							className: "mt-4 h-11 w-full rounded-full bg-primary font-semibold text-primary-foreground",
							children: isSaving ? "Saving…" : "Save to my portfolio"
						}),
						saveError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							"data-ocid": "demo.save_error_state",
							className: "mt-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
							children: saveError
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Sign in with Internet Identity to save this purchase and track your ownership across every business."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl border border-border/70 bg-background/40 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "This purchase would add"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-numeric text-xl font-semibold text-violet",
								children: [formatNumber(result.projectedOwnershipUnits), " units"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, { className: "mt-4 h-11 w-full rounded-full bg-primary font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 disabled:opacity-60" })
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card/60 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold",
						children: "Keep going"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextStep, {
								to: "/launch",
								icon: Landmark,
								title: "Launch your business DAO",
								body: "Turn a real business into an owner-funded DAO.",
								ocid: "demo.cta.launch"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextStep, {
								to: "/directory",
								icon: Layers,
								title: "Explore the directory",
								body: "Browse registered and fictional businesses.",
								ocid: "demo.cta.directory"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextStep, {
								to: "/early-access",
								icon: Sparkles,
								title: "Join consumer early access",
								body: "Get notified when Round Up to Own goes live.",
								ocid: "demo.cta.early_access"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						"data-ocid": "demo.reset_button",
						onClick: onReset,
						className: "mt-5 rounded-full",
						children: "Try another purchase"
					})
				]
			})
		]
	});
}
function NextStep({ to, icon: Icon, title, body, ocid }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		"data-ocid": ocid,
		className: "group flex flex-col gap-2 rounded-xl border border-border bg-background/40 p-4 transition-smooth hover:-translate-y-0.5 hover:border-primary/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					"aria-hidden": "true",
					className: "size-4"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs leading-relaxed text-muted-foreground",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary",
				children: ["Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					"aria-hidden": "true",
					className: "size-3.5 transition-transform group-hover:translate-x-0.5"
				})]
			})
		]
	});
}
//#endregion
export { DemoPage as default };
