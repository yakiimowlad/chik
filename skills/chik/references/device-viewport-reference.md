# CHIK — device, browser chrome, safe-area and PWA reference

Research snapshot: 2026-11-14. All dimensions in CSS pixels (logical points/dp), not physical pixels. Reference screen sizes are **not** browser page viewports. Sources and confidence are listed below. These profiles support QA planning; never hard-code browser UI heights into layout.

## 1. iPhone / iOS portrait

| Models / profile | Logical screen W×H | Approx. native iOS safe top/bottom | Safari visible content on initial load, estimate | Evidence |
|---|---|---|---|---|
| iPhone SE 3 | 375×667 | 20/0 | ~583 | Safari model estimate |
| iPhone 13 mini | 375×812 | ~50/34 | ~668 | Safari model estimate |
| iPhone 14, 16e | 390×844 | ~47/34 | ~703 | Safari model estimate |
| iPhone 15, 15 Pro, 16 | 393×852 | 59/34 | ~699 | Safari model estimate |
| iPhone 16 Pro, 17, 17 Pro | 402×874 | 62/34 | ~718 | 16 Pro measured; 17 extrapolated |
| iPhone Air | 420×912 | 68/34 | ~750–756 | device profile estimate; safe top differs by source |
| iPhone 15 Pro Max, 16 Plus | 430×932 | 59/34 | ~779 | Safari model estimate |
| iPhone 16 Pro Max, 17 Pro Max | 440×956 | 62/34 | ~800 | Safari model estimate |

**Safari initial browser chrome model (iOS 26, compact bottom tab bar):** status/system top ~47–62 px (Air ~68); lower Safari bar ~94 px; older home-button iPhone Safari lower bar ~64 px. On scroll estimated gain ~36 px for compact bar; not universal. One reference device (iPhone 16 Pro) measured 718 visible, other values inferred from profiles, not individually measured. In landscape, side insets and gesture edges change. Chrome on iOS uses WebKit but its interface chrome can differ from Safari; don't blindly reuse Safari numbers.

**Important distinction:** the iOS system safe-area values above apply to a screen-edge/native or configured standalone context; `env(safe-area-inset-*)` in a normal Safari tab can be 0 when browser chrome has already restricted the viewport. Do not subtract system safe-area and browser chrome twice. Use runtime CSS `env()` and actual visible height.

Sources: https://doesitfit.lol/blog/iphone-safari-visible-area ; https://mobilefriendlycheck.com/tools/safe-area-preview ; https://www.webmobilefirst.com/en/devices/brands/apple/ ; https://www.douni.one/safe-area

## 2. Android phone / Chrome portrait

| Devices / profile | Logical screen W×H | Typical Chrome first-load visible content (estimate) |
|---|---|---|
| Generic narrow Android / Galaxy S24 / Galaxy S25 | 360×780–800 | ~660–680 |
| Galaxy S25 Ultra / Galaxy A55 | 384×832 | ~694 |
| Pixel 8 | 412×915 | ~777 |
| Pixel 9 / Pixel 10 | 412×924 | ~786 |
| Pixel 9 Pro | 427×952 | ~814 |
| Pixel 9 Pro XL | 448×997 | ~859 |

**Planning budget** (not guaranteed browser dimensions): status/system top ~24px, expanded Chrome top address bar ~56px, gesture/navigation bottom ~24px, additional dynamic Chrome bottom 'chin' up to ~34px depending on configuration; total unavailable height often ~100–140px. Chrome Android 135+ can extend viewport edge-to-edge and show/hide a dynamic bottom chin on scrolling. On Android physical cutout, system gestures and OEM/3-button navigation, insets vary. For installed PWA, browser address bar disappears, but system bars and edge-to-edge behavior depend on display mode, OS and target configurations. The `~` first-load estimates above are calculated QA budgets (screen height minus ~138px), not measurements of individual devices.

Sources: https://developer.chrome.com/docs/css-ui/edge-to-edge ; https://doesitfit.lol/blog/why-devtools-device-mode-is-not-accurate ; https://panescope.com/blog/viewport-sizes/

## 3. Tablet profiles

