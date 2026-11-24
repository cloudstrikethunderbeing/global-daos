/**
 * Bridges the fictional demo businesses into the simulated storefront. Demo
 * products have no backend catalogue record, so each one is mapped to a stable
 * synthetic `CatalogueItem` id derived from its slug. The same id is used by the
 * storefront, the cart, the receipt line lookup and the profile item QR codes so
 * a scanned code always resolves to the same product.
 */
import type {
  CartLine,
  CatalogueItem,
  CatalogueItemId,
  DigitalReceipt,
} from "@/backend";
import { ItemKind, PaymentStatus } from "@/backend";
import {
  type DemoBusiness,
  type DemoProduct,
  demoBusinesses,
} from "@/lib/demoBusinesses";

const DEMO_ITEM_BASE = 900_000_000n;

/** Platform fee charged on the simulated subtotal, in basis points (2.5%). */
const PLATFORM_FEE_BPS = 250n;

/** Stable synthetic catalogue id for a demo product, unique per business. */
export function demoItemId(businessSlug: string, productId: string): bigint {
  let hash = 0n;
  for (const char of `${businessSlug}:${productId}`) {
    hash = (hash * 31n + BigInt(char.charCodeAt(0))) % 1_000_000_007n;
  }
  return DEMO_ITEM_BASE + hash;
}

/**
 * Stable synthetic business id for a fictional demo business. The backend demo
 * path accepts an id with no registry record, so a deterministic per-slug id
 * keeps each fictional business's projection distinct without persisting one.
 */
export function demoBusinessId(slug: string): bigint {
  let hash = 0n;
  for (const char of slug) {
    hash = (hash * 31n + BigInt(char.charCodeAt(0))) % 1_000_000_007n;
  }
  return hash + 1n;
}

/** Map a demo product to the `CatalogueItem` shape the storefront renders. */
export function demoCatalogueItem(
  business: DemoBusiness,
  product: DemoProduct,
): CatalogueItem {
  return {
    id: demoItemId(business.slug, product.id),
    active: true,
    businessId: demoBusinessId(business.slug),
    kind: ItemKind.product,
    name: product.name,
    description: product.blurb,
    price: BigInt(product.priceCents),
  };
}

/** Full demo catalogue for a fictional business, in display order. */
export function demoCatalogue(business: DemoBusiness): CatalogueItem[] {
  return business.products.map((product) =>
    demoCatalogueItem(business, product),
  );
}

/** Resolve a demo product from a synthetic catalogue id, if it belongs here. */
export function findDemoItem(
  business: DemoBusiness,
  itemId: CatalogueItemId,
): CatalogueItem | undefined {
  return demoCatalogue(business).find((item) => item.id === itemId);
}

/** Resolve a synthetic demo catalogue id across every fictional business. */
export function findDemoItemById(
  itemId: CatalogueItemId,
): CatalogueItem | undefined {
  for (const business of demoBusinesses) {
    const match = findDemoItem(business, itemId);
    if (match) return match;
  }
  return undefined;
}

/**
 * A fictional demo checkout has no backend receipt record, so its token is the
 * `shop-<slug>-<stamp>` client reference. Rebuild a readable receipt from the
 * demo business's own catalogue so the link always resolves, even after reload.
 * The stamp is the base-36 millisecond timestamp of the purchase, which lets the
 * receipt show the real issue date.
 */
export function demoReceiptFromToken(token: string): DigitalReceipt | null {
  const match = /^shop-(.+)-([a-z0-9]+)$/.exec(token);
  if (!match) return null;
  const business = demoBusinesses.find((entry) => entry.slug === match[1]);
  if (!business) return null;

  const stamp = Number.parseInt(match[2], 36);
  const issuedAtMs = Number.isFinite(stamp) ? stamp : Date.now();

  const lines: CartLine[] = demoCatalogue(business).map((item) => ({
    itemId: item.id,
    quantity: 1n,
  }));
  const revenue = demoCatalogue(business).reduce(
    (sum, item) => sum + item.price,
    0n,
  );
  const platformFee = (revenue * PLATFORM_FEE_BPS) / 10_000n;

  return {
    status: PaymentStatus.paid,
    revenue,
    platformFee,
    businessName: business.name,
    receiptToken: token,
    lines,
    issuedAt: BigInt(issuedAtMs) * 1_000_000n,
    contribution: 0n,
    transactionId: 0n,
  };
}
