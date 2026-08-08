/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#05080c',
          panel: '#0a121c',
          raised: '#0e1a28',
          line: '#16293a',
        },
        signal: {
          cyan: '#2fe0ff',
          green: '#39ff9d',
          amber: '#ffb020',
          red: '#ff3b5c',
          dim: '#5c7c8c',
        },
      },
      fontFamily: {
        display: ['"Rajdhani"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(47,224,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(47,224,255,0.06) 1px, transparent 1px)',
        scan: 'repeating-linear-gradient(0deg, rgba(47,224,255,0.035) 0px, rgba(47,224,255,0.035) 1px, transparent 1px, transparent 3px)',
      },
      boxShadow: {
        glowcyan: '0 0 20px rgba(47,224,255,0.35), 0 0 2px rgba(47,224,255,0.8)',
        glowgreen: '0 0 20px rgba(57,255,157,0.3), 0 0 2px rgba(57,255,157,0.8)',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.2 } },
        scanline: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        flicker: { '0%,100%': { opacity: 1 }, '92%': { opacity: 1 }, '93%': { opacity: 0.6 }, '94%': { opacity: 1 } },
      },
      animation: {
        blink: 'blink 1.4s step-start infinite',
        scanline: 'scanline 6s linear infinite',
        flicker: 'flicker 5s infinite',
      },
    },
  },
  plugins: [],
}
