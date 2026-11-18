# Project Context — Pizza Layer-by-Layer Demo

## Current baseline
- The V2 refactor code is present at commit `f2a55be` (`Refactor pizza demo into data-driven static modules`).
- This is a static, client-side training/demo site inspired by Pizza Hut styling. It is not an official Pizza Hut service or a production ordering system.
- The current implementation is vanilla HTML, CSS, JavaScript modules and local JSON. There is no live API, admin interface, authentication, database, order submission or payment processing.

## Current code structure
```text
index.html
css/style.css
js/
  main.js          # Loads site data and wires the modules together
  data-source.js   # Fetches and validates local JSON; resolves relative asset URLs
  animation.js     # Builds configured layers and renders the scroll-driven story
  catalog.js       # Renders products, size choices and displayed prices
  cart.js          # Cart state, localStorage, drawer and demo checkout
  i18n.js          # Language selection and localized rendering
  dom.js           # Small DOM, template, storage and money helpers
data/
  animation.json   # Ordered layer geometry and animation parameters
  products.json    # Product IDs, images, size IDs and prices in minor currency units
  site.json        # Logo, supported/default languages and footer destinations
  translations.json
assets/
  brand/logo.png
  pizza-layers/    # Transparent assembly-layer images
  products/        # Catalogue images
docs/
  data-contract.md
  verification.md
```

`data/animation.json`, `data/products.json`, `data/site.json` and `data/translations.json` are the current static data source. The UI iterates the configured product and layer arrays; the data model is not defined as exactly three products, three sizes per product or seven layers. The current demo configuration happens to contain three products and seven layers.

## V2 functionality implemented
- **Pizza story:** A sticky, scroll-driven layer assembly/exploded view. The current seven ordered layers are crust, sauce, cheese, pepperoni, sausage, vegetables and olives. Layer positions, widths, stage length, color stops and transition parameters are configured in JSON. Captions follow the configured layers; desktop parallax, mobile behavior, the final CTA and reduced-motion handling are implemented.
- **Catalogue:** Pepperoni, Hawaiian and Supreme cards with selectable Personal, Medium and Large sizes. Prices are demonstration MYR values, stored as integer sen in `priceMinor`:
  - Pepperoni: RM 19.90 / 32.90 / 42.90
  - Hawaiian: RM 21.90 / 34.90 / 44.90
  - Supreme: RM 23.90 / 36.90 / 48.90
- **Languages:** Chinese (`zh`), English (`en`) and Malay (`ms`) text is data-driven. The selected language is stored as `ph_lang` in localStorage.
- **Cart:** Add items, change quantities, remove items, calculate totals, persist to `ph_cart`, and show the add-to-cart flying image. The cart reads the earlier array format and stores the V2 versioned format when updated.
- **Demo checkout:** The client validates that name and phone are nonempty, then shows an explicitly marked demo confirmation and clears the local cart. It does not send an order, contact a server, charge a customer or verify stock.
- **Assets and hosting:** Images are separate local files. Stylesheet, modules, data and image URLs are relative so the static site can be hosted under a repository subpath. Since the app fetches JSON, use an HTTP server for local development rather than opening `index.html` with `file://`.

Run locally from the repository root with:
```text
python -m http.server --bind 127.0.0.1 8000
```
Then open `http://127.0.0.1:8000/`. The data format and local provider are described in `docs/data-contract.md`; recorded verification scope and limitations are in `docs/verification.md`.

## Future backend and admin direction — not implemented
- Keep the public site's data-provider boundary replaceable so a future provider can return the same validated schema from an API. Do not build a fake live API as part of the static V2 site.
- A future owner/admin experience may manage localized content, products, prices, sizes, images, availability, promotions, layer order and animation parameters, with draft/preview/publish and server-side validation.
- Authentication, authorization, uploads, publishing and any real order/price verification must be enforced by a backend. Do not put private credentials or service-role keys in browser files.
- Each future client must have its own authorized admin and hard-separated database, storage, backups and credentials. Do not mix client data or hardcode shared secrets. A reusable codebase is acceptable; shared client data or credentials are not.
- No backend stack has been selected. GitHub Pages serves static files and is not the private backend for this project.
- Real orders, payments, user registration or production checkout require separate requirements and approval. If introduced, totals and order validity must be checked server-side.

## Confirmed preservation and safety requirements
- Preserve the current visual style, imagery, transparent layer alignment, animation behavior, captions, background transitions, CTA, responsive behavior and reduced-motion support unless a visible change is explicitly approved.
- Preserve the three current products, their size choices and demo prices, all three languages, cart behavior and demo-only checkout disclosure.
- Do not invent official Pizza Hut prices, offers, product claims or brand authorization. Keep the site clearly identified as a non-official practice/demo project.
- Treat future external or admin-managed text as untrusted; render it safely with DOM APIs and `textContent` rather than injecting it as HTML.
- Keep animation work modest and scroll updates on `requestAnimationFrame`. Preserve keyboard focus visibility; ask before visible modal, focus or validation behavior changes.

## Maintenance priorities
- Avoid regressions in the implemented experience and keep data, UI and assets separate.
- Validate relative paths at a repository subpath and run fetch-based development over HTTP.
- For behavior changes, test the affected desktop/mobile interactions, language, sizes/prices, cart persistence, demo checkout and reduced-motion behavior as applicable. Report browser/device coverage and untested items accurately.
- Do not add a framework, build system, server, authentication, payment processor, database or third-party tracking without separate approval.
