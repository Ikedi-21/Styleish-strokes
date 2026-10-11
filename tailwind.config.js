/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink-black': '#000000',
        'pure-white': '#FFFFFF',
        'charcoal': '#1A1A1A',
        'paper': '#FBFBFA',
        'off-white': '#F5F5F0',
        'warm-gray': '#8A8A8A',
        'light-gray': '#E5E5E0',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'Impact', 'sans-serif'],
        'body': ['"Inter"', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'serif': ['"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.3em',
        'mega-wide': '0.5em',
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 10vw, 10rem)', { lineHeight: '0.9' }],
        'display-lg': ['clamp(2.5rem, 8vw, 7rem)', { lineHeight: '0.95' }],
        'display-md': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1' }],
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
