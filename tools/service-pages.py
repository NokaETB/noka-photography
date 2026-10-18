"""Builds the service pages (proposals/, family/, headshots/) from index.html and js/content.js.

Prices, reviews, FAQ answers, the nav, footer and inquiry form are copied from the homepage
so they never drift. Page copy, photos and which prices/reviews/FAQs each page shows are below.
Run from the repo root after changing prices, reviews or FAQs:  python3 tools/service-pages.py
"""
import html, json, re, subprocess

SITE = 'https://nokaphotography.com/'
home = open('index.html', encoding='utf-8').read()
cfg = json.loads(subprocess.check_output(['node', '-e', '''
const fs=require("fs"),vm=require("vm");const w={};
vm.runInNewContext(fs.readFileSync("js/content.js","utf8"),{window:w});
process.stdout.write(JSON.stringify(w.NOKA));''']))
esc = lambda s: html.escape(s, quote=True)

def between(start, end):
    i = home.index(start); j = home.index(end, i) + len(end)
    return home[i:j]

def to_home(block):
    # In-page links on the homepage become links back to it; #inquire stays on this page.
    block = re.sub(r'href="#(?!inquire")([^"]*)"', lambda m: 'href="../#%s"' % m.group(1) if m.group(1) != 'top' else 'href="../"', block)
    return re.sub(r'href="(proposals|family|headshots)/"', r'href="../\1/"', block)

nav = to_home(between('  <!-- ======================= COMPONENT: NAVIGATION', '  </div>\n\n  <main'))[:-len('\n\n  <main')]
footer = to_home(between('  <!-- ======================= 12. COMPONENT: FOOTER', '  </footer>'))
form_section = between('    <section class="section section--ink inquire"', '    </section>')
faqs = dict(re.findall(r'id="q\d+">(.*?)<span class="faq__icon".*?<div><p>(.*?)</p></div>', home, re.S))
prices = {p['name']: p for p in cfg['pricing']}
reviews = {(t['name'], t['detail']): t for t in cfg['testimonials']}
biz = dict(re.findall(r'<h3 class="price-row__name">([^<]*)</h3><div class="price-row__price">(?:<span>Starting at</span>)?<strong>[^<]*</strong></div><p class="price-row__note">([^<]*)</p>', between('<section class="section section--ink2 invest biz"', '</section>')))

