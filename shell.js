/* Shared shell for Northside Voice: left nav, product switcher, fidelity and annotation toggles, toast, tiny state. */
(function () {
  const LS = window.localStorage;
  const get = (k, d) => { try { const v = LS.getItem('ns:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  const set = (k, v) => { try { LS.setItem('ns:' + k, JSON.stringify(v)); } catch (e) {} };

  const NS = window.NS = {};
  NS.get = get; NS.set = set;

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
  NS.reset = () => { Object.keys(LS).filter(k => /^ns:(resolved|deployed|ack|resolution:)/.test(k)).forEach(k => LS.removeItem(k)); };

  /* ---------- fidelity + annotations ---------- */
  const applyPrefs = () => {
    const q = new URLSearchParams(location.search);
    if (q.get('fi')) set('fi', q.get('fi'));
    if (q.get('ann')) set('ann', q.get('ann') === 'on');
    const r = document.documentElement;
    r.setAttribute('data-fi', get('fi', 'high'));
    r.setAttribute('data-ann', get('ann', false) ? 'on' : 'off');
  };

  /* ---------- nav ---------- */
  const NAV = {
    play: [
      ['Templates', 'p01-templates.html', 'square.grid.2x2', 'p01'],
      ['Configure', 'p02-configure.html', 'pencil', 'p02'],
      ['Test Call', 'p03-live-call.html', 'waveform.mid', 'p03'],
      ['Test Scenarios', 'p04-scenarios.html', 'checkmark.shield.fill', 'p04']
    ],
    cons: [
      ['Overview', 'c02-overview.html', 'chart.line.uptrend.xyaxis', 'c02'],
      ['Call Log', 'c03-call-log.html', 'bubble.left.and.bubble.right', 'c03'],
      ['Deploy', 'c01-deploy.html', 'square.and.arrow.up', 'c01']
    ]
  };

  function buildSide() {
    const side = document.getElementById('side');
    if (!side) return;
    const body = document.body;
    let product = body.getAttribute('data-product');
    if (product === 'ref') product = get('product', 'play'); else set('product', product);
    const page = body.getAttribute('data-nav') || '';
    const items = NAV[product].map(([n, href, ic, id]) => {
      const cur = id === page ? ' aria-current="page"' : '';
      const cnt = id === 'c03' ? '<span class="cnt" id="navcnt" aria-label="' + NS.reviewCount() + ' calls need review">' + NS.reviewCount() + '</span>' : '';
      return '<a class="nav-item" href="' + href + '"' + cur + '>' + NS.ico(ic) + '<span>' + n + '</span>' + cnt + '</a>';
    }).join('');
    const refCur = body.getAttribute('data-product') === 'ref' ? ' aria-current="page"' : '';
    const sam = product === 'play';
    side.setAttribute('aria-label', 'Main navigation');
    side.innerHTML =
      '<a class="brand" href="p01-templates.html"><i>' + NS.ico('waveform.mid') + '</i>Northside Voice</a>' +
      '<div class="switcher" role="group" aria-label="Product">' +
        '<a href="p01-templates.html"' + (product === 'play' ? ' aria-current="true"' : '') + '>Playground</a>' +
        '<a href="c02-overview.html"' + (product === 'cons' ? ' aria-current="true"' : '') + '>Console</a>' +
      '</div>' +
      '<nav class="navgrp" aria-label="' + (sam ? 'Playground' : 'Console') + '"><span class="t-eyebrow">' + (sam ? 'Playground' : 'Console') + '</span>' + items + '</nav>' +
      '<nav class="navgrp" aria-label="Reference"><span class="t-eyebrow">Reference</span>' +
        '<a class="nav-item" href="notes.html"' + refCur + '>' + NS.ico('info.circle') + '<span>Design Notes</span></a></nav>' +
      '<div class="side-foot">' +
        '<div class="pref"><span id="fi-l">Fidelity</span><span class="seg2" role="group" aria-labelledby="fi-l"><button type="button" data-fi-set="low">Low</button><button type="button" data-fi-set="high">High</button></span></div>' +
        '<div class="pref"><span id="an-l">Brief Annotations</span><button type="button" class="toggle" role="switch" id="annsw" aria-labelledby="an-l" aria-checked="false"><span class="trk"></span></button></div>' +
        '<button type="button" class="linkbtn" id="resetdemo">Reset Demo</button>' +
        '<div class="who"><div class="av" aria-hidden="true">' + (sam ? 'SM' : 'TA') + '</div><div><div style="font-size:12px;font-weight:600;line-height:16px">' + (sam ? 'Sam Morita' : 'Teresa Alvarez') + '</div><div class="t-caption">' + (sam ? 'Integration engineer' : 'Front-desk operations') + '</div></div></div>' +
      '</div>';

    const syncFi = () => side.querySelectorAll('[data-fi-set]').forEach(b => b.setAttribute('aria-pressed', String(get('fi', 'high') === b.dataset.fiSet)));
    const syncAnn = () => side.querySelector('#annsw').setAttribute('aria-checked', String(!!get('ann', false)));
    syncFi(); syncAnn();
    side.querySelectorAll('[data-fi-set]').forEach(b => b.addEventListener('click', () => { set('fi', b.dataset.fiSet); applyPrefs(); syncFi(); }));
    side.querySelector('#annsw').addEventListener('click', () => { set('ann', !get('ann', false)); applyPrefs(); syncAnn(); });
    side.querySelector('#resetdemo').addEventListener('click', () => { NS.reset(); NS.toast('Demo reset. All calls are back in the queue.'); setTimeout(() => location.reload(), 700); });
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

  document.addEventListener('DOMContentLoaded', () => {
    applyPrefs();
    if (!document.querySelector('.skip')) {
      const s = document.createElement('a'); s.className = 'skip'; s.href = '#main'; s.textContent = 'Skip to content';
      document.body.insertBefore(s, document.body.firstChild);
    }
    buildSide();
    NS.bindToggles();
    document.dispatchEvent(new Event('ns:ready'));
  });
  applyPrefs(); /* run in <head> so Low fidelity never flashes High */
})();
