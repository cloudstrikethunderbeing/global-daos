import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/credits";

module {
  public type RewardType = Types.RewardType;
  public type RewardAmounts = Types.RewardAmounts;
  public type CreditLedgerEntry = Types.CreditLedgerEntry;
  public type FoundingMember = Types.FoundingMember;
  public type FoundingBadge = Types.FoundingBadge;
  public type CreditAccountSummary = Types.CreditAccountSummary;
  public type ReferralKind = Types.ReferralKind;
  public type ReferralAttribution = Types.ReferralAttribution;
  public type CreditError = Types.CreditError;
  public type CreditsMetrics = Types.CreditsMetrics;

  public type State = {
    entries : Map.Map<Common.CreditEntryId, CreditLedgerEntry>;
    entriesByAccount : Map.Map<Principal, [Common.CreditEntryId]>;
    members : Map.Map<Principal, FoundingMember>;
    memberNumbers : Map.Map<Nat, Principal>;
    referrals : Map.Map<Principal, ReferralAttribution>;
    referralCodes : Map.Map<Text, Principal>;
    var rewardAmounts : RewardAmounts;
    var nextEntryId : Nat;
    var nextMemberNumber : Nat;
  };

  /// Stable, deterministic reward-type key used for dedupe and metrics.
  func rewardKey(rewardType : RewardType) : Text {
    switch (rewardType) {
      case (#earlyConsumerRegistration) { "earlyConsumerRegistration" };
      case (#foundingBusinessRegistration) { "foundingBusinessRegistration" };
      case (#firstSimulatedPurchase) { "firstSimulatedPurchase" };
      case (#businessNomination) { "businessNomination" };
      case (#consumerReferral) { "consumerReferral" };
      case (#businessReferral) { "businessReferral" };
      case (#daoDeployment) { "daoDeployment" };
      case (#valuableFeedback) { "valuableFeedback" };
    };
  };

  func amountFor(amounts : RewardAmounts, rewardType : RewardType) : Nat {
    switch (rewardType) {
      case (#earlyConsumerRegistration) { amounts.earlyConsumerRegistration };
      case (#foundingBusinessRegistration) { amounts.foundingBusinessRegistration };
      case (#firstSimulatedPurchase) { amounts.firstSimulatedPurchase };
      case (#businessNomination) { amounts.businessNomination };
      case (#consumerReferral) { amounts.consumerReferral };
      case (#businessReferral) { amounts.businessReferral };
      case (#daoDeployment) { amounts.daoDeployment };
      case (#valuableFeedback) { amounts.valuableFeedback };
    };
  };

  func badgeFor(rewardType : RewardType) : FoundingBadge {
    switch (rewardType) {
      case (#foundingBusinessRegistration) { #business };
      case (_) { #consumer };
    };
  };

  func isReferralReward(rewardType : RewardType) : Bool {
    switch (rewardType) {
      case (#consumerReferral) { true };
      case (#businessReferral) { true };
      case (_) { false };
    };
  };

  func referralKindOf(rewardType : RewardType) : ?ReferralKind {
    switch (rewardType) {
      case (#consumerReferral) { ?#consumer };
      case (#businessReferral) { ?#business };
      case (_) { null };
    };
  };

  func entryIdsOf(state : State, account : Principal) : [Common.CreditEntryId] {
    state.entriesByAccount.get(account) ?? [];
  };

  func findEntry(state : State, account : Principal, rewardType : RewardType, subject : Text) : ?CreditLedgerEntry {
    let key = rewardKey(rewardType);
    let ids = entryIdsOf(state, account);
    var found : ?CreditLedgerEntry = null;
    for (id in ids.values()) {
      switch (state.entries.get(id)) {
        case (?entry) {
          if (entry.subject == subject and rewardKey(entry.rewardType) == key) {
            found := ?entry;
          };
        };
        case (null) {};
      };
    };
    found;
  };

  func deriveCode(account : Principal) : Text {
    let raw = account.toText();
    let chars = raw.toArray();
    let take = if (chars.size() > 8) { 8 } else { chars.size() };
    let slice = Array.tabulate(take, func i = chars[i]);
    "FC-" # Text.fromArray(slice);
  };

  public func defaultRewardAmounts() : RewardAmounts {
    {
      earlyConsumerRegistration = 100;
      foundingBusinessRegistration = 1_000;
      firstSimulatedPurchase = 25;
      businessNomination = 50;
      consumerReferral = 100;
      businessReferral = 500;
      daoDeployment = 500;
      valuableFeedback = 100;
    };
  };

  public func getRewardAmounts(state : State) : RewardAmounts {
    state.rewardAmounts;
  };

  public func setRewardAmounts(state : State, amounts : RewardAmounts) : { #ok : RewardAmounts; #err : CreditError } {
    state.rewardAmounts := amounts;
    #ok(amounts);
  };

  public func award(state : State, account : Principal, rewardType : RewardType, subject : Text, memo : Text) : { #ok : CreditLedgerEntry; #err : CreditError } {
    if (account.isAnonymous()) {
      return #err(#notAuthorized);
    };
    switch (findEntry(state, account, rewardType, subject)) {
      case (?existing) { return #ok(existing) };
      case (null) {};
    };
    let amount = amountFor(state.rewardAmounts, rewardType);
    let id = state.nextEntryId;
    state.nextEntryId := id + 1;
    let entry : CreditLedgerEntry = {
      id;
      account;
      rewardType;
      amount;
      subject;
      memo;
      createdAt = Time.now();
    };
    state.entries.add(id, entry);
    let ids = entryIdsOf(state, account);
    state.entriesByAccount.add(account, ids.concat([id]));
    ignore ensureFoundingMember(state, account, badgeFor(rewardType));
    #ok(entry);
  };

  public func ensureFoundingMember(state : State, account : Principal, badge : FoundingBadge) : FoundingMember {
    switch (state.members.get(account)) {
      case (?member) { member };
      case (null) {
        let memberNumber = state.nextMemberNumber;
        state.nextMemberNumber := memberNumber + 1;
        let member : FoundingMember = {
          account;
          memberNumber;
          foundingDate = Time.now();
          badge;
          lifetimeEarned = 0;
        };
        state.members.add(account, member);
        state.memberNumbers.add(memberNumber, account);
        member;
      };
    };
  };

  public func getAccountSummary(state : State, account : Principal) : CreditAccountSummary {
    var balance = 0;
    for (id in entryIdsOf(state, account).values()) {
      switch (state.entries.get(id)) {
        case (?entry) { balance += entry.amount };
        case (null) {};
      };
    };
    let member = state.members.get(account);
    {
      balance;
      lifetimeEarned = balance;
      memberNumber = switch (member) { case (?m) { ?m.memberNumber }; case (null) { null } };
      foundingDate = switch (member) { case (?m) { ?m.foundingDate }; case (null) { null } };
      badge = switch (member) { case (?m) { ?m.badge }; case (null) { null } };
      referralCode = getReferralCode(state, account);
    };
  };

  public func getContributionHistory(state : State, account : Principal) : [CreditLedgerEntry] {
    let ids = entryIdsOf(state, account);
    let collected = ids.map(func id = state.entries.get(id));
    let present = collected.filter(func e = e != null);
    present.map(func e = switch (e) { case (?entry) { entry }; case (null) { Runtime.trap("unreachable") } });
  };

  public func getReferralCode(state : State, account : Principal) : Text {
    switch (state.members.get(account)) {
      case (null) { "" };
      case (?_) {
        let code = deriveCode(account);
        if (not state.referralCodes.containsKey(code)) {
          state.referralCodes.add(code, account);
        };
        code;
      };
    };
  };

  public func attributeReferral(state : State, referrer : Principal, referred : Principal, kind : ReferralKind) : { #ok : ReferralAttribution; #err : CreditError } {
    if (referrer.isAnonymous() or referred.isAnonymous()) {
      return #err(#notAuthorized);
    };
    if (Principal.equal(referrer, referred)) {
      return #err(#selfReferral);
    };
    switch (state.referrals.get(referred)) {
      case (?_) { return #err(#duplicate) };
      case (null) {};
    };
    let attribution : ReferralAttribution = {
      referrer;
      referred;
      kind;
      createdAt = Time.now();
    };
    state.referrals.add(referred, attribution);
    #ok(attribution);
  };

  public func getReferral(state : State, referred : Principal) : ?ReferralAttribution {
    state.referrals.get(referred);
  };

  public func listMembers(state : State) : [FoundingMember] {
    let all = state.members.values().toArray();
    all.sort(func (a, b) = Nat.compare(a.memberNumber, b.memberNumber));
  };

  public func listEntries(state : State) : [CreditLedgerEntry] {
    let all = state.entries.values().toArray();
    all.sort(func (a, b) = Nat.compare(a.id, b.id));
  };

  public func metrics(state : State) : CreditsMetrics {
    var totalCreditsAwarded = 0;
    var referralCredits = 0;
    var referralsConverted = 0;
    let byType = Map.empty<Text, Nat>();
    for (entry in state.entries.values()) {
      totalCreditsAwarded += entry.amount;
      let key = rewardKey(entry.rewardType);
      let current = byType.get(key) ?? 0;
      byType.add(key, current + entry.amount);
      if (isReferralReward(entry.rewardType)) {
        referralCredits += entry.amount;
        referralsConverted += 1;
      };
    };
    let creditsByRewardType = byType.entries().toArray().map(func ((k, v)) = (k, v));
    {
      totalCreditsAwarded;
      creditsByRewardType;
      foundingMemberCount = state.members.size();
      referralsAttributed = state.referrals.size();
      referralsConverted;
      creditsPaidForReferrals = referralCredits;
    };
  };
};
