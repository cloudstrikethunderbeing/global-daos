import { createActor } from "@/backend";
import type {
  BusinessId,
  Cart,
  CartLine,
  CatalogueItemId,
  Cents,
  CreateBusinessInput,
  CreateFoundingInterestInput,
  CreateNominationInput,
  DigitalReceipt,
  ProposalId,
  RecordPurchaseInput,
  RewardAmounts,
  TransactionId,
  UpdateBusinessInput,
  VoteChoice,
} from "@/backend";
import { demoReceiptFromToken, findDemoItemById } from "@/lib/demoCatalogue";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

/**
 * Fictional demo checkouts persist nothing on the backend, so the exact receipt
 * for a `shop-<slug>-<stamp>` token is kept in memory for this session. A reload
 * falls back to the catalogue-derived receipt from `demoReceiptFromToken`.
 */
const demoReceiptCache = new Map<string, DigitalReceipt>();

/** Remember the real line items and amounts of a completed demo checkout. */
export function cacheDemoReceipt(receipt: DigitalReceipt): void {
  demoReceiptCache.set(receipt.receiptToken, receipt);
}

export const queryKeys = {
  businesses: ["businesses"] as const,
  business: (id: BusinessId) => ["business", id.toString()] as const,
  businessBySlug: (slug: string) => ["business", "slug", slug] as const,
  myBusinesses: ["businesses", "mine"] as const,
  adminStats: (id: BusinessId) =>
    ["business", id.toString(), "adminStats"] as const,
  portfolio: ["portfolio"] as const,
  purchaseHistory: ["purchases"] as const,
  shareToken: ["shareToken"] as const,
  publicPortfolio: (token: string) => ["portfolio", "public", token] as const,
  proposals: (id: BusinessId) =>
    ["business", id.toString(), "proposals"] as const,
  stakeholders: (id: BusinessId) =>
    ["business", id.toString(), "stakeholders"] as const,
  ledger: (id: BusinessId) => ["business", id.toString(), "ledger"] as const,
  capTable: (id: BusinessId) =>
    ["business", id.toString(), "capTable"] as const,
  nominations: ["nominations"] as const,
  myNominations: ["nominations", "mine"] as const,
  founderAnalytics: ["analytics", "founder"] as const,
  isAdmin: ["auth", "isAdmin"] as const,
  apiDoc: ["apiDoc"] as const,
  creditSummary: ["credits", "summary"] as const,
  creditHistory: ["credits", "history"] as const,
  creditLedger: ["credits", "ledger"] as const,
  referralCode: ["credits", "referralCode"] as const,
  rewardAmounts: ["credits", "rewardAmounts"] as const,
  catalogue: (id: BusinessId) =>
    ["business", id.toString(), "catalogue"] as const,
  catalogueItem: (id: CatalogueItemId) =>
    ["catalogue", "item", id.toString()] as const,
  receipt: (token: string) => ["receipt", token] as const,
  transaction: (id: TransactionId) => ["transaction", id.toString()] as const,
  myTransactions: ["transactions", "mine"] as const,
  reconciliation: (id: BusinessId) =>
    ["business", id.toString(), "reconciliation"] as const,
  paymentProviders: ["paymentProviders"] as const,
};

/* ------------------------------- Businesses ------------------------------- */

export function useBusinesses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.businesses,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBusinesses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBusiness(id: BusinessId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.business(id ?? 0n),
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getBusiness(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useBusinessBySlug(slug: string | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.businessBySlug(slug ?? ""),
    queryFn: async () => {
      if (!actor || !slug) return null;
      return actor.getBusinessBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useMyBusinesses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.myBusinesses,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyBusinesses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBusinessAdminStats(id: BusinessId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.adminStats(id ?? 0n),
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await actor.getBusinessAdminStats(id);
      return result.__kind__ === "ok" ? result.ok : null;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useCreateBusiness() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateBusinessInput) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.createBusiness(input);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.businesses });
      void queryClient.invalidateQueries({ queryKey: queryKeys.myBusinesses });
    },
  });
}

export function useUpdateBusiness() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: BusinessId; input: UpdateBusinessInput }) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.updateBusiness(id, input);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: (business) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.businesses });
      void queryClient.invalidateQueries({ queryKey: queryKeys.myBusinesses });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.business(business.id),
      });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.businessBySlug(business.slug),
      });
    },
  });
}

/* -------------------------------- Purchases ------------------------------- */

export function useRecordPurchase() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: RecordPurchaseInput) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.recordPurchase(input);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.portfolio });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.purchaseHistory,
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.businesses });
    },
  });
}

export function useMyPurchaseHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.purchaseHistory,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPurchaseHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

/* -------------------------------- Portfolio ------------------------------- */

export function useMyPortfolio() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.portfolio,
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyPortfolio();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyShareToken() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.shareToken,
    queryFn: async () => {
      if (!actor) return "";
      return actor.getMyShareToken();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePublicPortfolio(token: string | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.publicPortfolio(token ?? ""),
    queryFn: async () => {
      if (!actor || !token) return null;
      return actor.getPublicPortfolio(token);
    },
    enabled: !!actor && !isFetching && !!token,
  });
}

