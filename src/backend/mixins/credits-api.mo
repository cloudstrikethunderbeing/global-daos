import AccessControl "mo:caffeineai-authorization/access-control";
import Principal "mo:core/Principal";
import Types "../types/credits";
import CreditsLib "../lib/credits";

mixin (accessControlState : AccessControl.AccessControlState, state : CreditsLib.State) {
  func creditsIsAdmin(caller : Principal) : Bool {
    switch (AccessControl.getUserRole(accessControlState, caller)) {
      case (#admin) { true };
      case (_) { false };
    };
  };

  func creditsAward(caller : Principal, rewardType : Types.RewardType, subject : Text, memo : Text) : { #ok : Types.CreditLedgerEntry; #err : Types.CreditError } {
    if (caller.isAnonymous()) {
      return #err(#notAuthorized);
    };
    CreditsLib.award(state, caller, rewardType, subject, memo);
  };

  public query ({ caller }) func getMyCreditSummary() : async Types.CreditAccountSummary {
    CreditsLib.getAccountSummary(state, caller);
  };

  public query ({ caller }) func getMyContributionHistory() : async [Types.CreditLedgerEntry] {
    CreditsLib.getContributionHistory(state, caller);
  };

  public query ({ caller }) func getMyReferralCode() : async Text {
    CreditsLib.getReferralCode(state, caller);
  };

  public shared ({ caller }) func claimEarlyConsumerRegistration() : async { #ok : Types.CreditLedgerEntry; #err : Types.CreditError } {
    creditsAward(caller, #earlyConsumerRegistration, "registration", "Early consumer registration");
  };

  public shared ({ caller }) func claimFoundingBusinessRegistration() : async { #ok : Types.CreditLedgerEntry; #err : Types.CreditError } {
    creditsAward(caller, #foundingBusinessRegistration, "registration", "Founding business registration");
  };

  public shared ({ caller }) func claimFirstSimulatedPurchase() : async { #ok : Types.CreditLedgerEntry; #err : Types.CreditError } {
    creditsAward(caller, #firstSimulatedPurchase, "purchase", "First simulated purchase");
  };

  public shared ({ caller }) func claimBusinessNomination() : async { #ok : Types.CreditLedgerEntry; #err : Types.CreditError } {
    creditsAward(caller, #businessNomination, "nomination", "Legitimate business nomination");
  };

  public shared ({ caller }) func claimDaoDeployment() : async { #ok : Types.CreditLedgerEntry; #err : Types.CreditError } {
    creditsAward(caller, #daoDeployment, "deployment", "Completed business DAO deployment");
  };

  public shared ({ caller }) func claimValuableFeedback() : async { #ok : Types.CreditLedgerEntry; #err : Types.CreditError } {
    creditsAward(caller, #valuableFeedback, "feedback", "Approved valuable feedback");
  };

  public shared ({ caller }) func attributeConsumerReferral(referrerCode : Text) : async { #ok : Types.ReferralAttribution; #err : Types.CreditError } {
    if (caller.isAnonymous()) {
      return #err(#notAuthorized);
    };
    let referrer = switch (state.referralCodes.get(referrerCode)) {
      case (?p) { p };
      case (null) { return #err(#notFound) };
    };
    switch (CreditsLib.attributeReferral(state, referrer, caller, #consumer)) {
      case (#err(e)) { #err(e) };
      case (#ok(attribution)) {
        ignore CreditsLib.award(state, referrer, #consumerReferral, caller.toText(), "Verified consumer referral");
        #ok(attribution);
      };
    };
  };

  public shared ({ caller }) func attributeBusinessReferral(referrerCode : Text) : async { #ok : Types.ReferralAttribution; #err : Types.CreditError } {
    if (caller.isAnonymous()) {
      return #err(#notAuthorized);
    };
    let referrer = switch (state.referralCodes.get(referrerCode)) {
      case (?p) { p };
      case (null) { return #err(#notFound) };
    };
    switch (CreditsLib.attributeReferral(state, referrer, caller, #business)) {
      case (#err(e)) { #err(e) };
      case (#ok(attribution)) {
        ignore CreditsLib.award(state, referrer, #businessReferral, caller.toText(), "Approved business referral");
        #ok(attribution);
      };
    };
  };

  public query ({ caller }) func getRewardAmounts() : async Types.RewardAmounts {
    ignore caller;
    CreditsLib.getRewardAmounts(state);
  };

  public shared ({ caller }) func setRewardAmounts(amounts : Types.RewardAmounts) : async { #ok : Types.RewardAmounts; #err : Types.CreditError } {
    if (not creditsIsAdmin(caller)) {
      return #err(#notAuthorized);
    };
    CreditsLib.setRewardAmounts(state, amounts);
  };

  public query ({ caller }) func listFoundingMembers() : async [Types.FoundingMember] {
    if (not creditsIsAdmin(caller)) {
      return [];
    };
    CreditsLib.listMembers(state);
  };

  public query ({ caller }) func listCreditLedger() : async [Types.CreditLedgerEntry] {
    if (not creditsIsAdmin(caller)) {
      return [];
    };
    CreditsLib.listEntries(state);
  };
};
