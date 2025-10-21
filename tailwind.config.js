/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "sans-serif"],
        arabic: ["AmiriQuran", "serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out",
      },
      keyframes: {
              fadeIn: {
                "0%": { opacity: "0", transform: "translateY(-10px)" },
                "100%": { opacity: "1", transform: "translateY(0)" },
              },
            },
      colors: {
        app: {
          primary: "#2F8DB5",
          secondary: "#1a5a77",
          light: "#f5f7fa",
          dark: "#121212",
          surface: "#ffffff",
          "surface-dark": "#1e1e1e",
        },
      },
    },
  },
  plugins: [],
};
