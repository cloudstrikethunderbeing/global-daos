import { r as cn, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
//#region src/components/shared/StatCard.tsx
var import_jsx_runtime = require_jsx_runtime();
var toneStyles = {
	emerald: "text-primary",
	cyan: "text-accent",
	gold: "text-warning",
	violet: "text-chart-3"
};
function StatCard({ label, value, hint, icon: Icon, tone = "emerald", trend, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "stat.card",
		className: cn("group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:border-primary/40", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
					children: label
				}), Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					"aria-hidden": "true",
					className: cn("size-4 shrink-0", toneStyles[tone])
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-baseline gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-numeric text-2xl font-semibold tracking-tight md:text-3xl",
					children: value
				}), trend]
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: cn("pointer-events-none absolute -bottom-8 -right-6 size-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40", tone === "emerald" && "bg-primary", tone === "cyan" && "bg-accent", tone === "gold" && "bg-warning", tone === "violet" && "bg-chart-3")
			})
		]
	});
}
//#endregion
export { StatCard as t };
