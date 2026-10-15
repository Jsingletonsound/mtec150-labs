"""Builds the site into docs/, the folder GitHub Pages serves.

Usage:  python3 build_site.py

What it does, in order:
  1. Builds the animated breadboards: runs widgets/build.py, then wraps each
     widget in a small page of its own (docs/widgets/K.html and so on).
  2. Turns each ready page in content/ into docs/<name>.html, using site/template.html.
  3. Builds the home page, docs/index.html, from sessions.json.
  4. Copies site/style.css and site/site.js into docs/.

The page format (the ::: blocks) is described in README.md.
"""
import datetime
import hashlib
import html
import json
import pathlib
import re
import shutil
import subprocess
import sys

import markdown

ROOT = pathlib.Path(__file__).parent
CONTENT = ROOT / 'content'
SITE = ROOT / 'site'
WIDGETS = ROOT / 'widgets'
ART = ROOT / 'art'
DOCS = ROOT / 'docs'

# The pages built so far, by session id (see sessions.json).
# Phase 1: Kit Day. Phase 2 adds Lab 2 (Oct 15; called Lab 1 until 2026-10-04). Phase 3 adds the rest.
READY = ['kit-day', 'lab2']

# The one outside dependency: Tabler icons, pinned to one version.
ICONS_CSS = 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.48.0/dist/tabler-icons.min.css'

FRONT_KEYS = ['title', 'session', 'date', 'status', 'rests_on', 'minutes']
STATUSES = ['published', 'draft', 'hidden']
BLOCKS = ['widget', 'steps', 'predict', 'remember', 'safety', 'outside', 'dark',
          'card', 'pictures', 'checklist', 'printable', 'challenge', 'teacher',
          'panel', 'words', 'bands', 'why']


class BuildError(Exception):
    pass


# ---------------------------------------------------------------- Markdown

LIST_ITEM = re.compile(r'^\s*([-*+]|\d+\.)\s')


def tidy(text):
    """Small fixes so the Markdown package reads the content the way it's written.
    None of them change a word."""
    # Fill-in blanks like ____ would be read as bold/italic marks: keep them as underscores.
    text = re.sub(r'_{3,}', lambda m: '&#95;' * len(m.group()), text)
    # A number stays on the same line as its unit ("2 V", "21 mA", "330 Ω", "15 min"), and a
    # page number with its "p." ("p. 47"): the space between them becomes a no-break space.
    # It looks the same.
    text = re.sub(r'(\d) (?=(?:V|mA|Ω|min)(?!\w))', '\\1\u00a0', text)
    text = re.sub(r'\b(pp?\.) (?=\d)', '\\1\u00a0', text)
    # The same for a rail sign and its word ("the − row", "+ jumper"), and a name and its
    # number or letter ("Lab 1", "Part A", "Test 5").
    text = re.sub(r'(?<=[ (])([+−]) (?=[A-Za-z])', '\\1\u00a0', text)
    text = re.sub(r'\b(Lab|Lecture|Part|Test) (?=[0-9A-Z]\b)', '\\1\u00a0', text)
    # A list needs a blank line between it and the paragraph next to it.
    out = []
    for line in text.split('\n'):
        prev = out[-1] if out else ''
        if prev.strip() and line.strip() and not prev.startswith('|') and not line.startswith((' ', '\t')):
            starts_list = LIST_ITEM.match(line) and not LIST_ITEM.match(prev)
            ends_list = LIST_ITEM.match(prev) and not LIST_ITEM.match(line)
            if starts_list or ends_list:
                out.append('')
        out.append(line)
    return '\n'.join(out)


UNITS = re.compile(r'µ\w*|(?<=[\d\s\u00a0])(?:mA|mV|mW|ms)\b')


def keep_units(html_text):
    """Headings and labels are drawn in hand-lettered capitals. A few units would change meaning
    in capitals (µF would read MF, mA would read MA), so they keep their own case."""
    parts = re.split(r'(<[^>]+>)', html_text)
    return ''.join(s if s.startswith('<') else UNITS.sub(lambda m: f'<span class="unit">{m.group()}</span>', s)
                   for s in parts)


