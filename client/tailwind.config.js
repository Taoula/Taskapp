/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      'lora': ['Lora'],
      'hind': ['Hind Madurai'],
      'montserrat': ['Montserrat'],
    },
    extend: {
      colors: {
        'tabHoverColor':'#161d31',
        'navbarBackgroundColor':'#283046',
        'sidebarIconColor':'#b3b7bd',
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
}
