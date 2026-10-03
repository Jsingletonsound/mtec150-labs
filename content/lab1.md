---
title: "Lab 1: one loop, then several"
session: "E01 · after Lecture 1"
date: 2026-10-15
status: published
rests_on: "Lecture 1: Mims pp. 6–9, 13–14, 18–21, 24–25, 27, 28–31, the p. 47 note, and the LED block (pp. 66–69)"
minutes: 78
---

# Lab 1: one loop, then several

**Today you'll** use Ohm's law on a real circuit, prove how the board connects things, control current with resistors, switches and a knob, and turn a battery into AC by hand.

::: teacher
Core 68 min + clean-up 10 = 78. Session math: 51 lecture + 10 break + 78 lab = 139 of 170 min. The challenges (up to 22) and the simulator (10) fill the slack; the extras are only for groups that are ahead.
Bench-test #14 (three blues) before class: it may glow faintly rather than stay dark; the teacher answer below allows for either.
Minutes: A 15 (first light was done on Kit Day) · B 12 · C 19 · D 13 · E 9.
If it runs long, cut in this order: the challenges, then Part A's Test 4, then the 5.1K rung.
Owed before class (OI-12): build every part twice at home; bench-test the buzzer tap (Part E) for loudness; confirm the rail-test results from Kit Day.
:::

Roles rotate at every part: 2 builders, reader, checker, predictor. The predictor calls each "Predict" out loud before anyone looks.

**Three phrases this page uses:**
- **Power off** = lift the + jumper out of the + row and set it away from the board. **Power on** = put it back in.
- **Clear the board** = power off, then pull everything except the − battery jumper.
- **"The + row above strip 58"** = the + row hole nearest strip 58. Every hole in a rail row is the same.

::: safety
- Nothing below **330 Ω** in series with one LED.
- At most **3 red LEDs** in one series string.
- **Power off before you add or move a part,** then power on to see the result. The only exceptions: pulling a part out on purpose to watch what happens (Part C), and the battery flip and the tapping wire in Part E.
- **Never let the two battery clips touch.** A warm battery? Unclip it.
:::

::: outside
The purple dots in the drawings flow from + to −: **conventional current**, the way most schematics draw it. Mims draws electron flow, − to + (p. 47). Same circuit, two bookkeeping conventions.

"Long leg = +" is outside the book too: Mims shows the flat mark on the LED's rim, on the cathode (−) side (p. 68).
:::

## Part A: Meet the board (15 min)
*Rests on Mims pp. 14, 20–21, 66–69, 96.*

::: widget A
:::

Rebuild first light from Kit Day. This time you know why it works.

Power off first: − battery jumper in, + jumper out.

::: steps
1. **1K** from the + row above strip 58 to **58a**. It hops over the − row; don't let its leg land there.
2. Red LED: **long leg 58c, short leg 57c.**
3. Black jumper from **57a** to the − row.
4. Power on, last.
:::

The LED takes about 2 V just to light: its toll. That leaves 7 V for the 1K. Ohm's law: **(9 V − 2 V) ÷ 1,000 Ω = 7 mA.**

::: remember
Voltage is the push. Current is how much flows. Resistance is what holds it back.

The LED sets the direction. The resistor sets the amount.
:::

Now the tests. The predictor calls each one before anyone touches the board. For every test: power off, make the change, power on.

::: predict Test 1: flip the LED (long leg 57c, short leg 58c). Lit or dark?
**Dark.** The LED is a one-way door. Nothing breaks: the 1K still limits the current. Flip it back.
:::

::: predict Test 2: move only the short leg, from 57c to 56c. Lit or dark?
**Dark.** Strip 56 doesn't touch strip 57, so the short leg no longer shares a strip with the jumper.
:::

::: predict Test 3: now move the jumper from 57a to 56a. Lit or dark?
**Lit.** Parts connect only by sharing a strip.
:::

::: predict Test 4: jumper back to 57a, and put the LED across the center gap (long leg 58e, short leg 57f). Lit or dark?
**Dark.** The gap splits strip 57 in two: 57f isn't connected to 57a.
:::

Test 5 in the drawing is the rail test. Skip it if your group did it on Kit Day.

## Part B: The resistor ladder (12 min)
*Rests on Mims pp. 14, 28–29.*

::: widget B
:::

Start from first light: if Part A's tests moved anything, put it back (LED long leg 58c, short leg 57c; black jumper from 57a to the − row). Then swap **only the resistor**, and power off before every swap.

::: predict Before you swap anything, write down the order from dimmest to brightest: 330, 10K, 1K, 100K, 2K, 5.1K.
Dimmest to brightest: **100K, 10K, 5.1K, 2K, 1K, 330.** Less resistance, more current, more light.
:::

Check your prediction after you've written it down:

