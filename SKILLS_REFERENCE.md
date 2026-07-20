# Skills Reference — Neeli PDP Reconstruction

Definitive list of design / UI / QA / Shopify skills invokable in this project (as `/skill-name`).
Project context: reconstructing a Product Detail Page (PDP) that ships on **Shopify Plus**.

_Last verified: 2026-07-15._

---

## Building interfaces
| Skill | Use for |
|---|---|
| `frontend-design` | Distinctive production-grade frontend; avoids generic AI look |
| `design-taste-frontend` | Senior UI-eng rules: composition, type, spacing, states, anti-patterns |
| `high-end-visual-design` | Premium agency-grade visual direction |
| `minimalist-ui` | Clean editorial style — restraint, hierarchy |
| `emil-design-eng` | Fine interaction craft, timing/easing, polish details |
| `ui-ux-pro-max` | Broad UI/UX guidance (single skill, no sub-skills) |
| `artifact-design` | Design fundamentals for hosted artifact pages |
| `dataviz` | Charts, graphs, dashboards, KPI/stat tiles |

## Refining / improving design
| Skill | Use for |
|---|---|
| `critique` | Structured UX evaluation, scoring, persona testing |
| `polish` | Final alignment/spacing/consistency pass |
| `bolder` | Strengthen bland/too-safe designs |
| `quieter` | Tone down noisy/aggressive designs |
| `animate` | Purposeful motion, micro-interactions, hover/transitions |
| `adapt` | Responsive rework (mobile/tablet/desktop as distinct experiences) |
| `clarify` | Improve unclear UX copy, labels, errors, microcopy |
| `redesign-existing-projects` | Upgrade an existing interface to premium, preserving intent |

## Quality / QA / verification
| Skill | Use for |
|---|---|
| `audit` | Technical audit: accessibility, performance, theming, responsive, anti-patterns (P0–P3) |
| `gstack` | Headless-browser QA: navigate, test flows, responsive, screenshots, bug evidence |
| `verify` | Drive a change end-to-end to confirm it works |
| `code-review` | Correctness + cleanup review of the diff |
| `simplify` | Reuse / simplification / efficiency cleanup |
| `security-review` | Security-focused review |

## Shopify (PDP → Shopify Plus)
| Skill | Use for |
|---|---|
| `shopify-liquid-themes` | sections/blocks/snippets, schema JSON, LiquidDoc, translation keys, Liquid syntax |
| `liquid-theme-standards` | CSS/JS/HTML standards, BEM, **design tokens / CSS custom properties**, defensive CSS |
| `liquid-theme-a11y` | WCAG 2.2 for PDP components (cards, carousel, cart drawer, price, forms, filters, modals) |
| `shopify-expert` | Architecture (theme vs headless), CLI/deploy, checkout extensions, Functions, Storefront API, Plus features |

## Ecommerce / PDP conversion & research
| Skill | Use for |
|---|---|
| `page-cro` | Product-page conversion architecture, friction, CTA hierarchy |
| `ab-test-setup` | Experiment design for alternative PDP treatments |
| `analytics-tracking` | Product-view / gallery / add-to-cart / purchase instrumentation |
| `marketing-psychology` | Behavioral principles for hierarchy, proof, purchase decisions |
| `customer-research` | Align experience with audience needs |
| `copywriting` / `copy-editing` | Page copy (hero, value prop, CTA); editing existing copy |
| `schema-markup` | Structured data for PDPs (product/offer/review rich results) |
| `seo-audit` | Technical / on-page SEO review |

## Image / asset generation
| Skill | Use for |
|---|---|
| `higgsfield-generate` | General image/visual generation |
| `higgsfield-product-photoshoot` | Brand-quality product photography |
| `higgsfield-marketplace-cards` | Marketplace / PDP listing image cards |
| `higgsfield-soul-id` | Train a face/identity model for consistent generation |

## MCP integrations (tools, not `/skills`, but available)
| Integration | Use for |
|---|---|
| **Figma** | Design↔code both ways; `/figma-use`, `/figma-generate-design`, `/figma-generate-library`, `/figma-code-connect` |
| **Stitch** | Generate screens, design systems, UI variants |
| **Shopify** | Storefront/admin GraphQL, products, collections, inventory, docs search |
| **Magnific** / **Higgsfield** | Image/video/asset generation and editing |

---

## Notes
- The four Shopify skills were installed to the global skills directory (`~/.claude/skills/`), so they are available in every project, not just this one.
- Skills run with full agent permissions — review a skill's `SKILL.md` / reference files before relying on it.
- Names NOT available (common misnames): `design:*`, `ui-ux-pro-max:<sub>`, `shopify:shopify-liquid`, `anthropic-skills:*`, `figma:*` (as skills), `imagegen`, `browse`, `qa`, `qa-only`, `design-review`, `plan-design-review`. Use the confirmed substitutes above.
