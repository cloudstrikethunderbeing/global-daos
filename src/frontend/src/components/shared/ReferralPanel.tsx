import { QrCode } from "@/components/shared/QrCode";
import { ShareControl } from "@/components/shared/ShareControl";
import { buildReferralLink } from "@/lib/credits";
import { cn } from "@/lib/utils";
import { Gift } from "lucide-react";

/**
 * Referral link with a copy control and a downloadable QR code. The link
 * carries the caller's referral code so new supporters are attributed.
 */
export function ReferralPanel({
  referralCode,
  className,
}: {
  referralCode: string;
  className?: string;
}) {
  const link = buildReferralLink(referralCode);

  return (
    <section
      data-ocid="referral.panel"
      aria-labelledby="referral-panel-title"
      className={cn(
        "rounded-2xl border border-border bg-card/70 p-5 shadow-elevated backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-chart-3/15 text-chart-3">
          <Gift aria-hidden="true" className="size-4" />
        </span>
        <h3
          id="referral-panel-title"
          className="font-display text-base font-semibold"
        >
          Referral link
        </h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Share your link to earn Founding Credits when friends join. Credits are
        simulated recognition markers, not money or equity.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="min-w-0 space-y-3">
          <ShareControl url={link} label="Copy link" />
          <p className="font-mono text-xs text-muted-foreground">
            Code:{" "}
            <span className="font-semibold text-foreground">
              {referralCode}
            </span>
          </p>
        </div>
        <QrCode
          value={link}
          fileName={`global-daos-referral-${referralCode}`}
          size={132}
          className="mx-auto w-full max-w-[13rem] sm:mx-0"
        />
      </div>
    </section>
  );
}
