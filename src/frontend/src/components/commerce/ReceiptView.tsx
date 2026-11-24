import type { DigitalReceipt } from "@/backend";
import { PaymentStatus } from "@/backend";
import { ShareControl } from "@/components/shared/ShareControl";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useResolvedCatalogueItem } from "@/hooks/useQueries";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  Coins,
  Receipt as ReceiptIcon,
  RotateCcw,
  Store,
  XCircle,
} from "lucide-react";

const statusMeta: Record<
  PaymentStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  [PaymentStatus.paid]: {
    label: "Paid (simulated)",
    className: "border-success/40 bg-success/10 text-success",
    icon: CheckCircle2,
  },
  [PaymentStatus.pending]: {
    label: "Pending",
    className: "border-warning/40 bg-warning/10 text-warning",
    icon: Clock,
  },
  [PaymentStatus.refunded]: {
    label: "Refunded",
    className: "border-accent/40 bg-accent/10 text-accent",
    icon: RotateCcw,
  },
  [PaymentStatus.cancelled]: {
    label: "Cancelled",
    className: "border-border bg-muted/60 text-muted-foreground",
    icon: XCircle,
  },
};

function ReceiptLine({
  itemId,
  quantity,
}: {
  itemId: bigint;
  quantity: bigint;
}) {
  const { data: item } = useResolvedCatalogueItem(itemId);
  return (
    <li className="flex items-center justify-between gap-3 py-2.5 text-sm">
      <span className="min-w-0 text-foreground">
        <span className="truncate">
          {item?.name ?? `Item #${itemId.toString()}`}
        </span>
        <span className="ml-1.5 text-muted-foreground">
          × {quantity.toString()}
        </span>
      </span>
      <span className="shrink-0 font-numeric tabular-nums text-muted-foreground">
        {item ? formatCurrency(item.price * quantity) : "—"}
      </span>
    </li>
  );
}

/**
 * Token-readable digital receipt. Shows the business name, line items, the
 * revenue / contribution / platform-fee amounts as separate figures, the
 * status, the issue date and a copyable share link.
 */
export function ReceiptView({
  receipt,
  shareUrl,
}: {
  receipt: DigitalReceipt;
  shareUrl: string;
}) {
  const meta = statusMeta[receipt.status];
  const StatusIcon = meta.icon;
  const subtotal = receipt.revenue + receipt.platformFee;

  return (
    <div data-ocid="receipt.view" className="space-y-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ReceiptIcon aria-hidden="true" className="size-6" />
        </span>
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Digital receipt
          </h1>
          <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <Store aria-hidden="true" className="size-4 text-accent" />
            {receipt.businessName}
          </p>
          <p className="text-xs text-muted-foreground">
            Issued {formatDateTime(receipt.issuedAt)}
          </p>
        </div>
        <Badge
          variant="outline"
          className={cn("gap-1.5", meta.className)}
          data-ocid="receipt.status"
        >
          <StatusIcon aria-hidden="true" className="size-3.5" />
          {meta.label}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">Line items</CardTitle>
          <CardDescription>
            Transaction #{receipt.transactionId.toString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border">
            {receipt.lines.map((line) => (
              <ReceiptLine
                key={line.itemId.toString()}
                itemId={line.itemId}
                quantity={line.quantity}
              />
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display text-base">
            <Coins aria-hidden="true" className="size-4 text-primary" />
            Separated amounts
          </CardTitle>
          <CardDescription>
            Revenue, contribution and platform fee are tracked as distinct
            figures.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Business revenue</span>
            <span
              className="font-numeric font-medium tabular-nums text-primary"
              data-ocid="receipt.revenue"
            >
              {formatCurrency(receipt.revenue)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Round-up contribution</span>
            <span
              className="font-numeric font-medium tabular-nums text-accent"
              data-ocid="receipt.contribution"
            >
              {formatCurrency(receipt.contribution)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Platform fee</span>
            <span
              className="font-numeric font-medium tabular-nums text-muted-foreground"
              data-ocid="receipt.platform_fee"
            >
              {formatCurrency(receipt.platformFee)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2.5 text-base">
            <span className="font-semibold">Simulated total</span>
            <span className="font-numeric font-semibold tabular-nums">
              {formatCurrency(subtotal + receipt.contribution)}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2 rounded-2xl border border-border bg-card/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Share this receipt
        </p>
        <ShareControl url={shareUrl} label="Copy receipt link" />
      </div>

      <SimulatedBanner />
    </div>
  );
}
