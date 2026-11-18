import {$,ls,template,money} from './dom.js';
export function setupCart(products, words) {
const legacySizes=['personal','medium','large'];
const sizeOf=(id,sizeId)=>products.find(p=>p.id===id)?.sizes.find(s=>s.id===sizeId);
let cart=[];
try {
  const stored=JSON.parse(ls('ph_cart'));
  const rows=Array.isArray(stored) ? stored.map(row=>({productId:row?.id,sizeId:legacySizes[row?.s],quantity:row?.q})) : stored?.version===2 ? stored.items : [];
  cart=rows.filter(row=>row && sizeOf(row.productId,row.sizeId) && Number.isSafeInteger(row.quantity) && row.quantity>0);
} catch {}
function save(){ls('ph_cart',JSON.stringify({version:2,items:cart}))}
function count(){return cart.reduce((sum,row)=>sum+row.quantity,0)}
function add(productId,sizeId,img){
 const row=cart.find(row=>row.productId===productId && row.sizeId===sizeId);
 if(row)row.quantity++; else cart.push({productId,sizeId,quantity:1});
 save();fly(img);
}
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function badge(){const b=$('#badge');b.textContent=count();[b,$('#cartBtn')].forEach(n=>{n.classList.remove('bump');void n.offsetWidth;n.classList.add('bump')})}
function fly(img){
  const r=img.getBoundingClientRect(),c=$('#cartBtn').getBoundingClientRect(),f=document.createElement('img');
  f.src=img.src;f.className='fly';f.alt='';Object.assign(f.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});document.body.appendChild(f);
  const dx=c.left+c.width/2-(r.left+r.width/2),dy=c.top+c.height/2-(r.top+r.height/2);
  const a=f.animate([{transform:'none',opacity:1},{transform:`translate(${dx*.45}px,${dy*.45-130}px) scale(.55) rotate(150deg)`,opacity:1,offset:.5},{transform:`translate(${dx}px,${dy}px) scale(.06) rotate(360deg)`,opacity:.9}],{duration:calm?1:800,easing:'cubic-bezier(.45,0,.75,.6)'});
  a.onfinish=()=>{f.remove();badge()};
}

function drawCart(){
 const items=$('#items'), t=words();
 items.replaceChildren();
 let total=0;
 for(const row of cart){
  const product=products.find(p=>p.id===row.productId), size=sizeOf(row.productId,row.sizeId);
  const el=template('<div class="it"><img alt=""><div><b></b><small></small><br><button class="ghost" data-r></button></div><div class="q"><button data-m aria-label="−">−</button><span></span><button data-p aria-label="+">+</button></div></div>');
  el.querySelector('img').src=product.image;
  el.querySelector('b').textContent=t.products[product.id].name;
  el.querySelector('small').textContent=size.label+' · '+money(size.priceMinor);
  el.querySelector('[data-r]').textContent=t.rm;
  el.querySelector('span').textContent=row.quantity;
  el.addEventListener('click',e=>{
    if(e.target.hasAttribute('data-p'))row.quantity++;
    else if(e.target.hasAttribute('data-m'))row.quantity--;
    else if(e.target.hasAttribute('data-r'))row.quantity=0;
    else return;
    if(!row.quantity)cart.splice(cart.indexOf(row),1);
    save();drawCart();
  });
  items.append(el);total+=row.quantity*size.priceMinor;
 }
 if(!cart.length){const empty=template('<p class="empty"></p>');empty.textContent=t.empty;items.append(empty)}
 $('#badge').textContent=count();$('#tot').textContent=money(total);$('#go').disabled=!cart.length;
}
const root=document.documentElement,dr=$('#drawer');
function view(v){dr.className=v}
function open(b){root.classList.toggle('open',b);dr.setAttribute('aria-hidden',!b);if(b){view('v-cart');drawCart();$('#close').focus()}else $('#cartBtn').focus()}
dr.className='v-cart';
$('#cartBtn').onclick=()=>open(true);$('#close').onclick=$('#ov').onclick=()=>open(false);
addEventListener('keydown',e=>{if(e.key==='Escape')open(false)});
$('#go').onclick=()=>view('v-form');$('#back').onclick=()=>view('v-cart');
$('#again').onclick=()=>open(false);
$('#form').addEventListener('submit',e=>{
  e.preventDefault();
  if(!$('#nm').value.trim()||!$('#ph').value.trim()){$('#err').textContent=words().err;return}
  $('#err').textContent='';cart=[];save();$('#form').reset();drawCart();view('v-done');
});
return {add,drawCart};
}
