import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Security-minded Vite defaults for a static marketing SPA.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    // Bind localhost only in dev (no LAN exposure by default).
    host: '127.0.0.1',
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  preview: {
    host: '127.0.0.1',
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  build: {
    // Avoid eval-based source maps in production artifacts.
    sourcemap: false,
    // Keep modulepreload but no crossorigin surprises.
    modulePreload: { polyfill: true },
  },
})
