// Lab 2 (Oct 15), panel G: the bypass jumper (#10). From cfgC C9; starts from E's lit string.
// 2026-10-14, James: the jumper goes in with the power off (predict), then power on shows the result.
// The lesson he wants named: electricity takes the path of least resistance, and this is the proof.
const PART='G',CROP=312;
const PT={r:{t:'R',a:'+60',b:'60a',v:'330'},l1:{t:'L',a:'60c',k:'58c'},l2:{t:'L',a:'58e',k:'56e'},l3:{t:'L',a:'56c',k:'54c'},w:{t:'W',a:'54a',b:'-54'},
byp:{t:'W',a:'58a',b:'56a',c:'o',q:[292,96]}};
const F=(i,...a)=>({p:['B+',...a,'B-'],i});
const S=[
{t:'Start: three LEDs in one loop',d:'The string from E, all lit, LED 2 back in.',add:['r','l1','l2','l3','w'],pw:1,lit:{l1:9.1,l2:9.1,l3:9.1},fl:[F(9.1,'R:r','L:l1','L:l2','L:l3','W:w')],ro:'9 V − (3 × 2 V) = 3 V left · 3 V ÷ 330 Ω = 9 mA',hi:['s60','s58','s56','s54']},
{t:'1. A jumper from 58 to 56, power off',d:'Power off. Add a jumper (orange in the drawing) from 58a to 56a. Now the electricity has two ways from strip 58 to strip 56: through LED 2, or through the jumper. Predict: when the power comes back on, which way will it go, and what happens to each LED?',pause:1,add:['byp'],pw:0,hi:['s58','s56']},
{t:'Power on: the path of least resistance',d:'LED 2 goes dark. All the electricity goes through the jumper instead. LED 2 charges a 2 V toll, and the jumper charges no toll at all. Electricity takes the path of least resistance, and that dark LED is the proof. LEDs 1 and 3 get brighter: two tolls instead of three, so 9 mA becomes 15 mA.',pw:1,lit:{l1:15.2,l3:15.2},fl:[F(15.2,'R:r','L:l1','W:byp','L:l3','W:w')],ro:'(9 V − 4 V) ÷ 330 Ω = 15 mA',hi:['s60','s58','s56','s54']}];
