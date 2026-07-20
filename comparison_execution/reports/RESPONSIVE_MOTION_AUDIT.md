# Responsive, interaction and motion audit — Neeli PDP

**Scope:** Prototype A (`http://127.0.0.1:5181/neeli_pdp_prototype.html`) versus Prototype B (`http://127.0.0.1:5182/`). Report-only assessment on 2026-07-18. The assessment follows the `adapt`, `animate`, and Browser QA lenses in the comparison plan. The `impeccable` prerequisite referenced by the first two skills is not available in this session; the locked product/frame constraints and plan supplied the required context instead.

## Outcome

**Use Prototype B as the responsive interaction base.** Retain selected information architecture from A only after rebuilding it into B's responsive and accessible system. Root reconciliation found that this track's initial 1200px A measurement came from a viewport override applied to the wrong browser tab; that claim is discarded. Fresh corrected measurements confirm A does reflow, but still has 9px overflow at 320px, an intermittent sticky-layer risk, and a very late in-flow CTA at 768px. B has the materially stronger mobile/tablet model, purchase continuity, gallery state, drawer state, and reduced-motion CSS—but still needs an honest-review repair and a few motion/keyboard validations before final use.

## Evidence and test conditions

- Fresh isolated Chrome tabs, separate A and B URLs; viewport overrides at 320×740, 390×844, 768×1024, 1024×768, and 1440×1000.
- Read-only DOM measurements plus fresh page reloads at every breakpoint.
- Existing objective pack rechecked: `comparison_evidence/evidence.md`, `probe_log.txt`, DOM evidence, and interaction screenshots.
- The browser does not expose reduced-motion emulation in this run. Reduced-motion findings are source/DOM verified, not a full emulated visual test. Touch is assessed from control sizes and interaction design; it is not a physical-device validation.

### Fresh breakpoint measurements

| Prototype | 320 | 390 | 768 | 1024 | 1440 | Finding |
|---|---|---|---|---|---|---|
| A | **9px overflow**; ATC click passed | 0 overflow; first in-flow ATC 1,065px | 0 overflow; first in-flow ATC **1,460px** | 0 overflow; first in-flow ATC 529px | 0 overflow; first in-flow ATC 541px | Reflows, but has a narrow-phone overflow and weak tablet purchase placement. |
| B | 0 overflow | 0 overflow; first in-flow ATC 779px | 0 overflow; first in-flow ATC 960px | 0 overflow; first in-flow ATC 704px | 0 overflow; first in-flow ATC 936px | Consistent reflow; fixed purchase dock preserves action access. |

## Raw scores (0–5)

These are raw criterion scores, not the weighted final comparison score. Mobile is 320/390, tablet is 768/1024, desktop is 1440.

| Criterion | A mobile | A tablet | A desktop | B mobile | B tablet | B desktop |
|---|---:|---:|---:|---:|---:|---:|
| Responsive adaptation | 2.0 | 3.0 | 4.0 | 4.0 | 4.0 | 4.0 |
| Interaction robustness | 2.0 | 2.5 | 3.5 | 4.0 | 4.0 | 4.0 |
| Motion and system feedback | 2.5 | 2.5 | 3.0 | 3.5 | 3.5 | 3.5 |

**Responsive roll-up (55% mobile / 15% tablet / 30% desktop):** A **2.75/5**; B **4.0/5**.

## Interaction and responsive findings

### Prototype A

- **P1 — narrow-phone overflow.** Fresh root measurement confirms 9px horizontal overflow at 320px. This blocks adoption without adaptation even though 390px and larger widths did not overflow.
- **P1 — intermittent purchase-layer risk.** The existing interaction probe recorded a 390px ATC timeout because an overlay intercepted it; force-click succeeded. Fresh root retesting at 320px and 390px clicked successfully and announced `Added to cart`, so the issue is intermittent rather than a consistently blocked control. Simplify and retest the sticky stack before adoption.
- **P2 — touch target inconsistency.** Fresh DOM scan finds 40×40 gallery arrows; review filters are 26px high; addon CTA is 39px high. These miss the plan's 44×44 purchase-path/control benchmark.
- **P2 — desktop-first sticky stack.** Header, gallery, anchor navigation and buy bar coexist. It is useful on desktop but creates too much persistent chrome and needs measured offsets/reflow rules on smaller contexts.
- **P2 — keyboard evidence is incomplete.** Native buttons and links are present, gallery/accordion/anchor interactions were confirmed in the evidence pack, but no focus-trap/announcement evidence exists for ATC/toast. Rebuild state feedback with `aria-live`, visible focus, and a deterministic return-focus rule.
- **P3 — gallery is a conventional thumbnail carousel.** Six explicit thumbnail buttons work on mobile and desktop, but arrows are undersized and no swipe/pointer parity is evidenced.

### Prototype B

