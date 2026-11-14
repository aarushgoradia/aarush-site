# aarushgoradia.com

one page, white, serif. plain html + css + a little vanilla js, built with vite.
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
| link preview card / icons | `public/og.png`, `public/favicon.png`, `public/apple-touch-icon.png` |
| 404 page | `public/404.html` (self-contained) |

### swapping a top-4 film

1. on your letterboxd profile, right-click the poster → copy image address
2. save it to `public/posters/<name>.jpg`
3. update the matching `<a class="film">` in `index.html` (link, image, title, year · director)
