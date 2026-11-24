import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/commerce";
import CommerceLib "../lib/commerce";
import BusinessLib "../lib/business";

mixin (accessControlState : AccessControl.AccessControlState, state : CommerceLib.State, businessState : BusinessLib.State) {
  func commerceBusinessName(businessId : Common.BusinessId) : Text {
    switch (BusinessLib.get(businessState, businessId)) {
      case (?b) { b.name };
      case null { "" };
    };
  };

  public query func listCatalogue(businessId : Common.BusinessId) : async [Types.CatalogueItem] {
    CommerceLib.listCatalogue(state, businessId);
  };

  public query func getCatalogueItem(itemId : Common.CatalogueItemId) : async ?Types.CatalogueItem {
    CommerceLib.getCatalogueItem(state, itemId);
  };

  public query func buildCart(businessId : Common.BusinessId, lines : [Types.CartLine]) : async { #ok : Types.Cart; #err : Types.CommerceError } {
    CommerceLib.buildCart(state, businessId, lines);
  };

  public shared ({ caller }) func checkout(cart : Types.Cart, roundUpContribution : Common.Cents, clientRef : Text) : async { #ok : Types.CheckoutResult; #err : Types.CommerceError } {
    CommerceLib.checkout(state, caller, cart, roundUpContribution, clientRef, commerceBusinessName(cart.businessId));
  };

  public query func getReceipt(receiptToken : Text) : async ?Types.DigitalReceipt {
    CommerceLib.getReceipt(state, receiptToken);
  };

  public query func getTransaction(transactionId : Common.TransactionId) : async ?Types.SimulatedTransaction {
    CommerceLib.getTransaction(state, transactionId);
  };

  public query ({ caller }) func listMyTransactions() : async [Types.SimulatedTransaction] {
    CommerceLib.listMyTransactions(state, caller);
  };

  public shared ({ caller }) func refundTransaction(transactionId : Common.TransactionId) : async { #ok : Types.SimulatedTransaction; #err : Types.CommerceError } {
    CommerceLib.refundTransaction(state, caller, transactionId);
  };

  public shared ({ caller }) func cancelTransaction(transactionId : Common.TransactionId) : async { #ok : Types.SimulatedTransaction; #err : Types.CommerceError } {
    CommerceLib.cancelTransaction(state, caller, transactionId);
  };

  public query ({ caller }) func listReconciliation(businessId : Common.BusinessId) : async [Types.ReconciliationRow] {
    if (not BusinessLib.isOwner(businessState, caller, businessId)) {
      return [];
    };
    CommerceLib.listReconciliation(state, businessId);
  };

  public query func listPaymentProviders() : async [Types.PaymentProvider] {
    CommerceLib.listProviders();
  };
};
