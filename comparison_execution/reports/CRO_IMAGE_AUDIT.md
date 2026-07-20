# CRO and visual-merchandising audit

**Scope.** Prototype A at `:5181/neeli_pdp_prototype.html` versus Prototype B at `:5182/`, evaluated 18 July 2026. This is the CRO/decision-path and image track only; it is not customer research. Conclusions about attention, conversion, and shopper reactions are therefore **hypotheses**, unless marked **observed**. Evidence: live visual inspection at 390/1440, source inspection, and the shared `comparison_evidence` DOM/probe pack.

## Release-gate result

Neither prototype can be adopted wholesale. **Observed:** A and B display a named “verified purchase”, a 4.7/5 rating, 137 reviews, and 40,000+ buyers despite the locked constraint that reviews must remain a visibly honest scaffold until connected to a real review source. Those units are **automatic rejects**. B also renders several absolute efficacy/safety statements (including pregnancy, dandruff, and regrowth-adjacent claims) that need approved substantiation before reuse. A’s minoxidil comparison and “no dependency” claim need the same review.

## Raw scorecard (0–5)

Scores reflect the locked cold first-time skeptic persona; a warm Ayurveda shopper would score B’s fast path slightly higher.

| Criterion | A mobile / tablet / desktop | B mobile / tablet / desktop | Evidence-based reading |
|---|---:|---:|---|
| Persuasion & belief building | 3 / 4 / 4 | 2 / 2 / 3 | A has timeline, mechanism, comparison and skeptic FAQ. B’s clear promise is faster but its six-frame visual story defers the substantive objection path and relies on unsupported proof. |
| Purchase & conversion UX | 2 / 3 / 4 | 4 / 4 / 4 | A first in-flow CTA is 1,065px down on mobile; the evidence pack recorded one overlay interception, while fresh root retesting succeeded at 320/390. B’s dock preserves price/CTA and add → added → drawer feedback works. |
| IA / scan-to-decision | 3 / 3 / 4 | 3 / 3 / 3 | A’s labelled anchors accelerate research but truncate/overflow at 320px and its long path has more recall burden. B’s five-anchor bar is clean, though comparison, detailed objections and full fit disclosure are weak/absent. |
| Image effectiveness | 4 / 4 / 4 | 3 / 3 / 4 | A’s gallery and editorial sequence cover pack, use, ingredients, result expectation and label. B’s responsive assets and six jobs are strong, but several repeat below the gallery and the final pack shot is too small to verify. Both proof/review imagery/text fail integrity. |
| Visual craft & brand expression | 3 / 4 / 4 | 4 / 4 / 4 | A is a credible restrained product page, but the desktop decision panel is crowded with proof/utility claims. B has the clearer editorial split and controlled palette; mobile dock/nav consume substantial persistent height. |

## Shopper decision path

### Scan

**Observed A:** At 390, product, real pack, concern, rating, gallery and “best seller” are visible. Price/action need scrolling below the first viewport; six small gallery thumbnails create several competing choices. At desktop, name, price, quantity, CTA and pack are all directly recoverable.

**Observed B:** At 390, product, outcome, review count, pack, price and CTA are recoverable in the opening screen; the dock keeps the action in thumb reach. At desktop, split hierarchy is excellent, but the dock makes the primary CTA visually distant from its supporting product identity.

**Hypothesis:** B is the more effective five-second mobile scan; A is the more convincing desktop research entry. Final should use B’s early product/price/action continuity with A’s “why continue” answer, without ratings/counts until real data exists.

### Shortlist

**A wins.** Its “two wins”, timeline, ingredients, comparison, ritual and skeptic FAQ answer relevance, alternative and routine questions in a coherent order. **B is competent but shallow:** a visually strong six-frame gallery previews ingredients/texture/milks/ritual/results, then lower sections repeat them; it has no genuine comparison module. **Observed:** B has 27 headings and 9,873px mobile height versus A’s 22/7,980px, yet less distinct objection coverage.

