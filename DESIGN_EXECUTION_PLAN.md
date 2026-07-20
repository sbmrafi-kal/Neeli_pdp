# Neelibhringadi Keram PDP — Design Execution Plan

Last updated: 12 July 2026

## 1. Current status

### Completed

- Audited the live Kerala Ayurveda PDP at desktop and mobile breakpoints.
- Read and compared the supplied UI/UX audit with the current live implementation.
- Verified the live website typography:
  - Figtree for body and functional interface copy.
  - Amstir for selected brand/display use.
  - Avenir variants for supporting and action typography.
  - Marcellus appears in limited supporting brand contexts.
- Locked the supplied Kerala Ayurveda palette:
  - Tulsi Green `#39461D`
  - Herb Paste `#5F6C3D`
  - Ksheera White `#EFE6DC`
  - Agni Red `#954721`
  - Mridula Clay `#B5967B`
  - Rasa-Shastra `#CCA54E`
- Tested the live sticky Add to cart flow on desktop and mobile.
- Confirmed current interaction defects:
  - The sticky purchase bar loses price context after adding.
  - Mobile confirmation is effectively invisible.
  - View Cart opens an oversized drawer.
  - The cart drawer incorrectly surfaces a prescription-upload flow for this product.
  - Cookie consent and the purchase bar compete for the same viewport area.
- Restored the test cart to zero after interaction testing.

### Deprecated

The earlier wireframes and visual mockups are not approved design references. They may be used only as records of explored structure. Their visual language must not be carried into the React prototype.

## 2. Product and audience definition

### Primary audience

Modern Indian Millennial and Gen X customers who are naturally inclined but may be neutral, unfamiliar, or sceptical toward Ayurveda.

### Desired perception

- Modern and credible.
- Naturally effective without looking rustic or traditionalist.
- Specific and transparent rather than mystical.
- Premium through restraint, proportion, imagery, and interaction quality.
- Familiar enough to shop confidently, distinctive enough to remember.

### Emotional sequence

1. **Recognition:** “This addresses my actual hair-recovery concern.”
2. **Comprehension:** “I understand how it supports both hair fall and growth.”
3. **Confidence:** “The formula, expected timeline, price, and routine are clear.”
4. **Control:** “I can buy or keep researching without losing my place.”
5. **Reassurance:** “The brand has depth, but I am not being asked to adopt a belief system.”

## 3. Non-negotiable constraints

- Preserve the positioning: **“One oil for complete hair recovery.”**
- Preserve approved product messaging unless a copy change is explicitly approved.
- Ayurveda is product provenance and formulation context, not the primary visual aesthetic.
- Use the supplied palette and the current Kerala Ayurveda font families.
- No inline Add to cart button inside page content.
- Retain a compact sticky header and a persistent responsive purchase dock.
- Desktop and mobile may use different information order and layout.
- No generic AI placeholder names, reviews, metrics, avatars, icons, imagery, or filler copy.
- No equal-card feature grids, ornamental Ayurveda motifs, generic bento layouts, excessive pills, glass panels, random gradients, decorative glows, or “premium” template effects.
- No imagery or copy redesign is considered final until separately approved.

## 4. Canonical commerce data

This is the single display rule for every component and state:

- MRP: **₹375**, struck through.
- Selling price: **₹338**.
- Discount label: **10% off**.
- Size: **200 ml**.
- Tax: Inclusive of all taxes.
- Delivery: Free delivery on this product.

The exact reduction is ₹37, or 9.87%, which is displayed as 10% off after rounding. Components must never independently calculate or hardcode conflicting price text.

Recommended visual order:

`₹338`  ~~`₹375`~~  `10% off`

The selling price leads; the MRP is secondary but legible; the discount is a compact supporting label.

## 5. Selected skill stack

The design process will not rely on a single “make it premium” skill. Each capability has a specific responsibility.

### A. `frontend-design` — concept and distinctiveness

Use to establish one memorable, context-specific design idea before writing code. It will answer:

- What is the one visual idea unique to complete hair recovery?
- What makes the experience recognisably Kerala Ayurveda without looking old-school?
- Which composition and imagery system cannot be mistaken for a generic wellness template?

### B. `ui-ux-pro-max` — product UX and accessibility rules

Use its local databases for ecommerce/product-page patterns, Indian mobile behaviour, responsive layout, accessibility, touch targets, image performance, navigation, and feedback states.

### C. `design-taste-frontend` — implementation guardrails

Use for measurable anti-slop constraints:

- Grid and spacing discipline.
- Anti-card-overuse checks.
- Responsive collapse rules.
- Complete loading, success, error, and disabled states.
- GPU-safe transforms and opacity animations.
- Verification of every dependency before import.

The skill’s decorative defaults such as perpetual animation, liquid glass, bento layouts, and magnetic effects are not automatically applicable. Product context overrides them.

### D. `emil-design-eng` — motion and interaction craft

Use for:

- Purpose-first animation decisions.
- Interruptible transitions.
- Correct enter/exit asymmetry.
- Press feedback and state morphing.
- Drawer, carousel, accordion, and tooltip behaviour.
- Slow-motion and frame-by-frame motion QA.

### E. `animate` — motion coverage audit

Use after the static visual system is approved to identify the minimum useful motion layer across navigation, feedback, state changes, and one signature moment.

### F. `critique` / `design-review` — independent anti-AI review

Use after each high-fidelity milestone to test visual hierarchy, cognitive load, emotional fit, accessibility, AI-slop patterns, and responsive behaviour. A mockup cannot approve itself.

### Skills intentionally not used as the primary design generator

`high-end-visual-design` will not drive the design because its default double-bezel, floating-glass, large-radius, and cinematic patterns can produce the exact generic AI aesthetic being avoided. Its performance guardrails may still be consulted selectively.

## 6. Design principles

### Principle 1: Modern natural efficacy

The page should look like an excellent contemporary personal-care product experience that happens to be rooted in Ayurveda—not a digitised Ayurvedic brochure.

### Principle 2: One memorable visual device

The page needs a single proprietary visual language derived from “complete recovery.” Candidate exploration:

- Two complementary tracks—fall reduction and growth support—that converge into one recovery system.
- A continuous recovery line that moves from scalp, through formula, into timeline and ritual.
- Paired macro imagery showing scalp condition and product texture rather than decorative botanicals.

Only one direction will be selected. These are hypotheses, not mockup instructions.

### Principle 3: Product truth before brand mythology

Order of persuasion:

1. Concern and promise.
2. Product and formula.
3. Price and delivery.
4. Expected sequence.
5. Routine.
6. Reviews.
7. Ayurveda and heritage credentials.

### Principle 4: Open composition, not a card collection

- Use whitespace, rules, typographic alignment, and surface changes to group content.
- Cards are reserved for information that benefits from containment: timeline stages, verified reviews, delivery state, and cart state.
- Avoid repeated rounded boxes around every idea.

### Principle 5: Indian, not stereotypically “Indian”

- Contemporary Indian casting, homes, grooming routines, climate, hair textures, and practical details.
- No temple motifs, manuscript textures, mandalas, brass-prop clichés, sepia grading, or generic “ancient wisdom” imagery.
- Local relevance comes through people, routine, weather, language clarity, pricing, COD, and delivery confidence.

## 7. Imagery plan — no generic placeholders

Before high-fidelity design, create and approve an asset register. Every image slot must have a defined purpose, source, crop, alt text, and responsive variant.

### Required image families

1. **Pack portrait**
   - Accurate bottle, label, cap, and scale.
   - Clean high-key lighting.
   - No competing text baked into the image.

2. **Texture and amount**
   - Oil colour, viscosity, pour, and 5–10 ml amount cue.
   - Macro, tactile, not decorative.

3. **Scalp-first application**
   - Realistic Indian hair and scalp context.
   - Fingertip application and massage, not salon glamour.

4. **Two-win recovery visual**
   - A clear visual distinction between reducing fall and supporting growth.
   - Must avoid unsubstantiated before/after or clinical imagery.

5. **Formula system**
   - Key ingredients and triple-milk base expressed as a system.
   - Avoid ingredient bowls arranged like an Ayurvedic still life.

6. **Ritual**
   - Contemporary home routine.
   - Warm-water method, scalp-first use, massage, and wash timing.

7. **Pack facts**
   - Back label, ingredients, external-use note, coconut solidification guidance.

### Asset policy

- Reuse authentic public product assets only when accurate and visually suitable.
- Commission, photograph, or generate new imagery from a written shot brief.
- Generated imagery must be reviewed for bottle/label accuracy, anatomy, hair texture, cultural authenticity, and claim implications.
- No Picsum, Unsplash, anonymous avatars, stock “wellness woman,” or decorative placeholder gradients.
- Do not bake essential copy into images.

## 8. Information architecture

### Desktop

1. Compact sticky global header.
2. Hero: media gallery and product decision information, without inline Add to cart.
3. Persistent purchase dock.
4. Sticky section navigation.
5. Complete recovery: fall reduction + growth support.
6. Expected results sequence.
7. Formula: key ingredients, triple-milk system, full formula disclosure.
8. One definitive ritual.
9. Reviews with concern, duration, and verified-purchase metadata.
10. Clean FAQs.
11. Compact heritage proof.
12. Footer with purchase-dock clearance.

