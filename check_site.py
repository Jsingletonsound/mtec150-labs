"""Checks the whole site in a real browser before anything is called done.

Usage:  python3 check_site.py

It builds the site, serves docs/ on this computer only, and opens every page
at laptop width (1280 px) and phone width (390 px). On every page it:
  - fails on any script error or missing file;
  - steps through every widget: every step, every "Show result", every control;
  - checks no widget is cut off by its frame;
  - opens every result, card and "If it's dark" box, and ticks every checkbox;
  - checks the teacher notes are hidden, and shown with ?teacher=1;
  - checks the projector button, the print layout, text contrast, headings,
    and that nothing is wider than a phone screen.
It also steps through every widget on its own (docs/widgets/), including the
ones no page uses yet.

Screenshots land in checks/. Look at them: the checks catch errors, not ugliness.
"""
import asyncio
import functools
import http.server
import pathlib
import re
import shutil
import sys
import threading

from playwright.async_api import TimeoutError as PlaywrightTimeout, async_playwright

import build_site

ROOT = pathlib.Path(__file__).parent
DOCS = ROOT / 'docs'
OUT = ROOT / 'checks'
SIZES = {'desktop': (1280, 900), 'phone': (390, 844)}

problems = []   # anything here makes the check fail
warnings = []   # worth a look, but not a failure


async def visit(page, url, **options):
    """Opens a page, and tries once more if the computer was too busy to finish loading it."""
    try:
        await page.goto(url, **options)
    except PlaywrightTimeout:
        print(f'  (a page took too long to load, trying once more: {url.split("/")[-1]})')
        await page.goto(url, **options)


async def snap(target, **options):
    """Takes a screenshot, and tries once more if the computer was too busy to finish the first.
    A page that is really broken fails the other checks, not this one."""
    try:
        await target.screenshot(**options)
    except PlaywrightTimeout:
        print(f'  (a screenshot timed out, trying once more: {pathlib.Path(options["path"]).name})')
        await target.screenshot(**options)


def fail(where, what):
    problems.append(f'{where}: {what}')


# ---------------------------------------------------------------- serve docs/ locally

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve():
    handler = functools.partial(QuietHandler, directory=str(DOCS))
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server, f'http://127.0.0.1:{server.server_address[1]}/'


def watch(page, where, base):
    """Records script errors and missing files while a page is open."""
    page.on('pageerror', lambda e: fail(where, f'script error: {e}'))
    page.on('console', lambda m: m.type == 'error' and not m.text.startswith('Failed to load resource')
            and fail(where, f'console error: {m.text}'))

    def on_response(r):
        if r.status >= 400:  # an answer came back, so the internet works: this is a real error
            fail(where, f'{r.status} for {r.url}')
    page.on('response', on_response)
    page.on('requestfailed', lambda r: (fail(where, f'could not load {r.url}') if r.url.startswith(base)
                                        else warnings.append(f'{where}: could not load {r.url} (no internet?)')))


# ---------------------------------------------------------------- in-page tests (JavaScript)

CONTRAST_JS = """
(scope) => {
  const root = scope ? document.querySelector(scope) : document.body;
  const parse = c => { const m = /rgba?\\(([^)]+)\\)/.exec(c); if (!m) return null;
    const p = m[1].split(/[\\s,\\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const over = (top, under) => { const a = top[3]; return [0, 1, 2].map(i => top[i] * a + under[i] * (1 - a)).concat(1); };
  const background = el => { const layers = [];
    for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor);
      if (c && c[3] > 0) { layers.push(c); if (c[3] >= 1) break; } }
    let bg = [255, 255, 255, 1]; for (let i = layers.length - 1; i >= 0; i--) bg = over(layers[i], bg); return bg; };
  const bad = [];
  for (const el of root.querySelectorAll('*')) {
    if (el.closest('svg, .sr-only, script, style')) continue;
    const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (!own || !el.getClientRects().length) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility !== 'visible' || +cs.opacity === 0) continue;
    const bg = background(el), fg = over(parse(cs.color), bg);
    const L1 = lum(fg), L2 = lum(bg), ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const size = parseFloat(cs.fontSize), large = size >= 24 || (size >= 18.66 && +cs.fontWeight >= 700);
    if (ratio < (large ? 3 : 4.5)) bad.push(`${ratio.toFixed(2)}:1 "${el.textContent.trim().slice(0, 50)}"`);
  }
  return bad;
}
"""

