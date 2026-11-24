import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import BoolValue "mo:caffeineai-oql/BoolValue";
import IntValue "mo:caffeineai-oql/IntValue";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

import BusinessLib "lib/business";
import ConsumerLib "lib/consumer";
import GovernanceLib "lib/governance";
import LeadsLib "lib/leads";
import CreditsLib "lib/credits";
import CommerceLib "lib/commerce";

import BusinessApi "mixins/business-api";
import ConsumerApi "mixins/consumer-api";
import GovernanceApi "mixins/governance-api";
import LeadsApi "mixins/leads-api";
import CreditsApi "mixins/credits-api";
import CommerceApi "mixins/commerce-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);
  include MixinObjectStorage();

  let businessState : BusinessLib.State;
  let consumerState : ConsumerLib.State;
  let governanceState : GovernanceLib.State;
  let leadsState : LeadsLib.State;
  let creditsState : CreditsLib.State;
  let commerceState : CommerceLib.State;

  include BusinessApi(businessState, consumerState, creditsState);
  include ConsumerApi(consumerState, businessState, governanceState, creditsState);
  include GovernanceApi(governanceState, businessState);
  include LeadsApi(accessControlState, leadsState, creditsState);
  include CreditsApi(accessControlState, creditsState);
  include CommerceApi(accessControlState, commerceState, businessState);

  include ApiDocMixin();

  transient let businessEntity = Entity.manual<BusinessLib.BusinessPublic>(
    "business",
    func() : Iter.Iter<BusinessLib.BusinessPublic> = businessState.businesses.values().map(func b = BusinessLib.toPublic(b)),
    "Business",
    "id",
  )
    .payload("id", func b = b.id)
    .payload("slug", func b = b.slug)
    .payload("name", func b = b.name)
    .payload("industry", func b = b.industry)
    .payload("city", func b = b.city)
    .payload("country", func b = b.country)
    .payload("description", func b = b.description)
    .payload("isFictional", func b = b.isFictional)
    .payload("totalOwnershipSupply", func b = b.totalOwnershipSupply)
    .payload("consumerOwnershipPool", func b = b.consumerOwnershipPool)
    .payload("maxFundraisingTarget", func b = b.maxFundraisingTarget)
    .payload("minContribution", func b = b.minContribution)
    .payload("maxContribution", func b = b.maxContribution)
    .payload("createdAt", func b = b.createdAt)
    .sample({
      id = 0;
      slug = "";
      name = "";
      logo = null;
      industry = "";
      city = "";
      country = "";
      description = "";
      isFictional = false;
      totalOwnershipSupply = 0;
      consumerOwnershipPool = 0;
      maxFundraisingTarget = 0;
      minContribution = 0;
      maxContribution = 0;
      ownershipRights = {
        votingEnabled = false;
        profitShareEnabled = false;
        transferable = false;
        rightsSummary = "";
      };
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
          optOutAllowed = false;
        };
        incentives = {
          loyaltyRewards = false;
          businessFundedOwnership = false;
          matchingContributions = false;
          profitParticipation = false;
          promotionalAllocations = false;
        };
        minContribution = 0;
        maxContribution = 0;
      };
      createdAt = 0;
    })
    .public_()
    .build();

  transient let purchaseEntity = Entity.manual<ConsumerLib.Purchase>(
    "purchase",
    func() : Iter.Iter<ConsumerLib.Purchase> = consumerState.purchases.values(),
    "Purchase",
    "id",
  )
    .payload("id", func p = p.id)
    .payload("businessId", func p = p.businessId)
    .payload("consumer", func p = p.consumer.toText())
    .payload("productName", func p = p.productName)
    .payload("purchasePrice", func p = p.purchasePrice)
    .payload("contributionAmount", func p = p.contributionAmount)
    .payload("totalPayment", func p = p.totalPayment)
    .payload("ownershipUnits", func p = p.ownershipUnits)
    .payload("createdAt", func p = p.createdAt)
    .sample({
      id = 0;
      businessId = 0;
      consumer = Principal.fromText("aaaaa-aa");
      productName = "";
      purchasePrice = 0;
      contributionAmount = 0;
      totalPayment = 0;
      contributionOption = #none;
      ownershipUnits = 0;
      createdAt = 0;
    })
    .ownedBy("consumer")
    .scopedPerUser()
    .build();

  transient let nominationEntity = Entity.manual<LeadsLib.Nomination>(
    "nomination",
    func() : Iter.Iter<LeadsLib.Nomination> = leadsState.nominations.values(),
    "Nomination",
    "id",
  )
    .payload("id", func n = n.id)
    .payload("businessName", func n = n.businessName)
    .payload("category", func n = n.category)
    .payload("location", func n = n.location)
    .payload("nominatedBy", func n = n.nominatedBy.toText())
    .payload("createdAt", func n = n.createdAt)
    .sample({
      id = 0;
      businessName = "";
      category = "";
      location = "";
      nominatedBy = Principal.fromText("aaaaa-aa");
      createdAt = 0;
    })
    .public_()
    .build();

  transient let foundingInterestEntity = Entity.manual<LeadsLib.FoundingInterest>(
    "foundingInterest",
    func() : Iter.Iter<LeadsLib.FoundingInterest> = leadsState.interests.values(),
    "FoundingInterest",
    "id",
  )
    .payload("id", func f = f.id)
    .payload("businessName", func f = f.businessName)
    .payload("industry", func f = f.industry)
    .payload("location", func f = f.location)
    .payload("contactName", func f = f.contactName)
    .payload("contactEmail", func f = f.contactEmail)
    .payload("participationInterest", func f = f.participationInterest)
    .payload("createdAt", func f = f.createdAt)
    .sample({
      id = 0;
      businessName = "";
      industry = "";
      location = "";
      contactName = "";
      contactEmail = "";
      participationInterest = "";
      createdAt = 0;
    })
    .controllerOnly()
    .build();

  transient let proposalEntity = Entity.manual<GovernanceLib.Proposal>(
    "proposal",
    func() : Iter.Iter<GovernanceLib.Proposal> = governanceState.proposals.values(),
    "Proposal",
    "id",
  )
    .payload("id", func p = p.id)
    .payload("businessId", func p = p.businessId)
    .payload("title", func p = p.title)
    .payload("body", func p = p.body)
    .payload("status", func p = switch (p.status) {
      case (#open) "open";
      case (#passed) "passed";
      case (#rejected) "rejected";
      case (#closed) "closed";
    })
    .payload("createdBy", func p = p.createdBy.toText())
    .payload("createdAt", func p = p.createdAt)
    .payload("closesAt", func p = p.closesAt)
    .payload("yesVotes", func p = p.yesVotes)
    .payload("noVotes", func p = p.noVotes)
    .payload("abstainVotes", func p = p.abstainVotes)
    .sample({
      id = 0;
      businessId = 0;
      title = "";
      body = "";
      status = #open;
      createdBy = Principal.fromText("aaaaa-aa");
      createdAt = 0;
      closesAt = 0;
      yesVotes = 0;
      noVotes = 0;
      abstainVotes = 0;
    })
    .public_()
    .build();

  transient let stakeholderEntity = Entity.manual<GovernanceLib.Stakeholder>(
    "stakeholder",
    func() : Iter.Iter<GovernanceLib.Stakeholder> = governanceState.stakeholders.values(),
    "Stakeholder",
    "id",
  )
    .payload("id", func s = s.id)
    .payload("businessId", func s = s.businessId)
    .payload("principal", func s = s.principal.toText())
    .payload("displayName", func s = s.displayName)
    .payload("ownershipUnits", func s = s.ownershipUnits)
    .payload("cumulativeContributions", func s = s.cumulativeContributions)
    .payload("joinedAt", func s = s.joinedAt)
    .sample({
      id = 0;
      businessId = 0;
      principal = Principal.fromText("aaaaa-aa");
      displayName = "";
      ownershipUnits = 0;
      cumulativeContributions = 0;
      joinedAt = 0;
    })
    .controllerOnly()
    .build();

  transient let ledgerEntryEntity = Entity.manual<GovernanceLib.LedgerEntry>(
    "ledgerEntry",
    func() : Iter.Iter<GovernanceLib.LedgerEntry> = governanceState.ledger.values(),
    "LedgerEntry",
    "id",
  )
    .payload("id", func e = e.id)
    .payload("businessId", func e = e.businessId)
    .payload("principal", func e = e.principal.toText())
    .payload("purchaseId", func e = e.purchaseId)
    .payload("unitsDelta", func e = e.unitsDelta)
    .payload("contributionAmount", func e = e.contributionAmount)
    .payload("reason", func e = e.reason)
    .payload("createdAt", func e = e.createdAt)
    .sample({
      id = 0;
      businessId = 0;
      principal = Principal.fromText("aaaaa-aa");
      purchaseId = 0;
      unitsDelta = 0;
      contributionAmount = 0;
      reason = "";
      createdAt = 0;
    })
    .controllerOnly()
    .build();

  transient let creditEntryEntity = Entity.manual<CreditsLib.CreditLedgerEntry>(
    "creditEntry",
    func() : Iter.Iter<CreditsLib.CreditLedgerEntry> = creditsState.entries.values(),
    "CreditLedgerEntry",
    "id",
  )
    .payload("id", func e = e.id)
    .payload("account", func e = e.account.toText())
    .payload("rewardType", func e = switch (e.rewardType) {
      case (#earlyConsumerRegistration) "earlyConsumerRegistration";
      case (#foundingBusinessRegistration) "foundingBusinessRegistration";
      case (#firstSimulatedPurchase) "firstSimulatedPurchase";
      case (#businessNomination) "businessNomination";
      case (#consumerReferral) "consumerReferral";
      case (#businessReferral) "businessReferral";
      case (#daoDeployment) "daoDeployment";
      case (#valuableFeedback) "valuableFeedback";
    })
    .payload("amount", func e = e.amount)
    .payload("subject", func e = e.subject)
    .payload("memo", func e = e.memo)
    .payload("createdAt", func e = e.createdAt)
    .sample({
      id = 0;
      account = Principal.fromText("aaaaa-aa");
      rewardType = #earlyConsumerRegistration;
      amount = 0;
      subject = "";
      memo = "";
      createdAt = 0;
    })
    .ownedBy("account")
    .controllerOrScoped()
    .build();

  transient let foundingMemberEntity = Entity.manual<CreditsLib.FoundingMember>(
    "foundingMember",
    func() : Iter.Iter<CreditsLib.FoundingMember> = creditsState.members.values(),
    "FoundingMember",
    "memberNumber",
  )
    .payload("account", func m = m.account.toText())
    .payload("memberNumber", func m = m.memberNumber)
    .payload("foundingDate", func m = m.foundingDate)
    .payload("badge", func m = switch (m.badge) {
      case (#consumer) "consumer";
      case (#business) "business";
    })
    .payload("lifetimeEarned", func m = m.lifetimeEarned)
    .sample({
      account = Principal.fromText("aaaaa-aa");
      memberNumber = 0;
      foundingDate = 0;
      badge = #consumer;
      lifetimeEarned = 0;
    })
    .public_()
    .build();

  transient let transactionEntity = Entity.manual<CommerceLib.SimulatedTransaction>(
    "transaction",
    func() : Iter.Iter<CommerceLib.SimulatedTransaction> = commerceState.transactions.values(),
    "SimulatedTransaction",
    "id",
  )
    .payload("id", func t = t.id)
    .payload("businessId", func t = t.businessId)
    .payload("consumer", func t = t.consumer.toText())
    .payload("subtotal", func t = t.subtotal)
    .payload("roundUpContribution", func t = t.roundUpContribution)
    .payload("platformFee", func t = t.platformFee)
    .payload("total", func t = t.total)
    .payload("status", func t = switch (t.status) {
      case (#pending) "pending";
      case (#paid) "paid";
      case (#refunded) "refunded";
      case (#cancelled) "cancelled";
    })
    .payload("provider", func t = t.provider.displayName)
    .payload("transactionRef", func t = t.transactionRef)
    .payload("receiptToken", func t = t.receiptToken)
    .payload("createdAt", func t = t.createdAt)
    .payload("updatedAt", func t = t.updatedAt)
    .sample({
      id = 0;
      businessId = 0;
      consumer = Principal.fromText("aaaaa-aa");
      lines = [];
      subtotal = 0;
      roundUpContribution = 0;
      platformFee = 0;
      total = 0;
      status = #paid;
      provider = { kind = #simulated; displayName = ""; active = true };
      transactionRef = "";
      receiptToken = "";
      createdAt = 0;
      updatedAt = 0;
    })
    .ownedBy("consumer")
    .controllerOrScoped()
    .build();

  include Expose({
    entities = [
      businessEntity,
      purchaseEntity,
      nominationEntity,
      foundingInterestEntity,
      proposalEntity,
      stakeholderEntity,
      ledgerEntryEntity,
      creditEntryEntity,
      foundingMemberEntity,
      transactionEntity,
    ];
  });
};
