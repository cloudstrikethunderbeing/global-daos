import type {
  CatalogueItem,
  Cents,
  ContributionOption,
  SimulatedTransaction,
} from "@/backend";
import {
  ContributionOption as ContributionOptionEnum,
  PaymentStatus,
  ProviderKind,
} from "@/backend";
import { RequireSignIn } from "@/components/InternetIdentity";
import { type CartEntry, CartPanel } from "@/components/commerce/CartPanel";
import { CatalogueGrid } from "@/components/commerce/CatalogueGrid";
import { TransactionQr } from "@/components/commerce/TransactionQr";
import { BusinessBadge } from "@/components/shared/BusinessBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  cacheDemoReceipt,
  useBuildCart,
  useBusinessBySlug,
  useCancelTransaction,
  useCatalogue,
  useCheckout,
  useMyTransactions,
  usePaymentProviders,
  useRecordDemoPurchase,
  useRefundTransaction,
} from "@/hooks/useQueries";
import { getDemoBusiness } from "@/lib/demoBusinesses";
import { demoBusinessId, demoCatalogue } from "@/lib/demoCatalogue";
import { describeBackendError, errorMessage } from "@/lib/errors";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  RotateCcw,
  Store,
  Wallet,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const statusLabel: Record<string, string> = {
  paid: "Paid (simulated)",
  pending: "Pending",
  refunded: "Refunded",
  cancelled: "Cancelled",
};

/** Map the cart's round-up amount to the backend's contribution option. */
function contributionOptionFor(roundUp: Cents): ContributionOption {
  if (roundUp === 0n) return ContributionOptionEnum.none;
  if (roundUp === 50n) return ContributionOptionEnum.nearestDollar;
  if (roundUp === 100n) return ContributionOptionEnum.nearestFive;
  return ContributionOptionEnum.custom;
}

function ProviderNotice() {
  const { data: providers } = usePaymentProviders();
  const active = (providers ?? []).find((provider) => provider.active);
  return (
    <div
      data-ocid="checkout.provider_notice"
      className="flex items-start gap-2.5 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm"
    >
      <Wallet
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-accent"
      />
      <p className="leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">
          Simulated provider: {active?.displayName ?? "Simulated checkout"}
        </span>{" "}
        — no real payment is taken. No card details are collected and no funds
        move.
      </p>
    </div>
  );
}

