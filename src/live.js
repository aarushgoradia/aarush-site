import { site } from './site.js'
import { h } from './dom.js'

export function initLive() {
  startClock()
  showLastPush()
  showLastWatched()
}

export function princetonTime(opts) {
  return new Intl.DateTimeFormat('en-US', { timeZone: site.timezone, ...opts }).format(new Date()).toLowerCase()
}

function startClock() {
  const el = document.getElementById('clock')
  if (!el) return
  const tick = () => {
    el.textContent = `${site.place} · ${princetonTime({ hour: 'numeric', minute: '2-digit' })}`
  }
  tick()
  setInterval(tick, 15_000)
}

export function ago(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  if (s < 60) return 'just now'
  const m = s / 60
  if (m < 60) return `${Math.floor(m)}m ago`
  const hr = m / 60
  if (hr < 24) return `${Math.floor(hr)}h ago`
  const d = hr / 24
  if (d < 30) return `${Math.floor(d)}d ago`
  if (d < 365) return `${Math.floor(d / 30)}mo ago`
  return `${Math.floor(d / 365)}y ago`
}

async function showLastPush() {
  const el = document.getElementById('last-push')
  if (!el) return
  const key = 'last-push:v1'
  let repo = null
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) || 'null')
    if (cached && Date.now() - cached.at < 10 * 60_000) repo = cached.repo
  } catch { /* storage blocked, just fetch */ }

  if (!repo) {
    try {
      const res = await fetch(`https://api.github.com/users/${site.github.user}/repos?sort=pushed&per_page=10`, {
        headers: { Accept: 'application/vnd.github+json' },
      })
      if (!res.ok) return
      const list = await res.json()
      const hit = list.find((r) => !site.github.ignore.includes(r.name))
      if (!hit) return
      repo = { name: hit.name, url: hit.html_url, pushed: hit.pushed_at }
      try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), repo })) } catch { /* fine */ }
    } catch {
      return
    }
  }

  el.replaceChildren(
    ' · last push: ',
    h('a', { href: repo.url }, repo.name),
    `, ${ago(repo.pushed)}`,
  )
  el.hidden = false
}

export function stars(rating) {
  if (!rating) return ''
  return '★'.repeat(Math.floor(rating)) + (rating % 1 ? '½' : '')
}

async function showLastWatched() {
  const el = document.getElementById('last-watched')
  if (!el) return
  let film
  try {
    const res = await fetch('/letterboxd.json', { cache: 'no-cache' })
    if (!res.ok) return
    film = await res.json()
  } catch {
    return
  }
  if (!film?.title) return

  const rating = stars(film.rating)
  // replaceChildren would print a bare null as the text "null", so drop the empties
  el.replaceChildren(...[
    'last watched: ',
    h('a', { href: film.link }, film.title),
    film.year ? ` (${film.year}) ` : ' ',
    rating ? h('span', { class: 'stars', 'aria-label': `${film.rating} stars` }, rating) : null,
    film.liked ? h('span', { class: 'stars', 'aria-label': 'liked' }, ' ♥') : null,
  ].filter(Boolean))
}
