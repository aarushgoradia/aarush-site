// turns writing/<slug>.md into a page at /writing/<slug>/ and builds the
// "writing" list for the home page. used by vite.config.js in dev and build.
//
// each piece is one markdown file with a small header:
//
//   ---
//   title: The Title, with *italics* if needed
//   date: 2026-11-14
//   ---
//
// plain html (figures, inline svg, <mark>) passes straight through.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { marked } from 'marked'

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const writingDir = path.join(root, 'writing')

const SITE = 'https://aarushgoradia.com'
const AUTHOR = 'Aarush Goradia'

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const plain = (s) => s.replace(/[*_`]/g, '')

function prettyDate(iso) {
  const d = new Date(`${iso}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).toLowerCase()
}

// first sentence or two of the piece, for link previews and search results
function summary(md) {
  const para = md.split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !/^[#>|<-]/.test(p)) || ''
  const text = plain(para.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ')
  if (text.length <= 170) return text
  const cut = text.slice(0, 170)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

export function loadPosts() {
  if (!existsSync(writingDir)) return []
  return readdirSync(writingDir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(path.join(writingDir, file), 'utf8')
      const head = raw.match(/^---\n([\s\S]*?)\n---\n?/)
      const meta = {}
      if (head) {
        for (const line of head[1].split('\n')) {
          const i = line.indexOf(':')
          if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
        }
      }
      const body = (head ? raw.slice(head[0].length) : raw).trim()
      const slug = file.replace(/\.md$/, '')
      const title = meta.title || slug
      return {
        slug,
        title,
        titleHtml: marked.parseInline(title),
        titlePlain: plain(title),
        date: meta.date || '',
        description: meta.description || summary(body),
        body,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

function page(post) {
  const url = `${SITE}/writing/${post.slug}/`
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${esc(post.titlePlain)} · ${AUTHOR}</title>
    <meta name="description" content="${esc(post.description)}" />
    <meta name="author" content="${AUTHOR}" />
    <meta name="theme-color" content="#131413" />
    <meta name="color-scheme" content="dark" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="/favicon.png" type="image/png" sizes="96x96" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${AUTHOR}" />
    <meta property="og:title" content="${esc(post.titlePlain)}" />
    <meta property="og:description" content="${esc(post.description)}" />
    <meta property="og:image" content="${SITE}/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(post.titlePlain)}" />
    <meta name="twitter:description" content="${esc(post.description)}" />
    <meta name="twitter:image" content="${SITE}/og.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap" />
    <script type="module" src="/src/post.js"></script>
  </head>
  <body>
    <div class="wrap post">
      <nav class="post-top" aria-label="site"><a href="/">← ${AUTHOR}</a></nav>
      <article>
        <header>
          <h1>${post.titleHtml}</h1>
          <p class="post-meta"><time datetime="${esc(post.date)}">${esc(prettyDate(post.date))}</time></p>
        </header>
        <div class="prose">
${marked.parse(post.body)}        </div>
      </article>
      <footer>
        <span><a href="/">← back to the front page</a></span>
        <span>${AUTHOR}</span>
      </footer>
    </div>
  </body>
</html>
`
}

// writes writing/<slug>/index.html for every piece and clears out pages whose
// markdown file is gone. returns the posts so the caller can register them.
export function writePostPages() {
  const posts = loadPosts()
  if (existsSync(writingDir)) {
    const keep = new Set(posts.map((p) => p.slug))
    for (const name of readdirSync(writingDir)) {
      const full = path.join(writingDir, name)
      if (statSync(full).isDirectory() && !keep.has(name)) rmSync(full, { recursive: true, force: true })
    }
  }
  for (const post of posts) {
    const dir = path.join(writingDir, post.slug)
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'index.html'), page(post))
  }
  return posts
}

// the home page's "writing" section. empty string when there is nothing to list,
// so the section only exists once there is something in it.
export function writingSection(posts = loadPosts()) {
  if (!posts.length) return ''
  const items = posts.map((p) => `            <div class="item">
              <div class="row"><h3><a class="piece" href="/writing/${p.slug}/" target="_self">${p.titleHtml}</a></h3><span class="when">${esc(prettyDate(p.date))}</span></div>
            </div>`).join('\n')
  return `<section id="writing" aria-labelledby="writing-h">
          <h2 id="writing-h">writing</h2>
          <div class="items">
${items}
          </div>
        </section>`
}
