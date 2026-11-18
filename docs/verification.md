# V2 verification

Reference: Git commit 262ba89. Tests used a temporary loopback HTTP server and isolated headless Microsoft Edge profiles on Windows. The original source and final modules were served under equivalent URLs.

* After extraction, after JSON separation and after module separation, compared the intrinsic sizes of all eleven images, three product names, all nine displayed prices, three language selections, cart increments/decrements/removal, empty checkout state, missing-field error and successful demo view against the original. All matched. Extracted image bytes were compared with decoded originals.
* Compared thirteen scroll samples including reverse travel and both sides of the CTA threshold. Checked every layer's transform and opacity, active caption, sticky background, completion class and sticky grid columns. Tested site root and a simulated repository subpath. Comparisons passed at measured viewport widths 504, 738, 739, 869, 870 and 1336 CSS pixels, including reduced motion at 738 and 1336. Also verified the 768, 769, 899 and 900 pixel boundaries.
* With persisted English and two legacy Hawaiian Medium items, checked drawer contents, RM 69.80 total, quantity change, initial close-button focus, Escape and return focus against the original.
* A temporary HTTP fixture added a fourth product with two sizes and an eighth layer. Starting with malformed cart JSON, added two items and reloaded. Checked four cards, eight layers/captions, two size buttons, literal markup in the product name, two saved items, RM 65.80, persisted Malay and cart version 2. The published demo JSON was untouched by this fixture.

These are DOM, style and interaction comparisons. The runs did not verify pixel screenshots, external font delivery, real touch devices, Safari/Firefox, or manually observe the flying image trajectory. GitHub Pages was simulated locally.
