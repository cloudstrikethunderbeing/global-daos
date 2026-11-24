import { SignInButton } from "@/components/InternetIdentity";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Menu, Network } from "lucide-react";
import { useState } from "react";

export const primaryNav = [
  { to: "/demo", label: "Demo" },
  { to: "/directory", label: "Directory" },
  { to: "/launch", label: "Launch" },
  { to: "/simulator", label: "Simulator" },
  { to: "/roadmap", label: "Roadmap" },
] as const;

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      data-ocid="nav.brand_link"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span className="relative flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30 transition-smooth group-hover:bg-primary/25">
        <Network aria-hidden="true" className="size-4.5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-foreground">
          Global DAOs
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Consumerism Staking
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={`nav.link.${item.label.toLowerCase()}`}
              activeProps={{ className: "text-foreground bg-secondary/60" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-secondary/50 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeSwitcher />
          <SignInButton className="hidden h-9 items-center rounded-full border border-warning/40 bg-warning/10 px-4 text-sm font-semibold text-warning transition-smooth hover:bg-warning/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60 sm:inline-flex" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                data-ocid="nav.menu_button"
                aria-label="Open navigation menu"
                className="rounded-full md:hidden"
              >
                <Menu aria-hidden="true" className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <BrandMark />
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Mobile"
                className="mt-6 flex flex-col gap-1 px-4"
              >
                {primaryNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    data-ocid={`nav.mobile_link.${item.label.toLowerCase()}`}
                    activeProps={{ className: "bg-secondary text-foreground" }}
                    className="rounded-xl px-3 py-3 text-base font-medium text-muted-foreground transition-smooth hover:bg-secondary/60 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 border-t border-border pt-4">
                  <SignInButton className="flex h-11 w-full items-center justify-center rounded-full border border-warning/40 bg-warning/10 px-4 text-sm font-semibold text-warning transition-smooth hover:bg-warning/20" />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
