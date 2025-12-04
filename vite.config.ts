import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from
  '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// eslint-disable-next-line no-undef
const isDev = process.argv.includes('dev') || process.env.NODE_ENV === 'development'

// https://vite.dev/config/
export default defineConfig({
  base: isDev ? '/' : '/surviveLoop',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
