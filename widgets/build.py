"""Builds one HTML fragment per widget config, plus a stand-alone test page for each.

Usage:  python3 build.py            (all parts)
        python3 build.py A K        (just those)

Output: partX.html = the widget fragment (markup + one <script>)
        testX.html = the same fragment inside a page with stand-in CSS variables
                     (the variables the original chat host supplied; the real site
                     supplies its own, see 01_SITE_SPEC.md)
"""
import sys, pathlib
d = pathlib.Path(__file__).parent
META = {
 'K': ('Kit Day, first light and the rail test',
       'Breadboard with a 9 volt battery. A 1K resistor from the plus row to strip 58, a red LED from strip 58 to 57, and a black jumper from strip 57 to the minus row, then the rail test, then four swaps: the short leg moved one strip, the jumper moved to match, the LED across the center gap, and the LED placed before the resistor.'),
 'A': ('Lab 2 part A, meet the board: first light, flip the LED, breadboard detective',
       'Breadboard with a 9 volt battery. A 1K resistor from the plus row to strip 58, a red LED from strip 58 to 57, and a black jumper from strip 57 to the minus row, followed by five tests.'),
 'B': ('Lab 2 part B, the resistor ladder',
       'The first-light circuit with the resistor swapped from 100K down to 330 ohms, the LED getting brighter at each step.'),
 'C': ('Lab 2 part C, loop rules: series, bypass, parallel',
       'Three red LEDs in series through one 330 ohm resistor, a bypass jumper around the middle LED, then three LEDs in parallel, each with its own 1K.'),
 'D': ('Lab 2 part D, control: pushbutton and pot dimmer',
       'An LED loop closed by a pushbutton across the center gap, then a potentiometer and 330 ohm resistor dimming an LED.'),
 'E': ('Lab 2 part E, costumes: hand-cranked AC and you are the oscillator',
       'Two LEDs facing opposite ways share one resistor; flipping the battery switches which one lights. Then a passive buzzer clicks each time a loose wire is tapped.'),
 # Lab 2 (Oct 15) since 2026-10-12: one experiment and one result per drawing, built from an empty board.
 '2B': ('Lab 2 B, the resistor ladder',
        'The first-light circuit with the resistor swapped from 100K down to 330 ohms, the LED getting brighter at each step.'),
 '2C': ('Lab 2 C, two 1Ks one after the other',
        'Two 1K resistors one after the other feed a red LED: dimmer than one 1K.'),
 '2D': ('Lab 2 D, two 1Ks side by side',
        'Two 1K resistors side by side both feed a red LED: brighter than one 1K.'),
 '2E': ('Lab 2 E, three LEDs in one loop',
        'Three red LEDs in series through one 330 ohm resistor.'),
 '2F': ('Lab 2 F, pull the middle LED',
        'Three red LEDs in series; pulling the middle one darkens all three.'),
 '2G': ('Lab 2 G, two ways to go',
        'Three red LEDs in series, and a jumper around the middle LED.'),
 '2H': ('Lab 2 H, each LED its own loop',
        'Three LEDs in parallel, each with its own 1K and its own jumper to the minus row.'),
 '2I': ('Lab 2 I, pull one LED',
        'Three LEDs in parallel; pulling one leaves the other two lit.'),
 '2J': ('Lab 2 J, two LEDs, one resistor',
        'A red LED and a green LED side by side share one 1K: only the red lights.'),
 '2K': ('Lab 2 K, make both LEDs light',
        'The red and green LEDs from J. First, jumpers only: a path from strip 58 down through the bottom rows and back into 57 joins the two strips, and both LEDs go dark. Then the LEDs are rewired with two jumpers and no new resistor: the red LED\'s short leg swings to strip 59, the green LED moves below the center gap, one jumper carries the current down across the gap to it and another brings it back up to strip 57. Both light, in one loop.'),
 '2L': ('Lab 2 L, the pushbutton',
        'An LED loop closed by a pushbutton across the center gap.'),
 '2O': ('Lab 2 O, the pot dimmer',
        'A potentiometer and a 330 ohm resistor dimming an LED.'),
 '2P': ('Lab 2 P, hand-cranked AC',
        'Two LEDs facing opposite ways share one 1K resistor; flipping the battery switches which one lights.'),
 '2Q': ('Lab 2 Q, you are the oscillator',
        'A passive buzzer and a 330 ohm resistor; the buzzer clicks each time a loose wire is tapped into the minus row.'),
}
head = (d/'head.html').read_text()
eng = ''.join((d/f'engine{i}.js').read_text() for i in (1, 2, 3))
SHIM = """<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<link rel=stylesheet href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css">
<style>
:root{--text-primary:#1f1e1d;--text-secondary:#5f5e5a;--text-muted:#888;--text-accent:#185FA5;--border:rgba(0,0,0,.12);--border-strong:rgba(0,0,0,.25);--font-mono:monospace;--radius:8px}
body{font-family:sans-serif;font-size:16px;max-width:680px;margin:10px;background:#fff;color:var(--text-primary)}
.ts{font-size:12px}.sn{font-weight:700;paint-order:stroke;stroke:#F4F2EC;stroke-width:4px;stroke-linejoin:round}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
button{font:inherit;font-size:14px;padding:6px 12px;border:.5px solid var(--border-strong);border-radius:8px;background:transparent}
</style></head><body>"""
for k in sys.argv[1:] or META:
    cfg = d/f'cfg{k}.js'
    if not cfg.exists():
        continue
    t, ds = META[k]
    w = head.replace('{{SR}}', 'Animated breadboard: ' + t).replace('{{TITLE}}', t[0].upper() + t[1:]).replace('{{DESC}}', ds)
    w += '<script>\n' + cfg.read_text() + eng + '</script>\n'
    (d/f'part{k}.html').write_text(w)
    (d/f'test{k}.html').write_text(SHIM + w + '</body></html>')
    print(k, len(w), 'chars')
