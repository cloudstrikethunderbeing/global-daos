import { FoundingBadge, RewardType } from "@/backend";

/**
 * Founding Credits are simulated, non-currency recognition markers for
 * early-stage supporters. They are never money, equity, a token or an
 * investment, and every label here keeps that framing explicit.
 */

export const rewardTypeLabels: Record<RewardType, string> = {
  [RewardType.firstSimulatedPurchase]: "First simulated purchase",
  [RewardType.valuableFeedback]: "Valuable feedback",
  [RewardType.daoDeployment]: "DAO deployment",
  [RewardType.consumerReferral]: "Consumer referral",
  [RewardType.earlyConsumerRegistration]: "Early consumer registration",
  [RewardType.foundingBusinessRegistration]: "Founding business registration",
  [RewardType.businessReferral]: "Business referral",
  [RewardType.businessNomination]: "Business nomination",
};

/** Ordered reward types for admin editors and analytics breakdowns. */
export const rewardTypeOrder: RewardType[] = [
  RewardType.firstSimulatedPurchase,
  RewardType.earlyConsumerRegistration,
  RewardType.valuableFeedback,
  RewardType.consumerReferral,
  RewardType.businessReferral,
  RewardType.businessNomination,
  RewardType.foundingBusinessRegistration,
  RewardType.daoDeployment,
];

export const badgeLabels: Record<FoundingBadge, string> = {
  [FoundingBadge.consumer]: "Founding Member",
  [FoundingBadge.business]: "Founding Business",
};

/** Short descriptions used in reward-amount editors. */
export const rewardTypeHints: Record<RewardType, string> = {
  [RewardType.firstSimulatedPurchase]: "Awarded once after a first checkout",
  [RewardType.valuableFeedback]: "Granted for feedback that shapes the product",
  [RewardType.daoDeployment]: "Awarded when a business DAO goes live",
  [RewardType.consumerReferral]: "Paid to the referrer when a consumer joins",
  [RewardType.earlyConsumerRegistration]: "Awarded to early access sign-ups",
  [RewardType.foundingBusinessRegistration]:
    "Awarded to founding business registrations",
  [RewardType.businessReferral]: "Paid to the referrer when a business joins",
  [RewardType.businessNomination]: "Awarded for nominating a business",
};

/** Build the public referral link for a referral code. */
export function buildReferralLink(code: string): string {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://globaldaos.org";
  return `${origin}/early-access?ref=${encodeURIComponent(code)}`;
}

/** Format a credit amount with thousands separators, e.g. 1275n -> "1,275". */
export function formatCredits(amount: bigint): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Number(amount),
  );
}

/** Zero-padded founding member number, e.g. 42n -> "#0042". */
export function formatMemberNumber(memberNumber: bigint): string {
  return `#${memberNumber.toString().padStart(4, "0")}`;
}
