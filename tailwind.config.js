module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#041C32",
        b1: "#04293A",
        b2: "#064663",
        primary: "#ECB365",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