HEADINGS_JS = """
() => {
  const hs = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].filter(h => h.getClientRects().length || h.classList.contains('sr-only'));
  const out = []; let last = 0;
  if (document.querySelectorAll('h1').length !== 1) out.push(`${document.querySelectorAll('h1').length} h1 headings (want exactly 1)`);
  for (const h of hs) { const n = +h.tagName[1]; if (n > last + 1) out.push(`heading jumps from h${last} to h${n}: "${h.textContent.trim()}"`); last = n; }
  return out;
}
"""


# ---------------------------------------------------------------- widgets

async def wait_fits(page, index, where):
    """The frame should be exactly as tall as the widget inside it: not cut off, no gap."""
    try:
        await page.wait_for_function(
            """(i) => { const f = document.querySelectorAll('iframe.widget-frame')[i];
                        const b = f && f.contentDocument && f.contentDocument.body;
                        return b && Math.abs(f.getBoundingClientRect().height - b.scrollHeight) <= 2; }""",
            arg=index, timeout=4000)
    except Exception:
        sizes = await page.evaluate(
            """(i) => { const f = document.querySelectorAll('iframe.widget-frame')[i];
                        return [f.getBoundingClientRect().height, f.contentDocument.body.scrollHeight]; }""", index)
        fail(where, f'widget frame is {sizes[0]:.0f} px tall but the widget needs {sizes[1]} px')


async def hold(page, frame, button, check_on, check_off, where, use_keyboard):
    """Presses and holds a "Hold to ..." button, by mouse or by keyboard, then lets go."""
    if use_keyboard:
        await button.focus()
        await page.keyboard.down('Space')
    else:
        await button.scroll_into_view_if_needed()
        box = await button.bounding_box()
        await page.mouse.move(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2)
        await page.mouse.down()
    ro = await frame.locator('#ro').text_content()
    if check_on not in ro:
        fail(where, f'holding the button: readout says "{ro}", expected "{check_on}"')
    if use_keyboard:
        await page.keyboard.up('Space')
    else:
        await page.mouse.up()
    ro = await frame.locator('#ro').text_content()
    if check_off not in ro:
        fail(where, f'after letting go: readout says "{ro}", expected "{check_off}"')


async def work_controls(page, frame, where):
    """Works every control the current step has. Returns what was done, for the log."""
    done = []
    ix = frame.locator('#ix')
    show = ix.get_by_role('button', name='Show result')
    if await show.count():
        await show.click()
        why = await frame.locator('#wy').text_content()
        if not why.startswith('Result: '):
            fail(where, '"Show result" did not show a result')
        done.append('result')
    for name, on, off in (('Hold to press', 'Held', 'Released'), ('Hold to tap', 'Touching', 'Lifted')):
        b = ix.get_by_role('button', name=name)
        if await b.count():
            await hold(page, frame, b, on, off, where, use_keyboard=False)
            await hold(page, frame, b, on, off, where + ' (keyboard)', use_keyboard=True)
            done.append(name)
    swap = ix.get_by_role('button', name='Swap 1K and 330')
    if await swap.count():
        for want in ('330', '1K'):
            await swap.click()
            ro = await frame.locator('#ro').text_content()
            if not ro.startswith(want):
                fail(where, f'after Swap, readout says "{ro}", expected it to start "{want}"')
        done.append('swap')
    flip = ix.get_by_role('button', name='Flip the battery')
    if await flip.count():
        for want in ('Flipped', 'Normal'):
            await flip.click()
            if want not in await frame.locator('#ro').text_content():
                fail(where, f'after Flip the battery, readout should say "{want}"')
        done.append('flip')
    for keep in ('Keep flipping', 'Keep tapping'):
        b = ix.get_by_role('button', name=keep)
        if await b.count():
            b = await b.element_handle()  # hold on to it: its label changes
            await b.click()
            if await b.text_content() != 'Stop':
                fail(where, f'"{keep}" should turn into "Stop"')
            await page.wait_for_timeout(400)
            await b.click()
            if await b.text_content() != keep:
                fail(where, f'"Stop" should turn back into "{keep}"')
            done.append(keep)
    sliders = ix.locator('input[type=range]')
    for i in range(await sliders.count()):
        s = sliders.nth(i)
        name = await s.locator('xpath=..').text_content()
        shows = s.locator('xpath=following-sibling::span')
        await s.focus()
        ro_before = await frame.locator('#ro').text_content()
        await page.keyboard.press('End')
        ro_after = await frame.locator('#ro').text_content()
        await page.keyboard.press('ArrowLeft')
        if await s.input_value() != str(int(await s.get_attribute('max')) - 1):
            fail(where, f'the "{name}" slider did not move with the arrow keys')
        if not (await shows.text_content()).strip():
            fail(where, f'the "{name}" slider shows no value')
        if name.startswith('Knob') and ro_after == ro_before:
            fail(where, 'turning the knob did not change the readout')
        await page.keyboard.press('Home')
        done.append('slider')
    return done


