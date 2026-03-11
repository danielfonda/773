# Vyrva Sound Engineer – Project Instructions

Recreation of the [Vyrva Sound Engineer HTML template](http://jellydemos.com/html/vyrva/html/index-sound-engineer.html).

---

## Project Structure

```
c:\dev\773\
├── index-sound-engineer.html   # Main HTML file (no inline CSS or JS)
├── package.json                # npm scripts for SCSS compilation
├── package-lock.json
├── node_modules/               # Installed via npm install
├── src/
│   ├── scss/
│   │   ├── main.scss           # Entry point — @use imports all partials
│   │   ├── _variables.scss     # All design tokens (colors, fonts, spacing)
│   │   ├── _index.scss         # @forward for variables (unused directly)
│   │   ├── _base.scss          # CSS reset and body defaults
│   │   ├── _layout.scss        # .container, .section, .btn, .section-title
│   │   ├── _navbar.scss        # Fixed navbar + mobile nav drawer
│   │   ├── _hero.scss          # Hero section + featured player card
│   │   ├── _stats.scss         # Stats counter bar
│   │   ├── _pricing.scss       # 3-column pricing cards
│   │   ├── _tracks.scss        # Track list rows
│   │   ├── _about.scss         # About section with skill bars
│   │   ├── _video.scss         # YouTube embed section
│   │   ├── _networks.scss      # Social links, waveform, availability widgets
│   │   ├── _newsletter.scss    # Email signup form
│   │   ├── _footer.scss        # Footer
│   │   └── _responsive.scss    # Media queries (always last)
│   └── js/
│       └── main.js             # All interactivity (no framework)
└── dist/
    └── css/
        └── main.css            # Compiled CSS output — do not edit directly
```

---

## npm Scripts

```bash
npm install          # Install sass (only needed once)
npm run build        # Production build — minified, no source map
npm run build:dev    # Development build — expanded/readable CSS
npm run watch        # Watch mode — recompiles on every SCSS save
```

Always run `npm run build:dev` (or `npm run watch`) after editing any `.scss` file. The HTML file references `dist/css/main.css`, which is the compiled output.

---

## SCSS Architecture

- **SCSS module system** (`@use`) — not the legacy `@import`.
- Every partial starts with `@use 'variables' as *;` to access all design tokens.
- `main.scss` imports partials in order: base → layout → components → responsive.
- `_responsive.scss` must remain the last `@use` in `main.scss`.

### Key design tokens (`_variables.scss`)

| Variable          | Value       | Usage                        |
|-------------------|-------------|------------------------------|
| `$accent`         | `#e8c84a`   | Gold accent (buttons, highlights) |
| `$bg-base`        | `#0d0d0d`   | Page background              |
| `$bg-overlay`     | `#111`      | Section alternating bg       |
| `$bg-card`        | `#141414`   | Cards, track rows            |
| `$text-primary`   | `#fff`      | Headings                     |
| `$font-heading`   | Oswald      | All h1–h5                    |
| `$font-body`      | Poppins     | Body text                    |
| `$bp-tablet`      | `900px`     | Main responsive breakpoint   |
| `$bp-mobile`      | `560px`     | Small screen breakpoint      |

---

## JavaScript (`src/js/main.js`)

Vanilla JS only, no framework. Sections:

- **Mobile nav** — toggle `.open` class on `#mobileNav`
- **Hero player** — mock play/pause with a 1-second interval ticker and progress bar scrubbing
- **Track list** — click a row to activate it (resets all others), animates mini progress bar
- **Counter animation** — `IntersectionObserver` on `.number[data-target]` elements in the stats bar
- **Waveform** — builds 48 bars dynamically in `#waveform`, animates height every 400ms
- **Newsletter form** — submit handler with temporary "Subscribed!" feedback
- **Smooth scroll** — intercepts all `a[href^="#"]` clicks

---

## HTML Sections (in order)

| Section           | ID / class         | Notes                                  |
|-------------------|--------------------|----------------------------------------|
| Navbar            | `.navbar`          | Fixed; collapses to `.nav-toggle`      |
| Mobile nav drawer | `#mobileNav`       | Full-screen overlay                    |
| Hero              | `#home`            | Grid: text + player card               |
| Stats bar         | `.stats-bar`       | Animated counters via `data-target`    |
| Pricing           | `#pricing`         | Basic $49 / Platinume $68 / Premium $90|
| Tracks            | `#tracks`          | 5 track rows                           |
| About             | `#about`           | Image + bio + skill bars               |
| Video             | `#video`           | YouTube embed (`-B7-Vcdlld8`)          |
| Networks          | `#contact`         | Social grid + waveform + availability  |
| Newsletter        | `.newsletter`      | Email form                             |
| Footer            | `footer`           | Logo + copyright + links               |

---

## External Dependencies (CDN — no local files)

```html
<!-- Google Fonts -->
https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Oswald:wght@400;500;600;700

<!-- Font Awesome 6.5 -->
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css
```

---

## Adding a New Section

1. Create `src/scss/_mysection.scss` with `@use 'variables' as *;` at the top.
2. Add `@use 'mysection';` in `src/scss/main.scss` before `@use 'responsive';`.
3. Add the HTML markup to `index-sound-engineer.html`.
4. Run `npm run build:dev` to compile.

## Editing Styles

- **Never edit `dist/css/main.css` directly** — it is overwritten on every build.
- Each component has its own partial. Find the relevant `_partial.scss` and edit there.
- Run `npm run watch` during development so changes compile automatically.
