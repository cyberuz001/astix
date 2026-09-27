/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        astix: {
          bg: '#F6F4EF',
          bgSoft: '#F2F0EB',
          bgLight: '#FAF9F6',
          card: '#ECEAE5',
          cardAlt: '#F0EEE9',
          dark: '#111111',
          darkSecondary: '#202020',
          crimson: '#B51222',
          crimsonDark: '#76101A',
          wine: '#3B1116',
          gray: '#D6D4D0',
          grayLight: '#E8E6E1',
          grayMuted: '#94928E'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        audiowide: ['"Audiowide"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.2em',
        mega: '0.3em',
      },
      lineHeight: {
        tighter: '0.88',
        tight: '0.95',
      }
    },
  },
  plugins: [],
}
