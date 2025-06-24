/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'navy': '#0A2342',
        'navy-dark': '#061829',
        'sustainability': '#00A0DC',
        'tech-silver': '#F8F9FA',
        'dark': {
          'bg': '#0A2342',
          'surface': '#1E2A3A',
          'card': '#2A3B4F',
          'text': '#FFFFFF',
          'text-secondary': '#E2E8F0',
          'border': '#334155',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      perspective: {
        '500': '500px',
        '1000': '1000px',
        '1500': '1500px',
        '2000': '2000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
        'flat': 'flat',
      },
      transform: {
        'gpu': 'translate3d(0,0,0)',
      },
    },
  },
  plugins: [],
} 