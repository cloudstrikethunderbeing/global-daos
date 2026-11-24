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
import { useRegisterFoundingInterest } from "@/hooks/useQueries";
import { errorMessage } from "@/lib/errors";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Compass,
  Crown,
  Loader2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";

const INDUSTRIES = [
  "Coffee & cafés",
  "Restaurants & food",
  "Retail & boutique",
  "Fitness & wellness",
  "Beauty & personal care",
  "Grocery & markets",
  "Home services",
  "Creative & media",
  "Other",
] as const;

const BENEFITS = [
  {
    icon: Crown,
    tone: "text-warning",
    title: "Founding badge, permanently",
    body: "Your business is marked as a founding member across the directory, its public profile and every share card.",
  },
  {
    icon: Users,
    tone: "text-primary",
    title: "First customers as owners",
    body: "Invite your earliest regulars to round up and own a slice of the business they already love.",
  },
  {
    icon: Compass,
    tone: "text-accent",
    title: "Priority launch support",
    body: "Guided setup for your DAO workspace, constitution and cap table when you are ready to go live.",
  },
  {
    icon: ShieldCheck,
    tone: "text-chart-3",
    title: "No cost, no commitment",
    body: "Registering interest is free. It does not deploy a DAO, open a wallet or require any payment.",
  },
] as const;

const STEPS = [
  {
    title: "Register interest",
    body: "Tell us about your business and how you would like customers to participate.",
  },
  {
    title: "We reach out",
    body: "Our team reviews founding applications and walks you through the program.",
  },
  {
    title: "Launch when ready",
    body: "Deploy your business DAO workspace on your own timeline — never before you choose to.",
  },
] as const;

type FormState = {
  businessName: string;
  contactName: string;
  contactEmail: string;
  industry: string;
  location: string;
  participationInterest: string;
};

const EMPTY_FORM: FormState = {
  businessName: "",
  contactName: "",
  contactEmail: "",
  industry: "",
  location: "",
  participationInterest: "",
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.businessName.trim())
    errors.businessName = "Enter your business name.";
  if (!form.contactName.trim()) errors.contactName = "Enter a contact name.";
  const email = form.contactEmail.trim();
  if (!email) {
    errors.contactEmail = "Enter a contact email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.contactEmail = "Enter a valid email address.";
  }
  if (!form.industry) errors.industry = "Choose a category.";
  return errors;
}

