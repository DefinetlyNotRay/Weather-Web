/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html}"],
  theme: {
    colors: {
      "blue-light": "#ACB1D6",
      blue: "#8294C4",
      white: "#DBDFEA",
    },
    boxShadow: {
      L: "2px 2px 7px 0px #ACB1D6",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
