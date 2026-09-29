import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // relative asset paths so the build works under any GitHub Pages sub-path
  base: './',
  plugins: [react(), tailwindcss()],
})
