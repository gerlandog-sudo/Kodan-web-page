import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/tokens.css'
import './style.css'
import App from './App.vue'

import Tres from '@tresjs/core'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(Tres)
app.mount('#app')

// KODAN DELIGHT: Developer Console Greeting
console.log(
  "%c<KODAN/> %cSYSTEM INITIALIZED %c// High-Fidelity Artifacts Only",
  "color: #00FFC2; font-weight: bold; font-size: 14px; font-family: monospace;",
  "color: #FFF; font-size: 12px; font-family: monospace;",
  "color: #666; font-size: 10px; font-family: monospace;"
);
console.log(
  "%cJoin the search for technical excellence: https://kodan.software",
  "color: #666; font-size: 10px; font-family: monospace;"
);
