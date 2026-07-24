import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a5f',
        },
        tooltip: {
          bg: '#1e293b',
          border: '#475569',
          link: '#93c5fd',
        },
      },
      maxWidth: {
        prose: '72ch',
      },
    },
  },
  plugins: [],
} satisfies Config
