import Common "common";

module {
  public type BusinessId = Common.BusinessId;
  public type CatalogueItemId = Common.CatalogueItemId;
  public type TransactionId = Common.TransactionId;
  public type Timestamp = Common.Timestamp;
  public type Cents = Common.Cents;
  public type ImageRef = Common.ImageRef;

  /// Whether a catalogue entry is a physical product or a bookable service.
  public type ItemKind = {
    #product;
    #service;
  };

  /// A product or service offered by a business.
  public type CatalogueItem = {
    id : CatalogueItemId;
    businessId : BusinessId;
    name : Text;
    description : Text;
    price : Cents;
    kind : ItemKind;
    image : ?ImageRef;
    active : Bool;
  };

  /// One line in a shopping cart.
  public type CartLine = {
    itemId : CatalogueItemId;
    quantity : Nat;
  };

  /// A cart scoped to a single business with its computed subtotal.
  public type Cart = {
    businessId : BusinessId;
    lines : [CartLine];
    subtotal : Cents;
  };

  /// Payment provider kind prepared for future integrations.
  public type ProviderKind = {
    #simulated;
    #conventional;
    #blockchain;
  };

  /// A payment provider descriptor.
  public type PaymentProvider = {
    kind : ProviderKind;
    displayName : Text;
    active : Bool;
  };

  /// Lifecycle status of a simulated transaction.
  public type PaymentStatus = {
    #pending;
    #paid;
    #refunded;
    #cancelled;
  };

  /// A simulated transaction with separated revenue, contribution and fee.
  public type SimulatedTransaction = {
    id : TransactionId;
    businessId : BusinessId;
    consumer : Principal;
    lines : [CartLine];
    subtotal : Cents;
    roundUpContribution : Cents;
    platformFee : Cents;
    total : Cents;
    status : PaymentStatus;
    provider : PaymentProvider;
    transactionRef : Text;
    receiptToken : Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  /// A digital receipt with separated revenue, contribution and fee figures.
  public type DigitalReceipt = {
    receiptToken : Text;
    transactionId : TransactionId;
    businessName : Text;
    lines : [CartLine];
    revenue : Cents;
    contribution : Cents;
    platformFee : Cents;
    status : PaymentStatus;
    issuedAt : Timestamp;
  };

  /// One reconciliation row for a transaction.
  public type ReconciliationRow = {
    transactionId : TransactionId;
    timestamp : Timestamp;
    status : PaymentStatus;
    revenue : Cents;
    contribution : Cents;
    platformFee : Cents;
    total : Cents;
  };

  /// Result of a simulated checkout: the transaction plus its receipt token and
  /// dynamic transaction reference used for the QR code.
  public type CheckoutResult = {
    transaction : SimulatedTransaction;
    receiptToken : Text;
    transactionRef : Text;
  };

  public type CommerceError = {
    #notAuthorized;
    #notFound;
    #invalidInput : Text;
    #limitExceeded : Text;
    #duplicate;
  };
};
