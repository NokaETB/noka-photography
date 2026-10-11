/* ==========================================================================
   NOKA PHOTOGRAPHY — SITE BEHAVIOUR
   Vanilla JS, no dependencies. Content comes from js/content.js.
   Components: Nav, Reveal, Hero parallax, Pricing, Testimonials,
   Gallery (filters + masonry), Lightbox, Experience, FAQ, Inquiry form.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.NOKA || {};
  var SITE = CFG.site || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------------------------------------------------------------- NAV */
  var nav = $('#nav');
  var menu = $('#menu');
  var toggle = $('#menuToggle');
  var toggleLabel = $('.nav__toggle-label', toggle);
  var html = document.documentElement;

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggleLabel.textContent = open ? toggleLabel.dataset.close : toggleLabel.dataset.open;
    html.classList.toggle('no-scroll', open);
    nav.classList.remove('is-hidden');
    if (open) nav.classList.add('is-solid');
    else onScroll();
  }
  toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 899 && menu.classList.contains('is-open')) setMenu(false); });

  var lastY = window.scrollY;
  var heroImg = $('#heroImg');
  var heroEl = $('.hero');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    if (!menu.classList.contains('is-open')) {
      nav.classList.toggle('is-solid', y > 60);
      var goingDown = y > lastY + 4;
      var goingUp = y < lastY - 4;
      if (goingDown && y > 400) nav.classList.add('is-hidden');
      else if (goingUp || y < 400) nav.classList.remove('is-hidden');
    }
    lastY = y;

    if (!reduceMotion && heroImg && heroEl && y < heroEl.offsetHeight) {
      heroImg.style.transform = 'translate3d(0,' + (y * 0.12).toFixed(1) + 'px,0)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* Offset in-page anchors for the fixed nav (CSS scroll-margin handles most;
     this keeps focus management tidy for keyboard users). */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = $(id);
      if (target) { target.setAttribute('tabindex', '-1'); setTimeout(function () { target.focus({ preventScroll: true }); }, 600); }
    });
  });

  /* ------------------------------------------------------------- REVEAL */
  var revealables = $$('.reveal, .mask');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealables.forEach(function (n) { io.observe(n); });
    window.__revealObserver = io;
  } else {
    revealables.forEach(function (n) { n.classList.add('is-in'); });
  }

  /* ------------------------------------------------------ PRICING (config) */
  var priceList = $('#priceList');
  // index.html carries a plain copy of the prices (tools/prerender.js); swap in the live version.
  if (CFG.pricing) priceList.innerHTML = '';
  (CFG.pricing || []).forEach(function (p, i) {
    var li = el('li', 'price-row reveal');
    li.style.setProperty('--d', String(i * 90));
    li.appendChild(el('h3', 'price-row__name', p.name));
    var price = el('div', 'price-row__price');
    if (p.prefix) price.appendChild(el('span', '', p.prefix));
    price.appendChild(el('strong', '', p.price));
    li.appendChild(price);
    li.appendChild(el('p', 'price-row__note', p.note || ''));
    var cta = el('a', 'price-row__cta', p.price && /quote/i.test(p.price) ? 'Request a quote' : 'Inquire');
    cta.href = '#inquire';
    cta.setAttribute('data-inquire', '');
    cta.setAttribute('data-session', p.name === 'Events' ? 'Event' : p.name);
    li.appendChild(cta);
    priceList.appendChild(li);
    if (window.__revealObserver) window.__revealObserver.observe(li); else li.classList.add('is-in');
  });

  /* ------------------------------------------------ TESTIMONIALS (config) */
  var testiGrid = $('#testiGrid');
  if (CFG.testimonials) testiGrid.innerHTML = '';
  var quotes = (CFG.testimonials || []).map(function (t, i) {
    var fig = el('figure', 'quote');
    fig.setAttribute('role', 'group');
    fig.setAttribute('aria-roledescription', 'review');
    fig.setAttribute('aria-label', (i + 1) + ' of ' + CFG.testimonials.length);
    if (t.placeholder) fig.appendChild(el('span', 'quote__tag', 'Placeholder: replace with a real review'));
    fig.appendChild(el('span', 'quote__mark', '“'));
    var bq = el('blockquote', 'quote__text', t.quote);
    bq.style.margin = '0';
    fig.appendChild(bq);
    // Very long reviews show the first few lines, with a button to read the rest.
    if (t.quote.length > 900) {
      fig.classList.add('is-long');
      bq.id = 'quote-' + i;
      var more = el('button', 'quote__more', 'Read more');
      more.type = 'button';
      more.setAttribute('aria-expanded', 'false');
      more.setAttribute('aria-controls', bq.id);
      fig.appendChild(more);
    }
    var by = el('figcaption', 'quote__by');
    by.appendChild(el('strong', '', t.name));
    by.appendChild(document.createTextNode(t.detail || ''));
    fig.appendChild(by);
    testiGrid.appendChild(fig);
    return fig;
  });

  /* Rotating reviews: shows as many as fit, advances a page at a time,
     pauses while the visitor is reading or interacting. */
  (function () {
    var nav = $('#testiNav'), dotsEl = $('#testiDots'), box = $('#testiCarousel');
    var DELAY = 8000;
    var perView = 1, pages = 1, page = 0, timer = null, paused = false, inView = false;

    function measure() {
      if (!quotes.length) return;
      perView = Math.max(1, Math.round(testiGrid.clientWidth / quotes[0].getBoundingClientRect().width));
      pages = Math.max(1, Math.ceil(quotes.length / perView));
      nav.hidden = pages < 2;
      dotsEl.replaceChildren();
      if (pages > 6) { dotsEl.appendChild(el('span', 'testi__count')); }
      else for (var i = 0; i < pages; i++) {
        var d = el('button', 'testi__dot');
        d.type = 'button';
        d.setAttribute('aria-label', 'Show reviews page ' + (i + 1) + ' of ' + pages);
        d.addEventListener('click', (function (k) { return function () { go(k); hold(); }; })(i));
        dotsEl.appendChild(d);
      }
      sync();
    }
    function setOpen(fig, open) {
      fig.classList.toggle('is-open', open);
      var b = $('.quote__more', fig);
      b.textContent = open ? 'Show less' : 'Read more';
      b.setAttribute('aria-expanded', String(open));
    }
    function go(p) {
      $$('.quote.is-open', testiGrid).forEach(function (f) { setOpen(f, false); });
      page = (p + pages) % pages;
      var first = Math.min(page * perView, quotes.length - perView);
      testiGrid.scrollTo({ left: quotes[Math.max(0, first)].offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
      mark();
    }
    function mark() {
      $$('.testi__dot', dotsEl).forEach(function (d, i) { d.setAttribute('aria-current', String(i === page)); });
      var c = $('.testi__count', dotsEl);
      if (c) c.textContent = (page + 1) + ' / ' + pages;
      fit();
    }
    // Size the row to the reviews on screen, so short ones don't leave a gap.
    function fit() {
      var first = Math.max(0, Math.min(page * perView, quotes.length - perView)), h = 0;
      for (var i = first; i < first + perView && i < quotes.length; i++) h = Math.max(h, quotes[i].offsetHeight);
      if (h) testiGrid.style.height = h + 'px';
    }
    function sync() {
      var step = quotes.length > 1 ? quotes[1].offsetLeft - quotes[0].offsetLeft : 1;
      var idx = Math.round(testiGrid.scrollLeft / step);
      var atEnd = testiGrid.scrollLeft + testiGrid.clientWidth >= testiGrid.scrollWidth - 4;
      page = atEnd ? pages - 1 : Math.min(pages - 1, Math.round(idx / perView));
      mark();
    }
    // Longer reviews stay up longer, so there's time to read them.
    function readTime() {
      var first = Math.max(0, Math.min(page * perView, quotes.length - perView)), n = 0;
      for (var i = first; i < first + perView && i < quotes.length; i++) n = Math.max(n, quotes[i].textContent.length);
      return Math.min(18000, Math.max(DELAY, n * 40));
    }
    function tick() {
      if (!paused && inView && !document.hidden) go(page + 1);
      timer = setTimeout(tick, readTime());
    }
    function start() { stop(); if (!reduceMotion && pages > 1) timer = setTimeout(tick, readTime()); }
    function stop() { if (timer) { clearTimeout(timer); timer = null; } }
    var holdT;
    function hold() { paused = true; clearTimeout(holdT); holdT = setTimeout(function () { paused = false; }, DELAY * 2); }

    $('#testiPrev').addEventListener('click', function () { go(page - 1); hold(); });
    $('#testiNext').addEventListener('click', function () { go(page + 1); hold(); });
    box.addEventListener('mouseenter', function () { paused = true; });
    box.addEventListener('mouseleave', function () { paused = false; });
    box.addEventListener('focusin', function () { paused = true; });
    box.addEventListener('focusout', function () { paused = false; });
    testiGrid.addEventListener('touchstart', hold, { passive: true });
    testiGrid.addEventListener('click', function (e) {
      var b = e.target.closest('.quote__more');
      if (!b) return;
      setOpen(b.parentNode, !b.parentNode.classList.contains('is-open'));
      fit();
      hold();
    });
    testiGrid.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(page + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(page - 1); }
    });
    var st;
    testiGrid.addEventListener('scroll', function () { clearTimeout(st); st = setTimeout(sync, 80); }, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { inView = en[0].isIntersecting; }, { rootMargin: '-30% 0px -30% 0px' }).observe(box);
    } else { inView = true; }
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { measure(); go(page); start(); }, 200); });
    measure();
    start();
    window.addEventListener('load', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  })();

  /* -------------------------------------------------- GALLERY (config) */
  var items = CFG.gallery || [];
  var cats = CFG.categories || [];
  var catLabel = {};
  cats.forEach(function (c) { catLabel[c.id] = c.label; });

  var masonry = $('#masonry');
  var filtersEl = $('#filters');
  var countEl = $('#pfCount');
  var activeCat = 'all';
  var visible = [];
  var figures = [];

  function ratioOf(r) {
    var p = String(r || '4/5').split('/');
    var w = parseFloat(p[0]), h = parseFloat(p[1]);
    return (w > 0 && h > 0) ? { w: w, h: h } : { w: 4, h: 5 };
  }

  figures = items.map(function (it, idx) {
    var r = ratioOf(it.ratio);
    var fig = el('figure', 'shot');
    fig.style.aspectRatio = r.w + ' / ' + r.h;
    fig.dataset.cat = it.cat;
    var btn = el('button', 'shot__btn');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'View larger: ' + (it.alt || 'portfolio image'));
    var img = new Image();
    img.src = it.src;
    img.alt = it.alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = Math.round(r.w * 200);
    img.height = Math.round(r.h * 200);
    btn.appendChild(img);
    var cap = el('span', 'shot__cap');
    cap.appendChild(el('span', '', catLabel[it.cat] || it.cat));
    cap.appendChild(el('span', '', String(idx + 1).padStart(2, '0')));
    btn.appendChild(cap);
    fig.appendChild(btn);
    btn.addEventListener('click', function () { openLightbox(fig); });
    return { node: fig, data: it, ratio: r.h / r.w };
  });

  function colCount() {
    var w = window.innerWidth;
    return w < 700 ? 1 : (w < 1050 ? 2 : 3);
  }

  function layout(animate) {
    var n = colCount();
    var cols = [], heights = [];
    for (var i = 0; i < n; i++) { cols.push(el('div', 'masonry__col')); heights.push(0); }
    visible = figures.filter(function (f) { return activeCat === 'all' || f.data.cat === activeCat; });
    visible.forEach(function (f, i) {
      var k = heights.indexOf(Math.min.apply(null, heights));
      f.node.style.setProperty('--i', animate ? String(Math.min(i, 12)) : '0');
      f.node.style.animation = animate ? '' : 'none';
      cols[k].appendChild(f.node);
      heights[k] += f.ratio + 0.04;
    });
    masonry.dataset.cols = String(n);
    masonry.replaceChildren.apply(masonry, cols);
    if (animate) {
      // restart entry animation
      visible.forEach(function (f) { f.node.style.animation = 'none'; void f.node.offsetWidth; f.node.style.animation = ''; });
    }
    countEl.textContent = (activeCat === 'all' ? 'All work' : (catLabel[activeCat] || activeCat)) + ' — ' + visible.length + (visible.length === 1 ? ' image' : ' images');
  }

  function setFilter(cat, animate) {
    activeCat = cat || 'all';
    $$('.filter', filtersEl).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.cat === activeCat)); });
    layout(animate !== false);
  }

  function buildFilters() {
    var all = [{ id: 'all', label: 'All' }].concat(cats.filter(function (c) {
      return items.some(function (it) { return it.cat === c.id; });
    }));
    all.forEach(function (c) {
      var b = el('button', 'filter', c.label);
      b.type = 'button';
      b.dataset.cat = c.id;
      b.setAttribute('aria-pressed', c.id === 'all' ? 'true' : 'false');
      b.addEventListener('click', function () { setFilter(c.id); });
      filtersEl.appendChild(b);
    });
  }
  buildFilters();
  layout(false);

  var lastCols = colCount();
  var rz;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      var c = colCount();
      if (c !== lastCols) { lastCols = c; layout(false); }
    }, 180);
  });

  // Featured-work tiles filter the portfolio
  $$('[data-filter]').forEach(function (a) {
    a.addEventListener('click', function () { setFilter(a.dataset.filter); });
  });

  /* ----------------------------------------------------------- LIGHTBOX */
  var lb = $('#lightbox');
  var lbImg = $('#lbImg');
  var lbCap = $('#lbCap');
  var lbIndex = 0;
  var lbOpener = null;

  function showLb(i) {
    if (!visible.length) return;
    lbIndex = (i + visible.length) % visible.length;
    var f = visible[lbIndex];
    lbImg.src = f.data.src;
    lbImg.alt = f.data.alt || '';
    lbCap.textContent = (catLabel[f.data.cat] || f.data.cat) + '  ·  ' + (lbIndex + 1) + ' / ' + visible.length;
    // preload neighbours
    [1, -1].forEach(function (d) {
      var nx = visible[(lbIndex + d + visible.length) % visible.length];
      if (nx) { var p = new Image(); p.src = nx.data.src; }
    });
  }
  function openLightbox(figNode) {
    var i = visible.findIndex(function (f) { return f.node === figNode; });
    if (i < 0) return;
    lbOpener = document.activeElement;
    showLb(i);
    if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
    html.classList.add('no-scroll');
    $('#lbClose').focus();
  }
  function closeLightbox() {
    if (typeof lb.close === 'function') lb.close(); else lb.removeAttribute('open');
    html.classList.remove('no-scroll');
    if (lbOpener && lbOpener.focus) lbOpener.focus();
  }
  $('#lbClose').addEventListener('click', closeLightbox);
  $('#lbPrev').addEventListener('click', function () { showLb(lbIndex - 1); });
  $('#lbNext').addEventListener('click', function () { showLb(lbIndex + 1); });
  lb.addEventListener('cancel', function (e) { e.preventDefault(); closeLightbox(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
    else if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
  });
  var tx = null;
  lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (tx == null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
    tx = null;
  }, { passive: true });

  /* --------------------------------------------------------- EXPERIENCE */
  var steps = $$('.step');
  var stackImgs = $$('.exp__stack img');
  if (steps.length && 'IntersectionObserver' in window && !reduceMotion) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        steps.forEach(function (s) { s.classList.toggle('is-active', s === en.target); });
        var idx = parseInt(en.target.dataset.img, 10) || 0;
        stackImgs.forEach(function (im, i) { im.classList.toggle('is-active', i === idx); });
      });
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
    steps.forEach(function (s) { so.observe(s); });
  } else {
    steps.forEach(function (s) { s.classList.add('is-active'); });
  }

  /* ---------------------------------------------------------------- FAQ */
  $$('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var open = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', String(!open));
      q.closest('.faq__item').classList.toggle('is-open', !open);
    });
  });

  /* ------------------------------------------------- INQUIRE SHORTCUTS */
  var sessionSelect = $('#f-session');
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-inquire]') : null;
    if (!t) return;
    var val = t.getAttribute('data-session');
    if (val && sessionSelect) {
      for (var i = 0; i < sessionSelect.options.length; i++) {
        if (sessionSelect.options[i].text === val) { sessionSelect.selectedIndex = i; break; }
      }
    }
  });

  /* ---------------------------------------------------- INQUIRY FORM */
  var form = $('#inquiryForm');
  var statusEl = $('#formStatus');
  var submitBtn = $('#formSubmit');

  var messages = {
    name: 'Please tell me your name.',
    email: 'Please enter a valid email address.',
    session: 'Please choose a session type.',
    message: 'Tell me a little about your idea.'
  };

  function validate() {
    var ok = true;
    ['name', 'email', 'session', 'message'].forEach(function (k) {
      var input = form.elements[k];
      var wrap = input.closest('.field');
      var err = $('.field__err', wrap);
      var bad = !input.value.trim() || (k === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));
      wrap.classList.toggle('has-error', bad);
      input.setAttribute('aria-invalid', String(bad));
      if (err) err.textContent = bad ? messages[k] : '';
      if (bad && ok) { input.focus(); }
      if (bad) ok = false;
    });
    return ok;
  }

  function setStatus(msg, kind) {
    statusEl.className = 'form__status' + (kind ? ' is-' + kind : '');
    statusEl.textContent = '';
    if (typeof msg === 'string') statusEl.textContent = msg;
    else statusEl.appendChild(msg);
  }

  function mailtoFallback(data) {
    var lines = [
      'Name: ' + data.name,
      'Email: ' + data.email,
      data.phone ? 'Phone: ' + data.phone : '',
      'Session type: ' + data.session,
      data.timing ? 'Ideal timing: ' + data.timing : '',
      data.location ? 'Location idea: ' + data.location : '',
      '',
      data.message
    ].filter(function (l, i) { return l !== '' || i === 6; });
    var href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent('Session inquiry: ' + data.session) +
      '&body=' + encodeURIComponent(lines.join('\n'));
    window.location.href = href;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setStatus('');
    if (form.elements.website.value) return; // honeypot
    if (!validate()) return;

    var data = {};
    ['name', 'email', 'phone', 'session', 'timing', 'location', 'message'].forEach(function (k) {
      data[k] = form.elements[k].value.trim();
    });

    if (SITE.formEndpoint) {
      submitBtn.disabled = true;
      setStatus('Sending…');
      form.elements.subject.value = 'New session inquiry: ' + data.session + ' from ' + data.name;
      var body = new URLSearchParams(new FormData(form)).toString();
      fetch(SITE.formEndpoint, { method: 'POST', body: body, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function (r) {
          if (!r.ok) throw new Error('bad status');
          form.reset();
          setStatus('Got it! Your inquiry is in and I’ll be in touch soon.', 'ok');
        })
        .catch(function () {
          mailtoFallback(data);
          var span = document.createElement('span');
          span.appendChild(document.createTextNode('Your email app should open with your inquiry ready to send. If it doesn’t, email '));
          var a = document.createElement('a');
          a.href = 'mailto:' + SITE.email;
          a.textContent = SITE.email;
          span.appendChild(a);
          span.appendChild(document.createTextNode(' directly.'));
          setStatus(span, 'ok');
        })
        .then(function () { submitBtn.disabled = false; });
    } else {
      mailtoFallback(data);
      setStatus('Your email app should open with your inquiry ready to send. If it doesn’t, email ' + SITE.email + ' directly.', 'ok');
    }
  });

  form.addEventListener('input', function (e) {
    var wrap = e.target.closest('.field');
    if (wrap && wrap.classList.contains('has-error')) {
      wrap.classList.remove('has-error');
      var err = $('.field__err', wrap);
      if (err) err.textContent = '';
      e.target.setAttribute('aria-invalid', 'false');
    }
  });
  window.__nokaReady = true;
})();
