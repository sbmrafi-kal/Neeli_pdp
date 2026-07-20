# V3 science imagery — production manifest

All derivatives are art-directed crops from the specified look-development PNGs. The original masters remain unchanged. AVIF is the preferred source; WebP is the fallback. `object-position` values below are the intended CSS focal points if a further cover crop is ever necessary.

## Delivery matrix

| Scene | Source master | Variant | Dimensions | AVIF | WebP | Proposed focal point / copy-safe zone |
| --- | --- | --- | --- | ---: | ---: | --- |
| Droplet | `planning/v3/lookdev/science-droplet-lookdev-02.png` | `droplet-mobile` | 810 × 1440 (9:16) | 19,503 B | 44,620 B | `70% 55%`; subject held centre-right, leaving the darker upper-left area for short copy. |
| Droplet | same | `droplet-master` | 1200 × 1600 (3:4) | 39,214 B | 72,190 B | `55% 55%`; full droplet contour retained. |
| Droplet | same | `droplet-desktop` | 1600 × 1000 (16:10) | 28,999 B | 54,884 B | `55% 48%`; droplet body is centred; dark margins remain usable for restrained overlay copy. |
| Fibre | `planning/v3/lookdev/science-fibre-lookdev-01.png` | `fibre-mobile` | 810 × 1440 (9:16) | 86,761 B | 137,612 B | `75% 48%`; cross-section remains in the upper-right; keep copy to the darker upper-left. |
| Fibre | same | `fibre-master` | 1200 × 1600 (3:4) | 168,281 B | 241,482 B | `60% 48%`; preserves the fibre core and serum detail. |
| Fibre | same | `fibre-desktop` | 1600 × 1000 (16:10) | 147,630 B | 207,296 B | `70% 45%`; right-weighted core, left third is the best copy area. |
| Scalp / Karnasphota | `planning/v3/lookdev/science-scalp-karnasphota-lookdev-02.png` | `scalp-karnasphota-mobile` | 810 × 1440 (9:16) | 72,099 B | 141,258 B | `42% 55%`; root and signalling points remain visible; avoid large overlay over the root. |
| Scalp / Karnasphota | same | `scalp-karnasphota-master` | 1200 × 1600 (3:4) | 131,808 B | 205,146 B | `50% 55%`; complete follicle silhouette retained. |
| Scalp / Karnasphota | same | `scalp-karnasphota-desktop` | 1600 × 1000 (16:10) | 122,413 B | 196,624 B | `42% 62%`; use the upper-right field for copy, preserving the root at left. |
| Follicle | `planning/v3/lookdev/science-follicle-lookdev-01.png` | `follicle-mobile` | 810 × 1440 (9:16) | 53,297 B | 96,884 B | `48% 58%`; keeps the bulb and shaft continuous; right edge remains atmospheric. |
| Follicle | same | `follicle-master` | 1200 × 1600 (3:4) | 99,728 B | 153,206 B | `50% 55%`; full follicle and illuminated bulb retained. |
| Follicle | same | `follicle-desktop` | 1600 × 1000 (16:10) | 71,386 B | 111,262 B | `45% 62%`; the left/upper field is safest for overlay copy. |

## File convention

Files live in `public/assets/science-v3/` as `<scene>-<mobile|master|desktop>.<avif|webp>`. All mobile WebP plates are below the 250 KB target; the largest is `scalp-karnasphota-mobile.webp` at 141,258 B. AVIF gives the smallest delivery option, and WebP is included for broad fallback support.

## Crop caveats

- Desktop variants necessarily crop vertically from the tall lookdev masters; they prioritize the active scientific detail rather than the full vertical shaft or surrounding field.
- The fibre and scalp scenes are photographically dense. Their higher byte sizes are deliberate to avoid muddying the micro-texture and signal beads, but remain under the mobile budget.