function ConsumerTransactions() {
  const { data: transactions, isLoading } = useMyTransactions();
  const refund = useRefundTransaction();
  const cancel = useCancelTransaction();
  const [error, setError] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      [...(transactions ?? [])].sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1,
      ),
    [transactions],
  );

  function run(action: "refund" | "cancel", id: bigint) {
    setError(null);
    const mutation = action === "refund" ? refund : cancel;
    mutation.mutate(id, { onError: (err) => setError(errorMessage(err)) });
  }

  return (
    <section className="mt-12" aria-labelledby="my-transactions">
      <SectionHeading
        eyebrow="Your activity"
        title={<span id="my-transactions">Your simulated transactions</span>}
        description="Refund or cancel a simulated purchase and watch its status change."
      />
      <div className="mt-6">
        {isLoading ? (
          <LoadingSkeleton variant="list" rows={3} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No simulated purchases yet"
            description="Complete a simulated checkout above and it will appear here."
          />
        ) : (
          <ul data-ocid="transactions.list" className="space-y-3">
            {rows.map((tx, index) => (
              <TransactionRow
                key={tx.id.toString()}
                tx={tx}
                index={index}
                busy={refund.isPending || cancel.isPending}
                onRefund={() => run("refund", tx.id)}
                onCancel={() => run("cancel", tx.id)}
              />
            ))}
          </ul>
        )}
        {error && (
          <p
            role="alert"
            data-ocid="transactions.error_state"
            className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

function TransactionRow({
  tx,
  index,
  busy,
  onRefund,
  onCancel,
}: {
  tx: SimulatedTransaction;
  index: number;
  busy: boolean;
  onRefund: () => void;
  onCancel: () => void;
}) {
  const canRefund = tx.status === "paid";
  const canCancel = tx.status === "pending";
  return (
    <li
      data-ocid={`transactions.item.${index + 1}`}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">
            {tx.transactionRef}
          </span>
          <Badge
            variant="outline"
            className={cn(
              tx.status === "paid" &&
                "border-success/40 bg-success/10 text-success",
              tx.status === "refunded" &&
                "border-accent/40 bg-accent/10 text-accent",
              tx.status === "cancelled" &&
                "border-border bg-muted/60 text-muted-foreground",
              tx.status === "pending" &&
                "border-warning/40 bg-warning/10 text-warning",
            )}
            data-ocid={`transactions.status.${index + 1}`}
          >
            {statusLabel[tx.status] ?? tx.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {formatDateTime(tx.createdAt)} · {tx.lines.length} line
          {tx.lines.length === 1 ? "" : "s"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-numeric text-base font-semibold tabular-nums">
          {formatCurrency(tx.total)}
        </span>
        <div className="flex gap-2">
          {canRefund && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={busy}
              data-ocid={`transactions.refund_button.${index + 1}`}
              onClick={onRefund}
            >
              <RotateCcw aria-hidden="true" className="size-3.5" />
              Refund
            </Button>
          )}
          {canCancel && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={busy}
              data-ocid={`transactions.cancel_button.${index + 1}`}
              onClick={onCancel}
            >
              <XCircle aria-hidden="true" className="size-3.5" />
              Cancel
            </Button>
          )}
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link
              to="/receipt/$token"
              params={{ token: tx.receiptToken }}
              data-ocid={`transactions.receipt_link.${index + 1}`}
            >
              Receipt
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default function CheckoutPage() {
  const { slug } = useParams({ from: "/shop/$slug" });
  const navigate = useNavigate();
  const demo = getDemoBusiness(slug);
  const { data: registered, isLoading: businessLoading } = useBusinessBySlug(
    demo ? undefined : slug,
  );
  const businessId = registered?.id;
  const { data: items, isLoading: itemsLoading } = useCatalogue(businessId);
  const buildCart = useBuildCart();
  const checkout = useCheckout();
  const demoPurchase = useRecordDemoPurchase();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [roundUp, setRoundUp] = useState<Cents>(0n);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState<SimulatedTransaction | null>(null);
  const [highlightItemId, setHighlightItemId] = useState<string | undefined>();

  const catalogue = useMemo<CatalogueItem[]>(() => {
    if (demo) return demoCatalogue(demo);
    return (items ?? []).filter((item) => item.active);
  }, [demo, items]);

  // Deep link from an item QR code: ?item=<id> pre-adds that item once loaded.
  useEffect(() => {
    if (catalogue.length === 0) return;
    const itemParam = new URLSearchParams(window.location.search).get("item");
    if (!itemParam) return;
    const match = catalogue.find((item) => item.id.toString() === itemParam);
    if (!match) return;
    setHighlightItemId(itemParam);
    setQuantities((prev) =>
      prev[itemParam] ? prev : { ...prev, [itemParam]: 1 },
    );
  }, [catalogue]);

  const entries = useMemo<CartEntry[]>(
    () =>
      catalogue
        .map((item) => ({
          item,
          quantity: quantities[item.id.toString()] ?? 0,
        }))
        .filter((entry) => entry.quantity > 0),
    [catalogue, quantities],
  );

  const subtotal = useMemo<Cents>(
    () =>
      entries.reduce(
        (sum, entry) => sum + entry.item.price * BigInt(entry.quantity),
        0n,
      ),
    [entries],
  );

  function adjust(item: CatalogueItem, delta: number) {
    const key = item.id.toString();
    setQuantities((prev) => {
      const next = Math.max(0, Math.min(20, (prev[key] ?? 0) + delta));
      return { ...prev, [key]: next };
    });
  }

  function remove(item: CatalogueItem) {
    setQuantities((prev) => ({ ...prev, [item.id.toString()]: 0 }));
  }

  async function handleDemoCheckout() {
    if (!demo || entries.length === 0) return;
    setError(null);
    try {
      const productName = entries
        .map((entry) => `${entry.quantity}× ${entry.item.name}`)
        .join(", ");
      const clientRef = `shop-${demo.slug}-${Date.now().toString(36)}`;
      const result = await demoPurchase.mutateAsync({
        businessId: demoBusinessId(demo.slug),
        productName,
        purchasePrice: subtotal,
        contributionAmount: roundUp,
        contributionOption: contributionOptionFor(roundUp),
        clientRef,
      });
      const lines = entries.map((entry) => ({
        itemId: entry.item.id,
        quantity: BigInt(entry.quantity),
      }));
      const platformFee = (result.purchasePrice * 250n) / 10_000n;
      const receipt = {
        status: PaymentStatus.paid,
        revenue: result.purchasePrice,
        platformFee,
        businessName: demo.name,
        receiptToken: clientRef,
        lines,
        issuedAt: result.createdAt,
        contribution: result.contributionAmount,
        transactionId: 0n,
      };
      cacheDemoReceipt(receipt);
      setCompleted({
        id: 0n,
        transactionRef: clientRef,
        status: PaymentStatus.paid,
        total: result.totalPayment,
        provider: {
          active: true,
          displayName: "Simulated checkout",
          kind: ProviderKind.simulated,
        },
        businessId: result.businessId,
        platformFee,
        createdAt: result.createdAt,
        receiptToken: clientRef,
        lines,
        updatedAt: result.createdAt,
        consumer:
          result.businessId as unknown as SimulatedTransaction["consumer"],
        roundUpContribution: result.contributionAmount,
        subtotal: result.purchasePrice,
      });
      setQuantities({});
      setRoundUp(0n);
    } catch (err) {
      setError(
        err && typeof err === "object" && "__kind__" in err
          ? describeBackendError(err as { __kind__: string })
          : errorMessage(err),
      );
    }
  }

  async function handleRegisteredCheckout() {
    if (!businessId || entries.length === 0) return;
    setError(null);
    try {
      const lines = entries.map((entry) => ({
        itemId: entry.item.id,
        quantity: BigInt(entry.quantity),
      }));
      const cart = await buildCart.mutateAsync({ businessId, lines });
      const result = await checkout.mutateAsync({
        cart,
        roundUpContribution: roundUp,
        clientRef: `shop-${businessId.toString()}-${Date.now()}`,
      });
      setCompleted(result.transaction);
      setQuantities({});
      setRoundUp(0n);
    } catch (err) {
      setError(
        err && typeof err === "object" && "__kind__" in err
          ? describeBackendError(err as { __kind__: string })
          : errorMessage(err),
      );
    }
  }

  function handleCheckout() {
    if (demo) return handleDemoCheckout();
    return handleRegisteredCheckout();
  }

  const pending =
    buildCart.isPending || checkout.isPending || demoPurchase.isPending;

  const name = demo?.name ?? registered?.name;
  const industry = demo?.category ?? registered?.industry;
  const isFictional = demo ? true : (registered?.isFictional ?? false);

  if (!demo && businessLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <LoadingSkeleton rows={4} />
      </div>
    );
  }

  if (!name) {
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
      data-ocid="checkout.page"
      className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 md:py-14"
    >
      <div className="space-y-4">
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <Link
            to="/business/$slug"
            params={{ slug }}
            data-ocid="checkout.back_button"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to {name}
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <BusinessBadge isFictional={isFictional} />
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {industry}
          </span>
        </div>
        <SectionHeading
          eyebrow="Simulated storefront"
          title={`Shop ${name}`}
          description="Pick what you would buy, choose a voluntary round-up, and complete a fully simulated purchase. No real money moves."
        />
        <SimulatedBanner />
        <ProviderNotice />
      </div>

      {completed && (
        <TransactionQr
          transaction={completed}
          onViewReceipt={() =>
            void navigate({
              to: "/receipt/$token",
              params: { token: completed.receiptToken },
            })
          }
        />
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div>
          {!demo && itemsLoading ? (
            <LoadingSkeleton rows={3} />
          ) : catalogue.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Nothing on the shelf yet"
              description="This business has not published any catalogue items for the simulation."
            />
          ) : (
            <CatalogueGrid
              items={catalogue}
              quantities={quantities}
              onAdd={(item) => adjust(item, 1)}
              highlightItemId={highlightItemId}
            />
          )}
        </div>

        <CartPanel
          entries={entries}
          subtotal={subtotal}
          roundUp={roundUp}
          onRoundUpChange={setRoundUp}
          onIncrement={(item) => adjust(item, 1)}
          onDecrement={(item) => adjust(item, -1)}
          onRemove={remove}
          onCheckout={() => void handleCheckout()}
          pending={pending}
          error={error}
        />
      </div>

      <RequireSignIn
        fallback={
          <div
            data-ocid="transactions.signin_prompt"
            className="mt-12 rounded-2xl border border-dashed border-border bg-card/40 p-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Sign in with Internet Identity to see your simulated transactions
              and refund or cancel them.
            </p>
          </div>
        }
      >
        <ConsumerTransactions />
      </RequireSignIn>
    </div>
  );
}
