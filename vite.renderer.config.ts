import path, { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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
      '@main': path.resolve( __dirname, 'src/main' ),
      '@renderer': path.resolve( __dirname, 'src/renderer' ),
    },
  },
})

