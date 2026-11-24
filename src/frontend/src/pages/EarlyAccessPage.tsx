import type { CreateNominationInput } from "@/backend";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useAttributeConsumerReferral,
  useMyNominations,
  useNominateBusiness,
  useNominations,
  useRecordConsumerRegistration,
} from "@/hooks/useQueries";
import { describeBackendError, errorMessage } from "@/lib/errors";
import { formatDate } from "@/lib/format";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  MapPin,
  Sparkles,
  Store,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const perks = [
  "First access to Round Up to Own checkout",
  "Early invites to founding business drops",
  "A say in which local businesses launch next",
];

const categories = [
  "Coffee & café",
  "Restaurant & bar",
  "Grocery & market",
  "Bakery & deli",
  "Retail & boutique",
  "Fitness & wellness",
  "Salon & barber",
  "Bookshop",
  "Other",
];

const emptyNomination: CreateNominationInput = {
  businessName: "",
  category: "",
  location: "",
};

function resolveError(error: unknown): string {
  if (error && typeof error === "object" && "__kind__" in error) {
    return describeBackendError(error as { __kind__: string });
  }
  return errorMessage(error);
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

export default function EarlyAccessPage() {
  /* --------------------------- Consumer registration -------------------------- */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [consumerErrors, setConsumerErrors] = useState<{
    name?: string;
    email?: string;
  }>({});
  const [registered, setRegistered] = useState(false);
  const recordRegistration = useRecordConsumerRegistration();
  const navigate = useNavigate();

  /* --------------------------- Referral attribution -------------------------- */
  const { identity } = useInternetIdentity();
  const signedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const attributeReferral = useAttributeConsumerReferral();
  const attributedRef = useRef(false);

  useEffect(() => {
    if (!signedIn || attributedRef.current) return;
    const code = new URLSearchParams(window.location.search).get("ref")?.trim();
    if (!code) return;
    attributedRef.current = true;
    attributeReferral.mutate(code);
  }, [signedIn, attributeReferral]);

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const nextErrors: { name?: string; email?: string } = {};
    if (!trimmedName) nextErrors.name = "Please tell us your name.";
    if (!trimmedEmail) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "That email address doesn't look right.";
    }
    setConsumerErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    recordRegistration.mutate(undefined, {
      onSuccess: () => {
        setRegistered(true);
        setName("");
        setEmail("");
        setCity("");
        // Lead the visitor straight to their Founding Credits dashboard. A
        // signed-in visitor lands on a populated dashboard; an anonymous one is
        // prompted to sign in and then lands there.
        void navigate({ to: "/portfolio" });
      },
    });
  };

  /* ---------------------------- Business nomination --------------------------- */
  const [nomination, setNomination] =
    useState<CreateNominationInput>(emptyNomination);
  const [reason, setReason] = useState("");
  const [nominationErrors, setNominationErrors] = useState<{
    businessName?: string;
    category?: string;
  }>({});
  const [nominated, setNominated] = useState(false);
  const nominateBusiness = useNominateBusiness();

  const handleNominate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: { businessName?: string; category?: string } = {};
    if (!nomination.businessName.trim()) {
      nextErrors.businessName = "Which business would you like to nominate?";
    }
    if (!nomination.category) {
      nextErrors.category = "Pick the closest category.";
    }
    setNominationErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload: CreateNominationInput = {
      businessName: nomination.businessName.trim(),
      category: nomination.category,
      location: nomination.location.trim(),
    };
    nominateBusiness.mutate(payload, {
      onSuccess: () => {
        setNominated(true);
        setNomination(emptyNomination);
        setReason("");
      },
    });
  };

  /* ------------------------------- Recent list -------------------------------- */
  const nominationsQuery = useNominations();
  const myNominationsQuery = useMyNominations();
  const recent = (nominationsQuery.data ?? []).slice(0, 6);
  const myCount = myNominationsQuery.data?.length ?? 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <SimulatedBanner className="mb-10" />

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 shadow-elevated backdrop-blur sm:p-10">
        <div
          aria-hidden="true"
          className="ambient-orb -right-16 -top-24 size-64 bg-primary/40"
        />
        <div
          aria-hidden="true"
          className="ambient-orb -bottom-24 left-1/3 size-56 bg-violet/30"
        />
        <div className="relative">
          <SectionHeading
            eyebrow="Consumer early access · free"
            title={
              <>
                Own a slice of what you{" "}
                <span className="text-gradient-spectrum">already buy</span>
              </>
            }
            description="Join the free waitlist to be first in line when Round Up to Own opens. Round up everyday purchases, earn governance stakes, and help local businesses raise capital from their own customers."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-background/40 p-3 text-sm"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span className="text-muted-foreground">{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Forms */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Consumer registration */}
        <section
          aria-labelledby="consumer-heading"
          className="flex flex-col rounded-2xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur sm:p-8"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Sparkles aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2
                id="consumer-heading"
                className="font-display text-lg font-semibold"
              >
                Join the waitlist
              </h2>
              <p className="text-sm text-muted-foreground">
                Free for consumers. No card, no commitment.
              </p>
            </div>
          </div>

          {registered ? (
            <div
              data-ocid="early_access.success_state"
              className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <CheckCircle2 aria-hidden="true" className="size-6" />
              </span>
              <h3 className="font-display text-xl font-semibold">
                You&apos;re on the list
              </h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                We&apos;ll let you know the moment early access opens. Your
                early registration Founding Credits are waiting in your
                dashboard — sign in to view your founding badge, credit balance
                and member number.
              </p>
              <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row">
                <Button asChild className="rounded-full">
                  <Link to="/portfolio" data-ocid="early_access.credits_link">
                    <Award aria-hidden="true" className="size-4" />
                    View Founding Credits
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/demo" data-ocid="early_access.demo_link">
                    Try the demo
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleRegister}
              className="flex flex-1 flex-col gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="early-access-name">Full name</Label>
                <Input
                  id="early-access-name"
                  autoComplete="name"
                  placeholder="Jordan Rivera"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={!!consumerErrors.name}
                  aria-describedby={
                    consumerErrors.name ? "early-access-name-error" : undefined
                  }
                  data-ocid="early_access.name_input"
                />
                {consumerErrors.name && (
                  <FieldError
                    id="early-access-name-error"
                    message={consumerErrors.name}
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="early-access-email">Email address</Label>
                <Input
                  id="early-access-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={!!consumerErrors.email}
                  aria-describedby={
                    consumerErrors.email
                      ? "early-access-email-error"
                      : undefined
                  }
                  data-ocid="early_access.email_input"
                />
                {consumerErrors.email && (
                  <FieldError
                    id="early-access-email-error"
                    message={consumerErrors.email}
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="early-access-city">
                  City{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="early-access-city"
                  autoComplete="address-level2"
                  placeholder="Portland, OR"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  data-ocid="early_access.city_input"
                />
              </div>
              <Button
                type="submit"
                disabled={recordRegistration.isPending}
                data-ocid="early_access.submit_button"
                className="mt-auto w-full rounded-full"
              >
                {recordRegistration.isPending
                  ? "Joining…"
                  : "Request early access"}
              </Button>
              {recordRegistration.isError && (
                <p
                  role="alert"
                  data-ocid="early_access.error_state"
                  className="text-sm text-destructive"
                >
                  {resolveError(recordRegistration.error)}
                </p>
              )}
              <p className="text-xs leading-relaxed text-muted-foreground">
                No spam. This is a simulated product preview — registering does
                not create a financial account.
              </p>
            </form>
          )}
        </section>

        {/* Business nomination */}
        <section
          aria-labelledby="nomination-heading"
          className="flex flex-col rounded-2xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur sm:p-8"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-violet/15 text-violet">
              <Store aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2
                id="nomination-heading"
                className="font-display text-lg font-semibold"
              >
                Nominate a local business
              </h2>
              <p className="text-sm text-muted-foreground">
                Tell us who should launch next.
              </p>
            </div>
          </div>

          {nominated ? (
            <div
              data-ocid="nomination.success_state"
              className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-violet/15 text-violet">
                <CheckCircle2 aria-hidden="true" className="size-6" />
              </span>
              <h3 className="font-display text-xl font-semibold">
                Nomination received
              </h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                Thanks for the suggestion. Your nomination is now in the running
                for the next founding business drop.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-2 rounded-full"
                onClick={() => setNominated(false)}
                data-ocid="nomination.nominate_another_button"
              >
                Nominate another
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleNominate}
              className="flex flex-1 flex-col gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="nomination-name">Business name</Label>
                <Input
                  id="nomination-name"
                  placeholder="Corner Roasters"
                  value={nomination.businessName}
                  onChange={(event) =>
                    setNomination((prev) => ({
                      ...prev,
                      businessName: event.target.value,
                    }))
                  }
                  aria-invalid={!!nominationErrors.businessName}
                  aria-describedby={
                    nominationErrors.businessName
                      ? "nomination-name-error"
                      : undefined
                  }
                  data-ocid="nomination.name_input"
                />
                {nominationErrors.businessName && (
                  <FieldError
                    id="nomination-name-error"
                    message={nominationErrors.businessName}
                  />
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nomination-category">Category</Label>
                  <Select
                    value={nomination.category}
                    onValueChange={(value) =>
                      setNomination((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger
                      id="nomination-category"
                      aria-invalid={!!nominationErrors.category}
                      aria-describedby={
                        nominationErrors.category
                          ? "nomination-category-error"
                          : undefined
                      }
                      data-ocid="nomination.category_select"
                    >
                      <SelectValue placeholder="Choose one" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {nominationErrors.category && (
                    <FieldError
                      id="nomination-category-error"
                      message={nominationErrors.category}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nomination-city">
                    City{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="nomination-city"
                    placeholder="Austin, TX"
                    value={nomination.location}
                    onChange={(event) =>
                      setNomination((prev) => ({
                        ...prev,
                        location: event.target.value,
                      }))
                    }
                    data-ocid="nomination.city_input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomination-reason">
                  Why this business?{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="nomination-reason"
                  rows={3}
                  placeholder="Their regulars would love to own a piece of it."
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  data-ocid="nomination.reason_textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={nominateBusiness.isPending}
                data-ocid="nomination.submit_button"
                className="mt-auto w-full rounded-full"
              >
                {nominateBusiness.isPending
                  ? "Submitting…"
                  : "Submit nomination"}
              </Button>
              {nominateBusiness.isError && (
                <p
                  role="alert"
                  data-ocid="nomination.error_state"
                  className="text-sm text-destructive"
                >
                  {resolveError(nominateBusiness.error)}
                </p>
              )}
            </form>
          )}
        </section>
      </div>

      {/* Recent nominations */}
      <section aria-labelledby="recent-heading" className="mt-14">
        <SectionHeading
          eyebrow="Community picks"
          title="Recently nominated businesses"
          description="Nominations come from consumers like you. The most-nominated businesses are invited into the Founding Business Program."
          action={
            myCount > 0 ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <Building2 aria-hidden="true" className="size-3.5" />
                You&apos;ve nominated {myCount}
              </span>
            ) : undefined
          }
        />

        <div className="mt-6">
          {nominationsQuery.isLoading ? (
            <div
              data-ocid="nominations.loading_state"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {Array.from({ length: 3 }, (_, i) => `nom-skeleton-${i}`).map(
                (id) => (
                  <div
                    key={id}
                    className="h-28 animate-pulse rounded-2xl border border-border bg-card/40"
                  />
                ),
              )}
            </div>
          ) : nominationsQuery.isError ? (
            <div
              data-ocid="nominations.error_state"
              className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive"
            >
              We couldn&apos;t load recent nominations. Please refresh to try
              again.
            </div>
          ) : recent.length === 0 ? (
            <EmptyState
              icon={Store}
              title="No nominations yet"
              description="Be the first to put a local business on the map. Use the form above to nominate a favorite."
            />
          ) : (
            <ul
              data-ocid="nominations.list"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {recent.map((item, index) => (
                <li
                  key={item.id.toString()}
                  data-ocid={`nominations.item.${index + 1}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-5 transition-smooth ease-cinematic hover:border-primary/40 hover:bg-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 break-words font-display text-base font-semibold">
                      {item.businessName}
                    </h3>
                    <span className="shrink-0 rounded-full bg-violet/15 px-2.5 py-0.5 text-xs font-medium text-violet">
                      {item.category}
                    </span>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {item.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin aria-hidden="true" className="size-3.5" />
                        {item.location}
                      </span>
                    )}
                    <span className="font-numeric">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Calls to action */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <Link
          to="/demo"
          data-ocid="early_access.cta_demo"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-transparent p-6 transition-smooth ease-cinematic hover:border-primary/60 hover:shadow-glow"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Try it now
            </p>
            <p className="mt-1 font-display text-lg font-semibold">
              Round Up to Own demo
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Run a simulated checkout in under 30 seconds.
            </p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="size-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
        <Link
          to="/founding"
          data-ocid="early_access.cta_founding"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/15 to-transparent p-6 transition-smooth ease-cinematic hover:border-gold/60"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              For business owners
            </p>
            <p className="mt-1 font-display text-lg font-semibold">
              Founding Business Program
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Raise capital from your own customers.
            </p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="size-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
