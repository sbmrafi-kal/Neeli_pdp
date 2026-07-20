# Technical, accessibility, performance, SEO and Shopify comparison

**Scope.** Prototype A: `http://127.0.0.1:5181/neeli_pdp_prototype.html`; Prototype B: production Vite build at `http://127.0.0.1:5182/`. This is a report-only pass performed 18 July 2026. Scores are expert implementation scores (0–5), not lab Core Web Vitals or user research. Existing Chrome evidence was rechecked against source; B was rebuilt successfully with `npm run build`.

## Decision summary

Neither contender can be adopted wholesale. **Use B as the responsive, accessible-interaction and image-delivery foundation, but remove the unsupported proof present in both prototypes before any further adoption.** Port A's deeper content only as Liquid-backed, server-rendered sections; do not port its inlined asset strategy or mobile sticky stack.

### Raw scores by context

| Criterion | A mobile 320/390 | A tablet 768/1024 | A desktop 1440 | B mobile 320/390 | B tablet 768/1024 | B desktop 1440 | Technical verdict |
|---|---:|---:|---:|---:|---:|---:|---|
| Responsive adaptation | 2 | 3 | 4 | 4 | 4 | 4 | B; A reflows but has 320px overflow and weak tablet purchase placement. |
| Accessibility / interaction robustness | 2 | 3 | 3 | 3 | 3 | 3 | B; retain skip link, labelled landmarks, keyboard gallery and drawer trap, then fix content/truth and heading names. |
| SEO / search extractability | 1 | 1 | 1 | 2 | 2 | 2 | B is a better starting point only; both require canonical, SSR/Liquid product facts and Product/Offer data. |
| Performance / CWV readiness | 1 | 1 | 2 | 3 | 3 | 3 | B; its responsive WebP and lazy strategy are materially safer. |
| Shopify portability / maintainability | 3 | 3 | 3 | 2 | 2 | 2 | A's structural/content handoff is closer to Liquid; B's component boundaries are useful but the CSR runtime is not the delivery model. |

Scores apply the project 0–5 scale. Weighted technical roll-up (mobile 55%, tablet 15%, desktop 30%; five criteria equal within this technical track): **A 42/100; B 58/100 before the truth gate.** B's numerical lead does **not** clear the release gate because of the P0 below.

## Verified objective evidence

| Measure | Prototype A | Prototype B |
|---|---:|---:|
| Source/delivery | Single 1.37 MB self-contained HTML; 19 images and fonts inlined as data URIs | React/TS/Vite production build: 219.9 KB JS (68.3 KB gzip), 62.7 KB CSS (12.4 KB gzip); image assets requested separately |
| Mobile initial transfer (390px) | 1,337 KB / 1 request; all bytes block parsing | 753 KB; 1,395 KB / 15 requests after full scroll |
| Images / missing alt / no intrinsic dimensions | 25 / 0 / 25 | 10 / 1 / 0 |
| Responsive image loading | No lazy loading or source variants possible with data URIs | Hero priority + `picture` mobile WebP variants and lazy offscreen images (`src/App.tsx:57-59`) |
| 320px horizontal overflow | **9px** | **0px** |
| First in-flow add action | 1,065px mobile; 541px desktop | 779px mobile; 836px desktop |
| Semantic structure | header, main, two navs, footer; no skip link | skip link, header, main, labelled nav/regions, footer, labelled purchase aside and modal dialog |
| Metadata | title only; no description, canonical or JSON-LD | title + description (`index.html:4-8`); no canonical, robots, social metadata or JSON-LD |
| Structured data | 0 JSON-LD | 0 JSON-LD |
| Responsive breakpoints | desktop and mobile adjustments, but fixed layers collide | explicit 700–1023 and <=699 contexts plus <=360 safeguards |

Measured Chrome interaction probes show A gallery, accordion, anchor nav and desktop add work. At mobile its in-flow add click times out because a fixed layer intercepts it; force-click works. B's gallery selector, add state, bag drawer and Escape close work on mobile and desktop. Both B pincode probes failed because the feature is absent, not because the test was flaky.

## Release gates and priority findings

### P0 — must block adoption