async def step_widget(page, frame, where, shot, index=None):
    """Steps through one widget from first step to last, working every control,
    with a screenshot at each step. Then checks Back and Play."""
    n = await frame.evaluate('S.length')
    part = await frame.evaluate("typeof PART !== 'undefined' ? PART : ''")
    log = []
    for i in range(n):
        here = f'{where} step {part}{i + 1}'
        if i:
            await frame.locator('#nx').click()
        counter = await frame.locator('#ct').text_content()
        if counter != f'{part}{i + 1} · Step {i + 1} of {n}':
            fail(here, f'the counter says "{counter}"')
        done = await work_controls(page, frame, here)
        if index is not None:
            await wait_fits(page, index, here)
        await shot(i)
        log.append(f'{part}{i + 1}' + (f' ({", ".join(done)})' if done else ''))
    # The arrows: Next is off on the last step and Back on the first, on purpose, and on every
    # other step both are on.
    arrows = "[document.getElementById('bk').disabled, document.getElementById('nx').disabled]"
    if await frame.evaluate(arrows) != [False, True]:
        fail(where, f'on the last step the arrows are {await frame.evaluate(arrows)} (Back off?, Next off?)')
    await frame.locator('#bk').click()
    if not (await frame.locator('#ct').text_content()).startswith(f'{part}{n - 1} '):
        fail(where, 'the Back button did not go back one step')
    if n > 2 and await frame.evaluate(arrows) != [False, False]:
        fail(where, f'on a middle step the arrows are {await frame.evaluate(arrows)} (Back off?, Next off?)')
    await frame.evaluate('go(0)')
    if await frame.evaluate(arrows) != [True, n == 1]:
        fail(where, f'on step 1 the arrows are {await frame.evaluate(arrows)} (Back off?, Next off?)')
    # Play the build: it should start, move on by itself, and pause.
    await frame.evaluate('go(0)')
    play = frame.locator('#pl')
    await play.click()
    if 'Pause' not in await play.text_content():
        fail(where, '"Play the build" did not turn into "Pause"')
    await page.wait_for_timeout(2700)
    if not (await frame.locator('#ct').text_content()).startswith(f'{part}2 '):
        fail(where, '"Play the build" did not move on to step 2 by itself')
    if 'Pause' in await play.text_content():
        await play.click()
    await frame.evaluate('go(0)')
    return n, log


# ---------------------------------------------------------------- one page

