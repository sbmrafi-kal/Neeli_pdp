# V3 science motion and mobile navigation plan

## Confirmed direction

- Retain the four-step visual journey: oil drop → fibre → scalp → follicle.
- Reinstate Karnasphota in the ingredient details and give it a visible role in the scalp scene.
- Treat the science sequence as the PDP’s signature experience. It receives the highest visual, motion and performance attention on the page.
- Generate a coherent family of source stills in Higgsfield, then create scroll-linked camera movement, transitions, highlights and scientific labels in the browser.
- Do not collapse mobile navigation into a generic Sections or More destination.

## Ingredient-detail revision

Reinstate Karnasphota as the fifth ingredient entry:

**Karnasphota**  
**Role:** Scalp-environment support.  
**Consumer copy:** Traditionally used for an itchy, dandruff-prone scalp. Experimental Cardiospermum extracts have reported effects involving TNF-alpha and nitric oxide; this is ingredient-level mechanistic evidence, not finished-product clinical proof.

Karnasphota remains a supporting ingredient rather than the formula’s growth-cycle anchor, but it should no longer be visually buried.

## Ingredient colour system

| Ingredient/action | Highlight colour | Visual use |
|---|---|---|
| Coconut oil / lauric acid | Pearlescent ivory `#E8DDC7` | Particles crossing into the fibre layers |
| Amla | Amla green `#91A667` | Antioxidant field around the scalp surface |
| Neeli | Indigo-violet `#66548A` | Cooling botanical field paired with Amla |
| Karnasphota | Copper-rust `#B45F3C` | TNF-alpha / nitric-oxide research annotation within the scalp scene |
| Bhringraj | Saffron-gold `#D6B34C` | Follicle research signals: FGF-7, FGF-5 and mTOR |

Only the ingredient currently being explained reaches full chroma. Other traces remain desaturated so colour directs attention rather than becoming decoration.

## Four-scene camera choreography

### Scene 00 — Enter the drop

- Start with a newly generated macro droplet suspended over dark brass or basalt.
- Camera performs a slow orbital pan and a controlled push-in, approximately `1.00 → 1.14`.
- The droplet becomes a lens. Its interior reveals the shared material vocabulary used by the following scenes.
- Copy: **Two recovery paths. One complete formula.**
- The three-milk extraction platform appears only as a quiet source annotation; it is not a third recovery path.

### Scene 01 — Fibre protection

- Match-cut from the droplet edge to a hair-fibre cross-section.
- Camera tracks laterally along the cuticle, then settles on the area receiving the active explanation.
- Pearlescent lauric-acid markers move across the fibre boundary while the rest of the frame remains subdued.
- Copy: **Lauric acid enters the fibre → helps reduce protein loss.**
- Do not depict repair, reconstruction or regrowth.

### Scene 02 — Scalp environment

- Camera pans from the fibre root to the scalp surface and performs a shallow focus pull.
- Amla green and Neeli indigo appear as two complementary botanical fields.
- Karnasphota copper enters last and receives its own clear beat. DOM annotations for `TNF-alpha` and `nitric oxide` diminish in emphasis; the evidence label remains **ingredient-level · experimental**.
- Copy sequence:
  1. **Amla + Neeli → antioxidant support**
  2. **Karnasphota → experimental scalp-stress signals**
- Do not animate a treatment, cure or clinically proven anti-inflammatory effect.

### Scene 03 — Follicle research view

- Transition with a focus pull—not a particle travelling physically from the scalp—to make clear that this is a research view.
- Camera moves into an anatomically respectful follicle cutaway and settles near the dermal papilla.
- Bhringraj gold activates three restrained DOM overlays: `FGF-7 ↑`, `FGF-5 ↓`, `mTOR activity observed`.
- Copy: **Bhringraj supports the anagen-linked research story.**
- Evidence label: **preclinical ingredient evidence**.
- Never depict proven delivery to the dermal papilla or guaranteed follicle activation.

### Resolution