### Mobile

1. Compact sticky header; announcement content scrolls away.
2. Product name and positioning before media.
3. Mobile-specific gallery.
4. Benefits, price, discount, size, delivery, and COD.
5. Persistent bottom purchase dock.
6. Horizontal section navigation.
7. Results, formula, ritual, reviews, FAQs, and heritage in a shorter modular sequence.
8. Purchase dock yields to cookie consent and stops before the footer.

## 9. Sticky purchase dock specification

### Ready state

- Selling price: `₹338`.
- MRP: `₹375`, struck through.
- Discount: `10% off`.
- Size: `200 ml`.
- Primary action: `Add to cart`.

### Press state

- Immediate `scale(0.98)` press feedback for 120–160 ms.
- No bounce, ripple, magnetic cursor effect, or decorative particle animation.

### Adding state

- Disable repeated submission.
- Crossfade/blur label from `Add to cart` to `Adding` in 160–200 ms.
- Use a restrained progress indicator inside the action area.
- Price remains visible.

### Success state

- Show `Added` with a check for approximately 600–800 ms.
- Update the global cart count.
- Announce success through an ARIA live region.
- Do not automatically open the cart drawer.

### Cart state

- Morph into quantity controls plus `View bag`.
- Keep price context visible: `View bag · ₹338`.
- Quantity controls use 44 px minimum touch targets.
- Removing the last item returns the dock to Ready without a page reload.

### Cart drawer

- Opens only after explicit `View bag` or global cart activation.
- Desktop: right-side drawer sized to content, not 680 px by default.
- Mobile: full-width sheet with clear close/back behaviour.
- No prescription flow for Neelibhringadi Keram.
- Enter approximately 220–260 ms; exit approximately 160–200 ms.
- Use transform and opacity only; focus is trapped and restored correctly.

## 10. Motion plan

Motion intensity target: **3/10**. The page should feel responsive, not animated.

### One signature moment

The recovery system may use one restrained scroll-linked or step-linked visual showing the two benefit tracks converging. This must explain the product’s positioning, not decorate the page.

### Functional microinteractions

- Sticky header condenses once, using transform/opacity rather than height animation.
- Gallery uses native-feeling swipe momentum and scroll snap.
- Active gallery and section indicators move using transforms.
- Add to cart uses the state sequence defined above.
- Accordion icon rotates 90° and content reveals without jarring layout jumps.
- Cart drawer preserves spatial origin and supports interruption.
- Hover styles are limited to pointer-capable devices.
- `prefers-reduced-motion` removes position movement while preserving useful opacity/state changes.

### Explicitly excluded

- Parallax for decoration.
- Infinite floating, shimmer, pulse, marquee, or typewriter effects.
- Animation on every section entrance.
- Magnetic buttons.
- Scroll hijacking.
- Cursor effects.
- Large blur transitions.
- Motion that delays access to information or purchase controls.

## 11. Execution phases and approval gates

### Gate 0 — Approve this plan

No further design work begins until the approach, skill stack, pricing rule, and phase gates are accepted.

### Phase 1 — Evidence and reference audit

Deliverables:

- Audience and job-to-be-done summary.
- 6–10 reference examples from contemporary personal care, beauty, and high-trust ecommerce.
- Annotated explanation of what is relevant and what must not be copied.
- Anti-reference board showing the patterns that create “AI webpage” appearance.
- Local `ui-ux-pro-max` searches for ecommerce, product detail, responsive navigation, accessibility, and motion guidance.

Approval question: Is the intended visual and experiential territory correct?

### Phase 2 — Content model and decision journey

Deliverables:

- Final content inventory.
- Duplication-removal map.
- Desktop/mobile decision sequence.
- Commerce state model.
- Claims and terminology checklist.
- Required versus optional content at each breakpoint.

Approval question: Is the page saying the right things in the right order?

### Phase 3 — Asset direction and shot list

Deliverables:

- Exact seven-slide gallery plan.
- Image briefs, crops, subjects, backgrounds, lighting, and responsive variants.
- Pack accuracy checklist.
- Alt-text draft.
- One sample pack portrait and one application/texture treatment.

Approval question: Does the imagery feel modern, specific, culturally credible, and ownable?

### Phase 4 — Low-fidelity interaction prototype

Deliverables:

