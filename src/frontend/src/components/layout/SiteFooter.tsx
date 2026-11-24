import { BrandMark } from "@/components/layout/SiteHeader";
import { useMyBusinesses } from "@/hooks/useQueries";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, ReceiptText, ShieldCheck } from "lucide-react";

const exploreLinks = [
  { to: "/directory", label: "Directory" },
  { to: "/launch", label: "Launch a DAO" },
  { to: "/simulator", label: "Simulator" },
  { to: "/reveal", label: "Global Reveal" },
  { to: "/roadmap", label: "Roadmap" },
] as const;

const programLinks = [
  { to: "/founding", label: "Founding Business" },
  { to: "/early-access", label: "Early Access" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/analytics", label: "Analytics" },
] as const;

function WorkspaceLinks() {
  const { data: businesses } = useMyBusinesses();
  return (
    <div data-ocid="footer.workspaces" className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Your workspaces
      </p>
      <Link
        to="/portfolio"
        data-ocid="footer.link.ownership_dashboard"
        className="flex items-center gap-2 rounded-md py-1.5 text-sm text-muted-foreground transition-smooth hover:text-foreground"
      >
        <LayoutDashboard aria-hidden="true" className="size-4 text-primary" />
        Ownership dashboard
      </Link>
      {businesses && businesses.length > 0 ? (
        businesses.map((business) => (
          <div key={business.id.toString()} className="space-y-0.5">
            <Link
              to="/admin/$businessId"
              params={{ businessId: business.id.toString() }}
              data-ocid="footer.link.business_admin"
              className="flex items-center gap-2 rounded-md py-1.5 text-sm text-muted-foreground transition-smooth hover:text-foreground"
            >
              <ShieldCheck aria-hidden="true" className="size-4 text-accent" />
              <span className="truncate">{business.name} admin</span>
            </Link>
            <Link
              to="/admin/$businessId/reconciliation"
              params={{ businessId: business.id.toString() }}
              data-ocid="footer.link.reconciliation"
              className="flex items-center gap-2 rounded-md py-1.5 pl-6 text-xs text-muted-foreground transition-smooth hover:text-foreground"
            >
              <ReceiptText
                aria-hidden="true"
                className="size-3.5 text-primary"
              />
              <span className="truncate">Reconciliation</span>
            </Link>
          </div>
        ))
      ) : (
        <Link
          to="/launch"
          data-ocid="footer.link.launch_first"
          className="flex items-center gap-2 rounded-md py-1.5 text-sm text-muted-foreground transition-smooth hover:text-foreground"
        >
          <ShieldCheck aria-hidden="true" className="size-4 text-accent" />
          Launch your first DAO
        </Link>
      )}
    </div>
  );
}

function FooterNav() {
  const { identity } = useInternetIdentity();
  const signedIn = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Explore
        </p>
        {exploreLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            data-ocid={`footer.link.${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="block rounded-md py-1.5 text-sm text-muted-foreground transition-smooth hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Programs
        </p>
        {programLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            data-ocid={`footer.link.${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="block rounded-md py-1.5 text-sm text-muted-foreground transition-smooth hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
      {signedIn ? (
        <WorkspaceLinks />
      ) : (
        <div data-ocid="footer.signin_prompt" className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Your workspaces
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Sign in with Internet Identity to save your portfolio and manage the
            businesses you own.
          </p>
        </div>
      )}
    </nav>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1.4fr]">
          <div className="space-y-4">
            <BrandMark />
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Turn everyday spending into micro-ownership. Round up purchases,
              earn governance stakes, and help local businesses raise capital
              from the people who already love them.
            </p>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              From consumers to owners.
            </p>
          </div>

          <FooterNav />
        </div>

        <div
          data-ocid="footer.disclaimer"
          className="mt-10 rounded-xl border border-warning/40 bg-warning px-4 py-3 text-sm leading-relaxed text-warning-foreground dark:bg-warning/15 dark:text-foreground"
        >
          <span className="font-semibold text-warning-foreground dark:text-warning">
            Simulated activity.
          </span>{" "}
          All ownership, contributions, valuations and returns shown here are
          fictional demonstrations. No real money moves and nothing here is an
          investment, security or financial product.
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} GLOBAL DAOs. All rights reserved.</p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="transition-smooth hover:text-foreground"
          >
            © {year}. Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
