// Lab 2 (Oct 15), panel H: each LED its own loop (parallel, #9). From cfgC C11-C14, from scratch.
const PART='H',CROP=312;
const PT={pr1:{t:'R',a:'+60',b:'60a',v:'1K'},pl1:{t:'L',a:'60c',k:'59c'},pw1:{t:'W',a:'59a',b:'-59'},
pr2:{t:'R',a:'+57',b:'57a',v:'1K'},pl2:{t:'L',a:'57c',k:'56c'},pw2:{t:'W',a:'56a',b:'-56'},
pr3:{t:'R',a:'+54',b:'54a',v:'1K'},pl3:{t:'L',a:'54c',k:'53c'},pw3:{t:'W',a:'53a',b:'-53'}};
const F=(i,...a)=>({p:['B+',...a,'B-'],i});
const B1=F(7,'R:pr1','L:pl1','W:pw1'),B2=F(7,'R:pr2','L:pl2','W:pw2'),B3=F(7,'R:pr3','L:pl3','W:pw3');
const S=[
{t:'Branch 1',d:'Power off, and the board clear except the − battery jumper. 1K from the + row above strip 60 to 60a. LED long leg 60c, short leg 59c. Jumper 59a to the − row.',clr:1,pw:0,add:['pr1','pl1','pw1'],hi:['s60','s59']},
{t:'Branch 2',d:'1K from the + row above strip 57 to 57a. LED long leg 57c, short leg 56c. Jumper 56a to the − row.',add:['pr2','pl2','pw2'],hi:['s57','s56']},
{t:'Branch 3',d:'1K from the + row above strip 54 to 54a. LED long leg 54c, short leg 53c. Jumper 53a to the − row.',add:['pr3','pl3','pw3'],hi:['s54','s53']},
{t:'Power on: three paths',d:'All three light. Each LED has its own loop from + to −, with its own 1K.',pw:1,lit:{pl1:7,pl2:7,pl3:7},fl:[B1,B2,B3],ro:'Each branch: (9 V − 2 V) ÷ 1,000 Ω = 7 mA · battery total 21 mA'}];
