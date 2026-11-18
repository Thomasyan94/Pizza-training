import {$,$$,clamp} from './dom.js';
export function setupAnimation(animation){
const stage=$('#stage'),sec=$('#story'),sticky=$('#sticky');

const layers = animation.layers;
const length = layers.length;
sec.style.height = length * animation.stageVh + 'vh';
for (const layer of layers) {
  const img = document.createElement('img');
  img.className = 'ly';
  img.alt = '';
  img.src = layer.src;
  Object.assign(img.style,{left:layer.x+'%',top:layer.y+'%',width:layer.w+'%'});
  stage.append(img);
}
const els=$$('.ly');
const mq=q=>matchMedia(q).matches;
let mob=mq('(max-width:768px)'),calm=mq('(prefers-reduced-motion:reduce)'),mx=0,my=0,tick=false;
const ST=animation.colors;
const easeB=x=>1+2.4*Math.pow(x-1,3)+1.4*Math.pow(x-1,2),easeC=x=>1-Math.pow(1-x,3);
function render(){
  tick=false;
  const total=sec.offsetHeight-innerHeight,p=clamp(-sec.getBoundingClientRect().top/total,0,1),t=p*length,H=stage.offsetHeight;
  els.forEach((el,k)=>{
    const e=k?clamp((t-(k-animation.entryLead))/animation.entryDuration,0,1):1,m=mob||calm?easeC(e):easeB(e);
    const y=calm?0:-(1-m)*H*(mob?animation.mobileDrop:animation.desktopDrop),d=k/Math.max(1,length-1);
    el.style.transform=`translate3d(${mob?0:mx*d*14}px,${y+(mob?0:my*d*8)}px,0)`;
    el.style.opacity=k?Math.min(1,e*animation.opacityGain):1;
  });
  const i=clamp(Math.floor(t+.5),0,length-1);
  $$('.cap').forEach((c,k)=>c.classList.toggle('on',k===i));
  sticky.classList.toggle('done',t>=length-animation.ctaLead);
  const a=Math.min(ST.length-2,Math.floor(t*(ST.length-1)/length)),f=clamp(t*(ST.length-1)/length-a,0,1),A=ST[a],B=ST[a+1];
  const c=A.map((v,j)=>v+(B[j]-v)*f);
  sticky.style.background=`radial-gradient(60% 55% at 70% 55%,rgb(${c.map(v=>Math.round(v*1.5))}),rgb(${c.map(Math.round)}))`;
}
const req=()=>{if(!tick){tick=true;requestAnimationFrame(render)}};
addEventListener('scroll',req,{passive:true});
addEventListener('resize',()=>{mob=mq('(max-width:768px)');req()});
sticky.addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;req()});
return render;
}