| Tablet | Logical screen portrait W×H | Browser chrome / safe-area guidance |
|---|---|---|
| iPad mini A17 Pro | 744×1133 | Desktop-class Safari toolbar, split view possible |
| iPad A16 / Air 11 | 820×1180 | iPad system home indicator often ~20 bottom and ~24 top in full screen |
| iPad Pro 11 | 834×1210 | Inspect portrait and landscape, Safari tabs, Split View |
| iPad Air 13 | 1024×1366 | Desktop breakpoint may activate in landscape |
| iPad Pro 13 | 1032×1376 | Multitasking resizes viewport arbitrarily |
| Galaxy Tab A9+ / S11 (11-inch) | 800×1280 | Android Chrome toolbar + system navigation; check multiwindow |
| Galaxy Tab S10+ | 876×1400 | Same |
| Galaxy Tab S10 Ultra | 924×1480 | Same |

**Browser toolbar budget for QA only:** tablet Safari/Chrome browser chrome can occupy roughly 60–140 CSS px vertically depending on tabs/address bars, OS top/bottom bars and orientation, but this is a conservative *test budget*, not a measured cross-device average. Real visible page height = screen/window height − actual current browser UI and system bars. Tablet safe insets may be already excluded in browser tabs. iPad PWA standalone does not share browser tab chrome and may display status bar or support multiple windows.

Sources: https://doesitfit.lol/devices/ipad ; https://doesitfit.lol/devices ; https://1440px.com/safe-area/

## 4. Desktop / laptop profiles

| Device/configuration | Logical display W×H reference | Notes |
|---|---|---|
| MacBook Air 13-inch default scaled | 1470×956 | macOS scaling varies by user preference |
| MacBook Pro 14-inch default scaled | 1512×982 | Dock/menu bar/window bounds affect page |
| MacBook Pro 16-inch default scaled | 1728×1117 | Same |
| 1366×768 Windows laptop | 1366×768 | At 100% scaling |
| FHD Windows notebook at 125% scaling | 1536×864 | Physical 1920×1080 |
| Full HD external monitor | 1920×1080 | Not necessarily maximized browser |

**Desktop Chrome/Safari browser UI:** there is NO one reliable average toolbar height. Chrome with tabs + address bar often uses a QA allowance of ~75–115px at 100% scaling; Safari's compact or separate tabs UI may be ~55–110px; optional bookmarks bar adds ~25–35px; macOS menu bar, Dock/window decoration, OS scaling and user zoom may further reduce usable height. These ranges are **provisional layout stress-test budgets**, not a measured browser benchmark or official browser specification. Design tests should also force 600px-tall content viewport independently of device display. Only actual `window.innerHeight` gives viewport height.

Sources: https://www.screensize.io/screen-sizes.html ; https://effectiveviewport.com/responsive-buckets/ ; https://breakpane.com/en/devices

## 5. Mandatory implementation and QA

- Never encode a fixed 94px Safari bar or 56px Chrome toolbar in CSS for production layout; those numbers are research references only.
- Use `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` when intentional edge-to-edge layout is present; don't force it indiscriminately.
- For sticky UI, use existing padding plus `env(safe-area-inset-bottom, 0px)`; avoid double-counting framework/browser-reserved space. Check landscape left/right insets and gesture zones.
- Prefer `min-height: 100svh` for stable initial visible sections when appropriate, `100dvh` for dynamic application surfaces (with fallback); `100vh`/`lvh` may overrun visible area under expanded browser chrome. For informational pages, natural content height is usually preferable.
- Test keyboard open, zoom, text enlargement, bottom/fixed bars, sheets, rotation, browser bars expanded and collapsed, standalone PWA, split-screen/multiwindow, and user-installed alternative browsers.
- Browser test matrix: iOS Safari normal tab + standalone PWA; iOS Chrome as useful; Android Chrome normal tab + PWA; iPad Safari portrait/landscape + Split View; Android tablet Chrome; macOS Safari and Chrome; Windows Chrome. Use real devices where possible, or disclose simulation limitations.
- Recommended test widths: 320, 360, 375, 390, 393, 402, 412, 430, 440, 744, 800, 820, 834, 1024, 1280, 1366, 1440, 1512, 1920. Additional short-viewport stress tests at 360×600, 393×650, 412×700, 1366×600. For real implementations, adjust breakpoints by content, not exact device dimensions.
- Record `window.innerWidth/innerHeight`, `window.visualViewport?.height`, `window.visualViewport?.offsetTop`, CSS env() insets, `matchMedia('(display-mode: standalone)')`, orientation and any fixed-overlay bounding boxes for actual QA. These are runtime observations, not constants.
- Annotate every reported numeric value as (a) device logical size, (b) native/standalone safe inset, (c) observed browser viewport, or (d) estimated QA budget. Do not mix categories.

References: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env ; https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length ; https://developer.chrome.com/docs/css-ui/edge-to-edge
