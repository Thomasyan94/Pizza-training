export const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
export const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};

export function template(markup) {
  const node = document.createElement('template');
  node.innerHTML = markup; // Callers supply constant markup only.
  return node.content.firstElementChild;
}
export const money = amount => 'RM ' + (amount / 100).toFixed(2);
