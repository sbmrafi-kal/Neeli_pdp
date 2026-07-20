# Neelibhringadi Keram — Design decisions

## Direction

**Modern natural efficacy.** The page is designed for naturally inclined Indian Millennials and Gen X shoppers who do not need to understand Ayurveda before they can understand the product. It uses the confidence and clarity of contemporary treatment-led personal care, while retaining Kerala Ayurveda's own palette, product, formulation and voice.

The memorable device is a fine dual-track line—hair fall and hair growth—converging into one recovery path. It appears sparingly as section navigation and progress, never as decoration for decoration's sake.

## Reference synthesis

- Minimalist: strong hierarchy for price, concerns, results and use; avoid its denser clinical walls and automated review summaries.
- indē wild Champi Hair Oil: proves an Indian hair-oiling ritual can feel current; avoid lifestyle overstatement and borrowed cultural nostalgia.
- The Ordinary Multi-Peptide Serum: direct product truth, format and safety structure; avoid excessive ingredient jargon.
- Nécessaire Body Serum: restrained, legible personal-care information; avoid sterile generic minimalism.
- Aesop scalp treatment: concise suited-to, dosage, texture and ritual; avoid apothecary nostalgia.

Primary references:

- https://beminimalist.co/products/hair-growth-actives-18
- https://india.indewild.com/products/champi-hair-oil
- https://theordinary.com/en-us/multi-peptide-serum-for-hair-density-hair-scalp-treatment-100434.html
- https://necessaire.com/collections/treatment/products/the-body-serum
- https://malaysia.aesop.com/products/sage-cedar-scalp-treatment

## Visual system

- Figtree carries body copy and interface text. Avenir supports the product promise and actions. Amstir is limited to the brand mark/display accent.
- Ksheera White is the dominant field; Tulsi Green is the primary ink; Agni Red is the single action colour; Rasa-Shastra is reserved for small value signals.
- Sections are grouped with whitespace, rules and typographic rhythm—not rows of equal rounded cards.
- Product photography is authentic Kerala Ayurveda material. Informational gallery frames use typeset product facts rather than fabricated lifestyle imagery.
- No glass, gradients, glow, bento grids, generic avatars, fake claims, fake stock indicators or invented testimonials.

## Responsive behaviour

- Desktop uses an asymmetric 7/5 editorial split for the opening product story.
- Mobile intentionally reorders: product image → promise → proof → benefits → delivery; purchase remains in the bottom dock.
- The compact sticky header and purchase dock never compete for the same information. Price stays visible through ready, adding and added states.
- Touch targets are at least 44px; horizontal content scrolls with snap points rather than shrinking into illegibility.

## Motion

- One restrained entrance sequence establishes hierarchy.
- Product-gallery changes use opacity and a small translate only.
- Button press is 120–160ms at 0.98 scale; adding and success labels crossfade; success holds briefly without opening the bag.
- Drawer enters in 240ms and exits in 180ms using transform/opacity.
- Reduced-motion users receive immediate state changes.

