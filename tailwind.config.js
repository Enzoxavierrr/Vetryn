import theme from "./src/styles/theme.js";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: theme.colors,
    },
  },
  plugins: [],
};