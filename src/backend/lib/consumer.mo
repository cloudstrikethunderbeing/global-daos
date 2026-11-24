import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Nat32 "mo:core/Nat32";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/consumer";
import BusinessTypes "../types/business";

module {
  public type Purchase = Types.Purchase;
  public type PurchaseId = Types.PurchaseId;
  public type RecordPurchaseInput = Types.RecordPurchaseInput;
  public type Portfolio = Types.Portfolio;
  public type PortfolioPosition = Types.PortfolioPosition;
  public type PublicPortfolio = Types.PublicPortfolio;
  public type PublicPortfolioPosition = Types.PublicPortfolioPosition;
  public type DemoPurchaseResult = Types.DemoPurchaseResult;
  public type ConsumerError = Types.ConsumerError;

  public type State = {
    purchases : Map.Map<PurchaseId, Purchase>;
    purchasesByConsumer : Map.Map<Principal, [PurchaseId]>;
    purchasesByBusiness : Map.Map<Common.BusinessId, [PurchaseId]>;
    clientRefs : Map.Map<Text, PurchaseId>;
    shareTokens : Map.Map<Text, Principal>;
    var nextPurchaseId : Nat;
  };

  /// Read-only view of the business registry needed to price contributions.
  public type BusinessSource = {
    businesses : Map.Map<Common.BusinessId, BusinessTypes.Business>;
  };

  /// Basis points denominator (100% = 10_000 bps).
  let BPS : Nat = 10_000;

  /// Units granted per whole simulated dollar contributed.
  let UNITS_PER_DOLLAR : Nat = 1;

  /// Simulated ownership pool for a fictional demo business with no registry
  /// record. Large enough that a demo purchase never exhausts it.
  let DEMO_OWNERSHIP_POOL : Nat = 1_000_000_000;

  /// Simulated fundraising ceiling for a fictional demo business, in cents.
  let DEMO_FUNDRAISING_TARGET : Common.Cents = 1_000_000_000;

  /// Slugs of the six fictional demo businesses. The demo storefront derives a
  /// stable synthetic business id from each slug (31-hash mod 1_000_000_007 + 1),
  /// so the backend can recognise a fictional demo business without a registry
  /// record while still rejecting any other unknown id.
  let DEMO_SLUGS : [Text] = [
    "aura-atelier",
    "nexus-roasters",
    "roam-outfitters",
    "voxel-studio",
    "kinetic-fitness",
    "vertex-labs",
  ];

  /// Stable synthetic business id for a demo slug. Mirrors the frontend's
  /// `demoBusinessId` so a demo purchase resolves to the same fictional business.
  func demoIdForSlug(slug : Text) : Common.BusinessId {
    var hash : Nat = 0;
    for (char in slug.chars()) {
      hash := (hash * 31 + char.toNat32().toNat()) % 1_000_000_007;
    };
    hash + 1;
  };

  /// Whether `businessId` is the synthetic id of a known fictional demo business.
  func isDemoBusinessId(businessId : Common.BusinessId) : Bool {
    DEMO_SLUGS.any(func(slug) = demoIdForSlug(slug) == businessId);
  };

  /// Sum of ownership units already granted for a business.
  func allocatedUnits(state : State, businessId : Common.BusinessId) : Nat {
    let ids = state.purchasesByBusiness.get(businessId) ?? [];
    var total = 0;
    for (pid in ids.values()) {
      switch (state.purchases.get(pid)) {
        case (?p) { total += p.ownershipUnits };
        case null {};
      };
    };
    total;
  };

  /// Sum of investment contributions already recorded for a business.
  func raisedContributions(state : State, businessId : Common.BusinessId) : Nat {
    let ids = state.purchasesByBusiness.get(businessId) ?? [];
    var total = 0;
    for (pid in ids.values()) {
      switch (state.purchases.get(pid)) {
        case (?p) { total += p.contributionAmount };
        case null {};
      };
    };
    total;
  };

  /// Units a contribution of `amount` cents would grant.
  func unitsFor(amount : Common.Cents) : Nat {
    (amount / 100) * UNITS_PER_DOLLAR;
  };

  /// Validate a purchase input against the business limits and compute the
  /// ownership units it would grant. Shared by the persisted and demo paths.
  /// `requireRegistered` makes an unknown business a typed not-found error; the
  /// anonymous demo path passes `false` so fictional businesses without a
  /// persisted registry record still resolve a projection.
  func evaluate(state : State, source : BusinessSource, input : RecordPurchaseInput, requireRegistered : Bool) : { #ok : (BusinessTypes.Business, Nat); #err : ConsumerError } {
    if (input.productName.size() == 0) {
      return #err(#invalidInput("Product name is required"));
    };
    if (input.clientRef.size() == 0) {
      return #err(#invalidInput("Client reference is required"));
    };
    if (input.purchasePrice == 0) {
      return #err(#invalidInput("Purchase price must be greater than zero"));
    };
    let business = switch (source.businesses.get(input.businessId)) {
      case (?b) { b };
      case null {
        if (requireRegistered) {
          return #err(#notFound);
        };
        // Fictional demo business: no persisted limits to enforce.
        return #ok((demoBusiness(input.businessId), unitsFor(input.contributionAmount)));
      };
    };
    if (input.contributionAmount > 0) {
      if (input.contributionAmount < business.minContribution) {
        return #err(#invalidInput("Contribution is below the business minimum"));
      };
      if (input.contributionAmount > business.maxContribution) {
        return #err(#invalidInput("Contribution exceeds the business maximum"));
      };
    };
    let units = unitsFor(input.contributionAmount);
    if (units > 0) {
      let allocated = allocatedUnits(state, input.businessId);
      let pool = business.consumerOwnershipPool;
      if (allocated >= pool or units > (pool - allocated)) {
        return #err(#limitExceeded("Consumer ownership pool exhausted"));
      };
      let raised = raisedContributions(state, input.businessId);
      let target = business.maxFundraisingTarget;
      if (raised >= target or input.contributionAmount > (target - raised)) {
        return #err(#limitExceeded("Fundraising target reached"));
      };
    };
    #ok((business, units));
  };

  /// Resolve the business a purchase is recorded against. A registered business
  /// is returned as stored. An id with no registry record is accepted only when
  /// it is a known fictional demo business (the demo storefront's stable
  /// per-slug id); any other unknown id is rejected as not found.
  func resolveBusiness(source : BusinessSource, businessId : Common.BusinessId) : { #ok : BusinessTypes.Business; #err : ConsumerError } {
    switch (source.businesses.get(businessId)) {
      case (?b) { #ok(b) };
      case null {
        if (isDemoBusinessId(businessId)) {
          #ok(demoBusiness(businessId));
        } else {
          #err(#notFound);
        };
      };
    };
  };

  /// Synthetic business record for a fictional demo purchase that has no
  /// persisted registry entry. The demo storefront sends a stable per-slug id
  /// for a fictional business, so the synthetic record carries a generous
  /// simulated ownership pool and fundraising ceiling: a demo purchase can be
  /// saved to a portfolio without tripping the pool or target limits, while
  /// every other field stays a neutral placeholder.
  func demoBusiness(businessId : Common.BusinessId) : BusinessTypes.Business {
    {
      id = businessId;
      slug = "";
      name = "";
      logo = null;
      industry = "";
      city = "";
      country = "";
      description = "";
      isFictional = true;
      valuation = {
        preMoneyValuation = 0;
        revenueMultiple = 0.0;
        annualRevenue = 0;
        notes = "";
      };
      totalOwnershipSupply = DEMO_OWNERSHIP_POOL;
      consumerOwnershipPool = DEMO_OWNERSHIP_POOL;
      maxFundraisingTarget = DEMO_FUNDRAISING_TARGET;
      minContribution = 0;
      maxContribution = DEMO_FUNDRAISING_TARGET;
      ownershipRights = {
        votingEnabled = false;
        profitShareEnabled = false;
        transferable = false;
        rightsSummary = "";
      };
      foundingAuthorities = [];
      constitution = "";
      vesting = {
        vestingMonths = 0;
        cliffMonths = 0;
        transferRestricted = false;
        restrictionsSummary = "";
      };
      participation = {
        contributionOptions = {
          roundToNearestDollar = false;
          roundToNearestFive = false;
          roundToNearestTen = false;
          customAllowed = false;
          optOutAllowed = true;
        };
        incentives = {
          loyaltyRewards = false;
          businessFundedOwnership = false;
          matchingContributions = false;
          profitParticipation = false;
          promotionalAllocations = false;
        };
        minContribution = 0;
        maxContribution = DEMO_FUNDRAISING_TARGET;
      };
      owner = Principal.anonymous();
      createdAt = 0;
      updatedAt = 0;
    };
  };

  public func recordPurchase(state : State, source : BusinessSource, caller : Principal, input : RecordPurchaseInput) : { #ok : Purchase; #err : ConsumerError } {
    switch (state.clientRefs.get(input.clientRef)) {
      case (?existingId) {
        switch (state.purchases.get(existingId)) {
          case (?existing) {
            if (existing.consumer == caller) {
              return #ok(existing);
            };
            return #err(#duplicate);
          };
          case null {};
        };
      };
      case null {};
    };
    let business = switch (resolveBusiness(source, input.businessId)) {
      case (#ok(b)) { b };
      case (#err(e)) { return #err(e) };
    };
    if (input.contributionAmount > 0) {
      if (input.contributionAmount < business.minContribution) {
        return #err(#invalidInput("Contribution is below the business minimum"));
      };
      if (input.contributionAmount > business.maxContribution) {
        return #err(#invalidInput("Contribution exceeds the business maximum"));
      };
    };
    let units = unitsFor(input.contributionAmount);
    if (units > 0) {
      let allocated = allocatedUnits(state, input.businessId);
      let pool = business.consumerOwnershipPool;
      if (allocated >= pool or units > (pool - allocated)) {
        return #err(#limitExceeded("Consumer ownership pool exhausted"));
      };
      let raised = raisedContributions(state, input.businessId);
      let target = business.maxFundraisingTarget;
      if (raised >= target or input.contributionAmount > (target - raised)) {
        return #err(#limitExceeded("Fundraising target reached"));
      };
    };
    let id = state.nextPurchaseId;
    state.nextPurchaseId := id + 1;
    let purchase : Purchase = {
      id;
      businessId = input.businessId;
      consumer = caller;
      productName = input.productName;
      purchasePrice = input.purchasePrice;
      contributionAmount = input.contributionAmount;
      totalPayment = input.purchasePrice + input.contributionAmount;
      contributionOption = input.contributionOption;
      ownershipUnits = units;
      createdAt = Time.now();
    };
    state.purchases.add(id, purchase);
    let consumerIds = state.purchasesByConsumer.get(caller) ?? [];
    state.purchasesByConsumer.add(caller, consumerIds.concat([id]));
    let businessIds = state.purchasesByBusiness.get(input.businessId) ?? [];
    state.purchasesByBusiness.add(input.businessId, businessIds.concat([id]));
    state.clientRefs.add(input.clientRef, id);
    #ok(purchase);
  };

  public func getPortfolio(state : State, source : BusinessSource, caller : Principal) : Portfolio {
    let ids = state.purchasesByConsumer.get(caller) ?? [];
    var totalContributions = 0;
    var totalUnits = 0;
    var updatedAt : Common.Timestamp = 0;
    // Accumulate per-business aggregates in insertion order.
    var businessIds : [Common.BusinessId] = [];
    var unitsByBusiness : Map.Map<Common.BusinessId, Nat> = Map.empty();
    var contribByBusiness : Map.Map<Common.BusinessId, Nat> = Map.empty();
    var countByBusiness : Map.Map<Common.BusinessId, Nat> = Map.empty();
    var lastByBusiness : Map.Map<Common.BusinessId, Common.Timestamp> = Map.empty();
    for (pid in ids.values()) {
      switch (state.purchases.get(pid)) {
        case (?p) {
          totalContributions += p.contributionAmount;
          totalUnits += p.ownershipUnits;
          if (p.createdAt > updatedAt) { updatedAt := p.createdAt };
          if (not businessIds.contains(p.businessId)) {
            businessIds := businessIds.concat([p.businessId]);
          };
          unitsByBusiness.add(p.businessId, (unitsByBusiness.get(p.businessId) ?? 0) + p.ownershipUnits);
          contribByBusiness.add(p.businessId, (contribByBusiness.get(p.businessId) ?? 0) + p.contributionAmount);
          countByBusiness.add(p.businessId, (countByBusiness.get(p.businessId) ?? 0) + 1);
          let prevLast = lastByBusiness.get(p.businessId) ?? 0;
          if (p.createdAt > prevLast) { lastByBusiness.add(p.businessId, p.createdAt) };
        };
        case null {};
      };
    };
    let positions = businessIds.map(func(bid) : PortfolioPosition {
      let units = unitsByBusiness.get(bid) ?? 0;
      let pool = switch (source.businesses.get(bid)) {
        case (?b) { b.consumerOwnershipPool };
        case null {
          if (isDemoBusinessId(bid)) { DEMO_OWNERSHIP_POOL } else { 0 };
        };
      };
      let pct = if (pool == 0) { 0 } else { (units * BPS) / pool };
      {
        businessId = bid;
        ownershipUnits = units;
        hypotheticalPercentageBps = pct;
        cumulativeContributions = contribByBusiness.get(bid) ?? 0;
        purchaseCount = countByBusiness.get(bid) ?? 0;
        lastPurchaseAt = lastByBusiness.get(bid) ?? 0;
      };
    });
    {
      owner = caller;
      totalContributions;
      totalOwnershipUnits = totalUnits;
      positions;
      updatedAt;
    };
  };

  public func getPurchaseHistory(state : State, caller : Principal) : [Purchase] {
    let ids = state.purchasesByConsumer.get(caller) ?? [];
    var result : [Purchase] = [];
    for (pid in ids.values()) {
      switch (state.purchases.get(pid)) {
        case (?p) { result := result.concat([p]) };
        case null {};
      };
    };
    result;
  };

  public func getShareToken(state : State, caller : Principal) : Text {
    let token = "pf-" # caller.toText();
    switch (state.shareTokens.get(token)) {
      case (?_) {};
      case null { state.shareTokens.add(token, caller) };
    };
    token;
  };

  public func getPublicPortfolio(state : State, source : BusinessSource, shareToken : Text) : ?PublicPortfolio {
    let owner = switch (state.shareTokens.get(shareToken)) {
      case (?p) { p };
      case null { return null };
    };
    let portfolio = getPortfolio(state, source, owner);
    let positions = portfolio.positions.map(func(pos) : PublicPortfolioPosition {
      let name = switch (source.businesses.get(pos.businessId)) {
        case (?b) { b.name };
        case null {
          if (isDemoBusinessId(pos.businessId)) { "Fictional demo business" } else { "Unknown business" };
        };
      };
      {
        businessId = pos.businessId;
        businessName = name;
        ownershipUnits = pos.ownershipUnits;
        hypotheticalPercentageBps = pos.hypotheticalPercentageBps;
        cumulativeContributions = pos.cumulativeContributions;
      };
    });
    ?{
      shareToken;
      totalContributions = portfolio.totalContributions;
      totalOwnershipUnits = portfolio.totalOwnershipUnits;
      businessCount = positions.size();
      positions;
      updatedAt = portfolio.updatedAt;
    };
  };

  /// Compute an ownership projection for an anonymous demo purchase without
  /// persisting a portfolio. Enforces the same pool and fundraising limits.
  public func recordDemoPurchase(state : State, source : BusinessSource, input : RecordPurchaseInput) : { #ok : DemoPurchaseResult; #err : ConsumerError } {
    let (business, units) = switch (evaluate(state, source, input, false)) {
      case (#ok(pair)) { pair };
      case (#err(e)) { return #err(e) };
    };
    let pool = business.consumerOwnershipPool;
    let allocated = allocatedUnits(state, input.businessId);
    let projectedTotal = allocated + units;
    let pct = if (pool == 0) { 0 } else { (projectedTotal * BPS) / pool };
    #ok({
      businessId = input.businessId;
      productName = input.productName;
      purchasePrice = input.purchasePrice;
      contributionAmount = input.contributionAmount;
      totalPayment = input.purchasePrice + input.contributionAmount;
      contributionOption = input.contributionOption;
      projectedOwnershipUnits = units;
      projectedPercentageBps = pct;
      createdAt = Time.now();
    });
  };
};