### Deselect

**A wins conceptually:** realistic weeks/months framing, coloured/greying guidance and formula detail disclose commitment. **B has useful physical-fit signals:** external-use, 2–3× weekly ritual, 30–60 minute wash window, solidification and back-of-pack image. Neither is safe as-is: A overstates minoxidil/dependency; B answers pregnancy and dandruff categorically without displayed qualification. Final must keep only approved cautions/limits and visibly state texture, scent, wash expectation, timeline, coloured-hair effect, ingredient list and who should seek professional advice.

### Decide and act

**Observed:** A desktop quantity/add/success/toast work. The evidence pack recorded one mobile sticky-bar interception, while fresh root testing at 320px and 390px succeeded; A still has 9px horizontal overflow at 320px and the earlier collision remains a regression risk. B’s add state, cart quantity, drawer, Escape close and persistent price work across the supplied probes, with zero 320px overflow. B lacks the pincode/delivery check mentioned in its documentation: **P2** missing decision reassurance.

## Image decision ledger

Scores use the plan’s 100-point image rubric. “Proof” assets/claims are judged against the explicit no-fabrication gate, not against visual quality.

| Prototype / slot | Shopper job and unique decision gain | Score | Decision |
|---|---|---:|---|
| A hero: real bottle, amla/coconut | Recognize format, label and natural material context. Strong focal pack at both sizes. | 88 | **Keep**; retain real label and mobile crop. |
| A gallery: woman with hair / application | Relate and show use; adds human/hair context beyond hero. | 78 | **Keep / recrop** for scalp/application visibility at 320. |
| A gallery: ingredient composition | Explain named botanicals; useful only when paired with textual formula. | 74 | **Keep / reorder** after use/texture, not before pack verification. |
| A gallery: milk bowls | Explain special base, but visually similar to ingredient still-life. | 68 | **Reorder** after ingredient image; remove if triple-milk is not approved core proposition. |
| A gallery: isolated pack / back label | Verify product truth and ingredients. | 82 | **Keep**; increase readable zoom/open-label affordance. |
| A timeline: scalp oil / hand / hair images | Set routine and realistic expectation; the strongest visual education sequence. | 80 | **Keep**, but label illustrative images as such and bind each to approved time-language. |
| A ingredient botanical images | Explain individual formula components, but repeated grid treatment increases page length. | 67 | **Keep selectively** (2–4) or consolidate into labelled formula image. |
| A ritual massage image | Demonstrate action and routine. | 80 | **Keep**; crop hands/scalp first on mobile. |
| A comparison / buyer-proof visual and testimonial/stat blocks | Intended to reassure, but product proof is unsupported in the prototype. | 0 | **Automatic reject / remove** until real, displayed source data exists. |
| A add-on Bhringarajasava image | Cross-sell, not required to decide this oil; interrupts the PDP close. | 45 | **Remove** from prototype comparison target. |
| B gallery 01: composite real bottle + product hero | Recognize pack/product; high contrast and responsive crop. Overlayed official pack protects truth. | 86 | **Keep**, but avoid framing it as a recovery claim. |
| B gallery 02: ingredients still life | Explain formula; visually attractive but duplicated by lower formula section. | 72 | **Keep / reorder**; either gallery preview or lower editorial image, not both at equal prominence. |
| B gallery 03: oil spoon texture | Qualify texture/color and help deselect. | 84 | **Keep**; retain honest violet-brown description. |
| B gallery 04: three milk bowls | Explain base and distinguish formula. | 76 | **Keep** if substantiated; otherwise replace with approved ingredient/label detail. |
| B gallery 05: scalp massage | Demonstrate use, though lower ritual duplicates it. | 78 | **Keep / consolidate** with ritual. |
| B gallery 06: woman with bottle / hair | Relate and set results context; not evidence of efficacy. | 70 | **Keep only as lifestyle**; caption must not imply before/after proof. |
| B formula: ingredients + milks + slow-cooking | Mechanism/heritage explanation. Slow-cooking frame adds distinct procedural information. | 82 | **Keep** as a three-part editorial group; remove duplicated gallery frame(s). |
| B results: long healthy-looking hair | Supports expectation but risks implying outcome without evidence. | 60 | **Replace** with neutral routine/texture/label image or clearly illustrative art direction. |
| B pack-information back panel | Verifies facts but is too small to scan/read in the supplied mobile render. | 62 | **Recrop / add zoom**; preserve full-panel asset and adjacent textual facts. |
| B review quote/count / “verified” iconography | Simulated social proof. | 0 | **Automatic reject / remove** pending connected review platform. |

