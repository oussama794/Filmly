/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1a202c",
        primary: "#f6ad55",
        secondary: "#2ECC71",
        textPrimary: "#E2E8F0",
        textSecondary: "#A0AEC0",
        card: "#2D3748",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 25px -10px rgba(0,0,0,0.4)",
      }
    },
  },
  plugins: [],
}


