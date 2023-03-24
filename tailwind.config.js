/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sunflower: ["Sunflower"],
        maglony: ["Maglony"],
        george: ["George"],
      },
      colors: {
        light: {
          primary: "#c1c1c1",
          // primary: "#304532",
          // primary: "#EBD4C8",
          secondary: "#ffffff",
          tertiary: "#262523",
          text: "#92620B",
          accent: "#4444a0",
        },
        dark: {
          // primary: "#262523",
          primary: "#000000",
          secondary: "#FFF7F0",
          tertiary: "#BF9B30",
          text: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
