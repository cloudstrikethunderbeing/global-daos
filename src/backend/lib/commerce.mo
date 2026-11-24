import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/commerce";

module {
  public type CatalogueItem = Types.CatalogueItem;
  public type CartLine = Types.CartLine;
  public type Cart = Types.Cart;
  public type PaymentProvider = Types.PaymentProvider;
  public type SimulatedTransaction = Types.SimulatedTransaction;
  public type DigitalReceipt = Types.DigitalReceipt;
  public type ReconciliationRow = Types.ReconciliationRow;
  public type CheckoutResult = Types.CheckoutResult;
  public type CommerceError = Types.CommerceError;

  public type State = {
    items : Map.Map<Common.CatalogueItemId, CatalogueItem>;
    itemsByBusiness : Map.Map<Common.BusinessId, [Common.CatalogueItemId]>;
    transactions : Map.Map<Common.TransactionId, SimulatedTransaction>;
    transactionsByBusiness : Map.Map<Common.BusinessId, [Common.TransactionId]>;
    transactionsByConsumer : Map.Map<Principal, [Common.TransactionId]>;
    receipts : Map.Map<Text, DigitalReceipt>;
    clientRefs : Map.Map<Text, Common.TransactionId>;
    var nextItemId : Nat;
    var nextTransactionId : Nat;
  };

  /// Platform fee charged on the simulated subtotal, in basis points (2.5%).
  let platformFeeBps : Nat = 250;

  /// The single active simulated provider. Conventional and blockchain providers
  /// can be added later behind the same descriptor interface.
  let simulatedProvider : PaymentProvider = {
    kind = #simulated;
    displayName = "Simulated Checkout";
    active = true;
  };

  func computePlatformFee(subtotal : Common.Cents) : Common.Cents {
    (subtotal * platformFeeBps) / 10_000;
  };

  func receiptFor(tx : SimulatedTransaction, businessName : Text) : DigitalReceipt {
    {
      receiptToken = tx.receiptToken;
      transactionId = tx.id;
      businessName;
      lines = tx.lines;
      revenue = tx.subtotal;
      contribution = tx.roundUpContribution;
      platformFee = tx.platformFee;
      status = tx.status;
      issuedAt = tx.createdAt;
    };
  };

  func reconciliationFor(tx : SimulatedTransaction) : ReconciliationRow {
    {
      transactionId = tx.id;
      timestamp = tx.updatedAt;
      status = tx.status;
      revenue = tx.subtotal;
      contribution = tx.roundUpContribution;
      platformFee = tx.platformFee;
      total = tx.total;
    };
  };

  public func listCatalogue(state : State, businessId : Common.BusinessId) : [CatalogueItem] {
    let ids = state.itemsByBusiness.get(businessId) ?? [];
    ids.filter(func id = switch (state.items.get(id)) {
      case (?item) { item.active };
      case null { false };
    }).map(func id = switch (state.items.get(id)) {
      case (?item) { item };
      case null { { id; businessId; name = ""; description = ""; price = 0; kind = #product; image = null; active = false } };
    });
  };

  public func getCatalogueItem(state : State, itemId : Common.CatalogueItemId) : ?CatalogueItem {
    state.items.get(itemId);
  };

  public func buildCart(state : State, businessId : Common.BusinessId, lines : [CartLine]) : { #ok : Cart; #err : CommerceError } {
    if (lines.size() == 0) {
      return #err(#invalidInput("cart is empty"));
    };
    var subtotal : Common.Cents = 0;
    for (line in lines.values()) {
      if (line.quantity == 0) {
        return #err(#invalidInput("quantity must be greater than zero"));
      };
      let item = switch (state.items.get(line.itemId)) {
        case (?i) { i };
        case null { return #err(#invalidInput("unknown item")) };
      };
      if (item.businessId != businessId) {
        return #err(#invalidInput("item does not belong to this business"));
      };
      if (not item.active) {
        return #err(#invalidInput("item is not available"));
      };
      subtotal += item.price * line.quantity;
    };
    #ok({ businessId; lines; subtotal });
  };

  public func checkout(state : State, caller : Principal, cart : Cart, roundUpContribution : Common.Cents, clientRef : Text, businessName : Text) : { #ok : CheckoutResult; #err : CommerceError } {
    if (caller.isAnonymous()) {
      return #err(#notAuthorized);
    };
    if (clientRef.size() == 0) {
      return #err(#invalidInput("client reference is required"));
    };
    // Idempotency: a retried client reference returns the existing transaction.
    switch (state.clientRefs.get(clientRef)) {
      case (?existingId) {
        switch (state.transactions.get(existingId)) {
          case (?tx) {
            return #ok({ transaction = tx; receiptToken = tx.receiptToken; transactionRef = tx.transactionRef });
          };
          case null {};
        };
      };
      case null {};
    };
    // Re-validate the cart against current catalogue state.
    let validated = switch (buildCart(state, cart.businessId, cart.lines)) {
      case (#ok(c)) { c };
      case (#err(e)) { return #err(e) };
    };
    let subtotal = validated.subtotal;
    let platformFee = computePlatformFee(subtotal);
    let total = subtotal + roundUpContribution + platformFee;
    let now = Time.now();
    let id = state.nextTransactionId;
    state.nextTransactionId := id + 1;
    let receiptToken = "rcpt-" # id.toText() # "-" # now.toText();
    let transactionRef = "txn-" # id.toText() # "-" # now.toText();
    let tx : SimulatedTransaction = {
      id;
      businessId = validated.businessId;
      consumer = caller;
      lines = validated.lines;
      subtotal;
      roundUpContribution;
      platformFee;
      total;
      status = #paid;
      provider = simulatedProvider;
      transactionRef;
      receiptToken;
      createdAt = now;
      updatedAt = now;
    };
    state.transactions.add(id, tx);
    let bizIds = state.transactionsByBusiness.get(validated.businessId) ?? [];
    state.transactionsByBusiness.add(validated.businessId, bizIds.concat([id]));
    let consumerIds = state.transactionsByConsumer.get(caller) ?? [];
    state.transactionsByConsumer.add(caller, consumerIds.concat([id]));
    state.clientRefs.add(clientRef, id);
    state.receipts.add(receiptToken, receiptFor(tx, businessName));
    #ok({ transaction = tx; receiptToken; transactionRef });
  };

  public func getReceipt(state : State, receiptToken : Text) : ?DigitalReceipt {
    state.receipts.get(receiptToken);
  };

  public func getTransaction(state : State, transactionId : Common.TransactionId) : ?SimulatedTransaction {
    state.transactions.get(transactionId);
  };

  public func listMyTransactions(state : State, caller : Principal) : [SimulatedTransaction] {
    let ids = state.transactionsByConsumer.get(caller) ?? [];
    ids.filter(func id = state.transactions.containsKey(id)).map(func id = switch (state.transactions.get(id)) {
      case (?tx) { tx };
      case null { emptyTransaction(id, caller) };
    });
  };

  func emptyTransaction(id : Common.TransactionId, consumer : Principal) : SimulatedTransaction {
    {
      id;
      businessId = 0;
      consumer;
      lines = [];
      subtotal = 0;
      roundUpContribution = 0;
      platformFee = 0;
      total = 0;
      status = #cancelled;
      provider = simulatedProvider;
      transactionRef = "";
      receiptToken = "";
      createdAt = 0;
      updatedAt = 0;
    };
  };

  func updateStatus(state : State, caller : Principal, transactionId : Common.TransactionId, target : Types.PaymentStatus) : { #ok : SimulatedTransaction; #err : CommerceError } {
    let tx = switch (state.transactions.get(transactionId)) {
      case (?t) { t };
      case null { return #err(#notFound) };
    };
    if (not Principal.equal(tx.consumer, caller)) {
      return #err(#notAuthorized);
    };
    let allowed = switch (target) {
      case (#refunded) { tx.status == #paid };
      case (#cancelled) { tx.status == #pending or tx.status == #paid };
      case (_) { false };
    };
    if (not allowed) {
      return #err(#invalidInput("transaction cannot change to that status"));
    };
    let updated : SimulatedTransaction = { tx with status = target; updatedAt = Time.now() };
    state.transactions.add(transactionId, updated);
    switch (state.receipts.get(tx.receiptToken)) {
      case (?receipt) {
        state.receipts.add(tx.receiptToken, { receipt with status = target });
      };
      case null {};
    };
    #ok(updated);
  };

  public func refundTransaction(state : State, caller : Principal, transactionId : Common.TransactionId) : { #ok : SimulatedTransaction; #err : CommerceError } {
    updateStatus(state, caller, transactionId, #refunded);
  };

  public func cancelTransaction(state : State, caller : Principal, transactionId : Common.TransactionId) : { #ok : SimulatedTransaction; #err : CommerceError } {
    updateStatus(state, caller, transactionId, #cancelled);
  };

  public func listReconciliation(state : State, businessId : Common.BusinessId) : [ReconciliationRow] {
    let ids = state.transactionsByBusiness.get(businessId) ?? [];
    ids.filter(func id = state.transactions.containsKey(id)).map(func id = switch (state.transactions.get(id)) {
      case (?tx) { reconciliationFor(tx) };
      case null { { transactionId = id; timestamp = 0; status = #cancelled; revenue = 0; contribution = 0; platformFee = 0; total = 0 } };
    });
  };

  public func listProviders() : [PaymentProvider] {
    [simulatedProvider];
  };
};
