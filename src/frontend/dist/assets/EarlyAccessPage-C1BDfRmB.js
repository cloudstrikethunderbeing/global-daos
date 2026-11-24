import { d as require_react, g as __toESM, n as Button, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { t as Award } from "./award-C5x5gwpl.js";
import { t as Building2 } from "./building-2-u1b-6pzy.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-D8Zi1jQi.js";
import { t as CircleCheck } from "./circle-check-B7_YBaMt.js";
import { t as EmptyState } from "./EmptyState-BXNCSIq9.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as MapPin } from "./map-pin-K5PI9Aay.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Store } from "./store-Ct32Fft3.js";
import { B as useRecordConsumerRegistration, Bt as useInternetIdentity, D as useMyNominations, N as useNominateBusiness, P as useNominations, dt as Link, ft as useNavigate, r as useAttributeConsumerReferral } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { t as Input } from "./input-BOfnj1A0.js";
import { t as Label } from "./label-BRHHlJK-.js";
import { n as errorMessage, t as describeBackendError } from "./errors-BPsygLkv.js";
import { i as formatDate } from "./format-9V_VuN1H.js";
import { t as Textarea } from "./textarea-ChU4ZABm.js";
//#region src/pages/EarlyAccessPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var perks = [
	"First access to Round Up to Own checkout",
	"Early invites to founding business drops",
	"A say in which local businesses launch next"
];
var categories = [
	"Coffee & café",
	"Restaurant & bar",
	"Grocery & market",
	"Bakery & deli",
	"Retail & boutique",
	"Fitness & wellness",
	"Salon & barber",
	"Bookshop",
	"Other"
];
var emptyNomination = {
	businessName: "",
	category: "",
	location: ""
};
function resolveError(error) {
	if (error && typeof error === "object" && "__kind__" in error) return describeBackendError(error);
	return errorMessage(error);
}
function FieldError({ id, message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		id,
		role: "alert",
		className: "text-xs font-medium text-destructive",
		children: message
	});
}
function EarlyAccessPage() {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [consumerErrors, setConsumerErrors] = (0, import_react.useState)({});
	const [registered, setRegistered] = (0, import_react.useState)(false);
	const recordRegistration = useRecordConsumerRegistration();
	const navigate = useNavigate();
	const { identity } = useInternetIdentity();
	const signedIn = !!identity && !identity.getPrincipal().isAnonymous();
	const attributeReferral = useAttributeConsumerReferral();
	const attributedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!signedIn || attributedRef.current) return;
		const code = new URLSearchParams(window.location.search).get("ref")?.trim();
		if (!code) return;
		attributedRef.current = true;
		attributeReferral.mutate(code);
	}, [signedIn, attributeReferral]);
	const handleRegister = (event) => {
		event.preventDefault();
		const trimmedName = name.trim();
		const trimmedEmail = email.trim();
		const nextErrors = {};
		if (!trimmedName) nextErrors.name = "Please tell us your name.";
		if (!trimmedEmail) nextErrors.email = "Please enter your email address.";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) nextErrors.email = "That email address doesn't look right.";
		setConsumerErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		recordRegistration.mutate(void 0, { onSuccess: () => {
			setRegistered(true);
			setName("");
			setEmail("");
			setCity("");
			navigate({ to: "/portfolio" });
		} });
	};
	const [nomination, setNomination] = (0, import_react.useState)(emptyNomination);
	const [reason, setReason] = (0, import_react.useState)("");
	const [nominationErrors, setNominationErrors] = (0, import_react.useState)({});
	const [nominated, setNominated] = (0, import_react.useState)(false);
	const nominateBusiness = useNominateBusiness();
	const handleNominate = (event) => {
		event.preventDefault();
		const nextErrors = {};
		if (!nomination.businessName.trim()) nextErrors.businessName = "Which business would you like to nominate?";
		if (!nomination.category) nextErrors.category = "Pick the closest category.";
		setNominationErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		const payload = {
			businessName: nomination.businessName.trim(),
			category: nomination.category,
			location: nomination.location.trim()
		};
		nominateBusiness.mutate(payload, { onSuccess: () => {
			setNominated(true);
			setNomination(emptyNomination);
			setReason("");
		} });
	};
	const nominationsQuery = useNominations();
	const myNominationsQuery = useMyNominations();
	const recent = (nominationsQuery.data ?? []).slice(0, 6);
	const myCount = myNominationsQuery.data?.length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 shadow-elevated backdrop-blur sm:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "ambient-orb -right-16 -top-24 size-64 bg-primary/40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "ambient-orb -bottom-24 left-1/3 size-56 bg-violet/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Consumer early access · free",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Own a slice of what you",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-spectrum",
									children: "already buy"
								})
							] }),
							description: "Join the free waitlist to be first in line when Round Up to Own opens. Round up everyday purchases, earn governance stakes, and help local businesses raise capital from their own customers."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 grid gap-3 sm:grid-cols-3",
							children: perks.map((perk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2.5 rounded-xl border border-border/70 bg-background/40 p-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"aria-hidden": "true",
									className: "mt-0.5 size-4 shrink-0 text-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: perk
								})]
							}, perk))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "consumer-heading",
					className: "flex flex-col rounded-2xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								"aria-hidden": "true",
								className: "size-5"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "consumer-heading",
							className: "font-display text-lg font-semibold",
							children: "Join the waitlist"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Free for consumers. No card, no commitment."
						})] })]
					}), registered ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-ocid": "early_access.success_state",
						className: "flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"aria-hidden": "true",
									className: "size-6"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-semibold",
								children: "You're on the list"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs text-sm text-muted-foreground",
								children: "We'll let you know the moment early access opens. Your early registration Founding Credits are waiting in your dashboard — sign in to view your founding badge, credit balance and member number."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-col items-center gap-2 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "rounded-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/portfolio",
										"data-ocid": "early_access.credits_link",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
											"aria-hidden": "true",
											className: "size-4"
										}), "View Founding Credits"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									className: "rounded-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/demo",
										"data-ocid": "early_access.demo_link",
										children: ["Try the demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											"aria-hidden": "true",
											className: "size-4"
										})]
									})
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleRegister,
						className: "flex flex-1 flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "early-access-name",
										children: "Full name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "early-access-name",
										autoComplete: "name",
										placeholder: "Jordan Rivera",
										value: name,
										onChange: (event) => setName(event.target.value),
										"aria-invalid": !!consumerErrors.name,
										"aria-describedby": consumerErrors.name ? "early-access-name-error" : void 0,
										"data-ocid": "early_access.name_input"
									}),
									consumerErrors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
										id: "early-access-name-error",
										message: consumerErrors.name
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "early-access-email",
										children: "Email address"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "early-access-email",
										type: "email",
										autoComplete: "email",
										placeholder: "you@example.com",
										value: email,
										onChange: (event) => setEmail(event.target.value),
										"aria-invalid": !!consumerErrors.email,
										"aria-describedby": consumerErrors.email ? "early-access-email-error" : void 0,
										"data-ocid": "early_access.email_input"
									}),
									consumerErrors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
										id: "early-access-email-error",
										message: consumerErrors.email
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: "early-access-city",
									children: [
										"City",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-normal text-muted-foreground",
											children: "(optional)"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "early-access-city",
									autoComplete: "address-level2",
									placeholder: "Portland, OR",
									value: city,
									onChange: (event) => setCity(event.target.value),
									"data-ocid": "early_access.city_input"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: recordRegistration.isPending,
								"data-ocid": "early_access.submit_button",
								className: "mt-auto w-full rounded-full",
								children: recordRegistration.isPending ? "Joining…" : "Request early access"
							}),
							recordRegistration.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								"data-ocid": "early_access.error_state",
								className: "text-sm text-destructive",
								children: resolveError(recordRegistration.error)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-relaxed text-muted-foreground",
								children: "No spam. This is a simulated product preview — registering does not create a financial account."
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "nomination-heading",
					className: "flex flex-col rounded-2xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-full bg-violet/15 text-violet",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
								"aria-hidden": "true",
								className: "size-5"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "nomination-heading",
							className: "font-display text-lg font-semibold",
							children: "Nominate a local business"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Tell us who should launch next."
						})] })]
					}), nominated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-ocid": "nomination.success_state",
						className: "flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-12 items-center justify-center rounded-full bg-violet/15 text-violet",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"aria-hidden": "true",
									className: "size-6"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-semibold",
								children: "Nomination received"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs text-sm text-muted-foreground",
								children: "Thanks for the suggestion. Your nomination is now in the running for the next founding business drop."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								className: "mt-2 rounded-full",
								onClick: () => setNominated(false),
								"data-ocid": "nomination.nominate_another_button",
								children: "Nominate another"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleNominate,
						className: "flex flex-1 flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "nomination-name",
										children: "Business name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "nomination-name",
										placeholder: "Corner Roasters",
										value: nomination.businessName,
										onChange: (event) => setNomination((prev) => ({
											...prev,
											businessName: event.target.value
										})),
										"aria-invalid": !!nominationErrors.businessName,
										"aria-describedby": nominationErrors.businessName ? "nomination-name-error" : void 0,
										"data-ocid": "nomination.name_input"
									}),
									nominationErrors.businessName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
										id: "nomination-name-error",
										message: nominationErrors.businessName
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "nomination-category",
											children: "Category"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: nomination.category,
											onValueChange: (value) => setNomination((prev) => ({
												...prev,
												category: value
											})),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												id: "nomination-category",
												"aria-invalid": !!nominationErrors.category,
												"aria-describedby": nominationErrors.category ? "nomination-category-error" : void 0,
												"data-ocid": "nomination.category_select",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose one" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: category,
												children: category
											}, category)) })]
										}),
										nominationErrors.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
											id: "nomination-category-error",
											message: nominationErrors.category
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "nomination-city",
										children: [
											"City",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-normal text-muted-foreground",
												children: "(optional)"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "nomination-city",
										placeholder: "Austin, TX",
										value: nomination.location,
										onChange: (event) => setNomination((prev) => ({
											...prev,
											location: event.target.value
										})),
										"data-ocid": "nomination.city_input"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: "nomination-reason",
									children: [
										"Why this business?",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-normal text-muted-foreground",
											children: "(optional)"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "nomination-reason",
									rows: 3,
									placeholder: "Their regulars would love to own a piece of it.",
									value: reason,
									onChange: (event) => setReason(event.target.value),
									"data-ocid": "nomination.reason_textarea"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: nominateBusiness.isPending,
								"data-ocid": "nomination.submit_button",
								className: "mt-auto w-full rounded-full",
								children: nominateBusiness.isPending ? "Submitting…" : "Submit nomination"
							}),
							nominateBusiness.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								"data-ocid": "nomination.error_state",
								className: "text-sm text-destructive",
								children: resolveError(nominateBusiness.error)
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "recent-heading",
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Community picks",
					title: "Recently nominated businesses",
					description: "Nominations come from consumers like you. The most-nominated businesses are invited into the Founding Business Program.",
					action: myCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
								"aria-hidden": "true",
								className: "size-3.5"
							}),
							"You've nominated ",
							myCount
						]
					}) : void 0
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: nominationsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-ocid": "nominations.loading_state",
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: Array.from({ length: 3 }, (_, i) => `nom-skeleton-${i}`).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 animate-pulse rounded-2xl border border-border bg-card/40" }, id))
					}) : nominationsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-ocid": "nominations.error_state",
						className: "rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive",
						children: "We couldn't load recent nominations. Please refresh to try again."
					}) : recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Store,
						title: "No nominations yet",
						description: "Be the first to put a local business on the map. Use the form above to nominate a favorite."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-ocid": "nominations.list",
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: recent.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							"data-ocid": `nominations.item.${index + 1}`,
							className: "group flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-5 transition-smooth ease-cinematic hover:border-primary/40 hover:bg-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "min-w-0 break-words font-display text-base font-semibold",
									children: item.businessName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 rounded-full bg-violet/15 px-2.5 py-0.5 text-xs font-medium text-violet",
									children: item.category
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
								children: [item.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
										"aria-hidden": "true",
										className: "size-3.5"
									}), item.location]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-numeric",
									children: formatDate(item.createdAt)
								})]
							})]
						}, item.id.toString()))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/demo",
					"data-ocid": "early_access.cta_demo",
					className: "group flex items-center justify-between gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-transparent p-6 transition-smooth ease-cinematic hover:border-primary/60 hover:shadow-glow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
							children: "Try it now"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-lg font-semibold",
							children: "Round Up to Own demo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Run a simulated checkout in under 30 seconds."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						"aria-hidden": "true",
						className: "size-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/founding",
					"data-ocid": "early_access.cta_founding",
					className: "group flex items-center justify-between gap-4 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/15 to-transparent p-6 transition-smooth ease-cinematic hover:border-gold/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-gold",
							children: "For business owners"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-lg font-semibold",
							children: "Founding Business Program"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Raise capital from your own customers."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						"aria-hidden": "true",
						className: "size-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1"
					})]
				})]
			})
		]
	});
}
//#endregion
export { EarlyAccessPage as default };
