import Common "common";

module {
  public type BusinessId = Common.BusinessId;
  public type ProposalId = Common.ProposalId;
  public type LedgerEntryId = Common.LedgerEntryId;
  public type StakeholderId = Common.StakeholderId;
  public type Timestamp = Common.Timestamp;
  public type Cents = Common.Cents;

  public type ProposalStatus = {
    #open;
    #passed;
    #rejected;
    #closed;
  };

  /// A governance proposal scoped to one business.
  public type Proposal = {
    id : ProposalId;
    businessId : BusinessId;
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

  public type VoteChoice = {
    #yes;
    #no;
    #abstain;
  };

  /// A stakeholder entry in a business's ownership ledger.
  public type Stakeholder = {
    id : StakeholderId;
    businessId : BusinessId;
    principal : Principal;
    displayName : Text;
    ownershipUnits : Nat;
    cumulativeContributions : Cents;
    joinedAt : Timestamp;
  };

  /// An auditable simulated ownership ledger entry.
  public type LedgerEntry = {
    id : LedgerEntryId;
    businessId : BusinessId;
    principal : Principal;
    purchaseId : Common.PurchaseId;
    unitsDelta : Nat;
    contributionAmount : Cents;
    reason : Text;
    createdAt : Timestamp;
  };

  /// A row of the simulated capitalization table.
  public type CapTableRow = {
    principal : Principal;
    displayName : Text;
    ownershipUnits : Nat;
    percentageBps : Nat;
    cumulativeContributions : Cents;
  };

  public type GovernanceError = {
    #notAuthorized;
    #notFound;
    #invalidInput : Text;
    #limitExceeded : Text;
    #duplicate;
  };
};
