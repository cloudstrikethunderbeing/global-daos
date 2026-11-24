import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  // --- Inlined domain types (migrations must be self-contained) ---

  type Timestamp = Int;
  type Cents = Nat;

  type ImageRef = Blob;

  type IncentiveToggles = {
    loyaltyRewards : Bool;
    businessFundedOwnership : Bool;
    matchingContributions : Bool;
    profitParticipation : Bool;
    promotionalAllocations : Bool;
  };

  type OwnershipRights = {
    votingEnabled : Bool;
    profitShareEnabled : Bool;
    transferable : Bool;
    rightsSummary : Text;
  };

  type VestingTerms = {
    vestingMonths : Nat;
    cliffMonths : Nat;
    transferRestricted : Bool;
    restrictionsSummary : Text;
  };

  type FoundingAuthority = {
    name : Text;
    role : Text;
    contact : Text;
  };

  type ValuationAssumptions = {
    preMoneyValuation : Cents;
    revenueMultiple : Float;
    annualRevenue : Cents;
    notes : Text;
  };

  type ContributionOptions = {
    roundToNearestDollar : Bool;
    roundToNearestFive : Bool;
    roundToNearestTen : Bool;
    customAllowed : Bool;
    optOutAllowed : Bool;
  };

  type ParticipationSettings = {
    contributionOptions : ContributionOptions;
    incentives : IncentiveToggles;
    minContribution : Cents;
    maxContribution : Cents;
  };

  type Business = {
    id : Nat;
    slug : Text;
    name : Text;
    logo : ?ImageRef;
    industry : Text;
    city : Text;
    country : Text;
    description : Text;
    isFictional : Bool;
    valuation : ValuationAssumptions;
    totalOwnershipSupply : Nat;
    consumerOwnershipPool : Nat;
    maxFundraisingTarget : Cents;
    minContribution : Cents;
    maxContribution : Cents;
    ownershipRights : OwnershipRights;
    foundingAuthorities : [FoundingAuthority];
    constitution : Text;
    vesting : VestingTerms;
    participation : ParticipationSettings;
    owner : Principal;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  type ContributionOption = {
    #nearestDollar;
    #nearestFive;
    #nearestTen;
    #custom;
    #none;
  };

  type Purchase = {
    id : Nat;
    businessId : Nat;
    consumer : Principal;
    productName : Text;
    purchasePrice : Cents;
    contributionAmount : Cents;
    totalPayment : Cents;
    contributionOption : ContributionOption;
    ownershipUnits : Nat;
    createdAt : Timestamp;
  };

  type ProposalStatus = { #open; #passed; #rejected; #closed };

  type Proposal = {
    id : Nat;
    businessId : Nat;
    title : Text;
    body : Text;
    status : ProposalStatus;
    createdBy : Principal;
    createdAt : Timestamp;
    closesAt : Timestamp;
    yesVotes : Nat;
    noVotes : Nat;
    abstainVotes : Nat;
  };

  type VoteChoice = { #yes; #no; #abstain };

  type Stakeholder = {
    id : Nat;
    businessId : Nat;
    principal : Principal;
    displayName : Text;
    ownershipUnits : Nat;
    cumulativeContributions : Cents;
    joinedAt : Timestamp;
  };

  type LedgerEntry = {
    id : Nat;
    businessId : Nat;
    principal : Principal;
    purchaseId : Nat;
    unitsDelta : Nat;
    contributionAmount : Cents;
    reason : Text;
    createdAt : Timestamp;
  };

  type FoundingInterest = {
    id : Nat;
    businessName : Text;
    industry : Text;
    location : Text;
    contactName : Text;
    contactEmail : Text;
    participationInterest : Text;
    createdAt : Timestamp;
  };

  type Nomination = {
    id : Nat;
    businessName : Text;
    category : Text;
    location : Text;
    nominatedBy : Principal;
    createdAt : Timestamp;
  };

  type BusinessState = {
    businesses : Map.Map<Nat, Business>;
    slugIndex : Map.Map<Text, Nat>;
    var nextBusinessId : Nat;
  };

  type ConsumerState = {
    purchases : Map.Map<Nat, Purchase>;
    purchasesByConsumer : Map.Map<Principal, [Nat]>;
    purchasesByBusiness : Map.Map<Nat, [Nat]>;
    clientRefs : Map.Map<Text, Nat>;
    shareTokens : Map.Map<Text, Principal>;
    var nextPurchaseId : Nat;
  };

  type GovernanceState = {
    proposals : Map.Map<Nat, Proposal>;
    proposalsByBusiness : Map.Map<Nat, [Nat]>;
    votes : Map.Map<Text, VoteChoice>;
    stakeholders : Map.Map<Text, Stakeholder>;
    ledger : Map.Map<Nat, LedgerEntry>;
    ledgerByBusiness : Map.Map<Nat, [Nat]>;
    var nextProposalId : Nat;
    var nextStakeholderId : Nat;
    var nextLedgerEntryId : Nat;
  };

  type LeadsState = {
    interests : Map.Map<Nat, FoundingInterest>;
    nominations : Map.Map<Nat, Nomination>;
    var nextLeadId : Nat;
    var nextNominationId : Nat;
    var uniqueVisitors : Nat;
    var returningUsers : Nat;
    var demoPurchasesCompleted : Nat;
    var consumerRegistrations : Nat;
    var businessRegistrations : Nat;
    var daoDeployments : Nat;
  };

  // --- New credits state ---

  type RewardType = {
    #earlyConsumerRegistration;
    #foundingBusinessRegistration;
    #firstSimulatedPurchase;
    #businessNomination;
    #consumerReferral;
    #businessReferral;
    #daoDeployment;
    #valuableFeedback;
  };

  type RewardAmounts = {
    earlyConsumerRegistration : Nat;
    foundingBusinessRegistration : Nat;
    firstSimulatedPurchase : Nat;
    businessNomination : Nat;
    consumerReferral : Nat;
    businessReferral : Nat;
    daoDeployment : Nat;
    valuableFeedback : Nat;
  };

  type CreditLedgerEntry = {
    id : Nat;
    account : Principal;
    rewardType : RewardType;
    amount : Nat;
    subject : Text;
    memo : Text;
    createdAt : Timestamp;
  };

  type FoundingBadge = { #consumer; #business };

  type FoundingMember = {
    account : Principal;
    memberNumber : Nat;
    foundingDate : Timestamp;
    badge : FoundingBadge;
    lifetimeEarned : Nat;
  };

  type ReferralKind = { #consumer; #business };

  type ReferralAttribution = {
    referrer : Principal;
    referred : Principal;
    kind : ReferralKind;
    createdAt : Timestamp;
  };

  type CreditsState = {
    entries : Map.Map<Nat, CreditLedgerEntry>;
    entriesByAccount : Map.Map<Principal, [Nat]>;
    members : Map.Map<Principal, FoundingMember>;
    memberNumbers : Map.Map<Nat, Principal>;
    referrals : Map.Map<Principal, ReferralAttribution>;
    referralCodes : Map.Map<Text, Principal>;
    var rewardAmounts : RewardAmounts;
    var nextEntryId : Nat;
    var nextMemberNumber : Nat;
  };

  // --- New commerce state ---

  type ItemKind = { #product; #service };

  type CatalogueItem = {
    id : Nat;
    businessId : Nat;
    name : Text;
    description : Text;
    price : Cents;
    kind : ItemKind;
    image : ?ImageRef;
    active : Bool;
  };

  type CartLine = { itemId : Nat; quantity : Nat };

  type ProviderKind = { #simulated; #conventional; #blockchain };

  type PaymentProvider = {
    kind : ProviderKind;
    displayName : Text;
    active : Bool;
  };

  type PaymentStatus = { #pending; #paid; #refunded; #cancelled };

  type SimulatedTransaction = {
    id : Nat;
    businessId : Nat;
    consumer : Principal;
    lines : [CartLine];
    subtotal : Cents;
    roundUpContribution : Cents;
    platformFee : Cents;
    total : Cents;
    status : PaymentStatus;
    provider : PaymentProvider;
    transactionRef : Text;
    receiptToken : Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  type DigitalReceipt = {
    receiptToken : Text;
    transactionId : Nat;
    businessName : Text;
    lines : [CartLine];
    revenue : Cents;
    contribution : Cents;
    platformFee : Cents;
    status : PaymentStatus;
    issuedAt : Timestamp;
  };

  type CommerceState = {
    items : Map.Map<Nat, CatalogueItem>;
    itemsByBusiness : Map.Map<Nat, [Nat]>;
    transactions : Map.Map<Nat, SimulatedTransaction>;
    transactionsByBusiness : Map.Map<Nat, [Nat]>;
    transactionsByConsumer : Map.Map<Principal, [Nat]>;
    receipts : Map.Map<Text, DigitalReceipt>;
    clientRefs : Map.Map<Text, Nat>;
    var nextItemId : Nat;
    var nextTransactionId : Nat;
  };

  type OldActor = {
    accessControlState : AccessControl.AccessControlState;
    businessState : BusinessState;
    consumerState : ConsumerState;
    governanceState : GovernanceState;
    leadsState : LeadsState;
  };

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    businessState : BusinessState;
    consumerState : ConsumerState;
    governanceState : GovernanceState;
    leadsState : LeadsState;
    creditsState : CreditsState;
    commerceState : CommerceState;
  };

  public func migration(old : OldActor) : NewActor {
    {
      accessControlState = old.accessControlState;
      businessState = old.businessState;
      consumerState = old.consumerState;
      governanceState = old.governanceState;
      leadsState = old.leadsState;
      creditsState = {
        entries = Map.empty();
        entriesByAccount = Map.empty();
        members = Map.empty();
        memberNumbers = Map.empty();
        referrals = Map.empty();
        referralCodes = Map.empty();
        var rewardAmounts = {
          earlyConsumerRegistration = 100;
          foundingBusinessRegistration = 1_000;
          firstSimulatedPurchase = 25;
          businessNomination = 50;
          consumerReferral = 100;
          businessReferral = 500;
          daoDeployment = 500;
          valuableFeedback = 100;
        };
        var nextEntryId = 0;
        var nextMemberNumber = 1;
      };
      commerceState = {
        items = Map.empty();
        itemsByBusiness = Map.empty();
        transactions = Map.empty();
        transactionsByBusiness = Map.empty();
        transactionsByConsumer = Map.empty();
        receipts = Map.empty();
        clientRefs = Map.empty();
        var nextItemId = 0;
        var nextTransactionId = 0;
      };
    };
  };
};
