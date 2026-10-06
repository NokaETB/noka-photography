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
    // "/" sends inquiries to Netlify Forms, which emails them to you (set the
    // email under Netlify > Forms > Form notifications). If sending ever fails,
    // the form opens the visitor's email app with the message pre-filled instead.
    // Leave it as "" to always use the email-app version.
    formEndpoint: "/"
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
     Real client reviews, shared with permission (first name only).
     Add more by copying a block. The site shows 3 at a time (1 on phones)
     and rotates through all of them. A blank line in a quote starts a new
     paragraph.
     placeholder: true  shows a "Placeholder" label, so keep it false.
     ------------------------------------------------------------------ */
  testimonials: [
    {
      quote: "I’ve never felt my vision come to life the way it does with Zach. He makes you feel so comfortable, and will be your hype man along the way. He works efficiently, and you can trust that you’ll be more than happy when you receive your photos. He also doesn’t keep you out of the dark during the process, and is so open to knowing what it is you want to capture during your shoot with him. Then he makes it happen! 10’s across the board, book him!",
      name: "Tianna",
      detail: "Portrait Session · Narragansett",
      placeholder: false
    },
    {
      quote: "Zach is a true professional! He makes you feel respected, empowered and comfortable, the ENTIRE time, regardless of the content being shot. He gets ‘the shot’ every time!",
      name: "Brianne",
      detail: "Portrait Session · Rhode Island",
      placeholder: false
    },
    {
      quote: "Such an amazing effortless experience everytime. Photographers sometimes don’t go out of their way to make you as comfortable as possible and Zach has always made that his priority and treats you like a best friend while he’s at it. I’ve been lucky to have multiple amazing shoots with him and can’t wait for more!",
      name: "Isabella",
      detail: "Portrait Sessions · Rhode Island",
      placeholder: false
    },
    {
      quote: "Zach is one of the only photographers I bring all my special ideas to, his work is 1000% worth the investment & he’s a great guy to be around. It’s impossible for him to take a bad photo. I look forward to working with him many more times.",
      name: "Jack",
      detail: "Portrait Sessions · Westerly",
      placeholder: false
    },
    {
      quote: "I’ve been working with Zach since 2023, and I truly couldn’t recommend him more! Every session has been such a great experience, and he has a way of making me feel confident, comfortable, and completely myself in front of the camera. The photos always come out absolutely beautiful, and he consistently captures exactly what I’m looking for even the detail shots!! If you’re looking for someone talented, professional, and easy to work with, he’s the one! 🤍",
      name: "Meghan",
      detail: "Portrait Sessions · Providence",
      placeholder: false
    },
    {
      quote: "Zach is so incredible to work with. I’ve done so many shoots beyond our engagement shoot and the result is always the same. Zach makes you feel so comfortable, so confident, and the pictures are incredible every single time!! I look forward to working with Zach in the future and he will hands down always be my number one choice!",
      name: "Meghan",
      detail: "Engagement & Couples · Narragansett",
      placeholder: false
    },
    {
      quote: "I’ve been working with Zach since 2021, so at this point we’re five years deep in creating absolute cinema.\n\nEvery time I come to him with a vision, somehow he makes it look even more expensive than what was in my head. The man does not take pictures he creates art.\n\nI drive THREE HOURS just to work with him. Three. Hours. In New York traffic. That alone should tell you the level of trust here, because I’m not doing all that for anybody with a camera and a Lightroom subscription.\n\nThe experience is always top tier, the execution is insane, and the final product speaks for itself every single time.",
      name: "Saint",
      detail: "Portrait Sessions · Rhode Island",
      placeholder: false
    },
    {
      quote: "The BEST of the best. Genuinely so good at what he does and makes you feel comfortable. He creates a positive environment and I always have so much fun!! Would 1000% recommend booking with him!!",
      name: "Skylar",
      detail: "Portrait Sessions · Rhode Island",
      placeholder: false
    },
    {
      quote: "The photoshoot turned out amazing, and I’m so happy with the results! He made me feel comfortable throughout the shoot and was flexible and understanding. He was knowledgeable about poses and lighting, which made the whole experience feel easy and natural. Communication was excellent both before and after the shoot. I couldn’t have asked for a better experience or more beautiful photos!",
      name: "Gilana",
      detail: "Portrait Session · Narragansett",
      placeholder: false
    },
    {
      quote: "Noka is truly the best! Always super professional and patient, playlist is always a vibe as well. Just overall, the photography talent is insane. Editing skills are unmatched, you will always get a wow moment when looking at results. I’m sure anyone who has worked with him can agree to that!",
      name: "Madelyn",
      detail: "Portrait Sessions · Boston",
      placeholder: false
    },
    {
      quote: "Zach made the photoshoot experience special every time! He brings an energy that pumps you up with confidence and comfort- which was huge for my first time in front of the camera. Even living in MA I’ll forever seek out Zach for my shoots knowing the photos are perfect every time.",
      name: "Jessica",
      detail: "Couples Sessions · Boston",
      placeholder: false
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
