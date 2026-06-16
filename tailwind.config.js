/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        divineGold: '#FFD600',
        softCream: '#FEFFC5',
        sacredMaroon: '#5D1A00',
        templeBrown: '#3B0F00',
        vermillion: '#CC0000',
        warmAmber: '#FF8C00',
      },
      fontFamily: {
        devanagari: ['"Tiro Devanagari Hindi"', 'serif'],
        latinDisplay: ['"Playfair Display"', 'serif'],
        sans: ['"Poppins"', 'sans-serif'],
        accent: ['"Cinzel"', 'serif'],
      },
      borderRadius: {
        'divine-sm': '16px',
        'divine-md': '24px',
        'divine-lg': '32px',
      },
    },
  },
  plugins: [],
}