/* -------------------------------- Governance ------------------------------ */

export function useProposals(businessId: BusinessId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.proposals(businessId ?? 0n),
    queryFn: async () => {
      if (!actor || businessId === undefined) return [];
      return actor.listProposals(businessId);
    },
    enabled: !!actor && !isFetching && businessId !== undefined,
  });
}

export function useCreateProposal() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      businessId,
      title,
      body,
      closesAt,
    }: {
      businessId: BusinessId;
      title: string;
      body: string;
      closesAt: bigint;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.createProposal(
        businessId,
        title,
        body,
        closesAt,
      );
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: (_proposal, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.proposals(variables.businessId),
      });
    },
  });
}

export function useVoteOnProposal() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      proposalId,
      choice,
    }: { proposalId: ProposalId; choice: VoteChoice }) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.voteOnProposal(proposalId, choice);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: (proposal) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.proposals(proposal.businessId),
      });
    },
  });
}

export function useStakeholders(businessId: BusinessId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.stakeholders(businessId ?? 0n),
    queryFn: async () => {
      if (!actor || businessId === undefined) return [];
      const result = await actor.listStakeholders(businessId);
      return result.__kind__ === "ok" ? result.ok : [];
    },
    enabled: !!actor && !isFetching && businessId !== undefined,
  });
}

export function useLedger(businessId: BusinessId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.ledger(businessId ?? 0n),
    queryFn: async () => {
      if (!actor || businessId === undefined) return [];
      const result = await actor.listLedger(businessId);
      return result.__kind__ === "ok" ? result.ok : [];
    },
    enabled: !!actor && !isFetching && businessId !== undefined,
  });
}

export function useCapTable(businessId: BusinessId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.capTable(businessId ?? 0n),
    queryFn: async () => {
      if (!actor || businessId === undefined) return [];
      const result = await actor.getCapTable(businessId);
      return result.__kind__ === "ok" ? result.ok : [];
    },
    enabled: !!actor && !isFetching && businessId !== undefined,
  });
}

/* ---------------------------------- Leads --------------------------------- */

export function useRegisterFoundingInterest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateFoundingInterestInput) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.registerFoundingInterest(input);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.founderAnalytics,
      });
    },
  });
}

export function useNominateBusiness() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateNominationInput) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.nominateBusiness(input);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.nominations });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.founderAnalytics,
      });
    },
  });
}

export function useNominations() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.nominations,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listNominations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyNominations() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.myNominations,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyNominations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useApiDoc() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.apiDoc,
    queryFn: async () => {
      if (!actor) return "";
      return actor.getApiDoc();
    },
    enabled: !!actor && !isFetching,
  });
}

/* -------------------------------- Analytics ------------------------------- */

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.isAdmin,
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFounderAnalytics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.founderAnalytics,
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getFounderAnalytics();
      return result.__kind__ === "ok" ? result.ok : null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordVisit() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (returning: boolean) => {
      if (!actor) return;
      await actor.recordVisit(returning);
    },
  });
}

export function useRecordDemoPurchase() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: RecordPurchaseInput) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.recordDemoPurchase(input);
      if (result.__kind__ === "err") throw result.err;
      // Count the completed demo purchase toward the funnel. The counter is not
      // idempotent, so only call it after the projection succeeded.
      await actor.recordDemoPurchaseCounter();
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.founderAnalytics,
      });
    },
  });
}

export function useRecordConsumerRegistration() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.recordConsumerRegistration();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.founderAnalytics,
      });
    },
  });
}

export function useRecordBusinessRegistration() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.recordBusinessRegistration();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.founderAnalytics,
      });
    },
  });
}

export function useRecordDaoDeployment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.recordDaoDeployment();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.founderAnalytics,
      });
    },
  });
}

/* -------------------------------- Credits --------------------------------- */

export function useMyCreditSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.creditSummary,
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyCreditSummary();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyContributionHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.creditHistory,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyContributionHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreditLedger() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.creditLedger,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCreditLedger();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyReferralCode() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.referralCode,
    queryFn: async () => {
      if (!actor) return "";
      return actor.getMyReferralCode();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRewardAmounts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.rewardAmounts,
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRewardAmounts();
    },
    enabled: !!actor && !isFetching,
  });
}

type CreditClaimMethod =
  | "claimFirstSimulatedPurchase"
  | "claimEarlyConsumerRegistration"
  | "claimValuableFeedback"
  | "claimConsumerReferral"
  | "claimBusinessNomination"
  | "claimFoundingBusinessRegistration"
  | "claimDaoDeployment";

function useCreditClaim(method: CreditClaimMethod) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor[method]();
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.creditSummary });
      void queryClient.invalidateQueries({ queryKey: queryKeys.creditHistory });
      void queryClient.invalidateQueries({ queryKey: queryKeys.creditLedger });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.founderAnalytics,
      });
    },
  });
}

export function useClaimFirstSimulatedPurchase() {
  return useCreditClaim("claimFirstSimulatedPurchase");
}

export function useClaimEarlyConsumerRegistration() {
  return useCreditClaim("claimEarlyConsumerRegistration");
}

