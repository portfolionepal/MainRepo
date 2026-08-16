# TrustEuroHR — Redesign Prompt Set

**Order to run these in:** Prompt 0 first (it sets up fonts, colors, libraries, navbar/logo, flags, and the WhatsApp button — everything else depends on it). Then Home → Services → About → Contact. Run the "Overall Polish" pass again at the very end as a final QA sweep.

Libraries every prompt assumes are installed:
```
npm install framer-motion lucide-react react-icons
```
- `lucide-react` → all generic UI icons (arrows, mail, pin, check, etc.)
- `react-icons` (`react-icons/fa6` or `react-icons/si`) → brand logos (Instagram, TikTok, WhatsApp) since Lucide doesn't have real brand marks
- `framer-motion` → scroll-reveal, hover states, the WhatsApp pulse, flag wave, everything that needs to feel "alive" instead of static

---

## Prompt 0 — Design System & Global Foundation

```
Our current TrustEuroHR site looks flat and generic ("AI template" look) — plain white
backgrounds, default Bootstrap-y cards, small waving-flag GIFs, and a logo that disappears
on the white navbar. Fix the foundation before touching individual pages.

1. TYPOGRAPHY
   - Stop using a default/generic sans font everywhere. Use a font PAIRING:
     - Headings: "Sora" or "General Sans" (bold, distinctive, geometric — feels premium,
       not template-y)
     - Body: "Inter" (clean, readable)
   - Import via Google Fonts / Fontshare in index.css, set as Tailwind fontFamily tokens
     (font-heading / font-sans). Avoid Poppins/Montserrat defaults — they're the most
     "AI-generated site" fonts there are.
   - Headings get tighter tracking (tracking-tight) and bold/extrabold weight.

2. COLOR SYSTEM (extend tailwind.config with named tokens, don't use raw hex in components)
   brand: {
     dark:   '#030106',  // deepest background / footer
     navy:   '#02195B',  // secondary dark, card backgrounds on dark sections
     blue:   '#0661DD',  // primary buttons, links, icons
     sky:    '#119CF3',  // gradients, hover states, highlights
     white:  '#EEF0F1',  // text on dark backgrounds
     red:    '#D31A1C',  // CTA accents, urgency badges
     gold:   '#FBE428',  // small accents only — underlines, star icons, badges
   }
   Rule of thumb: gold and red are ACCENTS ONLY (5% of the UI, never large fills).
   Primary UI color is the blue→sky gradient. Backgrounds should not be pure white
   (#FFFFFF) or pure gray — use very subtle blue-tinted off-whites (e.g. #F7F9FC) or
   soft gradient washes so nothing reads as flat/default.

3. LOGO FIX (this is broken right now — logo is invisible on white navbar)
   The logo has a black background baked in, so it disappears against white nav.
   - In the navbar: wrap the logo in a small dark rounded container — a rounded-xl
     chip in brand.dark or a subtle navy-to-black gradient, sized ~44-48px, with a
     faint blue glow (box-shadow using brand.blue at low opacity) so it echoes the
     logo's own glowing style instead of looking like a patch.
   - In the footer (which is already dark): logo can sit directly on the background,
     no chip needed.
   - Do not stretch or add a white box behind it — that's the "aish" look we're fixing.

4. DEPTH & TEXTURE (kills the "too flat" AI feeling)
   - Replace flat white section backgrounds with soft layered gradient blobs: 2-3 large,
     heavily blurred (blur-3xl) circles in brand.blue/brand.sky at 10-20% opacity,
     positioned behind hero and section headers, subtly animated with framer-motion
     (slow drift, 15-20s loop).
   - Add a very subtle noise/grain SVG overlay across the page (low opacity ~3-4%) —
     this alone removes a huge amount of "sterile AI render" feeling.
   - Cards use colored soft shadows, not default gray ones, e.g.
     shadow-[0_20px_60px_-15px_rgba(6,97,221,0.25)] instead of shadow-md/shadow-lg.
   - Consistent radius scale: rounded-2xl for cards, rounded-full for pills/buttons/icons.

5. ICONS
   - Replace any emoji-style or default icon-in-a-box (like the plane/briefcase squares)
     with lucide-react icons, stroke-width 1.75-2, inside gradient rounded-2xl containers
     (brand.blue → brand.sky gradient), with a soft glow shadow matching the gradient.
   - For brand/social icons (Instagram, TikTok, WhatsApp) use react-icons (react-icons/fa6
     or react-icons/si) so they're recognizable real logos, not generic placeholders.

6. BUTTONS
   - Primary: gradient bg (brand.blue → brand.sky), white text, rounded-full, subtle
     shadow glow, on hover: scale-[1.03], shadow intensifies, transition-all duration-300.
   - Secondary/outline: 1.5px border in brand.navy, transparent bg, fills with a light
     tint on hover.
   - Every button with an icon (arrow, send, etc.) gets a small translate-x on hover via
     framer-motion or group-hover, not a static icon.

7. COUNTRY FLAGS (currently tiny stacked GIFs — replace entirely)
   - Do NOT use raster GIF flags. Use crisp SVG flags (e.g. `flag-icons` npm package or
     inline SVG flag components) at a proper visible size (44-56px), rounded-md corners,
     soft shadow, in a horizontal or vertical pill group with a small glass/blur backdrop
     behind them (bg-white/40 backdrop-blur-md rounded-2xl p-3).
   - Give the flags a real "wave" via CSS keyframe (gentle skew/scale oscillation,
     staggered per-flag delay) — subtle, not cartoonish.
   - Animate the group in with framer-motion (staggered fade + slide from the right) on
     page load, and show a small tooltip with the country name on hover.
   - Add a short label above/beside them: "Now accepting applications for" in small caps.

8. FLOATING WHATSAPP BUTTON (currently a plain green circle — feels default/basic)
   - Size it properly: ~60px circle, WhatsApp icon from react-icons/fa6 (FaWhatsapp),
     crisp white icon on authentic WhatsApp green (#25D366), with a soft green glow
     shadow (shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5)]).
   - Add a continuous soft "pulse ring" animation behind it (a scaling, fading ring —
     framer-motion or CSS keyframe), so it's alive without being obnoxious.
   - The "click me" callout bubble should feel like a real chat widget: rounded-2xl
     white card with a small triangle tail pointing to the button, subtle shadow,
     fades/slides in every 5-6 sections of scroll (use IntersectionObserver or scroll
     progress with framer-motion's useScroll), auto-dismisses after ~4-5s, with a small
     (x) close icon.
   - Links to the wa.me URL, opens in a new tab.

Apply all of the above as shared components/tokens so Home, Services, About, and Contact
all inherit this system consistently — no page should look like it's from a different site.
```

