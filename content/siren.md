---
title: "The Siren Lab"
session: "E04 fallback · after the coils lecture"
date: 2026-11-05
status: hidden
rests_on: "Labs 1–3, plus Lecture 4: the passive buzzer is a coil and a magnet (Mims pp. 27, 38–39)"
minutes: 95
---

# The Siren Lab

**Today you'll** build a police siren: red and blue lights trading off, and a buzzer whose pitch jumps with them. It's the Lab 3 flip-flop twice on one board. Running about once a second, it's a light show. Running hundreds of times a second, it's a voice.

::: teacher
**BACK POCKET. Hidden.** Publish only if the guest workshop falls through and the bench test passes (due Oct 31).
Bench-test: is the passive buzzer loud enough at a siren pitch? Does a flashing LED taped against the photoresistor move the pitch enough?
Combining two of Mims's circuits is an adaptation: label it outside the book.
Parts per group: 4 PN2222 (kit has 5), 1 photoresistor (kit has 2), the pot, the passive buzzer (no spare), two 10 µF and two 0.1 µF caps, a red and a blue LED, resistors, jumpers, one 9 V battery.
If the siren fails the bench test, run the reserve lab instead (see the unit map): #13, #12, #17, #31, #32, #27, then the Troubleshoot boards.
:::

## The steps

| Step | What you build | Min | Rests on |
|---|---|---|---|
| 1 | Police lights: the Lab 3 blinker with one red and one blue LED | 20 | Mims p. 113 (Lab 3) |
| 2 | The voice: a second flip-flop on the same board, with 0.1 µF caps, driving the passive buzzer | 20 | pp. 113, 115 (Lab 3) |
| 3 | The wail, by hand: the pot, or your hand over the photoresistor, bends the pitch | 10 | pp. 31, 70–71 |
| 4 | Automatic two-tone: tape the voice circuit's photoresistor against one flashing LED, so the pitch jumps with every flash | 20 | pp. 70–71 |
| 5 | Make: tune your siren. Swap caps to change the flash speed (Lab 2's R × C). Judge the most convincing one | 15 | pp. 32–37 |
| | Clean-up | 10 | |

::: outside
Combining two flip-flops into a siren is an adaptation of Mims's circuits. A smooth rising-and-falling wail isn't reliable with these parts; you make that one by hand in step 3.
:::

Use the **passive** buzzer. The active one has its own built-in oscillator and only plays one pitch.
