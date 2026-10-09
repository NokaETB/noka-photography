/* Copies the prices and reviews from js/content.js into index.html, so they
   show even before (or without) the page's JavaScript running.
   Run after editing js/content.js:  node tools/prerender.js */
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
var win = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/content.js'), 'utf8'), { window: win });
var CFG = win.NOKA;
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
var I = '          ';

var pricing = CFG.pricing.map(function (p) {
  var quote = /quote/i.test(p.price);
  return I + '<li class="price-row">' +
    '<h3 class="price-row__name">' + esc(p.name) + '</h3>' +
    '<div class="price-row__price">' + (p.prefix ? '<span>' + esc(p.prefix) + '</span>' : '') + '<strong>' + esc(p.price) + '</strong></div>' +
    '<p class="price-row__note">' + esc(p.note || '') + '</p>' +
    '<a class="price-row__cta" href="#inquire" data-inquire data-session="' + esc(p.name === 'Events' ? 'Event' : p.name) + '">' + (quote ? 'Request a quote' : 'Inquire') + '</a></li>';
}).join('\n');

var reviews = CFG.testimonials.map(function (t, i) {
  return I + '<figure class="quote" role="group" aria-roledescription="review" aria-label="' + (i + 1) + ' of ' + CFG.testimonials.length + '">' +
    '<span class="quote__mark">“</span>' +
    '<blockquote class="quote__text" style="margin:0">' + esc(t.quote).replace(/\n/g, '&#10;') + '</blockquote>' +
    '<figcaption class="quote__by"><strong>' + esc(t.name) + '</strong>' + esc(t.detail || '') + '</figcaption></figure>';
}).join('\n');

var file = path.join(root, 'index.html');
var html = fs.readFileSync(file, 'utf8');
function fill(name, body) {
  var re = new RegExp('(<!-- prerender:' + name + ' -->)[\\s\\S]*?(\\s*<!-- /prerender:' + name + ' -->)');
  if (!re.test(html)) throw new Error('Missing prerender markers for ' + name);
  html = html.replace(re, function (m, a, b) { return a + '\n' + body + b; });
}
fill('pricing', pricing);
fill('testimonials', reviews);
fs.writeFileSync(file, html);
console.log('Prerendered ' + CFG.pricing.length + ' prices and ' + CFG.testimonials.length + ' reviews into index.html');
