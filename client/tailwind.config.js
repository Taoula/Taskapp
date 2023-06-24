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
        darkPattern:
          "url('https://images.unsplash.com/photo-1684503830679-302965124d97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1001&q=80')",
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