def md(text):
    """Markdown to HTML. Each line break in the content stays a line break."""
    return keep_units(markdown.markdown(tidy(text), extensions=['tables', 'sane_lists', 'nl2br']))


def md_inline(text):
    """Markdown for a single line (a question, a card's name): no paragraph around it."""
    out = md(text.strip())
    m = re.fullmatch(r'<p>(.*)</p>', out, re.S)
    return m.group(1) if m else out


def icon(name):
    return f'<i class="ti ti-{name}" aria-hidden="true"></i>'


def label(icon_name, words):
    return f'<p class="box-label">{icon(icon_name)} {words}</p>'


# ---------------------------------------------------------------- the ::: blocks

def b_widget(arg, body, ctx):
    key = arg.strip()
    if key not in ctx['widgets']:
        raise BuildError(f'"::: widget {key}": there is no widgets/cfg{key}.js')
    if body.strip():
        raise BuildError(f'"::: widget {key}" should be empty: put the text after its closing :::')
    title = html.escape(ctx['widgets'][key], quote=True)
    return (f'<figure class="widget">\n'
            f'<iframe class="widget-frame" src="widgets/{key}.html?v={ctx["versions"][key]}" title="{title}"></iframe>\n'
            f'<p class="widget-print">Drawing {re.sub(r"^[0-9]+", "", key)}: online only. The numbered steps on this page are the same build.</p>\n'
            f'</figure>')


def b_steps(arg, body, ctx):
    return f'<div class="steps">\n{md(body)}\n</div>'


def b_predict(arg, body, ctx):
    if not arg.strip():
        raise BuildError('"::: predict" needs its question on the same line')
    result = md(body)
    # A result that opens with "Lit" or "Dark" shows that word as the answer: Lit glows like the LED.
    result = re.sub(r'^<p><strong>(Lit|Dark)([^<]*)</strong>',
                    lambda m: f'<p><strong class="answer {m.group(1).lower()}">{m.group(1)}{m.group(2)}</strong>', result)
    return (f'<div class="predict">\n'
            f'<p class="predict-q"><span class="tag">Predict</span> {md_inline(arg)}</p>\n'
            f'<details>\n<summary>Show result</summary>\n<div class="result">\n{result}\n</div>\n</details>\n'
            f'</div>')


def b_remember(arg, body, ctx):
    return f'<div class="box remember" role="note">\n{label("bulb", "Remember")}\n{md(body)}\n</div>'


def b_safety(arg, body, ctx):
    return f'<div class="box safety" role="note">\n{label("alert-triangle", "Safety")}\n{md(body)}\n</div>'


def b_outside(arg, body, ctx):
    inner = md(body)
    tag = '<strong class="outside-label">Outside the book:</strong> '
    inner = inner.replace('<p>', '<p>' + tag, 1) if inner.startswith('<p>') else f'<p>{tag}</p>\n{inner}'
    return f'<div class="outside" role="note">\n{inner}\n</div>'


def b_dark(arg, body, ctx):
    return (f'<details class="box dark">\n<summary>{icon("bulb-off")} If it\'s dark</summary>\n'
            f'<div class="dark-body">\n{md(body)}\n</div>\n</details>')


def art(path):
    """A drawing in art/, checked to exist. Returns the address the page uses."""
    path = path.strip()
    if not (ART / path).is_file():
        raise BuildError(f'there is no drawing art/{path}')
    return 'art/' + html.escape(path, quote=True) + '?v=' + stamp((ART / path).read_bytes())


def b_card(arg, body, ctx):
    """A part: its drawing, its name, and what it looks like. Clicking the drawing shows it big."""
    lines = body.strip().split('\n')
    if not lines or not lines[0].startswith('name:'):
        raise BuildError(f'"::: card {arg}" must start with a "name:" line')
    name = lines[0][len('name:'):].strip()
    lines = lines[1:]
    picture = ''
    if lines and lines[0].startswith('picture:'):
        picture = lines[0][len('picture:'):].strip()
        lines = lines[1:]
    number = html.escape(arg.strip())
    plain_name = re.sub(r'<[^>]+>', '', md_inline(name))
    out = '<div class="part">\n'
    if picture:
        out += (f'<button type="button" class="part-art paper" aria-label="Show {plain_name} big">'
                f'<img src="{art(picture)}" alt="" width="320" height="220">'
                f'<span class="part-n" aria-hidden="true">{number}</span></button>\n')
    desc = md('\n'.join(lines))
    out += (f'<div class="part-text">\n<h3 class="part-name">{md_inline(name)}</h3>\n'
            f'<div class="part-desc">\n{desc}\n</div>\n</div>\n</div>')
    return out


