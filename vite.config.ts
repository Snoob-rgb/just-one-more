import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://snoob-rgb.github.io/just-one-more/
export default defineConfig({
  base: '/just-one-more/',
  plugins: [react()],
})
