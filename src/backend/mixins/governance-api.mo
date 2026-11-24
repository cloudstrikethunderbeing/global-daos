import Common "../types/common";
import Types "../types/governance";
import GovernanceLib "../lib/governance";
import BusinessLib "../lib/business";

mixin (state : GovernanceLib.State, businessState : BusinessLib.State) {
  public shared ({ caller }) func createProposal(businessId : Common.BusinessId, title : Text, body : Text, closesAt : Common.Timestamp) : async { #ok : Types.Proposal; #err : Types.GovernanceError } {
    GovernanceLib.createProposal(state, { businesses = businessState.businesses }, caller, businessId, title, body, closesAt);
  };

  public shared ({ caller }) func voteOnProposal(proposalId : Types.ProposalId, choice : Types.VoteChoice) : async { #ok : Types.Proposal; #err : Types.GovernanceError } {
    GovernanceLib.vote(state, caller, proposalId, choice);
  };

  public query func listProposals(businessId : Common.BusinessId) : async [Types.Proposal] {
    GovernanceLib.listProposals(state, businessId);
  };

  public query ({ caller }) func listStakeholders(businessId : Common.BusinessId) : async { #ok : [Types.Stakeholder]; #err : Types.GovernanceError } {
    GovernanceLib.listStakeholders(state, { businesses = businessState.businesses }, caller, businessId);
  };

  public query ({ caller }) func listLedger(businessId : Common.BusinessId) : async { #ok : [Types.LedgerEntry]; #err : Types.GovernanceError } {
    GovernanceLib.listLedger(state, { businesses = businessState.businesses }, caller, businessId);
  };

  public query ({ caller }) func getCapTable(businessId : Common.BusinessId) : async { #ok : [Types.CapTableRow]; #err : Types.GovernanceError } {
    GovernanceLib.capTable(state, { businesses = businessState.businesses }, caller, businessId);
  };
};
