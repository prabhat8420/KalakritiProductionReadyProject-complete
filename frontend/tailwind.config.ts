import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './registry/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm Heritage Beige & Material Palette
        paper: {
          mulberry: '#F7F2E7',
          parchment: '#EFE7DA',
          rawSilk: '#FAF6EE',
          card: '#FAF6EE',
          border: '#E3DACB',
          borderDark: '#CFC3B0',
        },
        ink: {
          kohl: '#1C1917',
          charcoal: '#2D2824',
          slate: '#5C554E',
          muted: '#8C8379',
        },
        pigment: {
          manjistha: '#8C3826',
          manjisthaDark: '#6E2819',
          neel: '#1E2C3D',
          neelLight: '#2F435C',
          dhokraBrass: '#B8860B',
          dhokraDark: '#8F6808',
          haldiTurmeric: '#D49726',
          verdigris: '#2D5A43',
          terracottaKutch: '#B85D38',
        },
        // Direct aliases for seamless component styling
        beige: {
          50: '#FDFCF9',
          100: '#FAF6EE',
          200: '#F7F2E7',
          300: '#EFE7DA',
          400: '#E3DACB',
          500: '#CFC3B0',
          600: '#A89982',
          700: '#7D6E59',
          800: '#544735',
          900: '#2E2721',
        },
        terracotta: {
          DEFAULT: '#8C3826',
          600: '#8C3826',
          700: '#6E2819',
        },
        indigoHeritage: {
          DEFAULT: '#1E2C3D',
          800: '#1E2C3D',
          900: '#151F2C',
        },
        clayBeige: {
          DEFAULT: '#F7F2E7',
          50: '#FAF6EE',
          100: '#F7F2E7',
          200: '#EFE7DA',
        }
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'Georgia', 'serif'],
        nasyhama: ['var(--font-nasyhama)', 'Nasyhama', 'Rozha One', 'Yatra One', 'Cinzel', 'Georgia', 'serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
