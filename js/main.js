import {loadSiteData} from './data-source.js';
import {setupAnimation} from './animation.js';
import {setupCart} from './cart.js';
import {setupCatalog} from './catalog.js';
import {setupLanguage} from './i18n.js';
try {
  const {products,animation,translations,site}=await loadSiteData();
  document.querySelector('#logo').src=site.logo;
  document.querySelector('footer a[href^="tel:"]').href=site.telephone;
  document.querySelector('footer a[target]').href=site.website;
  let words=translations[site.defaultLanguage];
  const renderAnimation=setupAnimation(animation);
  const cart=setupCart(products,()=>words);
  const renderCatalog=setupCatalog(products,cart.add);
  setupLanguage(site,translations,animation.layers,next=>{
    words=next;
    renderCatalog(words);
    cart.drawCart();
    renderAnimation();
  });
} catch(error) {
  console.error(error);
  document.querySelector('h1').textContent='页面加载失败，请刷新重试。';
}
