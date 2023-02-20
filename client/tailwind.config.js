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
      'lexend': ['Lexend'],
    },
    extend: {
      colors: {
        'headerColor':'#f9f9f9',
        'dashboardBackgroundColor':'#f2f2f4',
        'tabHighlightColor':'#f2f2f4',
        'sidebarColor':'#f3f4f6',
        'newBlack': '#212427',
        'newGrey': '#F3F2F0',
      },
      height: {
        '128': '32rem',
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
}