**Visual-forward scan conclusion.** B’s six-frame selector tells the desired product → formula → texture → base → ritual → expectation sequence with superior mobile art direction. A’s content set is more complete for research and deselection. The final set should contain **six non-redundant jobs**: real pack, use/scalp, texture, formula/ingredient, readable label, realistic routine/expectation. A retained image must answer a question no preceding image/text already answers.

## Issues by severity

- **P0 — A and B:** fabricated/unsourced review rating, named review, verified-purchase treatment and buyer count violate a locked release gate. Remove, do not merely visually soften.
- **P1 — A mobile:** 320px has 9px overflow, and an earlier sticky-layer interception was not reproduced in fresh root testing. Rebuild purchase hierarchy/offsets before adoption.
- **P1 — B:** claims and safety answers are categorical where the prototype shows no source/approval; review all efficacy, pregnancy, dandruff, greying and mechanism copy before launch.
- **P2 — B:** pincode/delivery check is absent despite being documented; delivery/COD reassurance is not close enough to decision.
- **P2 — A:** gallery + page contain more image units than unique decision gains; collapse decorative/repeated formula and add-on material.
- **P2 — B:** the lower pack image is not legible enough to perform its verification job; add zoom and textual equivalent.
- **P3 — A:** desktop purchase panel’s quote/trust row competes with price/CTA.
- **P3 — B:** persistent nav + gallery controls + purchase dock constrain mobile reading height; reduce simultaneous chrome after first action.

## Preliminary adoption recommendation

| Element | Recommendation | Responsive rule |
|---|---|---|
| Opening product/gallery | **Adapt B** with A’s real pack/label breadth | 1 primary visual + swipe/selectable story; mobile price/action remains visible without covering content. |
| Persuasion arc, timeline, comparison, FAQ | **Adapt A** | Put honest timeline and routine before deep mechanism; comparison only with approved, non-superiority claims. |
| Formula/texture/ritual imagery | **Hybrid, deduplicated** | One image per shopper question; move detailed visual explanation below first purchase opportunity. |
| Deselect information | **Rebuild from both** | Surface external use, texture, wash, frequency, solidification, coloured-hair effect, full ingredients and approved limits in text plus image context. |
| Purchase dock/cart feedback | **Keep B pattern** | Preserve B’s state continuity, with safe-area offset and an in-flow fallback CTA; no collision at 320px. |
| Reviews/proof | **Reject both implementations** | Use an explicit “reviews will appear here” scaffold until live verified data is available. |

## Evidence notes

- **Observed:** shared evidence pack records A mobile ATC timeout/interception, A 320 overflow (9px), B 320 overflow (0px), working B add/drawer/Escape, and working A desktop purchase flow.
- **Observed:** A: 25 unsized images and all-inlined delivery; B: responsive WebP variants and lazy loading. Those are delivery findings, included here only where they affect image choice.
- **Hypothesis:** no real shopper tests, heatmaps, analytics or validated VOC were supplied. “Scan”, attention, friction and conversion conclusions above are expert review predictions and should be validated with five-second recall and moderated task tests before production.
