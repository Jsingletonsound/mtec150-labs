---
title: "Lab 2: one loop, then several"
session: "E01 · after Lecture 1"
date: 2026-10-15
status: published
rests_on: "Lecture 1: Mims pp. 6–9, 13–14, 18–21, 24–25, 27, 28–31, the p. 47 note, and the LED block (pp. 66–69)"
minutes: 107
---

# Lab 2: one loop, then several

**Today you'll** use Ohm's law on a real circuit, control current with resistors, switches and a knob, and turn a battery into AC by hand. One experiment per panel: press **Next** through the drawing as you build, then scroll on.

::: teacher
Rebuilt 2026-10-09 from "Kit Day covered, for the Oct 15 lab"; changed 2026-10-12, 2026-10-14 and 2026-10-15 after James's looks (G's jumper goes in before the power. K is a your-turn task: a jumpers-only try that fails (a jumper can't split two LEDs on the same two strips), then one leg of each LED moves and two jumpers route both into one loop, with no new resistor. Every build has a folded "Why it works" read.) Kit Day already did first light, the tests and Extra #5, so there's no first-light panel: the ladder (B) starts from it. Every drawing builds from an empty board, or adds to the one before, and ends on its one result. There's no "Show result" button: the predict question sits in the step before the result. Only the ladder has a result at every step.
Minutes as planned: A 3 · B 12 · C 5 · D 5 · E 5 · F 2 · G 5 · H 5 · I 2 · J 4 · K 7 · L 5 · M 8 · N 12 · O 8 · P 5 · Q 4 · clean-up 10 = 107. At Kit Day's pace (about 0.8 of the plan) that's about 85 real minutes, plus the challenges and the simulator.
Session math: Lecture 1 (~51) + break 10 + about 85 = about 146 of 170 min. The challenges at the end, the simulator and anything left over fill the rest; what a group doesn't reach opens the next lab.
If it runs long, cut in this order: the challenges at the end, then the 5.1K rung. TODO (James): what goes next.
New, so bench-test before class: C and D (two 1Ks: does the 1K from 60b to 58b sit flat?), J and K (two LEDs on one 1K: green or blue, which shows it best? K's jumpers-only try (both should go dark), and K's one-loop route: red 58c to 59c, green 59i to 57i). Also #14 (three blues may glow faintly), the buzzer tap (Q) for loudness, and the Kit Day rail-test results.
:::

Roles rotate at every panel: 2 builders, reader, checker, predictor. The predictor says each "Predict" out loud before anyone powers on.

**Power off** = the + jumper out of the + row, set away from the board. **Power on** = back in, last. **Clear the board** = power off, then pull everything except the − battery jumper. **"The + row above strip 58"** = the + row hole nearest strip 58.

::: safety
- Nothing below **330 Ω** in series with one LED. Never put a 330 side by side with another resistor.
- At most **3 red LEDs** in one series string.
- **Power off before you add or move a part,** then power on to see the result. The only exceptions: pulling a part out on purpose to watch what happens (F and I), and the battery flip and the tapping wire (P and Q).
- **Never let the two battery clips touch.** A warm battery? Unclip it.
:::

::: panel A
kicker: The resistors
title: Six resistors, in the order the ladder uses them
pages: Mims pp. 28–29
outside: the kit's strips and their five color bands
minutes: 3
:::

Find each one in your bag by its paper label. Use only these six: if your bag has anything smaller (a 220, a 100), leave it there.

::: bands
100K
10K
5.1K
2K
1K
330
:::

::: panel B
kicker: The resistor ladder
title: Swap only the resistor: 100K down to 330
pages: Mims pp. 14, 28–29
outside: the link between brightness, ratios and decibels · the LED's 20 mA rating comes from data sheets · the purple dots flow + to − (conventional current; Mims draws electron flow, − to +, p. 47)
minutes: 12
:::

::: widget 2B
:::

::: remember
Voltage is the push. Current is how much flows. Resistance is what holds it back.

The LED sets the direction. The resistor sets the amount.
:::

::: words
Start from first light: **1K** from the + row above strip 58 to **58a**, red LED long leg **58c**, short leg **57c**, black jumper from **57a** to the − row. The LED takes about 2 V, its toll; the resistor gets the other 7 V. With the 1K: **(9 V − 2 V) ÷ 1,000 Ω = 7 mA.** Before you swap anything, guess the order from dimmest to brightest.

1. Power off, swap in the **100K**, power on.
2. The **10K**.
3. The **5.1K** (optional).
4. The **2K**.
5. The **1K**.
6. The **330**. Stop here.

| Resistor | 7 V ÷ R | What you'll see |
|---|---|---|
| 100K | 0.07 mA | Looks dark. Cup your hands around it: a faint glow. Dark isn't zero. |
| 10K | 0.7 mA | Dim |
| 5.1K (optional) | 1.4 mA | Dim to medium |
| 2K | 3.5 mA | Clearly on |
| 1K | 7 mA | Bright |
| 330 | 21 mA | Brightest. Stop here. |

Swap between the 1K and the 330 a few times: three times the current, but only somewhat brighter. Nothing smaller than 330: a 220 would push about 32 mA through the LED, more than it's made for.
:::

::: why
A resistor holds back the flow of current: the more ohms, the less current. The battery's push doesn't change from rung to rung: 9 V. The LED always takes its toll, about 2 V, so the resistor always gets the other 7 V.

Ohm's law (Mims p. 14) says current = voltage ÷ resistance. Divide the same 7 V by a bigger resistance and you get a smaller current. That's the whole ladder: 7 V ÷ 100,000 Ω is a tiny 0.07 mA, a glow you have to cup your hands to see; 7 V ÷ 330 Ω is 21 mA, as bright as the LED should ever run.
:::

::: panel C
kicker: Two 1Ks, one after the other
title: The current goes through one 1K, then the other
pages: Mims pp. 20, 31
minutes: 5
new: bench-test the layout (does the 1K from 60b to 58b sit flat, or does it need its legs bent close to the body?)
:::

::: widget 2C
:::

::: words
Clear the board.

1. One **1K** from the + row above strip 60 into **60a**.
2. A second **1K** from **60b** to **58b**.
3. Red LED: long leg **58c**, short leg **57c**.
4. Black jumper from **57a** to the − row. Predict: brighter or dimmer than first light?
5. Power on.
:::

::: why
One after the other, the current has only one road, and both 1Ks sit on it. It has to get through the first one and then the second, so together they hold it back like one 2K. Resistances one after the other add up (Mims pp. 20, 31).

Same 7 V, twice the resistance, half the current: 3.5 mA instead of 7. That's why it looks just like the 2K rung on the ladder.
:::

::: panel D
kicker: Two 1Ks, side by side
title: Two paths into the same strip
pages: Mims pp. 20, 31
minutes: 5
new: bench-test the layout before class
:::

::: widget 2D
:::

::: words
Clear the board.

1. One **1K** from the + row above strip 58 into **58a**.
2. A second **1K** from the + row above strip 59 into **59a**.
3. A short jumper from **59b** to **58b**.
4. Red LED: long leg **58c**, short leg **57c**.
5. Black jumper from **57a** to the − row. Predict: brighter or dimmer than first light?
6. Power on.

Never put a 330 side by side with another resistor.
:::

::: why
Side by side, each 1K is its own road into strip 58. Current doesn't pick one road: it takes every complete one (Mims p. 20). Two roads let more current through than one, so the LED gets more and glows brighter.

So side by side, two resistors hold back *less* than either one alone. That's also why a 330 must never sit side by side with another resistor: together they'd hold back less than 330, and the LED would get more current than it's made for.
:::

::: teacher
Side by side stays qualitative on the page: p. 31's parallel formula is the lecture's back pocket (E01-D2). For you: two 1Ks side by side are 500 Ω, so 14 mA. A 330 side by side with anything goes below the floor: with a 1K, 248 Ω and 28 mA; two 330s, 165 Ω and 42 mA. Hence the warning.
:::

::: panel E
kicker: One path
title: Three LEDs in one loop
pages: Mims pp. 20–21
minutes: 5
:::

::: widget 2E
:::

::: words
Clear the board.

1. **330** from the + row above strip 60 to **60a**. It hops over the − row.
2. LED 1: long leg **60c**, short leg **58c**.
3. LED 2: long leg **58e**, short leg **56e**. It shares strip 58 with LED 1's short leg.
4. LED 3: long leg **56c**, short leg **54c**.
5. Black jumper from **54a** to the − row. Predict: will all three light?
6. Power on.

All three LEDs sit in one loop, so the same current goes through all three. Each takes its 2 V toll: **9 V − 6 V = 3 V left, and 3 V ÷ 330 Ω = 9 mA.**
:::

::: why
In series there's only one road from + to −, and every part sits on it, so the same current flows through all three LEDs (Mims pp. 20–21). Each LED takes its toll of about 2 V. Three tolls use up 6 V of the battery's 9 V, which leaves just 3 V to push current through the 330.

A fourth red LED would take another 2 V and leave only about 1 V for the 330: about 3 mA, barely lit. One string holds at most three.
:::

::: panel F
kicker: Pull the middle LED
title: Pull LED 2 out, with the power on
pages: Mims pp. 20–21
minutes: 2
:::

::: widget 2F
:::

::: words
Start from the three LEDs in one loop (E), all lit. Predict: if you pull LED 2, what happens to LEDs 1 and 3? Then, with the power on, pull LED 2 out of the board. Then power off, put LED 2 back, power on.
:::

::: why
A loop is a circle: the current has to get all the way around, from + back to −, or it doesn't flow at all. Pull out LED 2 and there's a gap in the only road. No current anywhere in the loop: not through LED 1, not through LED 3 (Mims p. 21). A series loop is all or nothing.
:::

::: remember
In series, everything shares one path. Break it anywhere, and it all stops.
:::

::: panel G
kicker: Two ways to go
title: One jumper around LED 2
pages: Mims p. 21
minutes: 5
:::

::: widget 2G
:::

::: words
Start from the three LEDs in one loop (E), all lit.

1. Power off. Add a jumper from **58a** to **56a**. Now there are two ways from strip 58 to strip 56: through LED 2, or through the jumper. Predict: when the power comes back on, which way will the electricity go, and what happens to each LED?
2. Power on.
:::

::: why
**Electricity takes the path of least resistance.** Give it two ways to go, and more of it takes the easier one. When one way is far easier, all of it goes that way.

Once the jumper is in, there are two ways from strip 58 to strip 56. One is through LED 2, which charges a 2 V toll. The other is the jumper, a plain wire with no toll at all. The electricity takes the jumper, and LED 2 goes dark. That dark LED is the proof.

Why none at all? The jumper ties strip 58 straight to strip 56, so both of LED 2's legs sit at the same push, the same voltage. With no push across it, LED 2 can never reach its 2 V toll (Mims p. 21). A wire used like this is called a bypass, or a short around a part.

With LED 2 out of the way, only two LEDs take a toll: 9 V − 4 V leaves 5 V for the 330, so more current flows (15 mA) and LEDs 1 and 3 get brighter.

Never bypass the whole circuit. A wire straight from + to − is the easiest path of all. It skips the LEDs and the resistor, so nothing holds the current back, and it shorts the battery.
:::

::: teacher
If someone asks why all three LEDs light in H: there, each LED has its own 1K straight across the battery, so each gets the full 9 V push no matter what the others do. Here, and again in J, the two ways sit side by side on the same two strips after one shared resistor, so they get the same push, and the easier way holds that push too low for the other. The jumper leaves LED 2 with no push across it, so it gets nothing. In J the red's toll is lower, so the red takes nearly all of it. K fixes J another way: moving LED legs puts both LEDs in one loop, and the jumpers carry the current between them.
:::

::: panel H
kicker: Three paths
title: Each LED gets its own loop
pages: Mims pp. 20–21
minutes: 5
:::

::: widget 2H
:::

::: words
Clear the board. This time each LED gets its own loop.

1. Branch 1: **1K** from the + row above strip 60 to **60a** (each 1K hops over the − row). LED long leg **60c**, short leg **59c**. Jumper **59a** to the − row.
2. Branch 2: **1K** from the + row above strip 57 to **57a**. LED long leg **57c**, short leg **56c**. Jumper **56a** to the − row.
3. Branch 3: **1K** from the + row above strip 54 to **54a**. LED long leg **54c**, short leg **53c**. Jumper **53a** to the − row.
4. Power on.

Each branch: **(9 V − 2 V) ÷ 1,000 Ω = 7 mA.** The battery supplies all three: 21 mA.
:::

::: why
In parallel, each LED gets its own loop from + to −, with its own 1K (Mims pp. 20–21). Each loop gets the battery's whole 9 V push, so each LED gets 7 mA, just like first light. The battery feeds all three loops at once, so it supplies three times as much: 21 mA.
:::

::: panel I
kicker: Pull one LED
title: Pull one LED from its own loop
pages: Mims pp. 20–21
minutes: 2
:::

::: widget 2I
:::

::: words
Start from the three loops (H), all lit. Predict: if you pull the LED from branch 2, what happens to the other two? Then, with the power on, pull it.
:::

::: why
Pull one LED and only its own loop opens. The other two loops are still complete circles from + to −, so they keep their current and stay lit. In parallel, each path stands on its own.
:::

::: remember
Current doesn't pick one path. It takes every complete path.
:::

::: panel J
kicker: Two LEDs, one resistor
title: A red and a green LED share one 1K
pages: Mims pp. 20, 67–69
minutes: 4
new: bench-test before class, and pick the pair that shows it best (green here; blue shows it more strongly)
:::

::: widget 2J
:::

::: words
Clear the board.

1. **1K** from the + row above strip 58 into **58a**.
2. Red LED: long leg **58c**, short leg **57c**.
3. Green LED, beside it: long leg **58e**, short leg **57e**. The same two strips, so both share the one 1K.
4. Black jumper from **57a** to the − row. Predict: will both light?
5. Power on.
:::

::: why
Side by side, the two LEDs get the same push. A red LED starts to light at about 2 V. A green one needs more, about 2.2 to 3 V (Mims p. 67). As the push comes up, the red one starts to conduct first, and once it does, it holds the push across both of them at about 2 V. That's below the green one's toll, so almost no current goes through the green: it stays dark, or glows faintly.

It's G's lesson again: electricity takes the path of least resistance. The red LED is the easier way, so it takes nearly all the current. The two LEDs aren't sharing fairly. The next panel fixes it.
:::

::: panel K
kicker: Your turn: route it
title: Make both LEDs light
pages: Mims pp. 20–21, 67–69, 96, 113
minutes: 7
new: bench-test before class. The jumpers-only try (58d to 58g, 58i to 57i, 57g to 57d) should leave both dark. The route (red 58c to 59c, green 59i to 57i, jumpers 59d to 59g and 57g to 57d) should light both, a little dimmer than the red alone: about 5 mA, or about 4 mA if your green takes nearer 3 V
:::

::: widget 2K
:::

**Your turn:** make both light. No new resistor, and the 1K and the black jumper on 57 stay put. Keep jumpers off the + row: they would skip the 1K or short the battery. Power off while you work. Try just jumpers first, then press **Next** in the drawing.

::: words One way (open it after you try)
1. One try, jumpers only: leave the LEDs where they are. Jumpers from **58d** down to **58g**, across from **58i** to **57i**, and back up from **57g** to **57d**. Predict: will both light?
2. Power on and look at both LEDs. Then power off and take the three jumpers out.
3. Red LED: keep the long leg in **58c** and move the short leg to **59c**, one strip to the left.
4. Green LED below the center gap: long leg **59i**, short leg **57i**.
5. A jumper down across the gap, from **59d** to **59g**.
6. A jumper back up, from **57g** to **57d**. Predict: brighter or dimmer than the red alone in J?
7. Power on.
:::

::: why
A jumper wire is a strip you can bend: whatever its two ends touch is connected (Mims p. 96). The center gap splits every strip into a top half and a bottom half, so nothing gets across unless a jumper or a part bridges it.

**Why jumpers alone can't do it.** A jumper only joins places. It can't split them. In J each LED has one leg in strip 58 and one in strip 57, so both always get the same push, and the red, with the lower toll, takes nearly all the current (G's lesson). Jumpers can't move those legs, so the two LEDs keep sharing that one push. That leaves a jumper only three things it can do. It can change nothing, and only the red lights. It can join 58 to 57, like the try in the drawing: that's G's bypass, a free path with no toll, so both go dark. Or it can come from the + row, which is why the rules keep it off: into strip 58 it skips the 1K, nothing holds the current back, and the LEDs burn out. Into 57 or the − row, it shorts the battery.

**Why moving a leg works.** The key move is the red's short leg. In 59 it no longer lands on strip 57, so the red can't send the current straight to the − row. Now the two LEDs don't sit on the same two strips: the red goes from 58 to 59, the green from 59 to 57, one after the other. That's one loop. In J the two LEDs got the same push. Now they get the same current, all the way around (E's lesson), so the red can't hog it. Their tolls add up, about 2 V plus about 2.2 V, which leaves about 4.8 V for the 1K: about 5 mA, a little dimmer than the red alone.

**Why the green went below the gap.** It didn't have to. Long leg 59e, short leg 57e works too, with no jumpers at all. Down below, the jumpers carry the current to the green and back: that's the routing practice.

The other fix is H's: give each LED its own resistor. Mims p. 113: "Be sure to use individual Rs for each LED."
:::

::: teacher
Every group tries jumpers only first, as the page asks. Let them power it on and see both go dark (or nothing change), then ask: both LEDs still sit on 58 and 57, so can any jumper split them? Stop any jumper from the + row before power on. Into 58, around the 1K, it lights both for a moment and burns them out. Into 57 or the − row, it shorts the battery. Also right: the red's short leg to 59c and the green's long leg to 59e, on the top half, with no jumpers. Accept it: below the gap is the routing practice.
:::

::: panel L
kicker: The pushbutton
title: The LED lights only while you hold the button
pages: Mims p. 25
outside: how the kit's four-legged pushbutton is wired inside (Mims p. 25 covers switches in general)
minutes: 5
:::

::: widget 2L
:::

::: words
Clear the board.

1. **1K** from the + row above strip 58 to **58a**. It hops over the − row.
2. LED: long leg **58c**, short leg **56c**.
3. Pushbutton across the center gap: legs in **56e, 54e, 56f and 54f.** Press until all four legs are seated.
4. Black jumper from **54h** to the − row.
5. Power on, then press and hold.

Pressing closes the loop; letting go opens it. The loop goes in at strip 56 on the top half and out at strip 54 on the bottom half. Those two legs are diagonally opposite, and the diagonal always goes through the switch, whichever way the button is turned.
:::

::: why
A switch is a break in the loop that you can close (Mims p. 25). This one is spring loaded and normally open: until you press it, there's a gap in the loop and no current flows. Press it and the gap closes. Let go and the spring opens it again. Every switch, from a light switch to a guitar pedal's footswitch, is doing the same job: closing and opening a loop.
:::

::: panel M
kicker: Your turn: two buttons
title: Light the LED only when both buttons are pressed. Then when either one is.
pages: Mims p. 25
minutes: 8
:::

::: pictures
parts/pushbutton.svg | Pushbutton × 2
parts/led.svg | Red LED × 1
parts/resistor-strip.svg | 1K × 1, off the strip
:::

Figure out the wiring as a group, then call James to check it. The 1K stays in the loop.

::: teacher
**#12:** two pushbuttons in series: you need both pressed. Side by side (in parallel): either one works. The answer sheet has the details.
:::

::: panel N
kicker: Your turn: mute buttons
title: Three lights, three buttons. Each button mutes one light.
pages: Mims p. 25
minutes: 12
:::

::: pictures
parts/pushbutton.svg | Pushbutton × 3
parts/led.svg | Red LED × 3
parts/resistor-strip.svg | 1K × 3, off the strip
:::

Figure out the wiring as a group, then call James to check it. Every LED keeps its own 1K.

::: teacher
**#13:** the three loops (H) with a button in each branch. A button **in series** with each branch lights its LED only while held; a button **across** each LED darkens it while held (9 V ÷ 1,000 Ω ≈ 9 mA through the button, safe). Accept both; the second is the true mute. p. 25.
:::

::: panel O
kicker: The pot dimmer
title: Turn the knob: one way dims, the other brightens
pages: Mims pp. 31, 112 (the book's own "variable brightness LED" circuit)
outside: the kit's pot is 10K, marked "103"; Mims's version uses a 1K pot
minutes: 8
:::

::: widget 2O
:::

::: remember
The 330 is always there, so even with the pot at zero the LED is safe.
:::

::: words
Clear the board.

1. The pot: legs in **56c, 55c and 54c**, each leg in its own strip. The middle leg is the wiper.
2. Red jumper from the + row above strip 57 to **56a** (it hops over the − row). It feeds one end of the pot. Nothing else goes in strip 54.
3. **330** from **55e** (the wiper's strip) to **52e**. It goes in before the power, every time.
4. LED: long leg **52c**, short leg **51c**.
5. Black jumper from **51a** to the − row.
6. Power on and turn the knob.

Series resistances add. Pot set to its full 10K: 10,000 + 330 = 10,330 Ω, so 7 V ÷ 10,330 Ω ≈ 0.7 mA (dim). Pot set to 0 Ω: just the 330, so about 21 mA (bright).
:::

::: why
A pot is a resistor with a slider, the wiper, that rides along it (Mims p. 31). Use one end and the wiper and you get a resistor you can turn: from 0 up to the full 10K. Turn it toward more ohms and it holds back more current, so the LED dims; turn it back and the LED brightens. A volume knob is a pot too: turning it changes how much gets through.

The 330 is in the loop the whole time, so even with the pot at zero the LED never gets more than its safe 21 mA.
:::

::: dark
All three pot legs in one strip? Then turning it changes nothing. Each leg needs its own strip.
:::

::: panel P
kicker: Hand-cranked AC
title: Flip the battery, and the light moves
pages: Mims pp. 18, 69 (the book's "LED polarity indicator")
minutes: 5
:::

::: widget 2P
:::

::: words
Clear the board.

1. **1K** from the + row above strip 58 to **58a**. It hops over the − row.
2. LED A: long leg **58b**, short leg **56b**.
3. LED B, facing the other way: long leg **56d**, short leg **58d**.
4. Black jumper from **56a** to the − row. Predict: which LED will light?
5. Power on. Then flip the battery, slowly: **unclip both clips first** (never let them touch), clip red onto the jumper in the − row and black onto the jumper in the + row. Swap back the same way, two or three times. Finish with red on the + jumper.
:::

::: why
A battery gives direct current, DC: the push always goes the same way. An LED is a one-way door, so only the LED facing that way lights. Flip the battery and the push reverses, so the other LED lights instead.

Current that keeps reversing is alternating current, AC (Mims p. 18). Your hands can flip it every few seconds at best. Flip it fast enough and both LEDs seem to be on at once, because your eyes can't keep up: the book's "LED polarity indicator" (p. 69) uses exactly this to show AC.
:::

::: panel Q
kicker: You are the oscillator
title: One touch, one click. Tap fast: a buzz.
pages: Mims pp. 18, 27
outside: which buzzer is the passive one, and what's inside it
minutes: 4
:::

::: widget 2Q
:::

::: remember
Sound is change. Hold the voltage still and the speaker holds still.
:::

::: words
Clear the board.

1. **330** from the + row above strip 52 to **52a**. It hops over the − row.
2. The **passive** buzzer (usually the one with the green board showing underneath; James will tell you which): one leg in **52c**, the other in **49c**, either way round.
3. Black jumper: one end in **49a**. Leave the other end loose, just over the − row above strip 48.
4. Power on. Touch the loose end into the − row and lift it. Then tap faster and faster.

One touch, one click. Hold the wire still: silence. Tap fast: a rough buzz.
:::

::: why
The passive buzzer works like a tiny speaker (Mims p. 27 shows how a speaker works). It only makes a sound when the current changes: each touch starts the current and each lift stops it, so it clicks. Hold the wire still and the current is steady, so the speaker holds still and you hear nothing. Tap fast and the clicks crowd together into a rough buzz. Past about 20 clicks a second, faster than any hand, they blur into a tone, and the faster the clicks, the higher the pitch. Try it with Keep tapping in the drawing.

An oscillator is a circuit that does the tapping for you, hundreds or thousands of times a second. You'll build one later in the unit.
:::

## If you finish early
On a laptop? Rebuild any panel in the breadboard simulator (the button at the top of this page).

Each challenge names a result. Figure out the wiring yourselves, then call James to check it.

::: challenge
**#11.** Three lights. One button turns off only the middle one.
:::

::: challenge
**#14.** Three red LEDs in a series string light up. Will three **blue** LEDs in the same string? Predict, then try it.
:::

::: challenge
**Light both.** In P, only one LED lights at a time. How could you get both LEDs to light? There's more than one way.
:::

::: teacher
**#11:** the series string (E), with a pushbutton wired across LED 2 (in place of the bypass jumper). Press: LED 2 dark, the other two brighter (15 mA). Mims pp. 21, 25.
**#14:** much dimmer than the reds, maybe dark. Each blue LED takes about 3 V, so three use up nearly all of the 9 V and very little is left to push current through the 330. A fresh battery runs a bit over 9 V, so you may see a faint glow. **Bench-test before class** and set the answer to what your board does. Blue ≈ 3 V is outside the book (Mims p. 67 gives red 1.6–2.0 V, green and yellow 2.2–3.0 V).
**Light both:** three answers. Flip fast (AC). Turn LED B around so both face + (they share the 7 mA, so each is dimmer: fine with two reds, but J shows why two LEDs side by side normally each get their own 1K). Put them in series, as in K (9 − 4 = 5 V, so 5 mA through both).
:::

## Stuck?

::: dark
1. Power: is the + jumper in?
2. Are both ends of the loop on the same rail?
3. Is every connection two legs in the same strip, on the same side of the gap?
4. Is an LED backwards? Flip it.
5. Checker: trace the loop out loud, strip by strip, + back to −.
6. Still dark? Test the parts with no board. Unclip both clips from the jumpers. Twist one leg of a **1K** around the LED's long leg. Clip red to the resistor's free leg and black to the LED's short leg, and keep the two clips apart. Lit: it's a placement problem on the board. Dark: flip the LED. Still dark: the battery, the snap or the LED is bad.
:::

::: remember
When a circuit fails, remove parts until the problem is small enough to see.
:::

## Clean-up (10 min)

::: checklist
- Battery unclipped and set aside
- Every part back in its bag
- Board cleared
- Checker counts the LEDs and resistor strips back in
:::
