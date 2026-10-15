// Lab 2 (Oct 15), panel B: the resistor ladder. From cfgB. No "Show result": every result shows on Next.
// 2026-10-12, James: the 220 strips were not pulled from the bags; just say stop at 330.
const PART='B',CROP=312;
const PT={l:{t:'L',a:'58c',k:'57c'},w:{t:'W',a:'57a',b:'-57'}};
const V={r100:['100K',.07],r10:['10K',.7],r51:['5.1K',1.37],r2:['2K',3.5],r1:['1K',7],r330:['330',21.2]};
for(const k in V)PT[k]={t:'R',a:'+58',b:'58a',v:V[k][0]};
const F=(i,r)=>[{p:['B+','R:'+r,'L:l','W:w','B-'],i}];
const fm=i=>i<1?i.toFixed(2):i<5?i.toFixed(1):Math.round(i);
const rung=(k,prev,t,d)=>({t,d,rm:[prev],add:[k],lit:{l:V[k][1]},fl:F(V[k][1],k),ro:`7 V ÷ ${V[k][0]=='5.1K'?'5,100':V[k][0]=='330'?'330':(parseFloat(V[k][0])*1000).toLocaleString('en-US')} Ω = ${fm(V[k][1])} mA`,hi:['s58']});
const S=[
{t:'Start from first light',d:'The Kit Day circuit: 1K from the + row above strip 58 to 58a, red LED long leg 58c, short leg 57c, black jumper from 57a to the − row. The LED takes about 2 V; the 1K gets the other 7 V. Before you swap anything, guess: which resistor will be dimmest, which brightest?',add:['r1','l','w'],pw:1,lit:{l:7},fl:F(7,'r1'),ro:'7 V ÷ 1,000 Ω = 7 mA',hi:['s58','s57']},
rung('r100','r1','Rung 1: 100K','Power off (lift the + jumper), swap in the 100K, power on. It looks dark. Cup your hands around it: a faint glow. Dark isn\'t zero.'),
rung('r10','r100','Rung 2: 10K','Power off, swap in the 10K, power on. Dim.'),
rung('r51','r10','Rung 3: 5.1K (optional)','Power off, swap in the 5.1K, power on. Dim to medium.'),
rung('r2','r51','Rung 4: 2K','Power off, swap in the 2K, power on. Clearly on.'),
rung('r1','r2','Rung 5: 1K','Power off, swap in the 1K, power on. Bright.'),
rung('r330','r1','Rung 6: 330','Power off, swap in the 330, power on. Brightest. Less resistance, more current, more light.'),
{t:'Three times the current',d:'Swap between the 1K and the 330 a few times. The 330 passes three times the current. Does it look three times brighter?',ix:'ab',calc:s=>s.ab?{add:['r330'],rm:['r1'],lit:{l:21.2},fl:F(21.2,'r330'),ro:'330: 21 mA, 3× the current of the 1K'}:{add:['r1'],rm:['r330'],lit:{l:7},fl:F(7,'r1'),ro:'1K: 7 mA'}},
{t:'Only somewhat brighter',d:'The LED really does put out about three times the light (Mims p. 67), but your eyes judge brightness by ratios, the same way your ears judge loudness. Sound familiar? It\'s the decibel idea from the first half of the course.',rm:['r1'],add:['r330'],lit:{l:21.2},fl:F(21.2,'r330'),ro:'330: 21 mA',hi:['s58']},
{t:'Stop at 330',d:'Nothing smaller. Leave the 220 strip in the bag: it would push about 32 mA through the LED, more than it\'s made for (about 20 mA). The 330 gives 21 mA: the brightest that\'s safe.',lit:{l:21.2},fl:F(21.2,'r330'),ro:'7 V ÷ 220 Ω = 32 mA: too much · 7 V ÷ 330 Ω = 21 mA',hi:['s58']}];
