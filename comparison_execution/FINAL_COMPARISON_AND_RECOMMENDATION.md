# Neeli PDP — Final prototype comparison and adaptation recommendation

## Executive verdict

**Recommendation: use Prototype B as the responsive interaction and implementation base, then adapt Prototype A's persuasion, objection-handling, formula, timeline and comparison content into it.**

Do not adopt either prototype wholesale.

- Prototype A is stronger at belief-building, image breadth, objection coverage and Liquid planning.
- Prototype B is stronger at mobile purchase continuity, responsive behavior, accessibility scaffolding, image delivery, visual restraint and motion/state design.
- B leads the weighted comparison by **6.3 points**, but both fail the locked proof-integrity gate.

The choice of B as the base is not a pure visual preference. Responsive behavior, accessible state management and image delivery are more expensive and riskier to retrofit than A's portable content sections.

## Weighted scorecard

Scores use the approved 0–5 rubric, rolled up as 55% mobile, 15% tablet/small laptop and 30% desktop.

| Criterion | Weight | A context roll-up | A weighted | B context roll-up | B weighted | Winner |
|---|---:|---:|---:|---:|---:|---|
| Persuasion and belief-building | 15 | 3.45 | 10.35 | 2.30 | 6.90 | A |
| Purchase and conversion UX | 14 | 2.75 | 7.70 | 4.00 | 11.20 | B |
| IA and scan-to-decision | 9 | 3.30 | 5.94 | 3.00 | 5.40 | A |
| Image and visual merchandising | 10 | 4.00 | 8.00 | 3.30 | 6.60 | A |
| Responsive adaptation | 14 | 2.75 | 7.70 | 4.00 | 11.20 | B |
| Accessibility and interaction robustness | 10 | 2.45 | 4.90 | 3.00 | 6.00 | B |
| Visual craft and brand expression | 7 | 3.45 | 4.83 | 4.00 | 5.60 | B |
| SEO and search extractability | 7 | 1.00 | 1.40 | 2.00 | 2.80 | B |
| Performance and CWV readiness | 5 | 1.30 | 1.30 | 3.00 | 3.00 | B |
| Shopify portability | 5 | 3.00 | 3.00 | 2.00 | 2.00 | A |
| Motion and system feedback | 4 | 2.65 | 2.12 | 3.50 | 2.80 | B |
| **Total** | **100** | | **57.2** | | **63.5** | **B** |

These are current-prototype quality scores, not launch scores. The target for the adapted final prototype remains **85/100 with no criterion below 3.5/5**.

## Release-gate result

### P0 — both prototypes fail proof integrity

Both display:

- 4.7/5.
- 137 reviews.
- 40,000+ buyers.
- A named customer quote.
- “Verified purchase” treatment.

The locked product decision requires an unmistakable review placeholder until real source-backed reviews are connected. Remove all of the above from the final prototype. Do not emit `Review` or `AggregateRating` structured data.

### Additional gate risks

- A has 9px horizontal overflow at 320px.
- An earlier A mobile probe recorded a sticky layer intercepting the hero Add to cart. Fresh 320px and 390px retesting succeeded, so this is an intermittent risk rather than a consistently blocked action.
- B contains categorical efficacy and safety language that requires substantiation and approval.
- A's minoxidil/dependency comparison also requires claims review.
- Neither prototype has canonical metadata or `Product`/`Offer` structured data.
- B's current React shell does not put product facts into initial server-rendered HTML.

## Shopper-decision verdict

### Scan

**B wins mobile.** Product, outcome, primary imagery, price and purchase access are recoverable quickly through its persistent dock. A delays the first in-flow purchase action to 1,065px at 390px and 1,460px at 768px.

**A is stronger on desktop research entry.** Its price, quantity, action, proof prompt and product visual are grouped within the first viewport, although the unsupported proof makes the panel too crowded.

Final adaptation:

- Keep B's mobile product and purchase continuity.
- Place factual price, size, delivery and CTA inside the desktop/tablet decision panel.
- Replace ratings/counts with one approved reason to continue: honest timeline, formula provenance or a transparent review-placeholder label.

### Shortlist

**A wins.** Its timeline, mechanism, comparison, ritual and skeptic FAQ answer more distinct questions with fewer total mobile pixels than B.

Final adaptation:

- Port A's belief arc.
- Remove duplicate imagery and repetitive lower sections.
- Use B's anchor-nav and progressive component structure to make A's depth easier to retrieve.

### Deselect

Neither prototype is ready. A better final PDP must help an unsuitable shopper opt out through approved information about:

- Oil texture, color and scent.
- Application amount and wash expectation.
- Frequency and routine commitment.
- Realistic timeline and claim limits.
- Full ingredients.
- Coconut-oil solidification.
- Coloured hair, greying, pregnancy, daily use and treatment-combination guidance where approved.

