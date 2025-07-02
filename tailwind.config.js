/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-1': '#A4B465',
        'primary-2': '#626F47',
        'secondary-1': '#ECF2D3',
        'secondary-2': '#F5F5F5',
      }
    },
  },
  plugins: [],
}