---

## Prompt 1 — Home Page

```
Rebuild the Home page hero and any home-only sections using the design system from
Prompt 0 (fonts, color tokens, gradient blobs, lucide-react icons, framer-motion).

HERO SECTION:
- Keep the two-line big headline ("Your Gateway to European Opportunities") but add
  real visual weight: on the right side (where it's currently empty/plain), add either
  a high-quality real photo (professional handshake, passport/travel imagery, or people
  looking confident/aspirational) inside a rounded-3xl frame with a subtle gradient
  border, PLUS a small floating glassmorphic stat card overlapping the image corner
  (e.g. "500+ Visas Approved" with a lucide CheckCircle2 icon) — this is what makes a
  hero feel human-designed instead of a text-only AI template.
- Behind the headline, add the blurred gradient blob layers from the design system,
  animated with a slow drift.
- Badge pill ("Premium Foreign Consultancy") gets a subtle pulsing dot (framer-motion),
  small gradient border instead of flat gray border.
- CTA buttons ("Explore Services" / "Contact Us") follow the button system in Prompt 0 —
  add a lucide ArrowRight icon that animates on hover.
- Rebuild the flag cluster per Prompt 0 spec (SVG flags, glass backdrop, wave animation,
  staggered entrance, tooltip labels). Reposition if needed so it doesn't feel randomly
  placed — consider anchoring it just under the badge or as a distinct labeled strip
  rather than floating disconnected in the corner.
- On scroll, headline/paragraph/buttons should stagger-fade-in with framer-motion
  (whileInView, once: true) rather than appearing instantly.

BELOW THE FOLD (if not already present, add lightweight sections to make Home feel complete):
- A slim "trust strip": 3-4 small stat/credibility items (e.g. Countries covered,
  Success rate, Years/Support) using lucide icons in small gradient circles, laid out
  horizontally with subtle dividers — this can visually bridge into the About stats
  the site already has, or stand alone as a teaser row.
- Keep this section restrained — Home's job is the hero + a taste of credibility, not
  duplicating Services/About content.

Make sure the WhatsApp floating button and its periodic callout bubble (Prompt 0 spec)
are present and working on this page.
```

