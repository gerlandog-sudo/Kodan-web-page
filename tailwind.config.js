/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kodan-mint': '#00FFC2',
        'kodan-carbon': '#2D3436',
        'kodan-pulse': '#635BFF',
        'kodan-success': '#26DE81',
        'kodan-warning': '#FFD300',
        'kodan-error': '#FC5C65',
        'surface': {
          'light': '#F7F1E3',
          'dark': '#161616',
          'card-light': '#FFFFFF',
          'card-dark': '#262626',
        }
      },
      fontFamily: {
        'sans': ['\"Liberation Sans\"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
