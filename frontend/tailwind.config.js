/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#57d9c3',
          light: '#1ffafa',
        },
        dark: {
          DEFAULT: '#0F0F0F',
          card: '#1B1B1B',
        },
        accent: {
          DEFAULT: '#ffffff',
          soft: '#E5F5E0', // Soft Lime
          cyan: '#00F0FF', // Cyan AI Glow
        }
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(126, 217, 87, 0.5)',
        'glow-cyan': '0 0 15px rgba(0, 240, 255, 0.5)',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 15px rgba(126, 217, 87, 0.5)' },
          '50%': { opacity: .5, boxShadow: '0 0 5px rgba(126, 217, 87, 0.2)' },
        }
      }
    },
  },
  plugins: [],
}
