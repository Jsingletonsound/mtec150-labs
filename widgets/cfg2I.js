// Lab 2 (Oct 15), panel I: pull one LED (parallel). From cfgC C15; starts from H's lit build.
const PART='I',CROP=312;
const PT={pr1:{t:'R',a:'+60',b:'60a',v:'1K'},pl1:{t:'L',a:'60c',k:'59c'},pw1:{t:'W',a:'59a',b:'-59'},
pr2:{t:'R',a:'+57',b:'57a',v:'1K'},pl2:{t:'L',a:'57c',k:'56c'},pw2:{t:'W',a:'56a',b:'-56'},
pr3:{t:'R',a:'+54',b:'54a',v:'1K'},pl3:{t:'L',a:'54c',k:'53c'},pw3:{t:'W',a:'53a',b:'-53'}};
const F=(i,...a)=>({p:['B+',...a,'B-'],i});
const B1=F(7,'R:pr1','L:pl1','W:pw1'),B2=F(7,'R:pr2','L:pl2','W:pw2'),B3=F(7,'R:pr3','L:pl3','W:pw3');
const S=[
{t:'Start: each LED its own loop',d:'The three branches from H, all lit. Predict: with the power on, if you pull the LED from branch 2, what happens to the other two?',pause:1,add:['pr1','pl1','pw1','pr2','pl2','pw2','pr3','pl3','pw3'],pw:1,lit:{pl1:7,pl2:7,pl3:7},fl:[B1,B2,B3],ro:'Each branch: 7 mA'},
{t:'Pull branch 2\'s LED: the others stay lit',d:'They stay lit. In parallel, each light has its own path; breaking one leaves the others closed.',rm:['pl2'],lit:{pl1:7,pl3:7},fl:[B1,B3],ro:'Branches 1 and 3: still 7 mA each',x:[310,165]}];
