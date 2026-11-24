//#region src/lib/format.ts
/** Shared formatting helpers. All monetary values are simulated USD cents (bigint). */
var usd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 2
});
var usdCompact = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	notation: "compact",
	maximumFractionDigits: 1
});
var integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
/** Format backend `Cents` (bigint) as USD. */
function formatCurrency(cents) {
	return usd.format(Number(cents) / 100);
}
/** Compact USD for stat cards, e.g. $148.9M. */
function formatCurrencyCompact(cents) {
	return usdCompact.format(Number(cents) / 100);
}
/** Format a plain number of dollars. */
function formatDollars(amount) {
	return usd.format(amount);
}
function formatNumber(value) {
	return integer.format(Number(value));
}
/** Basis points (bigint) to a percentage string, e.g. 1248n -> "12.48%". */
function formatBps(bps) {
	return `${(Number(bps) / 100).toFixed(2)}%`;
}
/** Convert a Motoko nanosecond timestamp to a Date, or null when invalid. */
function timestampToDate(timestamp) {
	const date = new Date(Number(timestamp / 1000000n));
	return Number.isNaN(date.getTime()) ? null : date;
}
function formatDate(timestamp) {
	const date = timestampToDate(timestamp);
	if (!date) return "—";
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function formatDateTime(timestamp) {
	const date = timestampToDate(timestamp);
	if (!date) return "—";
	return date.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
//#endregion
export { formatDateTime as a, slugify as c, formatDate as i, formatCurrency as n, formatDollars as o, formatCurrencyCompact as r, formatNumber as s, formatBps as t };
