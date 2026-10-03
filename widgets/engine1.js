const NS='http://www.w3.org/2000/svg',$=i=>document.getElementById(i);
const X=n=>148+36*(61-n),RY={a:126,b:156,c:186,d:216,e:246,f:294,g:324,h:354,i:384,j:414};
const P=h=>{if(Array.isArray(h))return h;const m=/^([+-]?)(\d+)([a-j]?)$/.exec(h);return[X(+m[2]),m[1]?(m[1]=='+'?42:68):RY[m[3]]]};
function E(t,a,p){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function T(p,x,y,s,f){const e=E('text',{x,y,class:'ts','text-anchor':'middle','dominant-baseline':'central',style:'fill:'+f},p);e.textContent=s;return e}
const BC={k:'#2C2C2A',n:'#7B4A26',r:'#D83A34',o:'#EF7F1A',g:'#3B9E4A'};
const BANDS={'330':'ookkn','1K':'nkkng','2K':'rkknn','5.1K':'gnknn','10K':'nkkrn','100K':'nkkon'};
const br=I=>I>0?Math.max(.04,Math.min(1,Math.log10(I/.05)/Math.log10(21.2/.05))):0;
const mix=(a,b,t)=>'rgb('+a.map((v,i)=>Math.round(v+(b[i]-v)*t)).join(',')+')';
const D=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const LEG={fill:'none',stroke:'#888780','stroke-width':2,'stroke-linecap':'round','stroke-linejoin':'round'};
function board(){const g=$('gb'),h=$('gH');
E('rect',{x:96,y:14,width:572,height:416,rx:8,fill:'#F4F2EC',stroke:'#B4B2A9'},g);
E('line',{x1:130,y1:26,x2:660,y2:26,stroke:'#E24B4A','stroke-width':2},g);
E('line',{x1:130,y1:84,x2:660,y2:84,stroke:'#378ADD','stroke-width':2},g);
E('line',{x1:96,y1:94,x2:668,y2:94,stroke:'#D3D1C7'},g);
E('rect',{x:96,y:262,width:572,height:16,fill:'#E4E2DA'},g);
T(h,646,42,'+','#A32D2D');T(h,646,68,'−','#185FA5');
[60,55,50].forEach(n=>T(h,X(n),108,n,'#5F5E5A'));
for(const r in RY)T(h,124,RY[r],r,'#5F5E5A');
const q=E('g',{fill:'#3d3d3a'},h);
for(let n=61;n>=48;n--)[42,68,...Object.values(RY)].forEach(y=>E('rect',{x:X(n)-3.5,y:y-3.5,width:7,height:7},q))}
function bat(pw,sw){const g=$('gA');g.innerHTML='';
E('rect',{x:16,y:160,width:54,height:94,rx:5,fill:'#2C2C2A'},g);
E('rect',{x:16,y:200,width:54,height:30,fill:'#EF9F27'},g);T(g,43,215,'9 V','#412402');
E('rect',{x:24,y:153,width:12,height:8,rx:2,fill:'#B4B2A9'},g);E('rect',{x:50,y:153,width:12,height:8,rx:2,fill:'#B4B2A9'},g);
const L=y=>y==42&&!pw?[-10,-20]:[0,0];
const lead=(x,y,c)=>{const[dx,dy]=L(y);E('path',{d:`M${x} 156V${y+dy}H${78+dx}`,fill:'none',stroke:c,'stroke-width':3,'stroke-linejoin':'round'},g)};
lead(56,sw?42:68,'#2C2C2A');lead(30,sw?68:42,'#E24B4A');
[68,42].forEach(y=>{const[dx,dy]=L(y),j=E('g',{transform:`translate(${dx} ${dy})`},g);
E('line',{x1:92,y1:y,x2:128,y2:y,stroke:'#1D9E75','stroke-width':4,'stroke-linecap':'round'},j);
E('rect',{x:126,y:y-4,width:16,height:8,rx:2,fill:'#2C2C2A'},j);
E('line',{x1:142,y1:y,x2:148,y2:y,stroke:'#888780','stroke-width':2},j);
E('rect',{x:76,y:y-6,width:18,height:12,rx:2,fill:'#888780'},j)})}
function hil(list){const g=$('gh');g.innerHTML='';(list||[]).forEach(h=>{
if(h=='R+')E('rect',{x:130,y:33,width:500,height:18,rx:4,fill:'#E24B4A',opacity:.16},g);
else if(h=='R-')E('rect',{x:130,y:59,width:500,height:18,rx:4,fill:'#378ADD',opacity:.18},g);
else{const lo=h[0]=='S',n=+h.slice(1);E('rect',{x:X(n)-12,y:lo?280:112,width:24,height:148,rx:4,fill:lo?'#AFA9EC':'#FAC775',opacity:lo?.5:.55},g)}})}
