import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/governance";
import BusinessTypes "../types/business";

module {
  public type Proposal = Types.Proposal;
  public type ProposalId = Types.ProposalId;
  public type VoteChoice = Types.VoteChoice;
  public type Stakeholder = Types.Stakeholder;
  public type LedgerEntry = Types.LedgerEntry;
  public type CapTableRow = Types.CapTableRow;
  public type GovernanceError = Types.GovernanceError;

  public type State = {
    proposals : Map.Map<ProposalId, Proposal>;
    proposalsByBusiness : Map.Map<Common.BusinessId, [ProposalId]>;
    votes : Map.Map<Text, VoteChoice>;
    stakeholders : Map.Map<Text, Stakeholder>;
    ledger : Map.Map<Common.LedgerEntryId, LedgerEntry>;
    ledgerByBusiness : Map.Map<Common.BusinessId, [Common.LedgerEntryId]>;
    var nextProposalId : Nat;
    var nextStakeholderId : Nat;
    var nextLedgerEntryId : Nat;
  };

  /// Read-only view of the business registry needed for owner checks.
  public type BusinessSource = {
    businesses : Map.Map<Common.BusinessId, BusinessTypes.Business>;
  };

  // Composite key for the per-business stakeholder map.
  func stakeholderKey(businessId : Common.BusinessId, principal : Principal) : Text {
    businessId.toText() # ":" # principal.toText();
  };

  // Composite key for the per-proposal, per-voter vote map.
  func voteKey(proposalId : ProposalId, voter : Principal) : Text {
    proposalId.toText() # ":" # voter.toText();
  };

  func isOwner(source : BusinessSource, caller : Principal, businessId : Common.BusinessId) : Bool {
    switch (source.businesses.get(businessId)) {
      case (?b) { Principal.equal(b.owner, caller) };
      case null { false };
    };
  };

  func hasOwnership(state : State, businessId : Common.BusinessId, principal : Principal) : Bool {
    switch (state.stakeholders.get(stakeholderKey(businessId, principal))) {
      case (?s) { s.ownershipUnits > 0 };
      case null { false };
    };
  };

  public func createProposal(state : State, source : BusinessSource, caller : Principal, businessId : Common.BusinessId, title : Text, body : Text, closesAt : Common.Timestamp) : { #ok : Proposal; #err : GovernanceError } {
    if (not isOwner(source, caller, businessId)) {
      return #err(#notAuthorized);
    };
    if (title.size() == 0) {
      return #err(#invalidInput("Title is required"));
    };
    let now = Time.now();
    if (closesAt <= now) {
      return #err(#invalidInput("Closing time must be in the future"));
    };
    let id = state.nextProposalId;
    state.nextProposalId := id + 1;
    let proposal : Proposal = {
      id;
      businessId;
      title;
      body;
      status = #open;
      createdBy = caller;
      createdAt = now;
      closesAt;
      yesVotes = 0;
      noVotes = 0;
      abstainVotes = 0;
    };
    state.proposals.add(id, proposal);
    let existing = state.proposalsByBusiness.get(businessId) ?? [];
    state.proposalsByBusiness.add(businessId, existing.concat([id]));
    #ok(proposal);
  };

  public func vote(state : State, caller : Principal, proposalId : ProposalId, choice : VoteChoice) : { #ok : Proposal; #err : GovernanceError } {
    let proposal = switch (state.proposals.get(proposalId)) {
      case (?p) { p };
      case null { return #err(#notFound) };
    };
    if (not hasOwnership(state, proposal.businessId, caller)) {
      return #err(#notAuthorized);
    };
    if (Time.now() >= proposal.closesAt) {
      return #err(#invalidInput("Voting has closed"));
    };
    let key = voteKey(proposalId, caller);
    if (state.votes.containsKey(key)) {
      return #err(#duplicate);
    };
    state.votes.add(key, choice);
    let updated : Proposal = switch (choice) {
      case (#yes) { { proposal with yesVotes = proposal.yesVotes + 1 } };
      case (#no) { { proposal with noVotes = proposal.noVotes + 1 } };
      case (#abstain) { { proposal with abstainVotes = proposal.abstainVotes + 1 } };
    };
    state.proposals.add(proposalId, updated);
    #ok(updated);
  };

  public func listProposals(state : State, businessId : Common.BusinessId) : [Proposal] {
    let ids = state.proposalsByBusiness.get(businessId) ?? [];
    ids.filterMap(func id = state.proposals.get(id));
  };

  public func listStakeholders(state : State, source : BusinessSource, caller : Principal, businessId : Common.BusinessId) : { #ok : [Stakeholder]; #err : GovernanceError } {
    if (not isOwner(source, caller, businessId)) {
      return #err(#notAuthorized);
    };
    let rows = state.stakeholders.values().filter(func s = s.businessId == businessId).toArray();
    #ok(rows);
  };

  public func listLedger(state : State, source : BusinessSource, caller : Principal, businessId : Common.BusinessId) : { #ok : [LedgerEntry]; #err : GovernanceError } {
    if (not isOwner(source, caller, businessId)) {
      return #err(#notAuthorized);
    };
    let ids = state.ledgerByBusiness.get(businessId) ?? [];
    #ok(ids.filterMap(func id = state.ledger.get(id)));
  };

  public func capTable(state : State, source : BusinessSource, caller : Principal, businessId : Common.BusinessId) : { #ok : [CapTableRow]; #err : GovernanceError } {
    if (not isOwner(source, caller, businessId)) {
      return #err(#notAuthorized);
    };
    let rows = state.stakeholders.values().filter(func s = s.businessId == businessId).toArray();
    var totalUnits = 0;
    for (s in rows.values()) {
      totalUnits += s.ownershipUnits;
    };
    let table = rows.map(
      func s = {
        principal = s.principal;
        displayName = s.displayName;
        ownershipUnits = s.ownershipUnits;
        percentageBps = if (totalUnits == 0) { 0 } else { (s.ownershipUnits * 10000) / totalUnits };
        cumulativeContributions = s.cumulativeContributions;
      }
    );
    #ok(table);
  };

  public func recordOwnership(state : State, businessId : Common.BusinessId, principal : Principal, purchaseId : Common.PurchaseId, unitsDelta : Nat, contributionAmount : Common.Cents, reason : Text) : () {
    let now = Time.now();
    let entryId = state.nextLedgerEntryId;
    state.nextLedgerEntryId := entryId + 1;
    let entry : LedgerEntry = {
      id = entryId;
      businessId;
      principal;
      purchaseId;
      unitsDelta;
      contributionAmount;
      reason;
      createdAt = now;
    };
    state.ledger.add(entryId, entry);
    let existingEntries = state.ledgerByBusiness.get(businessId) ?? [];
    state.ledgerByBusiness.add(businessId, existingEntries.concat([entryId]));

    let key = stakeholderKey(businessId, principal);
    switch (state.stakeholders.get(key)) {
      case (?s) {
        state.stakeholders.add(
          key,
          {
            s with
            ownershipUnits = s.ownershipUnits + unitsDelta;
            cumulativeContributions = s.cumulativeContributions + contributionAmount;
          },
        );
      };
      case null {
        let sid = state.nextStakeholderId;
        state.nextStakeholderId := sid + 1;
        state.stakeholders.add(
          key,
          {
            id = sid;
            businessId;
            principal;
            displayName = "";
            ownershipUnits = unitsDelta;
            cumulativeContributions = contributionAmount;
            joinedAt = now;
          },
        );
      };
    };
  };
};
