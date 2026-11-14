# Optional sound design review — Unslop extension

Use together with the original Unslop, APCA, HIG, design-system, progressive-enhancement, and motion/haptics guidance.

## Rule: consider, do not insert

For every landing page, public website, web/mobile app, interactive presentation or HTML document, briefly **evaluate whether audio would add meaningful value**. Do not add, enable, generate or embed sounds by default. Audio is an opt-in design proposal, not a mandatory deliverable. The creator's intent, established brand and the user's explicit instructions take priority.

## Two-part evaluation

1. **Functional (rational) benefit:** Can audio confirm an important action, signal completion/errors without requiring visual monitoring, clarify a transition, reinforce an intentional interaction or explain a meaningful physical process? Would a visual or haptic cue achieve the goal more appropriately?
2. **Emotional benefit:** Does sound enhance product identity, tactility, delight, atmosphere, immersion or a meaningful narrative moment, without seeming gimmicky?
3. **Context and cost:** Will people use this on public transit, in an office, during a presentation or around others? Would surprise, repetition, sensory sensitivity, accessibility, data/CPU use, licensing, or mobile/platform autoplay restrictions outweigh the benefit?

Rate the opportunity internally as low, medium or high. If low or medium, **do not propose audio unprompted** and continue with a silent design. If high, **suggest one concrete, optional sound concept**, explaining in 1–3 sentences why it helps, when it plays, and its likely emotional effect. **Ask for author approval before implementation.** Do not repeatedly suggest the same sound after rejection.

Examples of potentially strong opportunities: a deliberately playful interactive mechanic with an important completed action; a landing-page illustration where a sound can communicate a real material/process (fermentation, kneading, crackle); an opt-in cinematic presentation with an intentional narrated transition. Examples of poor opportunities: ordinary navigation, every card hover, form keystrokes, every button press, a public informational report, or decorative loop on a conventional commerce page.

## Requirements if explicitly approved

- Default to silence; initiate audio only via a clear user gesture or an explicitly chosen soundtrack feature. Do not autoplay surprise sounds or force a music bed.
- Provide obvious mute/unmute and, where relevant, volume and repeat controls. Respect user's mute and reduced-motion/other relevant accessibility preferences where technically available; provide silent mode.
- Never encode important information in sound alone: visible status and/or text alternatives are mandatory.
- Use short, quiet, distinctive, non-fatiguing feedback rather than loud sounds or ubiquitous cues; avoid repeated noises on every input.
- Pair sound with motion/haptic feedback only when each modality adds independent value; avoid overstimulation.
- Prefer compact, compressed, appropriately licensed assets. Load audio only when necessary. Do not make a web page depend on successful playback, permission or JS for its core content.
- Test with sound off, audio blocked, JS disabled, keyboard navigation and mobile devices. Document user control and any browser playback limitations.

## Review output

If an audio concept meets the high-value threshold, give the author a concrete suggestion with: trigger, functional value, emotional value, caveat and an explicit choice to approve or skip. Never add sounds automatically based on score alone.
