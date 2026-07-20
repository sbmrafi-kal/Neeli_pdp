# Neeli PDP — Prototype comparison and responsive adaptation plan

## 1. Decision to make

Compare:

- **Prototype A — Hybrid / belief builder:** `/Users/sripathhariharan/Documents/claude/projects/neeli redesign/neeli_pdp_prototype.html`
- **Prototype B — Current reconstruction:** `/Users/sripathhariharan/Documents/Neeli PDP reconstruction`

The output is not simply a winner. It is a defensible recommendation for a **single responsive final prototype**, including:

1. A weighted score for both prototypes.
2. A breakpoint-by-breakpoint score.
3. A component adoption matrix: **keep A / keep B / adapt / rebuild / reject**.
4. A final responsive blueprint.
5. A prioritized implementation and validation backlog.

The final prototype will use the current React workspace as the integration surface because it is modular and testable. Shopify remains the delivery target; the final structure and behaviors must be portable to Liquid sections, blocks, snippets, CSS custom properties, and progressive JavaScript. Prototype markup is not the Shopify implementation.

## 2. Product frame and locked constraints

The primary evaluation persona is a **cold, first-time, skeptical shopper**. A naturally inclined repeat or warm shopper is the secondary persona. The page must help both, but the primary persona receives the greater weight because it has the harder persuasion job.

The following are release gates rather than optional scorecard points:

- No return or guarantee claims.
- No fabricated reviews, UGC, proof, claims, counts, or certifications.
- Reviews remain an honest scaffold until the review platform is connected.
- Label and ingredient-panel imagery, heritage imagery, and the logo must use approved real source material.
- A single purchase-action color is used consistently.
- Product data remains consistent: ₹338 selling price, ₹375 MRP, 10% off, 200 ml.
- Copy follows the approved Kerala Ayurveda voice.
- The result must be operable with keyboard and assistive technology.
- The purchase path must work at 320 px without overlap or horizontal overflow.
- The design must be portable to Shopify Liquid and progressively enhanced.

Any violation of these gates prevents wholesale adoption even if the numerical score is high.

## 3. Skills and their roles

The comparison uses the currently available project skills as distinct lenses:

| Skill | Role in the comparison |
|---|---|
| `critique` | Visual hierarchy, information architecture, cognitive load, emotional journey, Nielsen heuristics, persona walkthroughs, and anti-generic-design review |
| `audit` | Accessibility, performance, tokens/theming, responsive defects, code-level anti-patterns, and P0–P3 severity |
| `adapt` | Mobile, tablet, laptop, and desktop as distinct usage contexts; touch, pointer, content priority, and layout reflow |
| `design-taste-frontend` | Composition, type, spacing, action-color discipline, state completeness, motion safety, anti-card-overuse, and AI-tell checks |
| `customer-research` | Jobs-to-be-done, trigger, objection, alternative, desired-outcome, and confidence checks for the scan → shortlist → deselect → decide journey |
| `ai-seo` | Search/AI extractability, answer blocks, product information clarity, image context, and entity consistency |
| `high-end-visual-design` | Selective art-direction review for focal point, crop, image rhythm, and premium visual quality; its decorative defaults do not override the project’s restrained design rules |
| Browser QA | Reproducible screenshots, interaction probes, keyboard paths, viewport checks, DOM measurements, and network evidence |
| `animate` | Used after the structural decision, to audit motion purpose, feedback, reduced-motion behavior, and performance |
| `clarify` | Used only where labels, FAQ copy, trust language, or feedback states are materially unclear |
| `polish` | Final consistency pass after all P0–P2 issues are closed |

The Markdown catalogs mention `page-cro`, `seo-audit`, `schema-markup`, and other skills that are not exposed in the current session. They will not be treated as callable. CRO is covered through the project’s conversion requirements, the `critique` lens, and the `customer-research` decision model. Traditional SEO and schema readiness are checked directly using current search-engine documentation; `ai-seo` adds extractability rather than replacing technical SEO.

## 4. Fair-test setup

### 4.1 Freeze the contenders

- Record source paths, timestamps, Git status/commit where available, build commands, and asset manifests.
- Build Prototype B with `npm run build`.
- Serve both prototypes over localhost on separate ports.
- Test production output rather than comparing a development build with a static artifact.
- Re-run the existing evidence pack against the current source so stale screenshots or metrics cannot decide the result.

### 4.2 Common viewport matrix

