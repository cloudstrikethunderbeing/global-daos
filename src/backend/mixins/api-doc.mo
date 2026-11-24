mixin () {
  public query func getApiDoc() : async Text {
    "# GLOBAL DAOs Backend API\n" #
    "\n" #
    "## Purpose\n" #
    "\n" #
    "GLOBAL DAOs is a simulated Consumerism Staking platform. Businesses deploy branded business DAOs, consumers make simulated purchases with voluntary round-up contributions, and those contributions accrue simulated ownership units. **All financial activity is simulated**: no real payments, no equity or securities issuance, no token issuance, and no real profit distributions. Purchase revenue, investment contributions, ownership dilution and hypothetical portfolio value are always reported as separate figures.\n" #
    "\n" #
    "## Authentication and identity\n" #
    "\n" #
    "Internet Identity is used for sign-in. The frontend pins an Internet Identity derivation origin published at `/.well-known/ii-derivation-origin`; an agent already holding the user's Internet Identity authorization derives the correct per-app principal against that origin (for example `icp identity link web <name> --app <host>`). Such a delegation acts with the user's full authority in this app until it expires.\n" #
    "\n" #
    "Registration is separate from sign-in. A principal becomes registered only when it calls `_initialize_access_control` (or completes `_internet_identity_sign_in_finish`) as a signed-in caller. The **first** principal to initialize becomes `#admin`; every later principal becomes `#user`. A principal that never registered is unregistered even if it belongs to the app owner, and a principal derived against a different origin is a different principal than the one the frontend registered. `getCallerUserRole()` returns `#guest` for anonymous callers and traps with `\"User is not registered\"` for a signed-in caller that never registered.\n" #
    "\n" #
    "Most write methods do **not** require a signed-in identity: `recordPurchase`, `recordDemoPurchase`, `createBusiness`, `registerFoundingInterest`, `nominateBusiness` and the funnel counters accept any caller, including anonymous. Identity only decides *whose* portfolio a purchase lands in and *who* owns a business. The methods that genuinely require a specific identity are:\n" #
    "\n" #
    "- `voteOnProposal` — the caller must hold ownership units in that business (see Governance); a caller with no ownership gets `#err(#notAuthorized)`.\n" #
    "- `updateBusiness`, `getBusinessAdminStats`, `createProposal`, `listStakeholders`, `listLedger`, `getCapTable` — the caller must be the business owner; otherwise `#err(#notAuthorized)`.\n" #
    "- `getFounderAnalytics` — the caller must be a registered `#admin`. An anonymous caller gets `#err(#notAuthorized)`; a signed-in but unregistered caller traps with `\"User is not registered\"`.\n" #
    "\n" #
    "## Units and encodings\n" #
    "\n" #
    "- Money is integer **cents** (`Cents = Nat`).\n" #
    "- Timestamps are signed nanoseconds since the Unix epoch (`Timestamp = Int`), as returned by `Time.now()`.\n" #
    "- Identifiers (`BusinessId`, `PurchaseId`, `ProposalId`, `LedgerEntryId`, `StakeholderId`, `LeadId`, `NominationId`) are `Nat`.\n" #
    "- Percentages and conversion rates are **basis points** (`Nat`, 100% = 10_000 bps).\n" #
    "- Principals are Candid `principal` values; in OQL rows they render as text.\n" #
    "- Optional values are Candid `opt`; variants use their tag names.\n" #
    "\n" #
    "## Businesses\n" #
    "\n" #
    "- `listBusinesses()`, `getBusiness(id)`, `getBusinessBySlug(slug)` — public reads.\n" #
    "- `listMyBusinesses()` — businesses owned by the caller (empty for anonymous).\n" #
    "- `createBusiness(input)` — deploys a business DAO owned by the caller; returns `#err(#slugTaken)` on a duplicate slug and `#err(#invalidInput(msg))` on invalid terms, including a `maxFundraisingTarget` above the enforced ceiling.\n" #
    "- `updateBusiness(id, input)` — owner only; the same fundraising ceiling applies to `maxFundraisingTarget`.\n" #
    "- `getBusinessAdminStats(id)` — owner only; simulated sales, contributions, capital raised, progress, participating customers, ownership allocated and remaining pool.\n" #
    "\n" #
    "### Ownership pool and fundraising limits\n" #
    "\n" #
    "Every business declares `totalOwnershipSupply`, `consumerOwnershipPool`, `maxFundraisingTarget`, `minContribution` and `maxContribution`. The backend enforces them on create/update and on every purchase:\n" #
    "\n" #
    "- `totalOwnershipSupply` must be greater than zero and `consumerOwnershipPool` cannot exceed it.\n" #
    "- `maxFundraisingTarget` must be greater than zero and at most **1,000,000,000 cents ($10,000,000.00)**; a larger target is rejected with `#err(#invalidInput(...))` and no business DAO is created or updated. `minContribution` cannot exceed `maxContribution`.\n" #
    "- A contribution must be zero, or at least `minContribution` and at most `maxContribution`.\n" #
    "- A contribution that would push allocated ownership units past `consumerOwnershipPool`, or raised contributions past `maxFundraisingTarget`, returns `#err(#limitExceeded(...))`.\n" #
    "\n" #
    "## Purchases and portfolio\n" #
    "\n" #
    "- `recordPurchase(input)` — records a simulated purchase under the caller's principal. `purchasePrice` is business sales revenue; `contributionAmount` is a separate simulated investment contribution. `contributionOption` `#none` forces a zero contribution. `clientRef` is an idempotency key per caller: a repeated `clientRef` from the same caller returns the original purchase (`#ok`), while the same `clientRef` from a different caller returns `#err(#duplicate)` and records nothing. Limit violations return `#err(#invalidInput(...))` or `#err(#limitExceeded(...))`.\n" #
    "- `recordDemoPurchase(input)` — anonymous demo purchase. Computes an ownership projection (`projectedOwnershipUnits`, `projectedPercentageBps`) without persisting a portfolio, so a visitor without a signed-in identity can complete a simulated purchase. Enforces the same pool and fundraising limits as `recordPurchase`.\n" #
    "- `getMyPortfolio()` — the caller's simulated ownership portfolio (empty for anonymous).\n" #
    "- `getMyPurchaseHistory()` — the caller's purchases.\n" #
    "- `getMyShareToken()` — a stable, deterministic share token derived from the caller's principal (`\"pf-\" # principal`). Calling it again returns the same token.\n" #
    "- `getPublicPortfolio(shareToken)` — privacy-safe public view, or `null` for an unknown token.\n" #
    "\n" #
    "## Governance\n" #
    "\n" #
    "- `createProposal(businessId, title, body, closesAt)` — business owner only; `closesAt` must be in the future.\n" #
    "- `voteOnProposal(proposalId, choice)` — the caller must hold ownership units in the proposal's business (`#err(#notAuthorized)` otherwise); one vote per proposal per caller (`#err(#duplicate)` on a second vote); voting at or after `closesAt` returns `#err(#invalidInput(...))`.\n" #
    "- `listProposals(businessId)` — public read.\n" #
    "- `listStakeholders(businessId)`, `listLedger(businessId)`, `getCapTable(businessId)` — business owner only; the auditable simulated ownership ledger and capitalization table.\n" #
    "\n" #
    "## Growth and founder analytics\n" #
    "\n" #
    "- `registerFoundingInterest(input)` — public; registers Founding Business Program interest without deploying a DAO. Validates a non-blank business name, contact name and industry, and a well-formed contact email.\n" #
    "- `nominateBusiness(input)` — any caller; nominates a business. Validates a non-blank business name and category.\n" #
    "- `listNominations()` — public; the 50 most recent nominations, newest first.\n" #
    "- `listMyNominations()` — the caller's own nominations, newest first.\n" #
    "- `recordVisit(returning)`, `recordDemoPurchaseCounter()`, `recordConsumerRegistration()`, `recordBusinessRegistration()`, `recordDaoDeployment()` — funnel counters.\n" #
    "- `getFounderAnalytics()` — admin only; counters plus visitor-to-registration and registration-to-deployment conversion rates in basis points, and the credit distribution and referral metrics: `totalCreditsAwarded`, `creditsByRewardType` (a list of `(rewardTypeKey, credits)` pairs), `foundingMemberCount`, `referralsAttributed`, `referralsConverted` and `creditsPaidForReferrals`.\n" #
    "\n" #
    "## Founding Credits\n" #
    "\n" #
    "Founding Credits are a recognition and participation program. They are **never** money, equity, a token or an investment, and they carry no monetary redemption, token conversion or financial return. Credits are recorded in an auditable backend ledger, separate from simulated ownership portfolios.\n" #
    "\n" #
    "Reward types and their default amounts (configurable by an admin): `earlyConsumerRegistration` 100, `foundingBusinessRegistration` 1_000, `firstSimulatedPurchase` 25, `businessNomination` 50, `consumerReferral` 100, `businessReferral` 500, `daoDeployment` 500, `valuableFeedback` 100.\n" #
    "\n" #
    "- `getMyCreditSummary()` — the caller's balance, lifetime earned, founding member number, founding date, badge and referral code. Anonymous callers get a zeroed summary with no member number.\n" #
    "- `getMyContributionHistory()` — the caller's credit ledger entries, oldest first.\n" #
    "- `getMyReferralCode()` — the caller's personal referral code (`\"FC-\"` prefix), or an empty string when the caller is not yet a founding member. Calling it again returns the same code.\n" #
    "\n" #
    "### Automatic awards\n" #
    "\n" #
    "Most rewards are awarded automatically by the qualifying backend action itself, for a signed-in (non-anonymous) caller, exactly once per account and reward type:\n" #
    "\n" #
    "- `recordConsumerRegistration()` awards `earlyConsumerRegistration` to a signed-in caller. Anonymous visitors still increment the funnel counter but earn nothing.\n" #
    "- `recordPurchase(input)` awards `firstSimulatedPurchase` when a signed-in consumer's simulated purchase is saved. A repeat purchase awards nothing more for that reward type.\n" #
    "- `createBusiness(input)` awards both `foundingBusinessRegistration` and `daoDeployment` to the signed-in owner when the business DAO is deployed. Deploying a business DAO earns both without any separate claim step.\n" #
    "- `nominateBusiness(input)` awards `businessNomination` to a signed-in caller, once per account.\n" #
    "- `attributeConsumerReferral(referrerCode)` awards `consumerReferral` to the referrer when the referred account is a different signed-in account; `attributeBusinessReferral(referrerCode)` awards `businessReferral` under the same rule. Self-referrals and duplicate attributions are rejected as described below.\n" #
    "\n" #
    "### Claim endpoints (idempotent)\n" #
    "\n" #
    "- `claimEarlyConsumerRegistration()`, `claimFoundingBusinessRegistration()`, `claimFirstSimulatedPurchase()`, `claimBusinessNomination()`, `claimDaoDeployment()`, `claimValuableFeedback()` — award the caller the corresponding reward. Each requires a signed-in (non-anonymous) caller; anonymous callers get `#err(#notAuthorized)`. Each reward is awarded **once per caller per subject**, so a claim after an automatic award returns the existing ledger entry (`#ok`) without adding credits, and a repeat claim is likewise idempotent.\n" #
    "- `attributeConsumerReferral(referrerCode)`, `attributeBusinessReferral(referrerCode)` — attribute the caller to the referrer that owns `referrerCode` and award the referrer the referral reward. Requires a signed-in caller (`#err(#notAuthorized)` for anonymous). An unknown code returns `#err(#notFound)`; a self-referral returns `#err(#selfReferral)`; a caller already attributed to any referrer returns `#err(#duplicate)`.\n" #
    "- `getRewardAmounts()` — public read of the current configurable reward amounts.\n" #
    "- `setRewardAmounts(amounts)` — admin only; replaces every reward amount. Non-admins get `#err(#notAuthorized)`.\n" #
    "- `listFoundingMembers()` — admin only; founding members ordered by member number. Non-admins get an empty list.\n" #
    "- `listCreditLedger()` — admin only; the full auditable credit ledger ordered by entry id. Non-admins get an empty list.\n" #
    "\n" #
    "## Simulated QR commerce\n" #
    "\n" #
    "Commerce is a **simulated** QR checkout demonstration with architectural preparation for future providers. No real payment is taken, no card is entered, no wallet is connected and no token moves. Revenue (subtotal), round-up contribution and platform fee are always reported as separate figures. The platform fee is 2.5% (250 basis points) of the subtotal.\n" #
    "\n" #
    "- `listCatalogue(businessId)` — public; the active products and services of a business.\n" #
    "- `getCatalogueItem(itemId)` — public; one catalogue item, or `null`.\n" #
    "- `buildCart(businessId, lines)` — public; validates lines against the catalogue and returns the cart with its computed subtotal. Returns `#err(#invalidInput(...))` for an empty cart, a zero quantity, an unknown item, an item from another business, or an inactive item.\n" #
    "- `checkout(cart, roundUpContribution, clientRef)` — records a simulated paid transaction for the caller. Requires a signed-in caller (`#err(#notAuthorized)` for anonymous) and a non-empty `clientRef` (`#err(#invalidInput(...))`). Re-validates the cart and returns `#ok` with the transaction, its `receiptToken` and its dynamic `transactionRef` (used for the transaction QR code).\n" #
    "- `getReceipt(receiptToken)` — public; the digital receipt for a token, or `null`.\n" #
    "- `getTransaction(transactionId)` — public; one transaction, or `null`.\n" #
    "- `listMyTransactions()` — the caller's transactions (empty for anonymous).\n" #
    "- `refundTransaction(transactionId)`, `cancelTransaction(transactionId)` — the transaction's consumer only (`#err(#notAuthorized)` otherwise); `#err(#notFound)` for an unknown id; `#err(#invalidInput(...))` when the status transition is not allowed (refund only from `#paid`; cancel from `#pending` or `#paid`). The receipt status is updated to match.\n" #
    "- `listReconciliation(businessId)` — business owner only; per-transaction reconciliation rows. Non-owners get an empty list.\n" #
    "- `listPaymentProviders()` — public; the active provider descriptors. Only the `#simulated` provider is active; `#conventional` and `#blockchain` are reserved for future integrations.\n" #
    "\n" #
    "## Retry safety\n" #
    "\n" #
    "`recordPurchase` is idempotent per `(caller, clientRef)`: retrying with the same `clientRef` returns the original purchase without recording a duplicate. `recordDemoPurchase` persists nothing, so it is safe to retry. Counter methods (`recordVisit`, `recordDemoPurchaseCounter`, `recordConsumerRegistration`, `recordBusinessRegistration`, `recordDaoDeployment`) are **not** idempotent: each call increments its counter, so retry only when a call is known to have failed. `createBusiness` is not idempotent — a retry with the same slug returns `#err(#slugTaken)` rather than creating a second business. A rejected `createBusiness` (including one above the fundraising ceiling) persists nothing, so it is safe to correct the input and retry.\n" #
    "\n" #
    "`checkout` is idempotent per `clientRef`: retrying with the same `clientRef` returns the original transaction, receipt token and transaction reference without recording a second transaction. Automatic credit awards and credit claims are idempotent per `(caller, rewardType, subject)`: a repeat qualifying action, a repeat claim, or a claim after an automatic award returns the original entry and adds no credits. `attributeConsumerReferral` / `attributeBusinessReferral` are not idempotent across different referrers — a caller can be attributed only once, so a second attribution returns `#err(#duplicate)`. `refundTransaction` / `cancelTransaction` are not idempotent: a second call on an already-refunded or already-cancelled transaction returns `#err(#invalidInput(...))`.\n" #
    "\n" #
    "## Data querying\n" #
    "\n" #
    "`schema()` and `execute(qJson)` expose queryable data through OQL. Business, nomination, proposal and founding-member rows are public. Purchase and simulated-transaction rows are scoped to the calling consumer, and credit-ledger rows are scoped to the calling account, so a signed-in caller reads only its own rows while the platform controller reads all. Founding-interest, stakeholder and ownership-ledger rows are controller-only."
  };
};
