/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    fontFamily: {
      'lora': ['Lora'],
      'hind': ['Hind Madurai'],
      'montserrat': ['Montserrat'],
    },
    extend: {
      colors: {
        'tabHoverColor':'#3c414d',
        'navbarBackgroundColor':'#121927',
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
}