| Context | Viewport | Why it matters |
|---|---:|---|
| Small phone | 320 × 740 | Overflow, sticky collisions, minimum viable layout |
| Primary phone | 390 × 844 | Main mobile design and touch behavior |
| Tablet portrait | 768 × 1024 | Reflow between single- and multi-column layouts |
| Small laptop / tablet landscape | 1024 × 768 | Hero breakpoint, sticky stacking, content density |
| Desktop | 1440 × 1000 | Editorial composition, scan efficiency, whitespace |

Additional checks:

- 200% text zoom at 390 px and 1440 px.
- Keyboard-only path.
- `prefers-reduced-motion`.
- Touch and pointer behavior.
- Slow-network and CPU-throttled mobile run.
- Long content, state changes, and open accordion/drawer cases.

### 4.3 Common task script

Each prototype is evaluated with the same tasks:

1. Identify the product promise, price, size, and delivery terms.
2. Understand why the formula may work without already believing in Ayurveda.
3. Inspect the gallery and product-label information.
4. Find expected results and the usage ritual.
5. Find ingredients, comparisons, proof/reviews, and FAQs.
6. Change quantity and add the product.
7. Verify adding, success, sticky purchase, cart/drawer, and escape/close states.
8. Complete the same path with keyboard only.
9. Repeat the critical purchase path at 320 px and with 200% text zoom.
10. Complete a five-second visual scan, then state: what the product is, who it is for, the main outcome, the strongest reason to believe, the price, and the next action.
11. Inspect the page image-by-image and identify which visuals attract, qualify, explain, reassure, help reject a poor fit, or help make the purchase decision.
12. Read the page without interaction and verify that search engines and non-visual users can extract the same canonical product facts, formula, use, price, and availability.

Time-to-find, interaction failures, overlap, focus behavior, and confusion points are recorded for every task.

## 5. Scoring model

Each criterion is scored from **0 to 5**:

- **0 — Blocking:** unusable, absent, deceptive, or fundamentally broken.
- **1 — Severe:** frequent failure or major trust/accessibility problem.
- **2 — Weak:** works partially but creates meaningful friction.
- **3 — Competent:** usable and credible, with identifiable gaps.
- **4 — Strong:** clear, polished, and resilient with minor issues.
- **5 — Excellent:** unusually effective, complete, and release-ready.

Weighted score:

`criterion result = (raw score ÷ 5) × criterion weight`

| Criterion | Weight | What is judged |
|---|---:|---|
| Persuasion and belief-building | 15 | Promise, objection handling, evidence sequence, cold-skeptic confidence |
| Purchase and conversion UX | 14 | Price clarity, CTA timing, quantity, sticky purchase, feedback, cart continuity |
| Information architecture and scan-to-decision wayfinding | 9 | Section order, anchor navigation, progressive disclosure, time-to-find, cognitive load, shortlist and deselection support |
| Image and visual merchandising effectiveness | 10 | Image job, focal point, product accuracy, sequence, crop, information gain, fit/deselect cues, trust and redundancy |
| Responsive adaptation | 14 | 320–1440 behavior, mobile ordering, tablet decisions, touch targets, sticky math, zoom resilience |
| Accessibility and interaction robustness | 10 | Semantics, landmarks, focus, keyboard, ARIA/state announcements, contrast, error prevention |
| Visual craft and brand expression | 7 | Hierarchy, typography, composition, action-color discipline, originality and premium restraint |
| SEO and search extractability | 7 | Indexability readiness, canonical product facts, metadata, headings, structured-data readiness, image discoverability and answer extraction |
| Performance and Core Web Vitals readiness | 5 | LCP strategy, image delivery, CLS, JavaScript cost, animation cost, lazy loading |
| Shopify portability and maintainability | 5 | Section/block model, reusable components, tokens, progressive enhancement, content manageability |
| Motion and system feedback | 4 | Purpose, timing, state continuity, reduced motion, transform/opacity safety |
| **Total** | **100** | |

Scores are produced at mobile and desktop separately, then rolled up:

- Mobile: **55%**
- Tablet/small laptop: **15%**
- Desktop: **30%**

The primary report shows both the roll-up and the raw breakpoint scores so a desktop strength cannot conceal a mobile failure.

## 6. Severity and release gates

Every issue receives a severity:

- **P0 — Blocking:** prevents purchase, hides essential content, creates deceptive proof, or breaks a locked constraint.
- **P1 — Major:** WCAG AA failure, major responsive defect, serious trust issue, or frequent task failure.
- **P2 — Minor:** clear friction with a workaround.
- **P3 — Polish:** craft improvement with limited user impact.

