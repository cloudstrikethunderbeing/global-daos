import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/leads";
import LeadsLib "../lib/leads";
import CreditsLib "../lib/credits";

/// Growth surface: founding interest registration, visitor/funnel tracking,
/// business nominations, and owner-only founder analytics.
mixin (
  accessControlState : AccessControl.AccessControlState,
  state : LeadsLib.State,
  creditsState : CreditsLib.State,
) {
  /// Register founding business interest without deploying a DAO.
  public shared func registerFoundingInterest(input : Types.CreateFoundingInterestInput) : async { #ok : Types.FoundingInterest; #err : Types.LeadError } {
    LeadsLib.registerFoundingInterest(state, input);
  };

  /// Nominate a business to join the network (signed-in caller).
  public shared ({ caller }) func nominateBusiness(input : Types.CreateNominationInput) : async { #ok : Types.Nomination; #err : Types.LeadError } {
    LeadsLib.nominateBusiness(state, caller, input);
  };

  /// Public list of all business nominations.
  public query func listNominations() : async [Types.Nomination] {
    LeadsLib.listNominations(state);
  };

  /// The caller's own nominations only.
  public query ({ caller }) func listMyNominations() : async [Types.Nomination] {
    LeadsLib.listNominations(state).filter(func(n) = n.nominatedBy == caller);
  };

  /// Count a unique visitor; `returning` also counts a returning user.
  public shared func recordVisit(returning : Bool) : async () {
    LeadsLib.recordVisit(state, returning);
  };

  /// Count a completed demo purchase.
  public shared func recordDemoPurchase() : async () {
    LeadsLib.recordDemoPurchase(state);
  };

  /// Count a consumer registration.
  public shared ({ caller }) func recordConsumerRegistration() : async () {
    ignore caller;
    LeadsLib.recordConsumerRegistration(state);
  };

  /// Count a business registration.
  public shared ({ caller }) func recordBusinessRegistration() : async () {
    ignore caller;
    LeadsLib.recordBusinessRegistration(state);
  };

  /// Count a DAO deployment.
  public shared ({ caller }) func recordDaoDeployment() : async () {
    ignore caller;
    LeadsLib.recordDaoDeployment(state);
  };

  /// Owner-only founder analytics with funnel conversion rates.
  public query ({ caller }) func getFounderAnalytics() : async { #ok : Types.FounderAnalytics; #err : Types.LeadError } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err(#notAuthorized);
    };
    LeadsLib.analytics(state, creditsState, caller);
  };
};
