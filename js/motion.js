/* ==========================================================================
   NOKA PHOTOGRAPHY — MOTION LAYER
   Small, dependency-free enhancements loaded after site.js / page.js:
   - headings rise line by line (same move as the hero title)
   - nav: scroll progress hairline + current-section link
   - portfolio filters: one underline that slides to the chosen category
   - lightbox: soft crossfade between photos
   Everything is skipped or instant when the visitor prefers reduced motion.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ------------------------------------------- HEADINGS: line-by-line rise */
  // Splits section headings at their <br> into masked lines. The existing
  // reveal observer adds .is-in; CSS staggers each line upward.
  if (!reduceMotion) {
    $$('h2.display.reveal, h2.cta__title.reveal').forEach(function (h) {
      var lines = [[]];
      Array.prototype.slice.call(h.childNodes).forEach(function (n) {
        if (n.nodeName === 'BR') lines.push([]);
        else lines[lines.length - 1].push(n);
      });
      h.textContent = '';
      lines.forEach(function (nodes, i) {
        var outer = document.createElement('span');
        var inner = document.createElement('span');
        outer.className = 'line';
        inner.style.setProperty('--l', String(i));
        nodes.forEach(function (n) { inner.appendChild(n); });
        outer.appendChild(inner);
        h.appendChild(outer);
      });
      h.classList.add('split');
    });
  }

  /* ----------------------------------------- NAV: progress + current link */
  var nav = $('#nav');
  if (nav) {
    var bar = document.createElement('span');
    bar.className = 'nav__progress';
    bar.setAttribute('aria-hidden', 'true');
    nav.appendChild(bar);
    var queued = false;
    var paint = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0).toFixed(4) + ')';
      queued = false;
    };
    window.addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(paint); } }, { passive: true });
    window.addEventListener('resize', paint);
    paint();

    var links = $$('.nav__links a[href^="#"]');
    var byId = {};
    links.forEach(function (a) {
      var t = document.getElementById(a.getAttribute('href').slice(1));
      if (t) byId[t.id] = a;
    });
    if ('IntersectionObserver' in window && links.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var a = byId[en.target.id];
          if (!a) return;
          if (en.isIntersecting) {
            links.forEach(function (l) { l.removeAttribute('aria-current'); });
            a.setAttribute('aria-current', 'true');
          } else if (a.getAttribute('aria-current')) {
            a.removeAttribute('aria-current');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(byId).forEach(function (id) { spy.observe(document.getElementById(id)); });
    }
  }

  /* ------------------------------------ PORTFOLIO: sliding filter underline */
  var filters = $('#filters');
  if (filters) {
    var ind = document.createElement('span');
    ind.className = 'filters__bar';
    ind.setAttribute('aria-hidden', 'true');
    filters.appendChild(ind);
    filters.classList.add('has-bar');
    var place = function (scroll) {
      var on = $('.filter[aria-pressed="true"]', filters);
      if (!on) return;
      ind.style.width = on.offsetWidth + 'px';
      ind.style.transform = 'translateX(' + on.offsetLeft + 'px)';
      ind.style.top = (on.offsetTop + on.offsetHeight - 1) + 'px';
      // On phones the filter row scrolls sideways: keep the chosen one in view.
      if (scroll && filters.scrollWidth > filters.clientWidth) {
        var left = on.offsetLeft - (filters.clientWidth - on.offsetWidth) / 2;
        filters.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    };
    new MutationObserver(function () { place(true); }).observe(filters, { subtree: true, attributes: true, attributeFilter: ['aria-pressed'] });
    window.addEventListener('resize', function () { place(false); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(false); });
    place(false);
  }

  /* ---------------------------------------------- LIGHTBOX: photo crossfade */
  var lbImg = $('#lbImg');
  if (lbImg && !reduceMotion) {
    var swapping = false;
    new MutationObserver(function () {
      if (swapping) return;
      lbImg.classList.add('is-swapping');
      var done = function () { requestAnimationFrame(function () { lbImg.classList.remove('is-swapping'); }); };
      if (lbImg.complete) setTimeout(done, 60); else { lbImg.addEventListener('load', done, { once: true }); lbImg.addEventListener('error', done, { once: true }); }
    }).observe(lbImg, { attributes: true, attributeFilter: ['src'] });
  }
})();
