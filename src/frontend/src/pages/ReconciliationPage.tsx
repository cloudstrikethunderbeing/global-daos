import type { BusinessId, TransactionId } from "@/backend";
import { ProviderKind } from "@/backend";
import { RequireSignIn } from "@/components/InternetIdentity";
import { ReconciliationTable } from "@/components/commerce/ReconciliationTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useBusiness,
  useBusinessAdminStats,
  useCancelTransaction,
  usePaymentProviders,
  useReconciliation,
  useRefundTransaction,
} from "@/hooks/useQueries";
import { describeBackendError, errorMessage } from "@/lib/errors";
import { formatCurrency } from "@/lib/format";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Coins,
  CreditCard,
  Landmark,
  Receipt,
  Scale,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

const providerKindLabels: Record<ProviderKind, string> = {
  [ProviderKind.simulated]: "Simulated provider",
  [ProviderKind.conventional]: "Conventional provider",
  [ProviderKind.blockchain]: "Blockchain provider",
};

function ProviderPanel() {
  const { data: providers, isLoading } = usePaymentProviders();
  const active = (providers ?? []).find((provider) => provider.active);

  return (
    <Card className="border-primary/25 bg-primary/5">
      <CardHeader className="flex-row items-start gap-3 space-y-0">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CreditCard aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0 space-y-1">
          <CardTitle className="font-display text-base">
            Active payment provider
          </CardTitle>
          <CardDescription>
            {isLoading
              ? "Checking the configured provider…"
              : active
                ? `${active.displayName} · ${providerKindLabels[active.kind]}`
                : "No provider is configured for this deployment."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Every transaction in this workspace is simulated. No real payment is
          taken, no card is charged and no funds move — the provider only labels
          how a simulated checkout would be routed.
        </p>
      </CardContent>
    </Card>
  );
}

function ReconciliationContent({ businessId }: { businessId: BusinessId }) {
  const businessQuery = useBusiness(businessId);
  const statsQuery = useBusinessAdminStats(businessId);
  const reconciliationQuery = useReconciliation(businessId);
  const refund = useRefundTransaction();
  const cancel = useCancelTransaction();
  const [pendingId, setPendingId] = useState<TransactionId | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const rows = reconciliationQuery.data ?? [];

  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, row) => ({
          total: acc.total + row.total,
          revenue: acc.revenue + row.revenue,
          platformFee: acc.platformFee + row.platformFee,
          contribution: acc.contribution + row.contribution,
        }),
        { total: 0n, revenue: 0n, platformFee: 0n, contribution: 0n },
      ),
    [rows],
  );

  const business = businessQuery.data;

  if (businessQuery.isLoading || statsQuery.isLoading) {
    return <LoadingSkeleton variant="stat" rows={4} />;
  }

  if (businessQuery.isError) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="We could not load this business"
        description="The reconciliation view could not reach the backend. Check your connection and try again."
        action={
          <Button
            type="button"
            className="rounded-full"
            onClick={() => void businessQuery.refetch()}
            data-ocid="reconciliation.retry_button"
          >
            Try again
          </Button>
        }
      />
    );
  }

  if (!business) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Business not found"
        description="No business matches this link. It may have been removed."
        action={
          <Button asChild className="rounded-full">
            <Link to="/portfolio">Go to your portfolio</Link>
          </Button>
        }
      />
    );
  }

  const isOwner = statsQuery.data !== null && statsQuery.data !== undefined;

  if (!isOwner) {
    return (
      <section
        aria-label="Access denied"
        data-ocid="reconciliation.access_denied"
        className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <ShieldAlert aria-hidden="true" className="size-6" />
        </span>
        <div className="max-w-md space-y-2">
          <h1 className="font-display text-2xl font-semibold">
            This business is not yours
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Only the owner of {business.name} can open its reconciliation view.
            Sign in with the account that launched this business to continue.
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/portfolio">Back to your portfolio</Link>
        </Button>
      </section>
    );
  }

  const runAction = (
    id: TransactionId,
    action: typeof refund | typeof cancel,
  ) => {
    setActionError(null);
    setPendingId(id);
    action.mutate(id, {
      onError: (error) => {
        setActionError(
          typeof error === "object" && error !== null && "__kind__" in error
            ? describeBackendError(error as { __kind__: string })
            : errorMessage(error),
        );
      },
      onSettled: () => setPendingId(null),
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <Link
            to="/admin/$businessId"
            params={{ businessId: businessId.toString() }}
            data-ocid="reconciliation.back_button"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to admin
          </Link>
        </Button>
        <SectionHeading
          eyebrow="Business admin"
          title={`Reconciliation · ${business.name}`}
          description="Every simulated transaction for this business, with revenue, platform fee and round-up contribution kept as separate figures."
        />
        <SimulatedBanner />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Simulated total"
          value={formatCurrency(totals.total)}
          icon={Wallet}
          tone="emerald"
        />
        <StatCard
          label="Business revenue"
          value={formatCurrency(totals.revenue)}
          icon={Landmark}
          tone="cyan"
        />
        <StatCard
          label="Platform fee"
          value={formatCurrency(totals.platformFee)}
          icon={Scale}
          tone="violet"
        />
        <StatCard
          label="Round-up contributions"
          value={formatCurrency(totals.contribution)}
          icon={Coins}
          tone="gold"
        />
      </div>

      <ProviderPanel />

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Transactions</CardTitle>
          <CardDescription>
            {rows.length} simulated transaction{rows.length === 1 ? "" : "s"} ·
            refund or cancel a paid transaction to update its status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {actionError && (
            <p
              role="alert"
              data-ocid="reconciliation.error_state"
              className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {actionError}
            </p>
          )}
          {reconciliationQuery.isLoading ? (
            <LoadingSkeleton rows={4} variant="list" />
          ) : reconciliationQuery.isError ? (
            <EmptyState
              icon={ShieldAlert}
              title="We could not load transactions"
              description="The transaction list could not be reached. Try again in a moment."
              action={
                <Button
                  type="button"
                  className="rounded-full"
                  onClick={() => void reconciliationQuery.refetch()}
                  data-ocid="reconciliation.retry_button"
                >
                  Try again
                </Button>
              }
            />
          ) : rows.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="No transactions yet"
              description="Simulated purchases for this business will appear here as customers check out."
            />
          ) : (
            <ReconciliationTable
              rows={rows}
              pendingId={pendingId}
              onRefund={(id) => runAction(id, refund)}
              onCancel={(id) => runAction(id, cancel)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReconciliationPage() {
  const { businessId } = useParams({
    from: "/admin/$businessId/reconciliation",
  });
  const id = useMemo<BusinessId | undefined>(() => {
    try {
      return BigInt(businessId);
    } catch {
      return undefined;
    }
  }, [businessId]);

  return (
    <div
      data-ocid="reconciliation.page"
      className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14"
    >
      <RequireSignIn>
        {id === undefined ? (
          <EmptyState
            icon={Scale}
            title="Invalid business"
            description="This reconciliation link does not point to a valid business."
            action={
              <Button asChild className="rounded-full">
                <Link to="/portfolio">Go to your portfolio</Link>
              </Button>
            }
          />
        ) : (
          <ReconciliationContent businessId={id} />
        )}
      </RequireSignIn>
    </div>
  );
}
