// Lab 2 (Oct 15), panel Q: you are the oscillator (#16). From cfgE E9-E12, from scratch.
// 2026-10-02: tap wire reversed for safety. Fixed end in 49a, loose end tapped into the − row,
// so a slip into the + row goes through the 330 instead of shorting the battery.
const PART='Q',CROP=312;
const PT={r3:{t:'R',a:'+52',b:'52a',v:'330'},z:{t:'Z',a:'52c',b:'49c'},tw:{t:'W',a:'-48',b:'49a',lo:1,lov:[12,12]}};
const S=[
{t:'1. The 330',d:'Power off, and the board clear except the − battery jumper. One leg in the + row above strip 52, the other in 52a.',clr:1,pw:0,add:['r3'],hi:['s52']},
{t:'2. The passive buzzer',d:'Usually the one with the green board showing underneath; James will tell you which. One leg in 52c, the other in 49c. Either way round.',add:['z'],hi:['s52','s49']},
{t:'3. The tapping wire',d:'Black jumper: one end in 49a. Leave the other end loose, just over the − row above strip 48.',add:['tw'],hi:['s49']},
{t:'Power on, then tap',d:'Hold to tap: touch the loose end into the − row, then lift it. One touch, one click. Then Keep tapping and speed it up (sound on): a rough buzz.',pw:1,ix:'tap',calc:s=>s.tap?{lit:{},fl:[{p:['B+','R:r3','Z:z','W:tw','B-'],i:27}],ro:'Touching: loop closed · at most 9 V ÷ 330 Ω = 27 mA'}:{lit:{},fl:[],ro:'Lifted: loop open · 0 mA'}}];
