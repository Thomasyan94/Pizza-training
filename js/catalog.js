import {$,money,template} from './dom.js';
export function setupCatalog(products,add){
 const selection=new Map(products.map(p=>[p.id,p.defaultSizeId]));
 return function render(words){
  const cards=$('#cards');cards.replaceChildren();
  for(const product of products){
   const card=template('<article class="card"><div class="ph"><img></div><h3></h3><p></p><div class="sz" role="radiogroup"></div><div class="row"><span class="pr"></span><button class="btn add"></button></div></article>');
   card.dataset.id=product.id;
   const img=card.querySelector('img'), copy=words.products[product.id];
   img.src=product.image;img.alt=copy.name;
   card.querySelector('h3').textContent=copy.name;card.querySelector('p').textContent=copy.description;
   const sizes=card.querySelector('.sz');
   sizes.style.gridTemplateColumns='repeat('+product.sizes.length+',1fr)';
   for(const size of product.sizes){
    const button=template('<button role="radio"></button>');button.textContent=size.label;
    const selected=selection.get(product.id)===size.id;
    button.setAttribute('aria-checked',selected);
    if(selected)card.querySelector('.pr').textContent=money(size.priceMinor);
    button.onclick=()=>{
     selection.set(product.id,size.id);
     for(const sibling of sizes.children)sibling.setAttribute('aria-checked',sibling===button);
     card.querySelector('.pr').textContent=money(size.priceMinor);
    };
    sizes.append(button);
   }
   const button=card.querySelector('.add');button.textContent=words.add;
   button.onclick=()=>add(product.id,selection.get(product.id),img);
   cards.append(card);
  }
 };
}
