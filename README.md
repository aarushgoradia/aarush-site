# aarushgoradia.com

one page, dark, serif. plain html + css + a little vanilla js, built with vite.
the old react site lives on the `archive/v1-site` branch.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

both `dev` and `build` first run `scripts/fetch-letterboxd.mjs`, which grabs the latest diary entry
from letterboxd's rss feed for the "last watched" line. if letterboxd is down it just skips.

## deploying

push to `main`. the github action (`.github/workflows/deploy.yml`) builds and publishes `dist/` to the
`gh-pages` branch, which serves aarushgoradia.com. it also rebuilds once a day so "last watched" stays fresh.

## where things live

| thing | where |
| --- | --- |
| all page copy (now, work, research, films, misc) | `index.html` |
| currently reading | `index.html`, the `<dd id="reading">` line |
| letterboxd top 4 | `index.html` `.shelf` + poster images in `public/posters/` |
| clock, "last push", "last watched" | `src/live.js` |
| click-to-copy email, devtools hello | `src/ui.js` |
| email, links, repos hidden from "last push" | `src/site.js` |
| colors, fonts, layout | `src/style.css` (tokens at the top) |
| writing (each piece, and the list at `/writing/`) | `writing/*.md`, built by `scripts/writing.mjs` |
| top bar (clock, home / writing tabs) | `index.html` `.bar`, and `bar()` in `scripts/writing.mjs` |
| link preview card / icons | `public/og.png`, `public/favicon.png`, `public/apple-touch-icon.png` |
| 404 page | `public/404.html` (self-contained) |

### adding a piece of writing

1. add `writing/<short-name>.md`, starting with:

   ```
   ---
   title: The Title, with *italics* if needed
   date: 2026-11-14
   ---
   ```

2. write the piece underneath in markdown. a line starting with `>` sets a quote off on its own,
   `<mark>…</mark>` underlines a sentence, and plain html (figures, inline svg) passes straight through.
3. push. the piece gets its own page at `/writing/<short-name>/` and shows up on the writing page
   (`/writing/`), newest first. delete the file to take it down.

unfinished pieces can live in `drafts/`, which git ignores.

### swapping a top-4 film

1. on your letterboxd profile, right-click the poster → copy image address
2. save it to `public/posters/<name>.jpg`
3. update the matching `<a class="film">` in `index.html` (link, image, title, year · director)
