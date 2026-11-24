import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/leads";
import LeadsLib "../lib/leads";
import CreditsLib "../lib/credits";

mixin (accessControlState : AccessControl.AccessControlState, state : LeadsLib.State, creditsState : CreditsLib.State) {
  public shared func registerFoundingInterest(input : Types.CreateFoundingInterestInput) : async { #ok : Types.FoundingInterest; #err : Types.LeadError } {
    LeadsLib.registerFoundingInterest(state, input);
  };

  public shared ({ caller }) func nominateBusiness(input : Types.CreateNominationInput) : async { #ok : Types.Nomination; #err : Types.LeadError } {
    let result = LeadsLib.nominateBusiness(state, caller, input);
    switch (result) {
      case (#ok(_)) {
        // Award the legitimate business nomination reward from the action itself.
        // `award` dedupes per (account, rewardType, subject) and ignores anonymous
        // callers, so a repeat nomination or a later claim adds nothing.
        ignore CreditsLib.award(creditsState, caller, #businessNomination, "nomination", "Legitimate business nomination");
      };
      case (#err(_)) {};
    };
    result;
  };

  public query func listNominations() : async [Types.Nomination] {
    LeadsLib.listNominations(state);
  };

  public query ({ caller }) func listMyNominations() : async [Types.Nomination] {
    LeadsLib.listNominationsBy(state, caller);
  };

  public shared func recordVisit(returning : Bool) : async () {
    LeadsLib.recordVisit(state, returning);
  };

  public shared func recordDemoPurchaseCounter() : async () {
    LeadsLib.recordDemoPurchaseCounter(state);
  };

  public shared ({ caller }) func recordConsumerRegistration() : async () {
    // Keep the funnel counter for every caller, including anonymous visitors.
    LeadsLib.recordConsumerRegistration(state);
    // Award the early consumer registration reward to a signed-in caller only.
    // `award` ignores anonymous callers and dedupes per (account, rewardType,
    // subject), so a repeat registration or a later claim adds nothing.
    ignore CreditsLib.award(creditsState, caller, #earlyConsumerRegistration, "registration", "Early consumer registration");
  };

  public shared ({ caller }) func recordBusinessRegistration() : async () {
    ignore caller;
    LeadsLib.recordBusinessRegistration(state);
  };

  public shared ({ caller }) func recordDaoDeployment() : async () {
    ignore caller;
    LeadsLib.recordDaoDeployment(state);
  };

  public query ({ caller }) func getFounderAnalytics() : async { #ok : Types.FounderAnalytics; #err : Types.LeadError } {
    let isAdmin = switch (AccessControl.getUserRole(accessControlState, caller)) {
      case (#admin) { true };
      case (_) { false };
    };
    if (not isAdmin) {
      return #err(#notAuthorized);
    };
    LeadsLib.analytics(state, creditsState, caller);
  };
};
