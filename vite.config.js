import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://anti-gravity-6vqkyo37v-shanmugapriyag-1497s-projects.vercel.app',
        changeOrigin: true,
      },
    },
  },
})
