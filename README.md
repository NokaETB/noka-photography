# Noka Photography — Website Guide

A fast, static website (HTML, CSS, JavaScript — no frameworks, no build step).

## Folder layout

```
index.html          page structure + copy (FAQ, intro, about, process)
css/styles.css      all styling
js/content.js       <- YOUR EDIT FILE: prices, testimonials, gallery, email, form
js/site.js          behaviour (nav, gallery, lightbox, form). No need to touch.
images/             all photos (33 labeled placeholders to replace)
favicon.svg  robots.txt  sitemap.xml
```

---

## 1. Every image you need to provide

Save each photo into the `images/` folder using the EXACT filename. Export as JPG, quality ~80, ideally 250–500 KB each (use a tool like Squoosh or Lightroom's "Export for web").

### Full-screen images
| File | Where it appears | Size | Notes |
|---|---|---|---|
| `hero.jpg` | Top of homepage, desktop/tablet | 2400 × 1350+ (16:9) | Your single strongest, most dramatic image. Keep your subject in the center or right; headline sits bottom-left. |
| `hero-mobile.jpg` | Top of homepage, phones | 1200 × 1800 (2:3 vertical) | A vertical crop/version of the hero. Subject in the upper two-thirds. |
| `cta-final.jpg` | Full-screen "Let's create something." section, desktop | 2400 × 1350+ | Dark, moody or dramatic works best (text sits over it). |
| `cta-final-mobile.jpg` | Same, phones | 1200 × 1800 | Vertical version. |

### Section images
| File | Where | Size |
|---|---|---|
| `intro-01.jpg` | Introduction (tall image beside the opening statement) | 1200 × 1800 (2:3) |
| `experience-01.jpg` | The Noka Experience, shown for steps 01–02 (behind-the-scenes or concept feel) | 1600 × 2000 (4:5) |
| `experience-02.jpg` | Experience, step 03 "The Shoot" (you directing / shoot in action) | 1600 × 2000 |
| `experience-03.jpg` | Experience, steps 04–05 (finished retouched portrait) | 1600 × 2000 |
| `signature-01.jpg` | Signature Portraits, large image | 1600 × 2000 (4:5) |
| `signature-02.jpg` | Signature Portraits, smaller overlapping image | 1800 × 1200 (3:2) |
| `about-01.jpg` | About Zach (a portrait of you, or you at work) | 1600 × 2000 (4:5) |
| `og-image.jpg` | Preview image when your link is shared on social/text | 1200 × 630 |

### Portfolio (21 images) — also feed the homepage category covers
The **first image of each category (`-01`) is also the large cover tile on the homepage**, so make those your best. Ratio matters because images are cropped to fit; match the ratio shown or edit it in `content.js`.

| Category | Files (ratio) |
|---|---|
| Portraits | `portrait-01` (4:5, cover), `portrait-02` (2:3), `portrait-03` (1:1), `portrait-04` (4:5) |
| Editorial | `editorial-01` (3:2 horizontal, cover), `editorial-02` (2:3), `editorial-03` (4:5) |
| Couples | `couple-01` (4:5, cover), `couple-02` (3:2), `couple-03` (2:3) |
| Beauty | `beauty-01` (4:5, cover), `beauty-02` (1:1), `beauty-03` (2:3) |
| Lifestyle (incl. beach) | `lifestyle-01` (4:5, cover), `lifestyle-02` (3:2), `lifestyle-03` (2:3) |
| Family | `family-01` (3:2 horizontal, cover), `family-02` (4:5) |
| Studio | `studio-01` (3:2 horizontal, cover), `studio-02` (2:3), `studio-03` (1:1) |

Don't have 21 yet? Delete the lines you can't fill from `js/content.js` — the gallery and filters adjust automatically. (Keep the `-01` of each category you want to feature, or swap those tiles; a category with no photos simply drops out of the filter bar.)

---

## 2. How to update things yourself

Open `js/content.js` in any text editor (Notepad, TextEdit, VS Code). Change text between the quotation marks, save, refresh the site.

After changing prices or testimonials, run `node tools/prerender.js`. It copies them into `index.html` so they also show for visitors and tools that don't run JavaScript.

**Swap a photo:** replace the file in `images/` with your photo, same filename. Done.

**Add a photo:** copy one gallery line in `content.js`, change `src`, `cat`, `ratio`, `alt`. Add the file to `images/`.
**Remove a photo:** delete its line.

**Change prices:** edit `price: "$XX"` in the `pricing` section (e.g. `"$250"`). For Events, edit or keep "Custom Quote".

**Add real testimonials:** edit `quote`, `name`, `detail` and set `placeholder: false`. The "Placeholder" label disappears.

**Alt text:** change each gallery `alt` to describe the real photo ("Couple walking the beach at Narragansett at golden hour"). Good alt text helps Google Images and accessibility.

**FAQ, intro, about text, process steps:** edit directly in `index.html` (search for the text and change it).

---

## 3. Make the inquiry form deliver to your inbox

Out of the box the form opens the visitor's email app with the message pre-filled to nokaphotographyllc@gmail.com (works everywhere, but a bit clunky). For a seamless form:

1. Create a free account at **formspree.io**, make a form, copy its URL (looks like `https://formspree.io/f/abcdwxyz`).
2. Paste it into `formEndpoint: ""` at the top of `js/content.js`.
3. Done. Submissions now arrive in your email, and visitors see a "Thank you" message on the page.

---

## 4. Putting it online

Any static host works. Easiest: **Netlify Drop** (drag the whole folder onto netlify.com/drop), Cloudflare Pages, or GitHub Pages. Then connect your domain.

**Before launch, do a find/replace of `nokaphotography.com` with your real domain** in:
`index.html` (canonical, og:url, og:image, twitter:image, structured data), `robots.txt`, `sitemap.xml`.

Then submit the site in Google Search Console and create/claim a Google Business Profile (huge for "Providence portrait photographer" searches).

---

## 5. Notes

- Fonts (Bodoni Moda + Hanken Grotesk) load from Google Fonts. To self-host later, download them and update the `<link>` in `index.html`.
- The site respects "reduce motion" settings and is keyboard-navigable (skip link, accessible menu, gallery lightbox with arrow keys + Esc).
- The placeholder images are labeled so nothing is mistaken for your work. Replace all of them before launch.
