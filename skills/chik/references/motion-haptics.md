# Motion, microinteractions and haptics — Unslop extension

## Default: consider motion, do not add motion everywhere

During any interface design or audit, explicitly examine state changes and meaningful user actions for opportunities for animation, microinteraction, sound or haptic feedback. **Consideration is mandatory; adding an effect is conditional.** Design intent, brand language, task context and platform affordances always take priority. Never add effects solely to look polished or Apple-like.

## Two-part rationale for each proposed effect

For each effect, be able to give both answers:
- **Rational / functional:** What state changed? What does the feedback communicate (acknowledgment, causality, hierarchy, continuity, spatial relationship, loading/progress, preventing repeated actions, success/failure)? Does it reduce ambiguity or improve the task?
- **Emotional / experiential:** What should the action *feel* like (responsive, reassuring, precise, calm, playful, satisfying)? Is that tone appropriate for the brand and context? Is the delight worth the added attention cost?

If neither reason is strong, skip the effect. Rational clarity must never be traded away for delight. More animation is not automatically better design.

## Prioritize state transitions

Audit: pressed/released, hover/focus (where supported), toggles, selection, validation, save/submit success, errors, loading → loaded, disabled ↔ enabled, accordion expand/collapse, dialogs/sheets, navigation transitions, drag/reorder/drop, changes in totals and other key values, progress/completion. Preserve content continuity and stable layout. Avoid flashing, bouncing or shifting text for routine changes; avoid fake progress or animations that obstruct completion.

Use motion to explain **before → transition → after**. Specify trigger, initial/final state, duration and easing only when meaningful, interruption/reversal behavior, and the reduced-motion alternative. Prefer compositor-friendly opacity/transform over layout-thrashing properties, but do not hide meaningful content by default pending JavaScript initialization.

Timing is context-dependent; use restrained, brief microinteractions and slightly longer spatial transitions only if necessary. Do not impose a single universal duration; test on actual devices and with slow hardware. Feedback should be immediate even when longer work continues.

## Tactility and haptics (optional, sparing)

Consider a short, differentiated haptic for *high-salience* actions where the platform supports it: a confirmed selection, snapping into a position, a meaningful success or a user-correctable error. Do not vibrate every tap, scroll event or menu opening; avoid repeated, startling or punitive patterns. Prefer native system feedback and platform conventions; respect user preferences, silent/reduced-sensory settings and device capabilities. Haptics are **supplemental**, never the only indicator of a state. Pair with clear visual/textual feedback. Avoid assuming that every web browser or iPhone supports browser vibration; provide a graceful no-haptics path. For web, never gate content or functionality on Vibration API support.

For sound, use only when explicitly appropriate to the product and with clear mute controls. Do not autoplay disruptive feedback.

## Accessibility, performance and JS-off

- Honor `prefers-reduced-motion`: eliminate nonessential movement, offer near-instant state changes and preserve meaning.
- Avoid vestibular triggers, parallax, continuous pulsing, strobing and distracting loops. Never require precise motion timing to complete a task.
- Keep actions and feedback keyboard/screen-reader accessible and ensure announcements are not dependent on animation.
- Public sites, HTML documents and HTML presentations must display all essential information, images, slides and conclusions with JavaScript fully disabled. CSS enhancement must not permanently conceal content. In an HTML deck, show slides in a normal scroll flow without JS. Interactive visualizations need static accessible representations; print layout must work.
- **Test** no-JS mode, reduced-motion mode, mobile/desktop and print where tools are available. Report explicitly if any of these checks could not actually be run. Never claim a test passed without running it.

## Audit/report format

For every proposed nontrivial interaction document concisely:
`element & state change → functional purpose → emotional effect → animation/haptic spec → accessibility fallback → priority`.

Suggested priority: `essential feedback`, `useful refinement`, or `optional delight`. Include a “no effect needed” decision for routine elements when appropriate.

References: https://developer.apple.com/design/human-interface-guidelines/ ; https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
