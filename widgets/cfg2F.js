// Lab 2 (Oct 15), panel F: pull the middle LED (series). From cfgC C8; starts from E's lit string.
const PART='F',CROP=312;
const PT={r:{t:'R',a:'+60',b:'60a',v:'330'},l1:{t:'L',a:'60c',k:'58c'},l2:{t:'L',a:'58e',k:'56e'},l3:{t:'L',a:'56c',k:'54c'},w:{t:'W',a:'54a',b:'-54'},
byp:{t:'W',a:'58a',b:'56a',c:'o',q:[292,96]}};
const F=(i,...a)=>({p:['B+',...a,'B-'],i});
const S=[
{t:'Start: three LEDs in one loop',d:'The string from E, all lit. Predict: with the power on, if you pull LED 2 out of the board, what happens to LEDs 1 and 3?',pause:1,add:['r','l1','l2','l3','w'],pw:1,lit:{l1:9.1,l2:9.1,l3:9.1},fl:[F(9.1,'R:r','L:l1','L:l2','L:l3','W:w')],ro:'9 V − (3 × 2 V) = 3 V left · 3 V ÷ 330 Ω = 9 mA',hi:['s60','s58','s56','s54']},
{t:'Pull LED 2: all dark',d:'LEDs 1 and 3 go dark too. In series, everything shares one path. Break it anywhere, and it all stops. Then power off, put LED 2 back, power on.',rm:['l2'],lit:{},fl:[],ro:'Loop open · 0 mA',x:[292,231]}];
