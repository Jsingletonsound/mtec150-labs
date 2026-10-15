// Lab 2 (Oct 15), panel D: two 1Ks side by side. NEW 2026-10-09 (Kit Day brief, NEW-2), from scratch
// (James, 2026-10-12). Kept qualitative for students (p. 31's parallel formula is the lecture's back pocket).
const PART='D',CROP=312;
const PT={r:{t:'R',a:'+58',b:'58a',v:'1K'},r2:{t:'R',a:'+59',b:'59a',v:'1K'},j:{t:'W',a:'59b',b:'58b',q:[238,146]},l:{t:'L',a:'58c',k:'57c'},w:{t:'W',a:'57a',b:'-57'}};
const S=[
{t:'1. The first 1K',d:'Power off, and the board clear except the − battery jumper. One 1K from the + row above strip 58 into 58a. It hops over the − row.',clr:1,pw:0,add:['r'],hi:['s58']},
{t:'2. The second 1K, beside it',d:'From the + row above strip 59 into 59a.',add:['r2'],hi:['s59']},
{t:'3. A short jumper',d:'From 59b to 58b. Now both 1Ks feed strip 58.',add:['j'],hi:['s59','s58']},
{t:'4. The red LED',d:'Long leg 58c, short leg 57c.',add:['l'],hi:['s58','s57']},
{t:'5. The black jumper',d:'From 57a to the − row. Predict: brighter or dimmer than first light? (Never put a 330 side by side with another resistor.)',pause:1,add:['w'],hi:['s57']},
{t:'Power on: brighter',d:'Brighter. The current takes both open paths into strip 58, so more flows in all (p. 20).',pw:1,lit:{l:14},fl:[{p:['B+','R:r','58c'],i:7},{p:['B+','R:r2','W:j','58c'],i:7},{p:['58c','L:l','W:w','B-'],i:14}],hi:['s59','s58']}];
