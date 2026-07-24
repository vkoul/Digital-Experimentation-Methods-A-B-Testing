import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Digital-Experimentation-Methods-A-B-Testing/',
  build: {
    outDir: 'dist',
  },
})