export function useClaimValuableFeedback() {
  return useCreditClaim("claimValuableFeedback");
}

export function useClaimConsumerReferral() {
  return useCreditClaim("claimConsumerReferral");
}

export function useClaimBusinessNomination() {
  return useCreditClaim("claimBusinessNomination");
}

export function useClaimFoundingBusinessRegistration() {
  return useCreditClaim("claimFoundingBusinessRegistration");
}

export function useClaimDaoDeployment() {
  return useCreditClaim("claimDaoDeployment");
}

export function useAttributeConsumerReferral() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (referrerCode: string) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.attributeConsumerReferral(referrerCode);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.founderAnalytics,
      });
    },
  });
}

export function useAttributeBusinessReferral() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (referrerCode: string) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.attributeBusinessReferral(referrerCode);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.founderAnalytics,
      });
    },
  });
}

export function useSetRewardAmounts() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (amounts: RewardAmounts) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.setRewardAmounts(amounts);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.rewardAmounts,
      });
    },
  });
}

/* -------------------------------- Commerce -------------------------------- */

export function useCatalogue(businessId: BusinessId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.catalogue(businessId ?? 0n),
    queryFn: async () => {
      if (!actor || businessId === undefined) return [];
      return actor.listCatalogue(businessId);
    },
    enabled: !!actor && !isFetching && businessId !== undefined,
  });
}

export function useCatalogueItem(itemId: CatalogueItemId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.catalogueItem(itemId ?? 0n),
    queryFn: async () => {
      if (!actor || itemId === undefined) return null;
      return actor.getCatalogueItem(itemId);
    },
    enabled: !!actor && !isFetching && itemId !== undefined,
  });
}

/**
 * Resolve a catalogue item by id, falling back to the fictional demo catalogue
 * for synthetic demo ids that have no backend record.
 */
export function useResolvedCatalogueItem(itemId: CatalogueItemId | undefined) {
  const demoItem = useMemo(
    () => (itemId === undefined ? undefined : findDemoItemById(itemId)),
    [itemId],
  );
  const query = useCatalogueItem(demoItem ? undefined : itemId);
  return { data: demoItem ?? query.data ?? null };
}

export function useBuildCart() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      businessId,
      lines,
    }: { businessId: BusinessId; lines: CartLine[] }) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.buildCart(businessId, lines);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
  });
}

export function useCheckout() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      cart,
      roundUpContribution,
      clientRef,
    }: {
      cart: Cart;
      roundUpContribution: Cents;
      clientRef: string;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.checkout(cart, roundUpContribution, clientRef);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.myTransactions,
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.portfolio });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.purchaseHistory,
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.creditSummary });
      void queryClient.invalidateQueries({ queryKey: queryKeys.creditHistory });
      void queryClient.invalidateQueries({ queryKey: queryKeys.businesses });
    },
  });
}

export function useReceipt(token: string | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.receipt(token ?? ""),
    queryFn: async () => {
      if (!actor || !token) return null;
      return actor.getReceipt(token);
    },
    enabled: !!actor && !isFetching && !!token,
  });
}

/**
 * Resolve a receipt by token, falling back to a locally rebuilt receipt for a
 * fictional demo checkout whose token is the `shop-<slug>-<stamp>` client ref.
 */
export function useResolvedReceipt(token: string | undefined) {
  const demoReceipt = useMemo(() => {
    if (!token) return null;
    return demoReceiptCache.get(token) ?? demoReceiptFromToken(token);
  }, [token]);
  const query = useReceipt(demoReceipt ? undefined : token);
  return {
    data: demoReceipt ?? query.data ?? null,
    isLoading: demoReceipt ? false : query.isLoading,
  };
}

export function useTransaction(transactionId: TransactionId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.transaction(transactionId ?? 0n),
    queryFn: async () => {
      if (!actor || transactionId === undefined) return null;
      return actor.getTransaction(transactionId);
    },
    enabled: !!actor && !isFetching && transactionId !== undefined,
  });
}

export function useMyTransactions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.myTransactions,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyTransactions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRefundTransaction() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (transactionId: TransactionId) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.refundTransaction(transactionId);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: (transaction) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.myTransactions,
      });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.transaction(transaction.id),
      });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.reconciliation(transaction.businessId),
      });
    },
  });
}

export function useCancelTransaction() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (transactionId: TransactionId) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.cancelTransaction(transactionId);
      if (result.__kind__ === "err") throw result.err;
      return result.ok;
    },
    onSuccess: (transaction) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.myTransactions,
      });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.transaction(transaction.id),
      });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.reconciliation(transaction.businessId),
      });
    },
  });
}

export function useReconciliation(businessId: BusinessId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.reconciliation(businessId ?? 0n),
    queryFn: async () => {
      if (!actor || businessId === undefined) return [];
      return actor.listReconciliation(businessId);
    },
    enabled: !!actor && !isFetching && businessId !== undefined,
  });
}

export function usePaymentProviders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.paymentProviders,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPaymentProviders();
    },
    enabled: !!actor && !isFetching,
  });
}
