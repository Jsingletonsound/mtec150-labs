// Lab 2 (Oct 15), panel C: two 1Ks, one after the other. NEW 2026-10-09 (Kit Day brief, NEW-2), from scratch
// (James, 2026-10-12). Bench-test: does the 1K from 60b to 58b sit flat?
const PART='C',CROP=312;
const PT={ra:{t:'R',a:'+60',b:'60a',v:'1K'},rb:{t:'R',a:'60b',b:'58b',v:'1K'},l:{t:'L',a:'58c',k:'57c'},w:{t:'W',a:'57a',b:'-57'}};
const F=(i,...a)=>({p:['B+',...a,'B-'],i});
const S=[
{t:'1. The first 1K',d:'Power off, and the board clear except the − battery jumper. One 1K from the + row above strip 60 into 60a. It hops over the − row.',clr:1,pw:0,add:['ra'],hi:['s60']},
{t:'2. The second 1K',d:'From 60b to 58b. The current will go through one 1K, then the other.',add:['rb'],hi:['s60','s58']},
{t:'3. The red LED',d:'Long leg 58c, short leg 57c.',add:['l'],hi:['s58','s57']},
{t:'4. The black jumper',d:'From 57a to the − row. Predict: brighter or dimmer than first light, with its one 1K?',pause:1,add:['w'],hi:['s57']},
{t:'Power on: dimmer',d:'Dimmer: the same as the 2K in the ladder. One after the other, resistances add.',pw:1,lit:{l:3.5},fl:[F(3.5,'R:ra','R:rb','L:l','W:w')],ro:'1,000 Ω + 1,000 Ω = 2,000 Ω · 7 V ÷ 2,000 Ω = 3.5 mA',hi:['s60','s58']}];
