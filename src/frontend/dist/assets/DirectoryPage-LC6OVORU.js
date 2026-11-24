import { d as require_react, g as __toESM, n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { t as Building2 } from "./building-2-u1b-6pzy.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-D8Zi1jQi.js";
import { t as Compass } from "./compass-C4geBQ-Q.js";
import { t as Earth } from "./earth-F2vMVOAU.js";
import { t as EmptyState } from "./EmptyState-BXNCSIq9.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as MapPin } from "./map-pin-K5PI9Aay.js";
import { t as Rocket } from "./rocket-DUIwNvdb.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { c as useBusinesses, dt as Link, ft as useNavigate, ht as X, pt as useSearch, tt as demoBusinesses } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { t as Input } from "./input-BOfnj1A0.js";
import { r as formatCurrencyCompact } from "./format-9V_VuN1H.js";
import { t as LoadingSkeleton } from "./LoadingSkeleton-D-diqBmI.js";
import { t as BusinessBadge } from "./BusinessBadge-gzAAfmoA.js";
import { t as motion } from "./proxy-3lbWeVuX.js";
import { t as useReducedMotion } from "./use-reduced-motion-DjRxHvHP.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SearchX = createLucideIcon("search-x", [
	["path", {
		d: "m13.5 8.5-5 5",
		key: "1cs55j"
	}],
	["path", {
		d: "m8.5 8.5 5 5",
		key: "a8mexj"
	}],
	["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}],
	["path", {
		d: "m21 21-4.3-4.3",
		key: "1qie3q"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
//#endregion
//#region src/pages/DirectoryPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var accentRing = {
	emerald: "bg-primary",
	cyan: "bg-accent",
	violet: "bg-violet",
	gold: "bg-gold"
};
var accentText = {
	emerald: "text-primary",
	cyan: "text-accent",
	violet: "text-violet",
	gold: "text-gold"
};
/**
* Registered businesses store a city and country but no coordinates. Map a
* known country to a sensible centroid so the business still appears on the
* world map; unknown countries fall back to a stable position derived from the
* location text so every registered business is always plotted.
*/
var countryCentroids = {
	"united states": {
		lat: 39.5,
		lng: -98.35
	},
	usa: {
		lat: 39.5,
		lng: -98.35
	},
	"united kingdom": {
		lat: 54,
		lng: -2
	},
	uk: {
		lat: 54,
		lng: -2
	},
	canada: {
		lat: 56.13,
		lng: -106.35
	},
	mexico: {
		lat: 23.63,
		lng: -102.55
	},
	brazil: {
		lat: -14.24,
		lng: -51.93
	},
	argentina: {
		lat: -38.42,
		lng: -63.62
	},
	portugal: {
		lat: 39.4,
		lng: -8.22
	},
	spain: {
		lat: 40.46,
		lng: -3.75
	},
	france: {
		lat: 46.23,
		lng: 2.21
	},
	germany: {
		lat: 51.17,
		lng: 10.45
	},
	netherlands: {
		lat: 52.13,
		lng: 5.29
	},
	ireland: {
		lat: 53.41,
		lng: -8.24
	},
	italy: {
		lat: 41.87,
		lng: 12.57
	},
	sweden: {
		lat: 60.13,
		lng: 18.64
	},
	norway: {
		lat: 60.47,
		lng: 8.47
	},
	denmark: {
		lat: 56.26,
		lng: 9.5
	},
	poland: {
		lat: 51.92,
		lng: 19.15
	},
	australia: {
		lat: -25.27,
		lng: 133.78
	},
	"new zealand": {
		lat: -40.9,
		lng: 174.89
	},
	japan: {
		lat: 36.2,
		lng: 138.25
	},
	china: {
		lat: 35.86,
		lng: 104.2
	},
	india: {
		lat: 20.59,
		lng: 78.96
	},
	singapore: {
		lat: 1.35,
		lng: 103.82
	},
	"south korea": {
		lat: 35.91,
		lng: 127.77
	},
	indonesia: {
		lat: -.79,
		lng: 113.92
	},
	"south africa": {
		lat: -30.56,
		lng: 22.94
	},
	kenya: {
		lat: -.02,
		lng: 37.91
	},
	nigeria: {
		lat: 9.08,
		lng: 8.68
	},
	egypt: {
		lat: 26.82,
		lng: 30.8
	},
	ghana: {
		lat: 7.95,
		lng: -1.02
	},
	morocco: {
		lat: 31.79,
		lng: -7.09
	},
	uae: {
		lat: 23.42,
		lng: 53.85
	},
	"united arab emirates": {
		lat: 23.42,
		lng: 53.85
	},
	israel: {
		lat: 31.05,
		lng: 34.85
	},
	turkey: {
		lat: 38.96,
		lng: 35.24
	},
	chile: {
		lat: -35.68,
		lng: -71.54
	},
	colombia: {
		lat: 4.57,
		lng: -74.3
	},
	peru: {
		lat: -9.19,
		lng: -75.02
	}
};
function hashToUnit(text) {
	let hash = 0;
	for (let i = 0; i < text.length; i += 1) hash = hash * 31 + text.charCodeAt(i) | 0;
	return Math.abs(hash) % 1e3 / 1e3;
}
function resolveCoordinates(city, country) {
	const centroid = countryCentroids[country.trim().toLowerCase()];
	if (centroid) return centroid;
	const seed = `${city}|${country}`;
	return {
		lat: -50 + hashToUnit(seed) * 110,
		lng: -170 + hashToUnit(`${seed}-lng`) * 340
	};
}
function toEntry(business) {
	const target = business.maxFundraisingTarget;
	const raised = business.consumerOwnershipPool;
	const progressBps = target > 0n ? Math.min(1e4, Number(raised * 10000n / target)) : 0;
	const coords = resolveCoordinates(business.city, business.country);
	return {
		key: `registered-${business.id.toString()}`,
		name: business.name,
		slug: business.slug,
		category: business.industry,
		tagline: business.description,
		location: {
			city: business.city,
			country: business.country,
			lat: coords.lat,
			lng: coords.lng
		},
		isFictional: false,
		raisedCents: raised,
		targetCents: target,
		progressBps,
		accent: "emerald"
	};
}
var demoEntries = demoBusinesses.map((business) => ({
	key: `fictional-${business.slug}`,
	name: business.name,
	slug: business.slug,
	category: business.category,
	tagline: business.tagline,
	location: business.location,
	isFictional: true,
	raisedCents: BigInt(business.annualRevenueCents),
	targetCents: BigInt(business.annualRevenueCents),
	progressBps: business.projectedOwnershipBps,
	accent: business.accent
}));
function DirectoryPage() {
	const rawSearch = useSearch({ strict: false });
	const navigate = useNavigate();
	const { data: registered, isLoading } = useBusinesses();
	const reduceMotion = useReducedMotion();
	const search = (0, import_react.useMemo)(() => ({
		q: typeof rawSearch.q === "string" ? rawSearch.q : "",
		category: typeof rawSearch.category === "string" ? rawSearch.category : "all",
		origin: rawSearch.origin === "fictional" || rawSearch.origin === "registered" ? rawSearch.origin : "all",
		status: rawSearch.status === "open" || rawSearch.status === "funded" ? rawSearch.status : "all"
	}), [rawSearch]);
	const [selectedLocation, setSelectedLocation] = (0, import_react.useState)(null);
	function updateSearch(patch) {
		navigate({
			to: "/directory",
			search: (prev) => ({
				...prev,
				...patch
			}),
			replace: true
		});
	}
	const entries = (0, import_react.useMemo)(() => {
		const fromBackend = (registered ?? []).map(toEntry);
		return [...demoEntries, ...fromBackend];
	}, [registered]);
	const categories = (0, import_react.useMemo)(() => {
		const set = new Set(entries.map((entry) => entry.category));
		return Array.from(set).sort((a, b) => a.localeCompare(b));
	}, [entries]);
	const locations = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const entry of entries) {
			const id = `${entry.location.city}|${entry.location.country}`;
			const existing = map.get(id);
			if (existing) existing.count += 1;
			else map.set(id, {
				city: entry.location.city,
				country: entry.location.country,
				count: 1
			});
		}
		return Array.from(map.entries()).map(([id, value]) => ({
			id,
			...value
		})).sort((a, b) => a.city.localeCompare(b.city));
	}, [entries]);
	const filtered = (0, import_react.useMemo)(() => {
		const query = search.q.trim().toLowerCase();
		return entries.filter((entry) => {
			if (query) {
				if (!`${entry.name} ${entry.category} ${entry.location.city} ${entry.location.country}`.toLowerCase().includes(query)) return false;
			}
			if (search.category !== "all" && entry.category !== search.category) return false;
			if (search.origin !== "all") {
				if (search.origin === "fictional" && !entry.isFictional) return false;
				if (search.origin === "registered" && entry.isFictional) return false;
			}
			if (search.status !== "all") {
				const funded = entry.progressBps >= 1e4;
				if (search.status === "funded" && !funded) return false;
				if (search.status === "open" && funded) return false;
			}
			if (selectedLocation) {
				if (`${entry.location.city}|${entry.location.country}` !== selectedLocation) return false;
			}
			return true;
		});
	}, [
		entries,
		search,
		selectedLocation
	]);
	const hasFilters = search.q !== "" || search.category !== "all" || search.origin !== "all" || search.status !== "all" || selectedLocation !== null;
	function resetFilters() {
		setSelectedLocation(null);
		updateSearch({
			q: "",
			category: "all",
			origin: "all",
			status: "all"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "directory.page",
		className: "relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "ambient-orb -left-24 top-0 size-72 bg-primary/40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "ambient-orb -right-20 top-40 size-64 bg-violet/30"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "relative mb-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Directory",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Explore",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-spectrum",
						children: "consumer-owned"
					}),
					" ",
					"businesses"
				] }),
				description: "Search, filter and discover businesses raising capital from the customers who shop with them. Fictional demos and registered businesses live side by side — each clearly labeled.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					className: "rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-smooth hover:-translate-y-0.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/launch",
						"data-ocid": "directory.launch_button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, {
							"aria-hidden": "true",
							className: "size-4"
						}), "Launch your business DAO"]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-10 rounded-2xl border border-border bg-card/60 p-4 shadow-elevated backdrop-blur sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"aria-hidden": "true",
								className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-ocid": "directory.search_input",
								type: "search",
								value: search.q,
								onChange: (event) => updateSearch({ q: event.target.value }),
								placeholder: "Search by name, category or city",
								"aria-label": "Search businesses",
								className: "h-11 rounded-full pl-9"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: search.category,
							onValueChange: (value) => updateSearch({ category: value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-ocid": "directory.category_select",
								"aria-label": "Filter by category",
								className: "h-11 w-full rounded-full md:w-48",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Category" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All categories"
							}), categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: category,
								children: category
							}, category))] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: search.origin,
							onValueChange: (value) => updateSearch({ origin: value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-ocid": "directory.origin_select",
								"aria-label": "Filter by business type",
								className: "h-11 w-full rounded-full md:w-44",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Type" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All businesses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "fictional",
									children: "Fictional demos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "registered",
									children: "Registered"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: search.status,
							onValueChange: (value) => updateSearch({ status: value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-ocid": "directory.status_select",
								"aria-label": "Filter by funding status",
								className: "h-11 w-full rounded-full md:w-44",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Funding" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "Any funding status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "open",
									children: "Raising now"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "funded",
									children: "Fully funded"
								})
							] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-ocid": "directory.result_count",
						className: "text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-numeric font-semibold text-foreground",
								children: filtered.length
							}),
							" ",
							filtered.length === 1 ? "business" : "businesses",
							selectedLocation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1",
								children: [
									"in",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: selectedLocation.split("|")[0]
									})
								]
							})
						]
					}), hasFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: resetFilters,
						"data-ocid": "directory.reset_button",
						className: "rounded-full text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"aria-hidden": "true",
							className: "size-3.5"
						}), "Clear filters"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, { rows: 6 }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: SearchX,
						title: "No businesses match those filters",
						description: "Try a broader search, clear a filter, or be the first to launch a business DAO in this space.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: resetFilters,
								"data-ocid": "directory.empty_reset_button",
								className: "rounded-full",
								children: "Clear filters"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "rounded-full bg-gradient-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/launch",
									"data-ocid": "directory.empty_launch_button",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, {
										"aria-hidden": "true",
										className: "size-4"
									}), "Launch a business DAO"]
								})
							})]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-ocid": "directory.list",
						className: "grid gap-4 sm:grid-cols-2",
						children: filtered.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.li, {
							initial: reduceMotion ? false : {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .4,
								delay: Math.min(index * .04, .3),
								ease: [
									.16,
									1,
									.3,
									1
								]
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/business/$slug",
								params: { slug: entry.slug },
								"data-ocid": `directory.item.${index + 1}`,
								className: "group flex h-full flex-col rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex min-w-0 items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": "true",
												className: cn("flex size-10 shrink-0 items-center justify-center rounded-xl text-background", accentRing[entry.accent]),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "truncate font-display text-lg font-semibold",
													children: entry.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-xs uppercase tracking-[0.14em] text-muted-foreground",
													children: entry.category
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessBadge, { isFictional: entry.isFictional })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground",
										children: entry.tagline
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center gap-1.5 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
											"aria-hidden": "true",
											className: "size-3.5"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "truncate",
											children: [
												entry.location.city,
												", ",
												entry.location.country
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto pt-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: entry.isFictional ? "Simulated revenue" : "Capital raised"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("font-numeric font-semibold", accentText[entry.accent]),
													children: formatCurrencyCompact(entry.raisedCents)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: cn("h-full rounded-full", accentRing[entry.accent]),
													style: { width: `${Math.max(4, Math.min(100, entry.progressBps / 100))}%` }
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary",
												children: ["View profile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
													"aria-hidden": "true",
													className: "size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
												})]
											})
										]
									})
								]
							})
						}, entry.key))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "lg:sticky lg:top-24 lg:self-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-ocid": "directory.map_panel",
						className: "rounded-2xl border border-border bg-card/60 p-4 shadow-elevated backdrop-blur",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-2 font-display text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {
										"aria-hidden": "true",
										className: "size-4 text-accent"
									}), "Locations"]
								}), selectedLocation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setSelectedLocation(null),
									"data-ocid": "directory.map_clear_button",
									className: "h-7 rounded-full px-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										"aria-hidden": "true",
										className: "size-3"
									}), "Clear"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative overflow-hidden rounded-xl border border-border bg-background/60 surface-grid",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 360 180",
									role: "img",
									"aria-label": "World map of business locations",
									className: "block h-auto w-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Business locations around the world" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											fill: "currentColor",
											className: "text-muted-foreground/25",
											stroke: "currentColor",
											strokeWidth: "0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M40 40 L95 32 L120 55 L108 80 L80 92 L58 78 L44 60 Z" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M92 96 L118 92 L126 118 L112 150 L96 138 L88 116 Z" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160 34 L205 28 L232 44 L226 62 L196 70 L168 58 Z" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M172 74 L212 70 L222 100 L206 132 L184 120 L170 96 Z" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M236 40 L300 34 L322 60 L306 92 L268 96 L244 74 Z" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M292 108 L322 104 L330 124 L312 138 L294 128 Z" })
											]
										}),
										locations.map((location) => {
											const entry = entries.find((item) => `${item.location.city}|${item.location.country}` === location.id);
											if (!entry || !entry.location.city && !entry.location.country) return null;
											const x = (entry.location.lng + 180) / 360 * 360;
											const y = (90 - entry.location.lat) / 180 * 180;
											const active = selectedLocation === location.id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: x,
												cy: y,
												r: "9",
												className: "fill-primary/25"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: x,
												cy: y,
												r: active ? 4.5 : 3.5,
												className: cn("transition-all", active ? "fill-primary" : "fill-accent")
											})] }, location.id);
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 max-h-64 space-y-1 overflow-y-auto pr-1",
								children: locations.map((location) => {
									const active = selectedLocation === location.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSelectedLocation(active ? null : location.id),
										"data-ocid": "directory.map_marker",
										"aria-pressed": active,
										className: cn("flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-smooth", active ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex min-w-0 items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												"aria-hidden": "true",
												className: cn("size-3.5 shrink-0", active ? "text-primary" : "text-accent")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "truncate",
												children: [location.city, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-muted-foreground",
													children: [
														" ",
														"· ",
														location.country
													]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-numeric text-xs",
											children: location.count
										})]
									}) }, location.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
									"aria-hidden": "true",
									className: "mt-0.5 size-3 shrink-0"
								}), "Select a location to filter the directory. Registered businesses appear once their founders add a city and country."]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl border border-violet/30 bg-violet/10 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-sm font-semibold text-violet",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								"aria-hidden": "true",
								className: "size-4"
							}), "Fictional vs registered"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
							children: "Fictional demos are simulated showcases. Registered businesses are real DAOs launched on this platform. Both are labeled on every card so you always know what you are looking at."
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { DirectoryPage as default };