| Resistor | 7 V ÷ R | What you'll see |
|---|---|---|
| 100K | 0.07 mA | Looks dark. Cup your hands around it: a faint glow. Dark isn't zero. |
| 10K | 0.7 mA | Dim |
| 5.1K (optional) | 1.4 mA | Dim to medium |
| 2K | 3.5 mA | Clearly on |
| 1K | 7 mA | Bright |
| 330 | 21 mA | Brightest. Stop here. |

::: predict Swap between the 1K and the 330 a few times. The 330 passes three times the current. Does it look three times brighter?
**No,** only somewhat brighter. The LED really does put out about three times the light (Mims p. 67), but your eyes judge brightness by ratios, the same way your ears judge loudness. Sound familiar? It's the decibel idea from the first half of the course.
:::

::: outside
The link between brightness, ratios and decibels.
:::

::: predict Why stop at 330? The next value down is 220; those strips went to James on Kit Day. Just do the math: how much current would it pass?
**7 V ÷ 220 Ω = 32 mA.** The LED is rated about 20 mA (maximum about 25–30), so 220 is too much. 330 gives 21 mA: normal operation, just the brightest allowed.
:::

::: outside
The LED's 20 mA rating comes from data sheets, not Mims.
:::

## Part C: Loop rules (19 min)
*Rests on Mims pp. 20–21.*

::: widget C
:::

**Series:** clear the board.

::: steps
1. **330** from the + row above strip 60 to **60a**. It hops over the − row.
2. LED 1: long leg **60c**, short leg **58c**.
3. LED 2: long leg **58e**, short leg **56e**. It shares strip 58 with LED 1's short leg.
4. LED 3: long leg **56c**, short leg **54c**.
5. Black jumper from **54a** to the − row.
6. Power on.
:::

All three LEDs sit in one loop, so the same current goes through all three. Each takes its 2 V toll: **9 V − 6 V = 3 V left, and 3 V ÷ 330 Ω = 9 mA.**

::: predict With the power on, pull LED 2 out of the board. What happens to LEDs 1 and 3?
**LEDs 1 and 3 both go dark.** In series, everything shares one path. Break it anywhere, and it all stops.
:::

::: predict Power off. Put LED 2 back, and add a jumper from 58a to 56a. Power on. What happens to each LED?
**LED 2 goes dark, and LEDs 1 and 3 get brighter.** The jumper ties strips 58 and 56 together, so LED 2 has the same push on both legs and nothing flows through it. Two tolls instead of three: **9 − 4 = 5 V, and 5 V ÷ 330 Ω = 15 mA.**
:::

**Parallel:** clear the board. This time each LED gets its own loop.

::: steps
1. Branch 1: **1K** from the + row above strip 60 to **60a** (each 1K hops over the − row). LED long leg **60c**, short leg **59c**. Jumper **59a** to the − row.
2. Branch 2: **1K** from the + row above strip 57 to **57a**. LED long leg **57c**, short leg **56c**. Jumper **56a** to the − row.
3. Branch 3: **1K** from the + row above strip 54 to **54a**. LED long leg **54c**, short leg **53c**. Jumper **53a** to the − row.
4. Power on.
:::

Each branch: **(9 V − 2 V) ÷ 1,000 Ω = 7 mA.** The battery supplies all three: 21 mA.

::: predict With the power on, pull the LED from branch 2. What happens to the other two?
**They stay lit.** In parallel, each light has its own path. Breaking one leaves the others closed.
:::

::: remember
In series, everything shares one path. Break it anywhere, and it all stops.

Current doesn't pick one path. It takes every open path.
:::

## Part D: Control (13 min)
*Rests on Mims pp. 25, 31; the dimmer is the book's own "variable brightness LED" circuit, p. 112.*

::: widget D
:::

**Pushbutton:** clear the board.

::: steps
1. **1K** from the + row above strip 58 to **58a**. It hops over the − row.
2. LED: long leg **58c**, short leg **56c**.
3. Pushbutton across the center gap: legs in **56e, 54e, 56f and 54f.** Press until all four legs are seated.
4. Black jumper from **54h** to the − row.
5. Power on, then press and hold.
:::

The LED lights only while you hold the button: pressing closes the loop, letting go opens it. The loop goes in at strip 56 on the top half and out at strip 54 on the bottom half. Those two legs are diagonally opposite, and the diagonal always goes through the switch, whichever way the button is turned.

::: outside
How the kit's four-legged pushbutton is wired inside. Mims p. 25 covers switches in general.
:::

**Pot dimmer:** clear the board.

