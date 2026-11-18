# Static data contract

Run `python -m http.server --bind 127.0.0.1 8000` in the repository and open `http://127.0.0.1:8000/`. The ES modules load JSON over HTTP. Asset paths start at the repository directory and resolve relative to the data provider module.

* `data/products.json` declares schema version 1, currency MYR and an ordered products array. Each product has a permanent ID, image path, defaultSizeId and ordered sizes. Each size has its own permanent ID, display label and integer priceMinor in sen. The same ID must keep the same meaning when entries move.
* `data/translations.json` contains one dictionary per language. UI keys correspond to data-t attributes or programmatic labels. Each dictionary contains products indexed by product ID (name and description) and captions indexed by layer name (title and description).
* `data/animation.json` lists layers from bottom to top. Each entry has a stable name, image src and x/y/w in percentages of the square stage. Preserve transparent margins. The timeline spans one unit per layer. stageVh sets scroll height per unit, ctaLead sets the distance from the end to CTA reveal, and the RGB stops span the full timeline. entryLead, entryDuration, opacityGain and the two drop distances govern layer arrival.
* `data/site.json` declares the demo mode, logo, default and supported languages and footer destinations. Supply translations for every supported language.

To add a product or layer, update its ordered array, supply the image and add its text to each language. Reordering sizes does not change stored V2 carts. Legacy size indices 0/1/2 map to personal/medium/large.

The UI consumes the result of loadSiteData() in js/data-source.js. A future provider can request published JSON from an API and validate it before returning the same model. Admin authentication, authorization and draft publication belong on the server. Each client owns separate admin access, database, storage, backups and credentials. Browser files contain only public content. Checkout currently validates fields locally and clears the demo cart.