A prototype cannot be recommended as the base without adaptation when it has:

- Any unresolved P0.
- A purchase-path P1 at 320 or 390 px.
- Fabricated or ambiguous proof.
- Keyboard-inaccessible core controls.
- Horizontal overflow or sticky overlap in the purchase path.
- Product, price, availability, claims, reviews, or imagery metadata that conflicts between visible content and structured/search-facing content.
- No credible route to the Shopify performance and architecture gates.

The numerical score ranks quality; the gates determine whether adoption is safe.

## 7. Evidence to collect

### Objective evidence

- Full-page and sectional screenshots at every viewport.
- DOM metrics: headings, landmarks, controls, image alt/dimensions, forms, details, overflow, page height, first purchase-action position.
- Interaction probes for gallery, anchor nav, accordions, quantity, add, success, sticky purchase, and drawer.
- Network transfer, request count, lazy loading, LCP candidate, CLS risks, image and font strategy.
- Automated code scan with false positives manually verified.
- Contrast, focus visibility, target size, reduced motion, and keyboard results.

### Expert evidence

Two deliberately separated review passes:

1. **Design-director pass:** hierarchy, persuasion, emotion, brand, composition, copy, and anti-generic-design review.
2. **Technical pass:** accessibility, performance, responsive implementation, state integrity, and maintainability.

The passes are reconciled only after both are complete. Existing evidence in `comparison_evidence/` is a starting point, not the final verdict.

### Persona evidence

- **Cold first-time skeptic:** needs mechanism, realistic expectations, credible proof, and easy objection navigation before purchase.
- **Warm Ayurveda shopper:** wants product truth, ingredients, use, price, delivery, and a fast purchase path.
- **Keyboard / low-vision shopper:** needs semantic structure, zoom resilience, focus visibility, and announced state changes.
- **Mobile shopper on a constrained connection:** needs an early understandable promise, low chrome competition, efficient imagery, and persistent but non-obstructive purchase access.

These are documented evaluation modes, not invented research personas. Findings based only on expert judgment will be labelled as hypotheses; shopper claims require existing customer evidence or later user validation.

## 8. CRO and shopper-decision checks

The conversion review follows the shopper’s actual decision sequence rather than treating conversion as CTA prominence alone.

### 8.1 Scan

Within five seconds and without scrolling, test whether the shopper can identify:

- Product category and format.
- Primary hair concern and intended outcome.
- Product size and selling price.
- One credible reason to continue.
- The primary action and the option to keep researching.

Record the expert-predicted scan order, competing visual elements, number of visible choices, and whether the dominant image supports or distracts from the product decision. Do not present predicted attention as eye-tracking evidence.

### 8.2 Shortlist

Test whether the page quickly answers:

- Is this relevant to my hair concern?
- What is different about it?
- How does it fit my current oiling or hair-care routine?
- How long might it take?
- What evidence is available, and what is still only a claim?
- What are the trade-offs versus another treatment or doing nothing?

The shopper should not need to remember information across distant sections. Price, size, key fit, and the main objection answer must remain easy to recover.

### 8.3 Deselect

A good PDP helps the wrong buyer opt out confidently. Check whether it exposes, without alarmism:

- Oil texture, color, scent, application amount, wash expectations, and routine commitment.
- Expected timeline and limits of the claim.
- Full ingredients and relevant usage cautions.
- Product-condition guidance such as coconut-oil solidification.
- Answers for greying, pregnancy, daily use, and minoxidil where approved.
- The absence of a guarantee or return promise.

Score down any prototype that suppresses fit-limiting information to keep the shopper moving toward the CTA. Honest deselection protects trust, customer satisfaction, and conversion quality.

### 8.4 Decide and act

Verify:

- Price, MRP, discount, quantity, size, delivery, COD, availability, and tax information agree everywhere.
- The CTA appears at an appropriate belief point without interrupting research.
- Sticky and in-flow actions never overlap or compete.
- Adding, success, error, retry, cart count, quantity, and drawer states preserve price and product context.
- Reassurance is factual and adjacent to the decision.
- The shopper can return to unresolved questions without losing purchase state.

### 8.5 CRO measurements

Collect for both prototypes:

