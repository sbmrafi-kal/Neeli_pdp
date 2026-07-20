# Neelibhringadi Keram PDP prototype — V3

A standalone responsive React + TypeScript prototype for Kerala Ayurveda's Neelibhringadi Keram product page.

V3 adds the mobile-first section rail, a premium four-scene ingredient-led science story, responsive Higgsfield plates, a direct comparison against minoxidil, hair serums and rosemary-led pre-wash oils, a doctor-guided WhatsApp consultation route, and an exact twice-weekly ritual. V2 remains available as the default route for comparison.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://127.0.0.1:5174`.

- V2 comparison baseline: `http://127.0.0.1:5174/`
- V3 latest prototype: `http://127.0.0.1:5174/?version=v3`

## Verify

```bash
npm run build
```

The pincode response, bag and checkout are deliberately local prototype interactions. No transaction or customer data leaves the browser.

The WhatsApp consultation CTA is the one deliberate external link. It opens Kerala Ayurveda's current official WhatsApp support number with a prefilled product-guidance message.

## Motion experiment QA

The Texture gallery frame has a sticky 50/50 control-versus-motion experiment:

- Control: `http://127.0.0.1:5173/?neeli_motion=control&neeli_debug=1`
- Motion: `http://127.0.0.1:5173/?neeli_motion=motion&neeli_debug=1`
- Motion assignment with reduced-motion fallback: `http://127.0.0.1:5173/?neeli_motion=motion&neeli_reduce_motion=1&neeli_debug=1`

See `planning/CRO_MOTION_EXPERIMENT.md` for the hypothesis, event contract, sample-size scenarios and decision rules.

The scientific story also respects the operating-system reduced-motion preference. For deterministic QA, add `?neeli_reduce_motion=1`.

## Version comparison

See `VERSION_COMPARISON.md` and `planning/v3/V3_IMPLEMENTATION_NOTES.md` for the version map, evidence boundaries and V3 validation record.