Do not use absolute safety or treatment claims to preserve conversion.

### Decide and act

**B wins.** Its fixed dock preserves price and action, and its Add → Adding → cart state works with quantity and drawer continuity. A's multiple purchase surfaces and sticky layers create more collision risk.

Final adaptation:

- Use B's purchase controller and drawer model.
- Bind it to Shopify product/variant/cart data.
- Add error, retry, out-of-stock and disabled states.
- Announce success through `aria-live`.
- Preserve focus inside the drawer and return it to the invoking control.
- Keep one clear in-flow fallback purchase action; never let it overlap the dock.

## Image recommendation

Use **B's responsive gallery interaction and delivery model** with **A's broader decision-supporting image set**, reduced to six non-redundant jobs:

1. Accurate product pack and format.
2. Scalp/application context.
3. Honest oil texture and color.
4. Formula/ingredient system.
5. Readable label and ingredient panel.
6. Realistic ritual/expectation context.

### Keep/adapt

- Accurate pack hero.
- Application/scalp visual.
- Oil texture frame.
- Formula/ingredient frame.
- Real back-label/ingredient panel with zoom and textual equivalent.
- Ritual image focused on hands/scalp.
- Approved slow-cooking/heritage image when it adds procedural information.

### Remove or replace

- All review/testimonial/count “proof” imagery and treatments.
- Healthy-hair result imagery that can be read as efficacy evidence.
- Repeated ingredient/milk images that add no new decision information.
- The Bhringarajasava cross-sell from the core PDP; place it in the post-add cart flow if retained.
- Any generated image used as documentary, regulatory or customer proof.

The full 20-slot decision ledger is in [CRO_IMAGE_AUDIT.md](</Users/sripathhariharan/Documents/Neeli PDP reconstruction/comparison_execution/reports/CRO_IMAGE_AUDIT.md>).

## Component adoption matrix

| Area | Decision | Source | Required adaptation |
|---|---|---|---|
| Header and skip link | Keep/adapt | B | Preserve compact sizing and skip link; use one exposed header landmark. |
| Desktop hero composition | Adapt | B visual shell + A decision density | Editorial split with product, approved promise, price, size, delivery and CTA in first viewport. |
| Mobile opening order | Adapt | B | Product/promise → primary visual → factual fit cue → price/action; no fabricated rating row. |
| Gallery interaction | Keep/adapt | B | Responsive `<picture>`, dimensions, lazy loading, keyboard buttons; add optional touch swipe. |
| Gallery content | Hybrid | A + B | Six decision jobs only; deduplicate lower-page imagery. |
| Purchase dock | Keep/adapt | B | Safe-area spacing, Shopify state, error/retry, announced success and no overlap. |
| Quantity/cart drawer | Keep/adapt | B | Real cart API, focus trap, return focus, loading/error/out-of-stock states. |
| Anchor navigation | Adapt | B interaction + A coverage | Measured sticky offset, auto-centering mobile item, `aria-current`, reduced-motion scroll. |
| Timeline | Adapt | A | Keep honest sequence; use approved hedged copy and B image delivery. |
| Formula/ingredients | Adapt | A content + B editorial layout | Server-render facts, progressive disclosure, no unsupported mechanism claims. |
| Comparison | Adapt cautiously | A | Balanced factual comparison only after medical/legal/claims approval. |
| Ritual | Hybrid | A brevity + B visual treatment | One canonical routine; remove duplication. |
| Deselect information | Rebuild | Both | Consolidated factual fit/limits module plus detailed FAQ. |
| FAQ | Hybrid | A skeptic order + B warm-buyer questions | Clean accessible names, server-rendered answers and approved safety language. |
| Reviews | Reject/rebuild | Neither | Honest inactive scaffold until the review platform is live. |
| Heritage | Adapt | Approved real photography | No generated documentary evidence or unsupported history claims. |
| Cross-sell | Remove from PDP | Neither | Move to cart/post-add context if business-approved. |
| Image delivery | Keep | B | Intrinsic dimensions, fallback `src`, responsive variants, LCP priority and offscreen lazy loading. |
| Metadata/schema | Rebuild | Shopify/Liquid | Canonical, title/description/OG image and `Product` + `Offer` from live product data. |
| Motion system | Keep/simplify | B | One restrained entrance system; state feedback over decoration; reduced-motion parity. |

## Final responsive blueprint

### Mobile: 320–699px

- Single-column composition.
- Compact header and one horizontally scrollable anchor row.
- Primary product image and promise in the opening viewport.
- Fixed purchase dock approximately 72–78px plus safe-area inset.
- Reserve dock space in document flow.
- All controls at least 44×44px.
- Auto-center the active anchor item; include edge-fade affordance.
- Progressive disclosure for ingredients, comparison details and FAQ.
- No simultaneous sticky gallery, nav and purchase layers.
- One question per image; no repeated still-life sections.