PAGES = [
  dict(slug='proposals', session='Proposal',
    title='Rhode Island Proposal Photographer | Noka Photography',
    desc="Planning a proposal in Rhode Island? Zach Noka stays out of sight, catches the yes, then photographs you two after. Couples sessions from $700.",
    kicker=('Rhode Island', 'Proposal photographer'),
    h1='Rhode Island<br><em>proposal photography.</em>',
    lede="You plan the question. I'll be the guy hiding behind a rock, trying not to cry, and making sure the moment is actually in focus.",
    hero=('couple-04.jpg', 'Silhouetted proposal on the beach at sunset in Rhode Island', '50% 60%'),
    service='Proposal photography',
    statement="You only ask once.<em>So someone should be ready for it.</em>",
    body=["We plan it together before the day: the spot, the timing, the light, and where I'll be so they never see me coming. Pick somewhere that means something to you, or I'll suggest spots that suit the look you want. I'll check the light and logistics beforehand.",
          "Proposals are booked as a Couples session, so after the yes there's still time for photos of the two of you while you're both glowing."],
    steps=[('Plan the moment', 'Spot, timing, light'), ('I stay out of sight', 'They never see me coming'), ('The yes, captured', 'Every reaction, in focus'), ('Photos of you two', 'Right after, while you glow')],
    gallery=[('couple-08.jpg', 'Proposal on the rocks at sunset'), ('couple-09.jpg', 'Her hands and engagement ring cradling his head at sunset on the beach'), ('couple-03.jpg', 'Couple kissing on the beach, engagement ring visible'), ('couple-11.jpg', 'Lifted into a kiss on a tree-lined path'), ('couple-01.jpg', 'Black and white couple kissing beside marble columns'), ('couple-06.jpg', 'Black and white couple on a foggy field')],
    gallery_head='Every yes<br><em>looks different.</em>',
    price_rows=[('Couples', 'Proposal')],
    reviews_head='In their <em>own words.</em>',
    reviews=[('Meghan', 'Engagement & Couples · Narragansett'), ('Jessica', 'Couples Sessions · Boston'), ('Sam', 'Couples Session')],
    faqs=['Can I choose my own location?', 'How many photos do I receive?', 'How long does editing take?', 'Do you travel?', 'What if I need to reschedule?'],
  ),
  dict(slug='family', session='Family',
    title='Rhode Island Family Photographer | Maternity &amp; Newborn | Noka Photography',
    desc="Family, maternity and newborn photos in Rhode Island by Zach Noka. Directed, relaxed sessions on the beach, in a field or in studio. From $700.",
    kicker=('Rhode Island', 'Family / Maternity / Newborn'),
    h1='Rhode Island<br><em>family photography.</em>',
    lede="Real hugs, little ones who won't sit still, and photos you'll actually want on the wall.",
    hero=('family-02.jpg', 'Dad with son on his shoulders and mom on a path in Rhode Island', '50% 35%'),
    service='Family photography',
    statement="Nobody has to know how to pose.<em>That's my job.</em>",
    body=["I direct the whole session, so you can stop wrangling and actually be in the photos. You don't need any modeling experience, and neither do the kids.",
          "Beaches, fields, your own neighborhood or the studio. Expecting? Maternity sessions and newborn photos are part of the family work too."],
    steps=[('Plan it together', 'Location, outfits, mood'), ('A relaxed, directed shoot', 'I guide every pose'), ('Full retouching', 'On every photo you receive'), ('A private gallery', 'Within 7 days')],
    gallery=[('family-03.jpg', 'Young family with two little ones in fall leaves'), ('family-05.jpg', 'Maternity portrait on the beach at sunset'), ('family-08.jpg', 'Newborn asleep in a crib beside a teddy bear'), ('family-01.jpg', 'Mom and daughter walking into the ocean at sunset'), ('family-10.jpg', 'Mom, dad and daughter together in a green field'), ('family-04.jpg', 'Maternity silhouette against a red sunset'), ('family-09.jpg', 'Dad lifting the baby overhead while mom laughs, studio family portrait'), ('family-06.jpg', 'Three kids in matching striped shirts on a stone wall'), ('family-11.jpg', 'Mom and two sons dressed for the holidays on a covered bridge')],
    gallery_head='Your people,<br><em>at their best.</em>',
    price_rows=[('Family', 'Family')],
    reviews_head='In their <em>own words.</em>',
    reviews=[('Mercedes', 'Portrait Sessions · Newport')],
    faqs=['Do you help with posing?', 'Can I choose my own location?', 'How many photos do I receive?', 'How long does editing take?', 'Do you travel?', 'What if I need to reschedule?'],
  ),
  dict(slug='headshots', session='Headshots',
    title='Headshot &amp; Business Photographer in Rhode Island | Noka Photography',
    desc="Headshots, team headshots at your office, business events and brand photography in Providence and across Rhode Island. Headshots from $175, teams $150 per person.",
    kicker=('Providence / Rhode Island', 'Headshots &amp; business'),
    h1='Headshots &amp; business<br><em>photography in Rhode Island.</em>',
    lede="Look like you mean business. Headshots for you or your whole team, events captured with actual energy, and images for your brand.",
    hero=('studio-09.jpg', 'Big natural smile, simple studio headshot by Noka Photography', '50% 30%'),
    service='Headshot and business photography',
    statement="Your photo is the first meeting.<em>Make it a good one.</em>",
    body=["Same direction and full retouching every client gets, whether it's one new headshot for LinkedIn or the whole team at your office.",
          "Restaurants and caf&eacute;s, salons and barbershops, boutiques, auto shops and local brands: I also shoot events and brand content. Businesses can pay by invoice. You get a written quote up front and an itemized invoice, and how you'll use the photos is agreed before the shoot."],
    steps=[('Individual headshots', 'From $175'), ('Team headshots', '$150 per person, 3 or more'), ('Business events', 'From $800'), ('Brand &amp; campaign', 'Custom quote')],
    gallery=[('studio-03.jpg', 'Studio portrait of a man, hand on face'), ('studio-08.jpg', 'Holding nail color swatches over one eye, studio portrait'), ('studio-05.jpg', 'Black and white studio portrait on a stool'), ('studio-01.jpg', 'Laughing studio portrait in ripped jeans'), ('signature-02.jpg', 'Editorial portrait in a leather jacket, looking up at the camera'), ('studio-02.jpg', 'Standing with a guitar in the studio, cream outfit')],
    gallery_head='Clean, confident<br><em>and actually you.</em>',
    price_rows=[('Headshots', 'Headshots'), ('Team Headshots', 'Headshots'), ('Business Events', 'Event'), ('Brand &amp; Campaign', 'Business / Brand')],
    reviews_head='What clients <em>say.</em>',
    reviews=[('Brianne', 'Portrait Session · Rhode Island'), ('Jack', 'Portrait Sessions · Westerly')],
    faqs=['How long does editing take?', 'Do you travel?', 'What can I do with my photos?', 'What if I need to reschedule?'],
  ),
]
NAMES = {'proposals': 'Proposals', 'family': 'Family, maternity &amp; newborn', 'headshots': 'Headshots &amp; business'}

