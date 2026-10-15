// Lab 2 (Oct 15), panel E: three LEDs in one loop (series, #8). From cfgC C1-C7, from scratch.
const PART='E',CROP=312;
const PT={r:{t:'R',a:'+60',b:'60a',v:'330'},l1:{t:'L',a:'60c',k:'58c'},l2:{t:'L',a:'58e',k:'56e'},l3:{t:'L',a:'56c',k:'54c'},w:{t:'W',a:'54a',b:'-54'},
byp:{t:'W',a:'58a',b:'56a',c:'o',q:[292,96]}};
const F=(i,...a)=>({p:['B+',...a,'B-'],i});
const S=[
{t:'1. The 330',d:'Power off, and the board clear except the − battery jumper. One leg in the + row above strip 60, the other in 60a. It hops over the − row.',clr:1,pw:0,add:['r'],hi:['s60']},
{t:'2. LED 1',d:'Long leg 60c, short leg 58c.',add:['l1'],hi:['s60','s58']},
{t:'3. LED 2',d:'Long leg 58e, short leg 56e. It shares strip 58 with LED 1\'s short leg.',add:['l2'],hi:['s58','s56']},
{t:'4. LED 3',d:'Long leg 56c, short leg 54c.',add:['l3'],hi:['s56','s54']},
{t:'5. The black jumper',d:'From 54a to the − row. Predict: will all three light?',pause:1,add:['w'],hi:['s54']},
{t:'Power on: one path',d:'All three light. Every LED sits in the same single loop, so the same current goes through all three. Each LED takes its 2 V toll.',pw:1,lit:{l1:9.1,l2:9.1,l3:9.1},fl:[F(9.1,'R:r','L:l1','L:l2','L:l3','W:w')],ro:'9 V − (3 × 2 V) = 3 V left · 3 V ÷ 330 Ω = 9 mA',hi:['s60','s58','s56','s54']}];
