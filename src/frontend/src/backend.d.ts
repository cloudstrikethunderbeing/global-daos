import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BusinessAdminStats {
    fundraisingTarget: Cents;
    participatingCustomers: bigint;
    totalContributions: Cents;
    fundraisingProgressBps: bigint;
    ownershipPoolRemaining: bigint;
    purchaseCount: bigint;
    ownershipAllocated: bigint;
    capitalRaised: Cents;
    totalSimulatedSales: Cents;
}
export type BusinessError = {
    __kind__: "notAuthorized";
    notAuthorized: null;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "limitExceeded";
    limitExceeded: string;
} | {
    __kind__: "slugTaken";
    slugTaken: null;
};
export type BusinessId = bigint;
export interface BusinessPublic {
    id: BusinessId;
    vesting: VestingTerms;
    country: string;
    city: string;
    logo?: ImageRef;
    name: string;
    createdAt: Timestamp;
    slug: string;
    description: string;
    maxContribution: Cents;
    participation: ParticipationSettings;
    isFictional: boolean;
    ownershipRights: OwnershipRights;
    consumerOwnershipPool: bigint;
    constitution: string;
    maxFundraisingTarget: Cents;
    totalOwnershipSupply: bigint;
    minContribution: Cents;
    industry: string;
}
export interface CapTableRow {
    principal: Principal;
    displayName: string;
    percentageBps: bigint;
    ownershipUnits: bigint;
    cumulativeContributions: Cents;
}
export interface Cart {
    businessId: BusinessId;
    lines: Array<CartLine>;
    subtotal: Cents;
}
export interface CartLine {
    itemId: CatalogueItemId;
    quantity: bigint;
}
export interface CatalogueItem {
    id: CatalogueItemId;
    active: boolean;
    businessId: BusinessId;
    kind: ItemKind;
    name: string;
    description: string;
    image?: ImageRef;
    price: Cents;
}
export type CatalogueItemId = bigint;
export interface Cell {
    value: Value;
    name: string;
}
export type Cents = bigint;
export interface CheckoutResult {
    transactionRef: string;
    transaction: SimulatedTransaction;
    receiptToken: string;
}
export type CommerceError = {
    __kind__: "notAuthorized";
    notAuthorized: null;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "limitExceeded";
    limitExceeded: string;
} | {
    __kind__: "duplicate";
    duplicate: null;
};
export type ConsumerError = {
    __kind__: "notAuthorized";
    notAuthorized: null;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "limitExceeded";
    limitExceeded: string;
} | {
    __kind__: "duplicate";
    duplicate: null;
};
export interface ContributionOptions {
    roundToNearestTen: boolean;
    customAllowed: boolean;
    optOutAllowed: boolean;
    roundToNearestFive: boolean;
    roundToNearestDollar: boolean;
}
export interface CreateBusinessInput {
    vesting: VestingTerms;
    country: string;
    city: string;
    logo?: ImageRef;
    name: string;
    slug: string;
    description: string;
    valuation: ValuationAssumptions;
    maxContribution: Cents;
    participation: ParticipationSettings;
    isFictional: boolean;
    ownershipRights: OwnershipRights;
    foundingAuthorities: Array<FoundingAuthority>;
    consumerOwnershipPool: bigint;
    constitution: string;
    maxFundraisingTarget: Cents;
    totalOwnershipSupply: bigint;
    minContribution: Cents;
    industry: string;
}
export interface CreateFoundingInterestInput {
    contactName: string;
    participationInterest: string;
    businessName: string;
    contactEmail: string;
    location: string;
    industry: string;
}
export interface CreateNominationInput {
    businessName: string;
    category: string;
    location: string;
}
export interface CreditAccountSummary {
    referralCode: string;
    balance: bigint;
    memberNumber?: bigint;
    foundingDate?: Timestamp;
    badge?: FoundingBadge;
    lifetimeEarned: bigint;
}
export type CreditEntryId = bigint;
export type CreditError = {
    __kind__: "notAuthorized";
    notAuthorized: null;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "selfReferral";
    selfReferral: null;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "duplicate";
    duplicate: null;
};
export interface CreditLedgerEntry {
    id: CreditEntryId;
    subject: string;
    memo: string;
    createdAt: Timestamp;
    rewardType: RewardType;
    account: Principal;
    amount: bigint;
}
export interface DemoPurchaseResult {
    contributionOption: ContributionOption;
    purchasePrice: Cents;
    businessId: BusinessId;
    createdAt: Timestamp;
    productName: string;
    totalPayment: Cents;
    contributionAmount: Cents;
    projectedOwnershipUnits: bigint;
    projectedPercentageBps: bigint;
}
export interface DigitalReceipt {
    status: PaymentStatus;
    revenue: Cents;
    platformFee: Cents;
    businessName: string;
    receiptToken: string;
    lines: Array<CartLine>;
    issuedAt: Timestamp;
    contribution: Cents;
    transactionId: TransactionId;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface FounderAnalytics {
    foundingMemberCount: bigint;
    creditsPaidForReferrals: bigint;
    businessNominations: bigint;
    demoPurchasesCompleted: bigint;
    consumerRegistrations: bigint;
    visitorToRegistrationBps: bigint;
    totalCreditsAwarded: bigint;
    creditsByRewardType: Array<[string, bigint]>;
    registrationToDeploymentBps: bigint;
    businessRegistrations: bigint;
    uniqueVisitors: bigint;
    referralsAttributed: bigint;
    referralsConverted: bigint;
    returningUsers: bigint;
    daoDeployments: bigint;
}
export interface FoundingAuthority {
    contact: string;
    name: string;
    role: string;
}
export interface FoundingInterest {
    id: LeadId;
    contactName: string;
    participationInterest: string;
    createdAt: Timestamp;
    businessName: string;
    contactEmail: string;
    location: string;
    industry: string;
}
export interface FoundingMember {
    memberNumber: bigint;
    foundingDate: Timestamp;
    account: Principal;
    badge: FoundingBadge;
    lifetimeEarned: bigint;
}
export type GovernanceError = {
    __kind__: "notAuthorized";
    notAuthorized: null;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "limitExceeded";
    limitExceeded: string;
} | {
    __kind__: "duplicate";
    duplicate: null;
};
export type ImageRef = Uint8Array;
export interface IncentiveToggles {
    matchingContributions: boolean;
    loyaltyRewards: boolean;
    businessFundedOwnership: boolean;
    promotionalAllocations: boolean;
    profitParticipation: boolean;
}
export type LeadError = {
    __kind__: "notAuthorized";
    notAuthorized: null;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "duplicate";
    duplicate: null;
};
export type LeadId = bigint;
export interface LedgerEntry {
    id: LedgerEntryId;
    principal: Principal;
    businessId: BusinessId;
    unitsDelta: bigint;
    createdAt: Timestamp;
    contributionAmount: Cents;
    purchaseId: PurchaseId;
    reason: string;
}
export type LedgerEntryId = bigint;
export interface Nomination {
    id: NominationId;
    createdAt: Timestamp;
    businessName: string;
    category: string;
    nominatedBy: Principal;
    location: string;
}
export type NominationId = bigint;
export interface OwnershipRights {
    transferable: boolean;
    rightsSummary: string;
    profitShareEnabled: boolean;
    votingEnabled: boolean;
}
export interface ParticipationSettings {
    incentives: IncentiveToggles;
    contributionOptions: ContributionOptions;
    maxContribution: Cents;
    minContribution: Cents;
}
export interface PaymentProvider {
    active: boolean;
    displayName: string;
    kind: ProviderKind;
}
export interface Portfolio {
    totalOwnershipUnits: bigint;
    owner: Principal;
    totalContributions: Cents;
    updatedAt: Timestamp;
    positions: Array<PortfolioPosition>;
}
export interface PortfolioPosition {
    hypotheticalPercentageBps: bigint;
    businessId: BusinessId;
    lastPurchaseAt: Timestamp;
    purchaseCount: bigint;
    ownershipUnits: bigint;
    cumulativeContributions: Cents;
}
export interface Proposal {
    id: ProposalId;
    status: ProposalStatus;
    noVotes: bigint;
    title: string;
    businessId: BusinessId;
    yesVotes: bigint;
    body: string;
    createdAt: Timestamp;
    createdBy: Principal;
    closesAt: Timestamp;
    abstainVotes: bigint;
}
export type ProposalId = bigint;
export interface PublicPortfolio {
    totalOwnershipUnits: bigint;
    businessCount: bigint;
    shareToken: string;
    totalContributions: Cents;
    updatedAt: Timestamp;
    positions: Array<PublicPortfolioPosition>;
}
export interface PublicPortfolioPosition {
    hypotheticalPercentageBps: bigint;
    businessId: BusinessId;
    businessName: string;
    ownershipUnits: bigint;
    cumulativeContributions: Cents;
}
export interface Purchase {
    id: PurchaseId;
    contributionOption: ContributionOption;
    purchasePrice: Cents;
    businessId: BusinessId;
    createdAt: Timestamp;
    productName: string;
    totalPayment: Cents;
    ownershipUnits: bigint;
    consumer: Principal;
    contributionAmount: Cents;
}
export type PurchaseId = bigint;
export interface ReconciliationRow {
    status: PaymentStatus;
    total: Cents;
    revenue: Cents;
    platformFee: Cents;
    timestamp: Timestamp;
    contribution: Cents;
    transactionId: TransactionId;
}
export interface RecordPurchaseInput {
    contributionOption: ContributionOption;
    purchasePrice: Cents;
    businessId: BusinessId;
    productName: string;
    contributionAmount: Cents;
    clientRef: string;
}
export interface ReferralAttribution {
    referred: Principal;
    referrer: Principal;
    kind: ReferralKind;
    createdAt: Timestamp;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface RewardAmounts {
    firstSimulatedPurchase: bigint;
    valuableFeedback: bigint;
    daoDeployment: bigint;
    consumerReferral: bigint;
    earlyConsumerRegistration: bigint;
    foundingBusinessRegistration: bigint;
    businessReferral: bigint;
    businessNomination: bigint;
}
export interface SimulatedTransaction {
    id: TransactionId;
    transactionRef: string;
    status: PaymentStatus;
    total: Cents;
    provider: PaymentProvider;
    businessId: BusinessId;
    platformFee: Cents;
    createdAt: Timestamp;
    receiptToken: string;
    lines: Array<CartLine>;
    updatedAt: Timestamp;
    consumer: Principal;
    roundUpContribution: Cents;
    subtotal: Cents;
}
export interface Stakeholder {
    id: StakeholderId;
    principal: Principal;
    displayName: string;
    businessId: BusinessId;
    joinedAt: Timestamp;
    ownershipUnits: bigint;
    cumulativeContributions: Cents;
}
export type StakeholderId = bigint;
export type Timestamp = bigint;
export type TransactionId = bigint;
export interface UpdateBusinessInput {
    vesting: VestingTerms;
    country: string;
    city: string;
    logo?: ImageRef;
    name: string;
    description: string;
    valuation: ValuationAssumptions;
    maxContribution: Cents;
    participation: ParticipationSettings;
    ownershipRights: OwnershipRights;
    constitution: string;
    maxFundraisingTarget: Cents;
    minContribution: Cents;
    industry: string;
}
export interface ValuationAssumptions {
    revenueMultiple: number;
    preMoneyValuation: Cents;
    notes: string;
    annualRevenue: Cents;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export interface VestingTerms {
    transferRestricted: boolean;
    restrictionsSummary: string;
    cliffMonths: bigint;
    vestingMonths: bigint;
}
export enum ContributionOption {
    custom = "custom",
    none = "none",
    nearestDollar = "nearestDollar",
    nearestTen = "nearestTen",
    nearestFive = "nearestFive"
}
export enum FoundingBadge {
    business = "business",
    consumer = "consumer"
}
export enum ItemKind {
    service = "service",
    product = "product"
}
export enum PaymentStatus {
    cancelled = "cancelled",
    pending = "pending",
    paid = "paid",
    refunded = "refunded"
}
export enum ProposalStatus {
    closed = "closed",
    open = "open",
    rejected = "rejected",
    passed = "passed"
}
export enum ProviderKind {
    simulated = "simulated",
    blockchain = "blockchain",
    conventional = "conventional"
}
export enum ReferralKind {
    business = "business",
    consumer = "consumer"
}
export enum RewardType {
    firstSimulatedPurchase = "firstSimulatedPurchase",
    valuableFeedback = "valuableFeedback",
    daoDeployment = "daoDeployment",
    consumerReferral = "consumerReferral",
    earlyConsumerRegistration = "earlyConsumerRegistration",
    foundingBusinessRegistration = "foundingBusinessRegistration",
    businessReferral = "businessReferral",
    businessNomination = "businessNomination"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VoteChoice {
    no = "no",
    yes = "yes",
    abstain = "abstain"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    attributeBusinessReferral(referrerCode: string): Promise<{
        __kind__: "ok";
        ok: ReferralAttribution;
    } | {
        __kind__: "err";
        err: CreditError;
    }>;
    attributeConsumerReferral(referrerCode: string): Promise<{
        __kind__: "ok";
        ok: ReferralAttribution;
    } | {
        __kind__: "err";
        err: CreditError;
    }>;
    buildCart(businessId: BusinessId, lines: Array<CartLine>): Promise<{
        __kind__: "ok";
        ok: Cart;
    } | {
        __kind__: "err";
        err: CommerceError;
    }>;
    cancelTransaction(transactionId: TransactionId): Promise<{
        __kind__: "ok";
        ok: SimulatedTransaction;
    } | {
        __kind__: "err";
        err: CommerceError;
    }>;
    checkout(cart: Cart, roundUpContribution: Cents, clientRef: string): Promise<{
        __kind__: "ok";
        ok: CheckoutResult;
    } | {
        __kind__: "err";
        err: CommerceError;
    }>;
    claimBusinessNomination(): Promise<{
        __kind__: "ok";
        ok: CreditLedgerEntry;
    } | {
        __kind__: "err";
        err: CreditError;
    }>;
    claimDaoDeployment(): Promise<{
        __kind__: "ok";
        ok: CreditLedgerEntry;
    } | {
        __kind__: "err";
        err: CreditError;
    }>;
    claimEarlyConsumerRegistration(): Promise<{
        __kind__: "ok";
        ok: CreditLedgerEntry;
    } | {
        __kind__: "err";
        err: CreditError;
    }>;
    claimFirstSimulatedPurchase(): Promise<{
        __kind__: "ok";
        ok: CreditLedgerEntry;
    } | {
        __kind__: "err";
        err: CreditError;
    }>;
    claimFoundingBusinessRegistration(): Promise<{
        __kind__: "ok";
        ok: CreditLedgerEntry;
    } | {
        __kind__: "err";
        err: CreditError;
    }>;
    claimValuableFeedback(): Promise<{
        __kind__: "ok";
        ok: CreditLedgerEntry;
    } | {
        __kind__: "err";
        err: CreditError;
    }>;
    createBusiness(input: CreateBusinessInput): Promise<{
        __kind__: "ok";
        ok: BusinessPublic;
    } | {
        __kind__: "err";
        err: BusinessError;
    }>;
    createProposal(businessId: BusinessId, title: string, body: string, closesAt: Timestamp): Promise<{
        __kind__: "ok";
        ok: Proposal;
    } | {
        __kind__: "err";
        err: GovernanceError;
    }>;
    execute(qJson: string): Promise<Result>;
    getApiDoc(): Promise<string>;
    getBusiness(id: BusinessId): Promise<BusinessPublic | null>;
    getBusinessAdminStats(id: BusinessId): Promise<{
        __kind__: "ok";
        ok: BusinessAdminStats;
    } | {
        __kind__: "err";
        err: BusinessError;
    }>;
    getBusinessBySlug(slug: string): Promise<BusinessPublic | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCapTable(businessId: BusinessId): Promise<{
        __kind__: "ok";
        ok: Array<CapTableRow>;
    } | {
        __kind__: "err";
        err: GovernanceError;
    }>;
    getCatalogueItem(itemId: CatalogueItemId): Promise<CatalogueItem | null>;
    getFounderAnalytics(): Promise<{
        __kind__: "ok";
        ok: FounderAnalytics;
    } | {
        __kind__: "err";
        err: LeadError;
    }>;
    getMyContributionHistory(): Promise<Array<CreditLedgerEntry>>;
    getMyCreditSummary(): Promise<CreditAccountSummary>;
    getMyPortfolio(): Promise<Portfolio>;
    getMyPurchaseHistory(): Promise<Array<Purchase>>;
    getMyReferralCode(): Promise<string>;
    getMyShareToken(): Promise<string>;
    getPublicPortfolio(shareToken: string): Promise<PublicPortfolio | null>;
    getReceipt(receiptToken: string): Promise<DigitalReceipt | null>;
    getRewardAmounts(): Promise<RewardAmounts>;
    getTransaction(transactionId: TransactionId): Promise<SimulatedTransaction | null>;
    isCallerAdmin(): Promise<boolean>;
    listBusinesses(): Promise<Array<BusinessPublic>>;
    listCatalogue(businessId: BusinessId): Promise<Array<CatalogueItem>>;
    listCreditLedger(): Promise<Array<CreditLedgerEntry>>;
    listFoundingMembers(): Promise<Array<FoundingMember>>;
    listLedger(businessId: BusinessId): Promise<{
        __kind__: "ok";
        ok: Array<LedgerEntry>;
    } | {
        __kind__: "err";
        err: GovernanceError;
    }>;
    listMyBusinesses(): Promise<Array<BusinessPublic>>;
    listMyNominations(): Promise<Array<Nomination>>;
    listMyTransactions(): Promise<Array<SimulatedTransaction>>;
    listNominations(): Promise<Array<Nomination>>;
    listPaymentProviders(): Promise<Array<PaymentProvider>>;
    listProposals(businessId: BusinessId): Promise<Array<Proposal>>;
    listReconciliation(businessId: BusinessId): Promise<Array<ReconciliationRow>>;
    listStakeholders(businessId: BusinessId): Promise<{
        __kind__: "ok";
        ok: Array<Stakeholder>;
    } | {
        __kind__: "err";
        err: GovernanceError;
    }>;
    nominateBusiness(input: CreateNominationInput): Promise<{
        __kind__: "ok";
        ok: Nomination;
    } | {
        __kind__: "err";
        err: LeadError;
    }>;
    recordBusinessRegistration(): Promise<void>;
    recordConsumerRegistration(): Promise<void>;
    recordDaoDeployment(): Promise<void>;
    recordDemoPurchase(input: RecordPurchaseInput): Promise<{
        __kind__: "ok";
        ok: DemoPurchaseResult;
    } | {
        __kind__: "err";
        err: ConsumerError;
    }>;
    recordDemoPurchaseCounter(): Promise<void>;
    recordPurchase(input: RecordPurchaseInput): Promise<{
        __kind__: "ok";
        ok: Purchase;
    } | {
        __kind__: "err";
        err: ConsumerError;
    }>;
    recordVisit(returning: boolean): Promise<void>;
    refundTransaction(transactionId: TransactionId): Promise<{
        __kind__: "ok";
        ok: SimulatedTransaction;
    } | {
        __kind__: "err";
        err: CommerceError;
    }>;
    registerFoundingInterest(input: CreateFoundingInterestInput): Promise<{
        __kind__: "ok";
        ok: FoundingInterest;
    } | {
        __kind__: "err";
        err: LeadError;
    }>;
    schema(): Promise<string>;
    setRewardAmounts(amounts: RewardAmounts): Promise<{
        __kind__: "ok";
        ok: RewardAmounts;
    } | {
        __kind__: "err";
        err: CreditError;
    }>;
    updateBusiness(id: BusinessId, input: UpdateBusinessInput): Promise<{
        __kind__: "ok";
        ok: BusinessPublic;
    } | {
        __kind__: "err";
        err: BusinessError;
    }>;
    voteOnProposal(proposalId: ProposalId, choice: VoteChoice): Promise<{
        __kind__: "ok";
        ok: Proposal;
    } | {
        __kind__: "err";
        err: GovernanceError;
    }>;
}
