/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        epanen: {
          primary: '#2D5A27',
          secondary: '#52A446',
          accent: '#A8D5A2',
          light: '#E8F5E9'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
