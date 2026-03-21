/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        savage: {
          bg: "#0b0f1a",        // fondo oscuro
          panel: "#121826",     // panel
          accent: "#c9a227",    // dorado
          accentSoft: "#e6c35c",
          text: "#e5e7eb",
          muted: "#9ca3af",
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};