# Neelibhringadi PDP — V1 to V2

## Preserved baseline

The exact pre-science prototype is retained at:

`exports/neeli-pdp-prototype-v1-pre-science`

V2 is developed in the workspace root and packaged separately as:

`exports/neeli-pdp-prototype-v2-science`

## What changed in V2

| Area | V1 | V2 |
|---|---|---|
| Formula explanation | Static two-path summary with broad claims | Scroll-led scientific editorial story beginning at a magnified oil drop |
| Recovery model | Two paths, loosely mapped | Two paths across three explicit targets: shaft, scalp and follicle |
| Ingredient story | Five equal-weight ingredient entries | Four hero ingredients; Karnasphota is a subordinate evidence annotation |
| Science language | Generic activation and deeper-delivery language | Specific lauric-acid, protein-loss, FGF-7, FGF-5 and mTOR language with preclinical boundaries |
| Triple-milk role | Deeper carrier claim | Classical extraction platform; no dermal-papilla delivery claim |
| Comparison | Oil versus serum/tonic routine table | Direct three-row comparison with minoxidil, hair serums and rosemary-led pre-wash oils |
| Consultation | No escalation route | Official Kerala Ayurveda WhatsApp route for persistent, sudden or complex concerns |
| Ritual | Repeated 2–3-times-weekly guidance | Exact 2× weekly, 30–60 minutes, rinse with a mild shampoo |
| Reassurance | Separate choose/deselect section | Compact, honest pre-wash reassurance adjacent to the ritual |
| Motion | Product texture experiment | Product texture experiment plus one signature scientific scroll sequence |
| SEO/CRO | Basic metadata and commerce events | Product structured data, revised metadata, science/comparison/consultation exposure events |

## Evidence boundaries

- Coconut oil language is restricted to hair-fibre penetration and protein-loss evidence.
- Bhringraj signalling is explicitly preclinical and does not claim finished-product clinical regrowth.
- Amla, Neeli and Karnasphota language remains ingredient-level or traditional-use support.
- The triple-milk matrix is described as extraction architecture, not proven follicular delivery.
- Minoxidil is identified as a medicine and not treated as a like-for-like cosmetic oil.

## Responsive and motion validation

- Checked at 320 × 740, 390 × 844, 768 × 1024 and 1440 × 1000.
- No horizontal document overflow at the checked breakpoints.
- Mobile uses a sticky visual with sequential science chapters.
- Desktop uses a pinned split-screen research plate.
- Reduced-motion mode removes sticky choreography and presents a static, readable sequence.
- Final TypeScript/Vite production build passes.
- Impeccable design detector returns no findings for the V2 implementation files.

## Local comparison

Run V2:

```bash
cd "/Users/sripathhariharan/Documents/Neeli PDP reconstruction"
npm install
npm run dev -- --host 127.0.0.1 --port 5174
```

Run the frozen V1 in a second terminal:

```bash
cd "/Users/sripathhariharan/Documents/Neeli PDP reconstruction/exports/neeli-pdp-prototype-v1-pre-science"
npm install
npm run dev -- --host 127.0.0.1 --port 5175
```

Then compare:

- V2: `http://127.0.0.1:5174`
- V1: `http://127.0.0.1:5175`
