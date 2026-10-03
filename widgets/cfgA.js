const PART='A';
const PT={r:{t:'R',a:'+58',b:'58a',v:'1K'},l:{t:'L',a:'58c',k:'57c'},w:{t:'W',a:'57a',b:'-57'},
lf:{t:'L',a:'57c',k:'58c'},l6:{t:'L',a:'58c',k:'56c'},w6:{t:'W',a:'56a',b:'-56'},
lg:{t:'L',a:'58e',k:'57f'},wf:{t:'W',a:'57a',b:'-48',c:'o',via:[[310,141],[632,141],[632,82]]}};
const F=(i,...a)=>[{p:['B+',...a,'B-'],i}];
const S=[
{t:'The board: two power rails',d:'The row by the red line is +. The row by the blue line is −. On most boards each runs the length of the board, and the two don\'t touch. The − battery jumper is already in. The + jumper stays out until the end.',hi:['R+','R-'],pw:0},
{t:'Strips',d:'Each number is one strip: seats a to e are connected, and nothing connects sideways. Strips 58 and 57 (yellow) don\'t touch. The gap splits every strip in two: 58f to j (purple) is a different strip from 58a to e.',hi:['s58','s57','S58']},
{t:'1. The 1K resistor',d:'Read "1K" on the paper tape. One leg in the + row above strip 58, the other leg in 58a. It hops over the − row; don\'t let the leg land there.',add:['r'],hi:['s58']},
{t:'2. The red LED',d:'Long leg in 58c, short leg in 57c. Long leg faces plus.',add:['l'],hi:['s58','s57']},
{t:'3. The black jumper',d:'From 57a to the − row. Any seat in strip 57 works: letters are just seats in the same strip.',add:['w'],hi:['s57']},
{t:'4. Battery last: the + jumper in',d:'The loop is closed: + row, 1K, strip 58, LED, strip 57, jumper, − row, back to the battery. Every connection is two legs in the same strip.',pw:1,lit:{l:7},fl:F(7,'R:r','L:l','W:w'),ro:'(9 V − 2 V) ÷ 1,000 Ω = 7 mA',hi:['s58','s57']},
{t:'Test 1: flip the LED',d:'Long leg in 57c, short leg in 58c.',rm:['l'],add:['lf'],q:'lit or dark?',why:'Dark. The LED is a one-way door. Nothing breaks: the 1K still limits the current. Flip it back.',x:[274,165]},
{t:'Test 2: move the short leg one strip',d:'LED back the right way, then move its short leg from 57c to 56c.',rm:['lf'],add:['l6'],q:'lit or dark?',why:'Dark. Strip 56 doesn\'t touch strip 57, so the short leg no longer shares a strip with the jumper.',x:[310,231],hi:['s57','s56']},
{t:'Test 3: move the jumper to match',d:'Move the jumper from 57a to 56a.',rm:['w'],add:['w6'],q:'lit or dark?',why:'Lit. Parts connect only by sharing a strip.',lit:{l6:7},fl:F(7,'R:r','L:l6','W:w6'),ro:'Same loop, same 7 mA',hi:['s58','s56']},
{t:'Test 4: cross the center gap',d:'Jumper back to 57a. Put the LED across the gap: long leg 58e, short leg 57f.',rm:['l6','w6'],add:['lg','w'],q:'lit or dark?',why:'Dark. The gap splits strip 57 in two: 57f is not connected to 57a.',x:[262,280],hi:['s57','S57']},
{t:'Test 5: the far end of the − row',d:'LED back in 58c and 57c. Move the jumper\'s rail end to the far end of the − row (drawn here at the right edge).',rm:['lg','w'],add:['l','wf'],q:'lit or dark?',why:'Lit on most boards: the − row runs the full length. If yours goes dark, the rail is split in the middle; bridge the two halves with a jumper, and tell the class.',lit:{l:7},fl:F(7,'R:r','L:l','W:wf'),ro:'Still 7 mA',hi:['R-']}];