1. **A and B: fabricated or unverified proof is rendered as real proof.**
   - **Location:** A hero/proof markup; B `src/App.tsx:66`, `83-85`, `123-128`.
   - **Evidence:** `4.7 / 5`, `137 reviews`, a named “Lipika” review marked “Verified purchase”, and “40,000+ bought this year” are visible. The comparison plan locks reviews to an honest scaffold and prohibits fabricated reviews, counts and UGC.
   - **Impact:** Trust, legal/claims, CRO and structured-data gates fail. Do not expose or serialize rating/review markup until a connected source provides displayed, eligible data.
   - **Decision:** **Reject B reviews/confidence strip as shipped; rebuild** as an explicit empty/review-platform scaffold.

### P1 — fix before final responsive prototype

1. **A: 320px overflow and an intermittent sticky purchase-layer risk block unadapted use.**
   - **Location:** fixed stack and sticky buy bar in `neeli_pdp_prototype.html` around lines 440–476; responsive CSS embedded earlier in the same file.
   - **Evidence:** 9px `scrollWidth - clientWidth` at 320px. The existing pack recorded one 390px actionability timeout; fresh root retesting at 320px and 390px clicked successfully.
   - **Impact:** The overflow gate fails and the earlier collision remains a regression risk.
   - **Decision:** **Reject A purchase system as shipped; rebuild** from B's state continuity with one measured sticky offset and safe-area clearance.

2. **A: all content images are unsized and all assets are inlined.**
   - **Location:** data-URI `<img>` gallery/section markup, e.g. `neeli_pdp_prototype.html:393-405`.
   - **Impact:** Browser cannot reserve stable image geometry; the initial HTML must download/parse all imagery before any lazy strategy can help. This is not Liquid/CWV-ready.
   - **Action:** use B's intrinsic `width`/`height`, responsive `<picture>`, priority hero and lazy offscreen approach.

3. **Both: no Product/Offer structured data, canonical URL, or live product data source.**
   - **Location:** A `<head>`; B `index.html:4-8`; neither contains JSON-LD.
   - **Impact:** product price/availability cannot be reliably extracted or made eligible for merchant listing/product enhancements. Google distinguishes merchant-listing markup for purchase pages and recommends complete product data; it also requires page and markup truth to agree. [Google Product structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/product) and [merchant-listing guidance](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing).
   - **Action:** emit Liquid-sourced `Product` + `Offer` (name, image, description, brand, SKU/variant, INR price, availability, URL, condition) and self canonical. Keep review/rating fields absent until verified displayed reviews are connected.

4. **B: CSR shell is not sufficient for the specified Shopify crawlability target.**
   - **Location:** `index.html` contains only `#root`; all canonical product facts are generated by `src/App.tsx` after JavaScript.
   - **Impact:** a crawler, slow device or JS failure has no product facts in initial HTML; this conflicts with the plan's server-rendered Liquid/HTML requirement.
   - **Action:** use B as interaction reference only; render product facts, headings, FAQ, price and image links in Liquid, then progressively enhance gallery/drawer.

5. **B: responsive art direction is good but its accessibility text is polluted by visual UI tokens.**
   - **Location:** FAQ `src/App.tsx:131-133`.
   - **Evidence:** rendered heading names include `01What is…−`; closed FAQ content is absent from the initial accessibility tree due to `hidden`.
   - **Impact:** confusing heading navigation and reduced static extractability of answers.
   - **Action:** separate ordinal/icon from accessible name and keep important FAQ answer content present in server HTML (progressive disclosure may hide visually).

### P2 — material follow-up

1. **B: one non-empty image has missing alt.**
   - **Evidence:** rendered audit: 10 images / 1 missing alt. Verify the cart/product decorative image remains `alt=""`; provide meaningful alt for any image that conveys product information.

