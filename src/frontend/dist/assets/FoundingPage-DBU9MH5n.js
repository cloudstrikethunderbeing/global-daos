import { d as require_react, g as __toESM, n as Button, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as ArrowRight } from "./arrow-right-1IqYNe6f.js";
import { t as BadgeCheck } from "./badge-check-Cvl2XkTn.js";
import { t as Building2 } from "./building-2-u1b-6pzy.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-D8Zi1jQi.js";
import { t as CircleCheck } from "./circle-check-B7_YBaMt.js";
import { t as Compass } from "./compass-C4geBQ-Q.js";
import { t as Crown } from "./crown-xHDBqp_3.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { t as LoaderCircle } from "./loader-circle-Cq00dUZM.js";
import { t as Rocket } from "./rocket-DUIwNvdb.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
import { t as Users } from "./users-VFYNqB8l.js";
import { K as useRegisterFoundingInterest, dt as Link, gt as ShieldCheck } from "./index-Bd2sA-Nq.js";
import { t as SectionHeading } from "./SectionHeading-B7-5gwoS.js";
import { t as Input } from "./input-BOfnj1A0.js";
import { t as Label } from "./label-BRHHlJK-.js";
import { n as errorMessage } from "./errors-BPsygLkv.js";
import { t as Textarea } from "./textarea-ChU4ZABm.js";
//#region src/pages/FoundingPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var INDUSTRIES = [
	"Coffee & cafés",
	"Restaurants & food",
	"Retail & boutique",
	"Fitness & wellness",
	"Beauty & personal care",
	"Grocery & markets",
	"Home services",
	"Creative & media",
	"Other"
];
var BENEFITS = [
	{
		icon: Crown,
		tone: "text-warning",
		title: "Founding badge, permanently",
		body: "Your business is marked as a founding member across the directory, its public profile and every share card."
	},
	{
		icon: Users,
		tone: "text-primary",
		title: "First customers as owners",
		body: "Invite your earliest regulars to round up and own a slice of the business they already love."
	},
	{
		icon: Compass,
		tone: "text-accent",
		title: "Priority launch support",
		body: "Guided setup for your DAO workspace, constitution and cap table when you are ready to go live."
	},
	{
		icon: ShieldCheck,
		tone: "text-chart-3",
		title: "No cost, no commitment",
		body: "Registering interest is free. It does not deploy a DAO, open a wallet or require any payment."
	}
];
var STEPS = [
	{
		title: "Register interest",
		body: "Tell us about your business and how you would like customers to participate."
	},
	{
		title: "We reach out",
		body: "Our team reviews founding applications and walks you through the program."
	},
	{
		title: "Launch when ready",
		body: "Deploy your business DAO workspace on your own timeline — never before you choose to."
	}
];
var EMPTY_FORM = {
	businessName: "",
	contactName: "",
	contactEmail: "",
	industry: "",
	location: "",
	participationInterest: ""
};
function validate(form) {
	const errors = {};
	if (!form.businessName.trim()) errors.businessName = "Enter your business name.";
	if (!form.contactName.trim()) errors.contactName = "Enter a contact name.";
	const email = form.contactEmail.trim();
	if (!email) errors.contactEmail = "Enter a contact email.";
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.contactEmail = "Enter a valid email address.";
	if (!form.industry) errors.industry = "Choose a category.";
	return errors;
}
function FoundingPage() {
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submittedName, setSubmittedName] = (0, import_react.useState)(null);
	const registerInterest = useRegisterFoundingInterest();
	const update = (key, value) => {
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
		setErrors((prev) => prev[key] ? {
			...prev,
			[key]: void 0
		} : prev);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const nextErrors = validate(form);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		const captured = { ...form };
		registerInterest.mutate({
			businessName: captured.businessName.trim(),
			contactName: captured.contactName.trim(),
			contactEmail: captured.contactEmail.trim(),
			industry: captured.industry,
			location: captured.location.trim(),
			participationInterest: captured.participationInterest.trim()
		}, { onSuccess: () => {
			setSubmittedName(captured.businessName.trim());
			setForm(EMPTY_FORM);
		} });
	};
	const backendError = registerInterest.isError ? errorMessage(registerInterest.error) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "ambient-orb -left-24 top-0 size-72 bg-primary/40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "ambient-orb right-0 top-40 size-64 bg-chart-3/30"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
								eyebrow: "Founding Business Program",
								title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Become a",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient-spectrum",
										children: "founding business"
									})
								] }),
								description: "Join the first wave of local businesses that let their own customers own a piece of them. It is free to register interest — no DAO deployment, no payment, no commitment."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
											"aria-hidden": "true",
											className: "size-3.5"
										}), "Free to join"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-semibold text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
											"aria-hidden": "true",
											className: "size-3.5"
										}), "No DAO required"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-semibold text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
											"aria-hidden": "true",
											className: "size-3.5"
										}), "No payment"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 grid gap-4 sm:grid-cols-2",
								children: BENEFITS.map((benefit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:border-primary/40",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(benefit.icon, {
											"aria-hidden": "true",
											className: `size-5 ${benefit.tone}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-3 font-display text-base font-semibold",
											children: benefit.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
											children: benefit.body
										})
									]
								}, benefit.title))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-10 space-y-4",
								children: STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-numeric text-sm font-semibold text-primary",
										children: index + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-sm font-semibold",
										children: step.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-sm text-muted-foreground",
										children: step.body
									})] })]
								}, step.title))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-fade-up lg:sticky lg:top-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl border border-border bg-card/80 p-6 shadow-elevated backdrop-blur sm:p-8",
							children: submittedName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-ocid": "founding.success_state",
								className: "flex flex-col items-center gap-4 py-4 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											"aria-hidden": "true",
											className: "size-7"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl font-semibold",
										children: "You're on the founding list"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										children: [
											"Thanks for registering",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: submittedName
											}),
											". Our team will reach out with next steps. Remember: registering interest does not deploy a DAO and involves no payment."
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex w-full flex-col gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											className: "w-full rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/launch",
												"data-ocid": "founding.launch_link",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, {
													"aria-hidden": "true",
													className: "size-4"
												}), "Launch your business DAO"]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											variant: "outline",
											className: "w-full rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/directory",
												search: (prev) => prev,
												"data-ocid": "founding.directory_link",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
													"aria-hidden": "true",
													className: "size-4"
												}), "Explore the directory"]
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSubmittedName(null),
										"data-ocid": "founding.register_another_button",
										className: "mt-1 text-xs font-medium text-muted-foreground underline-offset-4 transition-smooth hover:text-foreground hover:underline",
										children: "Register another business"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit,
								noValidate: true,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl font-semibold",
										children: "Register your interest"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: "Takes about a minute. No account needed."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "founding-business-name",
												children: "Business name"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "founding-business-name",
												value: form.businessName,
												onChange: (e) => update("businessName", e.target.value),
												placeholder: "e.g. Juniper & Oak Coffee",
												autoComplete: "organization",
												"aria-invalid": !!errors.businessName,
												"aria-describedby": errors.businessName ? "founding-business-name-error" : void 0,
												"data-ocid": "founding.business_name_input"
											}),
											errors.businessName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												id: "founding-business-name-error",
												"data-ocid": "founding.business_name_error",
												className: "text-xs text-destructive",
												children: errors.businessName
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "founding-contact-name",
													children: "Contact name"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "founding-contact-name",
													value: form.contactName,
													onChange: (e) => update("contactName", e.target.value),
													placeholder: "Your full name",
													autoComplete: "name",
													"aria-invalid": !!errors.contactName,
													"aria-describedby": errors.contactName ? "founding-contact-name-error" : void 0,
													"data-ocid": "founding.contact_name_input"
												}),
												errors.contactName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													id: "founding-contact-name-error",
													"data-ocid": "founding.contact_name_error",
													className: "text-xs text-destructive",
													children: errors.contactName
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "founding-contact-email",
													children: "Contact email"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "founding-contact-email",
													type: "email",
													value: form.contactEmail,
													onChange: (e) => update("contactEmail", e.target.value),
													placeholder: "you@business.com",
													autoComplete: "email",
													"aria-invalid": !!errors.contactEmail,
													"aria-describedby": errors.contactEmail ? "founding-contact-email-error" : void 0,
													"data-ocid": "founding.contact_email_input"
												}),
												errors.contactEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													id: "founding-contact-email-error",
													"data-ocid": "founding.contact_email_error",
													className: "text-xs text-destructive",
													children: errors.contactEmail
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "founding-industry",
												children: "Category"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: form.industry,
												onValueChange: (value) => update("industry", value),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													id: "founding-industry",
													"aria-invalid": !!errors.industry,
													"aria-describedby": errors.industry ? "founding-industry-error" : void 0,
													"data-ocid": "founding.industry_select",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a category" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: INDUSTRIES.map((industry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: industry,
													children: industry
												}, industry)) })]
											}),
											errors.industry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												id: "founding-industry-error",
												"data-ocid": "founding.industry_error",
												className: "text-xs text-destructive",
												children: errors.industry
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "founding-location",
											children: [
												"Location",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-normal text-muted-foreground",
													children: "(optional)"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "founding-location",
											value: form.location,
											onChange: (e) => update("location", e.target.value),
											placeholder: "City, region",
											autoComplete: "address-level2",
											"data-ocid": "founding.location_input"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "founding-note",
											children: [
												"Anything else?",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-normal text-muted-foreground",
													children: "(optional)"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "founding-note",
											value: form.participationInterest,
											onChange: (e) => update("participationInterest", e.target.value),
											placeholder: "How would you like your customers to participate?",
											rows: 3,
											"data-ocid": "founding.note_textarea"
										})]
									}),
									backendError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										role: "alert",
										"data-ocid": "founding.error_state",
										className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",
										children: backendError
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: registerInterest.isPending,
										"data-ocid": "founding.submit_button",
										className: "w-full rounded-full",
										children: registerInterest.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"aria-hidden": "true",
											className: "size-4 animate-spin"
										}), "Registering…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Register interest", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											"aria-hidden": "true",
											className: "size-4"
										})] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs leading-relaxed text-muted-foreground",
										children: "Registering interest is free and does not deploy a DAO or involve any payment. We only use your details to follow up about the Founding Business Program."
									})
								]
							})
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { FoundingPage as default };