- Grayscale desktop and mobile layouts.
- Sticky header and purchase-dock behaviour.
- Gallery, anchor navigation, delivery lookup, quantity, drawer, accordion, and footer-stopping behaviour.
- No decorative styling.

Approval question: Does the UX work before visual styling is applied?

### Phase 5 — Visual system

Deliverables:

- Type scale and typography rules.
- Colour roles and accessible pairs.
- Spacing, grid, rules, radii, icons, image shapes, and surface system.
- One finished hero and one below-fold section.
- AI-slop critique before presentation.

Approval question: Is the design distinctive, modern, and recognisably Kerala Ayurveda?

### Phase 6 — Full-page high-fidelity design

Deliverables:

- Desktop and mobile full-page designs.
- Loading, success, error, empty, disabled, focus, hover, and reduced-motion states.
- Motion storyboard for all functional interactions.
- Independent critique/design review and revisions.

Approval question: Is the complete design ready to build?

### Phase 7 — Standalone React prototype

Implementation begins only after Phase 6 approval.

Deliverables:

- React + TypeScript + Vite application.
- Structured local product data.
- Responsive components.
- Real local assets; no remote placeholders.
- Functional gallery, section navigation, delivery lookup simulation, sticky purchase dock, quantity, cart drawer, reviews, and FAQs.
- Accessibility and reduced-motion support.

### Phase 8 — QA and handoff

- Test widths: 360, 390, 402, 430, 768, 1024, 1366, and 1440 px.
- Keyboard and screen-reader-oriented DOM review.
- Contrast, focus, touch-target, overlay, and safe-area checks.
- Image loading, dimensions, lazy-loading, and layout-shift checks.
- Interaction testing under slow network and repeated rapid input.
- Anti-AI visual critique at desktop and mobile.
- Final approval before considering the prototype complete.

## 12. Anti-AI review checklist

Every design milestone must answer “no” to the following:

- Does it look like a generic wellness landing-page template?
- Is the page mainly a collection of rounded cards?
- Are there equal three-column feature grids?
- Is typography trying to create quality through oversized headings alone?
- Are gradients, glass, grain, glows, or shadows compensating for weak composition?
- Are pills used for non-interactive decorative labels?
- Are there invented statistics, names, reviews, or testimonials?
- Does every section repeat a heading, paragraph, cards, and CTA pattern?
- Could the logo be swapped for another wellness brand without redesigning the page?
- Is the Indian context reduced to traditional props or Ayurveda clichés?
- Is motion decorative rather than explanatory or responsive?
- Does the mobile layout merely stack the desktop layout?

## 13. Success criteria

- Promise, price, MRP, 10% discount, size, delivery, and purchase action are always clear.
- A new customer understands the two-part recovery proposition without reading a long paragraph.
- The page is useful to Ayurveda-agnostic customers and credible to naturally inclined customers.
- Mobile does not sacrifice more than necessary to persistent chrome.
- The purchase dock never obscures content, cookie consent, or footer actions.
- Every piece of imagery answers a purchase question.
- Every animation has a stated functional or explanatory purpose.
- No essential content exists only inside an image.
- The final result cannot plausibly be described as a generic AI-generated PDP.

## 14. Resume checklist

If work stops because of a usage limit, restart from this section.

1. Read this entire plan.
2. Check the current phase and approval state below.
3. Inspect the workspace before changing files.
4. Reconfirm canonical pricing: `₹338`, struck-through `₹375`, `10% off`, `200 ml`.
5. Reconfirm that the previous visual mockups are deprecated.
6. Do not skip an approval gate.
7. Record new completed work and the next exact action in this file before ending.

### Approval state

- Gate 0 — Plan: **Approved by user instruction to finish (12 July 2026)**
- Phase 1 — Evidence and reference audit: Complete; see `DESIGN_DECISIONS.md`
- Phase 2 — Content model and decision journey: Complete
- Phase 3 — Asset direction and shot list: Complete for prototype; authentic product imagery retained, fabricated lifestyle imagery excluded
- Phase 4 — Low-fidelity interaction prototype: Complete in responsive implementation
- Phase 5 — Visual system: Complete
- Phase 6 — Full-page high-fidelity design: Complete in code
- Phase 7 — React prototype: Complete
- Phase 8 — QA and handoff: Complete; TypeScript and Vite production build pass
- Post-QA mobile purchase-dock correction: Complete; ready and quantity/View Cart states now share one 78px row at 320px and 390px

### Next exact action

Prototype is ready locally. Run `npm run dev` from the workspace to review at desktop and mobile widths. Future production integration should replace the deterministic prototype delivery/checkout actions with Shopify APIs and complete device/browser regression testing against the production theme.