::: steps
1. The pot: legs in **56c, 55c and 54c**, each leg in its own strip. The middle leg is the wiper.
2. Red jumper from the + row above strip 57 to **56a** (it hops over the − row). It feeds one end of the pot. Nothing else goes in strip 54.
3. **330** from **55e** (the wiper's strip) to **52e**. It goes in before the power, every time.
4. LED: long leg **52c**, short leg **51c**.
5. Black jumper from **51a** to the − row.
6. Power on and turn the knob.
:::

Series resistances add. Pot set to its full 10K: 10,000 + 330 = 10,330 Ω, so 7 V ÷ 10,330 Ω ≈ 0.7 mA (dim). Pot set to 0 Ω: just the 330, so about 21 mA (bright).

::: remember
The 330 is always there, so even with the pot at zero the LED is safe.
:::

::: dark
All three pot legs in one strip? Then turning it changes nothing. Each leg needs its own strip.
:::

::: outside
The kit's pot is 10K, marked "103". Mims's version of this circuit uses a 1K pot.
:::

## Part E: Costumes (9 min)
*Rests on Mims pp. 18, 27; the two-LED circuit is the book's "LED polarity indicator," p. 69.*

::: widget E
:::

**Hand-cranked AC:** clear the board.

::: steps
1. **1K** from the + row above strip 58 to **58a**. It hops over the − row.
2. LED A: long leg **58b**, short leg **56b**.
3. LED B, facing the other way: long leg **56d**, short leg **58d**.
4. Black jumper from **56a** to the − row.
:::

::: predict Power on. Which LED lights?
**LED A only.** Both sit between the same two strips, but LED B faces the wrong way for this push.
:::

Now flip the battery, slowly:

::: steps
1. **Unclip both clips first.** Never let them touch.
2. Clip the red clip onto the jumper in the − row, and the black clip onto the jumper in the + row.
3. Swap back the same way. Do it two or three times, slowly.
4. Finish with red on the + jumper, the way you started.
:::

::: predict What happens each time you flip the battery?
Each flip moves the light to the other LED: the push now comes in the other way. Your hands can only flip about once a second. Flip many times a second (try **Keep flipping** in the drawing and speed it up past 15 a second) and **both seem lit at once**, flickering: the current keeps reversing. That's AC (p. 18). The book's polarity indicator shows the same thing: both LEDs glow on AC (p. 69).
:::

**You are the oscillator:** clear the board.

::: steps
1. **330** from the + row above strip 52 to **52a**. It hops over the − row.
2. The **passive** buzzer (usually the one with the green board showing underneath; James will tell you which): one leg in **52c**, the other in **49c**, either way round.
3. Black jumper: one end in **49a**. Leave the other end loose, just over the − row above strip 48.
4. Power on. Touch the loose end into the − row and lift it. Then tap faster and faster.
:::

One touch, one click. Hold the wire still: silence. Tap fast: a rough buzz.

::: remember
Sound is change. Hold the voltage still and the speaker holds still.
:::

::: outside
Which buzzer is the passive one, and what's inside it.
:::

## Challenges for early finishers
Each challenge names a result. Figure out the wiring yourselves, then call James to check it.

::: challenge
**#11.** Three lights. One button turns off only the middle one.
:::

::: challenge
**#13.** Three lights, three buttons. Each button mutes one light.
:::

::: challenge
**#14.** Three red LEDs in a series string light up. Will three **blue** LEDs in the same string? Predict, then try it.
:::

::: teacher
**#11:** the Part C series string, with a pushbutton wired across LED 2 (in place of the bypass jumper). Press: LED 2 dark, the other two brighter (15 mA). Mims pp. 21, 25.
**#13:** the parallel build with a button in each branch. A button **in series** with each branch lights its LED only while held; a button **across** each LED darkens it while held (9 V ÷ 1,000 Ω ≈ 9 mA through the button, safe). Accept both; the second is the true mute. p. 25.
**#14:** much dimmer than the reds, maybe dark. Each blue LED takes about 3 V, so three use up nearly all of the 9 V and very little is left to push current through the 330. A fresh battery runs a bit over 9 V, so you may see a faint glow. **Bench-test before class** and set the answer to what your board does. Blue ≈ 3 V is outside the book (Mims p. 67 gives red 1.6–2.0 V, green and yellow 2.2–3.0 V).
:::

## Extras for fast groups

- **Order doesn't matter (#5):** clear the board. Red jumper from the + row above strip 58 to **58a** (it hops over the − row). LED long leg **58c**, short leg **57c**. **1K** from **57a** to the − row. Power on: same 7 mA as first light, with the LED first and the resistor after it. Order doesn't matter; direction does.
- **Two buttons (#12):** two pushbuttons in series: you need both pressed. Side by side (in parallel): either one works.

## Stuck?

::: dark
1. Power: is the + jumper in?
2. Are both ends of the loop on the same rail?
3. Is every connection two legs in the same strip?
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
