# Objective comparison evidence

Collected 18 July 2026 against:

- Prototype A: `http://127.0.0.1:5181/neeli_pdp_prototype.html`
- Prototype B: `http://127.0.0.1:5182/` from a fresh `npm run build`

This file reconciles fresh browser measurements with the existing 71-screenshot and interaction-probe pack in `/Users/sripathhariharan/Documents/claude/projects/neeli redesign/comparison_evidence`.

## Frozen inputs

| Input | SHA-256 |
|---|---|
| A standalone prototype | `e74db6b642b50d607b46cbe31f1a4aded69bbc011da493861a514a5416721ccc` |
| A readable template | `f35337df4459c50f27a07ccfbe5e7770122259979f8deeab37f8fe36b7e9de37` |
| B `src/App.tsx` | `ebf466c24cb01f5e050598548b9612c5a9e3a42015b5c4228f33f7b3486e8c6c` |
| B production HTML | `8178be7a1228a7ff783000d8ace1ebf246050ff5dccc26fa46bd4df5c62b5458` |
| B production CSS | `dc18f0474e56875ac9262e4a97cb28031768120daa0c8904aac898d158e13f0d` |
| B production JS | `9975f888ae82e2f05b61ce77199e236d9041a9b858c96ef7a7b05e68a2fb5dd7` |

The existing comparison evidence was generated after the last source modification in either contender, so it is not stale relative to the tested inputs.

## Production build

Prototype B built successfully:

- HTML: 0.59 KB, 0.35 KB gzip
- CSS: 62.67 KB, 12.43 KB gzip
- JavaScript: 219.88 KB, 68.26 KB gzip

Prototype A remains one approximately 1.3 MB HTML document with embedded fonts and imagery.

## Fresh DOM measurements

| Measure | A mobile 390 | B mobile 390 | A desktop 1440 | B desktop 1440 |
|---|---:|---:|---:|---:|
| Page height | 7,978 px | 9,872 px | 6,562 px | 8,817 px |
| Words | 556 | 664 | 563 | 702 |
| First in-flow Add to cart | 1,065 px | 779 px | 541 px | 936 px |
| Visible Add-to-cart controls found | 4 | 1 | 4 | 1 |
| Images | 25 | 10 | 25 | 10 |
| Images missing `alt` attribute | 0 | 0 | 0 | 0 |
| Empty image alt | 0 | 1 | 0 | 1 |
| Images without intrinsic dimensions | 25 | 0 | 25 | 0 |
| Lazy images | 0 | 6 | 0 | 6 |
| Meta description | No | Yes | No | Yes |
| Canonical | No | No | No | No |
| JSON-LD | 0 | 0 | 0 | 0 |
| Skip link | No | Yes | No | Yes |

Prototype B's duplicate responsive/hidden structures result in multiple header/footer elements in the DOM. This is not automatically a failure, but the final Liquid implementation should avoid duplicate landmark exposure.

## Breakpoint measurements

| Prototype | 320 × 740 | 390 × 844 | 768 × 1024 | 1024 × 768 | 1440 × 1000 |
|---|---|---|---|---|---|
| A overflow | **9 px** | 0 | 0 | 0 | 0 |
| B overflow | 0 | 0 | 0 | 0 | 0 |
| A first in-flow ATC | — | 1,065 px | **1,460 px** | 529 px | 541 px |
| B first in-flow ATC | — | 779 px | 960 px | 704 px | 936 px |

At 768px, A's hero becomes a long stacked composition and pushes the first in-flow purchase action to 1,460px. B also places the in-flow action below the first viewport, but its fixed purchase dock preserves access.

## Fresh interaction checks

- A at 390px: the hero Add to cart was clicked successfully and the `Added to cart` status appeared.
- A at 320px: the hero Add to cart was clicked successfully and the `Added to cart` status appeared.
- The earlier Playwright pack recorded one A mobile actionability timeout caused by an overlay before a force-click succeeded. The fresh run did not reproduce it. Treat this as an intermittent sticky-layer risk, not as a consistently blocked control.
- B at 390px: Add to cart entered `Adding…`, then produced a cart with one item and a persistent `View Cart · ₹338` action.
- Existing probes confirm B drawer Escape closure, gallery selection and fixed purchase continuity.
- B's documented pincode check remains absent from source and rendered UI.

## Automated anti-pattern scan

`npx impeccable --json` results:

- A readable template: repeated gray-on-color warnings, repeated cramped-padding warnings, one all-caps warning, and a verified 4.4:1 gold-on-green contrast warning.
- B `src/App.tsx`: no findings.

Interpretation:

- A's repeated line-zero warnings are partly parser duplication caused by embedded CSS and should not be counted as separate defects.
- The 4.4:1 `#CCA54E` on `#39461D` warning is real for small text and needs the pre-approved lighter gold or larger-text treatment.
- B's clean result is not a complete clean bill because most styling lives in separate CSS files, which the markup scanner does not audit directly.

## Reconciliation correction

One parallel browser track reported A retaining a 1200px layout under all viewport overrides. Root re-testing showed that the viewport override had applied to the wrong browser tab during that track. Fresh direct measurements confirmed that A does reflow at 320, 390, 768, 1024 and 1440px. The 1200px claim is discarded.

The valid A responsive findings remain:

- 9px horizontal overflow at 320px.
- An earlier intermittent sticky-layer click interception that was not reproduced in the fresh run.
- A very late first in-flow purchase action at 768px.
- More simultaneous sticky/fixed layers than B.

## Testing limitations

- No real shopper research, eye tracking, heatmaps or analytics were available. Scan and conversion judgments are expert hypotheses.
- Reduced-motion behavior was source-verified but not visually emulated by the available browser.
- The 768px run provides a useful text-reflow proxy, but it is not a substitute for a true 200% browser-zoom and screen-reader pass.
- Network transfer figures come from the existing headless-Chrome pack; lab or field Core Web Vitals must be measured again on the final hosted Liquid implementation.
