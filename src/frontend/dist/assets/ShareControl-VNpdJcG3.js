import { d as require_react, g as __toESM, n as Button, r as cn, t as createLucideIcon, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as Check } from "./check-B_X7dERu.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Copy = createLucideIcon("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]);
//#endregion
//#region src/components/shared/ShareControl.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Copy-to-clipboard control for share links. Shows a transient confirmation and
* falls back to a selectable input when the clipboard API is unavailable.
*/
function ShareControl({ url, label = "Copy share link", className }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const timer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		if (timer.current) clearTimeout(timer.current);
	}, []);
	const handleCopy = (0, import_react.useCallback)(async () => {
		setFailed(false);
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			if (timer.current) clearTimeout(timer.current);
			timer.current = setTimeout(() => setCopied(false), 2200);
		} catch {
			setFailed(true);
		}
	}, [url]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "share.control",
		className: cn("space-y-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				readOnly: true,
				value: url,
				"aria-label": "Share link",
				"data-ocid": "share.input",
				onFocus: (event) => event.currentTarget.select(),
				className: "min-w-0 flex-1 truncate rounded-full border border-input bg-background px-3.5 py-2 font-mono text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				"data-ocid": "share.copy_button",
				onClick: () => void handleCopy(),
				className: "shrink-0 rounded-full",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					"aria-hidden": "true",
					className: "size-4 text-primary"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					"aria-hidden": "true",
					className: "size-4"
				}), copied ? "Copied" : label]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", {
			"aria-live": "polite",
			"data-ocid": failed ? "share.error_state" : "share.status",
			className: cn("block text-xs", failed ? "text-destructive" : "text-muted-foreground"),
			children: failed ? "Copy failed — select the link above and copy it manually." : copied ? "Link copied to clipboard." : "Anyone with this link can view the shared page."
		})]
	});
}
//#endregion
export { ShareControl as t };
