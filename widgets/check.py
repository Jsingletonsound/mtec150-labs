"""Steps through every widget, reveals every prediction, works every control,
screenshots each step and reports script errors.

Usage:  python3 build.py && python3 check.py          (all parts)
        python3 check.py A C                          (just those)
Screenshots land in ./shots/. Look at them, don't just read the error count.
"""
import sys, asyncio, pathlib
from playwright.async_api import async_playwright

d = pathlib.Path(__file__).parent

async def run_part(b, k):
    pg = await b.new_page(viewport={'width': 720, 'height': 900})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.goto((d/f'test{k}.html').as_uri())
    await pg.emulate_media(reduced_motion='reduce')
    n = await pg.evaluate('S.length')
    out = d/'shots'; out.mkdir(exist_ok=True)
    notes = []
    for i in range(n):
        await pg.evaluate(f'go({i},false)')
        if await pg.evaluate(f'!!S[{i}].q'):
            await pg.click('button:has-text("Show result")')
        ix = await pg.evaluate(f'S[{i}].ix||""')
        if ix == 'hold':
            await pg.evaluate('press(true)')
        if ix == 'flip':
            await pg.evaluate('st.sw=true;draw(false)')
        if ix == 'tap':
            await pg.evaluate('tap(true)')
        if ix == 'ab':
            await pg.evaluate('st.ab=1;draw(false)')
        if ix == 'pot':
            await pg.evaluate('st.pot=.5;draw(false)')
        await pg.screenshot(path=str(out/f'{k}{i:02d}.png'), full_page=True)
        info = await pg.evaluate("[document.getElementById('ct').textContent, document.getElementById('tt').textContent, document.getElementById('ro').textContent, document.querySelectorAll('.flow').length]")
        notes.append(info)
    await pg.close()
    return n, notes, errs

async def main(keys):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        bad = 0
        for k in keys:
            if not (d/f'test{k}.html').exists():
                continue
            n, notes, errs = await run_part(b, k)
            for row in notes:
                print(k, row)
            print(f'{k}: {n} steps, errors: {errs or "none"}')
            bad += len(errs)
        await b.close()
        sys.exit(1 if bad else 0)

asyncio.run(main(sys.argv[1:] or list('KABCDE')))
