import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red:    '#E53E3E',
          indigo: '#4C51BF',
          'indigo-light': '#667EEA',
          charcoal: '#2D3748',
          cream:  '#FFFBF5',
          gold:   '#D69E2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        jp:   ['Noto Sans JP', 'sans-serif'],
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem', '3xl': '2rem' },
      animation: {
        'fade-in':   'fadeIn .4s ease-in-out',
        'slide-up':  'slideUp .4s ease-in-out',
        'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' },           '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' },
                   '100%': { transform: 'translateY(0)',  opacity: '1' } },
      },
    },
  },
  plugins: [],
}
export default config
