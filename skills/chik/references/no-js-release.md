# No-JavaScript release gate (public HTML)

Mandatory for public sites, shared presentations and standalone HTML documents.

- The initial HTML response must contain the complete essential text, headings, images with meaningful alt text, nav links, tables, slides and conclusions. JavaScript enhances only.
- Without JavaScript, presentations show every slide in document order, scrollable and printable. No script-only hidden pages or inaccessible overlays.
- JS-dependent charts offer static SVG, image or accessible data table; JS-dependent interaction explains its disabled state if essential and provides a baseline fallback.
- Never put essential content behind JS-generated DOM, deferred hydration, animated opacity:0, or a component that renders blank before loading.
- Use semantic HTML, proper anchor links, keyboard navigation, no mandatory autoplay, and print CSS where useful.
- Respect `prefers-reduced-motion`, 200% zoom and reflow and accessible focus styles.
- Test in an actual browser with JavaScript disabled at desktop and mobile widths, and print/PDF rendering where relevant. Confirm main content and download links work. If you cannot test, explicitly state not verified; never claim it was tested.
- Tests must verify content, layout, navigation, tables, charts and slide access, not just absence of console errors.
