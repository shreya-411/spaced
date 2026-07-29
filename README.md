# wespaced.org — Website

A dark, minimalist single-page site for SPACED, built with plain HTML, CSS
and JavaScript (no frameworks, no build step — just open and edit).

## What's inside

```
wespaced/
├── index.html      ← all page content and structure
├── css/style.css   ← all design (colors, fonts, layout, animations)
├── js/script.js    ← all interactivity (cursor, starfield, nav, etc.)
└── assets/         ← put your own images here if you don't want to hotlink
```

## What's already built in

- **Comet cursor** — a glowing teal/purple dot with a fading trail, replacing
  the normal mouse cursor on desktop (falls back to a normal cursor on
  touch devices).
- **Pulsing starfield** — a full-page canvas of softly twinkling stars in
  white, teal and lavender, behind all content.
- **Spacey loading screen** — a rotating "orbit ring" logo animation on
  first load.
- **Sidebar navigation** — hidden by default on desktop. Hover the left
  edge of the screen (or the logo button, top-left) to peek it open; click
  the logo to pin it open, click again (or click elsewhere) to un-pin.
  On mobile/tablet it's a hamburger-triggered slide-in drawer instead.
  Either way, it has an animated orbit-dot indicator on the active section.
- **Fade transitions** — clicking a nav link briefly fades to black before
  scrolling to the section.
- **Flip cards** — the About / Vision / Mission cards glow on hover and
  flip to a teal face with black text when tapped.
- **Founder orbit rings** — hovering a founder's circular photo spins the
  ring and fades in a short bio, matching the logo's ring motif.
- **Scrolling board row** — the rest of the team scrolls past automatically
  and pauses on hover.
- **Animated buttons** — black-with-purple-outline buttons fill solid on
  hover, flipping to black text.
- **World reach map** — a lightweight canvas map with pulsing dots for
  ambassador/follower locations (hover a dot to see the city name).
- Fully responsive from small phones up to wide desktop screens.
- Respects `prefers-reduced-motion` for anyone who has that turned on.

## Logo

The real SPACED logo now lives at `assets/logo.jpg` and is used for the
sidebar brand mark, the footer, and the browser tab favicon. If you get a
higher-resolution or transparent-background version later, just replace
that file (keep the same name) and it updates everywhere automatically.

## Things you'll want to edit before launch

Search the files for **`EDIT ME`** — every one marks something you should
personalize:

1. **Google Form links** (Get Involved section) — currently placeholders
   like `https://forms.gle/REPLACE-WITH-YOUR-AMBASSADOR-FORM`.
2. **Wix blog URL** (Blog section + footer) — currently
   `https://wespaced.wixsite.com/blog`. Point this at whatever your Wix
   site becomes once it's just a blog.
3. **Board member row** — duplicate the `.marquee-member` block once per
   person, with their real name and photo (still placeholders).
4. **Album photos** — swap the space imagery for real event photos
   whenever you have them (the `.album-placeholder` tile is a reminder
   tile you can delete once it's full).
5. **World map locations** — in `js/script.js`, search for `LOCATIONS` and
   edit the list of cities/lat-lon pairs to reflect where your ambassadors
   actually are.

Already filled in with real info: founders (Apurva Girish, Surabhi
Sonawane — photos + bios), email (org.spaced@gmail.com), Instagram,
YouTube (@weSpaced), and LinkedIn.

All colors live in one place: the top of `css/style.css` under `:root`.
Change a hex value there and it updates across the whole site.

## Running it locally

No build tools needed. Either:
- Double-click `index.html` to open it directly in a browser, or
- For the most accurate preview (some browsers restrict local file access
  for scripts), run a tiny local server from inside the `wespaced` folder:
  ```
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000` in your browser.

## Deploying to wespaced.org

This is a static site, so it works with any static host. A few
straightforward options:
- **Netlify / Vercel**: drag-and-drop the `wespaced` folder in their
  dashboard, then point your domain's DNS at them.
- **GitHub Pages**: push this folder to a repo and enable Pages in the
  repo settings, then add a custom domain.
- Any traditional web host: upload the folder's contents via FTP to your
  hosting root, then connect wespaced.org's DNS to it.

## I'm happy to keep helping

Bring me back to this project any time you want to:
- Add real content (more events, more board members, blog previews)
- Add a proper multi-page blog if you outgrow linking out to Wix
- Adjust any animation, color, or section layout
- Help troubleshoot deployment
