# Drawings

Hand-drawn-style pictures of the kit's parts, in the spirit of the little pencil drawings
in Mims's *Getting Started in Electronics*: simple line drawings with colored-pencil fills,
shown on graph paper. They are our own drawings, not copies of the book's.

`parts/led.svg` and `parts/resistor-strip.svg` are the reference drawings. Every new drawing
matches them.

## The rules

- **Canvas:** `viewBox="0 0 320 220"`, transparent background (the page puts the graph paper
  behind it). Keep about 10 units of margin. The part fills most of the frame, centered.
- **The pencil look:** copy the `<filter id="pencil">` from a reference file and put every
  shape inside one `<g filter="url(#pencil)" ...>`. Labels stay outside the filter so they
  stay crisp.
- **Lines:** stroke `#2f2e2b`, width 2.4, round caps and joins. Metal legs and pins:
  `#8d8b85`, width 2.6 to 3.2. Label arrows: width 1.6, with a small open arrowhead.
- **Fills (colored pencil):** blue body `#8fb8de`, red `#e0483e`, black parts `#3b3a37`
  (not pure black, so details still show), green board `#4f9a58`, brown `#b9763b`,
  gray band `#b8b6ae`, paper and cream `#fbf1d2`, white `#ffffff`. Highlights: white,
  opacity 0.85, a short curved stroke.
- **Labels:** at most two short labels per drawing, in the handwriting font stack
  `'Chalkboard SE', 'Comic Sans MS', 'Segoe Print', Noteworthy, cursive`, size 15 to 18.
  Use only words from the part's description on the Kit Day page. Never add a fact, a
  value or a marking the description doesn't give.
- **Accuracy:** draw what the description says (number of legs, the stripe, the band, the
  squiggly line). When the description doesn't say, keep it plain rather than guess.
- **A `<title>`** with the part's name, as the first element.
