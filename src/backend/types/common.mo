import Storage "mo:caffeineai-object-storage/Storage";

module {
  /// Signed nanoseconds since the Unix epoch (`Time.now()`).
  public type Timestamp = Int;

  public type BusinessId = Nat;
  public type PurchaseId = Nat;
  public type ProposalId = Nat;
  public type LedgerEntryId = Nat;
  public type StakeholderId = Nat;
  public type LeadId = Nat;
  public type NominationId = Nat;
  public type CreditEntryId = Nat;
  public type CatalogueItemId = Nat;
  public type TransactionId = Nat;

  /// A logo or image reference stored off-chain.
  public type ImageRef = Storage.ExternalBlob;

  /// Money is simulated and expressed in integer cents to avoid float drift.
  public type Cents = Nat;

  /// Explicit failure variants shared across domains.
  public type CommonError = {
    #notAuthorized;
    #notFound;
    #invalidInput : Text;
    #limitExceeded : Text;
    #duplicate;
    #selfReferral;
    #alreadyClaimed;
    #inactive;
  };
};
