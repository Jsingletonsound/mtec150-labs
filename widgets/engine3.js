let cur=0,rev=false,pv=new Set(),pl={},timer=null,play=null,AC,hp,cs,osc;const st={};
function au(){try{if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C();hp=AC.createBiquadFilter();hp.type='highpass';hp.frequency.value=300;const g=AC.createGain();g.gain.value=.25;hp.connect(g).connect(AC.destination);cs=AC.createConstantSource();cs.offset.value=0;cs.connect(hp);cs.start()}if(AC.state=='suspended')AC.resume();return AC}catch(e){return null}}
function edge(on){const a=au();if(a)cs.offset.setValueAtTime(on?1:0,a.currentTime)}
function auto(rate){try{if(osc){osc.stop();osc=null}if(rate){const a=au();if(!a)return;osc=a.createOscillator();osc.type='square';osc.frequency.value=rate;osc.connect(hp);osc.start()}}catch(e){}}
function ring(){const r=$('rg');if(!r)return;r.classList.remove('ring');r.getBoundingClientRect();r.classList.add('ring')}
function reset(){Object.assign(st,{pr:false,pot:0,sw:false,tap:false,ab:0,run:false,rate:4});if(timer){clearInterval(timer);timer=null}auto(0)}
function vis(i){let v=new Set();for(let k=0;k<=i;k++){const s=S[k];if(s.clr)v=new Set();(s.add||[]).forEach(x=>v.add(x));(s.rm||[]).forEach(x=>v.delete(x))}return v}
function inh(i,k,d){for(let j=i;j>=0;j--)if(S[j][k]!==undefined)return S[j][k];return d}
function res(s){if(s.q&&!rev&&!s.keep)return{lit:{},fl:[],ro:''};if(s.calc)return s.calc(st);return{lit:s.lit||{},fl:s.fl||[],ro:s.ro||''}}
function draw(an){const s=S[cur],pw=inh(cur,'pw',0),r=res(s),v=vis(cur);
(r.add||[]).forEach(x=>v.add(x));(r.rm||[]).forEach(x=>v.delete(x));bat(pw,st.sw);hil(s.hi);
const gp=$('gp');gp.innerHTML='';const nl={};
v.forEach(id=>{const p=PT[id],I=pw?(r.lit[id]||0):0;nl[id]=I;const g=part(p,{I,ch:an&&I>0&&(pl[id]||0)!=I,pr:st.pr,pot:st.pot,tap:st.tap});if(an&&!pv.has(id))g.setAttribute('class','pin');gp.appendChild(g)});
const gf=$('gf');gf.innerHTML='';
if(pw)r.fl.forEach(f=>{const q=route(f.p,st.sw),d=Math.max(.2,Math.min(3,.4*Math.pow(21/f.i,.45)));E('path',{d:'M'+q.map(z=>z[0].toFixed(1)+' '+z[1].toFixed(1)).join('L'),class:'flow',style:'--d:'+d.toFixed(2)+'s'},gf)});
const gx=$('gx');gx.innerHTML='';if(s.x&&rev){const[x,y]=s.x;E('path',{d:`M${x-8} ${y-8}L${x+8} ${y+8}M${x+8} ${y-8}L${x-8} ${y+8}`,stroke:'#E24B4A','stroke-width':4,'stroke-linecap':'round'},gx)}
$('ro').textContent=r.ro||'';pv=v;pl=nl;
const b=$('btn');if(b&&s.ix=='hold')b.onpointerdown=e=>{e.preventDefault();press(true)}}
function press(on){if(st.pr==on)return;st.pr=on;draw(false)}
function tap(on){if(st.tap==on)return;st.tap=on;draw(false);edge(on);if(on)ring()}
function loop(){if(timer){clearInterval(timer);timer=null}const ix=S[cur].ix;
if(ix=='flip'&&st.run)timer=setInterval(()=>{st.sw=!st.sw;draw(false)},1000/st.rate);
if(ix=='tap'){auto(st.run?st.rate:0);if(st.run)timer=setInterval(()=>{st.tap=!st.tap;draw(false);if(st.tap)ring()},Math.max(70,500/st.rate));else{st.tap=false;draw(false)}}}
function controls(s){const x=$('ix');x.innerHTML='';
const B=(l,f)=>{const b=document.createElement('button');b.innerHTML=l;if(f)b.onclick=f;x.appendChild(b);return b};
const H=(l,fn)=>{const b=B(l);b.onpointerdown=e=>{e.preventDefault();fn(true)};b.onkeydown=e=>{if(e.key==' '||e.key=='Enter'){e.preventDefault();fn(true)}};b.onkeyup=()=>fn(false);return b};
const Rg=(lab,mn,mx,val,fmt,on)=>{const w=document.createElement('label');w.style.cssText='display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary);flex:1;min-width:230px';w.append(lab);const r=document.createElement('input');r.type='range';r.min=mn;r.max=mx;r.step=1;r.value=val;r.style.flex='1';const o=document.createElement('span');o.style.cssText='min-width:56px;color:var(--text-primary)';o.textContent=fmt(val);r.oninput=()=>{on(+r.value);o.textContent=fmt(+r.value)};w.append(r,o);x.appendChild(w)};
if(s.q){const p=document.createElement('span');p.textContent='Predict first: '+s.q;x.appendChild(p);
B('Show result',function(){rev=true;this.remove();$('wy').textContent='Result: '+s.why;draw(true)})}
if(s.ix=='hold')H('Hold to press',press);
if(s.ix=='pot')Rg('Knob',0,100,0,v=>'pot '+((100-v)/10).toFixed(1)+'K',v=>{st.pot=v/100;draw(false)});
if(s.ix=='ab')B('Swap 1K and 330',()=>{st.ab^=1;draw(true)});
if(s.ix=='flip'){B('Flip the battery',()=>{st.sw=!st.sw;draw(false)});const t=B('Keep flipping',()=>{st.run=!st.run;t.textContent=st.run?'Stop':'Keep flipping';loop()});Rg('Flips per second',1,20,4,v=>v+' /s',v=>{st.rate=v;loop()})}
if(s.ix=='tap'){H('Hold to tap',tap);const t=B('Keep tapping',()=>{st.run=!st.run;t.textContent=st.run?'Stop':'Keep tapping';loop()});Rg('Taps per second',1,200,4,v=>v+' /s',v=>{st.rate=v;loop()})}}
window.addEventListener('pointerup',()=>{press(false);if(!st.run)tap(false)});
function go(i,an=true){if(i<0||i>=S.length)return;reset();cur=i;rev=false;const s=S[i];
$('tt').textContent=s.t;$('dd').textContent=s.d;$('wy').textContent='';
$('ct').textContent=(typeof PART!=='undefined'?PART+(i+1)+' · ':'')+`Step ${i+1} of ${S.length}`;$('pb').style.width=(100*(i+1)/S.length)+'%';controls(s);draw(an)}
function stop(){clearInterval(play);play=null;$('pl').innerHTML='<i class="ti ti-player-play" aria-hidden="true"></i> Play the build'}
$('pl').onclick=()=>{if(play)return stop();play=setInterval(()=>{const n=S[cur+1];if(!n)return stop();go(cur+1);if(n.q||n.ix)stop()},2400);$('pl').innerHTML='<i class="ti ti-player-pause" aria-hidden="true"></i> Pause'};
$('nx').onclick=()=>{stop();go(cur+1)};$('bk').onclick=()=>{stop();go(cur-1)};
board();go(0);
