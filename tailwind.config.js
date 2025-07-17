/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-1': '#A4B465',
        'primary-2': '#626F47',
        'primary-3': '#AEC8A4',
        'secondary-1': '#ECF2D3',
        'secondary-2': '#F5F5F5',
        'secondary-3': '#F0F0F0',
      }
    },
  },
  plugins: [],
}