/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0C10",
        charcoal: "#14151A",
        gold: "#C9A227",
        cream: "#F4EFE6",
        bronze: "#8A6D3B",
        crimson: "#7A1F2B",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
