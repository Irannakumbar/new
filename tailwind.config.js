/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        night: {
          950: '#060714',
          900: '#0b0f2a',
          850: '#11163e',
          800: '#181f52',
          700: '#26245e',
          600: '#3c2b75',
          500: '#58368d',
        },
      },
      fontFamily: {
        kannada: ['"Noto Sans Kannada"', '"Tiro Kannada"', 'sans-serif'],
        handwritten: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        heading: ['"Playfair Display"', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(244, 63, 94, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 35px rgba(244, 63, 94, 0.85))' },
        },
      },
    },
  },
  plugins: [],
}
