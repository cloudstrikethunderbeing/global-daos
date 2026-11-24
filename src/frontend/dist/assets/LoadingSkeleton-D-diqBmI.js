import { r as cn, u as require_jsx_runtime } from "./createLucideIcon-SKDJ6oLf.js";
//#region src/components/ui/skeleton.tsx
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "skeleton",
		className: cn("bg-accent animate-pulse rounded-md", className),
		...props
	});
}
//#endregion
//#region src/components/shared/LoadingSkeleton.tsx
/** Layout-matched loading skeleton for cards and lists. */
function LoadingSkeleton({ rows = 3, variant = "card", className }) {
	const ids = Array.from({ length: rows }, (_, i) => `skeleton-${i}`);
	if (variant === "stat") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "loading_state",
		className: cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className),
		children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border bg-card/60 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-24" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-4 h-8 w-32" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-3 h-3 w-20" })
			]
		}, id))
	});
	if (variant === "list") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "loading_state",
		className: cn("space-y-3", className),
		children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 rounded-xl border border-border bg-card/60 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-10 shrink-0 rounded-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-1/3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-1/2" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-16" })
			]
		}, id))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "loading_state",
		className: cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className),
		children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 rounded-2xl border border-border bg-card/60 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 w-full rounded-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-2/3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-1/2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full rounded-full" })
			]
		}, id))
	});
}
//#endregion
export { LoadingSkeleton as t };
