import type { BusinessPublic } from "@/backend";
import { BusinessBadge } from "@/components/shared/BusinessBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBusinesses } from "@/hooks/useQueries";
import { demoBusinesses } from "@/lib/demoBusinesses";
import { formatCurrencyCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Compass,
  Globe2,
  MapPin,
  Rocket,
  Search,
  SearchX,
  Sparkles,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

/* ------------------------------- Types ------------------------------- */

type Origin = "all" | "fictional" | "registered";
type FundingStatus = "all" | "open" | "funded";

interface DirectoryEntry {
  key: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  location: { city: string; country: string; lat: number; lng: number };
  isFictional: boolean;
  /** Simulated capital raised, in USD cents. */
  raisedCents: bigint;
  /** Simulated fundraising target, in USD cents. */
  targetCents: bigint;
  progressBps: number;
  accent: "emerald" | "cyan" | "violet" | "gold";
}

const accentRing: Record<DirectoryEntry["accent"], string> = {
  emerald: "bg-primary",
  cyan: "bg-accent",
  violet: "bg-violet",
  gold: "bg-gold",
};

const accentText: Record<DirectoryEntry["accent"], string> = {
  emerald: "text-primary",
  cyan: "text-accent",
  violet: "text-violet",
  gold: "text-gold",
};

/* --------------------------- Data mapping --------------------------- */

/**
 * Registered businesses store a city and country but no coordinates. Map a
 * known country to a sensible centroid so the business still appears on the
 * world map; unknown countries fall back to a stable position derived from the
 * location text so every registered business is always plotted.
 */
const countryCentroids: Record<string, { lat: number; lng: number }> = {
  "united states": { lat: 39.5, lng: -98.35 },
  usa: { lat: 39.5, lng: -98.35 },
  "united kingdom": { lat: 54.0, lng: -2.0 },
  uk: { lat: 54.0, lng: -2.0 },
  canada: { lat: 56.13, lng: -106.35 },
  mexico: { lat: 23.63, lng: -102.55 },
  brazil: { lat: -14.24, lng: -51.93 },
  argentina: { lat: -38.42, lng: -63.62 },
  portugal: { lat: 39.4, lng: -8.22 },
  spain: { lat: 40.46, lng: -3.75 },
  france: { lat: 46.23, lng: 2.21 },
  germany: { lat: 51.17, lng: 10.45 },
  netherlands: { lat: 52.13, lng: 5.29 },
  ireland: { lat: 53.41, lng: -8.24 },
  italy: { lat: 41.87, lng: 12.57 },
  sweden: { lat: 60.13, lng: 18.64 },
  norway: { lat: 60.47, lng: 8.47 },
  denmark: { lat: 56.26, lng: 9.5 },
  poland: { lat: 51.92, lng: 19.15 },
  australia: { lat: -25.27, lng: 133.78 },
  "new zealand": { lat: -40.9, lng: 174.89 },
  japan: { lat: 36.2, lng: 138.25 },
  china: { lat: 35.86, lng: 104.2 },
  india: { lat: 20.59, lng: 78.96 },
  singapore: { lat: 1.35, lng: 103.82 },
  "south korea": { lat: 35.91, lng: 127.77 },
  indonesia: { lat: -0.79, lng: 113.92 },
  "south africa": { lat: -30.56, lng: 22.94 },
  kenya: { lat: -0.02, lng: 37.91 },
  nigeria: { lat: 9.08, lng: 8.68 },
  egypt: { lat: 26.82, lng: 30.8 },
  ghana: { lat: 7.95, lng: -1.02 },
  morocco: { lat: 31.79, lng: -7.09 },
  uae: { lat: 23.42, lng: 53.85 },
  "united arab emirates": { lat: 23.42, lng: 53.85 },
  israel: { lat: 31.05, lng: 34.85 },
  turkey: { lat: 38.96, lng: 35.24 },
  chile: { lat: -35.68, lng: -71.54 },
  colombia: { lat: 4.57, lng: -74.3 },
  peru: { lat: -9.19, lng: -75.02 },
};

function hashToUnit(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

function resolveCoordinates(
  city: string,
  country: string,
): { lat: number; lng: number } {
  const centroid = countryCentroids[country.trim().toLowerCase()];
  if (centroid) return centroid;
  // Stable pseudo-position within a plausible latitude band for unknown places.
  const seed = `${city}|${country}`;
  const lat = -50 + hashToUnit(seed) * 110;
  const lng = -170 + hashToUnit(`${seed}-lng`) * 340;
  return { lat, lng };
}

function toEntry(business: BusinessPublic): DirectoryEntry {
  const target = business.maxFundraisingTarget;
  const raised = business.consumerOwnershipPool;
  const progressBps =
    target > 0n ? Math.min(10000, Number((raised * 10000n) / target)) : 0;
  const coords = resolveCoordinates(business.city, business.country);
  return {
    key: `registered-${business.id.toString()}`,
    name: business.name,
    slug: business.slug,
    category: business.industry,
    tagline: business.description,
    location: {
      city: business.city,
      country: business.country,
      lat: coords.lat,
      lng: coords.lng,
    },
    isFictional: false,
    raisedCents: raised,
    targetCents: target,
    progressBps,
    accent: "emerald",
  };
}

const demoEntries: DirectoryEntry[] = demoBusinesses.map((business) => ({
  key: `fictional-${business.slug}`,
  name: business.name,
  slug: business.slug,
  category: business.category,
  tagline: business.tagline,
  location: business.location,
  isFictional: true,
  raisedCents: BigInt(business.annualRevenueCents),
  targetCents: BigInt(business.annualRevenueCents),
  progressBps: business.projectedOwnershipBps,
  accent: business.accent,
}));

/* ------------------------------ Page ------------------------------ */

export default function DirectoryPage() {
  const rawSearch = useSearch({ strict: false }) as Record<string, unknown>;
  const navigate = useNavigate();
  const { data: registered, isLoading } = useBusinesses();
  const reduceMotion = useReducedMotion();

  const search = useMemo(
    () => ({
      q: typeof rawSearch.q === "string" ? rawSearch.q : "",
      category:
        typeof rawSearch.category === "string" ? rawSearch.category : "all",
      origin:
        rawSearch.origin === "fictional" || rawSearch.origin === "registered"
          ? rawSearch.origin
          : ("all" as Origin),
      status:
        rawSearch.status === "open" || rawSearch.status === "funded"
          ? rawSearch.status
          : ("all" as FundingStatus),
    }),
    [rawSearch],
  );

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  function updateSearch(patch: Partial<typeof search>) {
    void navigate({
      to: "/directory",
      search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }),
      replace: true,
    });
  }

  const entries = useMemo<DirectoryEntry[]>(() => {
    const fromBackend = (registered ?? []).map(toEntry);
    return [...demoEntries, ...fromBackend];
  }, [registered]);

  const categories = useMemo(() => {
    const set = new Set(entries.map((entry) => entry.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [entries]);

  const locations = useMemo(() => {
    const map = new Map<
      string,
      { city: string; country: string; count: number }
    >();
    for (const entry of entries) {
      const id = `${entry.location.city}|${entry.location.country}`;
      const existing = map.get(id);
      if (existing) existing.count += 1;
      else
        map.set(id, {
          city: entry.location.city,
          country: entry.location.country,
          count: 1,
        });
    }
    return Array.from(map.entries())
      .map(([id, value]) => ({ id, ...value }))
      .sort((a, b) => a.city.localeCompare(b.city));
  }, [entries]);

  const filtered = useMemo(() => {
    const query = search.q.trim().toLowerCase();
    return entries.filter((entry) => {
      if (query) {
        const haystack =
          `${entry.name} ${entry.category} ${entry.location.city} ${entry.location.country}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (search.category !== "all" && entry.category !== search.category)
        return false;
      if (search.origin !== "all") {
        if (search.origin === "fictional" && !entry.isFictional) return false;
        if (search.origin === "registered" && entry.isFictional) return false;
      }
      if (search.status !== "all") {
        const funded = entry.progressBps >= 10000;
        if (search.status === "funded" && !funded) return false;
        if (search.status === "open" && funded) return false;
      }
      if (selectedLocation) {
        const id = `${entry.location.city}|${entry.location.country}`;
        if (id !== selectedLocation) return false;
      }
      return true;
    });
  }, [entries, search, selectedLocation]);

  const hasFilters =
    search.q !== "" ||
    search.category !== "all" ||
    search.origin !== "all" ||
    search.status !== "all" ||
    selectedLocation !== null;

  function resetFilters() {
    setSelectedLocation(null);
    updateSearch({ q: "", category: "all", origin: "all", status: "all" });
  }

  return (
    <div
      data-ocid="directory.page"
      className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="ambient-orb -left-24 top-0 size-72 bg-primary/40"
      />
      <div
        aria-hidden="true"
        className="ambient-orb -right-20 top-40 size-64 bg-violet/30"
      />

      <SimulatedBanner className="relative mb-10" />

      <SectionHeading
        eyebrow="Directory"
        title={
          <>
            Explore{" "}
            <span className="text-gradient-spectrum">consumer-owned</span>{" "}
            businesses
          </>
        }
        description="Search, filter and discover businesses raising capital from the customers who shop with them. Fictional demos and registered businesses live side by side — each clearly labeled."
        action={
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-smooth hover:-translate-y-0.5"
          >
            <Link to="/launch" data-ocid="directory.launch_button">
              <Rocket aria-hidden="true" className="size-4" />
              Launch your business DAO
            </Link>
          </Button>
        }
      />

      {/* Controls */}
      <div className="relative mt-10 rounded-2xl border border-border bg-card/60 p-4 shadow-elevated backdrop-blur sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              data-ocid="directory.search_input"
              type="search"
              value={search.q}
              onChange={(event) => updateSearch({ q: event.target.value })}
              placeholder="Search by name, category or city"
              aria-label="Search businesses"
              className="h-11 rounded-full pl-9"
            />
          </div>

          <Select
            value={search.category}
            onValueChange={(value) => updateSearch({ category: value })}
          >
            <SelectTrigger
              data-ocid="directory.category_select"
              aria-label="Filter by category"
              className="h-11 w-full rounded-full md:w-48"
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={search.origin}
            onValueChange={(value) => updateSearch({ origin: value as Origin })}
          >
            <SelectTrigger
              data-ocid="directory.origin_select"
              aria-label="Filter by business type"
              className="h-11 w-full rounded-full md:w-44"
            >
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All businesses</SelectItem>
              <SelectItem value="fictional">Fictional demos</SelectItem>
              <SelectItem value="registered">Registered</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={search.status}
            onValueChange={(value) =>
              updateSearch({ status: value as FundingStatus })
            }
          >
            <SelectTrigger
              data-ocid="directory.status_select"
              aria-label="Filter by funding status"
              className="h-11 w-full rounded-full md:w-44"
            >
              <SelectValue placeholder="Funding" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any funding status</SelectItem>
              <SelectItem value="open">Raising now</SelectItem>
              <SelectItem value="funded">Fully funded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p
            data-ocid="directory.result_count"
            className="text-sm text-muted-foreground"
          >
            <span className="font-numeric font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "business" : "businesses"}
            {selectedLocation && (
              <span className="ml-1">
                in{" "}
                <span className="font-medium text-foreground">
                  {selectedLocation.split("|")[0]}
                </span>
              </span>
            )}
          </p>
          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              data-ocid="directory.reset_button"
              className="rounded-full text-muted-foreground hover:text-foreground"
            >
              <X aria-hidden="true" className="size-3.5" />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="relative mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Results */}
        <div className="min-w-0">
          {isLoading ? (
            <LoadingSkeleton rows={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No businesses match those filters"
              description="Try a broader search, clear a filter, or be the first to launch a business DAO in this space."
              action={
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                    data-ocid="directory.empty_reset_button"
                    className="rounded-full"
                  >
                    Clear filters
                  </Button>
                  <Button
                    asChild
                    className="rounded-full bg-gradient-primary text-primary-foreground"
                  >
                    <Link
                      to="/launch"
                      data-ocid="directory.empty_launch_button"
                    >
                      <Rocket aria-hidden="true" className="size-4" />
                      Launch a business DAO
                    </Link>
                  </Button>
                </div>
              }
            />
          ) : (
            <ul
              data-ocid="directory.list"
              className="grid gap-4 sm:grid-cols-2"
            >
              {filtered.map((entry, index) => (
                <motion.li
                  key={entry.key}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.04, 0.3),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to="/business/$slug"
                    params={{ slug: entry.slug }}
                    data-ocid={`directory.item.${index + 1}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-xl text-background",
                            accentRing[entry.accent],
                          )}
                        >
                          <Building2 className="size-5" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="truncate font-display text-lg font-semibold">
                            {entry.name}
                          </h3>
                          <p className="truncate text-xs uppercase tracking-[0.14em] text-muted-foreground">
                            {entry.category}
                          </p>
                        </div>
                      </div>
                      <BusinessBadge isFictional={entry.isFictional} />
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {entry.tagline}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin aria-hidden="true" className="size-3.5" />
                      <span className="truncate">
                        {entry.location.city}, {entry.location.country}
                      </span>
                    </div>

                    <div className="mt-auto pt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {entry.isFictional
                            ? "Simulated revenue"
                            : "Capital raised"}
                        </span>
                        <span
                          className={cn(
                            "font-numeric font-semibold",
                            accentText[entry.accent],
                          )}
                        >
                          {formatCurrencyCompact(entry.raisedCents)}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            accentRing[entry.accent],
                          )}
                          style={{
                            width: `${Math.max(4, Math.min(100, entry.progressBps / 100))}%`,
                          }}
                        />
                      </div>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        View profile
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* World map */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div
            data-ocid="directory.map_panel"
            className="rounded-2xl border border-border bg-card/60 p-4 shadow-elevated backdrop-blur"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 font-display text-sm font-semibold">
                <Globe2 aria-hidden="true" className="size-4 text-accent" />
                Locations
              </h2>
              {selectedLocation && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLocation(null)}
                  data-ocid="directory.map_clear_button"
                  className="h-7 rounded-full px-2 text-xs text-muted-foreground"
                >
                  <X aria-hidden="true" className="size-3" />
                  Clear
                </Button>
              )}
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-background/60 surface-grid">
              <svg
                viewBox="0 0 360 180"
                role="img"
                aria-label="World map of business locations"
                className="block h-auto w-full"
              >
                <title>Business locations around the world</title>
                <g
                  fill="currentColor"
                  className="text-muted-foreground/25"
                  stroke="currentColor"
                  strokeWidth="0.5"
                >
                  {/* Simplified continental silhouettes */}
                  <path d="M40 40 L95 32 L120 55 L108 80 L80 92 L58 78 L44 60 Z" />
                  <path d="M92 96 L118 92 L126 118 L112 150 L96 138 L88 116 Z" />
                  <path d="M160 34 L205 28 L232 44 L226 62 L196 70 L168 58 Z" />
                  <path d="M172 74 L212 70 L222 100 L206 132 L184 120 L170 96 Z" />
                  <path d="M236 40 L300 34 L322 60 L306 92 L268 96 L244 74 Z" />
                  <path d="M292 108 L322 104 L330 124 L312 138 L294 128 Z" />
                </g>
                {locations.map((location) => {
                  const entry = entries.find(
                    (item) =>
                      `${item.location.city}|${item.location.country}` ===
                      location.id,
                  );
                  if (
                    !entry ||
                    (!entry.location.city && !entry.location.country)
                  )
                    return null;
                  const x = ((entry.location.lng + 180) / 360) * 360;
                  const y = ((90 - entry.location.lat) / 180) * 180;
                  const active = selectedLocation === location.id;
                  return (
                    <g key={location.id}>
                      {active && (
                        <circle
                          cx={x}
                          cy={y}
                          r="9"
                          className="fill-primary/25"
                        />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={active ? 4.5 : 3.5}
                        className={cn(
                          "transition-all",
                          active ? "fill-primary" : "fill-accent",
                        )}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            <ul className="mt-3 max-h-64 space-y-1 overflow-y-auto pr-1">
              {locations.map((location) => {
                const active = selectedLocation === location.id;
                return (
                  <li key={location.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedLocation(active ? null : location.id)
                      }
                      data-ocid="directory.map_marker"
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-smooth",
                        active
                          ? "bg-primary/15 text-foreground"
                          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <MapPin
                          aria-hidden="true"
                          className={cn(
                            "size-3.5 shrink-0",
                            active ? "text-primary" : "text-accent",
                          )}
                        />
                        <span className="truncate">
                          {location.city}
                          <span className="text-muted-foreground">
                            {" "}
                            · {location.country}
                          </span>
                        </span>
                      </span>
                      <span className="font-numeric text-xs">
                        {location.count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
              <Compass aria-hidden="true" className="mt-0.5 size-3 shrink-0" />
              Select a location to filter the directory. Registered businesses
              appear once their founders add a city and country.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-violet/30 bg-violet/10 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-violet">
              <Sparkles aria-hidden="true" className="size-4" />
              Fictional vs registered
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Fictional demos are simulated showcases. Registered businesses are
              real DAOs launched on this platform. Both are labeled on every
              card so you always know what you are looking at.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
