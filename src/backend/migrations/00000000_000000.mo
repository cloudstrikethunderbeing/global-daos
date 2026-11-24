import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  public type OldActor = {};

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

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    businessState : BusinessState;
    consumerState : ConsumerState;
    governanceState : GovernanceState;
    leadsState : LeadsState;
  };

  public func migration(_ : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      businessState = {
        businesses = Map.empty();
        slugIndex = Map.empty();
        var nextBusinessId = 0;
      };
      consumerState = {
        purchases = Map.empty();
        purchasesByConsumer = Map.empty();
        purchasesByBusiness = Map.empty();
        clientRefs = Map.empty();
        shareTokens = Map.empty();
        var nextPurchaseId = 0;
      };
      governanceState = {
        proposals = Map.empty();
        proposalsByBusiness = Map.empty();
        votes = Map.empty();
        stakeholders = Map.empty();
        ledger = Map.empty();
        ledgerByBusiness = Map.empty();
        var nextProposalId = 0;
        var nextStakeholderId = 0;
        var nextLedgerEntryId = 0;
      };
      leadsState = {
        interests = Map.empty();
        nominations = Map.empty();
        var nextLeadId = 0;
        var nextNominationId = 0;
        var uniqueVisitors = 0;
        var returningUsers = 0;
        var demoPurchasesCompleted = 0;
        var consumerRegistrations = 0;
        var businessRegistrations = 0;
        var daoDeployments = 0;
      };
    };
  };
};
