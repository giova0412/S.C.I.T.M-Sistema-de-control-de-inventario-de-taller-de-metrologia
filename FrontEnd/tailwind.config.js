/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'custom-pink': '#F5E9E9',
        'custom-beige': '#EEE0D3',
        'custom-olive': '#99A888',
        'custom-brown': '#D4A373',
        'pemex-green': '#006341',
        'pemex-red': '#ec1c24',
        'pemex-gray': '#f5f5f5',
        'pemex-dark-gray': '#4a4a4a',
        'pemex-black': '#1a1a1a',
        'pemex-white': '#ffffff',
      }
    },
  },
  plugins: [],
}

