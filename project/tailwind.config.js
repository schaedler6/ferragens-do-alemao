/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD700', // Yellow
          dark: '#E6C200',
        },
        secondary: {
          DEFAULT: '#1E40AF', // Blue
          dark: '#1E3A8A',
        },
        accent: {
          DEFAULT: '#111827', // Almost black
          light: '#1F2937',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};