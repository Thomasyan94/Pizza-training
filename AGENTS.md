# Project instructions — Pizza Layer-by-Layer Demo

## Read and inspect first
- Read `PROJECT_CONTEXT.md` and inspect the current files and Git status before planning or editing.
- The V2 refactor is already present in the codebase. Do not treat the original single-file HTML as the current architecture.
- Make changes only within the approved scope. Do not commit, push, or deploy unless the owner explicitly asks.

## Current implementation
- The site is a static HTML/CSS/JavaScript demo. Its current structure and implemented behavior are documented in `PROJECT_CONTEXT.md`.
- Product, translation, site and animation data are loaded from local JSON through `js/data-source.js`; assets and modules use relative paths for static hosting.
- There is no live API, admin interface, authentication, database, order submission, or payment processing.

## Preserve the existing demo
- Preserve the established visual style, colors, typography, images, layout and interaction behavior unless the owner approves a change.
- Preserve the scroll-driven, data-defined pizza-layer assembly, current captions, background transitions, final CTA, desktop/mobile behavior and `prefers-reduced-motion` support. Do not replace it with a static image or a different animation.
- Preserve the current Pepperoni, Hawaiian and Supreme catalogue, available sizes and demonstration prices, Chinese/English/Malay UI, language preference, cart quantity/removal/total and persistence, add-to-cart animation, and demo checkout.
- Checkout must remain clearly a demo: it must not imply a real order, charge or confirmed purchase. Keep the non-official and demo disclosures; do not invent official prices, offers, product claims or brand authorization.
- Keep the data model driven by the configured product and layer arrays; do not add assumptions that every future product has the same number of sizes or that future data always has exactly seven layers.

## Data, safety and hosting
- Keep the current static JSON provider small and replaceable. Do not add a fake live API or a framework/build system unless separately approved.
- Treat future API/admin text as untrusted. Prefer DOM creation and `textContent`; use `innerHTML` only for constant, developer-authored templates.
- Never put server secrets, service-role keys or private credentials in browser-delivered files. Future authentication and authorization must be enforced server-side.
- Future client deployments must keep each client's admin access, database, storage, backups and credentials separate; never mix client data or hardcode shared secrets.
- Preserve static GitHub Pages compatibility, including repository subpaths and relative asset URLs. Run this fetch-based site through an HTTP server during local development; do not assume JSON fetch works from `file://`.
- Keep scroll rendering efficient with `requestAnimationFrame`, preserve transparent layer alignment, and respect reduced-motion preferences.
- Preserve visible keyboard focus. Ask before making user-visible modal, focus, form-validation or other interaction changes.

## Change control and verification
- Before changes, record the relevant worktree state, inspect the affected files and identify regression risks. Keep changes surgical and preserve unrelated work.
- For behavior or visual changes, get the owner's approval first. Explain the affected files and verify the actual changed behavior.
- Run the smallest relevant checks. For site behavior, cover configured layer order and scroll stages, captions, CTA, mobile layout, language changes, sizes/prices, cart updates and persistence, demo checkout, reduced motion, and repository-subpath URLs as applicable.
- Distinguish automated/browser checks from manual or cross-browser testing. Report anything not tested; do not claim a deployment was verified without testing it.
- Do not add a framework, server, authentication, payment processor, database, backend, or third-party tracking as part of routine maintenance without separate approval.
