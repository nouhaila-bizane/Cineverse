/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E50914', // Rouge CineVerse
        dark: {
          100: '#1A1A1A',
          200: '#141414',
          300: '#0A0A0A',
        }
      },
    },
  },
  plugins: [],
}