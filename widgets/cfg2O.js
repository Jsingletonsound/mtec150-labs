// Lab 2 (Oct 15), panel O: the pot dimmer (#7). From cfgD D8-D13, from scratch.
const PART='O',CROP=312;
const PT={rj:{t:'W',a:'+57',b:'56a',c:'r'},k:{t:'K',g:['56c','55c','54c']},r3:{t:'R',a:'55e',b:'52e',v:'330',l:-12},l2:{t:'L',a:'52c',k:'51c'},w2:{t:'W',a:'51a',b:'-51'}};
const F=(i,...a)=>[{p:['B+',...a,'B-'],i}];
const S=[
{t:'1. The pot',d:'Power off, and the board clear except the − battery jumper. Legs in 56c, 55c and 54c, each leg in its own strip. The middle leg is the wiper.',clr:1,pw:0,add:['k'],hi:['s56','s55','s54']},
{t:'2. The red jumper',d:'From the + row (above strip 57) to 56a. It feeds one end of the pot. Nothing else goes in strip 54.',add:['rj'],hi:['s56']},
{t:'3. The 330, before the power',d:'From 55e (the wiper\'s strip) to 52e. It goes in before the power, every time: it keeps the LED safe when the pot is turned all the way down to zero.',add:['r3'],hi:['s55','s52']},
{t:'4. The LED',d:'Long leg 52c, short leg 51c.',add:['l2'],hi:['s52','s51']},
{t:'5. The black jumper',d:'From 51a to the − row.',add:['w2'],hi:['s51']},
{t:'Power on, turn the knob',d:'Drag the knob slider. One way dims, the other way brightens. Two legs of the pot make a variable resistor.',pw:1,ix:'pot',calc:s=>{const R=Math.round(10000*(1-s.pot)),I=7000/(330+R);return{lit:{l2:I},fl:F(I,'W:rj','K:k','R:r3','L:l2','W:w2'),ro:`Pot ${R.toLocaleString('en-US')} Ω + 330 Ω = ${(R+330).toLocaleString('en-US')} Ω · 7 V ÷ that = ${I<1?I.toFixed(2):I.toFixed(1)} mA`}}}];
