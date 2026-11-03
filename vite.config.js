import { defineConfig } from 'vite'

// plain static site: index.html + a little vanilla js. no framework.
export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
