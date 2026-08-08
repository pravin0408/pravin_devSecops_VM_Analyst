import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using a relative base ('./') means the built assets resolve correctly
// regardless of whether the repo is served from a user site or a
// project subpath (https://<user>.github.io/<repo>/) on GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
  },
})