def b_pictures(arg, body, ctx):
    """A row of small drawings with captions. Each line: art path | caption."""
    figures = []
    for line in body.strip().split('\n'):
        if not line.strip():
            continue
        path, bar, caption = line.partition('|')
        if not bar:
            raise BuildError(f'"::: pictures": each line is "drawing | caption", not: {line}')
        figures.append(f'<figure class="picture"><div class="paper"><img src="{art(path)}" alt="" width="320" height="220"></div>'
                       f'<figcaption>{md_inline(caption)}</figcaption></figure>')
    return '<div class="pictures">\n' + '\n'.join(figures) + '\n</div>'


def b_checklist(arg, body, ctx):
    items = []
    for line in body.strip().split('\n'):
        if not line.strip():
            continue
        m = re.match(r'^[-*+]\s+(.*)$', line)
        if not m:
            raise BuildError(f'"::: checklist": every line should start with "- ", not: {line}')
        items.append(f'<li><label><input type="checkbox"> <span>{md_inline(m.group(1))}</span></label></li>')
    return '<ul class="checklist">\n' + '\n'.join(items) + '\n</ul>'


def b_printable(arg, body, ctx):
    """A sheet groups fill in. A blank (____) becomes a box to type in; "- [ ] item" becomes
    a tick box. Nothing typed or ticked is saved or sent anywhere; it prints as it shows."""
    blanks, seen = [], {}

    def blank(m):
        before = re.sub(r'[*_`:]', '', m.group(1)).strip() or 'Write here'
        seen[before] = seen.get(before, 0) + 1
        blanks.append((before, len(m.group(2))))
        return m.group(1) + f'XBLANK{len(blanks) - 1}X'
    body = '\n'.join(re.sub(r'^(.*?)(_{3,})', blank, line) for line in body.split('\n'))
    out = md(body)
    count = {}
    for i, (label, width) in enumerate(blanks):
        count[label] = count.get(label, 0) + 1
        name = f'{label} {count[label]}' if seen[label] > 1 else label
        size = 'blank-short' if width <= 6 else 'blank-long'
        out = out.replace(f'XBLANK{i}X', f'<input type="text" class="blank {size}" aria-label="{html.escape(name, quote=True)}" autocomplete="off">')
    out = re.sub(r'<li>\[ \] (.*?)</li>', r'<li><label><input type="checkbox"> <span>\1</span></label></li>', out, flags=re.S)
    out = out.replace('<ul>\n<li><label><input type="checkbox">', '<ul class="checklist">\n<li><label><input type="checkbox">')
    return f'<section class="printable" aria-label="Printable sheet">\n{out}\n</section>'


def b_challenge(arg, body, ctx):
    return f'<div class="box challenge">\n{label("puzzle", "Challenge")}\n{md(body)}\n</div>'


def fields(body, where, allowed):
    """A block's "name: value" lines, as a dict."""
    out = {}
    for line in body.strip().split('\n'):
        if not line.strip():
            continue
        key, colon, value = line.partition(':')
        key = key.strip()
        if not colon or key not in allowed:
            raise BuildError(f'"{where}": each line is one of {", ".join(allowed)} then ":", not: {line}')
        out[key] = value.strip()
    return out


PANEL_KEYS = ['kicker', 'title', 'pages', 'outside', 'minutes', 'new']


