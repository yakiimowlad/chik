# Apple HIG + product-specific design system — Unslop extension

This extension is additive. The original Unslop by Damir Sokolovsky (CC BY 4.0) remains intact and credited. Also follow the companion APCA color audit.

## Priority and applicability

Apply automatically to websites, applications, prototypes and design systems, and to presentations/reports where visual hierarchy, typography, charts and content layout benefit.

Priority, highest first:
1. User's explicit brief, creator's intentional art direction, product purpose and platform context.
2. Existing approved brand, design system, semantics, component library and UX decisions.
3. Original Unslop structure and nine-pass workflow, including spacing first.
4. Relevant Apple Human Interface Guidelines (HIG) and iOS visual conventions as *defaults*, only where they improve the result.
5. Other stylistic preferences.

Do not turn every public website into a literal iOS application. Apple-inspired should mean restraint, clarity, responsive behavior, legibility and careful interaction, not copying system UI, pill shapes, translucency or Liquid Glass indiscriminately. If Apple style contradicts the brief, use the author's intended style and preserve HIG's transferable usability/accessibility principles where feasible.

## Mandatory design-system and spacing audit

Before editing:
- Find and inventory source design tokens (primitives and semantic aliases), typography scale, spacing steps, radius, elevations, colors, component states and breakpoints.
- **Preserve the original Unslop 4px grid principle**: use multiples of 4 for page margins, padding, gaps and fixed sizes; allow 2px optical nudges inside small controls and deliberate exceptions when necessary. Do not replace an existing consistent brand grid solely for Apple's aesthetics.
- Standardize repeated components and vertical rhythm: same role → same padding/size/gap; smaller spacing within groups than between groups; shared baselines and alignments.
- Check responsive width, dynamic text expansion, touch targets, safe areas, content clipping and reduced motion. Follow current official HIG guidance for target platform; avoid presenting any arbitrary number as a universal Apple requirement.
- Prefer semantic tokens and reusable components; remove unexplained one-off CSS values, duplicated overrides and inconsistent states. Do not silently change approved copy, feature set or information architecture.
- Do not force bento cards or uniform rounding if the product's visual language calls for a different structure.

## HIG-inspired interface craft

- Create obvious hierarchy using content, grouping, proportion, type and restrained color; prioritize familiar navigation, predictable interactions, feedback, affordances and accessible labels.
- Respect native patterns *when building native iOS/macOS/iPadOS software*. For the web, adapt the relevant principles without imitating a platform chrome that misleads users.
- Honor system light/dark modes if supported, increased text sizes, keyboard and screen reader access, focus states, touch ergonomics and reduced transparency/motion as relevant.
- Use transitions to express cause and continuity. Prefer short, purposeful, non-distracting motion; never animate solely to appear futuristic.
- Avoid applying Liquid Glass, excessive blur, gradients or translucency as decoration. If a material is used, preserve contrast, readability and contextual consistency.

## Replace decorative emojis with proper icons by default

- In navigation, controls, headings, labels, badges and status indicators, audit emojis and replace **decorative/UI emojis** with clear vector icons where this does not conflict with the author's concept.
- For native Apple apps, favor SF Symbols when licensing and platform availability permit. For web/cross-platform, choose one coherent vector icon library with an Apple-like restrained visual language, e.g. Lucide. Do not ship Apple proprietary assets outside permitted use.
- One icon set, consistent sizes, optical weight, baseline and bounding boxes; typically 16/20/24px steps as appropriate for the system. Align to the 4px rhythm, adjusting optically when justified.
- Keep labels for ambiguous controls and don't rely on icon-only interaction without accessible names.
- Preserve emojis when they are meaningful product content, user-generated expression, culturally or emotionally significant copy, an intentionally playful brand device, or specifically required by the author.
- Do not replace meaningful emoji with a generic symbol that reduces clarity. Ask before changing approved brand assets.

## APCA integration

After identifying tokens and fixing hierarchy/spacing, run `references/apca-addon.md` against **rendered** foreground/background pairs and all relevant states. Use actual Lc measurements from a validated implementation; do not invent values. APCA assessment is distinct from WCAG 2.2 contrast requirements. Fix insufficient text contrast with the smallest semantic token or local surface change, without gratuitous brand-color changes.

## Deliverable checklist

- [ ] Visual direction fits product and creator's brief, not an automatic iOS clone
- [ ] Original Unslop spacing pass applied; 4px rhythm and justified exceptions
- [ ] Components, typography, states and semantic tokens consistent
- [ ] Decorative UI emojis reviewed; appropriate vector icons used consistently
- [ ] Navigation, feedback, focus, touch and responsive behaviors appropriate
- [ ] APCA audit completed with measured Lc where possible; WCAG checked separately if required
- [ ] Existing approved design and UX intact; proposed substantive redesigns require approval unless explicitly authorized

References:
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/
- SF Symbols: https://developer.apple.com/sf-symbols/
- Original Unslop: https://github.com/heydamir/unslop