async def check_page(browser, base, name, size):
    width, height = SIZES[size]
    stem = name[:-5]
    where = f'{name} at {width} px'
    ctx = await browser.new_context(viewport={'width': width, 'height': height}, reduced_motion='reduce')
    page = await ctx.new_page()
    page.set_default_timeout(90000)
    watch(page, where, base)
    await visit(page, base + name, wait_until='networkidle', timeout=90000)
    frames = page.locator('iframe.widget-frame')
    count = await frames.count()
    for i in range(count):
        await wait_fits(page, i, f'{where} widget {i + 1} on load')
    await snap(page, path=OUT / f'{stem}-{size}.png', full_page=True)

    # Layout and headings
    wide = await page.evaluate('document.documentElement.scrollWidth - window.innerWidth')
    if wide > 0:
        fail(where, f'the page is {wide} px wider than the screen (sideways scrolling)')
    for p in await page.evaluate(HEADINGS_JS):
        fail(where, p)
    for src in await page.evaluate("[...document.querySelectorAll('main img[src]')].filter(i => !i.complete || !i.naturalWidth).map(i => i.src)"):
        fail(where, f'a drawing did not load: {src}')

    # Teacher notes are hidden for students
    shown = await page.evaluate("[...document.querySelectorAll('.teacher-only')].filter(e => e.getClientRects().length).length")
    if shown:
        fail(where, f'{shown} teacher-only blocks are visible without ?teacher=1')

    # Printing (students): widgets and buttons gone, teacher notes hidden
    await page.emulate_media(media='print')
    await page.evaluate("window.dispatchEvent(new Event('beforeprint'))")
    printed = await page.evaluate("""() => ({
        widgets: [...document.querySelectorAll('.widget-frame')].filter(e => e.getClientRects().length).length,
        notes: [...document.querySelectorAll('.widget-print')].filter(e => !e.getClientRects().length).length,
        teacher: [...document.querySelectorAll('.teacher-only')].filter(e => e.getClientRects().length).length,
        steps: [...document.querySelectorAll('.steps, .safety, .checklist, .printable')].filter(e => !e.getClientRects().length).length })""")
    if printed['widgets'] or printed['notes'] or printed['teacher'] or printed['steps']:
        fail(where, f'print layout: {printed}')
    if size == 'desktop':
        await snap(page, path=OUT / f'{stem}-print.png', full_page=True)
    await page.evaluate("window.dispatchEvent(new Event('afterprint'))")
    await page.emulate_media(media='screen')

    # Every widget: titled, stepped through, never cut off
    for i in range(count):
        frame_el = frames.nth(i)
        if not (await frame_el.get_attribute('title') or '').strip():
            fail(where, f'widget {i + 1} has no title')
        frame = await (await frame_el.element_handle()).content_frame()
        key = (await frame_el.get_attribute('src')).split('?')[0].split('/')[-1][:-5]

        async def shot(step, el=frame_el, key=key):
            await snap(el, path=OUT / 'widgets' / f'{stem}-{key}-{size}-{step + 1:02d}.png')
        n, log = await step_widget(page, frame, f'{where} widget {key}', shot, index=i)
        print(f'  {name} {size}: widget {key}, {n} steps: ' + ' · '.join(log))

    # Every result, card and "If it's dark" box opens; every checkbox ticks
    for summary in await page.locator('main summary').all():
        await summary.click()
    closed = await page.evaluate("[...document.querySelectorAll('main details')].filter(d => !d.open).length")
    if closed:
        fail(where, f'{closed} "Show result" / "Reveal" / "If it\'s dark" boxes did not open')
    for box in await page.locator('main input[type=checkbox]').all():
        await box.check()
    for i, box in enumerate(await page.locator('main input[type=text]').all()):
        await box.fill(f'Test {i + 1}')
        if await box.input_value() != f'Test {i + 1}':
            fail(where, f'could not type in the box "{await box.get_attribute("aria-label")}"')
    for p in await page.evaluate(CONTRAST_JS, None):
        fail(where, f'low text contrast {p}')
    for i in range(count):
        frame = await (await frames.nth(i).element_handle()).content_frame()
        for p in await frame.evaluate(CONTRAST_JS, None):
            fail(f'{where} widget {i + 1}', f'low text contrast {p}')
    await snap(page, path=OUT / f'{stem}-{size}-opened.png', full_page=True)

    # The parts, one at a time
    await check_spotlight(page, where, f'{stem}-{size}')

    # The projector button: about 25% bigger text, here and inside the widgets
    if size == 'desktop':
        before = await page.evaluate("parseFloat(getComputedStyle(document.documentElement).fontSize)")
        await page.get_by_role('button', name='Projector').click()
        after = await page.evaluate("parseFloat(getComputedStyle(document.documentElement).fontSize)")
        if not 1.2 <= after / before <= 1.3:
            fail(where, f'the Projector button changed the text size from {before} to {after} px')
        await page.wait_for_timeout(300)
        for i in range(count):
            frame = await (await frames.nth(i).element_handle()).content_frame()
            if not await frame.evaluate("document.documentElement.classList.contains('projector')"):
                fail(where, f'widget {i + 1} did not get bigger with the Projector button')
            await wait_fits(page, i, f'{where} widget {i + 1} with the projector on')
        await page.evaluate('window.scrollTo(0, 0)')
        await snap(page, path=OUT / f'{stem}-projector.png')
        # A classroom projector is often 1280 x 800: the board and its step text should fit on it together.
        await page.set_viewport_size({'width': 1280, 'height': 800})
        for i in range(count):
            frame = await (await frames.nth(i).element_handle()).content_frame()
            await frame.evaluate('go(Math.max(0, S.findIndex(s => s.q)))')  # the first prediction step
            await wait_fits(page, i, f'{where} widget {i + 1} on a 1280 x 800 projector')
            tall = await frames.nth(i).evaluate('f => f.getBoundingClientRect().height')
            if tall > 800:
                warnings.append(f'{where}: widget {i + 1} is {tall:.0f} px tall with the projector on, '
                                'more than a 1280 x 800 projector shows at once')
            show = frame.locator('#ix').get_by_role('button', name='Show result')
            if await show.count():
                await show.click()
            await wait_fits(page, i, f'{where} widget {i + 1} on a 1280 x 800 projector, result shown')
            await frames.nth(i).evaluate('f => f.scrollIntoView()')
            await snap(page, path=OUT / f'{stem}-projector-widget{i + 1}.png')
            await frame.evaluate('go(0)')
        if await page.locator('.spotlight-start').count():
            await page.locator('.spotlight-start').first.click()
            await page.wait_for_timeout(200)
            await snap(page, path=OUT / f'{stem}-projector-parts.png')
            await page.keyboard.press('Escape')
        await page.set_viewport_size({'width': width, 'height': height})
        await page.get_by_role('button', name='Projector').click()

    await ctx.close()


