import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [ react() ],
  root: 'src/renderer', // Define your renderer source folder
  build: {
    outDir: '../../dist/renderer',
    rollupOptions: {
      input: {
        main: resolve( __dirname, 'src/renderer/index.html' ),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve( __dirname, 'src/renderer' ),
    },
  },
})