### Tablet: 700–899px

- Do not reproduce A's long stacked hero: its 768px first in-flow CTA measured 1,460px.
- Use a compact two-zone hero: primary image/story on one side, product decision summary on the other where content width allows.
- Keep touch targets and purchase dock.
- Move detailed gallery selectors below the primary image if the two-column width becomes cramped.
- Two-column lower modules are allowed only when each column remains comfortably readable.

### Desktop: 900–1439px

- Editorial media/decision split.
- Price, size, delivery, quantity and CTA visible in the decision panel.
- Sticky anchor row begins after the hero and accounts for header height.
- Purchase dock may remain compact, but must not duplicate or visually overpower the in-flow decision panel.
- Use asymmetry and whitespace rather than equal card grids.

### Wide desktop: 1440px+

- Apply a maximum content width.
- Preserve the editorial split without stretching line lengths or images.
- Keep the same information architecture and state model as smaller contexts.

## SEO and Shopify recommendation

The final React prototype is an interaction reference. The Shopify implementation must:

- Render product name, description, price, size, availability, ingredients, FAQ and image links in Liquid/initial HTML.
- Use one Shopify product/variant source for visible facts, cart state, metadata and structured data.
- Add a self-referencing canonical URL.
- Add accurate title, meta description and representative social image.
- Emit `Product` + `Offer`/merchant-listing data using INR price and live availability.
- Keep review/rating fields absent until real displayed reviews are connected.
- Use crawlable `<img>`/`picture` markup with a fallback `src`, intrinsic dimensions and contextual alt text.

## Motion recommendation

Keep B's restrained state model, not its quantity of animation:

- Immediate press feedback.
- Add → Adding → success/cart continuity.
- 200–300ms gallery, accordion and drawer transitions.
- Faster exits than entrances.
- Transform/opacity for continuous motion.
- Hover effects only for hover-capable pointers.
- Reduced-motion behavior removes transforms, stagger, blur, parallax and smooth scrolling while preserving state comprehension.
- At most one quiet signature entrance moment.

## Prioritized adaptation backlog

### P0

1. Remove fabricated ratings, counts, named quotes and verified-purchase treatments from both sources.
2. Replace reviews with the approved honest scaffold.
3. Complete substantiation review for efficacy, safety, pregnancy, dandruff, greying, minoxidil and comparison language.

### P1

1. Establish B as the integration base and remove duplicate proof/claim content.
2. Rebuild the hero so factual price/action appears early on tablet and desktop.
3. Port A's timeline, formula, comparison and skeptic FAQ into B's component system.
4. Fix A-derived content to the approved KAL voice and hedging rules.
5. Implement canonical metadata and Liquid-ready `Product`/`Offer` mapping.
6. Close accessibility gaps: clean FAQ headings, focus management, announcements, contrast and 44px targets.
7. Keep B's responsive image model; remove A's data-URI/unsized delivery model.

### P2

1. Deduplicate the image sequence and implement the six shopper jobs.
2. Add label/back-panel zoom and textual equivalents.
3. Complete pincode/delivery decision logic or remove the documentation promise.
4. Add purchase error, retry, disabled and out-of-stock states.
5. Validate anchor offsets with expanded FAQ and sticky controls.
6. Add swipe only with button parity and no vertical-scroll theft.
7. Run real 200% zoom, reduced-motion, iOS/Android touch and screen-reader checks.
8. Measure Lighthouse/WebPageTest/CWV on the hosted Liquid implementation.

## Confidence

- **High:** use B as the responsive/interaction foundation.
- **High:** port A's deeper persuasion and objection architecture.
- **High:** reject both current review/proof implementations.
- **Medium:** exact section compression and final CTA timing; no real shopper tests or analytics were available.
- **Pending validation:** true 200% zoom, physical-device touch, screen-reader flow, reduced-motion visual behavior and production CWV.

## Supporting reports

- [Objective evidence](</Users/sripathhariharan/Documents/Neeli PDP reconstruction/comparison_execution/evidence/OBJECTIVE_EVIDENCE.md>)
- [CRO and image audit](</Users/sripathhariharan/Documents/Neeli PDP reconstruction/comparison_execution/reports/CRO_IMAGE_AUDIT.md>)
- [Technical and SEO audit](</Users/sripathhariharan/Documents/Neeli PDP reconstruction/comparison_execution/reports/TECHNICAL_SEO_AUDIT.md>)
- [Responsive and motion audit](</Users/sripathhariharan/Documents/Neeli PDP reconstruction/comparison_execution/reports/RESPONSIVE_MOTION_AUDIT.md>)
