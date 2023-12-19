/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "#2c2c2e",
          2: "#7f5af0",
          3: "#50ff9d",
          4: "#474749",
        },
        background: {
          1: "#f5f5f7",
          2: "#eaeaea",
        },
        dark: {
          accent: {
            1: "#fffffe",
            2: "#7f5af0",
            3: "#2cb67d",
            4: "#B6B6B6",
          },
          background: {
            1: "#16161a",
            2: "#242629",
          },
        },
      },
      fontFamily: {
        sans: ["'Poppins', sans-serif"],
      },
      width: {
        384: "96rem",
      },
    },
  },

  plugins: [],
};
