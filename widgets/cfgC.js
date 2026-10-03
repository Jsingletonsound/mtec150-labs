const PART='C';
const PT={r:{t:'R',a:'+60',b:'60a',v:'330'},l1:{t:'L',a:'60c',k:'58c'},l2:{t:'L',a:'58e',k:'56e'},l3:{t:'L',a:'56c',k:'54c'},w:{t:'W',a:'54a',b:'-54'},
byp:{t:'W',a:'58a',b:'56a',c:'o',q:[292,96]},
pr1:{t:'R',a:'+60',b:'60a',v:'1K'},pl1:{t:'L',a:'60c',k:'59c'},pw1:{t:'W',a:'59a',b:'-59'},
pr2:{t:'R',a:'+57',b:'57a',v:'1K'},pl2:{t:'L',a:'57c',k:'56c'},pw2:{t:'W',a:'56a',b:'-56'},
pr3:{t:'R',a:'+54',b:'54a',v:'1K'},pl3:{t:'L',a:'54c',k:'53c'},pw3:{t:'W',a:'53a',b:'-53'}};
const F=(i,...a)=>({p:['B+',...a,'B-'],i});
const B1=F(7,'R:pr1','L:pl1','W:pw1'),B2=F(7,'R:pr2','L:pl2','W:pw2'),B3=F(7,'R:pr3','L:pl3','W:pw3');
const S=[
{t:'Series: clear the board',d:'Power off. Pull everything except the − battery jumper.',clr:1,pw:0},
{t:'1. The 330',d:'One leg in the + row above strip 60, the other in 60a.',add:['r'],hi:['s60']},
{t:'2. LED 1',d:'Long leg 60c, short leg 58c.',add:['l1'],hi:['s60','s58']},
{t:'3. LED 2',d:'Long leg 58e, short leg 56e. It shares strip 58 with LED 1\'s short leg.',add:['l2'],hi:['s58','s56']},
{t:'4. LED 3',d:'Long leg 56c, short leg 54c.',add:['l3'],hi:['s56','s54']},
{t:'5. The black jumper',d:'From 54a to the − row.',add:['w'],hi:['s54']},
{t:'Power on: one path',d:'Every LED sits in the same single loop, so the same current goes through all three. Each LED takes its 2 V toll.',pw:1,lit:{l1:9.1,l2:9.1,l3:9.1},fl:[F(9.1,'R:r','L:l1','L:l2','L:l3','W:w')],ro:'9 V − (3 × 2 V) = 3 V left · 3 V ÷ 330 Ω = 9 mA',hi:['s60','s58','s56','s54']},
{t:'Test: pull the middle LED',d:'Pull LED 2 out of the board.',rm:['l2'],q:'what happens to LEDs 1 and 3?',why:'LEDs 1 and 3 both go dark. In series, everything shares one path. Break it anywhere, and it all stops.',x:[292,231]},
{t:'Test: the bypass jumper',d:'Put LED 2 back. Add the orange jumper from 58a to 56a.',add:['l2','byp'],q:'what happens to each LED?',why:'LED 2 goes dark and LEDs 1 and 3 get brighter. The jumper ties strips 58 and 56 together, so LED 2 has the same push on both legs and nothing flows through it. Two tolls instead of three: 9 − 4 = 5 V, and 5 ÷ 330 = 15 mA.',lit:{l1:15.2,l3:15.2},fl:[F(15.2,'R:r','L:l1','W:byp','L:l3','W:w')],ro:'(9 V − 4 V) ÷ 330 Ω = 15 mA'},
{t:'Parallel: clear the board',d:'Power off. Pull everything except the − battery jumper. This time each LED gets its own loop.',clr:1,pw:0},
{t:'Branch 1',d:'1K from the + row above strip 60 to 60a. LED long leg 60c, short leg 59c. Jumper 59a to the − row.',add:['pr1','pl1','pw1'],hi:['s60','s59']},
{t:'Branch 2',d:'1K from the + row above strip 57 to 57a. LED long leg 57c, short leg 56c. Jumper 56a to the − row.',add:['pr2','pl2','pw2'],hi:['s57','s56']},
{t:'Branch 3',d:'1K from the + row above strip 54 to 54a. LED long leg 54c, short leg 53c. Jumper 53a to the − row.',add:['pr3','pl3','pw3'],hi:['s54','s53']},
{t:'Power on: three paths',d:'Each LED has its own loop from + to −, with its own 1K.',pw:1,lit:{pl1:7,pl2:7,pl3:7},fl:[B1,B2,B3],ro:'Each branch: (9 V − 2 V) ÷ 1,000 Ω = 7 mA · battery total 21 mA'},
{t:'Test: pull the middle LED',d:'Pull the LED from branch 2.',rm:['pl2'],q:'what happens to the other two?',why:'They stay lit. In parallel, each light has its own path; breaking one path leaves the others closed.',lit:{pl1:7,pl3:7},fl:[B1,B3],ro:'Branches 1 and 3: still 7 mA each',x:[310,165]}];
