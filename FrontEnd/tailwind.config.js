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
      }
    },
  },
  plugins: [],
}