- **Strength — genuine responsive differentiation.** B preserves a single information architecture while changing header height, anchor-bar geometry, gallery layout, and fixed dock appropriately through phone/tablet/desktop. No fresh horizontal overflow appeared at any specified width.
- **Strength — complete purchase continuity.** At 390 the bottom dock stays 78px high and the page reserves space; existing probes confirm `Add → Adding → Added`, persistent price/CTA, bag drawer, and Escape close. This is the strongest purchase system.
- **Strength — accessible building blocks.** Skip link, labelled product navigation, labelled six-frame region, FAQ buttons/regions, and dialog semantics are present. The evidence pack confirms drawer Escape behavior.
- **P1 — review trust gate is outside this track but blocks final adoption.** Visible 4.7/137/review quote claims conflict with the locked honest-scaffold requirement. Do not carry this content into the final prototype; it does not reduce B's interaction-system value.
- **P2 — validate keyboard completion, not just Escape.** Confirm focus moves into the bag on open, stays trapped while open, returns to the invoking ATC/view-bag control on close, and that the `Added` label is announced. Existing evidence confirms only drawer Escape and visual label transition.
- **P2 — verify anchor offset with opened states.** Header + anchor bar occupy 104px on phone, 116px at 768, and 120px at desktop. Test each anchor after gallery, FAQ expansion, and dock presence to ensure target headings are not hidden underneath.
- **P2 — confirm touch gesture parity.** Gallery selectors/arrows work, but no swipe test was recorded. Keep buttons as the non-gesture route; add swipe only if it does not steal vertical scroll.
- **P3 — long mobile page.** B is 9,845–9,872px at phone widths. The fixed dock protects purchase continuity, but check whether gallery/story navigation and the anchor bar reduce, rather than add, decision friction.

## Motion register and recommendation

| System element | A observed behavior | B observed behavior | Decision for final | Required rule |
|---|---|---|---|---|
| Initial/section reveal | IntersectionObserver adds `.in`; disabled by A's `matchMedia` branch | Story/gallery and header reveal animation | **Simplify (B)** | One restrained entry system only; never delay product/price/CTA comprehension. |
| Gallery frame change | Thumbnail/arrow state, no documented transition | `gallery-reveal` ~260ms with responsive art direction | **Keep B, simplify if needed** | Transform/opacity only; controls remain operable mid-transition; buttons remain primary parity path. |
| Add to cart | 2s `Added` label and toast; fixed-bar overlap compromises trigger | `Add → Adding → Added` crossfade, drawer continuation | **Keep B, rebuild announcement** | Immediate state response; `aria-live` confirmation; no 2s lockout; restore CTA deterministically. |
| Purchase dock | Fixed bar | Fixed 78px dock with reserved content space | **Keep B** | Reserve safe-area + dock height at every breakpoint; never cover in-flow CTA or focused controls. |
| Drawer | None | Dialog/drawer; Escape verified | **Keep B** | 200–300ms opacity/transform enter, faster exit; focus trap/return focus; reduced-motion instant equivalent. |
| FAQ/ingredient disclosure | A accordion works; transition/state not evidenced | FAQ button/region; ingredient disclosure | **Adapt B** | Use native button + `aria-expanded`; 200–300ms only if height change remains stable; reduced motion removes transition. |
| Anchor navigation/scrollspy | Works in evidence; sticky collision risk | Sticky anchor bar | **Adapt B** | Respect measured sticky offsets; reduced motion disables smooth scroll; active state must not rely on animation. |
| Hover/press feedback | Not evidenced | CSS includes short transform/color transitions | **Keep B, constrain** | Gate hover to `(hover: hover)`; supply visible `:active` and focus; no hover-only meaning. |
| Reduced motion | JS detects `prefers-reduced-motion`, reveals final state | CSS explicitly removes selected animations/transitions; section CSS includes reduced-motion scroll behavior | **Keep B, complete audit** | Test emulated reduce; remove reveal, smooth scroll, transform/stagger/blur while preserving state and labels. |
| Decorative/sigature motion | No clear signature moment | Motion-reveal header plus gallery animation | **Remove decorative excess** | At most one quiet signature moment. Product comprehension outranks animation. |

## Component adoption recommendations

| Area | Decision | Responsive/interaction requirement |
|---|---|---|
| Header and skip link | **Keep B** | Preserve skip link and mobile header sizing; ensure focus-visible state and no hidden target under sticky bars. |
| Hero/gallery | **Adapt B with A content** | Use B's responsive image variants/six-frame structure; bring only approved A label/back-pack content; retain 44px controls and button-based navigation. |
| Product decision panel | **Rebuild hybrid** | B's dock/state continuity plus A's earlier in-flow price/quantity; one purchase action must never be covered by another. |
| Purchase dock | **Keep B** | 78px baseline is viable; reserve bottom spacing including safe area; rerun 320 and text-zoom tests. |
| Anchor navigation | **Adapt B** | Retain B layout, add A's deeper section coverage only after measured offset, auto-centering, keyboard and reduced-motion tests. |
| Quantity/ATC success | **Keep B, strengthen** | Preserve adding/success/drawer; add `aria-live`, focus-return and error/retry states. |
| Cart drawer | **Keep B** | Keep dialog + Escape; prove focus trap and return focus; transform/opacity only. |
| FAQ/accordions | **Adapt B** | Keep semantic button/region pattern; resolve heading text hygiene; test 200% zoom and open-state anchor offsets. |
| Reviews | **Rebuild** | No fabricated proof. Use a clearly labelled scaffold until live reviews are connected. |
| Motion tokens | **Keep B, normalize** | Shared duration/easing/reduced-motion tokens for React and future Liquid; no animation that changes meaning. |

## Required closure before final recommendation

1. Do not adopt A's responsive shell, sticky geometry, or mobile ATC behavior.
2. Physically test B on iOS/Android touch and keyboard at all five widths; include 200% text zoom and reduced-motion emulation.
3. Close B drawer focus-management and ATC announcement evidence; test an error/retry state.
4. Test all B anchor destinations with header, anchor bar, bottom dock, gallery state and expanded FAQ present.
5. Remove/replace B review claims before any final prototype score is treated as release-ready.
