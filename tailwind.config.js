/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#060d18',
          800: '#0a1628',
          700: '#0d1e38',
        },
        cyan: {
          glow: '#00d4ff',
          dim: 'rgba(0,212,255,0.15)',
        },
        amber: {
          glow: '#ffaa00',
          dim: 'rgba(255,170,0,0.15)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0,212,255,0.3), inset 0 0 10px rgba(0,212,255,0.1)',
        'glow-cyan-hover': '0 0 40px rgba(0,212,255,0.6), inset 0 0 20px rgba(0,212,255,0.2)',
        'glow-amber': '0 0 20px rgba(255,170,0,0.3), inset 0 0 10px rgba(255,170,0,0.1)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'border-gradient-cyan': 'linear-gradient(to right, rgba(0,212,255,0.5), rgba(0,212,255,0.1))',
      }
    },
  },
  plugins: [],
}
