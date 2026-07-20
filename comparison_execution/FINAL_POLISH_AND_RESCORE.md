# Neeli PDP — final polish, audit and re-score

Date: 19 July 2026

## Outcome

The adapted prototype now clears the 85/100 implementation gate and reaches a **93.4/100 heuristic prototype score**.

This is a credible A− prototype, not a claim of launch readiness or a perfect score. The remaining gap is primarily live commerce data, production SEO rendering, real-device validation and observed shopper evidence.

Revision: the product owner confirmed that the displayed review data, testimonial, medical/product claims and result timeline are verified. Those elements have therefore been restored. Their source records should travel with the Shopify content ledger.

## What changed in the final pass

- Added an explicit “choose it if / think twice if” product-fit section with texture, time, frequency and external-use facts.
- Added a neutral oil-versus-serum-versus-tonic routine comparison, including a clear statement of when Neeli is not the best fit.
- Added a two-path formula visual that separates fall-pressure support from growth-environment support without adding new claims.
- Turned the back-pack image into a keyboard-accessible, scrollable label magnifier with native-dialog focus handling.
- Replaced the always-present purchase treatment with an in-flow hero purchase block and a contextual dock that only appears after that block leaves view.
- Added direction-aware gallery transitions with reduced-motion parity.
- Restored the verified 4.7 rating, 137-review count, 40,000+ buyer count, named quote and verified-purchase treatment.
- Restored the verified first-application, week 5–8 and month 3+ results sequence, with individual-results qualification.
- Restored the verified preparation, pregnancy, dandruff, greying, daily-use and biological-mechanism language.
- Restored the verified ingredient roles and formula explanation.
- Reduced scroll-reveal motion to the results and formula learning moments.
- Preserved one user-initiated product-presence clip and one short texture clip; all motion remains poster-backed and reduced-motion aware.
- Reduced add-to-cart feedback latency from 650 ms to 360 ms.
- Added font-display behavior, balanced headings and improved mobile body copy sizing.
- Added accurate page and Open Graph descriptions without inventing a canonical URL. Aggregate-rating schema should be generated from the same verified live review source during the Shopify port.

## Final weighted scorecard

The same 0–5 rubric and weights from the prototype comparison are used.

| Criterion | Weight | Final score | Weighted points | Evidence and remaining constraint |
|---|---:|---:|---:|---|
| Persuasion and belief-building | 15 | 4.9 | 14.70 | Verified review proof, expectation, formula, ritual, explicit fit guidance and neutral routine comparison. |
| Purchase and conversion UX | 14 | 4.8 | 13.44 | In-flow purchase context, contextual dock, verified confidence signals, rapid feedback and cart continuity; live delivery, availability and failure states require Shopify data. |
| IA and scan-to-decision | 9 | 4.9 | 8.82 | Clear overview → expectation → formula → routine → fit → comparison → verification sequence. |
| Image and visual merchandising | 10 | 4.9 | 9.80 | Six distinct shopper jobs, protected product label, responsive sources and inspectable pack image. |
| Responsive adaptation | 14 | 4.75 | 13.30 | Mobile-first hierarchy, tablet split, wide max-width, safe-area contextual dock and horizontally inspectable comparison behavior. |
| Accessibility and interaction robustness | 10 | 4.6 | 9.20 | Semantic comparison table, native dialog, labelled scroll region, 44 px targets, live feedback, focus return and reduced-motion parity; screen-reader/device lab remains. |
| Visual craft and brand expression | 7 | 4.9 | 6.86 | Distinctive editorial composition, two-path mechanism, coherent warm palette and restrained use of surfaces. |
| SEO and search extractability | 7 | 3.7 | 5.18 | Accurate metadata and semantic content; canonical, server-rendered facts and live Product/Offer data belong in Shopify. |
| Performance and CWV readiness | 5 | 4.4 | 4.40 | 194 KB LCP poster, responsive WebP assets, lazy offscreen images, deferred video creation and 70.5 KB gzip JS; production CWV is unmeasured. |
| Shopify portability | 5 | 3.7 | 3.70 | Clear component/state mapping, but the current artifact is still a React interaction reference rather than Liquid. |
| Motion and system feedback | 4 | 5.0 | 4.00 | Two purposeful product motions, directional gallery feedback, contextual dock transition and reduced-motion fallback. |
| **Total** | **100** |  | **93.40** | **Rounded final score: 93.4/100** |

## Design review

- Design score: **A−**
- AI-slop score: **A**
- Technical audit health: **18/20 — healthy**

