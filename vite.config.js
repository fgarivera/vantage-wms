import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The local working copy is reached through a junction (the real path
  // contains a "#", which Vite cannot resolve). Don't resolve symlinks
  // back to the real path. Harmless on Vercel.
  resolve: {
    preserveSymlinks: true,
  },
})
