import {$,$$,ls,template} from './dom.js';
export function setupLanguage(site,translations,layers,refresh){
 let lang=ls('ph_lang');
 if(!site.languages.includes(lang))lang=site.defaultLanguage;
 function render(){
  const t=translations[lang];document.documentElement.lang=lang;
  for(const node of $$('[data-t]'))node.textContent=t[node.dataset.t];
  const caps=$('#caps');caps.replaceChildren();
  for(const layer of layers){
   const cap=template('<div class="cap"><h3></h3><p></p></div>'), copy=t.captions[layer.name];
   cap.firstChild.textContent=copy.title;cap.lastChild.textContent=copy.description;caps.append(cap);
  }
  for(const b of $$('.lang button'))b.setAttribute('aria-pressed',b.dataset.l===lang);
  refresh(t);
 }
 for(const b of $$('.lang button'))b.onclick=()=>{lang=b.dataset.l;ls('ph_lang',lang);render()};
 render();
}
