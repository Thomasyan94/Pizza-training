const root = new URL('../', import.meta.url);

async function read(name) {
  const response = await fetch(new URL('data/' + name + '.json', root));
  if (!response.ok) throw new Error('Cannot load ' + name);
  return response.json();
}

function asset(path) {
  if (!/^assets\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.(?:png|webp)$/.test(path)) {
    throw new Error('Invalid image path');
  }
  return new URL(path, root).href;
}

export async function loadSiteData() {
  const [catalog, translations, animation, site] = await Promise.all(
    ['products', 'translations', 'animation', 'site'].map(read)
  );
  const products = catalog.products;
  const unique = entries => new Set(entries.map(entry => entry.id)).size === entries.length;
  if (catalog.schemaVersion !== 1 || catalog.currency !== 'MYR' || site.mode !== 'demo' ||
      !site.languages.includes(site.defaultLanguage) || !unique(products)) throw new Error('Invalid catalog');
  for (const product of products) {
    product.image = asset(product.image);
    if (!unique(product.sizes) || !product.sizes.some(size => size.id === product.defaultSizeId) ||
        !product.sizes.every(size => Number.isSafeInteger(size.priceMinor) && size.priceMinor >= 0)) {
      throw new Error('Invalid product sizes');
    }
  }
  if (!animation.layers.length || !Array.isArray(animation.colors) || animation.colors.length < 2 ||
      !animation.colors.every(color => color.length === 3 && color.every(v => Number.isInteger(v) && v >= 0 && v <= 255))) {
    throw new Error('Invalid animation colors or layers');
  }
  for (const key of ['stageVh','entryDuration','opacityGain','entryLead','desktopDrop','mobileDrop','ctaLead']) {
    if (!Number.isFinite(animation[key]) || animation[key] < 0) throw new Error('Invalid animation parameter: ' + key);
  }
  if (!animation.stageVh || !animation.entryDuration) throw new Error('Invalid timeline duration');
  for (const language of site.languages) {
    const words = translations[language];
    const pairs = [...products.map(p => words.products[p.id]), ...animation.layers.map(l => words.captions[l.name])];
    if (!pairs.every(pair => typeof pair?.description === 'string' && typeof (pair.name ?? pair.title) === 'string')) {
      throw new Error('Missing translation for ' + language);
    }
  }
  if (new URL(site.website).protocol !== 'https:' || !/^tel:\+?[0-9]+$/.test(site.telephone)) throw new Error('Invalid contact links');
  site.logo = asset(site.logo);
  for (const layer of animation.layers) {
    layer.src = asset(layer.src);
    if (![layer.x, layer.y, layer.w].every(value => Number.isFinite(value) && value >= 0 && value <= 100)) throw new Error('Invalid layer geometry');
  }
  return {products, translations, animation, site};
}
