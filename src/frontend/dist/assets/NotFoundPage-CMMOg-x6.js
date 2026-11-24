import { n as Button, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
import { t as Compass } from "./compass-C4geBQ-Q.js";
import { t as SimulatedBanner } from "./SimulatedBanner-DriUcgqi.js";
import { dt as Link } from "./index-Bd2sA-Nq.js";
//#region src/pages/NotFoundPage.tsx
var import_jsx_runtime = require_jsx_runtime();
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "page.not_found",
		className: "mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-5 px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedBanner, { className: "mb-10 w-full text-left" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
					"aria-hidden": "true",
					className: "size-7"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold tracking-tight",
					children: "This page drifted off the map"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "The page you were looking for does not exist. Head back to the directory to keep exploring."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/directory",
					search: {},
					"data-ocid": "not_found.primary_button",
					children: "Browse the directory"
				})
			})
		]
	});
}
//#endregion
export { NotFoundPage as default };