- Time to identify product, outcome, price, and action.
- Time and scroll distance to first purchase opportunity.
- Time to find ingredients, expected results, comparison, review status, and FAQ.
- Number of competing actions at each decision point; flag more than four.
- Number of interrupted, hidden, intercepted, or repeated purchase actions.
- Content depth and page length relative to information gain.
- Decision-supporting versus decorative image ratio.
- Mobile purchase completion rate in scripted tests.
- Analytics-readiness map for product view, gallery engagement, section navigation, quantity change, add attempt, add success/failure, cart open, and FAQ/review engagement.

## 9. Image-by-image visual merchandising audit

Every image receives its own row in the final evidence pack.

| Field | Check |
|---|---|
| Asset and location | Unique ID, section, source file, viewport, and sequence position |
| Shopper job | Attract / qualify / explain / reassure / help deselect / help decide |
| Question answered | The exact shopper question the image resolves |
| Information gain | What it adds that nearby text and previous images do not |
| Product truth | Bottle, label, oil color, anatomy, ingredients, heritage, and claim accuracy |
| Fit and deselect signal | What makes the product feel relevant, or tells a shopper it may not suit them |
| Visual scan | Focal point, hierarchy, contrast, crop, background competition, and thumbnail legibility |
| Responsive art direction | Mobile and desktop crops, subject preservation, safe text-free areas, and orientation |
| Sequence and redundancy | Whether it advances the story or repeats an earlier image |
| Accessibility and search | Useful alt text, nearby context, filename, `<img>`/`picture` discoverability, dimensions, and decorative-image handling |
| Performance | Format, responsive variants, preload/lazy strategy, transfer size, and CLS risk |
| Decision | Keep / recrop / reorder / replace / remove |

Each image is scored independently:

| Image criterion | Weight |
|---|---:|
| Shopper-job clarity | 20 |
| Unique information gain | 15 |
| Product truth and trust integrity | 25 |
| Focal point, composition, and scan quality | 15 |
| Responsive crop and art direction | 10 |
| Accessibility and search context | 8 |
| Delivery performance and CLS safety | 7 |
| **Total** | **100** |

Decision rule:

- **80–100:** keep, provided no truth or locked-constraint gate fails.
- **65–79:** recrop, reorder, or revise with a specific improvement hypothesis.
- **Below 65:** replace or remove.
- **Automatic reject:** inaccurate label/product, simulated customer or documentary proof, unsupported baked claim/certification, misleading before/after implication, or unusable mobile crop.

### 9.1 Visual-forward scan

Run these checks at 320, 390, 768, 1024, and 1440 px:

- **Five-second scan:** can a shopper reconstruct the product story from the opening visual hierarchy?
- **Squint/thumbnail test:** do the focal product, human action, and ingredient/texture cues remain legible at small scale?
- **First-two-viewports test:** do visuals establish product recognition, relevance, one reason to believe, and a clear path to price/action?
- **No-copy test:** without reading body copy, does the image order still communicate product → use → mechanism/formula → transparency → realistic expectation?
- **Grayscale hierarchy test:** does composition still lead the eye when color is removed?
- **Mobile crop test:** are the bottle, label, hand action, hair/scalp area, and material cues preserved without awkward clipping?
- **Redundancy test:** if an image is removed, is any unique decision information lost? If not, remove or repurpose it.

### 9.2 Image role sequence

The target sequence is not a fixed gallery formula, but every final set should collectively cover:

1. **Recognize:** accurate pack and product format.
2. **Relate:** intended user, concern, or real use context.
3. **Understand:** oil texture, application, formula, or mechanism.
4. **Verify:** label, ingredients, approved heritage, and factual proof.
5. **Set expectations:** realistic timeline, routine, and limitations.
6. **Decide:** the final visual supports confidence near the purchase action without embedding unsupported claims.

No essential claim or certification may exist only inside an image. Generated images cannot simulate documentary proof, customer evidence, or regulatory certification.

## 10. SEO and search-readiness audit

SEO is evaluated as a separate criterion, not assumed to follow from good UX.

### 10.1 Technical and on-page checks

- Crawlable canonical product URL, self-referencing canonical, indexability, and sitemap readiness.
- Unique title and meta description aligned with the visible product name and positioning.
- One clear H1, logical H2/H3 structure, semantic landmarks, and useful internal links.
- Canonical product facts—name, brand, price, MRP, currency, size, availability, SKU/variant, description—agree across visible HTML, cart state, metadata, and Shopify data.
- Important product content exists in server-rendered Liquid/HTML rather than being available only after client interaction.
- Product imagery uses standard `<img>` or `<picture>` markup with a fallback `src`, descriptive filenames where feasible, contextual alt text, and relevant nearby copy.
- Preferred social/search image is accurate, representative, high resolution, free of baked promotional text, and set consistently in page metadata.
- Mobile performance and Core Web Vitals do not undermine crawl or shopper experience.

