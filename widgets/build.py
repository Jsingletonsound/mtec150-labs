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
 'A': ('Lab 1 part A, meet the board: first light, flip the LED, breadboard detective',
       'Breadboard with a 9 volt battery. A 1K resistor from the plus row to strip 58, a red LED from strip 58 to 57, and a black jumper from strip 57 to the minus row, followed by five tests.'),
 'B': ('Lab 1 part B, the resistor ladder',
       'The first-light circuit with the resistor swapped from 100K down to 330 ohms, the LED getting brighter at each step.'),
 'C': ('Lab 1 part C, loop rules: series, bypass, parallel',
       'Three red LEDs in series through one 330 ohm resistor, a bypass jumper around the middle LED, then three LEDs in parallel, each with its own 1K.'),
 'D': ('Lab 1 part D, control: pushbutton and pot dimmer',
       'An LED loop closed by a pushbutton across the center gap, then a potentiometer and 330 ohm resistor dimming an LED.'),
 'E': ('Lab 1 part E, costumes: hand-cranked AC and you are the oscillator',
       'Two LEDs facing opposite ways share one resistor; flipping the battery switches which one lights. Then a passive buzzer clicks each time a loose wire is tapped.'),
}
head = (d/'head.html').read_text()
eng = ''.join((d/f'engine{i}.js').read_text() for i in (1, 2, 3))
SHIM = """<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<link rel=stylesheet href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css">
<style>
:root{--text-primary:#1f1e1d;--text-secondary:#5f5e5a;--text-muted:#888;--text-accent:#185FA5;--border:rgba(0,0,0,.12);--border-strong:rgba(0,0,0,.25);--font-mono:monospace;--radius:8px}
body{font-family:sans-serif;font-size:16px;max-width:680px;margin:10px;background:#fff;color:var(--text-primary)}
.ts{font-size:12px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
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
