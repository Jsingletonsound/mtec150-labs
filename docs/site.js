// MTEC 150 lab pages: teacher view, the projector toggle, widget heights, printing.
// No cookies, no tracking. The only thing remembered is the projector setting,
// and only until this browser tab closes.
(function () {
  var root = document.documentElement;
  var body = document.body;

  // ---- Teacher view: add ?teacher=1 to the address.
  // It only shows James's notes. It is not a lock: nothing secret is on these pages.
  var teacher = new URLSearchParams(location.search).get('teacher') === '1';
  if (teacher) {
    body.classList.add('teacher');
    // Links to other pages of this site keep ?teacher=1.
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (/^([a-z]+:|\/\/|#)/i.test(href)) return; // another site, or a spot on this page
      var hash = href.indexOf('#') < 0 ? '' : href.slice(href.indexOf('#'));
      var page = href.slice(0, href.length - hash.length);
      if (/[?&]teacher=1/.test(page)) return;
      a.setAttribute('href', page + (page.indexOf('?') < 0 ? '?' : '&') + 'teacher=1' + hash);
    });
  }

  // ---- Widgets: each animated breadboard lives in its own frame.
  var frames = Array.prototype.slice.call(document.querySelectorAll('iframe.widget-frame'));

  // Tells a widget whether the projector is on, and how tall this window is.
  function tellWidget(frame) {
    if (frame.contentWindow) {
      frame.contentWindow.postMessage({ type: 'mtec-site', projector: root.classList.contains('projector'),
                                        screenH: window.innerHeight }, '*');
    }
  }

  // A widget reports its height; the frame grows or shrinks to fit, so nothing is cut off.
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.type !== 'mtec-widget') return;
    frames.forEach(function (frame) {
      if (frame.contentWindow !== e.source) return;
      if (d.height > 0) frame.style.height = Math.ceil(d.height) + 'px';
      if (d.ready) tellWidget(frame);
    });
  });
  frames.forEach(function (frame) {
    frame.addEventListener('load', function () { tellWidget(frame); });
    tellWidget(frame); // in case the widget finished loading before this script ran
  });
  window.addEventListener('resize', function () { frames.forEach(tellWidget); });

  // ---- Projector: bigger text for the room.
  var toggle = document.querySelector('.projector-toggle');
  function setProjector(on) {
    root.classList.toggle('projector', on);
    if (toggle) toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { sessionStorage.setItem('mtec-projector', on ? '1' : ''); } catch (e) { /* private mode: fine */ }
    frames.forEach(tellWidget);
  }
  if (toggle) {
    toggle.setAttribute('aria-pressed', root.classList.contains('projector') ? 'true' : 'false');
    toggle.addEventListener('click', function () {
      setProjector(!root.classList.contains('projector'));
    });
  }

  // ---- The parts, one at a time: a full-screen slideshow of the drawing cards, for the projector.
  // Arrow keys or the buttons move through them; Esc or Close goes back to the page.
  var parts = Array.prototype.slice.call(document.querySelectorAll('.part'));
  if (parts.length && window.HTMLDialogElement) {
    var spot = document.createElement('dialog');
    spot.className = 'spotlight';
    spot.setAttribute('aria-label', 'The parts, one at a time');
    spot.innerHTML =
      '<div class="spot-art paper"><img alt=""></div>' +
      '<div class="spot-text"><p class="spot-count"></p><h2 class="spot-name"></h2><div class="spot-desc"></div></div>' +
      '<div class="spot-nav">' +
      '<button type="button" class="spot-back"><i class="ti ti-arrow-left" aria-hidden="true"></i> Back</button>' +
      '<button type="button" class="spot-next"></button>' +
      '<button type="button" class="spot-close"><i class="ti ti-x" aria-hidden="true"></i> Close</button>' +
      '</div>';
    body.appendChild(spot);
    var back = spot.querySelector('.spot-back');
    var next = spot.querySelector('.spot-next');
    var at = 0;
    var opener = null;

    var show = function (i) {
      at = Math.max(0, Math.min(parts.length - 1, i));
      var part = parts[at];
      var img = part.querySelector('img');
      spot.querySelector('.spot-art').hidden = !img;
      if (img) spot.querySelector('.spot-art img').src = img.src;
      spot.querySelector('.spot-count').textContent = (at + 1) + ' of ' + parts.length;
      spot.querySelector('.spot-name').innerHTML = part.querySelector('.part-name').innerHTML;
      spot.querySelector('.spot-desc').innerHTML = part.querySelector('.part-desc').innerHTML;
      back.disabled = at === 0;
      var last = at === parts.length - 1;
      next.innerHTML = last ? 'Done <i class="ti ti-check" aria-hidden="true"></i>'
                            : 'Next <i class="ti ti-arrow-right" aria-hidden="true"></i>';
      if (document.activeElement === back && back.disabled) next.focus();
    };
    var open = function (i, from) {
      opener = from;
      show(i);
      spot.showModal();
      next.focus();
    };

    back.addEventListener('click', function () { show(at - 1); });
    next.addEventListener('click', function () {
      if (at === parts.length - 1) spot.close(); else show(at + 1);
    });
    spot.querySelector('.spot-close').addEventListener('click', function () { spot.close(); });
    spot.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); show(at + 1); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); show(at - 1); }
    });
    spot.addEventListener('close', function () { if (opener) opener.focus(); });

    parts.forEach(function (part, i) {
      var art = part.querySelector('.part-art');
      if (art) art.addEventListener('click', function () { open(i, art); });
    });
    document.querySelectorAll('.spotlight-start').forEach(function (b) {
      b.hidden = false;
      b.addEventListener('click', function () { open(0, b); });
    });
  }

  // ---- Printing: open the "If it's dark" boxes so they print. In teacher view, open
  // everything (results and card names too), so James's printed copy has the answers.
  var opened = [];
  window.addEventListener('beforeprint', function () {
    var pick = teacher ? 'details' : 'details.dark';
    document.querySelectorAll(pick).forEach(function (d) {
      if (!d.open) { d.open = true; opened.push(d); }
    });
  });
  window.addEventListener('afterprint', function () {
    opened.forEach(function (d) { d.open = false; });
    opened = [];
  });
})();
