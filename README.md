# MTEC 150 lab pages

One web page per electronics session of MTEC 150 (MiraCosta College). Students open
a page from Canvas on a laptop or phone and follow it while they build. James
projects the same page.

Add `?teacher=1` to the end of any page's address to see the teacher view: the session's
minutes and Mims pages under the title, and James's notes. (A "Rests on Mims" line written
under a part's heading in `content/` shows to everyone.) It is only hidden, not locked:
anyone can read it in the page source, so nothing graded ever goes in it.

## What's in this folder

| Folder or file | What it is |
|---|---|
| `content/` | The words of each page, one file per session. **This is what you edit.** |
| `sessions.json` | Every session: its date, title, file and status. |
| `widgets/` | The animated breadboards (tested; don't change them by hand). |
| `art/` | The hand-drawn pictures of the parts (`art/parts/`). `art/README.md` has the drawing style. |
| `site/` | The look of the pages: `template.html`, `style.css`, `site.js`, and `widget.html` (the frame around each breadboard). |
| `build_site.py` | Turns `content/` into the finished site. |
| `check_site.py` | Opens every page in a browser and checks it. |
| `docs/` | The finished site. Built by `build_site.py`, so never edit it by hand: it is wiped and rebuilt every time. |
| `checks/` | Screenshots from the last check. Not published. |
| `handoff/` | The planning files. Stays on this Mac; never published. |

## Look at the site on this Mac

Double-click `docs/index.html`. It opens in your browser.

## Change a page

1. Open the page's file in `content/` (for example `content/kit-day.md`) in a plain-text editor,
   or ask Claude Code to make the change.
2. Run the check (below). It rebuilds the site first.
3. Look at the screenshots in `checks/`.

The breadboard steps live in `widgets/cfgK.js` (Lab 2: one per panel, `cfg2B.js` to `cfg2Q.js`), and they say the
same thing as the page's `::: steps` lists. If you change a `::: steps` list, ask Claude Code to
change the matching breadboard steps too, then run the check.

## Build and check

Open Terminal, then:

```bash
cd ~/Desktop/mtec150-labs
```

```bash
python3 check_site.py
```

It ends with **PASSED** or **FAILED** and a list of what's wrong. Screenshots land in `checks/`.
To build without checking: `python3 build_site.py`.

First time on a new Mac, install the two helpers once:

```bash
pip3 install --user markdown playwright
```

```bash
python3 -m playwright install chromium
```

## How a page file is written

Each file starts with a few settings between `---` lines:

```
---
title: "Kit Day: meet your kit"
session: "Kit Day · after the midterm"
date: 2026-10-08
status: published
rests_on: "Mims p. 96 ..."
minutes: 90
---
```

`status` is `published` (on the home page), `draft` (built with a "Draft" banner, listed only in
teacher view) or `hidden` (built, but not linked anywhere). Keep it the same as in `sessions.json`.

Then ordinary text: `## ` starts a section, `**bold**`, `- ` for a bullet, `1. ` for a numbered
step. Special boxes start with `:::` and a name, and end with a line that is just `:::`.

| Box | What students see |
|---|---|
| `::: widget K` | the animated breadboard for `widgets/cfgK.js` |
| `::: steps` | numbered build steps (the plain-text version of the breadboard) |
| `::: predict Lit or dark?` | the question, then a "Show result" button over the answer |
| `::: remember` | a yellow box: lines worth saying out loud |
| `::: safety` | a red box |
| `::: outside` | a small gray "Outside the book:" note |
| `::: dark` | an "If it's dark" troubleshooting box, closed until opened |
| `::: card 1` | a part: first line `name: ...`, then `picture: parts/led.svg`, then what it looks like. Shows the drawing, the name and the words; click the drawing to see it full screen |
| `::: pictures` | a row of small drawings; each line is `parts/chip-6.svg \| caption` |
| `::: checklist` | tick boxes (nothing is saved) |
| `::: printable` | the inventory sheet; it starts on its own page when printed |
| `::: challenge` | a challenge: names a result, never the wiring |
| `::: teacher` | James's notes: teacher view only |
| `::: panel C` | starts one experiment's panel, like one slide of the deck (Lab 2 uses them). Lines: `kicker:` (the small label), `title:` (the big hand-lettered line), `pages:` and `outside:` (the small credit line at the bottom), `minutes:` and `new:` (teacher view only). Everything after it, up to the next `::: panel` or `## ` heading, sits in the panel |
| `::: words` | the steps in plain words, folded away under the drawing ("The steps in words"); it prints open |
| `::: bands` | the kit's resistors drawn with their bands, each with its value written under it, one value per line (`1K`), in the order the lab uses them |
| `::: why` | "Why it works": a short read in Mims's plain style, folded under the drawing; it prints open |

## Which pages are built

`build_site.py` builds the pages listed in `READY` near its top. Right now that's Kit Day and
Lab 2; each phase adds more.

## The look

The pages look like a page torn out of the same lab notebook the slides come from: ruled paper,
a margin line, hand-lettered capitals for headings (the deck's own **MTEC Notebook Hand**) and
**Atkinson Hyperlegible** for reading. Both fonts are open-license; the files and their licenses
are in `site/fonts/`. Colors live at the top of `site/style.css`. Red means + and nothing else.

Two other looks, to compare: add `?look=graph` (an engineer's quad-ruled page) or `?look=bench`
(the dark notebook, even in daylight) to a page's address. `?look=notebook` goes back. The browser
tab remembers the choice until it's closed. Printing is always plain black on white.

## Showing the parts on the projector

Above the parts on Kit Day, **Show the parts one at a time** fills the screen with one drawing at a
time, big, with its name and description. Move with the arrow keys (or a clicker), **Back** and
**Next**; **Esc** or **Close** goes back to the page. Clicking any drawing opens it at that part.

## The projector button

The **Projector** button in the header makes all the text about 25% bigger, breadboards
included. It stays on while the browser tab is open.

## Printing

Print from the browser. Breadboards and buttons drop out; steps, safety rules, checklists and the
inventory sheet stay, and the "If it's dark" box prints open. Printed in teacher view, the copy
also has the teacher notes, the results and the card names.

## The simulator link

To show an "Open the breadboard simulator" link on the lab pages, put the simulator's address in
`sim_url` in `sessions.json`. Empty means no link.

## Publishing (only when James says so)

**The site is live at https://jsingletonsound.github.io/mtec150-labs/**
(Kit Day: https://jsingletonsound.github.io/mtec150-labs/kit-day.html). It lives on the
GitHub account `Jsingletonsound`, in the public repository `mtec150-labs`.

To publish a change: run the check, look at the screenshots, then ask Claude Code to publish.
It takes a minute or two to show up online.

### How it was set up (once, 2026-10-03)

The site is published free with GitHub Pages, from the `docs/` folder. Nothing is pushed to
GitHub until James says so.

1. James creates a public GitHub repository called `mtec150-labs`. (Public is fine: no student
   data, nothing secret.)
2. Claude Code pushes this folder to it and turns on GitHub Pages from `main` / `docs`.
3. Each page then has its own address, like `https://<your-github-name>.github.io/mtec150-labs/kit-day.html`.
   James adds those links to the Canvas modules.

After any change: run the check, look at the screenshots, then ask Claude Code to publish again.
