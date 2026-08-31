import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#fdf6f4',
          100: '#faece8',
          200: '#f6dad2',
          300: '#efbeaf',
          400: '#e59781',
          500: '#d97255',
          600: '#c55337',
          700: '#a5402a',
          800: '#883726',
          900: '#713224',
        },
        indigoHeritage: {
          50: '#f0f4f9',
          100: '#dee7f2',
          200: '#c2d4e7',
          300: '#97b8d7',
          400: '#6797c2',
          500: '#467bae',
          600: '#346193',
          700: '#2b4e78',
          800: '#274365',
          900: '#1b2d44',
        },
        turmericGold: {
          500: '#e5a93c',
          600: '#cc8e25',
          700: '#a36d1a',
        },
        clayBeige: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#e9dfd2',
          300: '#dcceba',
        }
      },
      fontFamily: {
        heading: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