---

## Prompt 2 — Services Page

```
Rebuild the Services section using the design system from Prompt 0. Currently the two
cards (Travel Visa / Work Visa) are plain white boxes with flat emoji-style icon
squares — make them feel premium and considered.

- Section intro ("Our Expertise" / "Dedicated Visa Services") gets the gold-accent
  underline treatment (short 3-4px gradient or gold bar above the eyebrow text) and
  the gradient-blob background texture from Prompt 0 behind the section.
- Each service card:
  - Icon container: lucide-react icon (Plane for Travel Visa, Briefcase for Work Visa),
    inside a rounded-2xl gradient square (brand.blue → brand.sky for Travel, and a
    second complementary gradient — e.g. brand.navy → brand.blue, or introduce the gold
    accent subtly — for Work Visa, so the two cards are visually distinct, not identical
    twins in different colors).
  - Card background: very subtle off-white/blue-tinted, not pure white; colored soft
    shadow per Prompt 0; on hover, lift (translateY(-4px)) with shadow intensifying —
    framer-motion or CSS transition.
  - Checklist items: replace plain checkmark icons with lucide CheckCircle2, colored to
    match each card's accent, with a slight stagger-in animation when the card scrolls
    into view.
  - Add a small "Learn more" / "Get Started" text-link with an animated arrow at the
    bottom of each card if there's room — gives the cards a clear next action instead
    of dead-ending.
- Add a slim credibility strip beneath the two cards: 3-4 small icon+label items (e.g.
  Shield "Trusted Process", Clock "Fast Turnaround", Users "Personalized Support",
  Globe "5 Countries Covered") using lucide icons in small rounded-full backgrounds —
  this fills the visual gap under two cards on wide screens and reinforces trust.
- All content stagger-animates in on scroll (framer-motion whileInView).

Keep it to exactly these two services (Travel Visa, Work Visa) — don't invent extra
service types, just make these two feel complete and premium.
```

---

## Prompt 3 — About Us Page

```
Rebuild the About Us section using the design system from Prompt 0. Right now it's a
single text block plus three plain number-stat boxes stacked in a column — functional
but generic. Make it feel like a real company telling its story.

- Keep the "Who We Are" eyebrow + "Your Reliable Partner for European Visas" heading
  structure, but:
  - Replace the flat white card with a card that has the colored-shadow + subtle
    gradient-tinted background from the design system, and add a thin gradient/gold
    accent border-left or corner detail so it doesn't read as a plain rectangle.
  - Consider pairing the text block with a supporting visual on the same row (a photo,
    or an abstract graphic like a subtle world map / Europe outline in brand.blue at
    low opacity) instead of leaving it as text-only next to stat boxes — this is what's
    making it feel sparse/aish right now.
- Stat cards (5+ Countries, 98% Success Rate, 24/7 Support):
  - Give each an icon (lucide Globe2, TrendingUp, Headphones) above or beside the
    number, in a small gradient circle matching the design system.
  - Numbers get the gradient text treatment (bg-clip-text) using brand.blue → brand.sky
    (and keep gold/red as small accent moments, e.g. the % sign or a small badge) —
    right now "98%" and "24/7" use plain orange/navy which clashes slightly with the
    rest of the palette; unify them into the brand gradient system.
  - Cards animate in with a staggered count-up effect for the numbers (framer-motion +
    a simple count-up on scroll-into-view) — small detail, big "someone built this"
    signal.
- Optionally add a short 3-column "Our Values" or "Why Choose Us" row beneath (e.g.
  Transparency, Personalized Guidance, Proven Track Record) with lucide icons — keeps
  About from feeling like just one card and some stats.
- Everything stagger-fades in on scroll, consistent with the rest of the site.
```