2. **B: metadata is incomplete.**
   - **Location:** `index.html:4-8`.
   - **Action:** add canonical, `og:title`/description/image, `twitter:card`, and a representative accurate social image. Avoid baked promotional text. Google recommends image context, descriptive alt text, standard crawlable `<img>`/`<picture>`, and nearby relevant text. [Google image SEO guidance](https://developers.google.com/search/docs/appearance/google-images).

3. **B: visible health and safety/product claims require approved source verification.**
   - **Location:** ingredients/results/FAQ, notably `src/App.tsx:19-23`, `27-29`, `41-48`.
   - **Impact:** claims such as “activates follicles”, “fight fungal buildup”, pregnancy safety and quantified preparation details cannot be presented as fact without approved substantiation. This is a content-truth review, not a clinical finding.

4. **A: multiple fixed/sticky layers create a fragile scroll model.**
   - **Evidence:** header, gallery, anchor nav and sticky buy bar coexist in the rendered DOM. It functions in the desktop probe but has already failed at phone width.

### P3 — polish after gates close

1. **B: copy/accessibility hygiene:** `FAQ’s` uses an apostrophe and ritual heading serializes as `Warm. Apply.Massage. Wash.`; correct while normalizing approved brand voice (`src/App.tsx:116,133`).
2. **Both:** add a real form/variant/add-to-cart integration in the Liquid handoff; current quantity/cart state is prototype state only, not a Shopify cart contract.

## Accessibility and responsive positives to retain

- **B:** skip link; labelled anchors and purchase aside; carousel arrows, selector state and keyboard left/right; aria-live gallery/add feedback; native `details`; `prefers-reduced-motion` guards; dialog Escape, focus placement, focus restoration and a basic tab loop (`src/App.tsx:76-79,158-161,189-191`).
- **A:** complete non-empty alternative text and native `details` accordions; buttons have labels for quantity and gallery thumbnails.
- **B:** no 320px overflow, intrinsic image dimensions, mobile source selection and content-specific breakpoint work are the best technical base.

## Search and structured-data truth gate

| Requirement | A | B | Final requirement |
|---|---|---|---|
| Unique title + description | Partial: title only | Partial: title + description | Unique title/description matching visible product positioning |
| Crawlable visible product facts | Yes in static HTML, but data-URI-heavy | No in initial shell; appears after JS | Liquid-rendered facts and FAQ in initial HTML |
| Canonical/robots/sitemap readiness | Not present | Not present | self canonical; Shopify sitemap/robots reviewed on store domain |
| `Product` + `Offer` | Absent | Absent | Liquid data: price ₹338, MRP ₹375, INR, 200 ml, SKU/variant and live availability |
| Ratings/reviews schema | Absent | Must remain absent: display proof not yet approved | Only when source-backed, displayed review data is connected |
| Image discoverability | data URIs, no dimensions | standard images, dimensions, variants | B model, accurate context/alt and a crawlable fallback `src` |

## Component adoption recommendations

| Component | Recommendation | Technical adaptation rule |
|---|---|---|
| Image delivery / art direction | **Keep B** | Keep `<picture>`, intrinsic geometry, high-priority first frame and lazy offscreen images; retain an `img src` fallback. |
| Purchase dock / cart drawer | **Adapt B** | Preserve feedback, Escape and focus management; bind to Shopify Ajax cart/form and test 320px safe area, error/retry and no competing in-flow CTA. |
| A in-flow/sticky purchase | **Reject as shipped** | Rebuild; no overlaying fixed stack and no 320px overflow. |
| Anchor navigation | **Adapt B** | Keep semantic nav/active state; server-render anchors; account for measured sticky height and reduced-motion scrolling. |
| Gallery | **Adapt B** | Keep keyboard/touch/caption approach but use one actual gallery component with accessible names and no duplicated visual-only facts. |
| Product facts, FAQ, ingredients | **Adapt A content into Liquid** | Server render facts and answers, then progressively enhance disclosure; source all copy from verified product content. |
| Reviews / proof | **Rebuild** | Honest “reviews coming from [platform]” scaffold only until verified data. No ratings/counts/verified-purchase labels or review schema. |
| Metadata / schema | **Rebuild** | Shopify/Liquid source of truth feeds HTML, OG metadata, canonical and Product/Offer JSON-LD; no hard-coded React duplicate. |
| Motion | **Keep B’s restraint, verify final** | Continue transform/opacity and reduced-motion protections; re-test drawer, gallery, anchor and add states under throttled mobile. |

## Validation backlog before final approval

1. Close the proof-integrity P0 and A's purchase/overflow P1, then re-run 320/390/768/1024/1440 screenshot, overflow and purchase probes.
2. Implement Liquid data bindings and validate rendered canonical, metadata, Product/Offer JSON-LD and price/availability consistency with Rich Results Test/Search Console on the real store URL.
3. Run keyboard-only, 200% zoom, reduced-motion and screen-reader heading/landmark checks on the Liquid output.
4. Capture mobile Lighthouse/WebPageTest or field CWV after production hosting; this comparison’s transfer counts are not substitute CWV measurements.
