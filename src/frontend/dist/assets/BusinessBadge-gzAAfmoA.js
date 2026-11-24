import { r as cn, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as BadgeCheck } from "./badge-check-Cvl2XkTn.js";
import { t as Sparkles } from "./sparkles-BUZvYrdR.js";
//#region src/components/shared/BusinessBadge.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Distinguishes a fictional demo business from a registered one. Fictional
* businesses are clearly labeled so visitors never mistake them for real
* companies.
*/
function BusinessBadge({ isFictional, className }) {
	if (isFictional) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ocid": "business.badge.fictional",
		className: cn("inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
			"aria-hidden": "true",
			className: "size-3"
		}), "Fictional"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ocid": "business.badge.registered",
		className: cn("inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
			"aria-hidden": "true",
			className: "size-3"
		}), "Registered"]
	});
}
//#endregion
export { BusinessBadge as t };
