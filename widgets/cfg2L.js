// Lab 2 (Oct 15), panel L: the pushbutton (#6). From cfgD D2-D6, from scratch. Uses the bottom half: no crop.
const PART='L';
const PT={r:{t:'R',a:'+58',b:'58a',v:'1K'},l:{t:'L',a:'58c',k:'56c'},b:{t:'B',g:['56e','54e','56f','54f']},w:{t:'W',a:'54h',b:'-53',via:[[418,340],[418,100]]}};
const F=(i,...a)=>[{p:['B+',...a,'B-'],i}];
const S=[
{t:'1. The 1K',d:'Power off, and the board clear except the − battery jumper. One leg in the + row above strip 58, the other in 58a.',clr:1,pw:0,add:['r'],hi:['s58']},
{t:'2. The LED',d:'Long leg 58c, short leg 56c.',add:['l'],hi:['s58','s56']},
{t:'3. The pushbutton, across the gap',d:'Legs in 56e, 54e, 56f and 54f. Press until all four legs are seated.',add:['b'],hi:['s56','S54']},
{t:'4. The black jumper',d:'From 54h to the − row. The loop goes in at strip 56 (top half) and out at strip 54 (bottom half): two legs diagonally opposite. The diagonal works whichever way the button is turned.',add:['w'],hi:['s56','S54']},
{t:'Power on, then press',d:'Press and hold the button (in the drawing, or the button below). Pressing closes the loop; letting go opens it.',pw:1,ix:'hold',calc:s=>s.pr?{lit:{l:7},fl:F(7,'R:r','L:l','B:b','W:w'),ro:'Held: loop closed · (9 V − 2 V) ÷ 1,000 Ω = 7 mA'}:{lit:{},fl:[],ro:'Released: loop open · 0 mA'}}];
