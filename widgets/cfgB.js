const PART='B';
const PT={l:{t:'L',a:'58c',k:'57c'},w:{t:'W',a:'57a',b:'-57'}};
const V={r100:['100K',.07],r10:['10K',.7],r51:['5.1K',1.37],r2:['2K',3.5],r1:['1K',7],r330:['330',21.2]};
for(const k in V)PT[k]={t:'R',a:'+58',b:'58a',v:V[k][0]};
const F=(i,r)=>[{p:['B+','R:'+r,'L:l','W:w','B-'],i}];
const fm=i=>i<1?i.toFixed(2):i<5?i.toFixed(1):Math.round(i); // fixed 2026-10-02: 2K now reads 3.5 mA, not 4
const rung=(k,prev,t,d,extra)=>Object.assign({t,d,rm:[prev],add:[k],lit:{l:V[k][1]},fl:F(V[k][1],k),ro:`7 V ÷ ${V[k][0]=='5.1K'?'5,100':V[k][0]=='330'?'330':(parseFloat(V[k][0])*1000).toLocaleString('en-US')} Ω = ${fm(V[k][1])} mA`,hi:['s58']},extra||{});
const S=[
{t:'Start from first light',d:'Same circuit as part A: red LED, 1K. Before you swap anything, predict the order from dimmest to brightest: 330, 10K, 1K, 100K, 2K, 5.1K. Write it down.',add:['r1','l','w'],pw:1,lit:{l:7},fl:F(7,'r1'),ro:'7 V ÷ 1,000 Ω = 7 mA'},
rung('r100','r1','Rung 1: 100K','Power off (lift the + jumper), swap in the 100K, power on.',{q:'lit or dark?',why:'It looks dark. Cup your hands around it or kill the room lights: it\'s glowing faintly. Dark isn\'t zero.'}),
rung('r10','r100','Rung 2: 10K','Power off, swap in the 10K, power on. Dim.'),
rung('r51','r10','Rung 3: 5.1K (optional)','Power off, swap in the 5.1K, power on. Dim to medium.'),
rung('r2','r51','Rung 4: 2K','Power off, swap in the 2K, power on. Clearly on.'),
rung('r1','r2','Rung 5: 1K','Power off, swap in the 1K, power on. Bright.'),
rung('r330','r1','Rung 6: 330','Power off, swap in the 330, power on. Brightest. Stop here.'),
{t:'Three times the current',d:'Swap between 1K and 330 a few times. The 330 passes three times the current. Does it look three times brighter?',ix:'ab',calc:s=>s.ab?{add:['r330'],rm:['r1'],lit:{l:21.2},fl:F(21.2,'r330'),ro:'330: 21 mA, 3× the current of the 1K'}:{add:['r1'],rm:['r330'],lit:{l:7},fl:F(7,'r1'),ro:'1K: 7 mA'}},
{t:'Why stop at 330?',d:'The next value down is 220; those strips went to James on Kit Day.',q:'how much current would 220 pass?',keep:1,lit:{l:21.2},fl:F(21.2,'r330'),ro:'7 V ÷ 220 Ω = 32 mA',why:'32 mA. The LED is rated about 20 mA (max about 25 to 30), so 220 is too much. 330 gives 21 mA: normal operation, just the brightest allowed. Nothing below 330 in series with one LED at 9 V.'}];
