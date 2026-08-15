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
        devanagari: ['"Noto Serif Devanagari"', '"Tiro Devanagari Hindi"', '"Mukta"', 'serif'],
        hindi: ['"Mukta"', '"Noto Sans Devanagari"', 'sans-serif'],
        gujarati: ['"Noto Serif Gujarati"', 'serif'],
        gujaratiSans: ['"Noto Sans Gujarati"', 'sans-serif'],
        serif: ['"Lora"', '"Noto Serif Devanagari"', '"Noto Serif Gujarati"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Noto Sans Devanagari"', '"Noto Sans Gujarati"', '-apple-system', 'sans-serif'],
        accent: ['"Inter"', 'sans-serif'],
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
