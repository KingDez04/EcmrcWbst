/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headingsFont: ["Itim", "cursive"],
        textFont: ["Istok Web", "sans-serif"],
      },
    },
  },
  plugins: [],
};
