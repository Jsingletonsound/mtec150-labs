// Lab 2 (Oct 15), panel P: hand-cranked AC (#15). From cfgE E2-E7, from scratch; power on and the flip are one
// last step (one result per drawing, James 2026-10-12).
const PART='P',CROP=312;
const PT={r:{t:'R',a:'+58',b:'58a',v:'1K'},la:{t:'L',a:'58b',k:'56b'},lb:{t:'L',a:'56d',k:'58d'},w:{t:'W',a:'56a',b:'-56'}};
const FA=[{p:['B+','R:r','L:la','W:w','B-'],i:7}],FB=[{p:['B+','W:w','L:lb','R:r','B-'],i:7}];
const S=[
{t:'1. The 1K',d:'Power off, and the board clear except the − battery jumper. One leg in the + row above strip 58, the other in 58a.',clr:1,pw:0,add:['r'],hi:['s58']},
{t:'2. LED A',d:'Long leg 58b, short leg 56b.',add:['la'],hi:['s58','s56']},
{t:'3. LED B, facing the other way',d:'Long leg 56d, short leg 58d. Same two strips as LED A, opposite direction.',add:['lb'],hi:['s58','s56']},
{t:'4. The black jumper',d:'From 56a to the − row. Predict: which LED will light?',pause:1,add:['w'],hi:['s56']},
{t:'Power on, then flip the battery',d:'Only LED A lights: LED B faces the wrong way for this push. Now flip, slowly: unclip both clips, clip red onto the jumper in the − row and black onto the one in the + row. Each flip moves the light. Keep flipping past 15 a second and both seem lit: that\'s AC (p. 18). Finish with red on the + jumper. Never let the clips touch.',pw:1,ix:'flip',calc:s=>s.sw?{lit:{lb:7},fl:FB,ro:'Flipped: the push comes in through the − row · LED B lights'}:{lit:{la:7},fl:FA,ro:'Normal: the push comes in through the + row · LED A lights'}}];
