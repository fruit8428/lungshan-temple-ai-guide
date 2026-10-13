/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        temple: {
          red: '#C41E3A',
          darkred: '#8B0000',
          crimson: '#9B111E',
          gold: '#D4AF37',
          darkgold: '#AA820A',
          amber: '#FFBF00',
          stone: '#2C2727',
          charcoal: '#1A1818',
          cream: '#FFFDF9',
          parchment: '#F6F1E7',
          border: '#E8DFD0'
        }
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', '"Songti TC"', '"STSong"', 'serif'],
        sans: ['"PingFang TC"', '"Noto Sans TC"', 'system-ui', 'sans-serif']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 1.5s ease-out infinite'
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1.3)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
