import Types "../types/consumer";
import ConsumerLib "../lib/consumer";
import BusinessLib "../lib/business";
import GovernanceLib "../lib/governance";
import CreditsLib "../lib/credits";

mixin (state : ConsumerLib.State, businessState : BusinessLib.State, governanceState : GovernanceLib.State, creditsState : CreditsLib.State) {
  public shared ({ caller }) func recordPurchase(input : Types.RecordPurchaseInput) : async { #ok : Types.Purchase; #err : Types.ConsumerError } {
    ignore governanceState;
    let result = ConsumerLib.recordPurchase(state, { businesses = businessState.businesses }, caller, input);
    switch (result) {
      case (#ok(_)) {
        // Award the first simulated purchase reward from the qualifying action
        // itself. `award` dedupes per (account, rewardType, subject) and ignores
        // anonymous callers, so a repeat purchase or a later claim adds nothing.
        ignore CreditsLib.award(creditsState, caller, #firstSimulatedPurchase, "purchase", "First simulated purchase");
      };
      case (#err(_)) {};
    };
    result;
  };

  public shared func recordDemoPurchase(input : Types.RecordPurchaseInput) : async { #ok : Types.DemoPurchaseResult; #err : Types.ConsumerError } {
    ignore (governanceState, creditsState);
    ConsumerLib.recordDemoPurchase(state, { businesses = businessState.businesses }, input);
  };

  public query ({ caller }) func getMyPortfolio() : async Types.Portfolio {
    ignore (governanceState, creditsState);
    ConsumerLib.getPortfolio(state, { businesses = businessState.businesses }, caller);
  };

  public query ({ caller }) func getMyPurchaseHistory() : async [Types.Purchase] {
    ignore (businessState, governanceState, creditsState);
    ConsumerLib.getPurchaseHistory(state, caller);
  };

  public query ({ caller }) func getMyShareToken() : async Text {
    ignore (businessState, governanceState, creditsState);
    ConsumerLib.getShareToken(state, caller);
  };

  public query func getPublicPortfolio(shareToken : Text) : async ?Types.PublicPortfolio {
    ignore (governanceState, creditsState);
    ConsumerLib.getPublicPortfolio(state, { businesses = businessState.businesses }, shareToken);
  };
};
