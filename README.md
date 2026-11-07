# Bhuvanesh Parashar — Portfolio

A monochrome, editorial-style portfolio built with React + Vite, Tailwind CSS,
Framer Motion, GSAP (ScrollTrigger), Lenis smooth scroll, and Lucide React.

## Design direction

Restyled in the language of premium product-design-studio sites (à la
phenomenonstudio.com): near-black/white palette, big confident serif
headlines, hairline borders instead of glassmorphism, flat panels instead of
blurred glow cards, and a single restrained blue accent used only on tags,
links, and one flourish on the hero name — no gradient buttons, no neon glow,
no dot-grid backgrounds. A "Bhuvanesh in numbers" stat strip (real numbers,
pulled straight from your own project/skill/experience data) sits right under
the hero, mirroring that genre's signature "in numbers" block.

## Run it locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## What's in this version

- **Theme toggle** (sun/moon icon in navbar) — dark is the default brand
  experience; light mode is a fully separate, theme-aware palette (CSS
  variables in `src/index.css`, swapped via a `.light` class on `<html>`).
  Choice is remembered in `localStorage`.
- **Language toggle** (EN / हिंदी in navbar) — UI chrome (nav, headings,
  eyebrows, buttons, footer, chatbot) is translated in `src/data/translations.js`.
  Long-form prose (bio, project write-ups, experience descriptions) is
  English-only for now — translating those is just a matter of adding more
  keys and swapping the relevant strings to `t('key')`.
- **"Chat with Bhuvanesh"** (bottom-left) — a small rule-based assistant
  (`src/components/Chatbot.jsx`) that answers from your own skills/projects/
  experience data. No backend or API key needed, so it works the moment you
  deploy. Swap `getReply()` for a real LLM call later if you want freeform
  answers.
- **Back-to-top button** (bottom-right), appears after scrolling.
- **Ambient cursor-glow background** + GSAP ScrollTrigger parallax blob.
- **Project cards**: custom on-brand SVG thumbnails per project (no stock
  photos), tilt + lift + glow on hover, click → glassmorphism modal.
- **GitHub section**: live stats/contribution-graph images from
  github-readme-stats.vercel.app, plus your actual recent repos pulled live
  from the GitHub REST API — with graceful text fallbacks if either service
  is unreachable.
- **Experience section**: each role is a detailed card (summary + bullets +
  tech tags), not just a one-line timeline entry.
- **Resume button works out of the box** — `public/resume.pdf` is a clean
  starter resume auto-generated from this site's own data, so nothing 404s.
  Replace it with your real resume whenever you have it.
- All buttons resolve to something real — a project's GitHub button falls
  back to your main GitHub profile if no repo link is set yet, and the demo
  button only renders when a real demo link exists (no dead "coming soon" UI).

## Latest pass: rebuilt from the actual reference video

After reviewing a full screen recording of the reference site frame by frame,
the design moved to match what's actually there (alternating light/dark
sections, orange CTAs, flat surfaces) — adapted as follows per your calls:

- **Two accents** — blue stays the main brand color (nav, hero, primary
  buttons); orange/amber is the alternating secondary accent.
- **Alternating color rhythm instead of literal light/dark** — every other
  section gets a visible blue or orange ambient wash (`.tone-blue` /
  `.tone-orange` in `index.css`) instead of flipping to a white background.
- **Flat surfaces** — dropped glow/blur as decoration in favor of solid
  colors and hairline borders, matching the reference's real (not assumed)
  styling. A touch of blur remains only on the navbar/chatbot for legibility
  while scrolling.
- **Projects are full-page case-study sections** now, not a card grid +
  modal — each project gets its own full-bleed section (alternating
  blue/orange), with a large thumbnail, tag row, two-column meta (tech
  stack / role), and a Problem/Features/Architecture/Results grid below.
  `ProjectModal.jsx` was removed since it's no longer used.
