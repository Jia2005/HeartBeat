/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Pages/**/*.html", 
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff6b9d',
        'primary-dark': '#ff4785',
        'secondary': '#6bceff',
        'secondary-dark': '#47b5ff',
        'background': '#ffeaf2',
      },
      animation: {
        bounce: 'bounce 2s infinite',
        shake: 'shake 0.5s',
        float: 'float 3s ease-in-out infinite',
        floatReverse: 'floatReverse 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}