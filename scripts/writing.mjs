// turns writing/<slug>.md into a page at /writing/<slug>/ and builds the list
// of pieces at /writing/. used by vite.config.js in dev and build.
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

// first sentence or two of the piece, for the list, link previews and search results
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

// everything in <head>, shared by the list page and each piece
function head({ title, description, url, type }) {
  return `    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${esc(title)} · ${AUTHOR}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="${AUTHOR}" />
    <meta name="theme-color" content="#131413" />
    <meta name="color-scheme" content="dark" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="/favicon.png" type="image/png" sizes="96x96" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${AUTHOR}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${SITE}/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${SITE}/og.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap" />
    <script type="module" src="/src/post.js"></script>`
}

// the top bar, same as the one in index.html. `current` is "page" on the list
// itself and "true" on a piece, which sits inside the writing section.
function bar(current) {
  return `      <div class="bar">
        <span id="clock">princeton, nj</span>
        <nav aria-label="pages">
          <a href="/">home</a>
          <a href="/writing/" aria-current="${current}">writing</a>
        </nav>
      </div>`
}

function postPage(post) {
  return `<!doctype html>
<html lang="en">
  <head>
${head({ title: post.titlePlain, description: post.description, url: `${SITE}/writing/${post.slug}/`, type: 'article' })}
  </head>
  <body>
    <div class="wrap post">
${bar('true')}

      <article>
        <header>
          <h1>${post.titleHtml}</h1>
          <p class="post-meta"><time datetime="${esc(post.date)}">${esc(prettyDate(post.date))}</time></p>
        </header>
        <div class="prose">
${marked.parse(post.body)}        </div>
      </article>

      <footer>
        <span><a href="/writing/">← all writing</a></span>
        <span>${AUTHOR}</span>
      </footer>
    </div>
  </body>
</html>
`
}

function listPage(posts) {
  const items = posts.length
    ? posts.map((p) => `          <div class="item">
            <div class="row"><h3><a class="piece" href="/writing/${p.slug}/">${p.titleHtml}</a></h3><span class="when"><time datetime="${esc(p.date)}">${esc(prettyDate(p.date))}</time></span></div>
            <p>${esc(p.description)}</p>
          </div>`).join('\n')
    : '          <p class="post-meta">nothing here yet.</p>'
  return `<!doctype html>
<html lang="en">
  <head>
${head({ title: 'Writing', description: `Writing by ${AUTHOR}.`, url: `${SITE}/writing/`, type: 'website' })}
  </head>
  <body>
    <div class="wrap post">
${bar('page')}

      <main>
        <h1>Writing</h1>
        <div class="items listing">
${items}
        </div>
      </main>

      <footer>
        <span><a href="/">← ${AUTHOR}</a></span>
        <span></span>
      </footer>
    </div>
  </body>
</html>
`
}

// writes writing/index.html and writing/<slug>/index.html for every piece, and
// clears out pages whose markdown file is gone. returns the posts so the caller
// can register the pages with vite.
export function writePages() {
  const posts = loadPosts()
  mkdirSync(writingDir, { recursive: true })
  const keep = new Set(posts.map((p) => p.slug))
  for (const name of readdirSync(writingDir)) {
    const full = path.join(writingDir, name)
    if (statSync(full).isDirectory() && !keep.has(name)) rmSync(full, { recursive: true, force: true })
  }
  for (const post of posts) {
    const dir = path.join(writingDir, post.slug)
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'index.html'), postPage(post))
  }
  writeFileSync(path.join(writingDir, 'index.html'), listPage(posts))
  return posts
}
