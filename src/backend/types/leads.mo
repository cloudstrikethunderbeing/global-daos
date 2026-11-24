import Common "common";

module {
  public type LeadId = Common.LeadId;
  public type NominationId = Common.NominationId;
  public type Timestamp = Common.Timestamp;

  /// Founding Business Program interest registration (no DAO deployment).
  public type FoundingInterest = {
    id : LeadId;
    businessName : Text;
    industry : Text;
    location : Text;
    contactName : Text;
    contactEmail : Text;
    participationInterest : Text;
    createdAt : Timestamp;
  };

  public type CreateFoundingInterestInput = {
    businessName : Text;
    industry : Text;
    location : Text;
    contactName : Text;
    contactEmail : Text;
    participationInterest : Text;
  };

  /// A consumer nomination for a business to join the network.
  public type Nomination = {
    id : NominationId;
    businessName : Text;
    category : Text;
    location : Text;
    nominatedBy : Principal;
    createdAt : Timestamp;
  };

  public type CreateNominationInput = {
    businessName : Text;
    category : Text;
    location : Text;
  };

  /// Owner-only founder analytics counters.
  public type FounderAnalytics = {
    uniqueVisitors : Nat;
    returningUsers : Nat;
    demoPurchasesCompleted : Nat;
    consumerRegistrations : Nat;
    businessRegistrations : Nat;
    daoDeployments : Nat;
    businessNominations : Nat;
    visitorToRegistrationBps : Nat;
    registrationToDeploymentBps : Nat;
    totalCreditsAwarded : Nat;
    creditsByRewardType : [(Text, Nat)];
    foundingMemberCount : Nat;
    referralsAttributed : Nat;
    referralsConverted : Nat;
    creditsPaidForReferrals : Nat;
  };

  public type LeadError = {
    #notAuthorized;
    #notFound;
    #invalidInput : Text;
    #duplicate;
  };
};
