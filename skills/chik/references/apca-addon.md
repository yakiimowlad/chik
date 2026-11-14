# APCA color-system audit — extension for Unslop

This addendum supplements, and does not replace, the original Unslop skill by Damir Sokolovsky: https://github.com/heydamir/unslop (CC BY 4.0). Preserve the attribution and all original skill files and references.

## When to run

Run automatically for every website, app, interface and design-system audit. Also run for presentation decks, reports and externally shared materials with important text or data visualizations. Public-facing outputs require a complete pass before delivery.

## Audit procedure

1. Extract existing design tokens and semantic color roles; distinguish text, surface, border, chart, status, disabled, on-accent and interactive states. Do not invent colors before checking existing tokens.
2. Test **actual rendered foreground/background pairs**, not isolated palette swatches. Account for alpha blending, overlays, images/gradients behind text, light/dark themes, browser-rendered states, and text polarity. For textured backgrounds, measure worst representative regions as well as typical regions.
3. Use a validated APCA implementation (e.g., `apca-w3`) to compute signed **Lc** with text and background in their correct positions. Report `Lc +N` or `Lc -N` and use absolute magnitude only for range comparisons. Do not calculate APCA using WCAG's legacy contrast-ratio formula.
4. Assess legibility together with **font size, weight, actual font characteristics, text role and density**. Use current official APCA font tables when available. Screening bands, **not universal compliance criteria**:
   - |Lc| ≥ 90: preferred for normal body copy.
   - |Lc| ≥ 75: body copy at compatible size/weight; often an appropriate minimum for sustained reading.
   - |Lc| ≥ 60: fluent/non-body text at compatible size/weight, e.g. 24px regular or 16px bold.
   - |Lc| ≥ 45: large, sufficiently heavy display text, e.g. 36px regular or 24px bold, plus fine-detail pictograms.
   - |Lc| ≥ 30: lowest screening band for certain non-critical text / large solid semantic elements; do **not** use for normal body or action text.
   - |Lc| < 15: treat as effectively invisible for many people.
5. Pay special attention to numerical values, prices, totals, badges, small captions, placeholders, secondary text, inputs, primary/secondary actions, navigation, active/hover/focus/disabled states, errors, alerts, success and charts. Important figures must be readable before they are merely colorful.
6. Report every problem as: `component → foreground token/background token → rendered colors → type size/weight → measured Lc → severity → smallest recommended change`.
7. Prefer updating **semantic token mappings** or component variants over replacing brand palette colors. Preserve design-system architecture, approved labels, components, tokens, layouts and user flows. Where brand colors cannot carry legible text, change the text/surface relationship, add an appropriate solid surface, or choose an existing accessible on-color token. Avoid relying on hue alone to signal state.
8. For public projects, additionally perform a **separate WCAG 2.2 AA** contrast evaluation where needed (text, components and focus indicators). APCA is a perceptual assessment and must not be described as proof of WCAG 2.x or 3 compliance.
9. Include an audit summary in the deliverable: number of combinations checked, number of critical problems, token-level corrections proposed, examples before/after and remaining caveats. Do not claim values have been measured when code, screenshots or resolved colors are unavailable.

## Change policy

Audit first; show findings and proposed changes. Do not modify an established system without authorization unless the user explicitly requests applying changes. If authorized, make minimal targeted edits and re-measure. Check both light and dark themes and relevant responsive states.

## References

- APCA overview: https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell
- APCA minimum compliance guidance: https://github.com/Myndex/SAPC-APCA/blob/master/documentation/minimum_compliance.md
- Original Unslop: https://github.com/heydamir/unslop
