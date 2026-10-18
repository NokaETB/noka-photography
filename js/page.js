/* ==========================================================================
   NOKA PHOTOGRAPHY — SERVICE PAGE BEHAVIOUR (proposals/, family/, headshots/)
   The parts of site.js these pages use: Nav, Reveal, FAQ, Inquiry form.
   Kept in step with site.js; the homepage still uses site.js only.
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
