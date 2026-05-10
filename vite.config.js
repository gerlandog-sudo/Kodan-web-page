import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import kodanEnginePlugin from './vite-plugin-kodan.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('Tres') && tag !== 'TresCanvas'
        }
      }
    }),
    kodanEnginePlugin({ contentPath: './src/data/content.json' })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
