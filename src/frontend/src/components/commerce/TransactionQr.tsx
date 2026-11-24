import type { SimulatedTransaction } from "@/backend";
import { QrCode } from "@/components/shared/QrCode";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ArrowRight, ScanLine, ShieldCheck } from "lucide-react";

/**
 * Transaction-specific QR code shown at checkout. The code is built from the
 * transaction reference returned by the checkout call so each simulated
 * purchase has its own scannable payload.
 */
export function TransactionQr({
  transaction,
  onViewReceipt,
  className,
}: {
  transaction: SimulatedTransaction;
  onViewReceipt: () => void;
  className?: string;
}) {
  const payload = `globaldaos://receipt/${transaction.receiptToken}?ref=${encodeURIComponent(
    transaction.transactionRef,
  )}`;

  return (
    <div
      data-ocid="checkout.qr_panel"
      className={cn(
        "overflow-hidden rounded-3xl border border-primary/30 bg-gradient-subtle p-6 shadow-glow sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 space-y-3 text-center md:text-left">
          <Badge
            variant="outline"
            className="gap-1.5 border-primary/40 bg-primary/10 text-primary"
          >
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            Simulated purchase complete
          </Badge>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Scan to confirm your receipt
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            This QR code is unique to transaction{" "}
            <span className="font-mono text-foreground">
              {transaction.transactionRef}
            </span>
            . No real payment was taken — the code opens the simulated receipt.
          </p>
          <dl className="mx-auto grid max-w-xs grid-cols-2 gap-3 text-left md:mx-0">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Total
              </dt>
              <dd className="font-numeric text-lg font-semibold text-primary">
                {formatCurrency(transaction.total)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Round-up
              </dt>
              <dd className="font-numeric text-lg font-semibold text-accent">
                {formatCurrency(transaction.roundUpContribution)}
              </dd>
            </div>
          </dl>
          <Button
            type="button"
            className="rounded-full"
            data-ocid="checkout.view_receipt_button"
            onClick={onViewReceipt}
          >
            View digital receipt
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
        <div className="shrink-0">
          <QrCode
            value={payload}
            fileName={`receipt-${transaction.transactionRef}`}
            caption="Scan to open this transaction's receipt."
          />
          <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ScanLine aria-hidden="true" className="size-3.5" />
            Transaction-specific code
          </p>
        </div>
      </div>
    </div>
  );
}
