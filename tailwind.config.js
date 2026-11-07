/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        tone: 'rgb(var(--c-tone) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        accent1: '#89AACC',
        accent2: '#4E85BF',
        orange1: '#F0974C',
        orange2: '#D9692A',
      },
      fontFamily: {
        display: ['"General Sans"', '"Inter"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
        'orange-gradient': 'linear-gradient(90deg, #F0974C 0%, #D9692A 100%)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
