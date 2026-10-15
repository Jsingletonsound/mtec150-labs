// Lab 2 (Oct 15), panel K: make both LEDs light. NEW 2026-10-09 (Kit Day brief, NEW-3).
// 2026-10-15, James: a "your turn" task, routed with jumpers. The one 1K and the black jumper on 57 stay, no
// resistor is added. First the jumpers-only try James asked to see: LEDs left in place, a route down through the
// bottom rows and back into 57. That joins 58 to 57, G's bypass: both go dark. Then a step that says why (he asked
// for the reason in words): a jumper only joins places, so it can't split two LEDs that sit on the same two strips.
// Every jumper-only hookup was solved: J again, both dark, a battery short, or LEDs with no resistor (burnt out).
// Then the way that works: the red's short leg off 57 (the key move), the green below the gap, jumpers down at 59
// and back up into 57. One loop, so the red can't hog it. (The green at 59e/57e, top half, works too, with no
// jumpers: below the gap is the routing practice.) Uses the bottom half: no crop. Bench-test before class.
const PART='K';
const PT={r:{t:'R',a:'+58',b:'58a',v:'1K'},lr:{t:'L',a:'58c',k:'57c'},lg:{t:'L',a:'58e',k:'57e',c:'g'},w:{t:'W',a:'57a',b:'-57'},
t1:{t:'W',a:'58d',b:'58g',c:'r',q:[222,270]},t2:{t:'W',a:'58i',b:'57i',c:'r'},t3:{t:'W',a:'57g',b:'57d',q:[326,270]},
lr2:{t:'L',a:'58c',k:'59c'},lg2:{t:'L',a:'59i',k:'57i',c:'g'},
jd:{t:'W',a:'59d',b:'59g',c:'r',q:[190,270]},ju:{t:'W',a:'57g',b:'57d',q:[322,270]}};
const F=(i,...a)=>({p:['B+',...a,'B-'],i});
const BYPASS=[F(9,'R:r','W:t1','W:t2','W:t3','W:w')];
const S=[
{t:'Start: your turn',d:'Only the red lights, as in J. Your turn: make both light. No new resistor, and the 1K and the black jumper on 57 stay put. Keep jumpers off the + row: they would skip the 1K or short the battery. Power off while you work. Try just jumpers first, then press Next.',pause:1,add:['r','lr','lg','w'],pw:1,lit:{lr:7},fl:[F(7,'R:r','L:lr','W:w')],ro:'7 V ÷ 1,000 Ω = 7 mA, nearly all through the red',hi:['s58','s57']},
{t:'1. One try: jumpers only',d:'Power off. Leave the LEDs where they are. Route a path with jumpers: down from 58d to 58g, across from 58i to 57i, and back up from 57g to 57d. Predict: will both light?',pause:1,add:['t1','t2','t3'],pw:0,hi:['s58','S58','S57','s57']},
{t:'Power on: both go dark',d:'Both go dark. The three jumpers make one long wire from strip 58 to strip 57. That\'s G\'s bypass: a path with no toll, so the current skips both LEDs.',pw:1,fl:BYPASS,ro:'9 V ÷ 1,000 Ω = 9 mA, all through the jumpers',hi:['s58','S58','S57','s57']},
{t:'Why no jumper can do it',d:'A jumper only joins places. It can\'t split them. Both LEDs still sit on strips 58 and 57, so they always share one push: the red takes it all (J), or a jumper does (this). To light both, LED legs have to move, so the current goes through the red, then the green. Hint: get the red\'s short leg off strip 57. Try it, then press Next.',pause:1,fl:BYPASS,ro:'9 V ÷ 1,000 Ω = 9 mA, all through the jumpers',hi:['s58','s57']},
{t:'3. Swing the red LED\'s short leg',d:'Power off. Take out the three jumpers. Red LED: keep the long leg in 58c and move the short leg to 59c, one strip to the left. Now the red no longer lands on strip 57, so it can\'t send the current straight to the − row.',rm:['t1','t2','t3','lr'],add:['lr2'],pw:0,hi:['s58','s59']},
{t:'4. Move the green LED below the gap',d:'Long leg 59i, short leg 57i. Nothing reaches it down here yet.',rm:['lg'],add:['lg2'],hi:['S59','S57']},
{t:'5. A jumper down across the gap',d:'From 59d to 59g (any color: red here so you can follow it). The red LED\'s current can now cross the gap to the bottom half of strip 59, where the green LED\'s long leg is.',add:['jd'],hi:['s59','S59']},
{t:'6. A jumper back up to 57',d:'From 57g to 57d. Now the green LED\'s short leg reaches the top half of strip 57, and through it the black jumper to the − row. Predict: brighter or dimmer than the red alone in J?',pause:1,add:['ju'],hi:['S57','s57']},
{t:'Power on: both light',d:'Both light, a little dimmer than the red alone. The red goes from 58 to 59, the green from 59 to 57: one after the other, one loop. In J the two LEDs got the same push. Now they get the same current, so the red can\'t hog it.',pw:1,lit:{lr2:4.8,lg2:4.8},fl:[F(4.8,'R:r','L:lr2','W:jd','L:lg2','W:ju','W:w')],ro:'9 V − 2 V (red) − about 2.2 V (green) ≈ 4.8 V left · 4.8 V ÷ 1,000 Ω ≈ 5 mA through both',hi:['s58','s59','S59','S57','s57']}];
