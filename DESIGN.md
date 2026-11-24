# Design Brief

## Direction

Founder's Ledger — GLOBAL DAOs' Forest Terminal extended into a gold-threaded founding program: a cinematic dark economy where recognition, receipts and roadmap read like engraved certificates.

## Tone

Luxury/refined fintech with a collector's-edition edge: near-black forest ink, luminous emerald data, and gold reserved strictly for founding recognition — never for money, equity or tokens.

## Differentiation

Founding status is minted, not advertised: a conic gold→violet medallion ring around each member number, a gold ledger rail on every credit entry, and QR plates that stay paper-light so codes scan in any theme.

## Color Palette

| Token      | OKLCH           | Role                                        |
| ---------- | --------------- | ------------------------------------------- |
| background | 0.135 0.018 168 | forest-ink canvas (dark default)            |
| foreground | 0.94 0.012 165  | primary text                                |
| card       | 0.175 0.02 168  | elevated surfaces, dashboard panels         |
| primary    | 0.8 0.17 162    | emerald CTA, earned credits, active state   |
| accent     | 0.78 0.13 200   | cyan checkout / QR activity                 |
| muted      | 0.215 0.02 168  | quiet panels, dividers                      |
| gold       | 0.86 0.14 86    | founding badge, member number, roadmap live |
| violet     | 0.7 0.2 295     | referral credits, roadmap future phases     |
| warning    | 0.83 0.14 84    | simulated-activity disclaimer surface       |

## Typography

- Display: Space Grotesk — hero, dashboard titles, roadmap phase names, tight tracking
- Body: Satoshi — paragraphs, reward labels, forms, nav
- Mono: JetBrains Mono (`font-numeric`) — credit amounts, member numbers, receipt totals, QR payloads
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-xs font-semibold tracking-[0.2em] uppercase`, body `text-base md:text-lg`

## Elevation & Depth

Layered glass: background → card → popover on hairline emerald borders with soft deep shadows; founding panels add `shadow-founding` gold bloom, QR plates use `shadow-qr-plate`, alternating bands use `bg-gradient-subtle`.

## Structural Zones

| Zone     | Background                    | Border     | Notes                                          |
| -------- | ----------------------------- | ---------- | ---------------------------------------------- |
| Header   | `bg-background/80` backdrop   | `border-b` | sticky minimal nav: Shop, Roadmap, gold founding pill |
| Content  | `bg-background` + dot grid    | —          | alternating `bg-muted/30`; dashboards on `bg-card/70` |
| Checkout | `bg-card` sheet, sticky thumb | `border-t` | mobile bottom sheet, cart + QR plate pinned     |
| Footer   | `bg-muted/40`                 | `border-t` | roadmap link + simulated-activity disclaimer   |

## Spacing & Rhythm

Section gaps `py-20 md:py-28`, dashboard grids `gap-4 md:gap-6`, ledger rows dense 12px padding, checkout micro-spacing in 4/8/12px steps; mobile-first single column widening to 12-col at `lg`.

## Component Patterns

- Buttons: `rounded-full`; emerald gradient primary, ghost outline secondary, gold `bg-gradient-founding` for founding actions; hover lifts via `shadow-glow`
- Cards: `rounded-2xl` glass `bg-card/70 border-border shadow-elevated`; founding card `shadow-founding` with gold hairline
- Badges: pill; `bg-gold/12 text-gold` Founding Member, `bg-violet/12 text-violet` Founding Business, `bg-cyan/12 text-cyan` simulated checkout, muted "simulated" tag
- Member medallion: `ring-founding` conic ring around a `font-numeric` number on `bg-card`
- Ledger rows: `ledger-rail-earned|referral|checkout` 2px left rail, amount `font-numeric`, date muted
- QR: `.qr-plate` light paper + dark ink, `rounded-xl`, optional `animate-scan-line` overlay on pending checkout
- Roadmap: vertical phase rail with `phase-fill` progress, Phase 1 emerald "live", future phases violet outline

## Motion

- Entrance: `animate-reveal` / `animate-fade-up` staggered 60–90ms; `credit-pop` when a credit lands; `sheen-sweep` across founding badges once
- Hover: 0.3s `transition-smooth ease-cinematic`, 1–2px lift, border brightens to primary
- Decorative: `badge-shine` slow gold shimmer on founding badges, `scan-line` on pending QR, `phase-fill` on roadmap rail; all disabled under `prefers-reduced-motion`

## Constraints

- Dark default; light + system via `.dark` class toggle, both AA+ contrast
- Mobile-first; checkout sheet designed for thumb reach and 30-second completion
- Token-only colors (`oklch(var(--token))`); no hex, no `hsl()`; financial activity always labeled simulated
- Founding Credits never styled as currency, token or investment: no coin icons, no ticker, no monetary glyphs
- Warning text pairs with a light warning surface in light mode and `dark:text-foreground` on tinted surfaces in dark mode

## Signature Detail

The founding medallion: a conic gold→violet→cyan ring rotating its sheen around an engraved member number — recognition that feels collected, not purchased.
