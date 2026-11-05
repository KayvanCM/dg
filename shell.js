/* Shared shell for Northside Voice: left nav, user switcher, fidelity and annotation toggles, toast, tiny state. */
(function () {
  const LS = window.localStorage;
  const get = (k, d) => { try { const v = LS.getItem('ns:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  const set = (k, v) => { try { LS.setItem('ns:' + k, JSON.stringify(v)); } catch (e) {} };

  const NS = window.NS = {};
  NS.get = get; NS.set = set;

  /* the Northside logo, supplied as an SVG */
  const LOGO = '<svg class="logo" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g clip-path="url(#clip0_467_3480)"><g filter="url(#filter0_i_467_3480)"><rect x="1" y="0.358398" width="44" height="44" rx="9.5" fill="#31A34D"/><rect x="1.91667" y="1.27507" width="42.1667" height="42.1667" rx="8.58333" stroke="url(#paint0_linear_467_3480)" stroke-width="1.83333"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.1057 20.8208L22.1055 20.8214C22.0857 20.9071 22.07 20.9747 22.0614 21.0131C22.0225 21.0207 21.9539 21.0346 21.867 21.0522C21.5496 21.1166 20.988 21.2304 20.7366 21.2665C20.0972 21.3583 19.2113 21.4488 18.2279 21.4425C16.289 21.43 13.8425 21.0401 12.2261 19.3895C9.91062 17.0252 9.92678 13.2722 12.2622 11.007C14.5976 8.74186 18.3679 8.82225 20.6833 11.1866C22.2997 12.8371 22.6285 15.2811 22.5913 17.2103C22.5724 18.1889 22.4586 19.0679 22.35 19.7017C22.3073 19.9508 22.1785 20.5067 22.1057 20.8208ZM34.8811 20.8207C34.8611 20.9067 34.8454 20.9746 34.8368 21.0131C34.7979 21.0207 34.7294 21.0346 34.6426 21.0522L34.6424 21.0522C34.325 21.1166 33.7634 21.2304 33.512 21.2665C32.8726 21.3583 31.9867 21.4488 31.0033 21.4425C29.0644 21.43 26.6179 21.0401 25.0014 19.3895C22.686 17.0252 22.7022 13.2722 25.0376 11.007C27.373 8.74186 31.1433 8.82225 33.4587 11.1866C35.0751 12.8371 35.4039 15.2811 35.3667 17.2103C35.3477 18.1889 35.234 19.0679 35.1254 19.7017C35.0827 19.9508 34.9539 20.5066 34.8811 20.8207L34.8811 20.8207ZM24.9086 23.8825L24.9086 23.8828L24.9086 23.8828C24.835 24.1967 24.7048 24.7522 24.6615 25.0013C24.5512 25.6348 24.4354 26.5135 24.414 27.492C24.372 29.4211 24.6947 31.8659 26.307 33.5204C28.6166 35.8904 32.3867 35.9801 34.7277 33.7206C37.0687 31.4612 37.0942 27.7083 34.7846 25.3383C33.1723 23.6838 30.7267 23.2879 28.7879 23.2706C27.8045 23.2618 26.9184 23.3502 26.2787 23.4404C26.0272 23.4758 25.4653 23.5883 25.1478 23.6519L25.1477 23.6519C25.0608 23.6693 24.9922 23.683 24.9533 23.6905C24.9446 23.7289 24.9288 23.7967 24.9086 23.8825ZM12.1361 23.8022C12.1563 23.7163 12.1722 23.6484 12.1809 23.61C12.2198 23.6025 12.2884 23.5887 12.3753 23.5713C12.6928 23.5078 13.2548 23.3953 13.5063 23.3598C14.1459 23.2696 15.032 23.1812 16.0154 23.19C17.9543 23.2073 20.3998 23.6032 22.0121 25.2577C24.3217 27.6277 24.2962 31.3806 21.9552 33.6401C19.6142 35.8995 15.8441 35.8099 13.5345 33.4399C11.9222 31.7854 11.5996 29.3406 11.6416 27.4114C11.6629 26.4329 11.7788 25.5542 11.889 24.9207C11.9323 24.6716 12.0625 24.1161 12.1361 23.8022Z" fill="white"/></g></g><rect x="0.93125" y="0.289648" width="44.1375" height="44.1375" rx="9.56875" stroke="black" stroke-opacity="0.6" stroke-width="0.1375"/><defs><filter id="filter0_i_467_3480" x="1" y="-17.5166" width="44" height="61.875" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-17.875"/><feGaussianBlur stdDeviation="30"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix type="matrix" values="0 0 0 0 0.192157 0 0 0 0 0.639216 0 0 0 0 0.301961 0 0 0 0.2 0"/><feBlend mode="normal" in2="shape" result="effect1_innerShadow_467_3480"/></filter><linearGradient id="paint0_linear_467_3480" x1="23" y1="0.358398" x2="23" y2="44.3584" gradientUnits="userSpaceOnUse"><stop stop-color="#3EB05A"/><stop offset="0.389423" stop-color="#249640"/></linearGradient><clipPath id="clip0_467_3480"><rect x="1" y="0.358398" width="44" height="44" rx="9.5" fill="white"/></clipPath></defs></svg>';

  /* ---------- icons ---------- */
  NS.ico = (name, cls) => {
    const s = (window.NSI && window.NSI[name]) || '';
    return cls ? s.replace('<svg ', '<svg class="' + cls + '" ') : s;
  };
  NS.chev = (cls) => '<svg class="' + (cls || 'chev') + '" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3.5l4.5 4.5L6 12.5"/></svg>';
  NS.chevd = (cls) => '<svg class="' + (cls || 'chev') + '" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6"/></svg>';
  NS.check = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>';
  NS.play = '<svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2.5 1.5v9l8-4.5z"/></svg>';

  /* ---------- waveform in kit proportions: 2px bars, 5px pitch, played = ink, rest = #A6A6A6 ---------- */
  /* Bar heights taken from the kit's Waveform.svg (110 bars, 2px wide, 5px pitch). Longer waveforms repeat the pattern. */
  const KIT_WAVE = [6, 29, 38, 30, 13, 11, 12, 7, 12, 6, 22, 35, 35, 17, 19, 36, 36, 22, 7, 14, 10, 10, 10, 14, 29, 36, 27, 8, 30, 39, 31, 13, 13, 14, 7, 10, 7, 21, 34, 33, 16, 21, 38, 37, 22, 8, 16, 13, 7, 8, 13, 28, 34, 25, 10, 32, 40, 31, 12, 15, 17, 10, 8, 7, 20, 32, 31, 14, 22, 39, 38, 22, 9, 19, 15, 7, 7, 13, 27, 33, 23, 11, 33, 41, 31, 11, 16, 19, 12, 7, 8, 19, 30, 29, 12, 24, 40, 38, 21, 11, 21, 18, 9, 7, 13, 25, 30, 21, 13, 34];
  NS.wave = (n, played) => Array.from({ length: n }, (_, i) =>
    '<i class="' + (i > played ? 'off' : '') + '" style="height:' + KIT_WAVE[i % KIT_WAVE.length] + 'px"></i>').join('');

  /* ---------- secondary nav: the test calls of this agent ---------- */
  NS.SCENARIOS = [
    ['Patient confirms attendance', '0:48', 'filled', 'Passed', null],
    ['Patient reschedules to an open slot', '1:31', 'filled', 'Passed', 'p03-live-call.html'],
    ['Requested slot is taken during the call', '2:12', 'alert', 'Failed', 'p04-scenarios.html'],
    ['Wrong person answers', '0:41', 'filled', 'Passed', 'p03-alt-wrong-person.html'],
    ['Voicemail', '0:19', 'filled', 'Passed', null],
    ['Patient asks a medical question', '0:57', 'filled', 'Passed', null],
    ['Spanish-speaking patient', 'Not run', 'dashed', 'Not run', null]
  ];
  /* The other test calls, quietest last: failures and unrun first, then the passed calls under a count label. */
  NS.otherCalls = (current) => {
    const rows = NS.SCENARIOS.map(([n, d, k, label, href], i) => ({ i, n, k, label, href })).filter(r => r.i !== current);
    const li = (r, badge) => '<li><a href="' + (r.href || '#') + '"' + (r.href ? '' : ' data-nodetail') + '><span class="nm">' + r.n + '</span>' + (badge ? '<span class="badge badge-' + r.k + '">' + r.label + '</span>' : '') + '</a></li>';
    const top = rows.filter(r => r.k === 'alert').concat(rows.filter(r => r.k === 'dashed'));
    const pass = rows.filter(r => r.k === 'filled');
    return '<ul class="scn">' + top.map(r => li(r, true)).join('') + '</ul>' +
      (pass.length ? '<div class="pc"><p class="pc-l">' + pass.length + ' passed</p><ul class="scn">' + pass.map(r => li(r, false)).join('') + '</ul></div>' : '');
  };
  /* A page of stacked sections with a step list on the left. A click jumps straight to the section, scrolling moves the highlight.
     o.el the list element, o.steps [[id, label]], o.sums() a line per id, o.warn() the id to flag (or null), o.groups { id: 'Label' } for a small label above that item. Section headings are #h-<id>. */
  NS.stepNav = (o) => {
    const ids = o.steps.map(s => s[0]);
    let cur = ids[0];
    function render() {
      const sums = o.sums(), w = o.warn ? o.warn() : null;
      o.el.innerHTML = o.steps.map(([id, n]) => (o.groups && o.groups[id] ? '<span class="st-g t-eyebrow">' + o.groups[id] + '</span>' : '') + '<a class="st' + (id === w ? ' warn' : '') + '" href="#' + id + '"' + (id === cur ? ' aria-current="location"' : '') + '><span class="n">' + n + '</span><span class="s">' + (sums[id] || '') + '</span></a>').join('');
    }
    const mark = (id) => { if (id === cur) return; cur = id; render(); };
    o.el.addEventListener('click', e => {
      const a = e.target.closest('a.st'); if (!a) return;
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      document.getElementById(id).scrollIntoView({ behavior: 'instant', block: 'start' });
      history.replaceState(null, '', '#' + id);
      cur = ''; mark(id);
      const h = document.getElementById('h-' + id); if (h) h.focus({ preventScroll: true });
    });
    const io = new IntersectionObserver(entries => { for (const en of entries) if (en.isIntersecting) mark(en.target.id); }, { rootMargin: '-20% 0px -65% 0px' });
    ids.forEach(id => io.observe(document.getElementById(id)));
    window.addEventListener('scroll', () => {
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) mark(ids[ids.length - 1]);   // the last section can be short, so the bottom of the page counts as being on it
    }, { passive: true });
    render();
    if (location.hash && document.getElementById(location.hash.slice(1))) document.getElementById(location.hash.slice(1)).scrollIntoView({ behavior: 'instant' });
    return { render };
  };

  /* Call recording player: scrubbable waveform with a playhead, play or pause, back and forward 10 seconds.
     o: wave, play, back, fwd, time (elements), dur (seconds), pos (start). Returns { seek(seconds) }. */
  NS.player = (o) => {
    const D = o.dur, wave = o.wave, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pos = o.pos || 0, playing = false, N = 0, lastIdx = -1, ph = null, last = null;
    const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s) % 60).padStart(2, '0');
    const PAUSE = '<svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="2" y="1.5" width="3" height="9" rx="1"/><rect x="7" y="1.5" width="3" height="9" rx="1"/></svg>';
    o.back.innerHTML = '<span>' + NS.ico('arrow.trianglehead.2.counterclockwise') + '</span>10';
    o.fwd.innerHTML = '10<span>' + NS.ico('arrow.trianglehead.2.clockwise.rotate.90') + '</span>';
    function head() {
      const idx = Math.floor(pos / D * N);
      if (idx !== lastIdx) { const bars = wave.children; for (let i = 0; i < N; i++) bars[i].className = i > idx ? 'off' : ''; lastIdx = idx; }
      if (ph) ph.style.transform = 'translateX(' + (pos / D * (N * 5 - 3) - 4) + 'px)';
    }
    function draw() {
      head();
      o.time.textContent = fmt(pos);
      o.play.innerHTML = playing ? PAUSE : NS.play;
      o.play.setAttribute('aria-label', playing ? 'Pause' : pos >= D ? 'Replay' : 'Play');
      wave.setAttribute('aria-valuenow', Math.floor(pos)); wave.setAttribute('aria-valuetext', fmt(pos) + ' of ' + fmt(D));
      if (o.onTick) o.onTick(pos);
    }
    function build() {
      N = Math.max(10, Math.floor((wave.clientWidth + 3) / 5));
      wave.innerHTML = NS.wave(N, 0) + '<div class="ph" aria-hidden="true"><span class="knob"></span><span class="cap"></span></div>';
      ph = wave.querySelector('.ph'); lastIdx = -1; draw();
    }
    const seek = (t) => { pos = Math.max(0, Math.min(D, t)); draw(); };
    function frame(ts) {
      if (last === null) last = ts;
      const dt = Math.min(0.1, (ts - last) / 1000); last = ts;
      if (playing) { pos = Math.min(D, pos + dt); if (pos >= D) playing = false; draw(); }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    o.play.addEventListener('click', () => { if (!playing && pos >= D) pos = 0; playing = !playing; draw(); });
    o.back.addEventListener('click', () => seek(pos - 10));
    o.fwd.addEventListener('click', () => seek(pos + 10));
    let drag = false;
    const at = e => { const r = wave.getBoundingClientRect(); seek((e.clientX - r.left) / r.width * D); };
    wave.addEventListener('pointerdown', e => { drag = true; wave.setPointerCapture(e.pointerId); at(e); });
    wave.addEventListener('pointermove', e => { if (drag) at(e); });
    wave.addEventListener('pointerup', () => { drag = false; });
    wave.addEventListener('pointercancel', () => { drag = false; });
    wave.addEventListener('keydown', e => {
      const k = { ArrowRight: 5, ArrowLeft: -5, ArrowUp: 5, ArrowDown: -5 }[e.key];
      if (k) { e.preventDefault(); seek(pos + k); }
      if (e.key === 'Home') { e.preventDefault(); seek(0); }
      if (e.key === 'End') { e.preventDefault(); seek(D); }
    });
    build(); new ResizeObserver(build).observe(wave);   // the waveform shares its row, so it rebuilds whenever its width changes
    return { seek };
  };
  /* collapsible groups in the secondary panel */
  NS.initGroups = (root) => root.querySelectorAll('.sg-btn').forEach(b => {
    const slot = b.querySelector('.sg-chev'); if (slot && !slot.innerHTML) slot.innerHTML = NS.chev('chev');
    const body = document.getElementById(b.getAttribute('aria-controls'));
    b.addEventListener('click', () => { const open = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', String(open)); body.hidden = !open; });
  });
  NS.bindSubnav = (root) => root.querySelectorAll('a[data-nodetail]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); NS.toast('Only two test calls are part of this prototype.');
  }));

  /* ---------- toast ---------- */
  NS.toast = (msg) => {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(NS._t); NS._t = setTimeout(() => t.classList.remove('show'), 3600);
  };

  /* ---------- demo state shared across pages ---------- */
  NS.BASE_REVIEW = 6;
  NS.resolved = () => get('resolved', []);
  NS.isResolved = (id) => NS.resolved().indexOf(id) > -1;
  NS.resolve = (id) => { const r = NS.resolved(); if (r.indexOf(id) < 0) r.push(id); set('resolved', r); };
  NS.reviewCount = () => NS.BASE_REVIEW - NS.resolved().length;
  NS.user = () => ({ play: 'Sam Morita', cons: 'Teresa Alvarez' })[get('product', 'play')] || 'Sam Morita';
  NS.reset = () => { Object.keys(LS).filter(k => /^ns:(resolved|deployed|ack|resolution:|scn$|fi$|ann$)/.test(k)).forEach(k => LS.removeItem(k)); };

  /* ---------- fidelity + annotations ---------- */
  const applyPrefs = () => {
    const q = new URLSearchParams(location.search);
    if (q.get('ann')) set('ann', q.get('ann') === 'on');
    const r = document.documentElement;
    r.setAttribute('data-ann', get('ann', false) ? 'on' : 'off');
  };

  /* ---------- nav ---------- */
  const NAV = {
    play: [
      ['Templates', 'p01-templates.html', 'square.grid.2x2', 'p01'],
      ['Configure', 'p02-configure.html', 'pencil', 'p02'],
      ['Test Call', 'p03-live-call.html', 'waveform.mid', 'p03'],
      ['Test Call Alt', 'p03-alt-wrong-person.html', 'person.2', 'p03alt'],
      ['Test Scenarios', 'p04-scenarios.html', 'checkmark.shield.fill', 'p04']
    ],
    cons: [
      ['Deploy', 'c01-deploy.html', 'square.and.arrow.up', 'c01'],
      ['Overview', 'c02-overview.html', 'chart.line.uptrend.xyaxis', 'c02'],
      ['Call Log', 'c03-call-log.html', 'bubble.left.and.bubble.right', 'c03'],
      ['Call Detail', 'c04-call-detail.html', 'checkmark.circle', 'c04'],
      ['Needs Review', 'c04-alt-needs-review.html', 'exclamationmark.triangle', 'c04alt']
    ]
  };

  function buildSide() {
    const side = document.getElementById('side');
    if (!side) return;
    const body = document.body;
    let product = body.getAttribute('data-product'), person = product;
    /* 'ref' (Design Notes) shows the signed-in person's nav. data-keep-person (C01 Deploy, a Console page that Sam
       reaches from P04 and Teresa signs off) shows the Console nav but keeps whoever is signed in. */
    const keepPerson = body.hasAttribute('data-keep-person');
    if (product === 'ref') product = person = get('product', 'play');
    else if (keepPerson) person = get('product', 'play');
    else set('product', product);
    const page = body.getAttribute('data-nav') || '';
    const items = NAV[product].map(([n, href, ic, id]) => {
      const cur = id === page ? ' aria-current="page"' : '';
      const cnt = id === 'c03' ? '<span class="cnt" id="navcnt" aria-label="' + NS.reviewCount() + ' calls need review">' + NS.reviewCount() + '</span>' : '';
      return '<a class="nav-item" href="' + href + '"' + cur + '>' + NS.ico(ic) + '<span>' + n + '</span>' + cnt + '</a>';
    }).join('');
    const refCur = body.getAttribute('data-product') === 'ref' ? ' aria-current="page"' : '';
    const sam = product === 'play';
    const USERS = { play: { n: 'Sam Morita', i: 'SM', p: 'Playground' }, cons: { n: 'Teresa Alvarez', i: 'TA', p: 'Console' } };
    const cur = USERS[person];
    side.setAttribute('aria-label', 'Main navigation');
    side.innerHTML =
      '<a class="brand" href="p01-templates.html">' + LOGO + 'Northside Voice</a>' +
      '<nav class="navgrp" aria-label="' + (sam ? 'Playground' : 'Console') + '"><span class="t-eyebrow">' + (sam ? 'Playground' : 'Console') + '</span>' + items + '</nav>' +
      '<nav class="navgrp" aria-label="Reference"><span class="t-eyebrow">Reference</span>' +
        '<a class="nav-item" href="notes.html"' + refCur + '>' + NS.ico('info.circle') + '<span>Design Notes</span></a></nav>' +
      '<div class="side-foot">' +
        '<button type="button" class="linkbtn" id="resetdemo">Reset Demo</button>' +
        '<div class="who" id="who"><button type="button" class="who-btn" id="whobtn" aria-haspopup="menu" aria-expanded="false" aria-controls="whomenu"><span class="av" aria-hidden="true">' + cur.i + '</span><span class="who-t"><span class="who-n">' + cur.n + '</span><span class="t-caption">' + cur.p + '</span></span><span class="who-chev" aria-hidden="true">' + NS.chev('chev') + '</span></button>' +
          '<div class="who-menu" id="whomenu" role="menu" aria-label="Switch user" hidden><div class="t-eyebrow who-mh">Switch User</div>' +
          Object.keys(USERS).map(k => '<button type="button" class="who-item" role="menuitemradio" aria-checked="' + (k === person) + '" data-product="' + k + '"><span class="av" aria-hidden="true">' + USERS[k].i + '</span><span class="who-t"><span class="who-n">' + USERS[k].n + '</span><span class="t-caption">' + USERS[k].p + '</span></span><span class="who-ck" aria-hidden="true">' + (k === person ? NS.check : '') + '</span></button>').join('') +
        '</div></div>' +
      '</div>';

    /* switch user: Sam works in Playground, Teresa in Console */
    const HOME = { play: 'p01-templates.html', cons: 'c02-overview.html' };
    const wb = side.querySelector('#whobtn'), wm = side.querySelector('#whomenu');
    const closeWho = (focus) => { wm.hidden = true; wb.setAttribute('aria-expanded', 'false'); if (focus) wb.focus(); };
    wb.addEventListener('click', e => { e.stopPropagation(); const open = wm.hidden; wm.hidden = !open; wb.setAttribute('aria-expanded', String(open)); if (open) wm.querySelector('[aria-checked="true"]').focus(); });
    wm.querySelectorAll('.who-item').forEach(it => it.addEventListener('click', () => {
      const target = it.dataset.product; if (target === person) { closeWho(true); return; }
      set('product', target);
      location.href = HOME[target];   // switching always lands on that person's home, so the nav visibly changes (Sam: Templates, Teresa: Overview)
    }));
    wm.addEventListener('keydown', e => {
      const items = Array.from(wm.querySelectorAll('.who-item')), i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
    document.addEventListener('click', e => { if (!e.target.closest('#who')) closeWho(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !wm.hidden) closeWho(true); });

    side.querySelector('#resetdemo').addEventListener('click', () => { NS.reset(); try { sessionStorage.removeItem('ns:intro'); } catch (e) {} NS.toast('Demo reset. All calls are back in the queue.'); setTimeout(() => { location.href = HOME[product]; }, 700); });
  }

  /* ---------- switches (kit toggle) ---------- */
  NS.bindToggles = (root) => (root || document).querySelectorAll('.toggle[data-toggle]').forEach(t => {
    t.addEventListener('click', () => t.setAttribute('aria-checked', String(t.getAttribute('aria-checked') !== 'true')));
  });

  /* ---------- tabs (roving, arrow keys) ---------- */
  NS.tabs = (list, onChange) => {
    const tabs = Array.from(list.querySelectorAll('[role="tab"]'));
    const activate = (t, focus) => {
      tabs.forEach(x => { x.setAttribute('aria-selected', String(x === t)); x.tabIndex = x === t ? 0 : -1; });
      if (focus) t.focus();
      onChange && onChange(t);
    };
    tabs.forEach((t, i) => {
      t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
      t.addEventListener('click', () => activate(t));
      t.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { e.preventDefault(); activate(tabs[(i + 1) % tabs.length], true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); activate(tabs[(i - 1 + tabs.length) % tabs.length], true); }
      });
    });
  };

  /* First-launch intro: a black screen with a percent counter, then a grid of square tiles dissolves from the top left
     to the bottom right and the page reveals in stages. Plays once per browser session on the two home screens, and
     again after Reset Demo. Skipped for people who prefer reduced motion. */
  function playIntro() {
    const page = document.body.dataset.nav;
    if (page !== 'p01' && page !== 'c02') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem('ns:intro')) return;
      sessionStorage.setItem('ns:intro', 'seen');
    } catch (e) { return; }

    const PITCH = 44, COUNT_MS = 1100, WIPE_MS = 760, TILE_MS = 280;
    const cols = Math.ceil(innerWidth / PITCH), rows = Math.ceil(innerHeight / PITCH);
    const paper = getComputedStyle(document.body).backgroundColor;

    const splash = document.createElement('div');
    splash.className = 'launch-intro';
    splash.setAttribute('aria-hidden', 'true');
    splash.innerHTML = '<div class="launch-tiles"></div><span class="launch-counter">.. <span>0%</span></span>';
    const grid = splash.querySelector('.launch-tiles');
    grid.style.gridTemplateColumns = 'repeat(' + cols + ', ' + (PITCH - 4) + 'px)';
    grid.style.gridAutoRows = (PITCH - 4) + 'px';
    const tiles = [];
    for (let i = 0; i < cols * rows; i++) {
      const t = document.createElement('i');
      grid.append(t);
      tiles.push(t);
    }
    const label = splash.querySelector('.launch-counter');
    const counter = label.querySelector('span');
    document.body.append(splash);

    const animations = [];
    let frame;
    const finish = () => {
      cancelAnimationFrame(frame);
      animations.forEach(a => a.cancel());
      splash.remove();
      document.removeEventListener('focusin', finish);
    };
    document.addEventListener('focusin', finish);   // keyboard users are never held back by the animation
    setTimeout(finish, COUNT_MS + WIPE_MS + TILE_MS + 1200);   // failsafe: the splash can never get stuck, even if the browser pauses animations

    const ease = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
    function reveal(target, offset, blur, delay, duration) {
      (typeof target === 'string' ? document.querySelectorAll(target) : [target]).forEach(el => {
        animations.push(el.animate([
          { opacity: 0, transform: 'translateY(' + offset + 'px)', filter: 'blur(' + blur + 'px)' },
          { opacity: 1, transform: 'none', filter: 'none' }
        ], { delay, duration, easing: ease, fill: 'backwards' }));
      });
    }

    // Stage 2: the tiles dissolve along the diagonal, then the page content blurs in underneath.
    function wipe() {
      const reach = cols + rows - 2 || 1;
      tiles.forEach((t, i) => {
        const d = ((i % cols) + Math.floor(i / cols)) / reach;
        animations.push(t.animate([{ backgroundColor: '#000' }, { backgroundColor: paper }],
          { delay: d * WIPE_MS, duration: TILE_MS, easing: 'ease-in-out', fill: 'forwards' }));
      });
      animations.push(label.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' }));
      animations.push(grid.animate([{ backgroundColor: '#000' }, { backgroundColor: paper }],
        { delay: WIPE_MS * 0.6, duration: TILE_MS + WIPE_MS * 0.4, fill: 'forwards' }));
      const exit = splash.animate([{ opacity: 1 }, { opacity: 0 }],
        { delay: WIPE_MS + TILE_MS, duration: 240, fill: 'forwards' });
      animations.push(exit);
      exit.onfinish = () => { splash.remove(); exit.cancel(); document.removeEventListener('focusin', finish); };
      reveal('#side > *, .crumb', -6, 0, WIPE_MS * 0.5, 420);
      reveal('.head', 12, 8, WIPE_MS * 0.6, 520);
      if (page === 'p01') reveal('.page > section[aria-labelledby="tpl-h"]', 12, 8, WIPE_MS * 0.7, 520);
      else document.querySelectorAll('.page > section:not(.annots)').forEach((el, i) => reveal(el, 12, 8, WIPE_MS * (0.7 + i * 0.1), 520));
    }

    const start = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - start) / COUNT_MS);
      counter.textContent = Math.floor(progress * 100) + '%';
      if (progress < 1) { frame = requestAnimationFrame(tick); return; }
      wipe();
    }
    frame = requestAnimationFrame(tick);
  }

  /* Optional call details: the left panel on the two test call pages can be hidden, and the choice is remembered. */
  function initPanelToggle() {
    const sub = document.getElementById('subnav'), tools = document.querySelector('.tools');
    if (!sub || !tools) return;
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'icon-btn'; btn.id = 'subtog'; btn.setAttribute('aria-controls', 'subnav');
    btn.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><rect x="1.7" y="2.7" width="12.6" height="10.6" rx="2.4"/><path d="M6 3v10"/></svg>';
    tools.prepend(btn);
    const apply = (hidden) => {
      document.body.classList.toggle('sub-off', hidden);
      const label = hidden ? 'Show Call Details' : 'Hide Call Details';
      btn.setAttribute('aria-label', label); btn.title = label;
      btn.setAttribute('aria-expanded', String(!hidden));
    };
    apply(NS.get('subHidden', false) === true);
    btn.addEventListener('click', () => { const hidden = !document.body.classList.contains('sub-off'); NS.set('subHidden', hidden); apply(hidden); });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyPrefs();
    if (!document.querySelector('.skip')) {
      const s = document.createElement('a'); s.className = 'skip'; s.href = '#main'; s.textContent = 'Skip to content';
      document.body.insertBefore(s, document.body.firstChild);
    }
    buildSide();
    NS.bindToggles();
    initPanelToggle();
    document.dispatchEvent(new Event('ns:ready'));
    playIntro();
  });
  applyPrefs(); /* run in <head> so the annotations setting applies before the page paints */
})();
