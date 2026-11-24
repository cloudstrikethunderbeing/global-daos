import Common "common";

module {
  public type BusinessId = Common.BusinessId;
  public type Timestamp = Common.Timestamp;
  public type Cents = Common.Cents;
  public type ImageRef = Common.ImageRef;

  /// Optional business-funded participation models. All default to off.
  public type IncentiveToggles = {
    loyaltyRewards : Bool;
    businessFundedOwnership : Bool;
    matchingContributions : Bool;
    profitParticipation : Bool;
    promotionalAllocations : Bool;
  };

  /// Ownership and governance rights granted to consumer stakeholders.
  public type OwnershipRights = {
    votingEnabled : Bool;
    profitShareEnabled : Bool;
    transferable : Bool;
    rightsSummary : Text;
  };

  /// Vesting and transfer restrictions applied to consumer ownership units.
  public type VestingTerms = {
    vestingMonths : Nat;
    cliffMonths : Nat;
    transferRestricted : Bool;
    restrictionsSummary : Text;
  };

  /// A founding authority able to administer the business workspace.
  public type FoundingAuthority = {
    name : Text;
    role : Text;
    contact : Text;
  };

  /// Business valuation assumptions used for illustrative ownership math.
  public type ValuationAssumptions = {
    preMoneyValuation : Cents;
    revenueMultiple : Float;
    annualRevenue : Cents;
    notes : Text;
  };

  /// Configurable round-up contribution options offered at checkout.
  public type ContributionOptions = {
    roundToNearestDollar : Bool;
    roundToNearestFive : Bool;
    roundToNearestTen : Bool;
    customAllowed : Bool;
    optOutAllowed : Bool;
  };

  /// Participation program settings for a business.
  public type ParticipationSettings = {
    contributionOptions : ContributionOptions;
    incentives : IncentiveToggles;
    minContribution : Cents;
    maxContribution : Cents;
  };

  /// Full business DAO record as stored.
  public type Business = {
    id : BusinessId;
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

  /// Public projection of a business (no private admin fields).
  public type BusinessPublic = {
    id : BusinessId;
    slug : Text;
    name : Text;
    logo : ?ImageRef;
    industry : Text;
    city : Text;
    country : Text;
    description : Text;
    isFictional : Bool;
    totalOwnershipSupply : Nat;
    consumerOwnershipPool : Nat;
    maxFundraisingTarget : Cents;
    minContribution : Cents;
    maxContribution : Cents;
    ownershipRights : OwnershipRights;
    constitution : Text;
    vesting : VestingTerms;
    participation : ParticipationSettings;
    createdAt : Timestamp;
  };

  /// Input for deploying a new business DAO.
  public type CreateBusinessInput = {
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
  };

  /// Editable subset of a business profile and program settings.
  public type UpdateBusinessInput = {
    name : Text;
    logo : ?ImageRef;
    industry : Text;
    city : Text;
    country : Text;
    description : Text;
    valuation : ValuationAssumptions;
    maxFundraisingTarget : Cents;
    minContribution : Cents;
    maxContribution : Cents;
    ownershipRights : OwnershipRights;
    constitution : Text;
    vesting : VestingTerms;
    participation : ParticipationSettings;
  };

  /// Aggregate admin metrics for one business workspace.
  public type BusinessAdminStats = {
    totalSimulatedSales : Cents;
    totalContributions : Cents;
    capitalRaised : Cents;
    fundraisingTarget : Cents;
    fundraisingProgressBps : Nat;
    participatingCustomers : Nat;
    ownershipAllocated : Nat;
    ownershipPoolRemaining : Nat;
    purchaseCount : Nat;
  };

  public type BusinessError = {
    #notAuthorized;
    #notFound;
    #slugTaken;
    #invalidInput : Text;
    #limitExceeded : Text;
  };
};