def b_panel(arg, body, ctx):
    """One experiment, one panel, like one slide of the deck: a kicker ("☐ A · First light"),
    the big hand-lettered title, then everything up to the next panel or "## " heading,
    and a small credit line at the bottom (the Mims pages, and anything outside the book).
    Returns the opening HTML and the closing HTML."""
    letter = arg.strip()
    if not re.fullmatch(r'[A-Z]', letter):
        raise BuildError(f'"::: panel {letter}": a panel is named by one capital letter, like "::: panel C"')
    f = fields(body, f'::: panel {letter}', PANEL_KEYS)
    for key in ('kicker', 'title'):
        if not f.get(key):
            raise BuildError(f'"::: panel {letter}" needs a "{key}:" line')
    minutes = (f'<span class="teacher-only panel-min"> · {html.escape(f["minutes"])} min</span>'
               if f.get('minutes') else '')
    opening = (f'<section class="panel" id="{letter}" aria-labelledby="{letter}-title">\n'
               f'<p class="kicker"><span class="kbox" aria-hidden="true"></span>{letter} · {md_inline(f["kicker"])}{minutes}</p>\n'
               f'<h2 class="panel-title" id="{letter}-title">{md_inline(f["title"])}</h2>')
    if f.get('new'):
        opening += f'\n<p class="teacher-only new-flag">{icon("flask")} New: {md_inline(f["new"])}</p>'
    credits = []
    if f.get('pages'):
        credits.append(md_inline(f['pages']))
    if f.get('outside'):
        credits.append(f'<strong>Outside the book:</strong> {md_inline(f["outside"])}')
    closing = (f'<p class="panel-foot">{" · ".join(credits)}</p>\n' if credits else '') + '</section>'
    return opening, closing


def b_words(arg, body, ctx):
    """The steps in plain words, folded away under the drawing. Printing opens it, and screen
    readers and phones can always open it: nothing depends on the animation."""
    label = arg.strip() or 'The steps in words'
    return (f'<details class="words">\n<summary>{icon("list-numbers")} {html.escape(label)}</summary>\n'
            f'<div class="steps">\n{md(body)}\n</div>\n</details>')


def b_why(arg, body, ctx):
    """Why it works: a short read, the way Mims would explain it, folded under the drawing so the
    page stays pictures-first. Printing opens it."""
    return (f'<details class="why">\n<summary>{icon("bulb")} Why it works</summary>\n'
            f'<div class="why-body">\n{md(body)}\n</div>\n</details>')


# The kit's resistor bands, read from the widget engine, so the page and the drawings always agree.
BAND_COLORS = {'k': ('black', 0, '#2C2C2A'), 'n': ('brown', 1, '#7B4A26'), 'r': ('red', 2, '#D83A34'),
               'o': ('orange', 3, '#EF7F1A'), 'y': ('yellow', 4, '#F2C200'), 'g': ('green', 5, '#3B9E4A'),
               'b': ('blue', 6, '#2F6FD6'), 'v': ('violet', 7, '#7B4FC6'), 'a': ('gray', 8, '#8C8C8C'),
               'w': ('white', 9, '#FFFFFF')}


def engine_bands():
    m = re.search(r"const BANDS=\{(.*?)\};", (WIDGETS / 'engine1.js').read_text(encoding='utf-8'))
    return dict(re.findall(r"'([^']+)':'([a-z]{5})'", m.group(1)))


def resistor_svg(bands, label):
    """One resistor drawn like the breadboard drawings: legs, a blue body, five bands with a gap
    before the last one."""
    out = [f'<svg class="band-svg" viewBox="0 0 240 60" role="img" aria-label="{html.escape(label, quote=True)}">',
           '<line x1="4" y1="30" x2="236" y2="30" stroke="#888780" stroke-width="3" stroke-linecap="round"/>',
           '<rect x="50" y="12" width="140" height="36" rx="16" fill="#85B7EB" stroke="#185FA5" stroke-width="1.5"/>']
    for i, c in enumerate(bands):
        x = 68 + i * 18 + (14 if i == 4 else 0)
        out.append(f'<rect x="{x}" y="12" width="10" height="36" fill="{BAND_COLORS[c][2]}"'
                   + (' stroke="#8C8C8C" stroke-width="0.5"' if c == 'w' else '') + '/>')
    out.append('</svg>')
    return ''.join(out)


