import Common "common";

module {
  public type BusinessId = Common.BusinessId;
  public type PurchaseId = Common.PurchaseId;
  public type Timestamp = Common.Timestamp;
  public type Cents = Common.Cents;

  /// Round-up contribution option chosen at checkout.
  public type ContributionOption = {
    #nearestDollar;
    #nearestFive;
    #nearestTen;
    #custom;
    #none;
  };

  /// A simulated purchase with its separate sales revenue and investment
  /// contribution. Sales revenue and investment capital are never merged.
  public type Purchase = {
    id : PurchaseId;
    businessId : BusinessId;
    consumer : Principal;
    productName : Text;
    purchasePrice : Cents;
    contributionAmount : Cents;
    totalPayment : Cents;
    contributionOption : ContributionOption;
    ownershipUnits : Nat;
    createdAt : Timestamp;
  };

  /// Input for recording a simulated purchase.
  public type RecordPurchaseInput = {
    businessId : BusinessId;
    productName : Text;
    purchasePrice : Cents;
    contributionAmount : Cents;
    contributionOption : ContributionOption;
    clientRef : Text;
  };

  /// Per-business ownership position held by one consumer.
  public type PortfolioPosition = {
    businessId : BusinessId;
    ownershipUnits : Nat;
    hypotheticalPercentageBps : Nat;
    cumulativeContributions : Cents;
    purchaseCount : Nat;
    lastPurchaseAt : Timestamp;
  };

  /// A consumer's full simulated ownership portfolio.
  public type Portfolio = {
    owner : Principal;
    totalContributions : Cents;
    totalOwnershipUnits : Nat;
    positions : [PortfolioPosition];
    updatedAt : Timestamp;
  };

  /// Public, privacy-safe portfolio view shared by token.
  public type PublicPortfolio = {
    shareToken : Text;
    totalContributions : Cents;
    totalOwnershipUnits : Nat;
    businessCount : Nat;
    positions : [PublicPortfolioPosition];
    updatedAt : Timestamp;
  };

  public type PublicPortfolioPosition = {
    businessId : BusinessId;
    businessName : Text;
    ownershipUnits : Nat;
    hypotheticalPercentageBps : Nat;
    cumulativeContributions : Cents;
  };

  /// Result of an anonymous demo purchase: an ownership projection that is
  /// never persisted to a portfolio.
  public type DemoPurchaseResult = {
    businessId : BusinessId;
    productName : Text;
    purchasePrice : Cents;
    contributionAmount : Cents;
    totalPayment : Cents;
    contributionOption : ContributionOption;
    projectedOwnershipUnits : Nat;
    projectedPercentageBps : Nat;
    createdAt : Timestamp;
  };

  public type ConsumerError = {
    #notAuthorized;
    #notFound;
    #invalidInput : Text;
    #limitExceeded : Text;
    #duplicate;
  };
};
