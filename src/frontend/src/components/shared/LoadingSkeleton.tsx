import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Layout-matched loading skeleton for cards and lists. */
export function LoadingSkeleton({
  rows = 3,
  variant = "card",
  className,
}: {
  rows?: number;
  variant?: "card" | "list" | "stat";
  className?: string;
}) {
  const ids = Array.from({ length: rows }, (_, i) => `skeleton-${i}`);

  if (variant === "stat") {
    return (
      <div
        data-ocid="loading_state"
        className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}
      >
        {ids.map((id) => (
          <div
            key={id}
            className="rounded-2xl border border-border bg-card/60 p-5"
          >
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-4 h-8 w-32" />
            <Skeleton className="mt-3 h-3 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div data-ocid="loading_state" className={cn("space-y-3", className)}>
        {ids.map((id) => (
          <div
            key={id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card/60 p-4"
          >
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      data-ocid="loading_state"
      className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}
    >
      {ids.map((id) => (
        <div
          key={id}
          className="space-y-4 rounded-2xl border border-border bg-card/60 p-5"
        >
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-9 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}