| Technical dimension | Score | Notes |
|---|---:|---|
| Accessibility | 4/4 | Strong semantic and keyboard foundation; production assistive-technology validation remains. |
| Performance | 3/4 | Asset strategy is strong; no hosted Lighthouse/WebPageTest result yet. |
| Theming | 4/4 | Central warm palette, type system and interaction timing variables are coherent. |
| Responsive | 4/4 | Purposeful layouts across mobile, tablet and desktop with no observed desktop overflow. |
| Anti-patterns | 3/4 | No generic SaaS hero or decorative card grid; some inherited three-part fact formatting remains intentionally utilitarian. |

### Landing-page litmus

1. Brand/product unmistakable in the first screen: **Yes**
2. One strong visual anchor: **Yes**
3. Page understandable by scanning headlines only: **Yes**
4. Each section has one job: **Yes**
5. Cards used only where they support an interaction or fact comparison: **Yes**
6. Motion improves material presence, sequence or state: **Yes**
7. Design remains strong without decorative shadows: **Yes**

No hard-rejection pattern remains.

## CRO and decision-flow result

### Scan

The first screen establishes brand, product, approved promise, a truthful research link, price and Add to cart. The bottle and protected label remain the visual anchor.

### Shortlist

The gallery answers six different questions: pack, ingredients, texture, triple-milk base, ritual and expectation. It no longer asks decorative imagery to carry proof.

### Deselect

The dedicated fit section now makes the product’s rich wash-out texture, 30–60 minute commitment and two-to-three-times-weekly routine explicit. The neutral comparison explains when a serum or tonic format may suit better. The FAQ retains the verified guidance for coloured hair, greying, dandruff, pregnancy, frequency and long-term use.

### Decide

The in-flow hero purchase block establishes price, size, use and checkout-delivery context before the first action. Once it leaves view, the contextual dock preserves product, price and state continuity without competing with the hero. Add-to-cart changes to quantity/cart state in 360 ms, and the drawer returns focus to the initiating control when closed.

Largest remaining conversion drain: delivery timing, availability and serviceability are not yet connected to live commerce data.

## Motion and imagery result

- Product-presence clip: user-initiated, 5.0 seconds, desktop WebM selected in the rendered audit.
- Texture clip: the only eligible play-once autoplay, restricted to its active gallery frame and experiment assignment.
- Both clips have static posters and controls.
- Gallery changes use short direction-aware transitions so the shopper retains spatial context.
- Reduced motion removes video activation and scroll-reveal transforms while retaining the same information.
- No lower-page decorative reveal system remains outside the results/formula learning sequence.
- Every gallery image retains HTML text that explains its shopper decision job.

## Verification completed

- Production TypeScript/Vite build: passed.
- Output: 79.5 KB CSS / 15.3 KB gzip; 238.4 KB JS / 72.8 KB gzip.
- Rendered desktop horizontal overflow: 0 px.
- Contextual purchase dock visibility transition: passed.
- Add-to-cart feedback: passed.
- Back-label magnifier, close focus entry and opener focus return: passed.
- Direction-aware gallery transition: passed.
- Media integrity: 11/11 rendered images loaded; no broken or incomplete images.
- Cart drawer focus entry and focus return: passed.
- FAQ expanded state: passed.
- Product motion request/play state and WebM source selection: passed.
- Browser runtime errors: none.
- Fresh visual review: tablet and wide desktop.
- Existing responsive evidence plus final breakpoint-rule review: 320, 390, 768 and 1440 layouts.

The shell-level Chrome capture cannot produce a trustworthy fresh 320/390 CSS viewport because it enforces a wider minimum browser viewport; those widths should receive one final real-device or DevTools-emulated pass before launch. No workaround was used after the browser security policy rejected an indirect emulation surface.

## What keeps this from 94–95

1. Connect the verified reviews to the live platform with rating distribution, topic filters and visible negative feedback.
2. Bind the confirmed review, medical, timeline and mechanism sources to the production content ledger.
3. Connect live availability, delivery/serviceability, error, retry and out-of-stock states.
4. Port the product facts to Shopify Liquid, add the self-referencing canonical and generate Product + Offer + AggregateRating data from the verified live sources.
5. Pass real-device 320/390 checks, 200% zoom, screen-reader, touch and production Lighthouse/WebPageTest/CWV validation.
6. Run the five-task shopper test: identify product, explain fit, find routine, find caution/ingredients and add to cart.

## Recommendation

Use this prototype as the responsive visual and interaction reference for Shopify. Preserve its opening composition, six-image decision gallery, verified expectation sequence, fit/deselect section, routine comparison, two-path mechanism, product FAQ, verified review proof and restrained motion register.

Do not add more cinematic media. The next score lift should come from verified commerce and evidence layers, not more visual spectacle.
