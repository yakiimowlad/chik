# CHIK Mobile UX — adaptive ergonomics and information density

This is an **automatic review gate** for mobile websites, applications, PWAs, responsive HTML documents and presentations. Apply relevant layout/accessibility checks universally; apply navigation and overlay patterns only when evidence supports them. Explicit author intent, product platform, approved design system and the original Unslop rules take precedence over an iOS aesthetic.

## 1. Mobile-first implementation and compact, readable content
- Start with the narrowest practical layout and expand progressively. Design for actual content and tasks, not a single mockup width. Responsive breakpoints follow content pressure, not a hard-coded list of device brands.
- Audit list cards, cheatsheet/reference cards, search results and dense screens for excessive title size, padding, empty space, duplicated labels and decorative chrome. Increase useful information visible **without shrinking text, touch targets or legibility**. Prefer concise labels, sensible truncation with access to full text, compact metadata and progressive disclosure.
- Use the original Unslop spacing rhythm (4px grid where appropriate). Compact cards may use e.g. 12–16px content padding and 8–12px internal gaps only if readable and consistent with the host system; treat these as examples, not fixed universal requirements.
- Put primary content and high-frequency actions first. Keep tap targets reliably usable; a compact visual icon may still have a larger invisible activation area. Prevent accidental adjacent taps.
- Dynamic Type/text zoom 200%, long translations, accessibility font sizes and text wrapping should not hide content or produce overlapping controls.

## 2. Safe areas, mobile browser chrome and PWA modes
- On iPhone and Android verify portrait/landscape, notches/cutouts, rounded corners, home indicator/gesture bars, and screen edge constraints.
- Use CSS `env(safe-area-inset-top/right/bottom/left)` when edge-to-edge layouts need it; include ordinary padding so an inset of 0 is still comfortable. Don't double-count insets already handled by browser/UI framework. `viewport-fit=cover` is conditional on the chosen edge-to-edge treatment.
- Distinguish layout / visual viewport and browser toolbars. For full-viewport layouts consider `100svh` for stable initial fold and `100dvh` for a dynamic app shell, with fallbacks; avoid blindly using `100vh` for fixed mobile UI or `100dvh` for long content pages.
- Ensure sticky/fixed headers, bottom action bars, bottom sheets, toasts and FABs are not hidden behind Safari/Chrome bars, PWA standalone UI, soft keyboard, OS gestures or notches.
- Test standard browser tab, PWA standalone when supported, keyboard open/closed, landscape, scroll and address bar expanded/collapsed; don't assume identical insets on iOS and Android.

## 3. Ergonomics and robust content states
- Test one-handed use and reachability of frequent actions, with appropriate consideration for different hand sizes and assistive use. Don't force all actions bottom-aligned.
- Check empty, loading, error, offline, success, disabled, long-content, no-permission and multi-step states; keyboard and zoom; focus and scroll restoration; accessible labels and visible focus states.
- Avoid scroll traps, nested scrolling where possible, layout jumps and unscrollable modals. Keep secondary information discoverable, not permanently hidden behind gestures.
- Preserve accessible semantics, meaningful headings, keyboard navigation and complete content without JS for public HTML per `no-js-release.md`.

## 4. Navigation design: evaluate, don't impose
- Consider **push / stacked navigation** for hierarchical drill-down (index → section → item), predictable back navigation, history/deep-link handling and restoring scroll position. Use it when it reduces cognitive load; not for shallow browsing or simple filters.
- Consider **present / sheet / modal** for short, contextual, dismissible tasks (filters, quick actions, confirmation, item preview) when users should return to the original context. Avoid sheets for complex content that needs sharing, deep links or long scrolling; use a full page instead when appropriate.
- On iOS native follow relevant Apple HIG navigation conventions; on Android favor established Android conventions. On the web/PWA use accessible URL/history behavior and platform-appropriate patterns rather than an iOS imitation everywhere.
- Swipe navigation is a progressive enhancement; provide visible alternatives and avoid collisions with OS back/edge gestures, carousel scroll and assistive technology.
- For cheat sheets, prefer compact searchable table-of-contents, anchored chapter/section navigation, back-to-list behavior and a clear Other/Miscellaneous category when needed. Deep links should open specific chapters without breaking back navigation.
- Explain the functional rationale of suggested patterns and seek approval before materially changing information architecture or established routing.

## 5. Evidence and release gate
- Evaluate at least one narrow viewport (~320–360 CSS px), one common phone width (~375–430px), a large-text/zoom scenario, and one landscape or short-height case; vary when the actual audience has different devices. Test both iOS Safari and Android Chrome on real devices when possible; browser emulation alone doesn't fully verify OS and browser chrome.
- If PWA is in scope, test installed standalone mode in addition to a browser tab. Also test with JS disabled for public informational content, and with reduced motion.
- Verify screen's useful content, interactions, safe areas, tap targets, heading scale, sticky overlays, keyboard, loading/empty/error, no horizontal overflow, and return/navigation states.
- Document what was actually tested vs inferred; never claim tested native safe areas or haptics based solely on desktop emulation.

## Mandatory report per affected mobile screen
1. Density: what is unnecessarily large or repetitive and how to compact it without accessibility regression.
2. Edge safety: what can overlap safe areas, browser bars, keyboard and PWA chrome.
3. Navigation: keep current pattern or propose push/sheet/fullscreen with one-sentence rationale.
4. Evidence: tested environments and remaining unverified risks.

References: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env ; https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length ; https://developer.apple.com/design/human-interface-guidelines/

## Verified and estimated viewport matrix
Consult [Device, browser chrome, safe-area and PWA reference](device-viewport-reference.md) when selecting test devices and evaluating first-fold and sticky controls. Its device profiles are not fixed browser UI constants. Do not claim hardware testing where only research/emulation occurred.