- **Skills** became a numbered vertical tab switcher (mirrors the
  reference's category-tab pattern), with the AI/ML category called out in
  orange.



- **Fonts** — General Sans (display/headings, via Fontshare) + Inter (body),
  per the spec's preferred combination.
- **Colors** — exact spec values: bg `#050505`, surface `#0C0C0C`, card
  `#111111`, primary text `#F8F8F8`, secondary text `#A1A1AA`.
- **Accents** — primary blue gradient (`#89AACC → #4E85BF`) on buttons,
  active states, borders, hover glow; secondary violet gradient
  (`#8B5CF6 → #C026D3`) specifically on the AI/ML skill category, per spec.
- **Typography scale** — `clamp()`-based: hero `4rem–12rem`, section headings
  `3rem–8rem`, subheading `1.25rem–2rem`.
- **Layout** — `1400px` max-width container, `120px–180px` vertical section
  padding (both via `clamp()`).
- **Navbar** — floating glass pill, blurred, shrinks on scroll, hover
  underline on links.
- **Cards** — `24–32px` radius, dark surface, `rgba(255,255,255,0.08)`
  border, soft shadow; hover = lift + glow + scale + image zoom.
- **Project modal** — true glassmorphism: `rgba(17,17,17,0.8)` background,
  `blur(20px)`, `32px` radius, `rgba(255,255,255,0.1)` border.
- **Scroll experience** — the hero is sticky-pinned and the rest of the page
  slides up over it with a rounded top edge, for that "sections stack while
  scrolling" feel.



- **Line-reveal headings** (`RevealText.jsx`) — every major heading masks in
  on scroll, including the hero name.
- **Count-up stats** — the numbers in the stats strip animate from 0 to their
  real value when scrolled into view.
- **Magnetic buttons** (`lib/magnetic.js`) — the hero's primary buttons nudge
  toward the cursor on hover.
- **Custom cursor** (`CustomCursor.jsx`) — a small inverting dot replaces the
  system cursor on desktop (auto-disabled on touch devices).
- **Tech marquee** (`MarqueeStrip.jsx`) — an auto-scrolling strip of your
  skills, sitting right under the hero.
- **Two-column project modal** — case-study layout: thumbnail + meta +
  links on the left, scrollable write-up on the right (stacks on mobile).
- More generous section spacing and tighter heading tracking throughout.



These are flagged with comments in the code so they're easy to find:

1. **Project case studies** — `src/data/projects.js`: swap in your real
   problem/solution/architecture/etc. for BusMate, CampusGrid, StudyOS,
   AyurvedaTrace, plus real GitHub/demo links (leave a link as `""` to keep
   its button hidden/falling back).
2. **Experience dates** — `src/data/experience.js` has `period: 'Add real
   dates'` for all three roles.
3. **Bio** — `src/components/About.jsx`, marked `EDIT ME`.
4. **Resume** — swap `public/resume.pdf` for your real one.
5. **Contact form** — currently opens the visitor's email client via
   `mailto:` (no backend). Wire it to Formspree/EmailJS/your own API route
   if you want real submissions logged somewhere.
6. **Chatbot** — rule-based by design (see above); upgrade to a real LLM if
   you want it to handle anything off-script.

## Deploy

- **Vercel**: import the repo → framework preset "Vite" → deploy.
- **Netlify**: import the repo → build command `npm run build`, publish
  directory `dist`.

## Structure

```
src/
├── components/   # Loader, Navbar, Hero, About, Skills, Projects, ProjectModal,
│                 # ProjectThumbnails, GithubSection, Experience, Contact,
│                 # Footer, Chatbot, ScrollTopButton
├── context/      # ThemeContext, LanguageContext
├── lib/          # scroll.js — single Lenis instance shared by nav/hero/scroll-top
├── data/         # projects.js, skills.js, experience.js, socials.js, translations.js
├── App.jsx
├── main.jsx
└── index.css     # theme variables (dark/light), glass/gradient utilities,
                   # signature scan-border, cursor-glow
```
#   B h u v a n e s h - P a r a s h a r  
 