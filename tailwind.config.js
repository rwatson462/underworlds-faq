/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  safelist: [
    'border-2',
    'border-sky-500',
  ],
  theme: {
    extend: {
    },
    font: {
      default: 'Noto Sans'
    }
  },
  plugins: [],
}