async def check_spotlight(page, where, shot):
    """'Show the parts one at a time' opens a full-screen view; the arrow keys and buttons
    go through every part; Esc closes it and puts the focus back."""
    start = page.locator('.spotlight-start')
    if not await start.count():
        return
    parts = await page.locator('.part').count()
    await start.first.click()
    dialog = page.locator('dialog.spotlight')
    if not await dialog.is_visible():
        fail(where, '"Show the parts one at a time" did not open')
        return
    for i in range(parts):
        count = await dialog.locator('.spot-count').text_content()
        if count != f'{i + 1} of {parts}':
            fail(where, f'the parts view says "{count}", expected "{i + 1} of {parts}"')
        name = (await dialog.locator('.spot-name').text_content()).strip()
        card = (await page.locator('.part-name').nth(i).text_content()).strip()
        if name != card:
            fail(where, f'the parts view shows "{name}" where the page has "{card}"')
        if not await dialog.evaluate("d => { const i = d.querySelector('.spot-art img'); return i.complete && i.naturalWidth > 0 }"):
            fail(where, f'the parts view drawing for "{name}" did not load')
        if i in (0, 2):
            await snap(page, path=OUT / f'{shot}-parts-{i + 1:02d}.png')
        await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowLeft')
    if await dialog.locator('.spot-count').text_content() != f'{parts - 1} of {parts}':
        fail(where, 'the left arrow key did not go back one part in the parts view')
    await dialog.get_by_role('button', name='Next').click()
    await dialog.get_by_role('button', name='Done').click()
    if await dialog.is_visible():
        fail(where, '"Done" on the last part did not close the parts view')
    await page.locator('.part-art').nth(2).click()
    if await dialog.locator('.spot-count').text_content() != f'3 of {parts}':
        fail(where, 'clicking the third drawing did not open the parts view at part 3')
    await page.keyboard.press('Escape')
    if await dialog.is_visible():
        fail(where, 'Esc did not close the parts view')
    if not await page.evaluate("document.activeElement.classList.contains('part-art')"):
        fail(where, 'closing the parts view did not put the focus back on the drawing')


