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
        // Raw Indian Artisan Material Palette
        paper: {
          mulberry: '#F5F0EB',
          parchment: '#EBE5DC',
          rawSilk: '#FDFBF7',
          card: '#FFFFFF',
          border: '#E2DAD0',
          borderDark: '#C9BEB0',
        },
        ink: {
          kohl: '#141312',
          charcoal: '#2D2B28',
          slate: '#5C5852',
          muted: '#8A847C',
        },
        pigment: {
          manjistha: '#842A1C',
          manjisthaDark: '#671E13',
          neel: '#1B2738',
          neelLight: '#2A3C54',
          dhokraBrass: '#C29B38',
          dhokraDark: '#997624',
          haldiTurmeric: '#D99B26',
          verdigris: '#2D5A43',
          terracottaKutch: '#B85D38',
        },
        // Backward-compat aliases mapped to new refined values
        terracotta: {
          DEFAULT: '#842A1C',
          600: '#842A1C',
          700: '#671E13',
        },
        indigoHeritage: {
          DEFAULT: '#1B2738',
          800: '#1B2738',
          900: '#121C29',
        },
        clayBeige: {
          DEFAULT: '#F5F0EB',
          50: '#FDFBF7',
          100: '#F5F0EB',
          200: '#EBE5DC',
        }
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'Georgia', 'serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
