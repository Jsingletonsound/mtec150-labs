const PART='E';
const PT={r:{t:'R',a:'+58',b:'58a',v:'1K'},la:{t:'L',a:'58b',k:'56b'},lb:{t:'L',a:'56d',k:'58d'},w:{t:'W',a:'56a',b:'-56'},
r3:{t:'R',a:'+52',b:'52a',v:'330'},z:{t:'Z',a:'52c',b:'49c'},tw:{t:'W',a:'-48',b:'49a',lo:1,lov:[12,12]}};
// 2026-10-02: tap wire reversed for safety. Fixed end in 49a, loose end tapped into the − row,
// so a slip into the + row goes through the 330 instead of shorting the battery.
const FA=[{p:['B+','R:r','L:la','W:w','B-'],i:7}],FB=[{p:['B+','W:w','L:lb','R:r','B-'],i:7}];
const S=[
{t:'Hand-cranked AC: clear the board',d:'Power off. Pull everything except the − battery jumper.',clr:1,pw:0},
{t:'1. The 1K',d:'One leg in the + row above strip 58, the other in 58a.',add:['r'],hi:['s58']},
{t:'2. LED A',d:'Long leg 58b, short leg 56b.',add:['la'],hi:['s58','s56']},
{t:'3. LED B, facing the other way',d:'Long leg 56d, short leg 58d. Same two strips as LED A, opposite direction.',add:['lb'],hi:['s58','s56']},
{t:'4. The black jumper',d:'From 56a to the − row.',add:['w'],hi:['s56']},
{t:'Power on',d:'+ jumper in.',pw:1,q:'which LED lights?',why:'LED A only. Both sit between the same two strips, but LED B faces the wrong way for this push.',lit:{la:7},fl:FA,ro:'(9 V − 2 V) ÷ 1,000 Ω = 7 mA through LED A'},
{t:'Flip the battery',d:'Unclip both clips first, then clip each onto the other jumper. Never let the clips touch. Your hands can only flip about once a second; try Keep flipping in the drawing and speed it up past 15 a second: both seem lit at once, flickering.',ix:'flip',calc:s=>s.sw?{lit:{lb:7},fl:FB,ro:'Flipped: the push now comes in through the − row · LED B lights'}:{lit:{la:7},fl:FA,ro:'Normal: the push comes in through the + row · LED A lights'}},
{t:'You are the oscillator: clear the board',d:'Power off. Pull everything except the − battery jumper.',clr:1,pw:0},
{t:'1. The 330',d:'One leg in the + row above strip 52, the other in 52a.',add:['r3'],hi:['s52']},
{t:'2. The passive buzzer',d:'Usually the one with the green board showing underneath. One leg in 52c, the other in 49c. Either way round.',add:['z'],hi:['s52','s49']},
{t:'3. The tapping wire',d:'Black jumper: one end in 49a. Leave the other end loose, just over the − row above strip 48.',add:['tw'],hi:['s49']},
{t:'Power on, then tap',d:'Hold to tap: touch the loose end into the − row, then lift it. Then Keep tapping and speed it up (sound on).',pw:1,ix:'tap',calc:s=>s.tap?{lit:{},fl:[{p:['B+','R:r3','Z:z','W:tw','B-'],i:27}],ro:'Touching: loop closed · at most 9 V ÷ 330 Ω = 27 mA'}:{lit:{},fl:[],ro:'Lifted: loop open · 0 mA'}}];
