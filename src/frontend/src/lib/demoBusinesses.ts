/**
 * Single source of truth for the six fictional demo businesses. The landing,
 * demo and directory pages all read from here so the simulated economy stays
 * consistent. Every business is fictional and must be labeled as such.
 */

export type DemoAccent = "emerald" | "cyan" | "violet" | "gold";

export interface DemoProduct {
  id: string;
  name: string;
  /** Simulated price in USD cents. */
  priceCents: number;
  blurb: string;
}

export interface DemoBusiness {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  /** Simulated trailing-twelve-month revenue in USD cents. */
  annualRevenueCents: number;
  /** Simulated round-up contribution per purchase, in USD cents. */
  roundUpCents: number;
  /** Simulated ownership units granted per $1 contributed. */
  unitsPerDollar: number;
  /** Simulated projected ownership after one year of shopping. */
  projectedOwnershipBps: number;
  location: { city: string; country: string; lat: number; lng: number };
  accent: DemoAccent;
  products: DemoProduct[];
}

export const demoBusinesses: DemoBusiness[] = [
  {
    slug: "aura-atelier",
    name: "Aura Atelier",
    category: "Sustainable fashion",
    tagline: "Circular wardrobe, made to be re-worn.",
    description:
      "A regenerative clothing studio that repairs, re-dyes and resells garments so every piece earns a second life.",
    annualRevenueCents: 1_420_000_00,
    roundUpCents: 87,
    unitsPerDollar: 12,
    projectedOwnershipBps: 184,
    location: { city: "Lisbon", country: "Portugal", lat: 38.72, lng: -9.14 },
    accent: "emerald",
    products: [
      {
        id: "aura-linen-shirt",
        name: "Repaired Linen Shirt",
        priceCents: 6_400,
        blurb: "Restored deadstock linen with visible mending.",
      },
      {
        id: "aura-dye-kit",
        name: "Natural Dye Kit",
        priceCents: 2_800,
        blurb: "Plant-based dyes for at-home garment refresh.",
      },
      {
        id: "aura-tailoring",
        name: "Lifetime Tailoring Pass",
        priceCents: 4_500,
        blurb: "Unlimited fit adjustments for any Aura piece.",
      },
    ],
  },
  {
    slug: "nexus-roasters",
    name: "Nexus Roasters",
    category: "Specialty coffee",
    tagline: "Direct-trade beans, roasted the same week.",
    description:
      "A micro-roastery paying farmers above market and shipping small-batch beans within days of roasting.",
    annualRevenueCents: 980_000_00,
    roundUpCents: 63,
    unitsPerDollar: 14,
    projectedOwnershipBps: 212,
    location: {
      city: "Portland",
      country: "United States",
      lat: 45.52,
      lng: -122.68,
    },
    accent: "cyan",
    products: [
      {
        id: "nexus-subscription",
        name: "Weekly Bean Subscription",
        priceCents: 2_200,
        blurb: "A rotating single-origin bag every week.",
      },
      {
        id: "nexus-grinder",
        name: "Hand Grinder",
        priceCents: 8_900,
        blurb: "Conical burr grinder for consistent cups.",
      },
      {
        id: "nexus-brew-class",
        name: "Brew Methods Class",
        priceCents: 3_500,
        blurb: "Two-hour pour-over and immersion workshop.",
      },
    ],
  },
  {
    slug: "roam-outfitters",
    name: "Roam Outfitters",
    category: "Outdoor gear",
    tagline: "Repairable gear for the long trail.",
    description:
      "An outdoor co-op that rents, repairs and resells expedition gear so equipment never ends up in landfill.",
    annualRevenueCents: 2_150_000_00,
    roundUpCents: 124,
    unitsPerDollar: 10,
    projectedOwnershipBps: 156,
    location: {
      city: "Boulder",
      country: "United States",
      lat: 40.01,
      lng: -105.27,
    },
    accent: "emerald",
    products: [
      {
        id: "roam-pack",
        name: "Modular Trail Pack",
        priceCents: 14_500,
        blurb: "Replaceable straps and panels, 45L.",
      },
      {
        id: "roam-rental",
        name: "Weekend Tent Rental",
        priceCents: 4_200,
        blurb: "Two-person shelter, cleaned and inspected.",
      },
      {
        id: "roam-repair",
        name: "Gear Repair Service",
        priceCents: 1_900,
        blurb: "Zipper, seam and buckle fixes while you wait.",
      },
    ],
  },
  {
    slug: "voxel-studio",
    name: "Voxel Studio",
    category: "Indie games",
    tagline: "Player-owned worlds, built in the open.",
    description:
      "A small game studio sharing revenue with the players who fund and shape its voxel sandbox titles.",
    annualRevenueCents: 1_760_000_00,
    roundUpCents: 99,
    unitsPerDollar: 16,
    projectedOwnershipBps: 238,
    location: { city: "Berlin", country: "Germany", lat: 52.52, lng: 13.4 },
    accent: "violet",
    products: [
      {
        id: "voxel-season",
        name: "Season Pass",
        priceCents: 2_900,
        blurb: "All content drops for the current season.",
      },
      {
        id: "voxel-skin",
        name: "Founder Skin Pack",
        priceCents: 1_200,
        blurb: "Cosmetic set exclusive to early backers.",
      },
      {
        id: "voxel-server",
        name: "Private Server Year",
        priceCents: 5_400,
        blurb: "Host a persistent world for your crew.",
      },
    ],
  },
  {
    slug: "kinetic-fitness",
    name: "Kinetic Fitness",
    category: "Community fitness",
    tagline: "Neighborhood gyms owned by their members.",
    description:
      "A member-owned fitness network where class credits and equipment upgrades are funded by the people who train there.",
    annualRevenueCents: 1_240_000_00,
    roundUpCents: 71,
    unitsPerDollar: 13,
    projectedOwnershipBps: 198,
    location: {
      city: "Melbourne",
      country: "Australia",
      lat: -37.81,
      lng: 144.96,
    },
    accent: "emerald",
    products: [
      {
        id: "kinetic-class-pack",
        name: "10-Class Pack",
        priceCents: 9_500,
        blurb: "Any studio, any format, valid 90 days.",
      },
      {
        id: "kinetic-recovery",
        name: "Recovery Session",
        priceCents: 3_800,
        blurb: "Mobility and sauna recovery block.",
      },
      {
        id: "kinetic-gear",
        name: "Member Training Kit",
        priceCents: 4_600,
        blurb: "Bands, straps and a foam roller.",
      },
    ],
  },
  {
    slug: "vertex-labs",
    name: "Vertex Labs",
    category: "Home energy",
    tagline: "Neighborhood solar, shared and staked.",
    description:
      "A community solar installer letting households buy into shared rooftop arrays and track their clean-energy share.",
    annualRevenueCents: 3_080_000_00,
    roundUpCents: 148,
    unitsPerDollar: 9,
    projectedOwnershipBps: 142,
    location: { city: "Nairobi", country: "Kenya", lat: -1.29, lng: 36.82 },
    accent: "gold",
    products: [
      {
        id: "vertex-audit",
        name: "Home Energy Audit",
        priceCents: 5_200,
        blurb: "Full efficiency assessment and report.",
      },
      {
        id: "vertex-panel-share",
        name: "Rooftop Panel Share",
        priceCents: 18_000,
        blurb: "One panel in a shared community array.",
      },
      {
        id: "vertex-monitor",
        name: "Live Usage Monitor",
        priceCents: 3_100,
        blurb: "Real-time household energy dashboard.",
      },
    ],
  },
];

export function getDemoBusiness(slug: string): DemoBusiness | undefined {
  return demoBusinesses.find((business) => business.slug === slug);
}

export const demoCategories = Array.from(
  new Set(demoBusinesses.map((business) => business.category)),
);
