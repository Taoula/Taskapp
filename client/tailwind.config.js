/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        headerColor: "#f9f9f9",
        dashboardBackgroundColor: "#f2f2f4",
        sidebarColor: "#f9f9f9",
        tabHighlightColor: "#e7e9eb",
        newBlack: "#212427",
        newGrey: "#F3F2F0",
        landingBackground: "#f9fafb",
        heroBackgroundColor: "#f0f0f0",
        green1: "#d9fb51",
        green2: "#c3e249",
      },
      height: {
        128: "32rem",
      },
      backgroundImage: {
        darkGrid1:
          "url('https://resources.github.com/assets/images/dark-pixel-grid.svg')",
        lightGrid1:
          "url('https://resources.github.com/assets/images/light-pixel-grid.svg')",
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
