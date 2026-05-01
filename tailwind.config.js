/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kodan-carbon': '#2D3436',
        'kodan-mint': '#00FFC2',
      },
      fontFamily: {
        sans: ['Unbounded', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