- Camera pulls back just enough to reveal the full fibre–scalp–follicle relationship.
- Two persistent path lines resolve:
  - **Path 01:** protect fibre + support scalp.
  - **Path 02:** support anagen-linked signals.
- Closing line: **Protein protection. Scalp support. Anagen-linked signals.**

## Motion implementation

Use a dedicated GSAP ScrollTrigger timeline or an equivalently robust section-scoped scroll timeline. The animation must be continuously linked to scroll progress rather than switching React chapter state at IntersectionObserver thresholds.

- Create 2.5D scene plates from high-resolution stills with separate foreground, subject and atmospheric layers.
- Animate camera pan, scale, depth offset, masked transitions and highlight opacity.
- Use real DOM for every scientific label, evidence qualifier and arrow.
- Keep one active highlight at a time.
- Desktop: pinned stage for approximately `300vh`, visual occupying about 62%, text rail 38%.
- Mobile: `68–72svh` pinned stage with a bottom editorial caption; each scene receives roughly `75–90svh` of scroll.
- No opaque chapter cards over the visual.
- Reduced motion: four ordinary static image-and-copy sections in document order.
- Preload only the first scene; prefetch later plates as the section approaches.
- Target ≤250KB for the first mobile plate and ≤1.2MB total initially decoded science imagery.

## Higgsfield production gates

1. Generate two `4:5` look-development frames: fibre and follicle.
2. Approve anatomy, oil colour, lighting, material realism and copy-safe space.
3. Generate the drop and scalp scenes using the approved frames as visual references.
4. Generate intentional `9:16` and `16:10` compositions for all four scenes.
5. Create masks/depth layers and test the camera timeline with low-resolution proxies.
6. Approve the complete motion prototype before exporting final AVIF/WebP assets.

Do not generate labels, arrows, molecular diagrams, floating herbs, neon biotech, blue hospital lighting, beakers or slow-cooking vessels into the source images.

## Mobile navigation candidates

### A — Six-cell conversion rail — recommended

One `44px` sticky row with six equal destinations:

`Results · Science · Compare · Use · Reviews · FAQ`

- The logo is the route back to Overview.
- Science lands at the beginning of Formula and remains active through the science sequence.
- All conversion and trust destinations are directly visible.
- At 320px, use carefully tuned `9.5–10px` labels with 44px minimum targets.
- This is the smallest, clearest change and avoids disclosure or sideways discovery.

#### Approved text-scaling adaptation

Option A is approved for the default 320–430px mobile context. At ordinary text
scaling, all six destinations remain visible in one 44px rail. The component must
release the six-equal-cell constraint when enlarged text would overflow:

- use intrinsic label widths in one horizontally scrollable row;
- keep every destination present, unabridged and at least 44px high;
- automatically move the active destination into view;
- show an edge cue when destinations continue beyond the viewport;
- support swipe, touch and keyboard without relying on hover; and
- never truncate, hide, or replace the destinations with “Sections.”

Verify at 320, 360, 390 and 430px, in landscape, and at 200% text enlargement.
This preserves the all-visible default for the majority mobile context without
forcing microscopic type on customers who enlarge text.

### B — Decision + trust rail

Two visible rows:

- Decision: `Results · Science · Compare · Use`
- Trust: `Reviews · FAQ`

This allows larger labels and gives Reviews/FAQ additional prominence, but increases the sticky stack by approximately 34–38px.

### C — Main rail with pinned trust pair

- A compact horizontally scrollable main rail for `Results · Science · Compare · Use`.
- `Reviews` and `FAQ` remain fixed on the right in a visually distinct trust group.

This is expandable if more sections are added later, but it introduces two navigation behaviours in one component and is less immediately understandable than A.

## Recommendation

Proceed with Candidate A and the intrinsic-width overflow adaptation above.
Candidate B remains the fallback for future internationalisation only if the
single-row enlarged-text treatment becomes too long to scan. Candidate C should
be reserved for a future PDP with materially more sections.