def price_row(name, session):
    if name in prices:
        p = prices[name]
        price = ('<span>%s</span>' % esc(p['prefix']) if p.get('prefix') else '') + '<strong>%s</strong>' % esc(p['price'])
        note, quote = esc(p['note']), 'quote' in p['price'].lower()
    else:  # business rows live only in the homepage's For Businesses section
        m = re.search(r'<h3 class="price-row__name">%s</h3><div class="price-row__price">(.*?)</div>' % re.escape(name), home)
        price, note, quote = m.group(1), biz[name], 'Quote' in m.group(1)
    label = name if name != 'Couples' else 'Proposal &amp; Couples'
    return ('          <li class="price-row reveal"><h3 class="price-row__name">%s</h3><div class="price-row__price">%s</div>'
            '<p class="price-row__note">%s</p><a class="price-row__cta" href="#inquire" data-inquire data-session="%s">%s</a></li>'
            % (label, price, note, session, 'Request a quote' if quote else 'Inquire'))

def build(pg):
    url = SITE + pg['slug'] + '/'
    img, alt, pos = pg['hero']
    starts = [float(prices[n]['price'].strip('$').replace(',', '')) for n, _ in pg['price_rows'] if n in prices and prices[n]['price'].startswith('$')]
    schema = {"@context": "https://schema.org", "@graph": [
        {"@type": "Service", "name": pg['service'], "serviceType": pg['service'], "url": url,
         "provider": {"@id": SITE + "#business"}, "areaServed": {"@type": "State", "name": "Rhode Island"},
         "image": SITE + 'images/' + img, "description": html.unescape(pg['desc']),
         **({"offers": {"@type": "Offer", "priceCurrency": "USD", "price": str(int(min(starts))), "url": url}} if starts else {})},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Noka Photography", "item": SITE},
            {"@type": "ListItem", "position": 2, "name": html.unescape(NAMES[pg['slug']]), "item": url}]}]}
    gallery = '\n'.join(
        '          <figure class="reveal" style="--d:%d"><div class="mask"><img src="../images/%s" width="1000" height="1250" loading="lazy" decoding="async" alt="%s"></div></figure>'
        % ((i % 3) * 120, f, esc(a)) for i, (f, a) in enumerate(pg['gallery']))
    quotes = '\n'.join(
        '          <figure class="quote reveal"><span class="quote__mark">“</span><blockquote class="quote__text" style="margin:0">%s</blockquote>'
        '<figcaption class="quote__by"><strong>%s</strong>%s</figcaption></figure>'
        % (esc(reviews[k]['quote']).replace('\n', '&#10;'), esc(k[0]), esc(k[1])) for k in pg['reviews'])
    faq = '\n'.join(
        '          <div class="faq__item">\n            <h3><button class="faq__q" aria-expanded="false" aria-controls="a%d" id="q%d">%s<span class="faq__icon" aria-hidden="true"></span></button></h3>\n'
        '            <div class="faq__a" id="a%d" role="region" aria-labelledby="q%d"><div><p>%s</p></div></div>\n          </div>\n'
        % (i, i, q, i, i, faqs[q]) for i, q in enumerate(pg['faqs'], 1))
    form = form_section.replace('<option>%s</option>' % pg['session'], '<option selected>%s</option>' % pg['session'], 1)
    assert 'selected' in form, pg['session']
    form = form.replace('<span>11</span> Inquire', '<span>06</span> Inquire')
    others = ' '.join('<a class="link-arrow" href="../%s/">%s <span aria-hidden="true">→</span></a>' % (s, NAMES[s]) for s in NAMES if s != pg['slug'])
    steps = '\n'.join('            <li><span>%s</span><small>%s</small></li>' % s for s in pg['steps'])
    body = '\n'.join('            <p>%s</p>' % p for p in pg['body'])
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <script>document.documentElement.classList.add('js');setTimeout(function(){{if(!window.__nokaReady)document.documentElement.classList.remove('js');}},3000);</script>
  <!-- Built by tools/service-pages.py. Edit the copy there and re-run it, so prices, reviews and FAQs stay in step with the homepage. -->

  <title>{pg['title']}</title>
  <meta name="description" content="{pg['desc']}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#0a0a0a">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Noka Photography">
  <meta property="og:title" content="{pg['title']}">
  <meta property="og:description" content="{pg['desc']}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{SITE}images/{img}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <script type="application/ld+json">
{json.dumps(schema, indent=2, ensure_ascii=False)}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400;1,6..96,500&family=Hanken+Grotesk:wght@300;400;500&display=swap">
  <link rel="stylesheet" href="../css/styles.css">