---

## Prompt 4 — Contact Page

```
This is the most important page — rebuild it fully using the design system from
Prompt 0. Right now the form inputs are plain bordered boxes, the social icons are
default flat circles, and the map is unstyled default Google Maps grey — none of it
matches the brand.

CONTACT FORM (EmailJS):
- Inputs: add a lucide icon prefix inside each field (User for Name, Mail for Email,
  MessageSquare or Tag for Subject, MessageCircle for Message), rounded-xl borders that
  glow/highlight in brand.blue on focus (focus:ring-2 focus:ring-brand-blue/40), subtle
  background tint instead of pure white, smooth transition on focus/blur.
- Labels: small, uppercase, letter-spaced, brand.navy — currently they're plain default
  weight, tighten this up.
- Submit button ("Send Message"): keep the gradient but add a real loading state (spinner
  or animated dots) while EmailJS sends, then a success state (checkmark + "Message
  sent!" text, brief toast or inline confirmation) and an error state if it fails —
  right now there's no feedback loop, which feels unfinished/AI-stubbed.
- Wrap the whole form in the colored-shadow card treatment from Prompt 0.

CONTACT INFO CARD:
- Icons (location pin, phone, mail) already exist — swap them for lucide-react
  (MapPin, Phone, Mail) in small gradient rounded-xl containers matching the icon
  style used on Services, for consistency.
- "Follow Us" social icons: replace the plain flat-color circles with react-icons brand
  icons (FaInstagram, FaTiktok, FaWhatsapp, and add phone/mail as icon-buttons too) in
  consistent rounded-xl containers (~44px), each with its authentic brand color as a
  subtle gradient or solid fill, hover: lift + shadow glow in that brand's color. Right
  now only Instagram/TikTok are shown — make sure WhatsApp, phone, and email are also
  represented here as tappable icon-links (not just text), since this is the primary
  contact hub.

MAP:
- Apply a custom Google Maps style (a navy/blue-tinted "Snazzy Maps"-style JSON theme
  that pulls from brand.navy/brand.blue) instead of the default grey Google style — this
  single change removes a lot of "default embed" feeling.
- Replace the default red Google pin with a custom marker matching the brand (a small
  brand.blue circle with a white MapPin lucide icon, or a mini logo mark).
  If using @react-google-maps/api or similar, pass a custom `styles` array and a custom
  marker icon.
- Keep the location info card (New Baneshwor, Kathmandu 44600, Nepal) but restyle it to
  match the glass/shadow card system — round its corners consistently, add a soft shadow
  instead of the current flat white popup look.

FOOTER (visible at the bottom of Contact):
- Logo sits fine here since the background is already dark — but add a one-line tagline
  next to/under it, and organize the footer into clear columns (Logo+tagline / Quick
  Links / Contact / Social) with a thin gradient top border separating it from the map,
  instead of the current single-line minimal footer.

Confirm the floating WhatsApp button + periodic callout bubble (Prompt 0 spec) is present
and doesn't visually collide with the map's fullscreen/zoom controls in the bottom-right.
```

---

## How to use this
Paste **Prompt 0** to your coding agent first — it builds the shared design tokens, fonts, logo fix, flag component, and WhatsApp button that every other page uses. Then paste Prompts 1–4 one at a time. Once all four pages are done, run **Prompt 0 again** (or ask for a final "consistency pass across Home/Services/About/Contact using the design system") as your last QA step to catch anything that drifted between pages.
