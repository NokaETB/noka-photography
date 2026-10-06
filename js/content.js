/* ==========================================================================
   NOKA PHOTOGRAPHY — EDITABLE CONTENT
   This is the one file you edit for: contact settings, gallery photos,
   investment/pricing and testimonials. No coding knowledge needed —
   just change the text between the quotation marks and save.
   ========================================================================== */

window.NOKA = {

  /* ------------------------------------------------------------------
     1. SITE SETTINGS
     ------------------------------------------------------------------ */
  site: {
    email: "nokaphotographyllc@gmail.com",
    instagram: "nokakodaks",
    phone: "401-308-2953",

    // INQUIRY FORM
    // Paste a Formspree (or similar) endpoint here so inquiries land in your inbox
    // automatically, e.g. "https://formspree.io/f/abcdwxyz"
    // Leave it as "" and the form will open the visitor's email app with the
    // message pre-filled and addressed to you (works, but less seamless).
    formEndpoint: ""
  },

  /* ------------------------------------------------------------------
     2. INVESTMENT / PRICING
     Change "$XX" to your real starting prices whenever you like.
     For a custom quote, set prefix to "" and price to "Custom Quote".
     Add, remove or reorder rows freely.
     ------------------------------------------------------------------ */
  pricing: [
    {
      name: "Portrait Session",
      note: "1 hour at the location of your choice, 2 outfits and at least 25 fully edited photos. Want more? 2 hours, multiple locations, 3 outfits and at least 40 photos for $600.",
      prefix: "Starting at",
      price: "$400"
    },
    {
      name: "Couples",
      note: "1 hour at one location and at least 25 fully retouched photos of you two. Or go big: 2 hours, two locations and at least 40 photos for $1,000.",
      prefix: "Starting at",
      price: "$700"
    },
    {
      name: "Graduation",
      note: "Your moment, done right. 1 hour solo at the location of your choice, cap and gown plus 2 outfits. Or 2 hours, two locations and 3 outfits for $650. Grad groups from $175 per person.",
      prefix: "Starting at",
      price: "$450"
    },
    {
      name: "Family",
      note: "1 hour at one location for up to 5 people and at least 30 fully edited photos. Or 2 hours, two locations, up to 8 people and at least 50 photos for $850. Extra family members are $30 each.",
      prefix: "Starting at",
      price: "$700"
    },
    {
      name: "Headshots",
      note: "Look like you mean business. 30 minutes, one look and at least 5 fully retouched photos. Or 60 minutes, up to 3 looks and at least 12 photos for $300. Teams of 3 or more are $150 per person, at your office.",
      prefix: "Starting at",
      price: "$175"
    },
    {
      name: "Groups",
      note: "Friends, teams, clubs and celebrations. 1 hour for up to 10 people and at least 30 photos. Or 2 hours, two locations, up to 15 people and at least 50 photos for $1,000. Extra people are $40 each.",
      prefix: "Starting at",
      price: "$700"
    },
    {
      name: "Events",
      note: "Birthdays, parties and business events, captured with actual energy. 3 hours of coverage and at least 120 fully edited photos. Or 5 hours and at least 200 photos for $1,200. Extra hours are $150.",
      prefix: "Starting at",
      price: "$800"
    },
    {
      name: "Editorial / Creative",
      note: "Got a big idea? Let's build it. Concept-led shoots are priced around the concept, styling and scope.",
      prefix: "",
      price: "Custom Quote"
    }
  ],

  /* ------------------------------------------------------------------
     3. TESTIMONIALS
     These three are PLACEHOLDERS. Replace the text with real client
     reviews, then change  placeholder: true  to  placeholder: false
     (that removes the "Placeholder" label on the site).
     ------------------------------------------------------------------ */
  testimonials: [
    {
      quote: "Placeholder review: I had no idea how to pose and it didn't matter. I left feeling like the best version of myself.",
      name: "Client Name",
      detail: "Portrait Session",
      placeholder: true
    },
    {
      quote: "Placeholder review: Easy, fun, and the photos looked like a magazine shoot. Everyone asked who took them.",
      name: "Client Name",
      detail: "Couples Session",
      placeholder: true
    },
    {
      quote: "Placeholder review: I came with a rough idea and Zach turned it into something I never could have pictured.",
      name: "Client Name",
      detail: "Editorial / Creative",
      placeholder: true
    }
  ],

  /* ------------------------------------------------------------------
     4. PORTFOLIO CATEGORIES
     "id" is used by the gallery below. "label" is what visitors see.
     ------------------------------------------------------------------ */
  categories: [
    { id: "portraits", label: "Portraits" },
    { id: "editorial", label: "Editorial" },
    { id: "couples",   label: "Couples" },
    { id: "beauty",    label: "Beauty" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "family",    label: "Family" },
    { id: "studio",    label: "Studio" }
  ],

  /* ------------------------------------------------------------------
     5. GALLERY
     To swap a photo: save your image into the /images folder using the
     same filename (e.g. portrait-01.jpg) — nothing else to change.
     To ADD a photo: copy one line, change src / cat / ratio / alt.
     To REMOVE a photo: delete its line.

       src   = file path in /images
       cat   = one of the category ids above
       ratio = shape the photo is shown in: "4/5" (vertical), "2/3" (tall),
               "1/1" (square), "3/2" (horizontal). Best to match your photo.
       alt   = short description for accessibility + Google. Describe
               what's in the photo (e.g. "Couple walking on a Newport beach at golden hour").

     TIP: the FIRST photo of each category (…-01) is also used as that
     category's large cover on the homepage, so make it your best one.
     ------------------------------------------------------------------ */
  gallery: [
    { src: "images/portrait-01.jpg"    , cat: "portraits" , ratio: "4/5", alt: "Sun flare and a big smile, golden hour portrait" },
    { src: "images/editorial-01.jpg"   , cat: "editorial" , ratio: "2/3", alt: "Hot pink room with a vintage phone, styled editorial set" },
    { src: "images/couple-01.jpg"      , cat: "couples"   , ratio: "2/3", alt: "Black and white couple kissing beside marble columns" },
    { src: "images/beauty-01.jpg"      , cat: "beauty"    , ratio: "4/5", alt: "Close beauty portrait, curly hair and golden skin" },
    { src: "images/lifestyle-01.jpg"   , cat: "lifestyle" , ratio: "2/3", alt: "Teal knit dress lying in the surf" },
    { src: "images/family-01.jpg"      , cat: "family"    , ratio: "2/3", alt: "Mom and daughter walking into the ocean at sunset" },
    { src: "images/studio-01.jpg"      , cat: "studio"    , ratio: "2/3", alt: "Laughing studio portrait in ripped jeans" },
    { src: "images/portrait-02.jpg"    , cat: "portraits" , ratio: "2/3", alt: "Curly-haired woman in a leopard dress between white columns" },
    { src: "images/editorial-02.jpg"   , cat: "editorial" , ratio: "2/3", alt: "Red smoke and red light concept portrait" },
    { src: "images/couple-02.jpg"      , cat: "couples"   , ratio: "2/3", alt: "Couple kissing, reflected in a vintage truck mirror" },
    { src: "images/beauty-02.jpg"      , cat: "beauty"    , ratio: "2/3", alt: "Red lip print on the cheek, studio beauty portrait" },
    { src: "images/lifestyle-02.jpg"   , cat: "lifestyle" , ratio: "2/3", alt: "Three friends in satin slips walking on the beach" },
    { src: "images/family-02.jpg"      , cat: "family"    , ratio: "2/3", alt: "Dad with son on his shoulders and mom on a path" },
    { src: "images/studio-02.jpg"      , cat: "studio"    , ratio: "2/3", alt: "Standing with a guitar in the studio, cream outfit" },
    { src: "images/portrait-03.jpg"    , cat: "portraits" , ratio: "2/3", alt: "Smiling portrait with long blonde waves in a fall field" },
    { src: "images/editorial-03.jpg"   , cat: "editorial" , ratio: "2/3", alt: "High kick in an elevator in a fur coat and heels" },
    { src: "images/couple-03.jpg"      , cat: "couples"   , ratio: "2/3", alt: "Couple kissing on the beach, engagement ring visible" },
    { src: "images/beauty-03.jpg"      , cat: "beauty"    , ratio: "2/3", alt: "Fur hat, bangs and a bold lip in winter" },
    { src: "images/lifestyle-03.jpg"   , cat: "lifestyle" , ratio: "2/3", alt: "White knit set in the surf" },
    { src: "images/family-03.jpg"      , cat: "family"    , ratio: "2/3", alt: "Young family with two little ones in fall leaves" },
    { src: "images/studio-03.jpg"      , cat: "studio"    , ratio: "2/3", alt: "Studio portrait of a man, hand on face" },
    { src: "images/portrait-04.jpg"    , cat: "portraits" , ratio: "2/3", alt: "Golden hour portrait in a leather coat, sun flare through trees" },
    { src: "images/editorial-04.jpg"   , cat: "editorial" , ratio: "2/3", alt: "Blue-haired clown concept with balloons on a rusty truck" },
    { src: "images/couple-04.jpg"      , cat: "couples"   , ratio: "2/3", alt: "Silhouetted proposal on the beach at sunset" },
    { src: "images/beauty-04.jpg"      , cat: "beauty"    , ratio: "4/5", alt: "Curly blonde hair in warm light, close portrait" },
    { src: "images/lifestyle-04.jpg"   , cat: "lifestyle" , ratio: "4/5", alt: "Curly hair profile at the ocean in golden light" },
    { src: "images/family-04.jpg"      , cat: "family"    , ratio: "2/3", alt: "Maternity silhouette against a red sunset" },
    { src: "images/studio-04.jpg"      , cat: "studio"    , ratio: "2/3", alt: "Studio portrait in a black top and tights" },
    { src: "images/portrait-05.jpg"    , cat: "portraits" , ratio: "2/3", alt: "Curly-haired woman on an ocean cliff" },
    { src: "images/editorial-05.jpg"   , cat: "editorial" , ratio: "2/3", alt: "Three women holding candles, witchy moody concept" },
    { src: "images/couple-05.jpg"      , cat: "couples"   , ratio: "2/3", alt: "Couple with a rusty blue vintage truck" },
    { src: "images/beauty-05.jpg"      , cat: "beauty"    , ratio: "2/3", alt: "Black and white portrait with hoop earrings" },
    { src: "images/lifestyle-05.jpg"   , cat: "lifestyle" , ratio: "2/3", alt: "Lying in the dunes in a white dress" },
    { src: "images/family-05.jpg"      , cat: "family"    , ratio: "2/3", alt: "Maternity portrait on the beach at sunset" },
    { src: "images/studio-05.jpg"      , cat: "studio"    , ratio: "2/3", alt: "Black and white studio portrait on a stool" },
    { src: "images/portrait-06.jpg"    , cat: "portraits" , ratio: "2/3", alt: "Tattooed woman in orange glasses leaning on a chair" },
    { src: "images/editorial-06.jpg"   , cat: "editorial" , ratio: "2/3", alt: "Blue and purple light projection portrait" },
    { src: "images/couple-06.jpg"      , cat: "couples"   , ratio: "2/3", alt: "Black and white couple on a foggy field" },
    { src: "images/beauty-06.jpg"      , cat: "beauty"    , ratio: "4/5", alt: "Lace gloves over the eyes, laughing, butterfly tattoo" },
    { src: "images/lifestyle-06.jpg"   , cat: "lifestyle" , ratio: "2/3", alt: "Yellow dress in a golden-hour field" },
    { src: "images/family-06.jpg"      , cat: "family"    , ratio: "2/3", alt: "Three kids in matching striped shirts on a stone wall" },
    { src: "images/studio-06.jpg"      , cat: "studio"    , ratio: "3/4", alt: "Black and white studio portrait in lace gloves" },
    { src: "images/portrait-07.jpg"    , cat: "portraits" , ratio: "2/3", alt: "Window-light portrait holding lemons" },
    { src: "images/editorial-07.jpg"   , cat: "editorial" , ratio: "2/3", alt: "Lounging on stacked vintage TVs" },
    { src: "images/couple-07.jpg"      , cat: "couples"   , ratio: "2/3", alt: "Bride dancing under string lights at the reception" },
    { src: "images/beauty-07.jpg"      , cat: "beauty"    , ratio: "2/3", alt: "Fur coat and bokeh lights, glamour portrait" },
    { src: "images/lifestyle-07.jpg"   , cat: "lifestyle" , ratio: "2/3", alt: "Blue one-piece and sun hat on the beach" },
    { src: "images/family-07.jpg"      , cat: "family"    , ratio: "4/5", alt: "Toddler running through a field at golden hour" },
    { src: "images/editorial-08.jpg"   , cat: "editorial" , ratio: "2/3", alt: "Red cape caught in the wind, winter trees" },
    { src: "images/couple-08.jpg"      , cat: "couples"   , ratio: "2/3", alt: "Proposal on the rocks at sunset" },
    { src: "images/lifestyle-08.jpg"   , cat: "lifestyle" , ratio: "2/3", alt: "White outfit in golden grass" },
    { src: "images/editorial-09.jpg"   , cat: "editorial" , ratio: "4/5", alt: "Boxer with wrapped hands and gloves under gym lights" },
    { src: "images/lifestyle-09.jpg"   , cat: "lifestyle" , ratio: "2/3", alt: "Hanging from a basketball hoop in a red set" }
  ]
};