</head>

<body>
  <a class="skip-link" href="#main">Skip to content</a>

{nav}

  <main id="main">

    <section class="section section--ink svc-hero" aria-labelledby="svc-title">
      <div class="wrap about__grid">
        <figure class="about__figure">
          <div class="mask is-in"><img src="../images/{img}" style="object-position:{pos}" width="1000" height="1250" fetchpriority="high" decoding="async" alt="{esc(alt)}"></div>
        </figure>
        <div class="about__text">
          <p class="hero__kicker"><span>{pg['kicker'][0]}</span><span>{pg['kicker'][1]}</span></p>
          <h1 id="svc-title">{pg['h1']}</h1>
          <p class="lede">{pg['lede']}</p>
          <div class="svc-hero__actions">
            <a class="btn btn--solid-light" href="#inquire" data-inquire data-session="{pg['session']}">Check my date</a>
            <a class="btn btn--light" href="#work">See the work</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--paper intro" aria-labelledby="how-title">
      <div class="wrap intro__grid">
        <div class="intro__text">
          <p class="eyebrow reveal"><span>01</span> How it works</p>
          <h2 id="how-title" class="statement reveal">{pg['statement'].replace('<em>', ' <em>')}</h2>
          <div class="intro__body reveal">
{body}
          </div>
        </div>
        <div class="intro__figure reveal" style="margin-top:clamp(0px,6vw,100px)">
          <ul class="sig__list">
{steps}
          </ul>
        </div>
      </div>
    </section>

    <section class="section section--ink" id="work" aria-labelledby="work-title">
      <div class="wrap">
        <header class="sec-head">
          <p class="eyebrow reveal"><span>02</span> The work</p>
          <h2 id="work-title" class="display reveal">{pg['gallery_head']}</h2>
        </header>
        <div class="svc-grid">
{gallery}
        </div>
        <p class="pf__more reveal" style="margin-top:clamp(40px,5vw,64px)"><a class="link-arrow" href="../#portfolio">See the full portfolio <span aria-hidden="true">→</span></a></p>
      </div>
    </section>

    <section class="section section--ink2 invest" aria-labelledby="inv-title">
      <div class="wrap invest__grid">
        <header class="invest__head">
          <p class="eyebrow reveal"><span>03</span> Investment</p>
          <h2 id="inv-title" class="display reveal">Tailored to <em>the vision.</em></h2>
          <p class="invest__note reveal">A non-refundable deposit locks in your date and comes off your total. Within 25 miles of Providence? No travel fee.</p>
        </header>
        <ul class="price-list">
{chr(10).join(price_row(n, s) for n, s in pg['price_rows'])}
        </ul>
      </div>
    </section>

    <section class="section section--paper testi" aria-labelledby="testi-title">
      <div class="wrap">
        <header class="sec-head">
          <p class="eyebrow reveal"><span>04</span> Kind words</p>
          <h2 id="testi-title" class="display reveal">{pg['reviews_head']}</h2>
        </header>
        <div class="svc-quotes">
{quotes}
        </div>
      </div>
    </section>

    <section class="section section--paper2 faq" aria-labelledby="faq-title">
      <div class="wrap faq__grid">
        <header class="faq__head">
          <p class="eyebrow reveal"><span>05</span> Questions</p>
          <h2 id="faq-title" class="display reveal">Good <em>to know.</em></h2>
        </header>
        <div class="faq__list reveal">

{faq}
        </div>
      </div>
    </section>

{form}

    <section class="section section--ink2" aria-label="Other sessions" style="padding-block:clamp(56px,7vw,100px)">
      <div class="wrap">
        <p class="eyebrow"><span>+</span> More from Noka</p>
        <div class="svc-links">
          <a class="link-arrow" href="../">Home <span aria-hidden="true">→</span></a>
          {others}
        </div>
      </div>
    </section>
  </main>

{footer}

  <script src="../js/content.js"></script>
  <script src="../js/page.js" defer></script>
  <script>
    if (/(^|\\.)nokaphotography\\.com$/.test(location.hostname)) {{
      var gc = document.createElement('script');
      gc.async = true;
      gc.src = 'https://gc.zgo.at/count.js';
      gc.setAttribute('data-goatcounter', 'https://nokaphotography.goatcounter.com/count');
      document.body.appendChild(gc);
    }}
  </script>
</body>
</html>
'''

import os
for pg in PAGES:
    os.makedirs(pg['slug'], exist_ok=True)
    open(pg['slug'] + '/index.html', 'w', encoding='utf-8').write(build(pg))
    print('built', pg['slug'] + '/index.html')