def b_bands(arg, body, ctx):
    """The kit's resistors, drawn with their bands, each with its value written under it, in the
    order the lines give (the order the lab uses them). Each line is one value from the kit ("1K")."""
    kit = engine_bands()
    cards = []
    for value in [v.strip() for v in body.strip().split('\n') if v.strip()]:
        if value not in kit:
            raise BuildError(f'"::: bands": the engine has no bands for "{value}" (it has {", ".join(kit)})')
        cards.append(f'<li class="band-card">{resistor_svg(kit[value], f"A resistor strip labeled {value}")}'
                     f'<p class="band-value hand">{html.escape(value)}</p></li>')
    return '<ol class="band-cards">\n' + '\n'.join(cards) + '\n</ol>'


def b_teacher(arg, body, ctx):
    return (f'<div class="box teacher-note teacher-only">\n{label("school", "Teacher notes")}\n'
            f'{md(body)}\n</div>')


RENDER = {name: globals()['b_' + name] for name in BLOCKS}


def split_blocks(body, offset):
    """Splits a page body into plain Markdown and ::: blocks.
    Returns a list of (kind, arg, text, line number); plain Markdown has kind None.
    Line numbers count from the top of the file (offset = the front matter's lines)."""
    parts, buf, cur = [], [], None  # cur = (kind, arg, start line) while inside a block
    start = offset + 1
    for n, line in enumerate(body.split('\n'), offset + 1):
        s = line.rstrip()
        if cur is None:
            m = re.match(r'^:::\s*(\w+)\s*(.*)$', s)
            if m:
                if m.group(1) not in BLOCKS:
                    raise BuildError(f'line {n}: unknown block "::: {m.group(1)}". Known: {", ".join(BLOCKS)}')
                parts.append((None, '', '\n'.join(buf), start))
                buf, cur = [], (m.group(1), m.group(2), n)
            elif s == ':::':
                raise BuildError(f'line {n}: a closing ":::" with no block open')
            else:
                buf.append(line)
        else:
            if s == ':::':
                parts.append((cur[0], cur[1], '\n'.join(buf), cur[2]))
                buf, cur, start = [], None, n + 1
            elif re.match(r'^:::\s*\w', s):
                raise BuildError(f'line {n}: "::: {cur[0]}" (line {cur[2]}) isn\'t closed before the next block starts')
            else:
                buf.append(line)
    if cur is not None:
        raise BuildError(f'"::: {cur[0]}" on line {cur[2]} is never closed with ":::"')
    parts.append((None, '', '\n'.join(buf), start))
    return parts


def render_body(body, ctx, offset):
    out, cards = [], []
    panel = []   # the open panel's closing HTML, while a panel is open

    def close_panel():
        flush_cards()
        if panel:
            out.append(panel.pop())

    def flush_cards():
        if cards:
            out.append('<p class="parts-tools"><button type="button" class="spotlight-start" hidden>'
                       f'{icon("presentation")} Show the parts one at a time</button></p>\n'
                       '<div class="parts">\n' + '\n'.join(cards) + '\n</div>')
            cards.clear()

    for kind, arg, text, line in split_blocks(body, offset):
        try:
            if kind is None:
                # A "## " heading ends the open panel; the text before it stays in the panel.
                lines = text.split('\n')
                at = next((i for i, s in enumerate(lines) if s.startswith('## ')), len(lines))
                before, after = '\n'.join(lines[:at]), '\n'.join(lines[at:])
                if before.strip():
                    flush_cards()
                    out.append(md(before))
                if after.strip():
                    close_panel()
                    out.append(md(after))
            elif kind == 'panel':
                close_panel()
                opening, closing = b_panel(arg, text, ctx)
                out.append(opening)
                panel.append(closing)
            elif kind == 'card':
                cards.append(RENDER[kind](arg, text, ctx))
            else:
                flush_cards()
                out.append(RENDER[kind](arg, text, ctx))
        except BuildError as e:
            raise BuildError(f'line {line}: {e}') from None
    close_panel()
    return '\n\n'.join(out)


# ---------------------------------------------------------------- pages

