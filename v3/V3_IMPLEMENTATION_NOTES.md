# Neelibhringadi PDP V3 implementation

## Version routes

- V2 comparison baseline: `http://127.0.0.1:5174/`
- V3 responsive prototype: `http://127.0.0.1:5174/?version=v3`

V3 is query-gated in `src/App.tsx`; V2 remains the default and its science, comparison and navigation components remain available for side-by-side review.

## V3 changes

- Six-destination mobile-first section rail: Results, Science, Compare, Use, Reviews and FAQ.
- Equal-width labels at normal 320–430 px viewports; intrinsic-width horizontal rail only when rendered text no longer fits.
- Four-scene GSAP scroll story using responsive AVIF/WebP plates:
  1. Complete formula droplet
  2. Lauric-acid fibre pathway
  3. Amla, Neeli and Karnasphota scalp pathway
  4. Bhringraj dermal-papilla research view
- Desktop split-screen camera choreography and mobile/tablet stacked visual choreography.
- Static sequential fallback for reduced motion or motion-ineligible environments.
- Neelibhringadi-forward mobile comparison against minoxidil, hair serums and rosemary oils.
- Karnasphota restored to the hero ingredient index and science narrative.
- Ayurveda doctor consultation CTA routed to the existing WhatsApp flow.

## Evidence and language guardrails

- Finished-product clinical regrowth is not asserted.
- Bhringraj signalling is identified as preclinical ingredient research.
- Karnasphota TNF-alpha and nitric-oxide language is identified as experimental ingredient evidence.
- Minoxidil is distinguished as a medicine rather than treated as a like-for-like cosmetic oil.
- Ritual directions remain: 2× weekly, leave for 30–60 minutes, then wash out with a mild shampoo.

## Verification

- Production build: `npm run build`
- Tested without horizontal document overflow at 320, 390, 768 and 1440 px.
- All six nav destinations are visible at normal 320 and 390 px viewports.
- Science stage reserves the fixed purchase bar area so copy and evidence remain readable.
- FAQ direct navigation and active-state tracking verified.
- Browser console: no warnings or errors in the final integrated pass.

