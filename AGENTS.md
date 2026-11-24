# Project Guidance

## User Preferences

- Premium dark mode by default, with light and system appearance options
- Vibrant emerald, cyan, violet and gold accents
- Cinematic transitions and smooth, lightweight animations
- Minimal navigation
- Mobile-first responsive design with checkout prioritized
- Reduced-motion accessibility
- All financial activity must remain simulated
- Visitors should understand Consumerism Staking within 10 seconds
- A simulated purchase should be completable within 30 seconds
- A business DAO workspace should be creatable within 60 seconds excluding required approvals
- Disclaimer text must stay high-contrast and legible in both dark and light appearance
- Round Up to Own is the flagship consumer experience and Launch Your Business DAO is the flagship business experience
- Simulated purchases must be completable without signing in; Internet Identity is required only to save a portfolio or deploy a persistent business DAO
- Consumer-funded round-ups are the default model; business-funded rewards, matching and profit participation stay optional and off by default
- Purchase revenue, investment contributions, ownership dilution and hypothetical portfolio value must be shown as clearly separate figures
- Fictional businesses must be visibly distinguished from real registered businesses
- Founding Credits must never be presented as money, equity, a token or an investment
- Premium dark mode by default with light and system options
- Vibrant emerald, cyan, violet and gold accents with minimal navigation
- Mobile-first layouts with checkout prioritized
- Reduced-motion support
- All financial activity stays clearly simulated
- Founding Credits are never presented as money, equity, a token or an investment
- Fictional businesses stay visibly distinct from registered ones

## Accepted Requirements

- Cinematic landing page with three primary CTAs
- One-click business DAO launcher wizard with cinematic reveal
- Voluntary round-up contribution checkout with configurable options
- Optional business incentive models, off by default
- Public simulated shopping demo with six fictional businesses and accelerated projections
- Internet Identity consumer ownership dashboard
- Isolated per-business administration dashboard with ledger and cap table
- Interactive capital-raising simulator
- Public directory with search, filters, and interactive world map
- Cinematic global economy reveal with economic flywheel
- Dark-mode-first design system with light/system options and reduced-motion support
- Founding Business Program with interest registration without DAO deployment
- Consumer early access registration and business nominations
- Shareable business profiles and portfolios, referral links, QR codes, branded share previews
- Owner-only founder analytics with conversion rates
- Fictional vs registered business labeling and simulated-activity disclaimers
- 10-second comprehension, 30-second checkout, 60-second DAO workspace targets
- Simulated purchases completable without authentication
- Internet Identity required only for saving portfolios or deploying persistent business DAOs
- Consumer-funded round-ups as the default model
- Backend enforcement of ownership pool and fundraising limits
- Downloadable customer onboarding QR codes
- Functional Founding Credits program with configurable reward amounts and an auditable backend credit ledger
- Founding member recognition: badges, balance, lifetime earned, contribution history, founding member number, referral link and QR code, membership date
- Founding Credits dashboard inside existing consumer portfolio and business admin accounts
- Simulated QR checkout demonstrations with architectural preparation for future QR commerce
- Public roadmap page with five phases
- Credit distribution and referral metrics in founder analytics
- Preserve all existing functionality
- No real payments, investments, tokens or securities enabled

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- Backend commands from src/backend/: mops install, mops check --fix, mops build; root: pnpm bindgen. Frontend commands from src/frontend/: pnpm typecheck, pnpm fix, pnpm build.
- validateLimits in src/backend/lib/business.mo is shared by create and update; the fundraising ceiling is 1_000_000_000 cents and above it returns #err(#invalidInput).
- The consumer library takes a requireRegistered flag so the anonymous demo path resolves fictional business ids; DemoPage sends a stable non-zero per-slug business id and useRecordDemoPurchase calls recordDemoPurchaseCounter after success.
- Registered businesses store city/country but no coordinates; DirectoryPage maps country to a centroid so they plot on the world map.
- The /directory route declares validateSearch, so every Link to it must pass search={(prev) => prev}.
- The autonomous tester's financial-control policy blocks clicking a Pay control, so a simulated checkout cannot be completed in local preflight; verify the confirmation and counter through source review instead.
- PortfolioPage branches on the ?share= search param before RequireSignIn and renders a public read-only snapshot via usePublicPortfolio, so shared portfolio links never hit the sign-in prompt; an unknown token maps to a not-found state with links back into the app.
- getPublicPortfolio returns PublicPortfolio with businessName per position, so the public portfolio view needs no separate business lookup; null means unknown token.
- A disabled React Query's isLoading is false before the actor exists, so a public route can briefly flash its not-found branch before the snapshot resolves.
- Business admin ownership gate must read only useMyBusinesses/principal; stats-dependent sections branch locally so a null stats query never hides the credits tab.
- Fictional demo storefronts map products to synthetic CatalogueItem ids via src/frontend/src/lib/demoCatalogue.ts and complete checkout through recordDemoPurchase; the receipt token is the shop-<slug>-<stamp> clientRef.
- The /shop/$slug route has no validateSearch, so item deep links read ?item=<id> via window.location.search in an effect.
- Biome rejects role=status on a <p>; live status regions use <output>.
- Motoko: 'label' is a reserved keyword, so record fields use displayName; two mixins in one actor cannot share helper names.
- AccessControl.getUserRole traps for unregistered non-anonymous callers, so business-scoped gating uses BusinessLib.isOwner.
- Backend state is plain let actor fields mirrored in the draft's pending migration; applied migrations are frozen read-only.
- PortfolioPage renders FoundingCreditsPanel for every signed-in member before the holdings branch, so a no-holdings visitor still sees a populated credits dashboard.
- EarlyAccessPage registration onSuccess navigates to /portfolio; the success card also links there so the path survives an interrupted redirect.
- Demo receipts persist nothing, so the exact DigitalReceipt is cached in a module Map keyed by token; reload falls back to a catalogue-derived receipt.
- Demo platform fee is 2.5% of subtotal (250 bps) to match commerce.mo computePlatformFee.
- demoBusinessId(slug) in lib/demoCatalogue.ts gives the storefront and receipt one stable per-slug business id; CheckoutPage must send it instead of 0n.
- The demo receipt token shop-<slug>-<stamp> is parsed by a greedy regex, so hyphenated slugs still split correctly at the last hyphen.
- DemoPage defines its own demoBusinessId mirroring lib/demoCatalogue.ts and backend demoIdForSlug; all three must stay in sync for a saved demo purchase to resolve.
- The consumer hooks throw the raw ConsumerError variant object, so DemoPage's isConsumerError check is what routes it to describeBackendError instead of the generic fallback.
- recordPurchase resolves a business via resolveBusiness: registered ids pass, unknown ids pass only when isDemoBusinessId matches a demo slug hash, else #notFound; demoBusiness carries DEMO_OWNERSHIP_POOL/DEMO_FUNDRAISING_TARGET so a saved demo purchase never trips pool or target limits.