def read_page(path):
    text = path.read_text(encoding='utf-8')
    m = re.match(r'---\n(.*?)\n---\n', text, re.S)
    if not m:
        raise BuildError('no front matter: the file should start with a line "---"')
    meta = {}
    for line in m.group(1).split('\n'):
        if not line.strip():
            continue
        key, colon, value = line.partition(':')
        if not colon:
            raise BuildError(f'front matter line without a colon: {line}')
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] == '"':
            value = value[1:-1]
        meta[key.strip()] = value
    missing = [k for k in FRONT_KEYS if not meta.get(k)]
    if missing:
        raise BuildError('front matter is missing: ' + ', '.join(missing))
    if meta['status'] not in STATUSES:
        raise BuildError(f'status "{meta["status"]}" should be one of: ' + ', '.join(STATUSES))
    body = text[m.end():]
    offset = text[:m.end()].count('\n')
    # The page's "# Title" line becomes the page's one h1, in the header.
    h1 = re.search(r'^# (.+)$', body, re.M)
    if h1:
        heading = h1.group(1).strip()
        body = body[:h1.start()] + body[h1.end():]
    else:
        heading = meta['title']
    if re.search(r'^# ', body, re.M):
        raise BuildError('more than one "# " heading: a page has one title; use "## " for sections')
    return meta, heading, body, offset


def nice_date(iso):
    d = datetime.date.fromisoformat(iso)
    return f'{d:%A}, {d:%B}\u00a0{d.day},\u00a0{d.year}'  # no line break inside the date


def fill(template, **values):
    """Puts each value into its {{slot}} in a template."""
    unfilled = set(re.findall(r'\{\{(\w+)\}\}', template)) - set(values)
    if unfilled:
        raise BuildError('template has unfilled slots: ' + ', '.join(sorted(unfilled)))
    return re.sub(r'\{\{(\w+)\}\}', lambda m: values.get(m.group(1), m.group()), template)


def stamp(data):
    """A short fingerprint of a file's contents. The links to the stylesheet, site.js, the drawings
    and the breadboards carry it (style.css?v=...), so when one of them changes, browsers fetch the
    new one instead of showing a copy they kept from before."""
    return hashlib.sha1(data if isinstance(data, bytes) else data.encode('utf-8')).hexdigest()[:8]


def page_html(template, sessions, title, head, content, robots=False):
    return fill(template,
                title=html.escape(title),
                css_v=stamp((SITE / 'style.css').read_bytes()),
                js_v=stamp((SITE / 'site.js').read_bytes()),
                course=html.escape(sessions['course']),
                icons_css=ICONS_CSS,
                robots='<meta name="robots" content="noindex">\n' if robots else '',
                head=head,
                content=content,
                footer=html.escape(sessions['course']) + ' · ' + html.escape(sessions['college']))


def build_page(session, sessions, template, ctx, out):
    path = CONTENT / session['file']
    try:
        meta, heading, body, offset = read_page(path)
        if meta['status'] != session['status']:
            raise BuildError(f'status is "{meta["status"]}" here but "{session["status"]}" in sessions.json: '
                             'make them the same')
        content = render_body(body, ctx, offset)
    except BuildError as e:
        raise BuildError(f'content/{session["file"]}: {e}') from None
    if heading != meta['title']:
        print(f'  note: content/{session["file"]}: the "# " heading and the title in the front matter differ')
    head = (f'<header class="page-head">\n'
            f'<p class="when">{html.escape(meta["session"])} · {nice_date(meta["date"])}</p>\n'
            f'<h1>{md_inline(heading)}</h1>\n'
            f'<p class="page-meta teacher-only"><span>{html.escape(meta["minutes"])} min</span> · '
            f'Rests on: {html.escape(meta["rests_on"])}</p>\n'
            f'</header>')
    if meta['status'] == 'draft':
        head += '\n<p class="draft-banner" role="status">Draft: steps come after James\'s bench test</p>'
    if sessions.get('sim_url'):
        # The simulator opens in its own tab, so a group can go back and forth between the two.
        head += (f'\n<p class="sim"><a class="button" href="{html.escape(sessions["sim_url"], quote=True)}" '
                 f'target="_blank" rel="noopener">{icon("cpu")} Open the breadboard simulator'
                 f'<span class="sr-only"> (opens in a new tab)</span></a></p>')
    page = page_html(template, sessions, meta['title'], head, content, robots=meta['status'] != 'published')
    name = pathlib.Path(session['file']).with_suffix('.html').name
    (out / name).write_text(page, encoding='utf-8')
    return name


