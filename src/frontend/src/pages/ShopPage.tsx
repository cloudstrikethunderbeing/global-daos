import type { CartLine, CatalogueItem, Cents } from "@/backend";
import { ItemKind } from "@/backend";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useBuildCart,
  useBusinessBySlug,
  useCatalogue,
  useCheckout,
} from "@/hooks/useQueries";
import { errorMessage } from "@/lib/errors";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Loader2,
  Minus,
  Package,
  Plus,
  Receipt,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import { useMemo, useState } from "react";

const ROUND_UP_OPTIONS: { label: string; cents: Cents }[] = [
  { label: "No round-up", cents: 0n },
  { label: "+$0.50", cents: 50n },
  { label: "+$1.00", cents: 100n },
  { label: "+$2.00", cents: 200n },
];

function itemKindLabel(kind: ItemKind): string {
  return kind === ItemKind.service ? "Service" : "Product";
}

export default function ShopPage() {
  const { slug } = useParams({ from: "/shop/$slug" });
  const navigate = useNavigate();
  const { data: business, isLoading: businessLoading } =
    useBusinessBySlug(slug);
  const businessId = business?.id;
  const { data: items, isLoading: itemsLoading } = useCatalogue(businessId);
  const buildCart = useBuildCart();
  const checkout = useCheckout();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [roundUp, setRoundUp] = useState<Cents>(0n);
  const [error, setError] = useState<string | null>(null);

  const catalogue = useMemo<CatalogueItem[]>(
    () => (items ?? []).filter((item) => item.active),
    [items],
  );

  const lines = useMemo<CartLine[]>(
    () =>
      catalogue
        .map((item) => ({
          itemId: item.id,
          quantity: BigInt(quantities[item.id.toString()] ?? 0),
        }))
        .filter((line) => line.quantity > 0n),
    [catalogue, quantities],
  );

  const subtotal = useMemo<Cents>(
    () =>
      catalogue.reduce((sum, item) => {
        const qty = quantities[item.id.toString()] ?? 0;
        return sum + item.price * BigInt(qty);
      }, 0n),
    [catalogue, quantities],
  );

  const total = subtotal + roundUp;
  const itemCount = lines.reduce((sum, line) => sum + Number(line.quantity), 0);

  function adjust(itemId: string, delta: number) {
    setQuantities((prev) => {
      const next = Math.max(0, Math.min(20, (prev[itemId] ?? 0) + delta));
      return { ...prev, [itemId]: next };
    });
  }

  async function handleCheckout() {
    if (!businessId || lines.length === 0) return;
    setError(null);
    try {
      const cart = await buildCart.mutateAsync({ businessId, lines });
      const result = await checkout.mutateAsync({
        cart,
        roundUpContribution: roundUp,
        clientRef: `shop-${businessId.toString()}-${Date.now()}`,
      });
      void navigate({
        to: "/receipt/$token",
        params: { token: result.receiptToken },
      });
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  const pending = buildCart.isPending || checkout.isPending;

  if (businessLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <LoadingSkeleton rows={4} />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16">
        <EmptyState
          icon={Store}
          title="Shop not found"
          description="This business does not exist or is no longer taking simulated orders."
          action={
            <Button asChild className="rounded-full">
              <Link to="/directory" search={{}}>
                Browse the directory
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div
      data-ocid="shop.page"
      className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 md:py-14"
    >
      <div className="space-y-4">
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <Link
            to="/business/$slug"
            params={{ slug: business.slug }}
            data-ocid="shop.back_button"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to {business.name}
          </Link>
        </Button>
        <SectionHeading
          eyebrow="Simulated checkout"
          title={`Shop ${business.name}`}
          description="Pick what you would buy, choose a voluntary round-up, and complete a fully simulated purchase. No real money moves."
        />
        <SimulatedBanner />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div className="space-y-4">
          {itemsLoading ? (
            <LoadingSkeleton rows={3} />
          ) : catalogue.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Nothing on the shelf yet"
              description="This business has not published any catalogue items for the simulation."
            />
          ) : (
            catalogue.map((item) => {
              const qty = quantities[item.id.toString()] ?? 0;
              return (
                <Card
                  key={item.id.toString()}
                  data-ocid="shop.item_card"
                  className={cn(
                    "transition-colors",
                    qty > 0 && "border-primary/40",
                  )}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <CardTitle className="font-display text-lg">
                          {item.name}
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {itemKindLabel(item.kind)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between gap-3">
                    <span className="font-display text-lg font-semibold text-primary">
                      {formatCurrency(item.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-8 rounded-full"
                        aria-label={`Remove one ${item.name}`}
                        disabled={qty === 0}
                        onClick={() => adjust(item.id.toString(), -1)}
                      >
                        <Minus aria-hidden="true" className="size-4" />
                      </Button>
                      <span
                        aria-live="polite"
                        className="w-6 text-center text-sm font-medium tabular-nums"
                      >
                        {qty}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-8 rounded-full"
                        aria-label={`Add one ${item.name}`}
                        onClick={() => adjust(item.id.toString(), 1)}
                      >
                        <Plus aria-hidden="true" className="size-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>

        <Card className="lg:sticky lg:top-24" data-ocid="shop.cart_panel">
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
            <div className="space-y-2">
              <Label>Voluntary round-up</Label>
              <div className="grid grid-cols-2 gap-2">
                {ROUND_UP_OPTIONS.map((option) => (
                  <Button
                    key={option.label}
                    type="button"
                    variant={roundUp === option.cents ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    aria-pressed={roundUp === option.cents}
                    onClick={() => setRoundUp(option.cents)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Round-ups are optional and consumer-funded. They are simulated
                contributions toward a hypothetical ownership position.
              </p>
            </div>

            <dl className="space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium tabular-nums">
                  {formatCurrency(subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Round-up</dt>
                <dd className="font-medium tabular-nums">
                  {formatCurrency(roundUp)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-2 text-base">
                <dt className="font-semibold">Simulated total</dt>
                <dd className="font-display font-semibold text-primary tabular-nums">
                  {formatCurrency(total)}
                </dd>
              </div>
            </dl>

            {error && (
              <p
                role="alert"
                data-ocid="shop.error_state"
                className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="button"
              className="w-full rounded-full"
              data-ocid="shop.checkout_button"
              disabled={lines.length === 0 || pending}
              onClick={() => void handleCheckout()}
            >
              {pending ? (
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              ) : (
                <Sparkles aria-hidden="true" className="size-4" />
              )}
              Complete simulated purchase
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Receipt aria-hidden="true" className="size-3.5" />
              You will get a shareable digital receipt.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
