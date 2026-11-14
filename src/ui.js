import { site } from './site.js'

let toastTimer

export function toast(html, ms = 2600) {
  const el = document.getElementById('toast')
  if (!el) return
  el.innerHTML = html
  el.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => el.classList.remove('show'), ms)
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // older browsers / insecure contexts
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.append(ta)
    ta.select()
    let ok = false
    try { ok = document.execCommand('copy') } catch { ok = false }
    ta.remove()
    return ok
  }
}

export async function copyEmail() {
  const ok = await copyText(site.email)
  toast(ok
    ? `copied ${site.email}<a href="mailto:${site.email}" target="_self">open mail →</a>`
    : `${site.email}<a href="mailto:${site.email}" target="_self">open mail →</a>`)
  return ok
}

export function initUi() {
  // the email link copies instead of yanking people into a mail app
  document.querySelectorAll('[data-copy-email]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return
      e.preventDefault()
      copyEmail()
    })
  })

  // footer date comes from the build
  const updated = document.getElementById('updated')
  if (updated && typeof __BUILD_DATE__ !== 'undefined') {
    const d = new Date(__BUILD_DATE__)
    const fmt = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: site.timezone })
    updated.textContent = `updated ${fmt.toLowerCase()}`
  }

  helloDevtools()
}

function helloDevtools() {
  const a = 'color:#2e8b62;font:italic 600 15px/1.6 Georgia,serif'
  const b = 'font:400 12px/1.6 system-ui,sans-serif'
  console.log(
    `%chey, you opened devtools. respect.%c\nsource: ${site.links.source}\nsay hi: ${site.email}`,
    a, b,
  )
}
