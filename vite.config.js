import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import kodanEnginePlugin from './vite-plugin-kodan.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    kodanEnginePlugin({ contentPath: './src/data/content.json' })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
