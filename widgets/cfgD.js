const PART='D';
const PT={r:{t:'R',a:'+58',b:'58a',v:'1K'},l:{t:'L',a:'58c',k:'56c'},b:{t:'B',g:['56e','54e','56f','54f']},w:{t:'W',a:'54h',b:'-53',via:[[418,340],[418,100]]},
rj:{t:'W',a:'+57',b:'56a',c:'r'},k:{t:'K',g:['56c','55c','54c']},r3:{t:'R',a:'55e',b:'52e',v:'330',l:-12},l2:{t:'L',a:'52c',k:'51c'},w2:{t:'W',a:'51a',b:'-51'}};
const F=(i,...a)=>[{p:['B+',...a,'B-'],i}];
const S=[
{t:'Pushbutton: clear the board',d:'Power off. Pull everything except the − battery jumper.',clr:1,pw:0},
{t:'1. The 1K',d:'One leg in the + row above strip 58, the other in 58a.',add:['r'],hi:['s58']},
{t:'2. The LED',d:'Long leg 58c, short leg 56c.',add:['l'],hi:['s58','s56']},
{t:'3. The pushbutton, across the gap',d:'Legs in 56e, 54e, 56f and 54f. Press until all four legs are seated.',add:['b'],hi:['s56','S54']},
{t:'4. The black jumper',d:'From 54h to the − row. The loop goes in at strip 56 (top half) and out at strip 54 (bottom half): two legs diagonally opposite. The diagonal works whichever way the button is turned.',add:['w'],hi:['s56','S54']},
{t:'Power on, then press',d:'Press and hold the button (in the drawing, or the button below). Pressing closes the loop; letting go opens it.',pw:1,ix:'hold',calc:s=>s.pr?{lit:{l:7},fl:F(7,'R:r','L:l','B:b','W:w'),ro:'Held: loop closed · (9 V − 2 V) ÷ 1,000 Ω = 7 mA'}:{lit:{},fl:[],ro:'Released: loop open · 0 mA'}},
{t:'Pot dimmer: clear the board',d:'Power off. Pull everything except the − battery jumper.',clr:1,pw:0},
{t:'1. The pot',d:'Legs in 56c, 55c and 54c, each leg in its own strip. The middle leg is the wiper.',add:['k'],hi:['s56','s55','s54']},
{t:'2. The red jumper',d:'From the + row (above strip 57) to 56a. It feeds one end of the pot. Nothing else goes in strip 54.',add:['rj'],hi:['s56']},
{t:'3. The 330, before anything else',d:'From 55e (the wiper\'s strip) to 52e. It keeps the LED safe when the pot is turned all the way down to zero.',add:['r3'],hi:['s55','s52']},
{t:'4. The LED',d:'Long leg 52c, short leg 51c.',add:['l2'],hi:['s52','s51']},
{t:'5. The black jumper',d:'From 51a to the − row.',add:['w2'],hi:['s51']},
{t:'Power on, turn the knob',d:'Drag the knob slider. One way dims, the other way brightens. Two legs of the pot make a variable resistor.',pw:1,ix:'pot',calc:s=>{const R=Math.round(10000*(1-s.pot)),I=7000/(330+R);return{lit:{l2:I},fl:F(I,'W:rj','K:k','R:r3','L:l2','W:w2'),ro:`Pot ${R.toLocaleString('en-US')} Ω + 330 Ω = ${(R+330).toLocaleString('en-US')} Ω · 7 V ÷ that = ${I<1?I.toFixed(2):I.toFixed(1)} mA`}}}];
