import { ReceiptView } from "@/components/commerce/ReceiptView";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useResolvedReceipt } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { Receipt as ReceiptIcon } from "lucide-react";

function receiptShareUrl(token: string): string {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://globaldaos.app";
  return `${origin}/receipt/${encodeURIComponent(token)}`;
}

export default function ReceiptPage() {
  const { token } = useParams({ from: "/receipt/$token" });
  const { data: receipt, isLoading } = useResolvedReceipt(token);

  return (
    <div
      data-ocid="receipt.page"
      className="mx-auto w-full max-w-xl px-4 py-10 md:py-14"
    >
      {isLoading ? (
        <LoadingSkeleton rows={3} />
      ) : receipt ? (
        <ReceiptView receipt={receipt} shareUrl={receiptShareUrl(token)} />
      ) : (
        <EmptyState
          icon={ReceiptIcon}
          title="Receipt not found"
          description="This receipt link is invalid or has expired."
          action={
            <Button asChild className="rounded-full">
              <Link to="/directory" search={{}}>
                Browse the directory
              </Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
