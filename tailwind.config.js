/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A090B',
        board: '#121013',
        'board-2': '#1A171B',
        trace: '#2E2532',
        line: '#3A3238',
        plum: '#7E397E',
        'plum-dk': '#4E2350',
        signal: '#C77DC7',
        spark: '#F3E8F3',
        bone: '#E2E0DC',
        ash: '#888480',
        ink: '#1A1917',
        paper: '#F8F8F7',
      },
      fontFamily: {
        display: ['Lora', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
