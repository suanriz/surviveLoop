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
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/database'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-tooltip',
            'lucide-react',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
  },
})
