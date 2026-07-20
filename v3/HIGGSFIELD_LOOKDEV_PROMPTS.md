# Higgsfield science look-development prompts

Status: generated 19 July 2026 with GPT Image 2 at 1744 × 2336. GPT Image 2
does not expose 4:5 directly, so the masters use its closest portrait ratio,
3:4, with enough protected space for later 4:5 cropping.

## Shared art direction

- Model: GPT Image 2
- Master composition: 4:5 portrait, 2K
- Register: premium consumer-science editorial, warm and botanical rather than
  hospital-blue or futuristic biotech
- Material language: hyperreal macro photography blended with anatomically
  credible scientific visualisation
- Palette: cocoa-black field, Kerala Ayurveda olive, restrained cream and one
  active ingredient colour
- Composition: dominant subject in the upper two-thirds, calm negative space for
  live HTML copy and annotations
- Generated imagery contains no typography, arrows, labels or branded packaging

## Frame 01 — lauric acid entering the hair fibre

### Generation prompt

> Premium scientific editorial macro visualisation of a single human hair fibre
> in cutaway, seen obliquely through a 100mm macro lens. A translucent deep
> violet-brown medicated coconut-oil film touches the fibre; small pearlescent
> ivory lauric-acid markers pass through overlapping cuticle scales toward the
> cortex. Anatomically credible fibre structure, tactile keratin detail, warm
> directional rim light, cocoa-black background, restrained Kerala Ayurveda
> olive undertone, shallow depth of field, cinematic realism, luxurious but
> approachable consumer science, generous dark copy space on the upper left.

### Motion potential to preserve

- Clear foreground oil layer, cuticle plane and cortex depth for 2.5D separation.
- Camera can track laterally along the shaft while pushing through the cuticle.
- Ivory markers need clean silhouettes for selective animation.

## Frame 02 — follicle and dermal-papilla research view

### Generation prompt

> Premium scientific editorial cutaway of one healthy human scalp follicle,
> viewed at a refined oblique macro angle as if the camera has travelled below
> the scalp. The follicle bulb and dermal papilla are anatomically legible, with
> subtle cellular texture and a thin golden Bhringraj research-signal glow
> gathering around the papilla. Warm cocoa-black and deep olive environment,
> restrained saffron-gold activation, soft volumetric rim light, crisp focal
> plane at the papilla, cinematic depth falloff, sophisticated consumer-science
> realism, calm negative space on the right for live research annotations.

### Motion potential to preserve

- Separate scalp plane, follicle wall, bulb and papilla for controlled depth.
- Camera can descend, arc around the bulb and finish on a precise focus pull.
- Gold is confined to the research-signal layer; it does not depict physical
  delivery of finished oil to the papilla.

## Acceptance gates

Both frames must pass before generating the drop and scalp scenes:

1. Anatomical forms are credible at phone size and do not resemble plastic tubes.
2. Oil reads as premium botanical oil, not water, gel or synthetic serum.
3. The active ingredient colour is immediately distinguishable without neon glow.
4. Copy-safe space survives both 4:5 review and later 9:16 / 16:10 art direction.
5. Depth planes are separable enough for pan, zoom, focus and parallax.
6. Visuals contain no embedded text or implied finished-product clinical proof.

## First-pass review

### Fibre frame

- Pass: premium macro material language and legible cuticle/cortex depth.
- Pass: pearlescent markers remain distinct from the violet-brown oil.
- Pass: large upper-left copy-safe field.
- Motion use: lateral track along the cuticle followed by a controlled push toward
  the cortex; markers animate separately rather than moving as one decorative swarm.

Master: `lookdev/science-fibre-lookdev-01.png`

### Follicle frame

- Pass: follicle, bulb and papilla form remain readable at phone scale.
- Pass: saffron-gold activation is confined to the papilla region.
- Pass: right-hand negative space can hold live FGF-7, FGF-5 and mTOR annotations.
- Motion use: descend beside the shaft, arc gently around the bulb and finish with
  a focus pull onto the papilla. The gold layer is described as a research signal,
  never as finished oil physically delivered to the papilla.

Master: `lookdev/science-follicle-lookdev-01.png`

## Companion frames

### Opening droplet — preferred V2

`lookdev/science-droplet-lookdev-02.png`

- Deep violet-brown remains the dominant material colour and connects naturally
  with the oil texture already used in the PDP.
- Cocoa-black, warm amber rim light and small olive/indigo/copper traces belong to
  the existing brand system without changing the page-wide palette.
- V2 replaces V1's crystalline sparkle with denser, quieter herbal-oil material.
- Motion use: slow orbital pan, restrained internal flow and a controlled push
  through the lower-right of the droplet toward the fibre scene.

V1 is retained as `lookdev/science-droplet-lookdev-01.png` for comparison.

### Scalp and Karnasphota — preferred V2

`lookdev/science-scalp-karnasphota-lookdev-02.png`

- Copper-rust is the dominant action colour; indigo and green remain supporting.
- The simplified pathways preserve anatomical calm and leave space for live
  TNF-alpha / nitric-oxide annotations.
- Motion use: focus moves from the surface signal points to the copper pathway;
  points reduce in intensity as the scroll progresses. This remains an
  ingredient-level experimental mechanism visual, not a finished-product cure.

V1 is retained as `lookdev/science-scalp-karnasphota-lookdev-01.png` for
comparison.
