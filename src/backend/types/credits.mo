import Common "common";

module {
  public type CreditEntryId = Common.CreditEntryId;
  public type Timestamp = Common.Timestamp;

  /// Every way a Founding Credit reward can be earned.
  public type RewardType = {
    #earlyConsumerRegistration;
    #foundingBusinessRegistration;
    #firstSimulatedPurchase;
    #businessNomination;
    #consumerReferral;
    #businessReferral;
    #daoDeployment;
    #valuableFeedback;
  };

  /// Configurable credit amount for each reward type.
  public type RewardAmounts = {
    earlyConsumerRegistration : Nat;
    foundingBusinessRegistration : Nat;
    firstSimulatedPurchase : Nat;
    businessNomination : Nat;
    consumerReferral : Nat;
    businessReferral : Nat;
    daoDeployment : Nat;
    valuableFeedback : Nat;
  };

  /// Immutable, auditable credit ledger entry.
  public type CreditLedgerEntry = {
    id : CreditEntryId;
    account : Principal;
    rewardType : RewardType;
    amount : Nat;
    subject : Text;
    memo : Text;
    createdAt : Timestamp;
  };

  /// Founding member badge kind.
  public type FoundingBadge = {
    #consumer;
    #business;
  };

  /// Founding member recognition record.
  public type FoundingMember = {
    account : Principal;
    memberNumber : Nat;
    foundingDate : Timestamp;
    badge : FoundingBadge;
    lifetimeEarned : Nat;
  };

  /// Credit account summary shown in consumer and business dashboards.
  public type CreditAccountSummary = {
    balance : Nat;
    lifetimeEarned : Nat;
    memberNumber : ?Nat;
    foundingDate : ?Timestamp;
    badge : ?FoundingBadge;
    referralCode : Text;
  };

  /// Referral attribution kind.
  public type ReferralKind = {
    #consumer;
    #business;
  };

  /// A referral attribution linking a referrer to a referred account.
  public type ReferralAttribution = {
    referrer : Principal;
    referred : Principal;
    kind : ReferralKind;
    createdAt : Timestamp;
  };

  public type CreditError = {
    #notAuthorized;
    #notFound;
    #invalidInput : Text;
    #duplicate;
    #selfReferral;
  };

  /// Aggregate credit distribution and referral metrics for founder analytics.
  public type CreditsMetrics = {
    totalCreditsAwarded : Nat;
    creditsByRewardType : [(Text, Nat)];
    foundingMemberCount : Nat;
    referralsAttributed : Nat;
    referralsConverted : Nat;
    creditsPaidForReferrals : Nat;
  };
};
