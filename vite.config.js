import path from 'node:path'
import { defineConfig } from 'vite'
import { root, writingDir, writePostPages, writingSection } from './scripts/writing.mjs'

// each markdown file in writing/ becomes its own page, and the home page gets a
// "writing" section listing them. see scripts/writing.mjs.
function writing() {
  return {
    name: 'writing',
    config() {
      const posts = writePostPages()
      const input = { main: path.join(root, 'index.html') }
      for (const p of posts) input[`writing-${p.slug}`] = path.join(writingDir, p.slug, 'index.html')
      return { build: { rollupOptions: { input } } }
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('<!-- writing -->', writingSection()),
    },
    // editing a piece while the dev server runs regenerates its page
    configureServer(server) {
      server.watcher.add(path.join(writingDir, '*.md'))
      const refresh = (file) => {
        if (!file.endsWith('.md') || path.dirname(file) !== writingDir) return
        writePostPages()
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh).on('change', refresh).on('unlink', refresh)
    },
  }
}

// plain static site: index.html + a little vanilla js. no framework.
export default defineConfig({
  plugins: [writing()],
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
