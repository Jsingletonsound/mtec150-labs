---
title: "Lab 2: capacitors and time"
session: "E02 · after Lecture 2"
date: 2026-10-22
status: draft
rests_on: "Lecture 2: Mims p. 30 (photoresistor, thermistor: mention), pp. 32–37 (capacitors, R-C time, the 63% rule); photoresistor how-only from pp. 70–71"
minutes: 95
---

# Lab 2: capacitors and time

**Today you'll** store a push in a capacitor, time how long it takes to drain, and build an attack and a release: the same curve you met as RT60.

::: teacher
**DRAFT.** Board steps and widgets come after James's bench test (due Oct 19). Nothing below goes to students until then.
Core 50 + clean-up 10 = 60; the fill (challenge #22, the Make block, the simulator) brings it to about 95. This is the short week; the fill is provisional.
Needs: 1000 µF caps from department stock, 7 or more (OI-09).
**Engine work needed before these widgets:** the current engine has no capacitor and no time-varying brightness. Spec it when James is ready: a capacitor part (black can, stripe = −), charge and discharge over time with brightness following the R × C curve, and a "pull power" control.
:::

::: safety
- Electrolytic capacitors: the **stripe marks the − leg.** Backwards, they can bulge or pop.
- Nothing below **330 Ω** in series with one LED.
- **Power off to change parts.**
:::

## The exercises

| # | Exercise | What happens | Min | Mims |
|---|---|---|---|---|
| 18 | Cap keeps the LED lit | A 1000 µF cap across the rails: pull the power, and the LED fades instead of snapping off | 10 | 32–35 |
| 19 | Fade time vs. resistor | 1K → 5.1K: a fade of a second or two becomes 5 seconds or more | 8 | 34–37 |
| 20 | Fade time vs. cap size | 10, 100, 1000 µF: a blink, a short fade, a long fade. The same curve as RT60 | 8 | 34–37 |
| 21 | Release | Press a button, the LED lights; let go, it fades | 10 | 32–35, 25 |
| 23 | A cap passes change, blocks steady | LED in series with a cap: one flash, then dark | 8 | 35–37 |
| 24 | Light-controlled dimmer | Photoresistor in the loop: cover it, dim; flashlight, bright | 6 | 30, 70–71 |
| 22 | Challenge: attack | Make the LED fade **in** | 10 | 32–35 |
| — | Make: an envelope | One LED that fades in and fades out: attack and release | 15 | 32–37 |
| — | Simulator | Rebuild #19 with numbers on; compare the 1K and 5.1K fades | 10 | meter substitute |

::: teacher
TODO (James): bench-test each one, then the lab chat writes the steps and the widget configs.
:::
