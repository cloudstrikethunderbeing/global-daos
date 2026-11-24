import type { CatalogueItem, Cents } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  Loader2,
  Minus,
  Plus,
  Receipt,
  ShoppingBag,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useReducedMotion } from "motion/react";

export interface CartEntry {
  item: CatalogueItem;
  quantity: number;
}

const ROUND_UP_OPTIONS: { label: string; cents: Cents }[] = [
  { label: "Skip", cents: 0n },
  { label: "+$0.50", cents: 50n },
  { label: "+$1.00", cents: 100n },
  { label: "+$2.00", cents: 200n },
];

/**
 * Cart with quantity changes, removal, a running subtotal, an optional
 * round-up contribution and the simulated checkout action.
 */
export function CartPanel({
  entries,
  subtotal,
  roundUp,
  onRoundUpChange,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  pending,
  error,
}: {
  entries: CartEntry[];
  subtotal: Cents;
  roundUp: Cents;
  onRoundUpChange: (cents: Cents) => void;
  onIncrement: (item: CatalogueItem) => void;
  onDecrement: (item: CatalogueItem) => void;
  onRemove: (item: CatalogueItem) => void;
  onCheckout: () => void;
  pending: boolean;
  error: string | null;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const itemCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const total = subtotal + roundUp;

  return (
    <Card
      className="lg:sticky lg:top-24"
      data-ocid="cart.panel"
      aria-label="Your cart"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display text-lg">
          <ShoppingBag aria-hidden="true" className="size-5 text-primary" />
          Your cart
        </CardTitle>
        <CardDescription>
          {itemCount === 0
            ? "Add an item to begin."
            : `${itemCount} item${itemCount === 1 ? "" : "s"} selected`}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {entries.length === 0 ? (
          <p
            data-ocid="cart.empty_state"
            className="rounded-xl border border-dashed border-border bg-background/40 px-4 py-6 text-center text-sm text-muted-foreground"
          >
            Your cart is empty. Add something from the catalogue to see the
            simulated total.
          </p>
        ) : (
          <ul data-ocid="cart.list" className="space-y-3">
            {entries.map((entry, index) => {
              const key = entry.item.id.toString();
              return (
                <li
                  key={key}
                  data-ocid={`cart.item.${index + 1}`}
                  className="rounded-xl border border-border bg-background/40 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {entry.item.name}
                      </p>
                      <p className="font-numeric text-xs text-muted-foreground">
                        {formatCurrency(entry.item.price)} each
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 shrink-0 rounded-full text-muted-foreground hover:text-destructive"
                      aria-label={`Remove ${entry.item.name} from cart`}
                      data-ocid={`cart.remove_button.${index + 1}`}
                      onClick={() => onRemove(entry.item)}
                    >
                      <Trash2 aria-hidden="true" className="size-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-7 rounded-full"
                        aria-label={`Decrease ${entry.item.name}`}
                        data-ocid={`cart.decrement_button.${index + 1}`}
                        onClick={() => onDecrement(entry.item)}
                      >
                        <Minus aria-hidden="true" className="size-3.5" />
                      </Button>
                      <span
                        aria-live="polite"
                        className="w-6 text-center text-sm font-medium tabular-nums"
                      >
                        {entry.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-7 rounded-full"
                        aria-label={`Increase ${entry.item.name}`}
                        data-ocid={`cart.increment_button.${index + 1}`}
                        onClick={() => onIncrement(entry.item)}
                      >
                        <Plus aria-hidden="true" className="size-3.5" />
                      </Button>
                    </div>
                    <span className="font-numeric text-sm font-semibold tabular-nums">
                      {formatCurrency(
                        entry.item.price * BigInt(entry.quantity),
                      )}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Voluntary round-up
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {ROUND_UP_OPTIONS.map((option) => (
              <Button
                key={option.label}
                type="button"
                variant={roundUp === option.cents ? "default" : "outline"}
                size="sm"
                className="rounded-full px-0 text-xs"
                aria-pressed={roundUp === option.cents}
                data-ocid={`cart.roundup.${option.cents.toString()}`}
                onClick={() => onRoundUpChange(option.cents)}
              >
                {option.label}
              </Button>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Optional and consumer-funded. Round-ups are simulated contributions
            toward a hypothetical ownership position.
          </p>
        </div>

        <dl className="space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-numeric tabular-nums">
              {formatCurrency(subtotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Round-up</dt>
            <dd className="font-numeric tabular-nums">
              {formatCurrency(roundUp)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2 text-base">
            <dt className="font-semibold">Simulated total</dt>
            <dd className="font-numeric font-semibold text-primary tabular-nums">
              {formatCurrency(total)}
            </dd>
          </div>
        </dl>

        {error && (
          <p
            role="alert"
            data-ocid="cart.error_state"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button
          type="button"
          className={cn("w-full rounded-full")}
          data-ocid="cart.checkout_button"
          disabled={entries.length === 0 || pending}
          onClick={onCheckout}
        >
          {pending ? (
            <Loader2
              aria-hidden="true"
              className={cn("size-4", !reduceMotion && "animate-spin")}
            />
          ) : (
            <Sparkles aria-hidden="true" className="size-4" />
          )}
          {pending ? "Processing…" : "Complete simulated purchase"}
        </Button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Receipt aria-hidden="true" className="size-3.5" />
          You will get a shareable digital receipt.
        </p>
      </CardFooter>
    </Card>
  );
}