def build_home(sessions, template, built, out):
    rows = []
    for s in sessions['sessions']:
        if s['status'] == 'hidden' or s['id'] not in built:
            continue
        cls = 'session' if s['status'] == 'published' else 'session teacher-only'
        rows.append(f'<li class="{cls}">\n'
                    f'<span class="session-date">{html.escape(s["label"])}</span>\n'
                    f'<a href="{built[s["id"]]}">{html.escape(s["title"])}</a>\n'
                    f'<span class="chip chip-{s["status"]}">{s["status"].capitalize()}</span>\n'
                    f'</li>')
    head = (f'<header class="page-head">\n'
            f'<p class="when">{html.escape(sessions["course"])}</p>\n'
            f'<h1>{html.escape(sessions["unit"])}</h1>\n'
            f'<p class="sub">{html.escape(sessions["college"])} · {html.escape(sessions["meets"])}</p>\n'
            f'</header>')
    content = ('<h2 class="sr-only">Sessions</h2>\n<ol class="sessions">\n' + '\n'.join(rows) + '\n</ol>\n'
               '<p class="home-note">Bring your group\'s kit bag. Phones are fine for reading these pages.</p>')
    (out / 'index.html').write_text(page_html(template, sessions, sessions['unit'], head, content),
                                     encoding='utf-8')


# ---------------------------------------------------------------- widgets

def build_widgets(out):
    """Runs widgets/build.py (the tested widget builder), then wraps each widget in its own page."""
    subprocess.run([sys.executable, 'build.py'], cwd=WIDGETS, check=True, stdout=subprocess.DEVNULL)
    frame = (SITE / 'widget.html').read_text(encoding='utf-8')
    (out / 'widgets').mkdir(parents=True, exist_ok=True)
    titles, versions = {}, {}
    for cfg in sorted(WIDGETS.glob('cfg*.js')):
        key = cfg.stem[3:]
        part = (WIDGETS / f'part{key}.html').read_text(encoding='utf-8')
        m = re.search(r'<h2 class="sr-only">(.*?)</h2>', part)
        titles[key] = m.group(1) if m else f'Animated breadboard {key}'
        # Inside a page, the widget sits under a section heading (h2), so its hidden heading is an h3.
        part = part.replace('<h2 class="sr-only">', '<h3 class="sr-only">', 1).replace('</h2>', '</h3>', 1)
        page = fill(frame, title=html.escape(titles[key]), icons_css=ICONS_CSS, widget=part)
        (out / 'widgets' / f'{key}.html').write_text(page, encoding='utf-8')
        versions[key] = stamp(page)
    return titles, versions


# ---------------------------------------------------------------- main

def main():
    """Builds everything into docs.new/ first and swaps it in for docs/ only when the whole
    build worked, so a mistake in a page never leaves a half-built site behind."""
    sessions = json.loads((ROOT / 'sessions.json').read_text(encoding='utf-8'))
    template = (SITE / 'template.html').read_text(encoding='utf-8')
    new = ROOT / 'docs.new'
    if new.exists():
        shutil.rmtree(new)
    new.mkdir()
    try:
        titles, versions = build_widgets(new)
        ctx = {'widgets': titles, 'versions': versions}
        built = {}
        for s in sessions['sessions']:
            if s['id'] in READY:
                built[s['id']] = build_page(s, sessions, template, ctx, new)
        build_home(sessions, template, built, new)
        for name in ('style.css', 'site.js'):
            shutil.copy(SITE / name, new / name)
        shutil.copytree(ART, new / 'art', ignore=shutil.ignore_patterns('*.md', '.DS_Store'))
        shutil.copytree(SITE / 'fonts', new / 'fonts', ignore=shutil.ignore_patterns('.DS_Store'))
        (new / '.nojekyll').write_text('')  # tells GitHub Pages to serve the files as they are
    except BaseException:
        shutil.rmtree(new)
        raise
    if DOCS.exists():
        shutil.rmtree(DOCS)
    new.rename(DOCS)
    print('Built:', ', '.join(['index.html'] + list(built.values())),
          '+ widgets', ', '.join(sorted(ctx['widgets'])))


if __name__ == '__main__':
    try:
        main()
    except BuildError as e:
        sys.exit(f'Build stopped. {e}')