async def check_teacher(browser, base, name):
    """?teacher=1 shows the notes, the badge, minutes and rests_on, and links keep it."""
    stem = name[:-5]
    where = f'{name}?teacher=1'
    ctx = await browser.new_context(viewport={'width': 1280, 'height': 900}, reduced_motion='reduce')
    page = await ctx.new_page()
    page.set_default_timeout(90000)
    watch(page, where, base)
    await visit(page, base + name + '?teacher=1', wait_until='networkidle', timeout=90000)
    hidden = await page.evaluate("[...document.querySelectorAll('.teacher-only')].filter(e => !e.getClientRects().length).length")
    if hidden:
        fail(where, f'{hidden} teacher-only blocks are still hidden')
    if not await page.locator('.teacher-badge').is_visible():
        fail(where, 'no "Teacher view" badge')
    links = await page.evaluate("[...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'))")
    for href in links:
        if not re.match(r'^([a-z]+:|//|#)', href) and 'teacher=1' not in href:
            fail(where, f'the link "{href}" drops ?teacher=1')
    await snap(page, path=OUT / f'{stem}-teacher.png', full_page=True)
    await page.emulate_media(media='print')
    await page.evaluate("window.dispatchEvent(new Event('beforeprint'))")
    hidden = await page.evaluate("[...document.querySelectorAll('main .teacher-only')].filter(e => !e.getClientRects().length).length")
    if hidden:
        fail(where, 'printing in teacher view should keep the teacher notes')
    await snap(page, path=OUT / f'{stem}-teacher-print.png', full_page=True)
    await page.pdf(path=OUT / f'{stem}-teacher-print.pdf', format='Letter', print_background=True, prefer_css_page_size=True)
    await ctx.close()
    # The student print, as a real PDF (letter paper), for a look at the page breaks
    ctx = await browser.new_context(reduced_motion='reduce')
    page = await ctx.new_page()
    page.set_default_timeout(90000)
    await visit(page, base + name, wait_until='networkidle', timeout=90000)
    await page.emulate_media(media='print')
    await page.evaluate("window.dispatchEvent(new Event('beforeprint'))")
    await page.pdf(path=OUT / f'{stem}-print.pdf', format='Letter', print_background=True, prefer_css_page_size=True)
    await ctx.close()


LOOKS = [('notebook', 'light'), ('notebook', 'dark'), ('graph', 'light'), ('graph', 'dark'), ('bench', 'light')]

HAND_JS = """
() => {
  const root = parseFloat(getComputedStyle(document.documentElement).fontSize), bad = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!el.getClientRects().length || el.closest('.sr-only')) continue;
    const cs = getComputedStyle(el);
    if (!cs.fontFamily.includes('MTEC Notebook Hand')) continue;
    if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    if (parseFloat(cs.fontSize) < 1.1 * root - 0.05)
      bad.push(`${(parseFloat(cs.fontSize) / root).toFixed(2)}rem "${el.textContent.trim().slice(0, 40)}"`);
  }
  return bad;
}
"""


async def check_looks(browser, base, name):
    """The three looks (?look=notebook, graph, bench), by day and by night, at both widths:
    the fonts load, hand lettering is never smaller than 1.1rem, contrast, nothing too wide,
    and a screenshot of each."""
    stem = name[:-5]
    for look, scheme in LOOKS:
        for size, (width, height) in SIZES.items():
            where = f'{name}?look={look} ({scheme}) at {width} px'
            ctx = await browser.new_context(viewport={'width': width, 'height': height},
                                            color_scheme=scheme, reduced_motion='reduce')
            page = await ctx.new_page()
            page.set_default_timeout(90000)
            watch(page, where, base)
            await visit(page, base + name + f'?look={look}', wait_until='networkidle', timeout=90000)
            await page.evaluate('document.fonts.ready')
            if not await page.evaluate("""document.fonts.check('16px "MTEC Notebook Hand"') && document.fonts.check('16px "Atkinson Hyperlegible"')"""):
                fail(where, 'the hand lettering or the reading font did not load')
            if look != 'notebook' and await page.evaluate("document.documentElement.dataset.look") != look:
                fail(where, f'?look={look} did not switch the look')
            for summary in await page.locator('main summary').all():
                await summary.click()
            for i in range(await page.locator('iframe.widget-frame').count()):
                await wait_fits(page, i, where)
            for p in await page.evaluate(CONTRAST_JS, None):
                fail(where, f'low text contrast {p}')
            for f in page.frames[1:]:
                for p in await f.evaluate(CONTRAST_JS, None):
                    fail(f'{where} widget', f'low text contrast {p}')
            for p in await page.evaluate(HAND_JS):
                fail(where, f'hand lettering smaller than 1.1rem: {p}')
            wide = await page.evaluate('document.documentElement.scrollWidth - window.innerWidth')
            if wide > 0:
                fail(where, f'the page is {wide} px wider than the screen')
            await snap(page, path=OUT / f'{stem}-{size}-{look}-{scheme}.png', full_page=True)
            await ctx.close()