export default function FoundingPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const registerInterest = useRegisterFoundingInterest();

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const captured = { ...form };
    registerInterest.mutate(
      {
        businessName: captured.businessName.trim(),
        contactName: captured.contactName.trim(),
        contactEmail: captured.contactEmail.trim(),
        industry: captured.industry,
        location: captured.location.trim(),
        participationInterest: captured.participationInterest.trim(),
      },
      {
        onSuccess: () => {
          setSubmittedName(captured.businessName.trim());
          setForm(EMPTY_FORM);
        },
      },
    );
  };

  const backendError = registerInterest.isError
    ? errorMessage(registerInterest.error)
    : null;

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div
        aria-hidden="true"
        className="ambient-orb -left-24 top-0 size-72 bg-primary/40"
      />
      <div
        aria-hidden="true"
        className="ambient-orb right-0 top-40 size-64 bg-chart-3/30"
      />

      <div className="relative">
        <SimulatedBanner className="mb-10" />

        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          {/* Narrative column */}
          <div className="animate-fade-up">
            <SectionHeading
              eyebrow="Founding Business Program"
              title={
                <>
                  Become a{" "}
                  <span className="text-gradient-spectrum">
                    founding business
                  </span>
                </>
              }
              description="Join the first wave of local businesses that let their own customers own a piece of them. It is free to register interest — no DAO deployment, no payment, no commitment."
            />

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <BadgeCheck aria-hidden="true" className="size-3.5" />
                Free to join
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
                <ShieldCheck aria-hidden="true" className="size-3.5" />
                No DAO required
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
                <Sparkles aria-hidden="true" className="size-3.5" />
                No payment
              </span>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur transition-smooth hover:border-primary/40"
                >
                  <benefit.icon
                    aria-hidden="true"
                    className={`size-5 ${benefit.tone}`}
                  />
                  <h3 className="mt-3 font-display text-base font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {benefit.body}
                  </p>
                </div>
              ))}
            </div>

            <ol className="mt-10 space-y-4">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-numeric text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Form / confirmation column */}
          <div className="animate-fade-up lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-elevated backdrop-blur sm:p-8">
              {submittedName ? (
                <div
                  data-ocid="founding.success_state"
                  className="flex flex-col items-center gap-4 py-4 text-center"
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckCircle2 aria-hidden="true" className="size-7" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold">
                      You&apos;re on the founding list
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Thanks for registering{" "}
                      <span className="font-semibold text-foreground">
                        {submittedName}
                      </span>
                      . Our team will reach out with next steps. Remember:
                      registering interest does not deploy a DAO and involves no
                      payment.
                    </p>
                  </div>
                  <div className="mt-2 flex w-full flex-col gap-2">
                    <Button asChild className="w-full rounded-full">
                      <Link to="/launch" data-ocid="founding.launch_link">
                        <Rocket aria-hidden="true" className="size-4" />
                        Launch your business DAO
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full"
                    >
                      <Link
                        to="/directory"
                        search={(prev) => prev}
                        data-ocid="founding.directory_link"
                      >
                        <Building2 aria-hidden="true" className="size-4" />
                        Explore the directory
                      </Link>
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmittedName(null)}
                    data-ocid="founding.register_another_button"
                    className="mt-1 text-xs font-medium text-muted-foreground underline-offset-4 transition-smooth hover:text-foreground hover:underline"
                  >
                    Register another business
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <h2 className="font-display text-xl font-semibold">
                      Register your interest
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Takes about a minute. No account needed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founding-business-name">
                      Business name
                    </Label>
                    <Input
                      id="founding-business-name"
                      value={form.businessName}
                      onChange={(e) => update("businessName", e.target.value)}
                      placeholder="e.g. Juniper & Oak Coffee"
                      autoComplete="organization"
                      aria-invalid={!!errors.businessName}
                      aria-describedby={
                        errors.businessName
                          ? "founding-business-name-error"
                          : undefined
                      }
                      data-ocid="founding.business_name_input"
                    />
                    {errors.businessName && (
                      <p
                        id="founding-business-name-error"
                        data-ocid="founding.business_name_error"
                        className="text-xs text-destructive"
                      >
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="founding-contact-name">
                        Contact name
                      </Label>
                      <Input
                        id="founding-contact-name"
                        value={form.contactName}
                        onChange={(e) => update("contactName", e.target.value)}
                        placeholder="Your full name"
                        autoComplete="name"
                        aria-invalid={!!errors.contactName}
                        aria-describedby={
                          errors.contactName
                            ? "founding-contact-name-error"
                            : undefined
                        }
                        data-ocid="founding.contact_name_input"
                      />
                      {errors.contactName && (
                        <p
                          id="founding-contact-name-error"
                          data-ocid="founding.contact_name_error"
                          className="text-xs text-destructive"
                        >
                          {errors.contactName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="founding-contact-email">
                        Contact email
                      </Label>
                      <Input
                        id="founding-contact-email"
                        type="email"
                        value={form.contactEmail}
                        onChange={(e) => update("contactEmail", e.target.value)}
                        placeholder="you@business.com"
                        autoComplete="email"
                        aria-invalid={!!errors.contactEmail}
                        aria-describedby={
                          errors.contactEmail
                            ? "founding-contact-email-error"
                            : undefined
                        }
                        data-ocid="founding.contact_email_input"
                      />
                      {errors.contactEmail && (
                        <p
                          id="founding-contact-email-error"
                          data-ocid="founding.contact_email_error"
                          className="text-xs text-destructive"
                        >
                          {errors.contactEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founding-industry">Category</Label>
                    <Select
                      value={form.industry}
                      onValueChange={(value) => update("industry", value)}
                    >
                      <SelectTrigger
                        id="founding-industry"
                        aria-invalid={!!errors.industry}
                        aria-describedby={
                          errors.industry
                            ? "founding-industry-error"
                            : undefined
                        }
                        data-ocid="founding.industry_select"
                      >
                        <SelectValue placeholder="Choose a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.industry && (
                      <p
                        id="founding-industry-error"
                        data-ocid="founding.industry_error"
                        className="text-xs text-destructive"
                      >
                        {errors.industry}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founding-location">
                      Location{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="founding-location"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      placeholder="City, region"
                      autoComplete="address-level2"
                      data-ocid="founding.location_input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founding-note">
                      Anything else?{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="founding-note"
                      value={form.participationInterest}
                      onChange={(e) =>
                        update("participationInterest", e.target.value)
                      }
                      placeholder="How would you like your customers to participate?"
                      rows={3}
                      data-ocid="founding.note_textarea"
                    />
                  </div>

                  {backendError && (
                    <p
                      role="alert"
                      data-ocid="founding.error_state"
                      className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    >
                      {backendError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={registerInterest.isPending}
                    data-ocid="founding.submit_button"
                    className="w-full rounded-full"
                  >
                    {registerInterest.isPending ? (
                      <>
                        <Loader2
                          aria-hidden="true"
                          className="size-4 animate-spin"
                        />
                        Registering…
                      </>
                    ) : (
                      <>
                        Register interest
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Registering interest is free and does not deploy a DAO or
                    involve any payment. We only use your details to follow up
                    about the Founding Business Program.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
