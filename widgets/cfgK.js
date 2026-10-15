// Kit Day (Oct 8): first light by the steps, plus the rail test. NEW 2026-10-02.
// Built from cfgA. No Ohm's-law readouts on purpose: the LED and the breadboard are
// borrowed as tools (how only). The why, and the 7 mA, wait for Lecture 1.
// 2026-10-03, James: K9-K13 "swap it around" back pocket, from cfgA's Tests 2-4 and Lab 2's
// Extra #5, without readouts. K1-K8 are unchanged.
const PART='K';
const PT={r:{t:'R',a:'+58',b:'58a',v:'1K'},l:{t:'L',a:'58c',k:'57c'},w:{t:'W',a:'57a',b:'-57'},
wf:{t:'W',a:'57a',b:'-48',c:'o',via:[[310,141],[632,141],[632,82]]},
l6:{t:'L',a:'58c',k:'56c'},w6:{t:'W',a:'56a',b:'-56'},lg:{t:'L',a:'58e',k:'57f'},
rj:{t:'W',a:'+58',b:'58a',c:'r'},r5:{t:'R',a:'-57',b:'57a',v:'1K'}};
const F=(i,...a)=>[{p:['B+',...a,'B-'],i}];
const S=[
{t:'The board: two power rails',d:'The row by the red line is +. The row by the blue line is −. On most boards each runs the length of the board (you\'ll test yours), and the two don\'t touch. The − battery jumper is already in. The + jumper stays out until the end.',hi:['R+','R-'],pw:0},
{t:'Strips',d:'Each number is one strip: seats a to e are connected, and nothing connects sideways. Strips 58 and 57 (yellow) don\'t touch. The gap splits every strip in two: 58f to j (purple) is a different strip from 58a to e.',hi:['s58','s57','S58']},
{t:'1. The 1K resistor',d:'Read "1K" on the paper tape. One leg in the + row above strip 58, the other leg in 58a. It hops over the − row; don\'t let the leg land there.',add:['r'],hi:['s58']},
{t:'2. The red LED',d:'Long leg in 58c, short leg in 57c. Long leg faces plus.',add:['l'],hi:['s58','s57']},
{t:'3. The black jumper',d:'From 57a to the − row. Any seat in strip 57 works: letters are just seats in the same strip.',add:['w'],hi:['s57']},
{t:'4. Battery last: the + jumper in',d:'The loop is closed: + row, 1K, strip 58, LED, strip 57, jumper, − row, back to the battery. Every connection is two legs in the same strip. Why this resistor, and how much current flows: Lecture 1, next week.',pw:1,lit:{l:7},fl:F(7,'R:r','L:l','W:w'),hi:['s58','s57']},
{t:'The rail test: the far end of the − row',d:'Power off. Move the black jumper\'s rail end into the − row at the far end of the board, away from the battery jumpers and well past the middle. The drawing shows only part of the board; on yours, go farther. Check it\'s in the − row, by the blue line. Power on.',rm:['w'],add:['wf'],q:'lit or dark?',why:'Lit on most boards: the − row runs the full length. If yours goes dark, the rail is split in the middle. Tell James before Lab 2.',lit:{l:7},fl:F(7,'R:r','L:l','W:wf'),hi:['R-']},
{t:'Power off, every time',d:'Lift the + jumper out of the rail and set it away from the board. Do this before you change any part, all semester.',pw:0},
{t:'If there\'s time: first light again',d:'1K from the + row above strip 58 to 58a, red LED long leg 58c, short leg 57c, black jumper from 57a to the − row. Power on. For every test after this: power off, make the change, power on.',rm:['wf'],add:['w'],pw:1,lit:{l:7},fl:F(7,'R:r','L:l','W:w'),hi:['s58','s57']},
{t:'Move the short leg one strip',d:'Move only the short leg, from 57c to 56c.',rm:['l'],add:['l6'],q:'lit or dark?',why:'Dark. Strip 56 doesn\'t touch strip 57, so the short leg no longer shares a strip with the jumper.',x:[310,231],hi:['s57','s56']},
{t:'Move the jumper to match',d:'Now move the jumper from 57a to 56a.',rm:['w'],add:['w6'],q:'lit or dark?',why:'Lit. Parts connect only by sharing a strip.',lit:{l6:7},fl:F(7,'R:r','L:l6','W:w6'),hi:['s58','s56']},
{t:'Cross the center gap',d:'Jumper back to 57a. Put the LED across the gap: long leg 58e, short leg 57f.',rm:['l6','w6'],add:['lg','w'],q:'lit or dark?',why:'Dark. The gap splits strip 57 in two: 57f isn\'t connected to 57a.',x:[262,280],hi:['s57','S57']},
{t:'Order doesn\'t matter',d:'Clear the board. Red jumper from the + row above strip 58 to 58a (it hops over the − row). LED long leg 58c, short leg 57c. 1K from 57a to the − row. Power on: the LED comes first and the resistor after it.',clr:1,add:['rj','l','r5'],pw:1,q:'lit or dark?',why:'Lit. Order doesn\'t matter; direction does.',lit:{l:7},fl:F(7,'W:rj','L:l','R:r5'),hi:['s58','s57']}];
