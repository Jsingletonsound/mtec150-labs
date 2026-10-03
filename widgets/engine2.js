function part(p,s){const g=E('g',{});
if(p.t=='R'){const[ax,ay]=P(p.a),[bx,by]=P(p.b);let cx,cy,an;
if(ax==bx){const x=ax+(p.o||-18);E('path',{d:`M${ax} ${ay}C${ax} ${ay-8} ${x} ${ay-6} ${x} ${ay+8}L${x} ${by-10}C${x} ${by-2} ${bx} ${by-6} ${bx} ${by}`,...LEG},g);cx=x;cy=(ay+by)/2;an=90;p.fp=[[ax,ay],[x,ay+8],[x,by-10],[bx,by]]}
else{const l=p.l??-10;E('path',{d:`M${ax} ${ay}L${ax+6} ${ay+l}L${bx-6} ${by+l}L${bx} ${by}`,...LEG},g);cx=(ax+bx)/2;cy=(ay+by)/2+l;an=Math.atan2(by-ay,bx-ax)*57.3;p.fp=[[ax,ay],[ax+6,ay+l],[bx-6,by+l],[bx,by]]}
const b=E('g',{transform:`rotate(${an} ${cx} ${cy})`},g);
E('rect',{x:cx-23,y:cy-7,width:46,height:14,rx:6,fill:'#85B7EB',stroke:'#185FA5','stroke-width':.5},b);
[...BANDS[p.v]].forEach((c,i)=>E('rect',{x:cx-17+i*6+(i>3?6:0),y:cy-7,width:3,height:14,fill:BC[c]},b))}
else if(p.t=='L'){const[ax,ay]=P(p.a),[kx,ky]=P(p.k),vx=kx-ax,vy=ky-ay,L=Math.hypot(vx,vy),ux=vx/L,uy=vy/L;let nx=uy,ny=-ux;if(ny>0){nx=-nx;ny=-ny}if(p.dn){nx=-nx;ny=-ny}
const cx=(ax+kx)/2+nx*21,cy=(ay+ky)/2+ny*21,b=br(s.I||0);
E('path',{d:`M${ax} ${ay}L${ax+nx*10-ux*7} ${ay+ny*10-uy*7}L${cx-ux*11} ${cy-uy*11}`,...LEG},g);
E('path',{d:`M${kx} ${ky}L${cx+ux*10} ${cy+uy*10}`,...LEG},g);
if(b)E('circle',{cx,cy,r:27,fill:'#FF6A55',opacity:(b*.8).toFixed(2),class:s.ch?'lit':''},g);
E('circle',{cx,cy,r:12,fill:mix([232,176,172],[242,60,50],b),stroke:'#A32D2D','stroke-width':1},g);
if(b>.3)E('circle',{cx:cx-4,cy:cy-4,r:3,fill:'#fff',opacity:.7},g);
p.fp=[[ax,ay],[cx,cy],[kx,ky]]}
else if(p.t=='W'){let[ax,ay]=P(p.a);const[bx,by]=P(p.b),q=p.q;if(p.lo&&!s.tap){const o=p.lov||[12,-18];ax+=o[0];ay+=o[1]}
const col={k:'#2C2C2A',r:'#D83A34',o:'#EF9F27'}[p.c||'k'];
const V=p.via||[];E('path',{d:q?`M${ax} ${ay}Q${q[0]} ${q[1]} ${bx} ${by}`:`M${ax} ${ay}`+V.map(v=>`L${v[0]} ${v[1]}`).join('')+`L${bx} ${by}`,'stroke-linejoin':'round',fill:'none',stroke:col,'stroke-width':4.5,'stroke-linecap':'round','stroke-dasharray':p.c=='o'?'8 6':'none'},g);
E('circle',{cx:ax,cy:ay,r:3.6,fill:'#2C2C2A'},g);E('circle',{cx:bx,cy:by,r:3.6,fill:'#2C2C2A'},g);
p.fp=q?[0,.25,.5,.75,1].map(t=>[(1-t)**2*ax+2*t*(1-t)*q[0]+t*t*bx,(1-t)**2*ay+2*t*(1-t)*q[1]+t*t*by]):[[ax,ay],...V,[bx,by]]}
else if(p.t=='B'){const L=p.g.map(P),cx=(L[0][0]+L[1][0])/2,cy=(L[0][1]+L[2][1])/2;
L.forEach(([x,y])=>E('line',{x1:x,y1:y,x2:x+(x<cx?6:-6),y2:y+(y<cy?6:-6),...LEG},g));
E('rect',{x:cx-26,y:cy-20,width:52,height:40,rx:4,fill:'#5F5E5A',stroke:'#2C2C2A'},g);
E('circle',{cx,cy,r:s.pr?11:13,fill:s.pr?'#2C2C2A':'#B4B2A9',stroke:'#2C2C2A'},g);
g.id='btn';g.style.cursor='pointer';p.fp=[L[0],[cx,cy],L[3]]}
else if(p.t=='K'){const L=p.g.map(P),[cx,y0]=L[1],a=-135+270*(s.pot??1);
L.forEach(([x,y])=>E('line',{x1:x,y1:y,x2:x,y2:y-12,...LEG},g));
E('rect',{x:cx-44,y:y0-52,width:88,height:40,rx:4,fill:'#378ADD',stroke:'#185FA5'},g);
const k=E('g',{transform:`rotate(${a} ${cx} ${y0-32})`},g);
E('circle',{cx,cy:y0-32,r:15,fill:'#F1EFE8',stroke:'#888780'},k);
E('line',{x1:cx,y1:y0-32,x2:cx,y2:y0-45,stroke:'#2C2C2A','stroke-width':2.5,'stroke-linecap':'round'},k);
p.fp=[L[0],[cx,y0-32],L[1]]}
else if(p.t=='Z'){const[ax,ay]=P(p.a),[bx,by]=P(p.b),cx=(ax+bx)/2,cy=ay-30;
E('path',{d:`M${ax} ${ay}L${cx-20} ${cy+17}`,...LEG},g);E('path',{d:`M${bx} ${by}L${cx+20} ${cy+17}`,...LEG},g);
E('circle',{cx,cy,r:27,fill:'#2C2C2A'},g);E('circle',{cx,cy,r:5,fill:'#5F5E5A'},g);
E('circle',{id:'rg',cx,cy,r:27,fill:'none',stroke:'#BA7517','stroke-width':3,opacity:0},g);
p.fp=[[ax,ay],[cx,cy],[bx,by]]}
return g}
function route(tk,sw){const o=[];tk.forEach(t=>{let q;
if(t=='B+'){const y=sw?68:42;q=[[30,156],[30,y],[148,y]]}
else if(t=='B-'){const y=sw?42:68;q=[[148,y],[56,y],[56,156]]}
else if(t.includes(':')){q=PT[t.slice(2)].fp.slice();const l=o[o.length-1];if(l&&D(l,q[q.length-1])<D(l,q[0]))q.reverse()}
else q=[P(t)];o.push(...q)});return o}