async def check_links(browser, base, names):
    """Every link to another page of this site works."""
    ctx = await browser.new_context()
    page = await ctx.new_page()
    page.set_default_timeout(90000)
    seen = set()
    for name in names:
        await visit(page, base + name)
        for href in await page.evaluate("[...document.querySelectorAll('a[href]')].map(a => a.href)"):
            if href.startswith(base) and href.split('#')[0] not in seen:
                seen.add(href.split('#')[0])
                r = await page.request.get(href.split('#')[0])
                if r.status != 200:
                    fail(name, f'broken link {href} ({r.status})')
    await ctx.close()


async def check_icons():
    """The icon stylesheet is the one file from another site. A wrong version number would
    leave buttons blank, so ask for it directly."""
    async with async_playwright() as p:
        request = await p.request.new_context()
        try:
            r = await request.get(build_site.ICONS_CSS)
            if r.status != 200:
                fail('icons', f'{r.status} for {build_site.ICONS_CSS} (is the version number right?)')
        except Exception:
            warnings.append(f'could not reach {build_site.ICONS_CSS} (no internet?)')
        await request.dispose()


async def check_widget_alone(browser, base, key):
    """Each widget page on its own, as check.py does: every step, every control."""
    where = f'widgets/{key}.html'
    ctx = await browser.new_context(viewport={'width': 720, 'height': 900}, reduced_motion='reduce')
    page = await ctx.new_page()
    page.set_default_timeout(90000)
    watch(page, where, base)
    await visit(page, base + f'widgets/{key}.html', wait_until='networkidle', timeout=90000)

    async def shot(step):
        await snap(page, path=OUT / 'widgets' / f'alone-{key}-{step + 1:02d}.png', full_page=True)
    n, log = await step_widget(page, page.main_frame, where, shot)
    print(f'  widgets/{key}.html alone, {n} steps: ' + ' · '.join(log))
    await ctx.close()


# ---------------------------------------------------------------- main

async def main():
    print('Building...')
    try:
        build_site.main()
    except build_site.BuildError as e:
        print(f'\nFAILED: the build stopped. {e}')
        sys.exit(1)
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / 'widgets').mkdir(parents=True)
    names = sorted(p.name for p in DOCS.glob('*.html'))
    keys = sorted(p.stem for p in (DOCS / 'widgets').glob('*.html'))
    server, base = serve()
    await check_icons()
    print(f'Checking {", ".join(names)} and widgets {", ".join(keys)}...')
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name in names:
            for size in SIZES:
                await check_page(browser, base, name, size)
            await check_teacher(browser, base, name)
            await check_looks(browser, base, name)
        await check_links(browser, base, names)
        for key in keys:
            await check_widget_alone(browser, base, key)
        await browser.close()
    server.shutdown()

    for w in sorted(set(warnings)):
        print('  warning:', w)
    shots = len(list(OUT.rglob('*.png')))
    if problems:
        print(f'\nFAILED: {len(problems)} problem(s)')
        for p in problems:
            print('  -', p)
        sys.exit(1)
    print(f'\nPASSED. {shots} screenshots in checks/. Now look at them.')


if __name__ == '__main__':
    asyncio.run(main())
