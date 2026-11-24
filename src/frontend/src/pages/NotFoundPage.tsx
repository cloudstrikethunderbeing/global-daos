import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div
      data-ocid="page.not_found"
      className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-5 px-4 text-center"
    >
      <SimulatedBanner className="mb-10 w-full text-left" />
      <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Compass aria-hidden="true" className="size-7" />
      </span>
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          This page drifted off the map
        </h1>
        <p className="text-muted-foreground">
          The page you were looking for does not exist. Head back to the
          directory to keep exploring.
        </p>
      </div>
      <Button asChild className="rounded-full">
        <Link to="/directory" search={{}} data-ocid="not_found.primary_button">
          Browse the directory
        </Link>
      </Button>
    </div>
  );
}
