# Portfolio — Sylvester Kiranga Nganga

Hand-built static site. No framework, no build step, no theme. Plain HTML, CSS, and vanilla JS, so it deploys as-is and stays trivial to move between hosts.

## Structure

```
index.html              Page structure and copy
assets/css/style.css    All styling (design tokens at the top of the file)
assets/js/data.js       Content: skills, projects, timeline — edit this to update the site
assets/js/main.js       Rendering logic (radar chart, cards, counters, nav) — rarely needs touching
.nojekyll                Tells GitHub Pages to skip Jekyll processing
```

## Deploying to GitHub Pages (replacing the current site)

This repo already serves `sylvester254.github.io`, so any push to the default branch goes live automatically once Pages is pointed at the right source.

1. Replace the contents of the `sylvester254.github.io` repo with these files (keep the repo name exactly `sylvester254.github.io` — that's what makes it the user-site URL).
2. Commit and push to the default branch (`main`).
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)`**.
4. Wait a minute or two for the Pages build to run, then check `https://sylvester254.github.io/`.

No build step, no Actions workflow required — GitHub Pages just serves the static files directly.

## Editing content

You shouldn't need to touch `index.html` or `main.js` for routine updates.

- **Add or edit a project** → open `assets/js/data.js`, edit the `PROJECTS` array. Each entry has `name`, `scale` (a short stat shown collapsed), `summary` (shown collapsed), `tags`, `detail` (an array of bullet strings shown when expanded), and `viz` (which animated glyph the card shows; glyphs are defined in the `VIZ` map in `main.js`).
- **Add a smaller build** → edit `MORE_BUILDS` in the same file.
- **Update experience** → edit `TIMELINE`.
- **Adjust skill ratings** → edit `SKILLS` (values are out of 5). It is a two-level tree: top-level categories drive the default radar chart, and each category's `children` are the sub-skills shown when a visitor zooms in. `short` is the compact chart label, `label` the full table name, `blurb` the one-liner shown while zoomed in. Ratings are self-assessed and relative to each other; sanity-check them before publishing.
- **Edit the hero terminal** → the typed lines live as static HTML inside `#term-body` in `index.html` (they double as the no-JS and reduced-motion fallback; `main.js` just animates them).
- **Change colors, type, or spacing** → all design tokens are CSS custom properties at the top of `assets/css/style.css` under `:root`. Changing `--accent` (rosewood red) or `--accent-2` (steel blue) re-colors the whole site, including every SVG glyph.

## Self-hosting later

Since there's no build step, this is just static files — copy the folder to any web server's document root (Nginx, Apache, S3 + CloudFront, etc.) and it works. The only GitHub-Pages-specific file is `.nojekyll`, which is harmless anywhere else.

## Accessibility notes

- Skip link, semantic landmarks (`header`, `main`, `nav`, `footer`), and a logical heading order throughout.
- Project cards use native `<details>/<summary>` — keyboard-operable without any custom JS. The per-card SVG glyphs are `aria-hidden` decoration.
- The radar chart has an accessible name/description and is backed by a real `<table>` with the same data, so the information isn't locked behind a visual-only chart. Drill-down works by keyboard (chart labels are focusable buttons) and from the table.
- All motion (the hero terminal typing, glyph animations, stat count-up) is disabled under `prefers-reduced-motion: reduce`; the terminal falls back to its full static transcript.
- Focus outlines are never suppressed.
- Color contrast was chosen against the WCAG AA threshold for the graphite background — if you change `--accent` or `--text-muted`, re-check contrast against `--bg` and `--bg-elevated`.

## NDA note

`Diagnosia` (the facial-analysis platform project) is deliberately listed without its product/client name — see the write-up in `data.js`. Confirm with the client whether the name itself is safe to disclose before adding it back; everything currently in the copy is architecture-level only.
