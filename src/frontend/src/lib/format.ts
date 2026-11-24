/** Shared formatting helpers. All monetary values are simulated USD cents (bigint). */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** Format backend `Cents` (bigint) as USD. */
export function formatCurrency(cents: bigint): string {
  return usd.format(Number(cents) / 100);
}

/** Compact USD for stat cards, e.g. $148.9M. */
export function formatCurrencyCompact(cents: bigint): string {
  return usdCompact.format(Number(cents) / 100);
}

/** Format a plain number of dollars. */
export function formatDollars(amount: number): string {
  return usd.format(amount);
}

export function formatNumber(value: bigint | number): string {
  return integer.format(Number(value));
}

/** Basis points (bigint) to a percentage string, e.g. 1248n -> "12.48%". */
export function formatBps(bps: bigint): string {
  return `${(Number(bps) / 100).toFixed(2)}%`;
}

/** Convert a Motoko nanosecond timestamp to a Date, or null when invalid. */
export function timestampToDate(timestamp: bigint): Date | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  if (!date) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  if (!date) return "—";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
