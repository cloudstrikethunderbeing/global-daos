import { RewardType } from "@/backend";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAttributeBusinessReferral,
  useClaimBusinessNomination,
  useClaimDaoDeployment,
  useClaimFoundingBusinessRegistration,
} from "@/hooks/useQueries";
import { describeBackendError, errorMessage } from "@/lib/errors";
import { cn } from "@/lib/utils";
import { Building2, Rocket, ThumbsUp, UserPlus } from "lucide-react";
import { useState } from "react";

function toMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "__kind__" in error) {
    return describeBackendError(error as { __kind__: string });
  }
  return errorMessage(error);
}

/**
 * Qualifying actions a business owner can complete to earn Founding Credits.
 * Claimable rewards refresh the credit figures through the shared query cache;
 * the referral reward is earned by attributing the code of the business that
 * referred this one.
 */
export function BusinessCreditActions() {
  const claimRegistration = useClaimFoundingBusinessRegistration();
  const claimDeployment = useClaimDaoDeployment();
  const claimNomination = useClaimBusinessNomination();
  const attributeReferral = useAttributeBusinessReferral();

  const [referralCode, setReferralCode] = useState("");
  const [notice, setNotice] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);

  const actions = [
    {
      type: RewardType.foundingBusinessRegistration,
      label: "Claim founding registration",
      description:
        "Awarded once when your business joins as a founding business.",
      icon: Building2,
      mutation: claimRegistration,
    },
    {
      type: RewardType.daoDeployment,
      label: "Claim completed deployment",
      description: "Awarded when your business DAO finishes deploying.",
      icon: Rocket,
      mutation: claimDeployment,
    },
    {
      type: RewardType.businessNomination,
      label: "Claim business nomination",
      description: "Awarded for nominating a business to the program.",
      icon: ThumbsUp,
      mutation: claimNomination,
    },
  ];

  function runClaim(
    label: string,
    mutation: {
      mutate: (
        vars: undefined,
        opts: { onSuccess: () => void; onError: (e: unknown) => void },
      ) => void;
    },
  ) {
    setNotice(null);
    mutation.mutate(undefined, {
      onSuccess: () =>
        setNotice({
          tone: "success",
          message: `${label} recorded. Your recognition score has been updated.`,
        }),
      onError: (error) =>
        setNotice({ tone: "error", message: toMessage(error) }),
    });
  }

  function submitReferral(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = referralCode.trim();
    if (!code) return;
    setNotice(null);
    attributeReferral.mutate(code, {
      onSuccess: () => {
        setReferralCode("");
        setNotice({
          tone: "success",
          message:
            "Referral attributed. The referring business has been credited.",
        });
      },
      onError: (error) =>
        setNotice({ tone: "error", message: toMessage(error) }),
    });
  }

  return (
    <section className="rounded-2xl border border-border bg-card/60 p-5 sm:p-6">
      <SectionHeading
        title="Qualifying actions"
        description="Complete these actions to earn Founding Credits. Figures refresh after each award."
      />
      {notice && (
        <output
          data-ocid={
            notice.tone === "error"
              ? "credits.claim.error_state"
              : "credits.claim.success_state"
          }
          className={cn(
            "mt-4 block rounded-xl border px-4 py-2.5 text-sm",
            notice.tone === "error"
              ? "border-destructive/40 bg-destructive/10 text-destructive"
              : "border-primary/40 bg-primary/10 text-primary",
          )}
        >
          {notice.message}
        </output>
      )}
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const pending = action.mutation.isPending;
          return (
            <li
              key={action.type}
              data-ocid={`credits.action.item.${index + 1}`}
              className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background/40 p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{action.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                data-ocid={`credits.action.claim_button.${index + 1}`}
                disabled={pending}
                onClick={() => runClaim(action.label, action.mutation)}
                className="mt-auto self-start rounded-full"
              >
                {pending ? "Recording…" : "Claim"}
              </Button>
            </li>
          );
        })}

        <li
          data-ocid={`credits.action.item.${actions.length + 1}`}
          className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background/40 p-4"
        >
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
              <UserPlus aria-hidden="true" className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold">Business referral</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                Enter the referral code of the business that invited you. The
                referring business earns the reward once.
              </p>
            </div>
          </div>
          <form onSubmit={submitReferral} className="mt-auto space-y-2">
            <Label htmlFor="business-referral-code" className="sr-only">
              Referral code
            </Label>
            <Input
              id="business-referral-code"
              value={referralCode}
              onChange={(event) => setReferralCode(event.target.value)}
              placeholder="Referral code"
              autoComplete="off"
              data-ocid="credits.referral.input"
            />
            <Button
              type="submit"
              size="sm"
              variant="outline"
              data-ocid="credits.referral.submit_button"
              disabled={attributeReferral.isPending || !referralCode.trim()}
              className="rounded-full"
            >
              {attributeReferral.isPending ? "Attributing…" : "Attribute"}
            </Button>
          </form>
        </li>
      </ul>
    </section>
  );
}
