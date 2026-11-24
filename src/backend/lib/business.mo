import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/business";
import ConsumerTypes "../types/consumer";

module {
  public type Business = Types.Business;
  public type BusinessPublic = Types.BusinessPublic;
  public type BusinessId = Types.BusinessId;
  public type CreateBusinessInput = Types.CreateBusinessInput;
  public type UpdateBusinessInput = Types.UpdateBusinessInput;
  public type BusinessError = Types.BusinessError;
  public type BusinessAdminStats = Types.BusinessAdminStats;
  public type Cents = Common.Cents;

  /// Enforced upper bound on a business fundraising target: $10,000,000.00.
  public let maxFundraisingTargetCeiling : Cents = 1_000_000_000;

  public type State = {
    businesses : Map.Map<BusinessId, Business>;
    slugIndex : Map.Map<Text, BusinessId>;
    var nextBusinessId : Nat;
  };

  /// Purchase data used to derive per-business admin statistics.
  public type PurchaseSource = {
    purchasesByBusiness : Map.Map<Common.BusinessId, [Common.PurchaseId]>;
    purchases : Map.Map<Common.PurchaseId, ConsumerTypes.Purchase>;
  };

  public func toPublic(b : Business) : BusinessPublic {
    {
      id = b.id;
      slug = b.slug;
      name = b.name;
      logo = b.logo;
      industry = b.industry;
      city = b.city;
      country = b.country;
      description = b.description;
      isFictional = b.isFictional;
      totalOwnershipSupply = b.totalOwnershipSupply;
      consumerOwnershipPool = b.consumerOwnershipPool;
      maxFundraisingTarget = b.maxFundraisingTarget;
      minContribution = b.minContribution;
      maxContribution = b.maxContribution;
      ownershipRights = b.ownershipRights;
      constitution = b.constitution;
      vesting = b.vesting;
      participation = b.participation;
      createdAt = b.createdAt;
    };
  };

  /// Validate the ownership pool and fundraising limits shared by create/update.
  func validateLimits(
    totalOwnershipSupply : Nat,
    consumerOwnershipPool : Nat,
    maxFundraisingTarget : Cents,
    minContribution : Cents,
    maxContribution : Cents,
  ) : ?Text {
    if (totalOwnershipSupply == 0) {
      return ?"totalOwnershipSupply must be greater than zero";
    };
    if (consumerOwnershipPool > totalOwnershipSupply) {
      return ?"consumerOwnershipPool cannot exceed totalOwnershipSupply";
    };
    if (maxFundraisingTarget == 0) {
      return ?"maxFundraisingTarget must be greater than zero";
    };
    if (maxFundraisingTarget > maxFundraisingTargetCeiling) {
      return ?"maxFundraisingTarget cannot exceed 1000000000 cents ($10,000,000.00)";
    };
    if (minContribution > maxContribution) {
      return ?"minContribution cannot exceed maxContribution";
    };
    null;
  };

  public func create(state : State, owner : Principal, input : CreateBusinessInput) : { #ok : BusinessPublic; #err : BusinessError } {
    let slug = input.slug;
    if (slug.size() == 0) {
      return #err(#invalidInput("slug is required"));
    };
    if (state.slugIndex.containsKey(slug)) {
      return #err(#slugTaken);
    };
    switch (validateLimits(input.totalOwnershipSupply, input.consumerOwnershipPool, input.maxFundraisingTarget, input.minContribution, input.maxContribution)) {
      case (?msg) { return #err(#invalidInput(msg)) };
      case null {};
    };
    let now = Time.now();
    let id = state.nextBusinessId;
    state.nextBusinessId := id + 1;
    let business : Business = {
      id = id;
      slug = slug;
      name = input.name;
      logo = input.logo;
      industry = input.industry;
      city = input.city;
      country = input.country;
      description = input.description;
      isFictional = input.isFictional;
      valuation = input.valuation;
      totalOwnershipSupply = input.totalOwnershipSupply;
      consumerOwnershipPool = input.consumerOwnershipPool;
      maxFundraisingTarget = input.maxFundraisingTarget;
      minContribution = input.minContribution;
      maxContribution = input.maxContribution;
      ownershipRights = input.ownershipRights;
      foundingAuthorities = input.foundingAuthorities;
      constitution = input.constitution;
      vesting = input.vesting;
      participation = input.participation;
      owner = owner;
      createdAt = now;
      updatedAt = now;
    };
    state.businesses.add(id, business);
    state.slugIndex.add(slug, id);
    #ok(toPublic(business));
  };

  public func update(state : State, caller : Principal, id : BusinessId, input : UpdateBusinessInput) : { #ok : BusinessPublic; #err : BusinessError } {
    let existing = switch (state.businesses.get(id)) {
      case (?b) { b };
      case null { return #err(#notFound) };
    };
    if (not Principal.equal(existing.owner, caller)) {
      return #err(#notAuthorized);
    };
    switch (validateLimits(existing.totalOwnershipSupply, existing.consumerOwnershipPool, input.maxFundraisingTarget, input.minContribution, input.maxContribution)) {
      case (?msg) { return #err(#invalidInput(msg)) };
      case null {};
    };
    let updated : Business = {
      id = existing.id;
      slug = existing.slug;
      name = input.name;
      logo = input.logo;
      industry = input.industry;
      city = input.city;
      country = input.country;
      description = input.description;
      isFictional = existing.isFictional;
      valuation = input.valuation;
      totalOwnershipSupply = existing.totalOwnershipSupply;
      consumerOwnershipPool = existing.consumerOwnershipPool;
      maxFundraisingTarget = input.maxFundraisingTarget;
      minContribution = input.minContribution;
      maxContribution = input.maxContribution;
      ownershipRights = input.ownershipRights;
      foundingAuthorities = existing.foundingAuthorities;
      constitution = input.constitution;
      vesting = input.vesting;
      participation = input.participation;
      owner = existing.owner;
      createdAt = existing.createdAt;
      updatedAt = Time.now();
    };
    state.businesses.add(id, updated);
    #ok(toPublic(updated));
  };

  public func get(state : State, id : BusinessId) : ?BusinessPublic {
    switch (state.businesses.get(id)) {
      case (?b) { ?toPublic(b) };
      case null { null };
    };
  };

  public func getBySlug(state : State, slug : Text) : ?BusinessPublic {
    switch (state.slugIndex.get(slug)) {
      case (?id) { get(state, id) };
      case null { null };
    };
  };

  public func list(state : State) : [BusinessPublic] {
    state.businesses.values().map(func b = toPublic(b)).toArray();
  };

  public func listByOwner(state : State, owner : Principal) : [BusinessPublic] {
    state.businesses.values().filter(func b = Principal.equal(b.owner, owner)).map(func b = toPublic(b)).toArray();
  };

  public func isOwner(state : State, caller : Principal, id : BusinessId) : Bool {
    switch (state.businesses.get(id)) {
      case (?b) { Principal.equal(b.owner, caller) };
      case null { false };
    };
  };

  public func adminStats(state : State, source : PurchaseSource, caller : Principal, id : BusinessId) : { #ok : BusinessAdminStats; #err : BusinessError } {
    let business = switch (state.businesses.get(id)) {
      case (?b) { b };
      case null { return #err(#notFound) };
    };
    if (not Principal.equal(business.owner, caller)) {
      return #err(#notAuthorized);
    };
    let purchaseIds = source.purchasesByBusiness.get(id) ?? [];
    var totalSimulatedSales : Cents = 0;
    var totalContributions : Cents = 0;
    var ownershipAllocated : Nat = 0;
    var purchaseCount : Nat = 0;
    for (pid in purchaseIds.values()) {
      switch (source.purchases.get(pid)) {
        case (?p) {
          totalSimulatedSales += p.purchasePrice;
          totalContributions += p.contributionAmount;
          ownershipAllocated += p.ownershipUnits;
          purchaseCount += 1;
        };
        case null {};
      };
    };
    let capitalRaised = totalContributions;
    let target = business.maxFundraisingTarget;
    let progressBps = if (target == 0) { 0 } else { (capitalRaised * 10_000) / target };
    let poolRemaining = if (ownershipAllocated >= business.consumerOwnershipPool) {
      0;
    } else {
      business.consumerOwnershipPool - ownershipAllocated;
    };
    #ok({
      totalSimulatedSales = totalSimulatedSales;
      totalContributions = totalContributions;
      capitalRaised = capitalRaised;
      fundraisingTarget = target;
      fundraisingProgressBps = progressBps;
      participatingCustomers = purchaseCount;
      ownershipAllocated = ownershipAllocated;
      ownershipPoolRemaining = poolRemaining;
      purchaseCount = purchaseCount;
    });
  };
};
