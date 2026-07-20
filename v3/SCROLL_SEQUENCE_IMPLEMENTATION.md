# Scroll-scrubbed science sequence implementation

## What is implemented now

The V3 science section is a pinned, continuously scrubbed GSAP sequence. Scroll progress controls:

- the four scene changes: formula droplet → hair fibre → scalp → follicle;
- directional masked transitions rather than abrupt image swaps;
- slow camera push, pan and focus-like blur;
- sequential copy reveals;
- scientific trace drawing;
- atmospheric light movement; and
- individually filling progress segments.

The section remains normal static content when reduced motion is enabled or motion eligibility fails.

## Recommended production asset upgrade

The current implementation creates cinematic motion from four high-resolution plates. For genuine frame-by-frame movement, replace each plate with an exported image sequence and render it to a canvas.

Recommended delivery:

- Desktop: 96–144 frames per chapter, 1600 × 1000, AVIF/WebP.
- Mobile: 64–96 frames per chapter, 810 × 1440, AVIF/WebP.
- Naming: `/assets/science-v3/sequences/<chapter>/frame-0001.webp`.
- Keep the first frame under 180 KB and later frames preferably under 90 KB.
- Preload frame 1 only; begin loading the next 8–12 frames when the section is within one viewport.
- Maintain a rolling cache around the current frame rather than decoding every frame at page load.
- Draw the nearest loaded frame when fast scrolling skips ahead.
- Keep all copy, evidence labels, arrows and qualifiers as DOM—not baked into the sequence.

## Runtime choice

Use a canvas image sequence when precise one-frame-per-scroll control matters. Use a low-GOP video scrub only when delivery size is the higher priority. Do not use Lottie for the photoreal oil/science imagery.

## Motion timing

Allocate roughly one viewport of scroll per chapter. Within each chapter:

1. 0–18%: previous scene exits and the next scene reveals.
2. 12–76%: the image sequence/camera move plays.
3. 18–48%: copy and evidence appear.
4. 22–74%: scientific traces draw.
5. 78–100%: hold the completed frame long enough to read.

Avoid scroll snapping. Users should be able to reverse naturally and see every motion reverse with them.

## Required QA

- 320, 360, 390, 430, 768, 1024, 1440 and 1920 px.
- iOS Safari and Android Chrome on a mid-range device.
- Fast wheel, trackpad, touch drag and reverse scrolling.
- 200% text enlargement.
- `prefers-reduced-motion: reduce`.
- No overlap with sticky header, section navigation or purchase bar.
- No copy hidden below the mobile purchase bar.
