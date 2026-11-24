import { r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Info = createLucideIcon("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]);
//#endregion
//#region src/components/shared/SimulatedBanner.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Persistent simulated-activity disclaimer. Every financial surface in the app
* is a simulation, so this banner appears on shared shells and key panels.
*
* The surface is solid and theme-aware: a light warning tint with dark
* warning-foreground text in light appearance, and a dark warning tint with
* light text in dark appearance, so the body copy stays legible in both.
*/
function SimulatedBanner({ className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "disclaimer.banner",
		className: cn("flex items-start gap-2.5 rounded-xl border border-warning/40 bg-warning/15 text-sm text-warning-foreground", "dark:border-warning/35 dark:bg-warning/10 dark:text-foreground", compact ? "px-3 py-2" : "px-4 py-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
			"aria-hidden": "true",
			className: cn("mt-0.5 shrink-0 text-warning", compact ? "size-3.5" : "size-4")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "leading-relaxed",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-warning",
					children: "Simulated activity."
				}),
				" ",
				"All ownership, contributions, valuations and returns shown here are fictional demonstrations. No real money moves and nothing here is an investment, security or financial product."
			]
		})]
	});
}
//#endregion
export { SimulatedBanner as t };
