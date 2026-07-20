# Neeli PDP — Seed reference evaluation and score-lift plan

Reference reviewed: [Seed AM-02 Energy + Focus](https://seed.com/energy-focus)

Review context:

- Desktop viewport: 1440 × 1000.
- Mobile viewport: 390 × 844.
- The page was inspected from hero through reviews, including its sticky states, progressive disclosures, benefit timeline, mechanism content, comparison, testing proof and review tooling.
- This is a pattern audit, not a recommendation to reproduce Seed's brand, subscription model, claims or production budget.

## 1. Executive recommendation

Borrow Seed's **decision choreography**, not its premium aesthetic.

The most valuable pattern is the sequence:

1. Recognize the product.
2. Understand the promise.
3. See the price and action.
4. Open only the detail needed now.
5. Learn what to expect over time.
6. Understand how it works.
7. Compare and deselect.
8. Verify proof.
9. Return to a context-preserving purchase action.

For Neeli, this should remain warmer, simpler and more value-conscious. Product truth, routine fit and ingredient clarity should replace Seed's scientific density and subscription framing.

Recommended target:

- **85/100 remains the minimum implementation gate.**
- **90–93/100 is the realistic design target** after the Seed-inspired adaptations are implemented and audited.
- **94–95/100 is a validation stretch**, requiring real customer reviews, approved claim substantiation, production Core Web Vitals and observed shopper testing.
- A credible 100/100 should not be claimed from a prototype-only heuristic review.

## 2. What Seed does especially well

### 2.1 The hero is a decision surface

On desktop, the large product media and sticky commerce panel divide attention cleanly. On mobile, the product remains visually dominant before the product facts, price and primary action.

Why it works:

- Product recognition precedes explanation.
- One CTA dominates.
- Price and purchase terms remain close to the action.
- The image and decision panel have separate jobs.
- The desktop panel stays available while the shopper examines the gallery.

Neeli adaptation:

- Keep the 60/40 editorial hero already proposed.
- Make the real bottle and label the dominant frame.
- Keep price, size, delivery/COD, quantity and Add to cart together.
- Use one factual research link, not multiple competing secondary actions.
- Do not use subscription selection or a guarantee pattern.

### 2.2 Progressive disclosure lowers opening-page cognitive load

Seed exposes Benefits and collapses Ingredients in the purchase area. The shopper gets the short answer first and can request depth without leaving the decision context.

Why it works:

- The hero remains scannable.
- Detail is available without becoming a wall of copy.
- The open panel signals which information is most useful at that stage.

Neeli adaptation:

- Open “Why it may fit” by default.
- Collapse “Full ingredients and cautions,” while keeping the complete ingredient list one action away.
- Never hide price, size, application amount, routine commitment or important cautions in an accordion.

### 2.3 Every major section has one job

Seed alternates compact commerce content, large belief statements, mechanism education, a timeline, comparison, testing and reviews. Each visual field asks for one kind of attention.

Why it works:

- Strong section contrast creates a readable page rhythm.
- Large statements reset attention between denser modules.
- The shopper can skim by section purpose.
- The page feels editorial without making all content decorative.

Neeli adaptation:

- Retain the editorial recovery-path concept.
- Reserve full-bleed media for two belief moments only: the recovery promise and the ritual/texture moment.
- Compress formula, fit and FAQ content into readable modules.
- Do not match Seed's page length or cinematic frequency.

### 2.4 The timeline sets expectations instead of only making claims

“Benefits that build over time” gives the shopper a mental model for when change might be noticed. Its active step is visually prominent while future steps recede.

Why it works:

- Time becomes an understandable decision variable.
- The shopper can judge commitment and patience.
- Progressive emphasis prevents three equal cards from competing.

Neeli adaptation:

- Use an approved “What to expect from the routine” sequence.
- Separate immediate sensory/routine facts from any longer-term efficacy language.
- Do not state an efficacy date unless it is substantiated.
- On mobile, show one active step with the remaining steps visible enough to communicate sequence.

### 2.5 Mechanism visuals make complexity legible

Seed converts formulation and delivery concepts into layers, ingredient cards and activation curves rather than relying on paragraphs alone.

Why it works:

- A complex promise becomes a visible model.
- Visual hierarchy links each ingredient to a role.
- The illustration supports the copy instead of decorating it.

Neeli adaptation:

- Visualize the two approved recovery goals: reduce breakage/fall pressure and support a healthier growth environment.
- Connect each ingredient group to one role with cautious language.
- Use a simple two-path diagram and real texture/ingredient imagery.
- Avoid biological simulation, pseudo-clinical graphs and unsupported “activation” curves.

### 2.6 Comparison supports decide and deselect behavior

Seed's comparison presents the product against alternative approaches using shopper-relevant attributes. On mobile, the selected product column stays visually anchored while the attributes remain readable.

Why it works:

- It makes trade-offs explicit.
- It helps shoppers reject poor-fit options.
- The highlighted product column preserves orientation.

Neeli adaptation:

- Compare routine types, not named competitors.
- Suggested rows: oil-based routine, lightweight serum and leave-in tonic.
- Suggested attributes: wash-out required, texture, application frequency, scalp feel and ingredient transparency.
- Use neutral language and include where Neeli is not the best fit.
- On mobile, use a horizontally scrollable semantic table with a frozen attribute column or a stacked comparison if the table becomes cramped.

### 2.7 Testing proof is separated from marketing

Seed places its rigorous-testing section after the comparison and before reviews. The page treats proof as its own information layer.

Why it works:

- Claims and verification do not visually blur together.
- Proof arrives when the shopper is ready to challenge the proposition.
- The section can be scanned independently.

Neeli adaptation:

- Create a “What we can verify” block.
- Include only approved facts: label, ingredient list, manufacturing/quality information and usage/caution copy.
- Link each factual claim to its available source in the content ledger.
- Do not substitute badges, stock lab imagery or generated certifications for evidence.

### 2.8 Honest review distribution creates trust

The inspected Seed page showed an overall 3.9 rating, a visible rating distribution, search, topic filters, verified-buyer labels and brand responses. Negative reviews were not visually erased.

Why it works:

- Imperfect feedback feels more credible than an immaculate score.
- Search and topics make review content decision-useful.
- Brand responses demonstrate support behavior.

Neeli adaptation:

- Keep a static, clearly labeled review-platform scaffold until real reviews exist.
- When reviews are connected, expose the full distribution and allow filtering by useful topics such as texture, scent, wash-out and application.
- Do not restore the unsupported 4.7 rating, 137 reviews, buyer count or named quote.

### 2.9 Sticky purchase context is responsive, not merely fixed

Seed uses a sticky commerce panel on desktop and a compact bottom purchase pill on mobile. The mobile control includes product context and an action rather than showing a detached generic CTA.

Why it works:

- The shopper never loses the purchase path.
- The pattern changes form by context.
- The bottom control remains compact enough to preserve content visibility.

Neeli adaptation:

- Desktop: use a sticky decision panel only while the hero media is in view.
- Mobile: introduce the purchase dock after the in-flow CTA leaves the viewport.
- Include thumbnail, short product name, live price and Add/View cart state.
- Reserve document space for the dock and include the safe-area inset.
- Avoid Seed's simultaneous floating header pills if the anchor row is already sticky.

### 2.10 Motion reinforces state and continuity

Observed Seed behavior includes rotating product media, sticky state changes, content fades, a staged mechanism reveal, active timeline emphasis and a persistent purchase control. Its CSS also uses focused transitions rather than one universal motion treatment.

Why it works:

- Movement explains what is active or persistent.
- The purchase action retains continuity across the page.
- The timeline and mechanism use motion to reveal sequence.

Neeli adaptation:

- Keep user-controlled gallery movement.
- Use the approved continuity transition for the active timeline step and anchor indicator.
- Allow one staged two-path mechanism reveal.
- Keep the purchase dock entry/exit tied to hero CTA visibility.
- Use static imagery by default; an optional short texture/application clip should be user-initiated, muted and poster-backed.

## 3. Image-by-image filter for Neeli

Seed's premium macro media is persuasive because it gives the product material presence. Neeli can achieve the decision benefit without Seed's six video assets or high-end 3D production.

| Neeli image job | Seed lesson | Neeli execution | Decision supported |
|---|---|---|---|
| Pack recognition | Make the product physically dominant | Sharp real bottle, readable label, neutral editorial field | “Is this the item I expected?” |
| Application | Show use, not generic lifestyle | Realistic hand/scalp application with accurate quantity | “Can I use this comfortably?” |
| Texture | Macro detail can communicate value | Honest violet-brown oil texture and spread | “Will I dislike the feel?” |
| Formula | Visualize roles, not ingredient decoration | Two-path ingredient-role composition | “Why might this work for me?” |
| Verification | Make proof inspectable | Back label/ingredient panel with zoom | “Can I verify what is in it?” |
| Routine expectation | Show commitment honestly | Warm/apply/massage/wash sequence | “Does this fit my routine?” |

Acceptance rule for every image:

- It answers one shopper question.
- Its crop protects the decision-relevant subject at 320, 390, 768, 1024 and 1440 widths.
- The image remains understandable without motion.
- Essential information is repeated as HTML text.
- It does not imitate results, reviews, certification or documentary evidence.

## 4. Transferability matrix

| Seed pattern | Neeli fit | Priority | Adaptation |
|---|---:|---:|---|
| Sticky desktop commerce panel | High | P0 | Use within hero media range |
| Contextual mobile purchase dock | High | P0 | Keep compact, stateful and safe-area aware |
| Benefits/ingredients disclosure | High | P0 | Open fit summary; collapse full depth |
| One-job section rhythm | High | P0 | Use fewer, more distinct sections |
| Time-to-benefit timeline | Medium-high | P0 | Convert to approved expectation/routine timeline |
| Mechanism visualization | High | P1 | Two recovery paths; no pseudo-science |
| Neutral comparison | High | P1 | Compare routine types and admit poor fit |
| Testing/proof layer | High | P0 | Build from the content-verification ledger |
| Full review tooling | High when data exists | P1 | Scaffold now; connect only real data |
| Rotating hero video | Low | Avoid | Use user-controlled stills or optional short clip |
| Subscription-first pricing | Low | Avoid | Keep one-time purchase clarity |
| Guarantee/risk-free framing | None | Avoid | Conflicts with the locked product policy |
| Cinematic full-bleed media throughout | Low | Avoid | Limit to two belief moments |
| Dense proprietary science language | Low | Avoid | Use plain, approved ingredient-role copy |
| Floating pill header plus bottom CTA | Medium-low | Avoid as a pair | Keep one sticky navigation layer plus purchase dock |

## 5. Specific score-lift package

The estimates below are directional and overlapping; they should not be added mechanically.

| Package | Main criteria affected | Expected contribution above the 85-point hybrid |
|---|---|---:|
| Decision hero + contextual sticky purchase | Purchase, responsive, IA | +1.0 to +1.5 |
| One-job section rhythm + progressive disclosure | IA, persuasion, accessibility | +0.8 to +1.2 |
| Expectation timeline + two-path mechanism | Persuasion, visual craft, motion | +1.0 to +1.5 |
| Product-fit and neutral comparison | Conversion, IA, trust | +0.8 to +1.2 |
| Verification block + honest review system | Persuasion, SEO, trust | +1.0 to +1.5 |
| Six-image decision system + restrained motion | Merchandising, performance, responsive | +0.7 to +1.0 |
| Semantic and production validation pass | Accessibility, SEO, CWV, Shopify | +1.0 to +1.5 |

Combined target after overlap and implementation risk: **90–93/100**.

## 6. Revised execution sequence

### Gate A — Truth before polish

- Remove unsupported social proof.
- Approve product facts, comparison language, cautions and expectation copy.
- Define what evidence can appear in “What we can verify.”

### Gate B — Static decision architecture

- Design the desktop hero decision panel and mobile first-two-viewports.
- Lay out the one-job section rhythm.
- Approve the six-image sequence and crops.
- Validate scan, shortlist, deselect and decide without motion.

### Gate C — Responsive commerce

- Implement sticky desktop decision behavior and contextual mobile dock.
- Implement progressive disclosures and semantic comparison.
- Verify synchronized price, quantity and cart state.

### Gate D — Education and proof

- Implement the approved expectation timeline.
- Implement the two-path mechanism visual.
- Add the verification layer and honest review scaffold.

### Gate E — Motion

- Add only continuity, feedback and staged mechanism motion.
- Keep gallery control with the shopper.
- Validate interruption and reduced motion.

### Gate F — Score and validation

- Re-score at 320, 390, 768, 1024 and 1440.
- Run keyboard, 200% zoom, reduced-motion and touch checks.
- Audit image crops and decision jobs.
- Measure production Lighthouse/WebPageTest/CWV.
- Run five-task shopper testing: identify product, explain fit, find routine, find caution/ingredients and add to cart.

## 7. Final recommendation

Use Seed to sharpen Neeli's **sequence, proof separation, comparison utility and responsive purchase continuity**. Do not use it to make Neeli look more expensive than it is.

The result should feel:

- More decisive than Prototype B.
- More trustworthy and easier to scan than Prototype A.
- More editorial and distinctive than a generic Shopify PDP.
- Simpler, warmer and more attainable than Seed.
- Honest enough to help the wrong shopper deselect before purchase.

