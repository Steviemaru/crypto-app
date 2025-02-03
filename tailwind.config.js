/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "currency-bg-light": "#424286",
        shark: "#1f222a",
        "shark-light": "#1f1d22",
        "Coral-Red": "#f18981",
        "Royal-Purple": "#9c27b0",
        "Aqua-Blue": "#84ffff",
      },
      backgroundImage: {
        "custom-gradient-dark":
          " linear-gradient(to right,rgb(128, 35, 73),rgba(56, 35, 116, 1),rgba(60, 104, 134, 1));",
        "custom-fade-dark":
          "linear-gradient(to bottom, transparent 0%, black 100%);",
      },
    },
  },
  plugins: [],
};