### 10.2 Structured-data readiness

- Plan `Product` plus `Offer`/merchant-listing data for name, image, description, brand, SKU, price, INR currency, URL, item condition, and live availability.
- Add breadcrumb and organization data at the theme/site level where appropriate.
- Structured price, availability, and product facts must be sourced from the same Shopify product data as the visible page.
- Do **not** emit `Review` or `AggregateRating` until real, displayed review data is connected and eligible.
- Do **not** add a return-policy claim to the PDP merely to fill a structured-data field; organization-level policy data must reflect the actual store policy.
- Validate the final Liquid output using the current rich-results and Search Console merchant-listing requirements.

### 10.3 Search and AI extractability

- Direct, self-contained answer blocks for product purpose, how to use, expected timeline, ingredients, and common objections.
- Natural-language FAQ headings matching real shopper questions.
- Balanced comparison content that is useful without unsupported superiority claims.
- Specific factual statements with traceable sources; no vague “ancient” or “clinically proven” language without evidence.
- Text remains human-first and brand-consistent; no keyword stuffing or repetitive search copy.

Current implementation references:

- [Google Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Google merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
- [Google image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)
- [Google ecommerce URL structure guidance](https://developers.google.com/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites)

## 11. Motion and animation audit

Motion is scored as a functional system, not as the quantity of animation.

For every animated element, record:

| Field | Check |
|---|---|
| Purpose | Feedback / orientation / relationship / attention / continuity / delight |
| Trigger | Load / scroll / hover / focus / press / swipe / state change |
| State pair | Exact from-state and to-state |
| Timing | Enter, exit, delay, hold, and interruption behavior |
| Technique | Transform/opacity preferred; layout/paint cost documented |
| Input parity | Touch, pointer, and keyboard behavior |
| Reduced motion | Equivalent non-motion state that preserves meaning |
| Performance | FPS/jank, main-thread work, blur/filter cost, and concurrent sticky motion |
| Decision | Keep / simplify / replace / remove |

Required checks:

- One restrained signature moment at most; no animation layer competes with product comprehension.
- Press, adding, success, error, gallery, accordion, anchor-nav, sticky-bar, and drawer transitions are complete.
- Exit is faster than entry; feedback is immediate and never blocks the next action.
- Gallery swipe and scrollspy remain understandable with reduced motion.
- Hover effects are gated to hover-capable pointers; touch receives visible press feedback.
- Only transform and opacity are used for continuous motion unless a documented exception is required.
- `prefers-reduced-motion` removes transforms, parallax, stagger, blur, and smooth scrolling while preserving comprehension cues.
- Motion remains smooth on throttled mobile hardware and does not cause layout shift or sticky-control collisions.

## 12. Component adoption matrix

The final report will judge each element independently:

| Area | A score | B score | Decision | Required adaptation | Responsive rule | Evidence |
|---|---:|---:|---|---|---|---|
| Global header | | | | | | |
| Hero/gallery | | | | | | |
| Product decision panel | | | | | | |
| Purchase dock / sticky bar | | | | | | |
| Anchor navigation | | | | | | |
| Persuasion sequence | | | | | | |
| Results timeline | | | | | | |
| Formula/ingredients | | | | | | |
| Comparison content | | | | | | |
| Reviews scaffold | | | | | | |
| Ritual | | | | | | |
| FAQ | | | | | | |
| Heritage proof | | | | | | |
| Cart/drawer feedback | | | | | | |
| Footer and end state | | | | | | |
| Full image sequence / asset set | | | | | | |
| Metadata / structured-data readiness | | | | | | |
| Tokens/type/motion system | | | | | | |

Decision definitions:

- **Keep A / Keep B:** adopt the pattern with only token and content normalization.
- **Adapt:** preserve the idea but redesign its responsive behavior, hierarchy, or states.
- **Rebuild:** the user need is correct but neither implementation is safe or complete.
- **Reject:** the element conflicts with product, trust, accessibility, or performance requirements.

## 13. Preliminary synthesis to validate

The existing evidence suggests a **hybrid final prototype** is the likely result:

### Likely to take from Prototype A

- The cold-skeptic belief-building sequence.
- Honest expected-results framing and deeper objection handling.
- Anchor-based wayfinding, after mobile and sticky-offset repair.
- Broader ingredient, comparison, ritual, and FAQ coverage.
- The established Shopify Liquid handoff architecture and content scaffold.

### Likely to take from Prototype B

- The modular React integration surface.
- The persistent purchase dock and clearer state continuity.
- Bag drawer behavior and Escape-to-close interaction.
- Responsive image variants and lazy loading.
- Skip link, stronger landmark structure, image sizing, meta description, and zero-overflow behavior.
- The restrained “modern natural efficacy” visual direction, editorial desktop split, and reduced reliance on card grids.
- The mobile-specific content order and six-frame product-story interaction where testing confirms it helps rather than delays purchase.

### Likely to rebuild

- A single gallery combining A's content breadth with B's responsive delivery and accessible carousel behavior.
- A purchase system combining B's persistent price/state continuity with A's earlier in-flow opportunity, without overlapping fixed controls.
- A mobile anchor nav that auto-centers the active item, respects measured sticky heights, and never consumes excessive viewport space.
- Reviews as a visibly honest scaffold with no fabricated customer content.
- A unified token, typography, spacing, and motion system suitable for both the React prototype and later Liquid implementation.

This is a hypothesis, not the final recommendation. It becomes binding only after the fresh scorecard and release-gate review.

## 14. Final responsive blueprint

After scoring, the selected elements will be specified at four levels:

1. **Content order:** what appears first for each context.
2. **Layout behavior:** grid, stacking, container, sticky, and overflow rules.
3. **Interaction behavior:** focus, touch, pointer, swipe, open/close, adding, success, and error states.
4. **Delivery behavior:** responsive images, lazy loading, progressive enhancement, Liquid portability, and reduced motion.

The blueprint will explicitly define:

- Mobile 320–767.
- Tablet 768–899.
- Desktop 900–1439.
- Wide desktop 1440+ with a maximum content width.
- Content-driven exceptions where a component breaks before a nominal breakpoint.

Mobile is not a scaled desktop. It may reorder content, simplify simultaneous chrome, convert side-by-side modules to progressive disclosure, and move controls into thumb reach while preserving the same information architecture and core functionality.

## 15. Implementation sequence after approval

1. Freeze both builds and refresh evidence.
2. Complete the design-director and technical assessments.
3. Complete the CRO decision-path, image-by-image, SEO, and motion audits.
4. Score both prototypes and publish the component adoption matrix.
5. Approve the final responsive blueprint before code changes.
6. Approve the final image sequence and keep/recrop/reorder/replace/remove decisions.
7. Normalize tokens, typography, spacing, content data, metadata, and search-facing product facts.
8. Build the shared hero, gallery, purchase, and navigation foundation.
9. Integrate the selected lower-page persuasion sections.
10. Complete accessibility, loading, error, adding, success, empty/scaffold, and reduced-motion states.
11. Optimize images, fonts, lazy loading, JavaScript, metadata, and structured-data readiness.
12. Run `animate` only for purposeful state and navigation motion.
13. Re-run `critique` and `audit`; close all P0/P1 and agreed P2 findings.
14. Run the final `polish` pass and package the responsive prototype with a Liquid portability and SEO note.

## 16. Acceptance criteria

The responsive final prototype is ready for approval when:

- All P0 and P1 issues are closed.
- Weighted score is at least **85/100**, with no criterion below **3.5/5**.
- Purchase tasks complete at 320, 390, 768, 1024, and 1440 px.
- No horizontal overflow or sticky-control collision occurs.
- All purchase-path controls are at least 44 × 44 px.
- Keyboard, focus, announcements, contrast, and 200% zoom checks pass.
- Reduced-motion behavior is complete.
- LCP, CLS, and image delivery meet the Liquid handoff budgets.
- Every image has a documented shopper job and keep/recrop/reorder/replace/remove decision.
- The first two mobile viewports communicate product, relevance, one reason to believe, and a clear route to price/action.
- Removing any retained image would remove unique decision information; decorative repetition is eliminated.
- The page helps an unsuitable shopper deselect through truthful routine, timeline, formula, and limitation information.
- Visible content, cart state, metadata, and planned structured data use the same canonical product facts.
- Product/Offer structured data is ready for the final Liquid source; review/rating markup remains absent until real reviews are connected.
- Essential product information is crawlable and does not depend on client-side interaction.
- No fabricated proof, claims, imagery, or review content appears.
- The adoption matrix traces every final element to evidence and a responsive rule.
- The final prototype has a clear component mapping to Shopify Liquid sections, blocks, snippets, and tokens.
