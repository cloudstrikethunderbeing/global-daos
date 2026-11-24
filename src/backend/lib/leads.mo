import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/leads";
import CreditsLib "credits";

module {
  public type FoundingInterest = Types.FoundingInterest;
  public type CreateFoundingInterestInput = Types.CreateFoundingInterestInput;
  public type Nomination = Types.Nomination;
  public type CreateNominationInput = Types.CreateNominationInput;
  public type FounderAnalytics = Types.FounderAnalytics;
  public type LeadError = Types.LeadError;

  public type State = {
    interests : Map.Map<Common.LeadId, FoundingInterest>;
    nominations : Map.Map<Common.NominationId, Nomination>;
    var nextLeadId : Nat;
    var nextNominationId : Nat;
    var uniqueVisitors : Nat;
    var returningUsers : Nat;
    var demoPurchasesCompleted : Nat;
    var consumerRegistrations : Nat;
    var businessRegistrations : Nat;
    var daoDeployments : Nat;
  };

  /// Recent nominations shown publicly, newest first.
  let recentNominationLimit : Nat = 50;

  func isBlank(value : Text) : Bool {
    value.trim(#predicate(func c = c == ' ' or c == '\t' or c == '\n' or c == '\r')).size() == 0;
  };

  func validEmail(value : Text) : Bool {
    let trimmed = value.trim(#predicate(func c = c == ' '));
    let parts = trimmed.split(#char('@')).toArray();
    if (parts.size() != 2) { return false };
    let local = parts[0];
    let domain = parts[1];
    local.size() > 0 and domain.size() > 0 and domain.contains(#char('.'));
  };

  /// Basis points (1/100 of a percent) of `numerator / denominator`, 0 when the
  /// denominator is zero.
  func bps(numerator : Nat, denominator : Nat) : Nat {
    if (denominator == 0) { return 0 };
    (numerator * 10_000) / denominator;
  };

  public func registerFoundingInterest(state : State, input : CreateFoundingInterestInput) : { #ok : FoundingInterest; #err : LeadError } {
    if (isBlank(input.businessName)) { return #err(#invalidInput("Business name is required")) };
    if (isBlank(input.contactName)) { return #err(#invalidInput("Contact name is required")) };
    if (not validEmail(input.contactEmail)) { return #err(#invalidInput("A valid contact email is required")) };
    if (isBlank(input.industry)) { return #err(#invalidInput("Industry is required")) };

    let id = state.nextLeadId;
    state.nextLeadId := id + 1;
    let interest : FoundingInterest = {
      id;
      businessName = input.businessName.trim(#predicate(func c = c == ' '));
      industry = input.industry.trim(#predicate(func c = c == ' '));
      location = input.location.trim(#predicate(func c = c == ' '));
      contactName = input.contactName.trim(#predicate(func c = c == ' '));
      contactEmail = input.contactEmail.trim(#predicate(func c = c == ' '));
      participationInterest = input.participationInterest.trim(#predicate(func c = c == ' '));
      createdAt = Time.now();
    };
    state.interests.add(id, interest);
    #ok(interest);
  };

  public func nominateBusiness(state : State, caller : Principal, input : CreateNominationInput) : { #ok : Nomination; #err : LeadError } {
    if (isBlank(input.businessName)) { return #err(#invalidInput("Business name is required")) };
    if (isBlank(input.category)) { return #err(#invalidInput("Category is required")) };

    let id = state.nextNominationId;
    state.nextNominationId := id + 1;
    let nomination : Nomination = {
      id;
      businessName = input.businessName.trim(#predicate(func c = c == ' '));
      category = input.category.trim(#predicate(func c = c == ' '));
      location = input.location.trim(#predicate(func c = c == ' '));
      nominatedBy = caller;
      createdAt = Time.now();
    };
    state.nominations.add(id, nomination);
    #ok(nomination);
  };

  public func listNominations(state : State) : [Nomination] {
    let all = state.nominations.values().toArray();
    let sorted = all.sort(func (a, b) = Nat.compare(b.id, a.id));
    if (sorted.size() <= recentNominationLimit) {
      sorted;
    } else {
      sorted.sliceToArray(0, recentNominationLimit);
    };
  };

  public func listNominationsBy(state : State, caller : Principal) : [Nomination] {
    let all = state.nominations.values().toArray();
    let mine = all.filter(func n = Principal.equal(n.nominatedBy, caller));
    mine.sort(func (a, b) = Nat.compare(b.id, a.id));
  };

  public func recordVisit(state : State, returning : Bool) : () {
    if (returning) {
      state.returningUsers += 1;
    } else {
      state.uniqueVisitors += 1;
    };
  };

  public func recordDemoPurchaseCounter(state : State) : () {
    state.demoPurchasesCompleted += 1;
  };

  public func recordConsumerRegistration(state : State) : () {
    state.consumerRegistrations += 1;
  };

  public func recordBusinessRegistration(state : State) : () {
    state.businessRegistrations += 1;
  };

  public func recordDaoDeployment(state : State) : () {
    state.daoDeployments += 1;
  };

  public func analytics(state : State, creditsState : CreditsLib.State, caller : Principal) : { #ok : FounderAnalytics; #err : LeadError } {
    ignore caller;
    let totalVisitors = state.uniqueVisitors + state.returningUsers;
    let totalRegistrations = state.consumerRegistrations + state.businessRegistrations;
    let metrics = CreditsLib.metrics(creditsState);
    #ok({
      uniqueVisitors = state.uniqueVisitors;
      returningUsers = state.returningUsers;
      demoPurchasesCompleted = state.demoPurchasesCompleted;
      consumerRegistrations = state.consumerRegistrations;
      businessRegistrations = state.businessRegistrations;
      daoDeployments = state.daoDeployments;
      businessNominations = state.nominations.size();
      visitorToRegistrationBps = bps(totalRegistrations, totalVisitors);
      registrationToDeploymentBps = bps(state.daoDeployments, totalRegistrations);
      totalCreditsAwarded = metrics.totalCreditsAwarded;
      creditsByRewardType = metrics.creditsByRewardType;
      foundingMemberCount = metrics.foundingMemberCount;
      referralsAttributed = metrics.referralsAttributed;
      referralsConverted = metrics.referralsConverted;
      creditsPaidForReferrals = metrics.creditsPaidForReferrals;
    });
  };
};
