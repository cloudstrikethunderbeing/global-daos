import { r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { n as formatCurrency, r as formatCurrencyCompact } from "./format-9V_VuN1H.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Layers = createLucideIcon("layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
	}]
]);
//#endregion
//#region src/components/shared/CurrencyValue.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Currency display that keeps contributed capital visually distinct from
* estimated value. Contributed capital is rendered in cyan (real, recorded
* input); estimated value is rendered in gold (projected, simulated).
*/
function CurrencyValue({ cents, kind = "contribution", compact = false, className }) {
	const isValue = kind === "value";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ocid": `currency.${kind}`,
		className: cn("font-numeric tabular-nums", isValue ? "text-warning" : "text-accent", className),
		title: isValue ? "Estimated value — simulated projection" : "Contributed capital — recorded contribution",
		children: compact ? formatCurrencyCompact(cents) : formatCurrency(cents)
	});
}
/** Small legend explaining the two currency treatments. */
function CurrencyLegend({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-2 rounded-full bg-accent",
				"aria-hidden": "true"
			}), "Contributed capital"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-2 rounded-full bg-warning",
				"aria-hidden": "true"
			}), "Estimated value (simulated)"]
		})]
	});
}
//#endregion
export { CurrencyValue as n, Layers as r, CurrencyLegend as t };
