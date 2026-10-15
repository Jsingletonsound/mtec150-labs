// Lab 2 (Oct 15), panel J: two LEDs, one resistor. NEW 2026-10-09 (Kit Day brief, NEW-3), from scratch.
// Bench-test which color shows it best: green here. For blue, c:'b' on lg (and on lg/lg2 in cfg2K.js), "green" in the
// texts here, in cfg2K.js, content/lab2.md (J and K) and build.py META, and K's numbers: blue's ~3 V leaves about 4 V
// and about 4 mA, not 4.8 V and 5 mA (K's why and last step). Blue's ~3 V is outside the book.
const PART='J',CROP=312;
const PT={r:{t:'R',a:'+58',b:'58a',v:'1K'},lr:{t:'L',a:'58c',k:'57c'},lg:{t:'L',a:'58e',k:'57e',c:'g'},w:{t:'W',a:'57a',b:'-57'}};
const F=(i,...a)=>({p:['B+',...a,'B-'],i});
const S=[
{t:'1. The 1K',d:'Power off, and the board clear except the − battery jumper. 1K from the + row above strip 58 into 58a. It hops over the − row.',clr:1,pw:0,add:['r'],hi:['s58']},
{t:'2. The red LED',d:'Long leg 58c, short leg 57c.',add:['lr'],hi:['s58','s57']},
{t:'3. The green LED, beside it',d:'Long leg 58e, short leg 57e. The same two strips, so both LEDs share the one 1K.',add:['lg'],hi:['s58','s57']},
{t:'4. The black jumper',d:'From 57a to the − row. Predict: will both light?',pause:1,add:['w'],hi:['s57']},
{t:'Power on: only the red',d:'Usually only the red one lights. The red LED lights at about 2 V and holds the push there. The green one needs a little more push (p. 67), so it stays just under its toll: dark, or a faint glow.',pw:1,lit:{lr:7},fl:[F(7,'R:r','L:lr','W:w')],ro:'7 V ÷ 1,000 Ω = 7 mA, nearly all through the red',hi:['s58','s57']}];
