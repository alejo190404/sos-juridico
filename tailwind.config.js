/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'sos-purple': '#7E397E',
        'purple-light': '#A855A8',
        'purple-dim': '#f3e8f3',
        'grey-0': '#f8f8f7',
        'grey-1': '#f0efed',
        'grey-2': '#e2e0dc',
        'grey-3': '#bdbab4',
        'grey-4': '#888480',
        'grey-5': '#3a3835',
        'deep-gray': '#888480',
        'light-gray': '#f0efed',
        'site-black': '#1a1917',
        'site-white': '#fefefe',
      },
      fontFamily: {
        sans: ['"Lora"', 'serif'],
        jakarta: ['"Lora"', 'serif'],
        montserrat: ['"Lora"', 'serif'],
      },
    },
  },
  plugins: [],
}
