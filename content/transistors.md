---
title: "Lab 3: diodes, transistors, tone"
session: "E03 · after Lecture 3"
date: 2026-10-29
status: draft
rests_on: "Lecture 3: Mims pp. 22–23 (callback), 42–51 (semiconductors, diode, transistor), 66–71 revisited, 113–115"
minutes: 80
---

# Lab 3: diodes, transistors, tone

**Today you'll** build a one-way valve, let a tiny current control a big one, and make a circuit that flips by itself: first a blink, then a tone.

::: teacher
**DRAFT. The most fragile week.** Board steps and widgets come after James's bench test (due Oct 26).
- The multivibrator isn't bench-tested yet (OI-06). Catalog estimate at 5 V: about 1–2 Hz with 10 µF caps, about 150 Hz with 0.1 µF.
- These circuits are **adaptations**: Mims's p. 113 flasher uses PNP 2N3906 transistors and 22 µF caps; p. 115 pairs a 2N3904 with a 2N3906. The kit has NPN PN2222s and 10/100 µF. Label them that way on the page.
- Power-module feed undecided (OI-03); a USB cable from a phone charger needs no purchase. Check the transistor print and leg order (OI-10).
- Re-run the Kit Day inventory sheet at the end of this lab (transistors, passive buzzer).
**Engine work needed:** transistor part (three legs, E-B-C), diode part, and an animated multivibrator. Spec when James is ready.
:::

## The exercises

| # | Exercise | What happens | Min | Mims |
|---|---|---|---|---|
| 26 | Diode as a one-way valve | Diode in the LED loop; flip it: dark | 8 | 44–47 |
| 28–29 | Transistor switch; small controls big | Touch two jumpers and a tiny base current turns the LED on. Base resistor 1M: dim; 100K: full | 20 | 48–51 |
| 30 | Night light | Photoresistor on the base: the LED turns on when you cover it | 12 | 48–51, 70–71, 114 |
| 33–35 | Multivibrator: blink, tone, light theremin | Two transistors trade off about once a second; smaller caps turn the blink into a pitch on the passive buzzer; a photoresistor lets your hand bend the pitch | 30 | 113, 115 (callbacks 22–23, 27) |
| 27 | Challenge: rectifier | Four diodes: the LED lights whichever way the battery goes in | up to 12 | 44–47 |

::: teacher
TODO (James): bench-test, then the lab chat writes the steps and configs. The schematic-only handout style applies here (the Lab 3 rule: thinner handouts each lab).
:::
