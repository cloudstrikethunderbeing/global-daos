import type { ReconciliationRow, TransactionId } from "@/backend";
import { PaymentStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { RotateCcw, XCircle } from "lucide-react";

const statusStyles: Record<PaymentStatus, string> = {
  [PaymentStatus.paid]: "border-success/40 bg-success/10 text-success",
  [PaymentStatus.pending]: "border-warning/40 bg-warning/10 text-warning",
  [PaymentStatus.refunded]: "border-accent/40 bg-accent/10 text-accent",
  [PaymentStatus.cancelled]: "border-border bg-muted/60 text-muted-foreground",
};

const statusLabels: Record<PaymentStatus, string> = {
  [PaymentStatus.paid]: "Paid",
  [PaymentStatus.pending]: "Pending",
  [PaymentStatus.refunded]: "Refunded",
  [PaymentStatus.cancelled]: "Cancelled",
};

export function ReconciliationTable({
  rows,
  pendingId,
  onRefund,
  onCancel,
}: {
  rows: ReconciliationRow[];
  pendingId: TransactionId | null;
  onRefund: (id: TransactionId) => void;
  onCancel: (id: TransactionId) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table
        data-ocid="reconciliation.table"
        className="w-full min-w-[52rem] border-collapse text-sm"
      >
        <thead>
          <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <th scope="col" className="py-2.5 pr-3 font-semibold">
              Date
            </th>
            <th scope="col" className="py-2.5 pr-3 font-semibold">
              Transaction
            </th>
            <th scope="col" className="py-2.5 pr-3 font-semibold">
              Status
            </th>
            <th scope="col" className="py-2.5 pr-3 text-right font-semibold">
              Revenue
            </th>
            <th scope="col" className="py-2.5 pr-3 text-right font-semibold">
              Contribution
            </th>
            <th scope="col" className="py-2.5 pr-3 text-right font-semibold">
              Platform fee
            </th>
            <th scope="col" className="py-2.5 pr-3 text-right font-semibold">
              Total
            </th>
            <th scope="col" className="py-2.5 text-right font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const isPaid = row.status === PaymentStatus.paid;
            const isPending = pendingId === row.transactionId;
            return (
              <tr
                key={row.transactionId.toString()}
                data-ocid={`reconciliation.row.${index + 1}`}
                className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/30"
              >
                <td className="whitespace-nowrap py-3 pr-3 text-muted-foreground">
                  {formatDateTime(row.timestamp)}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 font-mono text-xs font-medium tabular-nums">
                  #{row.transactionId.toString()}
                </td>
                <td className="py-3 pr-3">
                  <Badge
                    variant="outline"
                    className={cn("rounded-full", statusStyles[row.status])}
                  >
                    {statusLabels[row.status]}
                  </Badge>
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-right font-numeric tabular-nums">
                  {formatCurrency(row.revenue)}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-right font-numeric tabular-nums text-muted-foreground">
                  {formatCurrency(row.contribution)}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-right font-numeric tabular-nums text-muted-foreground">
                  {formatCurrency(row.platformFee)}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-right font-numeric font-semibold tabular-nums">
                  {formatCurrency(row.total)}
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    {isPaid ? (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          disabled={isPending}
                          onClick={() => onRefund(row.transactionId)}
                          data-ocid={`reconciliation.refund_button.${index + 1}`}
                        >
                          <RotateCcw aria-hidden="true" className="size-3.5" />
                          Refund
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="rounded-full text-muted-foreground hover:text-destructive"
                          disabled={isPending}
                          onClick={() => onCancel(row.transactionId)}
                          data-ocid={`reconciliation.cancel_button.${index + 1}`}
                        >
                          <XCircle aria-hidden="true" className="size-3.5" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No actions
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
