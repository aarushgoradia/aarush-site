// pulls the most recent diary entry from letterboxd's rss feed and writes
// public/letterboxd.json (+ a small poster) for the "last watched" line.
// runs before every dev/build. if letterboxd is down, the site just shows
// the fallback text, so this never fails the build.
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const USER = 'aarushgoradia'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outJson = path.join(root, 'public', 'letterboxd.json')
const outDir = path.join(root, 'public', 'letterboxd')
const UA = 'Mozilla/5.0 (aarushgoradia.com build; +https://aarushgoradia.com)'

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))
  return m ? decode(m[1].trim()) : null
}
const decode = (s) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")

async function main() {
  const res = await fetch(`https://letterboxd.com/${USER}/rss/`, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`rss ${res.status}`)
  const xml = await res.text()

  // lists show up in the feed too; only diary entries have a film title
  const item = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map((m) => m[1])
    .find((x) => x.includes('<letterboxd:filmTitle>'))
  if (!item) throw new Error('no diary entries in feed')

  const rating = Number(tag(item, 'letterboxd:memberRating')) || null
  const film = {
    title: tag(item, 'letterboxd:filmTitle'),
    year: tag(item, 'letterboxd:filmYear'),
    rating,
    liked: tag(item, 'letterboxd:memberLike') === 'Yes',
    rewatch: tag(item, 'letterboxd:rewatch') === 'Yes',
    watched: tag(item, 'letterboxd:watchedDate'),
    link: tag(item, 'link'),
    poster: null,
    fetched: new Date().toISOString(),
  }

  const src = (tag(item, 'description') || '').match(/<img src="([^"]+)"/)?.[1]
  if (src) {
    try {
      const small = src.replace(/-0-\d+-0-\d+-crop/, '-0-150-0-225-crop')
      let img = await fetch(small, { headers: { 'User-Agent': UA, Referer: 'https://letterboxd.com/' } })
      if (!img.ok) img = await fetch(src, { headers: { 'User-Agent': UA, Referer: 'https://letterboxd.com/' } })
      if (img.ok) {
        await mkdir(outDir, { recursive: true })
        await writeFile(path.join(outDir, 'last-watched.jpg'), Buffer.from(await img.arrayBuffer()))
        film.poster = `/letterboxd/last-watched.jpg?v=${Date.now().toString(36)}`
      }
    } catch { /* poster is optional */ }
  }

  await writeFile(outJson, `${JSON.stringify(film, null, 2)}\n`)
  console.log(`letterboxd: last watched ${film.title} (${film.year})`)
}

main().catch((err) => {
  console.warn(`letterboxd: skipped (${err.message})`)
})
