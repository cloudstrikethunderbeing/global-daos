import Types "../types/business";
import BusinessLib "../lib/business";
import ConsumerLib "../lib/consumer";
import CreditsLib "../lib/credits";

mixin (state : BusinessLib.State, consumerState : ConsumerLib.State, creditsState : CreditsLib.State) {
  public query func listBusinesses() : async [Types.BusinessPublic] {
    ignore creditsState;
    BusinessLib.list(state);
  };

  public query func getBusiness(id : Types.BusinessId) : async ?Types.BusinessPublic {
    ignore creditsState;
    BusinessLib.get(state, id);
  };

  public query func getBusinessBySlug(slug : Text) : async ?Types.BusinessPublic {
    ignore creditsState;
    BusinessLib.getBySlug(state, slug);
  };

  public query ({ caller }) func listMyBusinesses() : async [Types.BusinessPublic] {
    ignore creditsState;
    BusinessLib.listByOwner(state, caller);
  };

  public shared ({ caller }) func createBusiness(input : Types.CreateBusinessInput) : async { #ok : Types.BusinessPublic; #err : Types.BusinessError } {
    let result = BusinessLib.create(state, caller, input);
    switch (result) {
      case (#ok(_)) {
        // Deploying a business DAO earns both the founding business registration
        // reward and the completed DAO deployment reward from the action itself.
        // `award` dedupes per (account, rewardType, subject) and ignores anonymous
        // callers, so a repeat deployment or a later claim adds nothing.
        ignore CreditsLib.award(creditsState, caller, #foundingBusinessRegistration, "registration", "Founding business registration");
        ignore CreditsLib.award(creditsState, caller, #daoDeployment, "deployment", "Completed business DAO deployment");
      };
      case (#err(_)) {};
    };
    result;
  };

  public shared ({ caller }) func updateBusiness(id : Types.BusinessId, input : Types.UpdateBusinessInput) : async { #ok : Types.BusinessPublic; #err : Types.BusinessError } {
    ignore creditsState;
    BusinessLib.update(state, caller, id, input);
  };

  public query ({ caller }) func getBusinessAdminStats(id : Types.BusinessId) : async { #ok : Types.BusinessAdminStats; #err : Types.BusinessError } {
    ignore creditsState;
    let source : BusinessLib.PurchaseSource = {
      purchasesByBusiness = consumerState.purchasesByBusiness;
      purchases = consumerState.purchases;
    };
    BusinessLib.adminStats(state, source, caller, id);
  };
};
