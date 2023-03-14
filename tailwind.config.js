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
      colors: {
        light: {
          primary: "#FFF6F0",
          secondary: "#262523",
          tertiary: "#c4c4c4",
          text: "#FFFFFF",
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
