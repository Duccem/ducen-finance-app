/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['.src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3a72ff",
          secondary: "#00ddb1",
          third: "#8167EC"
        },
        background: {
          primary: "#ece9ea",
          secondary: "#f6f8fc",
          third: "#ffffff",
        },
        foreground: {
          primary: "#21212f",
          secondary: "#22242e",
          third: "#7d7d7d",
        },
        complementary: {
          danger: "#f17979",
          success: "#22A094",
        }
      },
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        NunitoLight: ["NunitoLight", "sans-serif"],
        NunitoMedium: ["NunitoMedium", "sans-serif"],
        NunitoBold: ["NunitoBold", "sans-serif"],
        NunitoSemiBold: ["NunitoSemiBold", "sans-serif"],
        NunitoExtraBold: ["NunitoExtraBold", "sans-serif"],
      }
    },
  },
  plugins: [],
}

